import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

export default function Profile() {
  const { user, updateProfile, changePassword } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    dateOfBirth: '',
    hometown: '',
    cccd: '',
    email: '',
    phone: ''
  });

  // Cập nhật form khi user thay đổi
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        dateOfBirth: user.dateOfBirth || '',
        hometown: user.hometown || '',
        cccd: user.cccd || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (field) => (e) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value
    });
  };

  const handlePasswordChange = (field) => (e) => {
    setPasswordData({
      ...passwordData,
      [field]: e.target.value
    });
  };

  const handleUpdateProfile = () => {
    // Validation
    if (!profileData.name.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập tên'
      });
      return;
    }

    if (!profileData.dateOfBirth) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng chọn ngày sinh'
      });
      return;
    }

    if (!profileData.hometown.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập quê quán'
      });
      return;
    }

    if (!profileData.cccd.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập số căn cước công dân'
      });
      return;
    }

    // Kiểm tra CCCD có đúng 12 số không
    if (!/^\d{12}$/.test(profileData.cccd)) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Số căn cước công dân phải có 12 chữ số'
      });
      return;
    }

    const result = updateProfile({
      name: profileData.name,
      dateOfBirth: profileData.dateOfBirth,
      hometown: profileData.hometown,
      cccd: profileData.cccd,
      email: profileData.email,
      phone: profileData.phone
    });

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Cập nhật thông tin tài khoản thành công',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: result.message || 'Không thể cập nhật thông tin'
      });
    }
  };

  const handleChangePassword = () => {
    // Validation
    if (!passwordData.currentPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập mật khẩu hiện tại'
      });
      return;
    }

    if (!passwordData.newPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập mật khẩu mới'
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Mật khẩu mới phải có ít nhất 6 ký tự'
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Mật khẩu xác nhận không khớp'
      });
      return;
    }

    const result = changePassword(passwordData.currentPassword, passwordData.newPassword);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Đổi mật khẩu thành công',
        timer: 1500,
        showConfirmButton: false
      });
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: result.message || 'Không thể đổi mật khẩu'
      });
    }
  };

  if (!user) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Thông tin tài khoản
        </Typography>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            Vui lòng đăng nhập để xem thông tin tài khoản
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Thông tin tài khoản
      </Typography>

      <Grid container spacing={3}>
        {/* Form cập nhật thông tin */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cập nhật thông tin cá nhân
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên đăng nhập"
                    value={user.username}
                    disabled
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên tuổi"
                    value={profileData.name}
                    onChange={handleProfileChange('name')}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ngày tháng năm sinh"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={handleProfileChange('dateOfBirth')}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Quê quán"
                    value={profileData.hometown}
                    onChange={handleProfileChange('hometown')}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Căn cước công dân"
                    value={profileData.cccd}
                    onChange={handleProfileChange('cccd')}
                    variant="outlined"
                    inputProps={{ maxLength: 12, pattern: '[0-9]*' }}
                    helperText="Nhập 12 chữ số"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange('email')}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={profileData.phone}
                    onChange={handleProfileChange('phone')}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleUpdateProfile}
                    sx={{ mt: 2 }}
                  >
                    Cập nhật thông tin
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Form đổi mật khẩu */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Đổi mật khẩu
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mật khẩu hiện tại"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange('currentPassword')}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mật khẩu mới"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange('newPassword')}
                    variant="outlined"
                    helperText="Mật khẩu phải có ít nhất 6 ký tự"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Xác nhận mật khẩu mới"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange('confirmPassword')}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleChangePassword}
                    sx={{ mt: 2 }}
                  >
                    Đổi mật khẩu
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

