import { useState } from 'react';
import axiosInstance from '../../api/rootEndpoint';
import styles from './RegisterPage.module.css';

const RegisterPage = ({ openLogin, closeRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/users/register', { username, email, password });
      closeRegister();
      openLogin();
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} className={styles.registerForm}>
        <div>
          <label className={styles.registerLabel}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.registerInput}
          />
        </div>
        <div>
          <label className={styles.registerLabel}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.registerInput}
          />
        </div>
        <div>
          <label className={styles.registerLabel}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.registerInput}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.registerButton}>Register</button>
      </form>
      <p className={styles.loginPrompt}>
        Already have an account?{' '}
        <button onClick={openLogin} className={styles.loginLink}>
          Login here
        </button>
      </p>
    </div>
  );
};

export default RegisterPage;
