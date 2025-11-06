// Mock data cho ứng dụng quản lý nhà trọ

// Danh sách các role
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  OWNER_ADMIN: 'OWNER_ADMIN',
  MEMBER: 'MEMBER',
  GUEST: 'GUEST'
};

// Mock users
export const mockUsers = [
  {
    id: 1,
    username: 'superadmin',
    password: 'admin123',
    role: ROLES.SUPER_ADMIN,
    name: 'Super Admin',
    email: 'superadmin@nhatro.com',
    dateOfBirth: '1990-01-01',
    hometown: 'Hà Nội',
    cccd: '001199000001'
  },
  {
    id: 2,
    username: 'owner1',
    password: 'owner123',
    role: ROLES.OWNER_ADMIN,
    name: 'Nguyễn Văn A',
    email: 'owner1@nhatro.com',
    phone: '0901234567',
    ownerId: 1,
    dateOfBirth: '1985-05-15',
    hometown: 'TP.HCM',
    cccd: '079123456789'
  },
  {
    id: 3,
    username: 'owner2',
    password: 'owner123',
    role: ROLES.OWNER_ADMIN,
    name: 'Trần Thị B',
    email: 'owner2@nhatro.com',
    phone: '0902345678',
    ownerId: 2,
    dateOfBirth: '1988-08-20',
    hometown: 'Đà Nẵng',
    cccd: '051234567890'
  },
  {
    id: 4,
    username: 'member1',
    password: 'member123',
    role: ROLES.MEMBER,
    name: 'Lê Văn C',
    email: 'member1@nhatro.com',
    phone: '0903456789',
    memberId: 1,
    roomId: 1,
    dateOfBirth: '1995-03-10',
    hometown: 'Cần Thơ',
    cccd: '067123456789'
  },
  {
    id: 5,
    username: 'member2',
    password: 'member123',
    role: ROLES.MEMBER,
    name: 'Phạm Thị D',
    email: 'member2@nhatro.com',
    phone: '0904567890',
    memberId: 2,
    roomId: 5,
    dateOfBirth: '1992-11-25',
    hometown: 'Hải Phòng',
    cccd: '031234567890'
  }
];

// Helper để lấy user theo ID
export const getUserById = (userId) => {
  return mockUsers.find(user => user.id === userId);
};

// Helper để cập nhật user
export const updateUser = (userId, updatedData) => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData };
    return mockUsers[userIndex];
  }
  return null;
};

