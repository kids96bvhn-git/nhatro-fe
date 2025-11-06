import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getRoomByMember } from '../data/mockData';
import Swal from 'sweetalert2';

export default function ManageRooms() {
  const { user } = useAuth();
  const room = getRoomByMember(user?.memberId || 1);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getDaysRemaining = (endDate) => {
    if (!endDate) return 0;
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!room) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Quản lý phòng trọ
        </Typography>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            Bạn chưa có phòng trọ nào
          </Typography>
        </Paper>
      </Box>
    );
  }

  const daysRemaining = getDaysRemaining(room.contractEndDate);
  const isContractExpiring = daysRemaining > 0 && daysRemaining <= 30;

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Quản lý phòng trọ
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin phòng
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Nhà trọ
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {room.houseName}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Số phòng
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {room.roomNumber}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Diện tích
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {room.area} m²
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Giá thuê
                </Typography>
                <Typography variant="body1" fontWeight="medium" color="primary">
                  {formatPrice(room.price)}/tháng
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Trạng thái
                </Typography>
                <Chip
                  label={room.status === 'occupied' ? 'Đang thuê' : 'Trống'}
                  color={room.status === 'occupied' ? 'success' : 'default'}
                  sx={{ mt: 0.5 }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Tiện ích
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {room.facilities.map((facility, index) => (
                    <Chip key={index} label={facility} size="small" />
                  ))}
                </Box>
              </Box>
              {room.description && (
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Mô tả
                  </Typography>
                  <Typography variant="body1">
                    {room.description}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin hợp đồng
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Ngày bắt đầu
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(room.contractStartDate)}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Ngày kết thúc
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(room.contractEndDate)}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Thời gian còn lại
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  color={isContractExpiring ? 'warning.main' : 'success.main'}
                >
                  {daysRemaining > 0 ? `${daysRemaining} ngày` : 'Đã hết hạn'}
                </Typography>
                {isContractExpiring && (
                  <Typography variant="caption" color="warning.main">
                    Hợp đồng sắp hết hạn, vui lòng gia hạn
                  </Typography>
                )}
              </Box>
              <Box sx={{ mt: 3 }}>
                <Chip
                  label={
                    daysRemaining > 30
                      ? 'Hợp đồng còn hiệu lực'
                      : daysRemaining > 0
                      ? 'Hợp đồng sắp hết hạn'
                      : 'Hợp đồng đã hết hạn'
                  }
                  color={
                    daysRemaining > 30
                      ? 'success'
                      : daysRemaining > 0
                      ? 'warning'
                      : 'error'
                  }
                  sx={{ fontSize: '0.9rem', py: 2, px: 1 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

