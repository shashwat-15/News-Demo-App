import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ArticleView from './components/ArticleView/ArticleView';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import SearchHistory from './components/SearchHistory/SearchHistory';
import PrivateRoute from './components/PrivateRoute';


const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:articleUrl" element={<ArticleView />} />
        <Route 
          path="/favorites" 
          element={
            <PrivateRoute>
              <FavoritePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/search-history" 
          element={
            <PrivateRoute>
              <SearchHistory />
            </PrivateRoute>
          } 
        />
      </Routes>
    );
  };

export default AppRouter;
