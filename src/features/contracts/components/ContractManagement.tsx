import { useState } from "react";
import { Upload, FileText, Download, CheckCircle, Clock, Trash2 } from "lucide-react";

// ============================================
// MOCK DATA hợp đồng (sau này lấy từ API theo internId)
// ============================================
const mockContracts = [
  {
    id: 1,
    fileName: "HopDong_NguyenVanA_v1.pdf",
    uploadedAt: "2026-09-22 14:30",
    uploadedBy: "HR Nguyễn Thị H",
    status: "pending", // pending | confirmed
    size: "245 KB",
  },
  {
    id: 2,
    fileName: "HopDong_NguyenVanA_v2.pdf",
    uploadedAt: "2026-09-24 09:15",
    uploadedBy: "HR Nguyễn Thị H",
    status: "confirmed",
    size: "251 KB",
  },
];

interface ContractManagementProps {
  internId?: number;
  internName?: string;
}

export default function ContractManagement({
  internId,
  internName = "Nguyễn Văn A",
}: ContractManagementProps) {
  const [contracts, setContracts] = useState(mockContracts);
  const [isUploading, setIsUploading] = useState(false);

  // ========== Xử lý Upload (UI only) ==========
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: Thành viên Backend sẽ gắn API upload thật ở đây
    setIsUploading(true);

    // Giả lập upload
    setTimeout(() => {
      const newContract = {
        id: Date.now(),
        fileName: file.name,
        uploadedAt: new Date().toLocaleString("vi-VN"),
        uploadedBy: "Bạn (HR)",
        status: "pending" as const,
        size: `${Math.round(file.size / 1024)} KB`,
      };
      setContracts((prev) => [newContract, ...prev]);
      setIsUploading(false);
      alert("Upload hợp đồng thành công! (Đây là giả lập)");
    }, 1000);
  };

  // ========== Xác nhận hợp đồng ==========
  const handleConfirm = (id: number) => {
    // TODO: Gọi API xác nhận hợp đồng
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "confirmed" } : c))
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý hợp đồng</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Thực tập sinh: <span className="font-medium text-gray-800">{internName}</span>
        </p>
      </div>

      {/* Khu vực Upload */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Upload hợp đồng mới</h2>

        <label
          className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition ${
            isUploading
              ? "border-gray-300 bg-gray-50"
              : "border-gray-300 hover:border-slate-400 hover:bg-slate-50"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className={`w-8 h-8 ${isUploading ? "text-gray-400" : "text-slate-500"}`} />
            <p className="text-sm text-gray-600">
              {isUploading ? "Đang upload..." : "Kéo thả file hoặc click để chọn"}
            </p>
            <p className="text-xs text-gray-400">Hỗ trợ PDF, DOCX (tối đa 10MB)</p>
          </div>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Danh sách hợp đồng */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">
            Danh sách hợp đồng ({contracts.length})
          </h2>
        </div>

        {contracts.length === 0 ? (
          <div className="py-14 text-center">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Chưa có hợp đồng nào được upload</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{contract.fileName}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {contract.size} • Upload bởi {contract.uploadedBy} • {contract.uploadedAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Trạng thái */}
                  {contract.status === "pending" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock className="w-3.5 h-3.5" />
                      Chờ xác nhận
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Đã xác nhận
                    </span>
                  )}

                  {/* Nút hành động */}
                  <button
                    className="p-2 text-gray-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                    title="Tải xuống"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  {contract.status === "pending" && (
                    <button
                      onClick={() => handleConfirm(contract.id)}
                      className="px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                    >
                      Xác nhận
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}