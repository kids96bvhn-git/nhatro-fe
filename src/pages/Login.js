import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(username, password);
    
    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Đăng nhập thành công!',
        text: `Chào mừng ${result.user.name}`,
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/');
    } else {
      setError(result.message);
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
        text: result.message
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5'
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
            Đăng nhập
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Tên đăng nhập"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: '#f0f0f0', borderRadius: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>
              <strong>Tài khoản demo:</strong>
            </Typography>
            <Typography variant="caption" display="block">
              Super Admin: superadmin / admin123
            </Typography>
            <Typography variant="caption" display="block">
              Owner Admin: owner1 / owner123
            </Typography>
            <Typography variant="caption" display="block">
              Member: member1 / member123
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

