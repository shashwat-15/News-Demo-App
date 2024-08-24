import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './Router';
import TopNavBar from './components/TopNavBar/TopNavBar';
import { useState } from 'react';
import Modal from './components/Modal/Modal';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  }
  const closeLogin = () => setIsLoginOpen(false);

  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };
  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <Router>
      <div>
        <TopNavBar openLogin={openLogin} openRegister={openRegister} />
        <main>
          <AppRouter />
        </main>
        {isLoginOpen && (
          <Modal onClose={closeLogin}>
            <LoginPage openRegister={openRegister} closeLogin={closeLogin} />
          </Modal>
        )}
        {isRegisterOpen && (
          <Modal onClose={closeRegister}>
            <RegisterPage openLogin={openLogin} closeRegister={closeRegister} />
          </Modal>
        )}
      </div>
    </Router>
  );
};

export default App;