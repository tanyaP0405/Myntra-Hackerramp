import logo from '../logo.svg';
import './Userdashboard.css';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './Welcome';
import Toggle from './Toggle_button'
import Adminwelcome from './Adminwelcome';
import FormDataList from './FormDataList';


function AdminDashboard() {
  return (

    <div>
      <Navbar></Navbar>
     <Adminwelcome></Adminwelcome>
   <FormDataList></FormDataList>
    </div>
  );
}

export default AdminDashboard;
