import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Room as RoomIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { getHousesByOwner, getRoomsByHouse } from '../data/mockData';
import Swal from 'sweetalert2';

export default function ManageHouses() {
  const { user } = useAuth();
  const [houses, setHouses] = useState(getHousesByOwner(user?.ownerId || 1));
  const [openDialog, setOpenDialog] = useState(false);
  const [editingHouse, setEditingHouse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    district: '',
    city: 'TP.HCM',
    totalRooms: '',
    priceRangeMin: '',
    priceRangeMax: '',
    description: '',
    facilities: ''
  });

  const handleOpenDialog = (house = null) => {
    if (house) {
      setEditingHouse(house);
      setFormData({
        name: house.name,
        address: house.address,
        district: house.district,
        city: house.city,
        totalRooms: house.totalRooms.toString(),
        priceRangeMin: house.priceRange.min.toString(),
        priceRangeMax: house.priceRange.max.toString(),
        description: house.description,
        facilities: house.facilities.join(', ')
      });
    } else {
      setEditingHouse(null);
      setFormData({
        name: '',
        address: '',
        district: '',
        city: 'TP.HCM',
        totalRooms: '',
        priceRangeMin: '',
        priceRangeMax: '',
        description: '',
        facilities: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingHouse(null);
  };

  const handleSubmit = () => {
    if (editingHouse) {
      // Cập nhật nhà trọ
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công!',
        text: 'Thông tin nhà trọ đã được cập nhật.',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      // Thêm nhà trọ mới
      Swal.fire({
        icon: 'success',
        title: 'Thêm thành công!',
        text: 'Nhà trọ mới đã được thêm vào hệ thống.',
        timer: 1500,
        showConfirmButton: false
      });
    }
    handleCloseDialog();
  };

  const handleDelete = (house) => {
    Swal.fire({
      title: 'Xác nhận xóa?',
      text: `Bạn có chắc chắn muốn xóa nhà trọ "${house.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Đã xóa!', 'Nhà trọ đã được xóa.', 'success');
      }
    });
  };

  const handleViewRooms = (house) => {
    const rooms = getRoomsByHouse(house.id);
    const roomsList = rooms.map(room => 
      `<tr>
        <td>${room.roomNumber}</td>
        <td>${room.area}m²</td>
        <td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price)}</td>
        <td>${room.status === 'available' ? 'Trống' : 'Đã thuê'}</td>
      </tr>`
    ).join('');

    Swal.fire({
      title: `Danh sách phòng - ${house.name}`,
      html: `
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f0f0f0;">
              <th style="padding: 8px; border: 1px solid #ddd;">Số phòng</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Diện tích</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Giá</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            ${roomsList || '<tr><td colspan="4" style="text-align: center;">Chưa có phòng nào</td></tr>'}
          </tbody>
        </table>
      `,
      width: 700,
      confirmButtonText: 'Đóng'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Quản lý nhà trọ
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Thêm nhà trọ mới
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Tên nhà trọ</strong></TableCell>
              <TableCell><strong>Địa chỉ</strong></TableCell>
              <TableCell><strong>Quận/Huyện</strong></TableCell>
              <TableCell align="right"><strong>Phòng trống</strong></TableCell>
              <TableCell><strong>Khoảng giá</strong></TableCell>
              <TableCell align="center"><strong>Thao tác</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {houses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Chưa có nhà trọ nào
                </TableCell>
              </TableRow>
            ) : (
              houses.map((house) => (
                <TableRow key={house.id} hover>
                  <TableCell>{house.name}</TableCell>
                  <TableCell>{house.address}</TableCell>
                  <TableCell>{house.district}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${house.availableRooms}/${house.totalRooms}`}
                      color={house.availableRooms > 0 ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {formatPrice(house.priceRange.min)} - {formatPrice(house.priceRange.max)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewRooms(house)}
                      title="Xem phòng"
                    >
                      <RoomIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(house)}
                      title="Sửa"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(house)}
                      title="Xóa"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingHouse ? 'Sửa thông tin nhà trọ' : 'Thêm nhà trọ mới'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên nhà trọ"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quận/Huyện"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Thành phố"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tổng số phòng"
                type="number"
                value={formData.totalRooms}
                onChange={(e) => setFormData({ ...formData, totalRooms: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Giá tối thiểu"
                type="number"
                value={formData.priceRangeMin}
                onChange={(e) => setFormData({ ...formData, priceRangeMin: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Giá tối đa"
                type="number"
                value={formData.priceRangeMax}
                onChange={(e) => setFormData({ ...formData, priceRangeMax: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tiện ích (phân cách bằng dấu phẩy)"
                value={formData.facilities}
                onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
                placeholder="Ví dụ: WiFi, Máy lạnh, WC riêng"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingHouse ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

