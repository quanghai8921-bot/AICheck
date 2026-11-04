"use client";
import React, { useState } from 'react';

export default function LecturerProfileSecurity() {
    // State thông báo & sao chép mã băm
    const [copiedHash, setCopiedHash] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; message: string }>({
        show: false,
        message: '',
    });

    const sha256Hash = '7f8a91c0e3a1f440b8e72c8411d3fa96102be8d1973a9032b6d41a8e';

    // Hàm trigger Toast
    const triggerToast = (message: string) => {
        setToast({ show: true, message });
        setTimeout(() => {
            setToast({ show: false, message: '' });
        }, 3500);
    };

    // Sao chép mã băm SHA256
    const handleCopyHash = () => {
        navigator.clipboard.writeText(sha256Hash);
        setCopiedHash(true);
        triggerToast('Đã sao chép mã băm SHA256 công khai vào Clipboard!');
        setTimeout(() => setCopiedHash(false), 2000);
    };

    return (
        <div className="bg-slate-50 font-sans text-slate-900 antialiased min-h-screen flex flex-col">
            {/* Main Container */}
            <main className="w-full bg-slate-50 min-h-[calc(100vh-4rem)] flex-1">
                <div className="flex flex-col w-full">
                    {/* Sub-Header Context Bar */}
                    <div className="w-full bg-white border-b border-slate-200 shadow-xs">
                        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <a
                                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-900 transition-colors text-xs font-semibold group"
                                href="#"
                            >
                                <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
                                    arrow_back
                                </span>
                                <span>Về Bảng điều khiển giảng viên / Thông tin cá nhân</span>
                            </a>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                <button
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg shadow-xs transition-colors"
                                    type="button"
                                    onClick={() => triggerToast('Mở cửa sổ cập nhật thông tin liên hệ và số điện thoại.')}
                                >
                                    <span className="material-symbols-outlined text-[18px] text-slate-500">contact_mail</span>
                                    <span>Cập nhật liên hệ</span>
                                </button>
                                <button
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-lg shadow-xs transition-all hover:shadow-md"
                                    type="button"
                                    onClick={() => triggerToast('Mở trình quản lý mật khẩu PIN ca thi & Khai báo chữ ký số CA.')}
                                >
                                    <span className="material-symbols-outlined text-[18px]">key</span>
                                    <span>Đổi mật khẩu ca thi &amp; Chữ ký số</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Workspace */}
                    <div className="w-full max-w-7xl mx-auto px-6 py-6 space-y-6">
                        {/* Profile Header Card */}
                        <section className="w-full bg-white rounded-xl shadow-xs border border-slate-200 p-6">
                            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                                {/* Faculty Identity Info */}
                                <div className="flex items-start sm:items-center gap-6 flex-1 min-w-0">
                                    <div className="relative shrink-0">
                                        <img
                                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-xs bg-slate-200 border border-slate-200"
                                            alt="Chân dung giảng viên TS. Lê Quang Mai"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXcClRDJBWkMGxJ8Cu2BlRM380_6KyGuUzIFNSnmOq7S52_5ZTFxc3HzO2BRZtsoOFm3jKIRTBJfjiBOwaqupq9wQGKTWdXpEFWKGnJq5uxipt12E2JaMWibfPxdg_86wfecm_clvsfpScvS_K109yKteY4amXYAMc5Rw2MxFZ-G9YLw38aNub5UfPOpzOXd1xtm7f9t48jl28mlBJZ19WvCSuCeIbmQBxcgg_zPNf032QoNzPkGxgYQ"
                                        />
                                        <div
                                            className="absolute -bottom-1.5 -right-1.5 bg-emerald-900 text-emerald-400 w-7 h-7 rounded-full flex items-center justify-center shadow-xs border border-emerald-700"
                                            title="Tài khoản giảng viên đã xác thực"
                                        >
                                            <span
                                                className="material-symbols-outlined text-[18px]"
                                                style={{ fontVariationSettings: "'FILL' 1" }}
                                            >
                                                verified
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col min-w-0 space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h1 className="text-xl text-blue-900 font-bold tracking-tight">TS. Lê Quang Mai</h1>
                                            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold">
                                                MSGV: GV2024-1049
                                            </span>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                <span>Đang công tác chính quy</span>
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-900 font-semibold truncate">Khoa Khoa Học Máy Tính &amp; Trí Tuệ Nhân Tạo</p>
                                        <p className="text-xs text-slate-500 truncate">Viện Công Nghệ Thông Tin &amp; Truyền Thông</p>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-500">
                                            <div className="inline-flex items-center gap-1 hover:text-blue-900 transition-colors">
                                                <span className="material-symbols-outlined text-[16px] text-blue-900">mail</span>
                                                <span className="font-semibold text-slate-700">mai.lequang@hust.edu.vn</span>
                                            </div>
                                            <span className="text-slate-300">•</span>
                                            <div className="inline-flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-slate-400">badge</span>
                                                <span className="font-semibold text-slate-700">Học vị: Tiến sĩ (ĐHBK)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Academic KPI Telemetry */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full xl:w-auto shrink-0 bg-slate-100 p-3 rounded-xl border border-slate-200">
                                    {/* KPI 1 */}
                                    <div className="flex flex-col justify-center px-3 py-2 bg-white rounded-lg shadow-xs border border-slate-200">
                                        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                                            Thâm Niên Giảng Dạy
                                        </span>
                                        <div className="flex items-baseline gap-1 mt-0.5">
                                            <span className="text-2xl text-blue-900 font-bold leading-none">12</span>
                                            <span className="text-sm text-blue-900 font-semibold">Năm</span>
                                        </div>
                                        <span className="text-xs text-emerald-700 mt-1 font-semibold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">star</span>
                                            <span>Xuất sắc cấp Viện</span>
                                        </span>
                                    </div>

                                    {/* KPI 2 */}
                                    <div className="flex flex-col justify-center px-3 py-2 bg-white rounded-lg shadow-xs border border-slate-200">
                                        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                                            Ca Thi Đã Chủ Trì / Coi
                                        </span>
                                        <div className="flex items-baseline gap-1 mt-0.5">
                                            <span className="text-2xl text-blue-900 font-bold leading-none">48</span>
                                            <span className="text-sm text-blue-900 font-semibold">Ca thi</span>
                                        </div>
                                        <span className="text-xs text-slate-500 mt-1 font-medium truncate">Kỳ chính thức &amp; ĐGNL</span>
                                    </div>

                                    {/* KPI 3: Integrity Dial */}
                                    <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg shadow-xs border border-slate-200">
                                        <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                <path
                                                    className="text-slate-200"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3.5"
                                                />
                                                <path
                                                    className="text-emerald-600"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeDasharray="100, 100"
                                                    strokeLinecap="round"
                                                    strokeWidth="3.5"
                                                />
                                            </svg>
                                            <span className="absolute font-mono text-[11px] text-blue-900 font-bold">100%</span>
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Điểm Liêm Chính</span>
                                            <span className="text-xs text-emerald-700 font-semibold truncate">Tuyệt đối (0 vi phạm)</span>
                                            <span className="text-[11px] text-slate-400">Chuẩn khảo thí quốc gia</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Two-Column Symmetric Workspace Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                            {/* Left Column */}
                            <div className="flex flex-col space-y-6">
                                {/* Card 1: Thông tin cá nhân & Pháp lý */}
                                <article className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
                                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-900">
                                                <span className="material-symbols-outlined text-[20px]">badge</span>
                                            </div>
                                            <h2 className="text-base text-blue-900 font-bold">Thông tin cá nhân &amp; Pháp lý</h2>
                                        </div>
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                                            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                verified_user
                                            </span>
                                            <span>Đã xác thực VNeID Mức 2</span>
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <span className="text-xs text-slate-500 block">Ngày sinh</span>
                                            <span className="text-sm text-slate-900 font-semibold">18/06/1982</span>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <span className="text-xs text-slate-500 block">Giới tính</span>
                                            <span className="text-sm text-slate-900 font-semibold">Nam</span>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <span className="text-xs text-slate-500 block">Số CCCD / Mã định danh</span>
                                            <span className="text-sm text-slate-900 font-semibold font-mono tracking-wide">001082008899</span>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <span className="text-xs text-slate-500 block">Số điện thoại liên hệ</span>
                                            <span className="text-sm text-slate-900 font-semibold font-mono">(+84) 912 888 999</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-start gap-3">
                                        <span className="material-symbols-outlined text-blue-900 text-[20px] mt-0.5 shrink-0">meeting_room</span>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500">Văn phòng tiếp sinh viên &amp; Hội đồng</span>
                                            <span className="text-xs text-slate-900 font-semibold leading-snug">
                                                Phòng 502, Tòa nhà B1, Đại học Bách Khoa, Hai Bà Trưng, Hà Nội
                                            </span>
                                        </div>
                                    </div>
                                </article>

                                {/* Card 2: Học vị, Chuyên môn & Giảng dạy */}
                                <article className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
                                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-900">
                                                <span className="material-symbols-outlined text-[20px]">school</span>
                                            </div>
                                            <h2 className="text-base text-blue-900 font-bold">Học vị, Chuyên môn &amp; Giảng dạy</h2>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                                            Học kỳ 1 (2024 - 2025)
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1 font-semibold">Học vị cao nhất</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-base text-blue-900 font-bold">Tiến sĩ Khoa học Máy tính</span>
                                                <span className="text-slate-500 text-xs">(Đại học Bách Khoa Hà Nội)</span>
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-xs text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
                                                Lĩnh vực chuyên môn &amp; Nghiên cứu
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg">
                                                    Cấu trúc dữ liệu &amp; Thuật toán
                                                </span>
                                                <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg">
                                                    Xử lý ngôn ngữ tự nhiên (NLP)
                                                </span>
                                                <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg">
                                                    Hệ thống khảo thí tự động
                                                </span>
                                                <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg">
                                                    Phân tích văn phong (Stylometry)
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-xs text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
                                                Học phần phụ trách ra đề &amp; Thẩm định
                                            </span>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <span className="w-2 h-2 rounded-full bg-blue-900 shrink-0"></span>
                                                        <span className="text-xs font-semibold text-slate-900 truncate">
                                                            CS201 - Cấu trúc dữ liệu &amp; Giải thuật
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-slate-500 font-semibold shrink-0">Chủ biên ngân hàng đề</span>
                                                </div>

                                                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <span className="w-2 h-2 rounded-full bg-blue-900 shrink-0"></span>
                                                        <span className="text-xs font-semibold text-slate-900 truncate">
                                                            ENG302 - Kỹ năng viết học thuật
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-slate-500 font-semibold shrink-0">Chuyên gia phản biện</span>
                                                </div>

                                                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <span className="w-2 h-2 rounded-full bg-blue-900 shrink-0"></span>
                                                        <span className="text-xs font-semibold text-slate-900 truncate">
                                                            AI401 - Học máy &amp; Khai phá dữ liệu
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-slate-500 font-semibold shrink-0">Trưởng ban thẩm định</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Frame: Council position */}
                                        <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-100 flex items-start gap-3 text-blue-900">
                                            <span className="material-symbols-outlined text-[22px] shrink-0 mt-0.5">gavel</span>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold">Ủy viên thường trực Hội đồng Khảo thí Đại học</span>
                                                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                                                    Phụ trách phê duyệt khung đề thi chuẩn hóa khối CNTT và kiểm soát chất lượng thẩm định tự động.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col space-y-6">
                                {/* Card 1: Chứng thư số & Bảo mật ca thi */}
                                <article className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
                                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-900">
                                                <span className="material-symbols-outlined text-[20px]">encrypted</span>
                                            </div>
                                            <h2 className="text-base text-blue-900 font-bold">Chứng thư số &amp; Bảo mật ca thi</h2>
                                        </div>
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            <span>CA Kích hoạt</span>
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        {/* CA Token Section */}
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-blue-900 text-[20px]">token</span>
                                                    <span className="text-xs text-blue-900 font-bold">Chứng thư số CA-Token giảng viên</span>
                                                </div>
                                                <span className="text-[11px] px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-bold">
                                                    Cấp bởi Ban Cơ yếu CP
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                                                <div>
                                                    <span className="text-slate-500 block">Chủ sở hữu định danh:</span>
                                                    <span className="font-semibold text-slate-900">LE QUANG MAI (CNTT - HUST)</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block">Thời hạn sử dụng:</span>
                                                    <span className="font-semibold text-slate-900">31/12/2026 (Còn 654 ngày)</span>
                                                </div>
                                            </div>

                                            <div className="pt-2">
                                                <span className="text-xs text-slate-500 block mb-1">Mã băm SHA256 (Khóa công khai):</span>
                                                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-600">
                                                    <span className="truncate">{sha256Hash}</span>
                                                    <button
                                                        className="ml-2 hover:text-blue-900 transition-colors shrink-0 flex items-center gap-1 text-[11px] font-sans font-bold text-blue-900"
                                                        title="Sao chép mã băm"
                                                        type="button"
                                                        onClick={handleCopyHash}
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">
                                                            {copiedHash ? 'check' : 'content_copy'}
                                                        </span>
                                                        {copiedHash ? 'Đã chép' : 'Sao chép'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* FIDO2 Passkey Section */}
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-blue-900 text-[20px]">fingerprint</span>
                                                    <span className="text-xs text-blue-900 font-bold">Sinh trắc học / FIDO2 Passkey</span>
                                                </div>
                                                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                    <span>Đã ghép nối</span>
                                                </span>
                                            </div>

                                            <p className="text-xs text-slate-500 pt-1">
                                                Khóa vật lý và sinh trắc học cá nhân dùng để mở niêm phong ngân hàng đề thi điện tử và kích hoạt giám thị:
                                            </p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                                <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-slate-500 text-[18px]">touch_app</span>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-xs text-slate-900 font-semibold truncate">Apple Touch ID</span>
                                                        <span className="text-[10px] text-slate-400 truncate">Tích hợp bàn phím Magic</span>
                                                    </div>
                                                </div>

                                                <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-slate-500 text-[18px]">usb</span>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-xs text-slate-900 font-semibold truncate">YubiKey 5C NFC</span>
                                                        <span className="text-[10px] text-slate-400 truncate">Slot 1: HUST-PKI Auth</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hardware Designated Exam Station */}
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-blue-900 text-[20px]">laptop_mac</span>
                                                    <span className="text-xs text-blue-900 font-bold">Thiết bị khảo thí chỉ định</span>
                                                </div>
                                                <span className="text-[11px] px-2 py-0.5 bg-blue-100 text-blue-900 font-bold rounded">
                                                    Kiosk Mode Sẵn Sàng
                                                </span>
                                            </div>

                                            <div className="space-y-1.5 pt-2 text-xs">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-slate-500 font-medium">Dòng máy:</span>
                                                    <span className="font-semibold text-slate-900">MacBook Pro M2 Max (14-inch, 2023)</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-slate-500 font-medium">Hệ điều hành &amp; Mã hóa:</span>
                                                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[15px] text-emerald-600">lock</span>
                                                        <span>FileVault ON, macOS Sonoma 14.5</span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-slate-500 font-medium">Định danh phần cứng (UUID):</span>
                                                    <span className="font-mono text-slate-600 text-[11px]">B498-F02A-88D1-E400</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Proctoring Warning Frame */}
                                        <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-100 flex items-start gap-3 text-slate-700">
                                            <span className="material-symbols-outlined text-blue-900 text-[22px] shrink-0 mt-0.5">info</span>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-blue-900">Lưu ý giám sát ca thi</span>
                                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                                    Giảng viên và cán bộ coi thi phải kích hoạt chứng thư số và duy trì kết nối mạng nội bộ ổn định trong suốt thời gian diễn ra ca thi. Mọi sự cố ngắt kết nối sẽ được ghi lại trong nhật ký liêm chính.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating Notification Toast */}
            {toast.show && (
                <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl flex items-center gap-3 transition-all">
                    <span className="material-symbols-outlined text-emerald-400 text-[24px]">check_circle</span>
                    <span className="text-xs font-semibold">{toast.message}</span>
                </div>
            )}

            {/* Footer */}
            <footer className="w-full bg-white border-t border-slate-200 py-4 mt-auto shadow-xs">
                <div className="w-full px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div className="flex flex-col">
                        <span className="text-xs text-blue-900 font-bold">
                            HỘI ĐỒNG KHẢO THÍ VÀ ĐẢM BẢO CHẤT LƯỢNG GIÁO DỤC
                        </span>
                        <span className="text-xs text-slate-500">
                            Cổng thông tin thi trực tuyến dành cho sinh viên chính quy • Bản quyền © 2025
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                            <span className="material-symbols-outlined text-[16px]">support_agent</span>
                            <span>Đường dây nóng: 1900 6886</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                            <span className="material-symbols-outlined text-[16px]">verified_user</span>
                            <span>Bảo mật AES-256</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}