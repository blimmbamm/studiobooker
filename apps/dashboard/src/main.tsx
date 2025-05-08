import { StrictMode } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import AuthProvider from './app/AuthContext';
import DashboardRoot from './routes/dashboard/DashboardLayout';
import GuestRoute from './app/GuestRoute';
import ProtectedRoute from './app/ProtectedRoute';
import AuthRoot from './routes/auth/AuthLayout';
import StaffLayout from './routes/dashboard/staff/StaffLayout';
import StaffDetailPage from './routes/dashboard/staff/StaffDetailPage';
import StaffDetailFallback from './routes/dashboard/staff/StaffDetailFallback';
import RegisterPage from './routes/auth/register/RegisterPage';
import LoginPage from './routes/auth/login/LoginPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
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
            <DashboardRoot />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to={'staff'} /> },
          { path: 'calendar', element: <div>Calendar</div> },
          {
            path: 'staff',
            element: <StaffLayout />,
            children: [
              { index: true, element: <StaffDetailFallback /> },
              { path: ':id', element: <StaffDetailPage /> },
            ],
          },
          { path: 'services', element: <div>Services</div> },
        ],
      },
      {
        path: 'auth',
        element: (
          <GuestRoute>
            <AuthRoot />
          </GuestRoute>
        ),
        children: [
          { index: true, element: <Navigate to={'login'} /> },
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
