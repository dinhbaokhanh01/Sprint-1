import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { User, Mail, Phone, GraduationCap, Building2, Calendar, FileText } from "lucide-react";

// ============================================
// SCHEMA VALIDATE
// Thành viên khác có thể chỉnh rule ở đây
// ============================================
const internSchema = z
  .object({
    fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    phone: z
      .string()
      .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ (10 số)"),
    university: z.string().min(1, "Vui lòng nhập trường đại học"),
    major: z.string().min(1, "Vui lòng nhập ngành học"),
    startDate: z.string().min(1, "Vui lòng chọn ngày bắt đầu"),
    endDate: z.string().min(1, "Vui lòng chọn ngày kết thúc"),
    department: z.string().optional(),
    note: z.string().optional(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  });

export type InternFormData = z.infer<typeof internSchema>;

interface InternFormProps {
  onSubmit?: (data: InternFormData) => void | Promise<void>;
  isLoading?: boolean;
  defaultValues?: Partial<InternFormData>;
}

export default function InternForm({
  onSubmit,
  isLoading = false,
  defaultValues,
}: InternFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InternFormData>({
    resolver: zodResolver(internSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      university: "",
      major: "",
      startDate: "",
      endDate: "",
      department: "",
      note: "",
      ...defaultValues,
    },
  });

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleFormSubmit = async (data: InternFormData) => {
    try {
      setMessage(null);

      if (onSubmit) {
        await onSubmit(data);
      } else {
        // TODO: Thành viên Backend sẽ thay thế bằng API thật
        console.log("Dữ liệu form:", data);
        await new Promise((r) => setTimeout(r, 800)); // giả lập loading
      }

      setMessage({
        type: "success",
        text: "Tạo hồ sơ thực tập sinh thành công!",
      });
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Thêm mới hồ sơ thực tập sinh</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Nhập đầy đủ thông tin để tạo hồ sơ mới trong hệ thống
        </p>
      </div>

      {/* Thông báo */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg text-sm flex items-center gap-2 ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.type === "success" ? "✓" : "✕"} {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* ===== NHÓM 1: Thông tin cá nhân ===== */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="font-semibold text-gray-800">Thông tin cá nhân</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Họ tên */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("fullName")}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Nguyễn Văn A"
              />
              {errors.fullName && (
                <p className="mt-1.5 text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  {...register("email")}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="email@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="09xxxxxxxx"
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* ===== NHÓM 2: Học vấn ===== */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
            </div>
            <h2 className="font-semibold text-gray-800">Thông tin học vấn</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Trường đại học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("university")}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Đại học Bách Khoa Hà Nội"
              />
              {errors.university && (
                <p className="mt-1.5 text-sm text-red-500">{errors.university.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Ngành học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("major")}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Công nghệ thông tin"
              />
              {errors.major && (
                <p className="mt-1.5 text-sm text-red-500">{errors.major.message}</p>
              )}
            </div>

          </div>
        </section>

        {/* ===== NHÓM 3: Thời gian & Phòng ban ===== */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-emerald-600" />
            </div>
            <h2 className="font-semibold text-gray-800">Thời gian thực tập & Phòng ban</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Ngày bắt đầu <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("startDate")}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              {errors.startDate && (
                <p className="mt-1.5 text-sm text-red-500">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Ngày kết thúc <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("endDate")}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              {errors.endDate && (
                <p className="mt-1.5 text-sm text-red-500">{errors.endDate.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phòng ban mong muốn
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  {...register("department")}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Phòng Kỹ thuật / HR / Marketing..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== NHÓM 4: Ghi chú ===== */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <FileText className="w-4 h-4 text-amber-600" />
            </div>
            <h2 className="font-semibold text-gray-800">Ghi chú thêm</h2>
          </div>

          <textarea
            {...register("note")}
            rows={3}
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            placeholder="Thông tin bổ sung (nếu có)..."
          />
        </section>

        {/* ===== Nút hành động ===== */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-sm"
          >
            {isLoading ? "Đang lưu..." : "Lưu hồ sơ"}
          </button>

          <button
            type="button"
            onClick={() => {
              reset();
              setMessage(null);
            }}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Làm mới
          </button>
        </div>
      </form>
    </div>
  );
}