// Mock nhà trọ
export const mockHouses = [
  {
    id: 1,
    name: 'Nhà trọ An Phú',
    address: '123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM',
    district: 'Quận 7',
    city: 'TP.HCM',
    ownerId: 1,
    ownerName: 'Nguyễn Văn A',
    ownerPhone: '0901234567',
    totalRooms: 10,
    availableRooms: 3,
    priceRange: { min: 2000000, max: 4000000 },
    description: 'Nhà trọ sạch sẽ, an ninh tốt, gần trung tâm',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng', 'Bảo vệ 24/7']
  },
  {
    id: 2,
    name: 'Nhà trọ Bình Thạnh',
    address: '456 Đường Bình Quới, Quận Bình Thạnh, TP.HCM',
    district: 'Quận Bình Thạnh',
    city: 'TP.HCM',
    ownerId: 1,
    ownerName: 'Nguyễn Văn A',
    ownerPhone: '0901234567',
    totalRooms: 8,
    availableRooms: 2,
    priceRange: { min: 1500000, max: 3000000 },
    description: 'Nhà trọ giá rẻ, tiện lợi',
    facilities: ['WiFi', 'WC riêng']
  },
  {
    id: 3,
    name: 'Nhà trọ Gò Vấp',
    address: '789 Đường Quang Trung, Quận Gò Vấp, TP.HCM',
    district: 'Quận Gò Vấp',
    city: 'TP.HCM',
    ownerId: 2,
    ownerName: 'Trần Thị B',
    ownerPhone: '0902345678',
    totalRooms: 12,
    availableRooms: 5,
    priceRange: { min: 1800000, max: 3500000 },
    description: 'Nhà trọ hiện đại, đầy đủ tiện nghi',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng', 'Bảo vệ 24/7', 'Thang máy']
  },
  {
    id: 4,
    name: 'Nhà trọ Tân Bình',
    address: '321 Đường Cộng Hòa, Quận Tân Bình, TP.HCM',
    district: 'Quận Tân Bình',
    city: 'TP.HCM',
    ownerId: 2,
    ownerName: 'Trần Thị B',
    ownerPhone: '0902345678',
    totalRooms: 6,
    availableRooms: 1,
    priceRange: { min: 2500000, max: 4500000 },
    description: 'Nhà trọ cao cấp',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng', 'Bảo vệ 24/7', 'Thang máy', 'Gym']
  },
  {
    id: 5,
    name: 'Nhà trọ Quận 1',
    address: '654 Đường Nguyễn Huệ, Quận 1, TP.HCM',
    district: 'Quận 1',
    city: 'TP.HCM',
    ownerId: 1,
    ownerName: 'Nguyễn Văn A',
    ownerPhone: '0901234567',
    totalRooms: 15,
    availableRooms: 4,
    priceRange: { min: 3000000, max: 6000000 },
    description: 'Nhà trọ trung tâm thành phố',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng', 'Bảo vệ 24/7', 'Thang máy']
  },
  // Hà Nội
  {
    id: 6,
    name: 'Nhà trọ Ba Đình',
    address: '123 Đường Hoàng Diệu, Quận Ba Đình, Hà Nội',
    district: 'Quận Ba Đình',
    city: 'Hà Nội',
    ownerId: 2,
    ownerName: 'Trần Thị B',
    ownerPhone: '0902345678',
    totalRooms: 12,
    availableRooms: 4,
    priceRange: { min: 2500000, max: 5000000 },
    description: 'Nhà trọ gần trung tâm Ba Đình',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng', 'Bảo vệ 24/7']
  },
  {
    id: 7,
    name: 'Nhà trọ Hoàn Kiếm',
    address: '456 Đường Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội',
    district: 'Quận Hoàn Kiếm',
    city: 'Hà Nội',
    ownerId: 1,
    ownerName: 'Nguyễn Văn A',
    ownerPhone: '0901234567',
    totalRooms: 10,
    availableRooms: 3,
    priceRange: { min: 3000000, max: 5500000 },
    description: 'Nhà trọ trung tâm phố cổ',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng', 'Bảo vệ 24/7', 'Thang máy']
  },
  {
    id: 8,
    name: 'Nhà trọ Cầu Giấy',
    address: '789 Đường Trần Duy Hưng, Quận Cầu Giấy, Hà Nội',
    district: 'Quận Cầu Giấy',
    city: 'Hà Nội',
    ownerId: 2,
    ownerName: 'Trần Thị B',
    ownerPhone: '0902345678',
    totalRooms: 14,
    availableRooms: 5,
    priceRange: { min: 2000000, max: 4500000 },
    description: 'Nhà trọ khu vực Cầu Giấy',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng', 'Bảo vệ 24/7']
  },
  {
    id: 9,
    name: 'Nhà trọ Đống Đa',
    address: '321 Đường Tây Sơn, Quận Đống Đa, Hà Nội',
    district: 'Quận Đống Đa',
    city: 'Hà Nội',
    ownerId: 1,
    ownerName: 'Nguyễn Văn A',
    ownerPhone: '0901234567',
    totalRooms: 9,
    availableRooms: 2,
    priceRange: { min: 1800000, max: 4000000 },
    description: 'Nhà trọ gần đại học',
    facilities: ['WiFi', 'WC riêng']
  },
  // Đà Nẵng
  {
    id: 10,
    name: 'Nhà trọ Hải Châu',
    address: '123 Đường Bạch Đằng, Quận Hải Châu, Đà Nẵng',
    district: 'Quận Hải Châu',
    city: 'Đà Nẵng',
    ownerId: 2,
    ownerName: 'Trần Thị B',
    ownerPhone: '0902345678',
    totalRooms: 11,
    availableRooms: 4,
    priceRange: { min: 1500000, max: 3500000 },
    description: 'Nhà trọ gần biển',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng', 'Bảo vệ 24/7']
  },
  {
    id: 11,
    name: 'Nhà trọ Thanh Khê',
    address: '456 Đường Lê Duẩn, Quận Thanh Khê, Đà Nẵng',
    district: 'Quận Thanh Khê',
    city: 'Đà Nẵng',
    ownerId: 1,
    ownerName: 'Nguyễn Văn A',
    ownerPhone: '0901234567',
    totalRooms: 8,
    availableRooms: 2,
    priceRange: { min: 1200000, max: 3000000 },
    description: 'Nhà trọ giá rẻ',
    facilities: ['WiFi', 'WC riêng']
  },
  {
    id: 12,
    name: 'Nhà trọ Sơn Trà',
    address: '789 Đường Võ Nguyễn Giáp, Quận Sơn Trà, Đà Nẵng',
    district: 'Quận Sơn Trà',
    city: 'Đà Nẵng',
    ownerId: 2,
    ownerName: 'Trần Thị B',
    ownerPhone: '0902345678',
    totalRooms: 13,
    availableRooms: 5,
    priceRange: { min: 2000000, max: 4500000 },
    description: 'Nhà trọ view biển',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng', 'Bảo vệ 24/7', 'Thang máy']
  }
];

