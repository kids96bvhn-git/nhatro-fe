import React from 'react';
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
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { getDistrictStats, getCityStats, mockHouses } from '../data/mockData';

export default function Dashboard() {
  const stats = getDistrictStats();
  const hcmStats = getCityStats('TP.HCM');
  const hanoiStats = getCityStats('Hà Nội');
  const danangStats = getCityStats('Đà Nẵng');

  const pieData = stats.map(stat => ({
    id: stat.district,
    value: parseFloat(stat.vacancyRate),
    label: stat.district
  }));

  const hcmPieData = hcmStats.map(stat => ({
    id: stat.district,
    value: parseFloat(stat.vacancyRate),
    label: stat.district
  }));

  const hanoiPieData = hanoiStats.map(stat => ({
    id: stat.district,
    value: parseFloat(stat.vacancyRate),
    label: stat.district
  }));

  const danangPieData = danangStats.map(stat => ({
    id: stat.district,
    value: parseFloat(stat.vacancyRate),
    label: stat.district
  }));

  const totalHouses = stats.reduce((sum, stat) => sum + stat.totalHouses, 0);
  const totalRooms = stats.reduce((sum, stat) => sum + stat.totalRooms, 0);
  const totalAvailableRooms = stats.reduce((sum, stat) => sum + stat.availableRooms, 0);
  const totalOccupiedRooms = totalRooms - totalAvailableRooms;
  const overallVacancyRate = totalRooms > 0 ? ((totalAvailableRooms / totalRooms) * 100).toFixed(1) : 0;

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Dashboard - Thống kê tổng quan
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '120px' }}>
              <Typography color="textSecondary" gutterBottom>
                Tổng số nhà trọ
              </Typography>
              <Typography variant="h4">
                {totalHouses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '120px' }}>
              <Typography color="textSecondary" gutterBottom>
                Tổng số phòng
              </Typography>
              <Typography variant="h4">
                {totalRooms}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '120px' }}>
              <Typography color="textSecondary" gutterBottom>
                Phòng đã thuê
              </Typography>
              <Typography variant="h4" color="success.main">
                {totalOccupiedRooms}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '120px' }}>
              <Typography color="textSecondary" gutterBottom>
                Phòng còn trống
              </Typography>
              <Typography variant="h4" color="warning.main">
                {totalAvailableRooms}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Tỷ lệ: {overallVacancyRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Thống kê theo quận/huyện
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Thành phố</strong></TableCell>
                    <TableCell><strong>Quận/Huyện</strong></TableCell>
                    <TableCell align="right"><strong>Số nhà trọ</strong></TableCell>
                    <TableCell align="right"><strong>Tổng phòng</strong></TableCell>
                    <TableCell align="right"><strong>Phòng trống</strong></TableCell>
                    <TableCell align="right"><strong>Tỷ lệ trống</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.map((stat) => {
                    const house = mockHouses.find(h => h.district === stat.district);
                    return (
                      <TableRow key={stat.district}>
                        <TableCell>{house?.city || 'N/A'}</TableCell>
                        <TableCell>{stat.district}</TableCell>
                        <TableCell align="right">{stat.totalHouses}</TableCell>
                        <TableCell align="right">{stat.totalRooms}</TableCell>
                        <TableCell align="right">{stat.availableRooms}</TableCell>
                        <TableCell align="right">{stat.vacancyRate}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Biểu đồ TP.HCM */}
        <Grid item xs={12} md={12} lg={4}>
          <Paper sx={{ p: 3, minWidth: { xs: '100%', lg: '400px' } }}>
            <Typography variant="h6" gutterBottom>
              TP. Hồ Chí Minh
            </Typography>
            {hcmPieData.length > 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, overflow: 'visible', minHeight: '250px' }}>
                <PieChart
                  series={[
                    {
                      data: hcmPieData,
                      innerRadius: 30,
                      outerRadius: 80,
                      paddingAngle: 2,
                      cornerRadius: 5,
                    },
                  ]}
                  width={350}
                  height={250}
                  margin={{ right: 120 }}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'middle', horizontal: 'right' },
                      padding: { left: 30 },
                      itemMarkWidth: 10,
                      itemMarkHeight: 10,
                      markGap: 5,
                      itemGap: 8,
                    },
                  }}
                />
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
                Chưa có dữ liệu
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Biểu đồ Hà Nội */}
        <Grid item xs={12} md={12} lg={4}>
          <Paper sx={{ p: 3, minWidth: { xs: '100%', lg: '400px' } }}>
            <Typography variant="h6" gutterBottom>
              Hà Nội
            </Typography>
            {hanoiPieData.length > 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, overflow: 'visible', minHeight: '250px' }}>
                <PieChart
                  series={[
                    {
                      data: hanoiPieData,
                      innerRadius: 30,
                      outerRadius: 80,
                      paddingAngle: 2,
                      cornerRadius: 5,
                    },
                  ]}
                  width={350}
                  height={250}
                  margin={{ right: 120 }}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'middle', horizontal: 'right' },
                      padding: { left: 30 },
                      itemMarkWidth: 10,
                      itemMarkHeight: 10,
                      markGap: 5,
                      itemGap: 8,
                    },
                  }}
                />
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
                Chưa có dữ liệu
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Biểu đồ Đà Nẵng */}
        <Grid item xs={12} md={12} lg={4}>
          <Paper sx={{ p: 3, minWidth: { xs: '100%', lg: '400px' } }}>
            <Typography variant="h6" gutterBottom>
              Đà Nẵng
            </Typography>
            {danangPieData.length > 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, overflow: 'visible', minHeight: '250px' }}>
                <PieChart
                  series={[
                    {
                      data: danangPieData,
                      innerRadius: 30,
                      outerRadius: 80,
                      paddingAngle: 2,
                      cornerRadius: 5,
                    },
                  ]}
                  width={350}
                  height={250}
                  margin={{ right: 120 }}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'middle', horizontal: 'right' },
                      padding: { left: 30 },
                      itemMarkWidth: 10,
                      itemMarkHeight: 10,
                      markGap: 5,
                      itemGap: 8,
                    },
                  }}
                />
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
                Chưa có dữ liệu
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

