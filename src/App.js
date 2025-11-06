import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Houses from './pages/Houses';
import ManageHouses from './pages/ManageHouses';
import ManageRooms from './pages/ManageRooms';
import Profile from './pages/Profile';
import { ROLES } from './data/mockData';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.OWNER_ADMIN, ROLES.MEMBER, ROLES.GUEST]}>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/houses"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.OWNER_ADMIN, ROLES.MEMBER, ROLES.GUEST]}>
            <Layout>
              <Houses />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-houses"
        element={
          <ProtectedRoute allowedRoles={[ROLES.OWNER_ADMIN]} requireAuth={true}>
            <Layout>
              <ManageHouses />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-rooms"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MEMBER]} requireAuth={true}>
            <Layout>
              <ManageRooms />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute requireAuth={true}>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

