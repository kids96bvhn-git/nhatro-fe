# Ứng dụng Quản Lý Nhà Trọ

Ứng dụng web frontend quản lý nhà trọ được xây dựng bằng ReactJS, Material-UI và SweetAlert2.

## Tính năng

- **Quản lý người dùng với 4 loại role:**
  - Super Admin: Quản trị viên toàn hệ thống
  - Owner Admin: Chủ nhà trọ
  - Member: Khách thuê trọ
  - Guest: Khách xem

- **Dashboard:**
  - Thống kê số lượng nhà trọ theo quận/huyện
  - Thống kê số lượng phòng và tỷ lệ phòng trống
  - Biểu đồ tròn thể hiện tỷ lệ phòng trống theo khu vực

- **Danh sách nhà trọ:**
  - Xem danh sách tất cả nhà trọ
  - Tìm kiếm theo tên, địa chỉ, quận/huyện
  - Xem thông tin chi tiết nhà trọ

- **Quản lý nhà trọ (Owner Admin):**
  - Xem danh sách nhà trọ của mình
  - Thêm, sửa, xóa nhà trọ
  - Xem danh sách phòng của từng nhà trọ

- **Quản lý phòng trọ (Member):**
  - Xem thông tin phòng đang thuê
  - Theo dõi tình trạng hợp đồng
  - Xem thời gian còn lại của hợp đồng

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

**Lưu ý:** Khi chạy `npm install`, bạn có thể thấy nhiều cảnh báo `deprecated`. Đây là **bình thường** và **không ảnh hưởng** đến việc chạy ứng dụng. Các cảnh báo này xuất hiện do `react-scripts` sử dụng một số dependencies cũ, nhưng chúng vẫn hoạt động tốt.

**Nếu gặp lỗi "Segmentation fault":**
- Xem file `TROUBLESHOOTING.md` để biết cách xử lý
- Hoặc chạy script dọn dẹp:
  - Windows PowerShell: `.\clean-install.ps1`
  - Linux/Mac: `bash clean-install.sh`

2. Chạy ứng dụng:
```bash
npm start
```

Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000)

## Tài khoản demo

- **Super Admin:**
  - Username: `superadmin`
  - Password: `admin123`

- **Owner Admin:**
  - Username: `owner1`
  - Password: `owner123`

- **Member:**
  - Username: `member1`
  - Password: `member123`

## Công nghệ sử dụng

- React 18.2.0
- Material-UI 5.14.20
- React Router DOM 6.20.1
- SweetAlert2 11.10.1
- Material-UI Charts (PieChart)

## Cấu trúc thư mục

```
src/
├── components/          # Các component dùng chung
│   ├── Layout.js       # Layout chính với Navbar
│   └── ProtectedRoute.js # Route bảo vệ theo role
├── context/             # React Context
│   └── AuthContext.js  # Context quản lý authentication
├── data/                # Mock data
│   └── mockData.js     # Dữ liệu mẫu
├── pages/               # Các trang
│   ├── Login.js        # Trang đăng nhập
│   ├── Dashboard.js    # Trang dashboard
│   ├── Houses.js       # Trang danh sách nhà trọ
│   ├── ManageHouses.js # Trang quản lý nhà trọ
│   └── ManageRooms.js  # Trang quản lý phòng trọ
├── App.js              # Component chính với routing
└── index.js            # Entry point
```

## Ghi chú

- Ứng dụng hiện đang sử dụng mock data, chưa kết nối với API backend
- Dữ liệu được lưu trong localStorage cho session đăng nhập
- Tất cả các chức năng CRUD đang hiển thị thông báo thành công nhưng chưa thực sự cập nhật dữ liệu (do sử dụng mock data)

## Xử lý lỗi

Nếu gặp vấn đề khi cài đặt hoặc chạy ứng dụng, xem file `TROUBLESHOOTING.md` để biết cách xử lý các lỗi thường gặp.
