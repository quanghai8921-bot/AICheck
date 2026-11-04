'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/StudentHeader';
import { useRouter } from 'next/navigation';

interface ProfilePageProps {
  onBackToExamList?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBackToExamList }) => {
  const router = useRouter();
  // --- States ---
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);

  // Form Data States
  const [phone, setPhone] = useState<string>('(+84) 912 345 678');
  const [altEmail, setAltEmail] = useState<string>('nguyenvanan.dev@gmail.com');
  const [address, setAddress] = useState<string>(
    'Phòng 402, Tòa nhà Ký túc xá B4, Khu Đô thị Đại học Quốc gia, TP. Thủ Đức, TP. Hồ Chí Minh'
  );

  const [currentPwd, setCurrentPwd] = useState<string>('');
  const [newPwd, setNewPwd] = useState<string>('');
  const [confirmPwd, setConfirmPwd] = useState<string>('');

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- Handlers ---
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactModalOpen(false);
    showToast('Cập nhật thông tin liên hệ thành công!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwd !== confirmPwd) {
      alert('Mật khẩu mới và nhập lại mật khẩu không trùng khớp!');
      return;
    }
    if (newPwd.length < 10) {
      alert('Mật khẩu mới phải có tối thiểu 10 ký tự!');
      return;
    }
    setIsPasswordModalOpen(false);
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    showToast('Đổi mật khẩu ca thi thành công! Vui lòng sử dụng mật khẩu mới khi đăng nhập SafeExam.');
  };

  const handleBackClick = () => {
    if (onBackToExamList) {
      onBackToExamList();
    } else {
      router.push('/pages/student/exam/listExam')
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans antialiased flex flex-col">
      {/* 1. THÊM HEADER VÀO ĐÂY */}
      <Header
        isLoggedIn={true}
        user={{
          name: "Nguyễn Văn An",
          studentId: "SV2024-8841",
          department: "Khoa Công nghệ Thông tin",
          shortName: "AN"
        }}
        onLogout={() => {
          // Xử lý khi thí sinh bấm Đăng xuất từ dropdown Header
          router.push('/student/auth/login');
        }}
      />
      {/* 2. MAIN CONTENT AREA */}
      <main className="w-full flex-1 bg-slate-100">
        <div className="flex flex-col w-full">
          <div className="w-full px-4 md:px-6 py-6 flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Breadcrumb & Top Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={handleBackClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-200 text-slate-700 hover:text-blue-700 transition-all font-semibold border border-slate-200 shadow-xs"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Danh sách môn thi hôm nay</span>
                </button>
                <span className="text-slate-400">/</span>
                <span className="text-blue-900 font-bold">Thông tin cá nhân</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 shadow-xs transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-blue-600">
                    edit_note
                  </span>
                  <span>Cập nhật liên hệ</span>
                </button>

                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">key</span>
                  <span>Đổi mật khẩu ca thi</span>
                </button>
              </div>
            </div>

            {/* Student Master Identity Card Banner */}
            <section className="w-full bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                {/* Avatar & Basic Bio */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative group">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-200 shadow-inner flex items-center justify-center border border-slate-100">
                      <img
                        className="w-full h-full object-cover"
                        alt="Avatar sinh viên"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0WJ8Hsp85pHjy6sZmllCCrVVEu8viDcsGFMxVUTw9wguG7UXJ85Qkcl3E4M-OqQE1x3vwhWQLw-TshOoiCUAZm-0RoMFaPYnWuHXlBy8f_bgsJqP9NZpVh88GUqcATUOC-4qe9Qo6gc4ZwxsKILO2mXgfIlOXmZ0eH_NtI2jFrxCLYTUwEpo3scDnpEA3e52wwbnszTAiPvdRU9KgeNMRvnHaayhL8LQMM0o8R_Cnlit1jW6UUyeMSg"
                      />
                    </div>
                    <div
                      className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-sm ring-2 ring-white"
                      title="Sinh viên chính quy chuẩn hóa"
                    >
                      <span className="material-symbols-outlined text-[16px] block">
                        verified
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-bold text-blue-950 tracking-tight">
                        Nguyễn Văn An
                      </h1>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                        MSSV: SV2024-8841
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Đang theo học chính quy
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-blue-600">
                          domain
                        </span>
                        Khoa Công nghệ Thông tin
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-blue-600">
                          calendar_month
                        </span>
                        Khóa đào tạo 2021 – 2025
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-blue-600">
                          alternate_email
                        </span>
                        <span className="font-semibold text-slate-800">
                          an.nguyen@sinhvien.edu.vn
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Academic Assessment Snapshot KPI */}
                <div className="w-full lg:w-auto flex items-center justify-between sm:justify-start gap-6 pt-4 lg:pt-0 lg:pl-8 lg:border-l lg:border-slate-200">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
                      Học lực tích lũy
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-bold text-blue-900">3.62</span>
                      <span className="text-xs text-slate-400 font-medium">/ 4.0</span>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold">Xuất sắc</span>
                  </div>

                  <div className="w-px h-10 bg-slate-200" />

                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
                      Ca thi đã hoàn tất
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-bold text-slate-900">38</span>
                      <span className="text-xs text-slate-400 font-medium">môn</span>
                    </div>
                    <span className="text-xs text-slate-500">0 vi phạm khảo thí</span>
                  </div>

                  <div className="w-px h-10 bg-slate-200" />

                  {/* Circular Spark Gauge */}
                  <div className="flex items-center gap-2">
                    <div className="relative w-11 h-11 flex items-center justify-center">
                      <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        />
                        <path
                          className="text-emerald-500"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="100, 100"
                          strokeLinecap="round"
                          strokeWidth="3.5"
                        />
                      </svg>
                      <span className="absolute text-[11px] font-bold text-slate-900">100%</span>
                    </div>
                    <div className="flex flex-col text-xs leading-tight">
                      <span className="text-slate-400">Chỉ số</span>
                      <span className="text-blue-700 font-bold">Chuẩn khảo thí</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content Grid (7/12 & 5/12) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (7 cols): Personal Info & Training */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Group 1: Personal Identification */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </div>
                      <h2 className="text-base font-bold text-blue-950">
                        Thông tin cá nhân &amp; Pháp lý
                      </h2>
                    </div>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-100 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        check_circle
                      </span>
                      Đã xác thực CCCD
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs pt-1">
                    <div className="flex flex-col">
                      <span className="text-slate-400">Ngày tháng năm sinh</span>
                      <span className="text-slate-800 font-semibold text-sm mt-0.5">
                        14/10/2003
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-slate-400">Giới tính</span>
                      <span className="text-slate-800 font-semibold text-sm mt-0.5">Nam</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-slate-400">Số CCCD</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-slate-800 font-semibold text-sm tracking-wider font-mono">
                          0792030418
                        </span>
                        <span
                          className="material-symbols-outlined text-blue-600 text-[16px]"
                          title="Đồng bộ CSDL Quốc gia"
                        >
                          verified_user
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-slate-400">Số điện thoại liên hệ</span>
                      <span className="text-slate-800 font-semibold text-sm mt-0.5">
                        {phone}
                      </span>
                    </div>

                    <div className="flex flex-col sm:col-span-2">
                      <span className="text-slate-400">Địa chỉ thường trú đăng ký</span>
                      <span className="text-slate-800 font-medium leading-relaxed mt-0.5">
                        {address}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Group 2: Training Program */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <span className="material-symbols-outlined text-[20px]">menu_book</span>
                      </div>
                      <h2 className="text-base font-bold text-blue-950">
                        Thông tin đào tạo
                      </h2>
                    </div>
                    <span className="text-xs text-slate-500">Học kỳ 2 (2024-2025)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs pt-1">
                    <div className="flex flex-col">
                      <span className="text-slate-400">Chuyên ngành</span>
                      <span className="text-blue-700 font-bold text-sm mt-0.5">
                        Kỹ thuật phần mềm
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-slate-400">Niên khóa đào tạo</span>
                      <span className="text-slate-800 font-semibold text-sm mt-0.5">
                        2021 – 2025
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-slate-400">Kỳ hiện tại</span>
                      <span className="text-slate-800 font-semibold text-sm mt-0.5">9</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-slate-400">Cơ sở</span>
                      <span className="text-slate-800 font-semibold text-sm mt-0.5">
                        Quy Nhơn
                      </span>
                    </div>
                  </div>

                  {/* Academic Condition Banner */}
                  <div className="mt-2 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          fact_check
                        </span>
                      </div>
                      <div className="flex flex-col text-xs">
                        <span className="font-bold text-blue-900 text-sm">
                          Điều kiện dự thi cuối kỳ 2024-2025
                        </span>
                        <span className="text-slate-500">
                          Đã hoàn thành 132/140 tín chỉ • Đủ điều kiện dự 04 môn thi tập trung
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0">
                      HỢP LỆ THAM GIA
                    </span>
                  </div>
                </section>
              </div>

              {/* Right Column (5 cols): Security & Biometric */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                        <span className="material-symbols-outlined text-[20px]">
                          enhanced_encryption
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-blue-950">
                        Sinh trắc học &amp; Bảo mật ca thi
                      </h2>
                    </div>
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-emerald-500"
                      title="Bảo mật cấp độ Enterprise"
                    />
                  </div>

                  {/* AI Facial Recognition Card */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2 text-xs">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-blue-600 text-[24px]">
                          face
                        </span>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">
                            Xác thực khuôn mặt AI (Proctoring)
                          </span>
                          <span className="text-slate-400">Mẫu khuôn mặt 3D phân tích góc nhìn</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                        Đã kích hoạt
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-200">
                      <span>Độ khớp lần quét gần nhất:</span>
                      <span className="font-bold text-emerald-700">99.4% (Chuẩn tuyệt đối)</span>
                    </div>
                  </div>

                  {/* Registered Device Specs */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2 text-xs">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-blue-600 text-[24px]">
                          laptop_mac
                        </span>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">Thiết bị thi chuẩn chỉ định</span>
                          <span className="text-slate-400">MacBook Air M2 (macOS 14.4)</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-blue-900 font-semibold">
                        Khóa phần cứng
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                      <div className="flex flex-col">
                        <span className="text-slate-400">Trình duyệt an toàn:</span>
                        <span className="font-semibold text-slate-800">SafeExam v3.2</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400">Khóa màn hình:</span>
                        <span className="font-semibold text-emerald-700">Kiosk Mode Sẵn sàng</span>
                      </div>
                    </div>
                  </div>

                  {/* FIDO2 Security Token */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2 text-xs">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-blue-600 text-[24px]">
                          security_key
                        </span>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">Passkey / FIDO2</span>
                          <span className="text-slate-400">Apple Touch ID / YubiKey</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                        Đang bảo vệ
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-200">
                      <span>Mã định danh ID:</span>
                      <span className="font-mono text-slate-800 font-semibold">PK-8841-SHA256-VN</span>
                    </div>
                  </div>

                  {/* Guidelines Banner */}
                  <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex items-start gap-2.5 text-xs text-blue-900">
                    <span className="material-symbols-outlined text-blue-600 text-[20px] shrink-0 mt-0.5">
                      info
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold uppercase tracking-wider">
                        Lưu ý phòng thi trực tuyến
                      </span>
                      <p className="leading-relaxed text-slate-600">
                        Thí sinh phải giữ camera và micro luôn hoạt động trong suốt 100% thời gian làm bài. Rời khỏi nhận diện AI quá 15 giây sẽ tự động đình chỉ bài thi.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. MODAL CẬP NHẬT LIÊN HỆ */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in duration-150 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined text-[20px]">contact_phone</span>
                </div>
                <h3 className="text-base font-bold text-blue-950">Cập nhật thông tin liên hệ</h3>
              </div>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-slate-700" htmlFor="input-phone">
                  Số điện thoại di động
                </label>
                <input
                  id="input-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-slate-700" htmlFor="input-email-alt">
                  Email cá nhân nhận thông báo dự phòng
                </label>
                <input
                  id="input-email-alt"
                  type="email"
                  value={altEmail}
                  onChange={(e) => setAltEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-slate-700" htmlFor="input-address">
                  Địa chỉ thường trú cập nhật
                </label>
                <textarea
                  id="input-address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-600 shrink-0">
                  verified
                </span>
                <span>Mã OTP xác thực sẽ được gửi tới số điện thoại này khi lưu thay đổi.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                  type="button"
                >
                  Hủy bỏ
                </button>
                <button
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm"
                  type="submit"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL ĐỔI MẬT KHẨU */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in duration-150 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                </div>
                <h3 className="text-base font-bold text-blue-950">Đổi mật khẩu ca thi</h3>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-slate-700" htmlFor="current-pwd">
                  Mật khẩu khảo thí hiện tại
                </label>
                <input
                  id="current-pwd"
                  required
                  type="password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-slate-700" htmlFor="new-pwd">
                  Mật khẩu mới (Tối thiểu 10 ký tự, gồm số &amp; ký tự đặc biệt)
                </label>
                <input
                  id="new-pwd"
                  required
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-slate-700" htmlFor="confirm-pwd">
                  Nhập lại mật khẩu mới
                </label>
                <input
                  id="confirm-pwd"
                  required
                  type="password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-rose-600 shrink-0">
                  info
                </span>
                <span>Sau khi đổi mật khẩu, bạn cần đăng nhập lại trên ứng dụng SafeExam Browser.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                  type="button"
                >
                  Hủy bỏ
                </button>
                <button
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm"
                  type="submit"
                >
                  Cập nhật mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. TOAST NOTIFICATION FEEDBACK */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 6. FOOTER HỆ THỐNG */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs">
          <div className="flex flex-col">
            <span className="font-bold text-blue-900 text-sm">
              HỘI ĐỒNG KHẢO THÍ VÀ ĐẢM BẢO CHẤT LƯỢNG GIÁO DỤC
            </span>
            <span className="text-slate-500 mt-0.5">
              Cổng thông tin thi trực tuyến dành cho sinh viên chính quy • Bản quyền © 2026
            </span>
          </div>
          <div className="flex items-center gap-6 text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-600">
                support_agent
              </span>
              <span>Đường dây nóng: 1900 6886</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-600">
                verified_user
              </span>
              <span>Bảo mật AES-256</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default ProfilePage;