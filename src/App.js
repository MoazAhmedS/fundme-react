import './App.css';
import SignUp from './components/pages/signUpComp/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ActivateAccount from './components/pages/signUpComp/ActivateAccount';
import EmailVerificationNotice from './components/pages/signUpComp/emailVerifiaction';
import ForgotPassword from './components/pages/ResetPasswordComp/ForgotPassword';
import ResetPassword from './components/pages/ResetPasswordComp/ResetPassword';
import Login from './components/pages/Login';
import CreateProject from './components/pages/CreateProject';
import EmailResetNotice from './components/pages/ResetPasswordComp/emailReset';
import Profile from './components/pages/profileComp/Profile';
import AllProjects from './components/pages/AllProjects';
import Home from './components/pages/Home';
import ContactUs from './components/pages/ContactUs';
import AboutUs from './components/pages/ AboutUs';
import ProjectDetails from './components/pages/ProjectDetails/ProjectDetails';

import WithNav from './components/layout/WithNav';
import WithNavOnly from './components/layout/WithNavOnly';
import WithoutNav from './components/layout/WithoutNav';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route element={<WithNav />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/project" element={<AllProjects />} />
            <Route path="/project/:projectId" element={<ProjectDetails />} />
          </Route>

          <Route element={<WithNavOnly />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-project" element={<CreateProject />} />
          </Route>

          <Route element={<WithoutNav />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
            <Route path="/email-verification" element={<EmailVerificationNotice />} />
            <Route path="/email-reset-password" element={<EmailResetNotice />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;