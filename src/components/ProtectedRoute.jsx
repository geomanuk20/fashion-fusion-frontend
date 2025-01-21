import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProtectedRoute = ({ element }) => {
  const { token } = useContext(ShopContext);

  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
