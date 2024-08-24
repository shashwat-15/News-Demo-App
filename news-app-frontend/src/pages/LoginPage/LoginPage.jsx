import { useState } from 'react';
import axiosInstance from '../../api/rootEndpoint';
import styles from './LoginPage.module.css'; // Ensure unique class names

const LoginPage = ({ openRegister, closeLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      closeLogin(); // Redirect to homepage or dashboard
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div>
          <label className={styles.loginLabel}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.loginInput}
          />
        </div>
        <div>
          <label className={styles.loginLabel}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.loginInput}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
      <p className={styles.registerPrompt}>
        New here?{' '}
        <button onClick={openRegister} className={styles.registerLink}>
          Create an account
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
