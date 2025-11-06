import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../data/mockData';

const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = false }) => {
  const { user, hasRole } = useAuth();

  // Nếu route yêu cầu đăng nhập và user chưa đăng nhập
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra quyền truy cập
  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    // Nếu user đã đăng nhập nhưng không có quyền, redirect về trang chủ
    if (user) {
      return <Navigate to="/" replace />;
    }
    // Nếu user chưa đăng nhập và route không cho phép Guest, redirect về trang chủ
    // (nhưng vẫn cho phép xem Dashboard và Houses)
    if (!user && !allowedRoles.includes(ROLES.GUEST)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

