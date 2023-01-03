import { Fragment } from 'react';
import {Routes ,Route} from 'react-router-dom';
import './components/pages/style.css'
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Register from './components/pages/Register';


function App() {
  return (
    <Fragment>
      <Routes >
        <Route path="/" element={<Login/>} />
        <Route path="/Sign_Up" element={<SignUp/>} />
        <Route path="/Register" element={<Register/>} />
      </Routes>
    </Fragment>
  );
}

export default App;
