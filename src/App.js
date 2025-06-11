import logo from './logo.svg';
import './App.css';
import SignUp from './components/pages/signUpComp/SignUp';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import ActivateAccount from './components/pages/signUpComp/ActivateAccount';
import EmailVerificationNotice from './components/pages/signUpComp/emailVerifiaction';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path="/signup" element={<SignUp />} />
      <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
      <Route path="/email-verification" element={<EmailVerificationNotice />} /> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;