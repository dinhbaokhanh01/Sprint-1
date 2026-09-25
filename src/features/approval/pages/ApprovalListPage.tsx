import { useState } from "react";
import { Search, Eye, CheckCircle, XCircle, Clock } from "lucide-react";

// ============================================
// MOCK DATA (Tạm thời)
// Thành viên Backend sẽ thay bằng API thật sau
// ============================================
const mockInterns = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    university: "Đại học Bách Khoa Hà Nội",
    major: "Công nghệ thông tin",
    status: "pending", // pending | approved | rejected
    createdAt: "2026-09-20",
  },
  {
    id: 2,
    fullName: "Trần Thị B",
    email: "tranthib@gmail.com",
    university: "Đại học FPT",
    major: "Kỹ thuật phần mềm",
    status: "pending",
    createdAt: "2026-09-21",
  },
  {
    id: 3,
    fullName: "Lê Văn C",
    email: "levanc@gmail.com",
    university: "Đại học Quốc gia",
    major: "An toàn thông tin",
    status: "approved",
    createdAt: "2026-09-18",
  },
  {
    id: 4,
    fullName: "Phạm Thị D",
    email: "phamthid@gmail.com",
    university: "Đại học Kinh tế",
    major: "Quản trị kinh doanh",
    status: "rejected",
    createdAt: "2026-09-15",
  },
];

// Map trạng thái → hiển thị
const statusMap = {
  pending: {
    label: "Chờ duyệt",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  approved: {
    label: "Đã duyệt",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle,
  },
  rejected: {
    label: "Từ chối",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
  },
};

interface ApprovalListPageProps {
  // Callback khi click xem chi tiết (sau này gắn router)
  onViewDetail?: (id: number) => void;
}

export default function ApprovalListPage({ onViewDetail }: ApprovalListPageProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [search, setSearch] = useState("");

  // Lọc dữ liệu theo filter + search
  const filteredData = mockInterns.filter((item) => {
    const matchStatus = filter === "all" ? true : item.status === filter;
    const matchSearch =
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.university.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Duyệt hồ sơ thực tập sinh</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Quản lý và phê duyệt các hồ sơ đăng ký thực tập
        </p>
      </div>

      {/* Thanh tìm kiếm + Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên, email, trường..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: "all", label: "Tất cả" },
              { key: "pending", label: "Chờ duyệt" },
              { key: "approved", label: "Đã duyệt" },
              { key: "rejected", label: "Từ chối" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === tab.key
                    ? "bg-slate-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tổng số kết quả */}
      <div className="mb-4 text-sm text-gray-500">
        Tìm thấy <span className="font-medium text-gray-800">{filteredData.length}</span> hồ sơ
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredData.length === 0 ? (
          // ========== EMPTY STATE ==========
          <div className="py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">Không tìm thấy hồ sơ nào</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Họ tên</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Trường / Ngành</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Trạng thái</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Ngày tạo</th>
                  <th className="text-right px-5 py-3 font-medium text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item) => {
                  const status = statusMap[item.status as keyof typeof statusMap];
                  const StatusIcon = status.icon;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4">
                        <div className="font-medium text-gray-900">{item.fullName}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{item.email}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-gray-800">{item.university}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{item.major}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{item.createdAt}</td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => onViewDetail?.(item.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        >
                          <Eye className="w-4 h-4" />
                          Xem
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}