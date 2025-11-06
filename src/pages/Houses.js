import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { mockHouses } from '../data/mockData';
import Swal from 'sweetalert2';

export default function Houses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [houses] = useState(mockHouses);

  const filteredHouses = houses.filter(house =>
    house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    house.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    house.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleViewDetails = (house) => {
    Swal.fire({
      title: house.name,
      html: `
        <div style="text-align: left;">
          <p><strong>Địa chỉ:</strong> ${house.address}</p>
          <p><strong>Chủ trọ:</strong> ${house.ownerName}</p>
          <p><strong>Số điện thoại:</strong> ${house.ownerPhone}</p>
          <p><strong>Tổng số phòng:</strong> ${house.totalRooms}</p>
          <p><strong>Phòng trống:</strong> ${house.availableRooms}</p>
          <p><strong>Khoảng giá:</strong> ${formatPrice(house.priceRange.min)} - ${formatPrice(house.priceRange.max)}</p>
          <p><strong>Mô tả:</strong> ${house.description}</p>
          <p><strong>Tiện ích:</strong> ${house.facilities.join(', ')}</p>
        </div>
      `,
      width: 600,
      confirmButtonText: 'Đóng'
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Danh sách nhà trọ
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Tìm kiếm theo tên, địa chỉ hoặc quận/huyện..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Tên nhà trọ</strong></TableCell>
              <TableCell><strong>Địa chỉ</strong></TableCell>
              <TableCell><strong>Chủ trọ</strong></TableCell>
              <TableCell><strong>Số điện thoại</strong></TableCell>
              <TableCell align="right"><strong>Phòng trống</strong></TableCell>
              <TableCell><strong>Khoảng giá</strong></TableCell>
              <TableCell align="center"><strong>Thao tác</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHouses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Không tìm thấy nhà trọ nào
                </TableCell>
              </TableRow>
            ) : (
              filteredHouses.map((house) => (
                <TableRow key={house.id} hover>
                  <TableCell>{house.name}</TableCell>
                  <TableCell>{house.address}</TableCell>
                  <TableCell>{house.ownerName}</TableCell>
                  <TableCell>{house.ownerPhone}</TableCell>
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
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewDetails(house)}
                    >
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

