Intern Management Frontend
Hệ thống quản lý thực tập sinh – phần Frontend (Sprint 1).
Công nghệ

React + TypeScript + Vite
Tailwind CSS
React Hook Form + Zod
Lucide React

Cách chạy dự án
Yêu cầu

Node.js 18+ (khuyến nghị 20 hoặc 22 LTS)

Các bước

Cài đặt package: npm install
Chạy dev server: npm run dev
Mở trình duyệt tại địa chỉ hiện ra (thường là http://localhost:5173)

Cấu trúc thư mục chính
src/

features/
interns/ → Form thêm mới hồ sơ
approval/ → Danh sách duyệt + Chi tiết ứng viên
contracts/ → Quản lý hợp đồng

shared/ → Component dùng chung (sẽ mở rộng sau)
App.tsx

Các màn hình đã làm (Sprint 1 – Đinh Bảo Khanh)

Form thêm mới hồ sơ thực tập sinh
Danh sách hồ sơ chờ duyệt + Empty state
Trang chi tiết ứng viên (preview tài liệu + form lý do từ chối)
Khu vực quản lý hợp đồng theo từng thực tập sinh

Lưu ý: Hiện đang dùng mock data. Thành viên Backend gắn API sau.
Liên hệ
Đinh Bảo Khanh – Frontend.