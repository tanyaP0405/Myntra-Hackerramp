const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());


app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/myntra', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  portfolio: String,
  title: String,
  description: String,
  category: String,
  sketch: String,
  materialDescription: String,
  sustainabilityFeatures: [String],
  confirm: Boolean,
  votes: { type: Number, default: 0 }, 
  isSelected: { type: Boolean, default: false },
});

const FormData = mongoose.model('FormData', formDataSchema);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


app.post('/submit', upload.fields([{ name: 'sketch' }]), async (req, res) => {
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


app.get('/formdatas', async (req, res) => {
  try {
    let query = {};

    if (req.query.isSelected === 'true') {
      query.isSelected = true;
    }

    const formdatas = await FormData.find(query);
    res.json(formdatas);
  } catch (err) {
    console.error('Error fetching form datas:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put('/formdatas/:id', async (req, res) => {
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


app.post('/formdatas/vote/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const formData = await FormData.findById(id);
    if (!formData) {
      return res.status(404).json({ error: 'Form data not found' });
    }

    formData.votes += 1; 
    await formData.save();

    res.json({ message: 'Vote counted successfully', votes: formData.votes });
  } catch (error) {
    console.error('Error counting vote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
