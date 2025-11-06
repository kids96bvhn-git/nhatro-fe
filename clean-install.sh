#!/bin/bash
# Script để xóa và cài đặt lại dependencies (Linux/Mac)

echo "Đang xóa node_modules và package-lock.json..."
rm -rf node_modules package-lock.json

echo "Đang xóa npm cache..."
npm cache clean --force

echo "Đang cài đặt lại dependencies..."
npm install

echo "Hoàn thành!"

