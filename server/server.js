const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Middleware for JSON parsing and CORS
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myntra', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// User Schema and Model
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Authorization Middleware
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Access denied' });
  next();
};

// User Registration Route
app.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Incorrect username' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Details Route (authenticated)
app.get('/user', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json({ email: user.email, role: user.role });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Form Data Schema and Model
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  title: String,
  description: String,
  category: String,
  gender: String,
  sketch: String,
  materialDescription: String,
  sustainabilityFeatures: [String],
  confirm: Boolean,
  votes: { type: Number, default: 0 },
  isSelected: { type: Boolean, default: false },
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const FormData = mongoose.model('FormData', formDataSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Protected Routes
app.post('/submit', authenticate, upload.fields([{ name: 'sketch' }]), async (req, res) => {
  try {
    const sketchPath = req.files.sketch ? req.files.sketch[0].path : null;

    const formData = new FormData({
      ...req.body,
      sketch: sketchPath,
    });

    await formData.save();
    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Voting Route
app.post('/formdatas/vote/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const formData = await FormData.findById(id);
    if (!formData) {
      return res.status(404).json({ error: 'Form data not found' });
    }

    // Check if user has already voted
    if (formData.voters.includes(req.user.id)) {
      return res.status(403).json({ error: 'You have already voted' });
    }

    // Increment votes and add user to voters
    formData.votes += 1;
    formData.voters.push(req.user.id);
    await formData.save();

    res.json({ updatedVotes: formData.votes });
  } catch (error) {
    console.error('Error handling vote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/formdatas', authenticate, async (req, res) => {
  try {
    const { category, isSelected, gender } = req.query;
    let query = {};

    if (isSelected === 'true') {
      query.isSelected = true;
    }

    if (category) {
      query.category = category;
    }

    if (gender) {
      query.gender = gender;
    }

    const formdatas = await FormData.find(query);
    res.json(formdatas);
  } catch (err) {
    console.error('Error fetching form datas:', err);
    res.status(500).json({ error: 'Error fetching form data' });
  }
});

app.put('/formdatas/:id', authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  const { isSelected } = req.body;

  try {
    const formData = await FormData.findById(id);
    if (!formData) {
      return res.status(404).json({ error: 'Form data not found' });
    }

    formData.isSelected = isSelected;
    await formData.save();

    res.json({ message: 'Form data updated successfully' });
  } catch (error) {
    console.error('Error updating form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token (if needed)
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send the token or success message
    res.json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(400).json({ error: 'Invalid credentials' });
  }
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
