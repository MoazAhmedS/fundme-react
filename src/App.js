import logo from './logo.svg';
import './App.css';
import SignUp from './components/pages/signUpComp/SignUp';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import ActivateAccount from './components/pages/signUpComp/ActivateAccount';
import EmailVerificationNotice from './components/pages/signUpComp/emailVerifiaction';
import AllProjects from './components/pages/AllProjects';
import Login from './components/pages/Login';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    
  );
}

export default App;