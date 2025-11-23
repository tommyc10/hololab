import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  // 1. Scan for the Keycard
  const token = localStorage.getItem('token');

  // 2. If no token found, EJECT user to Login Screen
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. If token matches, OPEN THE GATES (Render the dashboard)
  return <Outlet />;
};