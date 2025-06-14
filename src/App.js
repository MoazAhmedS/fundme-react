import logo from './logo.svg';
import './App.css';
import SignUp from './components/pages/signUpComp/SignUp';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import ActivateAccount from './components/pages/signUpComp/ActivateAccount';
import EmailVerificationNotice from './components/pages/signUpComp/emailVerifiaction';
import ForgotPassword from './components/pages/ResetPasswordComp/ForgotPassword';
import ResetPassword from './components/pages/ResetPasswordComp/ResetPassword';
import Login from './components/pages/Login';
import CreateProject from './components/pages/CreateProject';
import EmailResetNotice from './components/pages/ResetPasswordComp/emailReset';
import Profile from './components/pages/profileComp/Profile';
import ProjectDetails from './components/pages/ProjectDetails/ProjectDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/create-project" element={<CreateProject/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
          <Route path="/email-verification" element={<EmailVerificationNotice />} />
          <Route path="/email-reset-password" element={<EmailResetNotice/>}/>
          <Route path="/login" element={<Login/>} />
           <Route path="/details/:projectId" element={<ProjectDetails />} />
          
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;