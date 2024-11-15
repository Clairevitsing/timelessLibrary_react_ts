import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Outlet /> 
      <ToastContainer />
    </UserProvider>
  );
}

export default App;