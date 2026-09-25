import { useState } from "react";
import InternForm from "./features/interns/components/InternForm";
import ApprovalListPage from "./features/approval/pages/ApprovalListPage";
import InternDetailPage from "./features/approval/pages/InternDetailPage";
import ContractManagement from "./features/contracts/components/ContractManagement";

type View = "form" | "approval" | "detail" | "contracts";

function App() {
  const [view, setView] = useState<View>("form");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== MENU CHUYỂN MÀN HÌNH (tạm cho Sprint 1) ===== */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          <button
            onClick={() => setView("form")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              view === "form"
                ? "bg-slate-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            1. Form thêm hồ sơ
          </button>
          <button
            onClick={() => setView("approval")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              view === "approval" || view === "detail"
                ? "bg-slate-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            2. Duyệt hồ sơ
          </button>
          <button
            onClick={() => setView("contracts")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              view === "contracts"
                ? "bg-slate-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            3. Quản lý hợp đồng
          </button>
        </div>
      </nav>

      {/* ===== NỘI DUNG MÀN HÌNH ===== */}
      <div className="py-10 px-4">
        {view === "form" && <InternForm />}

        {view === "approval" && (
          <ApprovalListPage
            onViewDetail={(id) => {
              setSelectedId(id);
              setView("detail");
            }}
          />
        )}

        {view === "detail" && (
          <InternDetailPage
            internId={selectedId ?? undefined}
            onBack={() => setView("approval")}
          />
        )}

        {view === "contracts" && (
          <ContractManagement internId={1} internName="Nguyễn Văn A" />
        )}
      </div>
    </div>
  );
}

export default App;