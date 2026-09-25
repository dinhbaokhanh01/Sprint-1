# Intern Management Frontend

Hệ thống quản lý thực tập sinh – phần Frontend (Sprint 1).

## Công nghệ

- React + TypeScript + Vite
- Tailwind CSS
- React Hook Form + Zod
- Lucide React

## Cách chạy dự án

### Yêu cầu

- Node.js 18+ (khuyến nghị 20 hoặc 22 LTS)

### Các bước

1. Cài đặt package: `npm install`
2. Chạy dev server: `npm run dev`
3. Mở trình duyệt tại địa chỉ hiện ra (thường là http://localhost:5173)

## Cấu trúc thư mục chính
src/
├── features/
│   ├── interns/      → Form thêm mới hồ sơ
│   ├── approval/     → Danh sách duyệt + Chi tiết ứng viên
│   └── contracts/    → Quản lý hợp đồng
├── shared/           → Component dùng chung
└── App.tsx
text## Các màn hình đã làm (Sprint 1 – Đinh Bảo Khanh)

1. Form thêm mới hồ sơ thực tập sinh
2. Danh sách hồ sơ chờ duyệt + Empty state
3. Trang chi tiết ứng viên (preview tài liệu + form lý do từ chối)
4. Khu vực quản lý hợp đồng theo từng thực tập sinh

> Lưu ý: Hiện đang dùng mock data. Thành viên Backend gắn API sau.

## Liên hệ

Đinh Bảo Khanh – Frontend