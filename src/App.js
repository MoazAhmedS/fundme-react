import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ForgotPassword/>} />
          <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;