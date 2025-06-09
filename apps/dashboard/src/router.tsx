import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import DashboardLayout from './routes/dashboard/DashboardLayout';
import GuestRoute from './app/GuestRoute';
import ProtectedRoute from './app/ProtectedRoute';
import AuthLayout from './routes/auth/AuthLayout';
import StaffLayout from './routes/dashboard/staff/StaffLayout';
import RegisterPage from './routes/auth/register/RegisterPage';
import LoginPage from './routes/auth/login/LoginPage';
import StaffDetailStart from './routes/dashboard/staff/StaffDetailStart';
import StaffDetail from './routes/dashboard/staff/StaffDetail';
import AuthProvider from './contexts/AuthContext';
import VerifySignupPage from './routes/auth/verify/VerifySignupPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Navigate to={'dashboard'} /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to={'staff'} /> },
          { path: 'calendar', element: <div>Calendar</div> },
          {
            path: 'staff',
            element: <StaffLayout />,
            children: [
              { index: true, element: <StaffDetailStart /> },
              { path: ':id', element: <StaffDetail /> },
            ],
          },
          { path: 'services', element: <div>Services</div> },
        ],
      },
      {
        path: 'auth',
        element: (
          <GuestRoute>
            <AuthLayout />
          </GuestRoute>
        ),
        children: [
          { index: true, element: <Navigate to={'login'} /> },
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
          { path: 'verify', element: <VerifySignupPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>Not found</div>,
  },
]);
