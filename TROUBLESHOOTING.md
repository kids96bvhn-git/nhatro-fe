# Hướng dẫn xử lý lỗi

## Cảnh báo Deprecated khi npm install

Các cảnh báo `deprecated` là **bình thường** và **không ảnh hưởng** đến việc chạy ứng dụng. Chúng xuất hiện vì:

1. **react-scripts** sử dụng các dependencies cũ (như eslint 8, babel plugins cũ)
2. Các package này vẫn hoạt động tốt, chỉ là đã có phiên bản mới hơn
3. Đây là cảnh báo, không phải lỗi

**Bạn có thể bỏ qua các cảnh báo này** - ứng dụng vẫn chạy bình thường.

## Lỗi Segmentation Fault

Nếu gặp lỗi `Segmentation fault` khi chạy `npm install`, thử các giải pháp sau:

### Giải pháp 1: Sử dụng script dọn dẹp (Khuyến nghị)

**Trên Windows PowerShell:**
```powershell
.\clean-install.ps1
```

**Trên Linux/Mac:**
```bash
bash clean-install.sh
```

Hoặc thực hiện thủ công:
```bash
# Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json

# Xóa npm cache
npm cache clean --force

# Cài đặt lại
npm install
```

### Giải pháp 2: Kiểm tra phiên bản Node.js
```bash
# Kiểm tra phiên bản Node.js
node -v

# Nên sử dụng Node.js version 16.x, 18.x hoặc 20.x
# Nếu version quá cũ hoặc quá mới, cài đặt lại Node.js từ nodejs.org
```

### Giải pháp 3: Sử dụng yarn thay vì npm
```bash
# Cài đặt yarn (nếu chưa có)
npm install -g yarn

# Sử dụng yarn để cài đặt
yarn install
```

### Giải pháp 4: Cài đặt với flag --legacy-peer-deps
```bash
npm install --legacy-peer-deps
```

### Giải pháp 5: Kiểm tra quyền truy cập
- Trên Windows: Chạy PowerShell/Terminal với quyền Administrator
- Kiểm tra xem có đủ dung lượng ổ đĩa không

## Sau khi cài đặt thành công

Chạy ứng dụng:
```bash
npm start
```

Ứng dụng sẽ mở tại http://localhost:3000

## Nếu vẫn gặp lỗi

1. Kiểm tra log chi tiết để xem lỗi cụ thể
2. Thử cài đặt từng package riêng lẻ
3. Kiểm tra firewall/antivirus có chặn npm không
4. Thử trên máy khác để xác định là lỗi môi trường

