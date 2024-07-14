import logo from '../logo.svg';
import './Userdashboard.css';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './Welcome';
import Toggle from './Toggle_button'
import DesignPoll from './DesignPoll';

function Userdashboard() {
  return (

    <div>
      <Navbar></Navbar>
      <Welcome></Welcome>
      <Toggle></Toggle>
    
    </div>
  );
}

export default Userdashboard;
