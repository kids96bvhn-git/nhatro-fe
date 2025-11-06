# Script để xóa và cài đặt lại dependencies (Windows PowerShell)

Write-Host "Đang xóa node_modules và package-lock.json..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

Write-Host "Đang xóa npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host "Đang cài đặt lại dependencies..." -ForegroundColor Yellow
npm install

Write-Host "Hoàn thành!" -ForegroundColor Green

