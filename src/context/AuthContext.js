import React, { createContext, useState, useContext } from 'react';
import { mockUsers, ROLES, updateUser } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Lấy user từ localStorage nếu có
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username, password) => {
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password; // Không lưu password
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    
    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasRole = (allowedRoles) => {
    // Nếu không có allowedRoles, cho phép tất cả
    if (!allowedRoles || allowedRoles.length === 0) return true;
    
    // Nếu không có user, kiểm tra xem có phải Guest role không
    if (!user) {
      return allowedRoles.includes(ROLES.GUEST);
    }
    
    return allowedRoles.includes(user.role);
  };

  const updateProfile = (updatedData) => {
    if (!user) {
      return { success: false, message: 'Chưa đăng nhập' };
    }

    // Cập nhật user trong mock data
    const updatedUserData = updateUser(user.id, updatedData);
    
    if (updatedUserData) {
      const userData = { ...updatedUserData };
      delete userData.password; // Không lưu password
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    
    return { success: false, message: 'Không tìm thấy người dùng' };
  };

  const changePassword = (currentPassword, newPassword) => {
    if (!user) {
      return { success: false, message: 'Chưa đăng nhập' };
    }

    // Tìm user trong mock data để kiểm tra mật khẩu hiện tại
    const foundUser = mockUsers.find(u => u.id === user.id);
    
    if (!foundUser || foundUser.password !== currentPassword) {
      return { success: false, message: 'Mật khẩu hiện tại không đúng' };
    }

    // Cập nhật mật khẩu
    const updatedUserData = updateUser(user.id, { password: newPassword });
    
    if (updatedUserData) {
      return { success: true, message: 'Đổi mật khẩu thành công' };
    }
    
    return { success: false, message: 'Không thể cập nhật mật khẩu' };
  };

  const value = {
    user,
    login,
    logout,
    hasRole,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === ROLES.SUPER_ADMIN,
    isOwnerAdmin: user?.role === ROLES.OWNER_ADMIN,
    isMember: user?.role === ROLES.MEMBER,
    isGuest: user?.role === ROLES.GUEST || !user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

