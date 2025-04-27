import { Outlet, Navigate } from "react-router-dom";
import { User } from "firebase/auth";

const ProtectedRoute = ({ user }: { user: User | null }) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
