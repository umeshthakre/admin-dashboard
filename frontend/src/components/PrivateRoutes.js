// PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../helper/AuthContext";


const PrivateRoute = () => {
  const { token } = useAuth();
  console.log('token',token)
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