// Mock phòng trọ
export const mockRooms = [
  {
    id: 1,
    houseId: 1,
    houseName: 'Nhà trọ An Phú',
    roomNumber: '101',
    area: 25,
    price: 2500000,
    status: 'occupied', // available, occupied
    tenantId: 4,
    tenantName: 'Lê Văn C',
    contractStartDate: '2024-01-01',
    contractEndDate: '2024-12-31',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng'],
    description: 'Phòng rộng rãi, thoáng mát'
  },
  {
    id: 2,
    houseId: 1,
    houseName: 'Nhà trọ An Phú',
    roomNumber: '102',
    area: 20,
    price: 2000000,
    status: 'available',
    facilities: ['WiFi', 'WC riêng'],
    description: 'Phòng tiện lợi'
  },
  {
    id: 3,
    houseId: 1,
    houseName: 'Nhà trọ An Phú',
    roomNumber: '103',
    area: 30,
    price: 3500000,
    status: 'occupied',
    tenantId: null,
    contractStartDate: '2024-02-01',
    contractEndDate: '2025-01-31',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng'],
    description: 'Phòng cao cấp'
  },
  {
    id: 4,
    houseId: 2,
    houseName: 'Nhà trọ Bình Thạnh',
    roomNumber: '201',
    area: 18,
    price: 1500000,
    status: 'available',
    facilities: ['WiFi', 'WC riêng'],
    description: 'Phòng giá rẻ'
  },
  {
    id: 5,
    houseId: 3,
    houseName: 'Nhà trọ Gò Vấp',
    roomNumber: '301',
    area: 28,
    price: 3200000,
    status: 'occupied',
    tenantId: 5,
    tenantName: 'Phạm Thị D',
    contractStartDate: '2024-03-01',
    contractEndDate: '2025-02-28',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng', 'Thang máy'],
    description: 'Phòng đẹp, view đẹp'
  },
  {
    id: 6,
    houseId: 3,
    houseName: 'Nhà trọ Gò Vấp',
    roomNumber: '302',
    area: 22,
    price: 2500000,
    status: 'available',
    facilities: ['WiFi', 'Máy lạnh', 'WC riêng'],
    description: 'Phòng sạch sẽ'
  }
];

// Thống kê theo quận/huyện
export const getDistrictStats = () => {
  const stats = {};
  
  mockHouses.forEach(house => {
    const district = house.district;
    if (!stats[district]) {
      stats[district] = {
        district: district,
        totalHouses: 0,
        totalRooms: 0,
        availableRooms: 0
      };
    }
    stats[district].totalHouses += 1;
    stats[district].totalRooms += house.totalRooms;
    stats[district].availableRooms += house.availableRooms;
  });
  
  return Object.values(stats).map(stat => ({
    ...stat,
    occupiedRooms: stat.totalRooms - stat.availableRooms,
    occupancyRate: ((stat.totalRooms - stat.availableRooms) / stat.totalRooms * 100).toFixed(1),
    vacancyRate: (stat.availableRooms / stat.totalRooms * 100).toFixed(1)
  }));
};

// Thống kê theo thành phố
export const getCityStats = (cityName) => {
  const stats = {};
  
  mockHouses
    .filter(house => house.city === cityName)
    .forEach(house => {
      const district = house.district;
      if (!stats[district]) {
        stats[district] = {
          district: district,
          city: cityName,
          totalHouses: 0,
          totalRooms: 0,
          availableRooms: 0
        };
      }
      stats[district].totalHouses += 1;
      stats[district].totalRooms += house.totalRooms;
      stats[district].availableRooms += house.availableRooms;
    });
  
  return Object.values(stats).map(stat => ({
    ...stat,
    occupiedRooms: stat.totalRooms - stat.availableRooms,
    occupancyRate: ((stat.totalRooms - stat.availableRooms) / stat.totalRooms * 100).toFixed(1),
    vacancyRate: (stat.availableRooms / stat.totalRooms * 100).toFixed(1)
  }));
};

// Helper functions
export const getHousesByOwner = (ownerId) => {
  return mockHouses.filter(house => house.ownerId === ownerId);
};

export const getRoomsByHouse = (houseId) => {
  return mockRooms.filter(room => room.houseId === houseId);
};

export const getRoomsByOwner = (ownerId) => {
  const ownerHouses = getHousesByOwner(ownerId);
  const houseIds = ownerHouses.map(house => house.id);
  return mockRooms.filter(room => houseIds.includes(room.houseId));
};

export const getRoomByMember = (memberId) => {
  return mockRooms.find(room => room.tenantId === memberId);
};

