import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import DashboardLayout from './routes/dashboard/DashboardLayout';
import AuthLayout from './routes/auth/AuthLayout';
import StaffLayout from './routes/dashboard/staff/StaffLayout';
import RegisterPage from './routes/auth/register/RegisterPage';
import LoginPage from './routes/auth/login/LoginPage';
import StaffDetailStart from './routes/dashboard/staff/StaffDetailStart';
import StaffDetail from './routes/dashboard/staff/StaffDetail';
import VerifySignupPage from './routes/auth/verify/VerifySignupPage';
import ServicesLayout from './routes/dashboard/services/ServicesLayout';
import ServiceDetail from './routes/dashboard/services/ServiceDetail';
import ServiceDetailStart from './routes/dashboard/services/ServiceDetailStart';
import SettingsLayout from './routes/dashboard/settings/SettingsLayout';
import Settings from './routes/dashboard/settings/Settings';
import CalendarLayout from './routes/dashboard/calendar/CalendarLayout';
import ProtectedRoute from './components/route-wrapper/ProtectedRoute';
import GuestRoute from './components/route-wrapper/GuestRoute';
import { AuthProvider } from '@studiobooker/utils';

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
          { path: 'calendar', element: <CalendarLayout /> },
          {
            path: 'staff',
            element: <StaffLayout />,
            children: [
              { index: true, element: <StaffDetailStart /> },
              { path: ':id', element: <StaffDetail /> },
            ],
          },
          {
            path: 'services',
            element: <ServicesLayout />,
            children: [
              {
                index: true,
                element: <ServiceDetailStart />,
              },
              { path: ':id', element: <ServiceDetail /> },
            ],
          },
          {
            path: 'settings',
            element: <SettingsLayout />,
            children: [
              {
                index: true,
                element: <Settings />,
              },
              {
                path: 'reset-password',
                element: <div>Reset password</div>,
              },
            ],
          },
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
