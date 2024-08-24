import { Link } from 'react-router-dom';
import styles from './TopNavBar.module.css';

const TopNavBar = ({ openLogin, openRegister }) => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  return (
    <div className={styles.topNavBar}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          <Link to="/">News App</Link>
        </div>
        <div className={styles.userSection}>
          {token ? (
            <>
              <span className={styles.username}>{username}</span>
              <Link to="/favorites" className={styles.link}>Favorites</Link>
              <Link to="/search-history" className={styles.link}>Search History</Link>
              <Link to="/" onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                window.location.reload();
              }} className={styles.link}>Logout</Link>
            </>
          ) : (
            <>
              <button onClick={openLogin} className={styles.link}>Login</button>
              <button onClick={openRegister} className={styles.link}>Register</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
