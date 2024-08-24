import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Simplified authentication check

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
