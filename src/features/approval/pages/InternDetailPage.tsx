import { ArrowLeft, CheckCircle, XCircle, Mail, Phone, GraduationCap, Building2, Calendar, FileText } from "lucide-react";
import { useState } from "react";

// ============================================
// MOCK DATA chi tiết (sau này lấy từ API theo id)
// ============================================
const mockDetail = {
  id: 1,
  fullName: "Nguyễn Văn A",
  email: "nguyenvana@gmail.com",
  phone: "0912345678",
  university: "Đại học Bách Khoa Hà Nội",
  major: "Công nghệ thông tin",
  department: "Phòng Kỹ thuật",
  startDate: "2026-10-01",
  endDate: "2027-01-31",
  note: "Có kinh nghiệm React, mong muốn thực tập Frontend.",
  status: "pending", // pending | approved | rejected
  createdAt: "2026-09-20",
  documents: [
    { id: 1, name: "CV_NguyenVanA.pdf", type: "CV" },
    { id: 2, name: "DonXinThucTap.pdf", type: "Đơn" },
  ],
};

interface InternDetailPageProps {
  internId?: number;
  onBack?: () => void;
}

export default function InternDetailPage({ internId, onBack }: InternDetailPageProps) {
  // TODO: Sau này gọi API lấy chi tiết theo internId
  const data = mockDetail;

  const [status, setStatus] = useState(data.status);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // ========== Xử lý Duyệt ==========
  const handleApprove = () => {
    // TODO: Gọi API duyệt hồ sơ
    setStatus("approved");
    setMessage("Đã duyệt hồ sơ thành công!");
  };

  // ========== Xử lý Từ chối ==========
  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối");
      return;
    }
    // TODO: Gọi API từ chối + gửi lý do
    setStatus("rejected");
    setShowRejectModal(false);
    setMessage("Đã từ chối hồ sơ.");
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Nút quay lại */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{data.fullName}</h1>
          <p className="text-gray-500 text-sm mt-1">Hồ sơ thực tập sinh • Ngày tạo: {data.createdAt}</p>
        </div>

        {/* Badge trạng thái */}
        <div>
          {status === "pending" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200">
              Chờ duyệt
            </span>
          )}
          {status === "approved" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle className="w-4 h-4" /> Đã duyệt
            </span>
          )}
          {status === "rejected" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-200">
              <XCircle className="w-4 h-4" /> Từ chối
            </span>
          )}
        </div>
      </div>

      {/* Thông báo */}
      {message && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm">
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Thông tin cá nhân */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Thông tin cá nhân</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-gray-500">Email</div>
                <div className="text-gray-900">{data.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-gray-500">Số điện thoại</div>
                <div className="text-gray-900">{data.phone}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Học vấn & Thời gian */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Học vấn & Thời gian thực tập</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <div className="text-gray-500">Trường / Ngành</div>
                <div className="text-gray-900">{data.university}</div>
                <div className="text-gray-600">{data.major}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <div className="text-gray-500">Phòng ban mong muốn</div>
                <div className="text-gray-900">{data.department || "—"}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <div className="text-gray-500">Thời gian thực tập</div>
                <div className="text-gray-900">
                  {data.startDate} → {data.endDate}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ghi chú */}
        {data.note && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-3">Ghi chú</h2>
            <p className="text-sm text-gray-700">{data.note}</p>
          </section>
        )}

        {/* Tài liệu đính kèm */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Tài liệu đính kèm</h2>
          <div className="space-y-2">
            {data.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-800">{doc.name}</div>
                    <div className="text-xs text-gray-500">{doc.type}</div>
                  </div>
                </div>
                <button className="text-sm text-slate-600 hover:text-slate-900 px-3 py-1 rounded-lg hover:bg-slate-100 transition">
                  Xem / Tải
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Nút hành động (chỉ hiện khi đang chờ duyệt) */}
        {status === "pending" && (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleApprove}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition shadow-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Duyệt hồ sơ
            </button>
            <button
              onClick={() => setShowRejectModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition"
            >
              <XCircle className="w-4 h-4" />
              Từ chối
            </button>
          </div>
        )}
      </div>

      {/* ========== MODAL TỪ CHỐI ========== */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lý do từ chối</h3>
            <p className="text-sm text-gray-500 mb-4">
              Vui lòng nhập lý do để thông báo cho ứng viên
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm resize-none"
              placeholder="Ví dụ: Hồ sơ chưa đầy đủ, không phù hợp vị trí..."
            />
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Hủy
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}