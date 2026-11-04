"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/StudentHeader';

// 1. Định nghĩa Interface cho Props của HomePage
interface HomePageProps {
    onNavigateToStudent?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToStudent }) => {
    const router = useRouter();

    // --- States ---
    const [language, setLanguage] = useState<'VIE' | 'ENG'>('VIE');
    const [systemClock, setSystemClock] = useState<string>('21:51:50');
    const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

    // --- Real-time System Clock (UTC+7) ---
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const timeStr = now.toTimeString().split(' ')[0];
            setSystemClock(timeStr);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // --- Handlers ---
    const handleStudentLogin = () => {
        if (onNavigateToStudent) {
            onNavigateToStudent();
            return;
        }
        router.push('/pages/student/auth');
    };

    const handleLecturerLogin = () => {
        router.push('/pages/teacher/auth');
    };

    const handleAdminLogin = () => {
        alert('Đang truy cập Cổng Quản trị & Hội đồng ra đề thi Quốc gia...');
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col">
            /* 1. THÊM HEADER VÀO ĐÂY */
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
            {/* 2. KHU VỰC NỘI DUNG CHÍNH */}
            <main className="w-full pt-16 flex-1 bg-slate-50">
                <div className="flex flex-col w-full">
                    {/* Hero Banner Context */}
                    <section className="relative w-full overflow-hidden bg-slate-100/70 border-b border-slate-200 py-12 md:py-16">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent pointer-events-none" />
                        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
                            {/* Institutional Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xs border border-slate-200 mb-6">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs text-blue-900 tracking-wider uppercase font-bold">
                                    CỔNG KHẢO THÍ HỌC THUẬT QUỐC GIA &amp; ĐẠI HỌC • HỆ THỐNG ĐÁNH GIÁ NĂNG LỰC TRỰC TUYẾN
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-950 max-w-4xl tracking-tight leading-tight mb-4">
                                Nền Tảng Khảo Thí &amp; Đánh Giá Năng Lực Trực Tuyến Toàn Diện
                            </h1>

                            {/* Subtitle */}
                            <p className="text-sm md:text-base text-slate-600 max-w-3xl leading-relaxed mb-8">
                                Môi trường thi cử minh bạch, bảo mật chuẩn ISO/IEC 27001 và tối ưu công thái học học thuật phục vụ toàn diện giảng viên, sinh viên và hội đồng khảo thí quốc gia.
                            </p>

                            {/* Stat Pills */}
                            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white shadow-xs border border-slate-200 text-xs font-semibold text-slate-700">
                                    <span className="material-symbols-outlined text-[18px] text-emerald-600">
                                        verified_user
                                    </span>
                                    <span>Định Danh Sinh Trắc Học &amp; SSO</span>
                                </div>
                                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white shadow-xs border border-slate-200 text-xs font-semibold text-slate-700">
                                    <span className="material-symbols-outlined text-[18px] text-blue-600">
                                        cloud_done
                                    </span>
                                    <span>Tự Động Lưu Thời Gian Thực</span>
                                </div>
                                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white shadow-xs border border-slate-200 text-xs font-semibold text-slate-700">
                                    <span className="material-symbols-outlined text-[18px] text-indigo-600">
                                        balance
                                    </span>
                                    <span>Giám Sát Chuẩn Quy Chế Bộ GD&amp;ĐT</span>
                                </div>
                            </div>

                            {/* DUAL ROLE GATEWAYS (SINH VIÊN & GIẢNG VIÊN) */}
                            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                {/* CARD 1: DÀNH CHO SINH VIÊN */}
                                <div className="group relative rounded-2xl bg-white p-6 lg:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform duration-200 border border-blue-100">
                                                <span className="material-symbols-outlined text-[32px]">school</span>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                                                Khu Vực Thí Sinh
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                                            Dành Cho Sinh Viên &amp; Thí Sinh
                                        </h2>
                                        <p className="text-xs md:text-sm text-slate-500 mb-6 leading-relaxed">
                                            Truy cập phòng thi số, làm bài thi tự luận hoặc trắc nghiệm, kiểm tra tương thích camera micro và tra cứu kết quả bài thi cá nhân.
                                        </p>

                                        <div className="space-y-3 mb-8 text-xs text-slate-700">
                                            <div className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 text-blue-600 font-bold">
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                </div>
                                                <span>Xác thực 1 chạm SSO tài khoản trường (@sinhvien.edu.vn)</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 text-blue-600 font-bold">
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                </div>
                                                <span>Phòng thi viết học thuật chống gián đoạn, tự động đồng bộ</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 text-blue-600 font-bold">
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                </div>
                                                <span>Kiểm tra thông số micro, webcam &amp; tốc độ mạng tức thì</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 pt-2">
                                        <button
                                            onClick={handleStudentLogin}
                                            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all duration-200"
                                            type="button"
                                        >
                                            <span>Đăng Nhập Với Tư Cách Sinh Viên</span>
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                        <div className="flex items-center justify-between px-1 text-xs">
                                            <button
                                                onClick={() => setIsGuideModalOpen(true)}
                                                className="text-blue-700 hover:underline font-semibold"
                                                type="button"
                                            >
                                                Hướng dẫn thao tác làm bài
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* CARD 2: DÀNH CHO GIẢNG VIÊN */}
                                <div className="group relative rounded-2xl bg-white p-6 lg:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700 group-hover:scale-105 transition-transform duration-200 border border-indigo-100">
                                                <span className="material-symbols-outlined text-[32px]">assignment_ind</span>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                                                Cán Bộ Giảng Dạy
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                                            Dành Cho Cán Bộ Giảng Viên
                                        </h2>
                                        <p className="text-xs md:text-sm text-slate-500 mb-6 leading-relaxed">
                                            Điều phối phòng thi số, điểm danh thí sinh, mở đề thi bằng mã xác thực 2 lớp, giám sát phòng thi và thực hiện hội đồng chấm điểm số hóa.
                                        </p>

                                        <div className="space-y-3 mb-8 text-xs text-slate-700">
                                            <div className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5 text-indigo-700 font-bold">
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                </div>
                                                <span>Hỗ trợ Microsoft Faculty &amp; Cổng ID Giảng viên ĐHQG</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5 text-indigo-700 font-bold">
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                </div>
                                                <span>Bảng dashboard giám sát trạng thái 60 thí sinh cùng lúc</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5 text-indigo-700 font-bold">
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                </div>
                                                <span>Ký điện tử biên bản coi thi số &amp; niêm phong túi bài thi</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 pt-2">
                                        <button
                                            onClick={handleLecturerLogin}
                                            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all duration-200"
                                            type="button"
                                        >
                                            <span>Đăng Nhập Với Tư Cách Giảng Viên</span>
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                        <div className="flex items-center justify-between px-1 text-xs">
                                            <button
                                                onClick={() => router.push('/pages/teacher/dashboard/support')}
                                                className="text-blue-700 hover:underline font-semibold"
                                                type="button"
                                            >
                                                Quy chế &amp; Hướng dẫn coi thi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Technical Infrastructure & Real-time Status */}
                    <section className="w-full bg-white py-12 md:py-16 border-b border-slate-200">
                        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                {/* Left Pitch */}
                                <div className="lg:col-span-7 flex flex-col">
                                    <span className="text-xs text-blue-700 font-bold uppercase tracking-wider mb-2">
                                        Công Nghệ Đánh Giá Trực Tuyến
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight">
                                        Môi Trường Thi Trực Tuyến Đạt Chuẩn Kiểm Định Cao Cấp
                                    </h2>
                                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                                        Hệ thống áp dụng thuật toán mã hóa đầu cuối (End-to-End Encryption) cho các bài thi học thuật và bài viết tự luận. Mọi thay đổi nội dung của thí sinh được lưu trữ phân tán mỗi 5 giây, bảo đảm tính công bằng tuyệt đối và ngăn ngừa nguy cơ mất mát dữ liệu do đứt gãy mạng.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex items-start gap-3">
                                            <span className="material-symbols-outlined text-blue-600 text-[28px] shrink-0">
                                                lock_clock
                                            </span>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900">Khóa Phiên Nghiêm Ngặt</h4>
                                                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                                                    Giám sát tab trình duyệt và khóa ứng dụng nền trái phép trong suốt thời gian thi.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex items-start gap-3">
                                            <span className="material-symbols-outlined text-emerald-600 text-[28px] shrink-0">
                                                cloud_sync
                                            </span>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900">Đồng Bộ Siêu Tốc</h4>
                                                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                                                    Cơ chế Offline-First giữ bài làm trong bộ nhớ đệm an toàn ngay cả khi ngắt kết nối.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Real-time Server Panel */}
                                <div className="lg:col-span-5 flex flex-col justify-center">
                                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-blue-600 text-[20px]">dns</span>
                                                <span className="text-xs font-bold text-slate-800">
                                                    Trạng Thái Hệ Thống Thời Gian Thực
                                                </span>
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Bình thường
                                            </span>
                                        </div>

                                        {/* Server Cluster Indicators */}
                                        <div className="space-y-3 text-xs">
                                            <div className="flex justify-between items-center text-slate-600">
                                                <span>Cổng Tiếp Nhận Bài Thi (Hà Nội &amp; TP.HCM):</span>
                                                <span className="font-semibold text-slate-900">99.98% Trực tuyến</span>
                                            </div>
                                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '99.8%' }} />
                                            </div>

                                            <div className="flex justify-between items-center text-slate-600">
                                                <span>Máy Chủ Chấm Điểm &amp; Lưu Trữ Đề Thi:</span>
                                                <span className="font-semibold text-slate-900">100% Sẵn sàng</span>
                                            </div>
                                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-blue-600 h-full rounded-full" style={{ width: '100%' }} />
                                            </div>

                                            <div className="flex justify-between items-center text-slate-600">
                                                <span>Băng Thông Giám Sát Video Trực Tuyến:</span>
                                                <span className="font-semibold text-slate-900">12.4 Gbps / 40 Gbps</span>
                                            </div>
                                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '31%' }} />
                                            </div>
                                        </div>

                                        {/* System Clock Box */}
                                        <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs flex items-center justify-between">
                                            <span>Đồng hồ nguyên tử hệ thống:</span>
                                            <span className="font-mono text-blue-900 font-bold text-xs">
                                                {systemClock} UTC+7
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Admin / Exam Board Discrete Zone */}
                    <section className="w-full py-4 bg-white border-b border-slate-200 shadow-xs">
                        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2.5 text-slate-600 text-xs">
                                <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                    admin_panel_settings
                                </span>
                                <span>
                                    Dành riêng cho Hội Đồng Ra Đề &amp; Ban Quản Trị Hệ Thống Khảo Thí Quốc Gia?
                                </span>
                            </div>
                            <button
                                onClick={handleAdminLogin}
                                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-900 text-xs font-semibold flex items-center gap-1 transition-colors border border-slate-200"
                                type="button"
                            >
                                <span>Đăng nhập Cổng Quản Trị &amp; Hội Đồng Đề</span>
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            </button>
                        </div>
                    </section>
                </div>
            </main>

            {/* 3. MODAL HƯỚNG DẪN THÍ SINH */}
            {isGuideModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-150 border border-slate-200">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[24px]">menu_book</span>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-blue-950">Hướng Dẫn Thao Tác Làm Bài</h3>
                                    <p className="text-xs text-slate-500">Quy trình chuẩn dành cho thí sinh dự thi</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsGuideModalOpen(false)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <div className="space-y-3 text-xs text-slate-700 max-h-[60vh] overflow-y-auto pr-1">
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="font-bold text-slate-900 mb-1">Bước 1: Đăng nhập &amp; Kiểm tra phần cứng</p>
                                <p className="text-slate-600">Sử dụng tài khoản SSO trường cấp. Cho phép trình duyệt truy cập Webcam và Micro để hệ thống AI xác thực sinh trắc học.</p>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="font-bold text-slate-900 mb-1">Bước 2: Nhập mã Ca Thi (Passcode)</p>
                                <p className="text-slate-600">Nhập mã bảo mật ca thi 6 ký tự do Giám thị phòng thi công bố tại buổi thi để kích hoạt mở đề.</p>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="font-bold text-slate-900 mb-1">Bước 3: Làm bài &amp; Lưu bài tự động</p>
                                <p className="text-slate-600">Hệ thống tự động lưu bài viết mỗi 5 giây. Không thoát khỏi chế độ Fullscreen quá 3 lần để tránh bị đình chỉ bài thi.</p>
                            </div>
                        </div>

                        <div className="pt-2 flex justify-end border-t border-slate-100">
                            <button
                                onClick={() => setIsGuideModalOpen(false)}
                                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                                type="button"
                            >
                                Đã Hiểu Hướng Dẫn
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. FOOTER HỆ THỐNG */}
            <footer className="w-full bg-white border-t border-slate-200 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
                        <div className="md:col-span-2 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-[18px]">verified</span>
                                </div>
                                <span className="text-sm font-bold text-blue-900">
                                    TRUNG TÂM KHẢO THÍ QUỐC GIA
                                </span>
                            </div>
                            <p className="text-slate-500 max-w-md leading-relaxed">
                                Đơn vị chịu trách nhiệm tổ chức, giám sát và kiểm định chuẩn mực đánh giá năng lực học thuật trực tuyến theo chuẩn kiểm định chất lượng giáo dục đại học.
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                                    <span className="material-symbols-outlined text-[16px] text-emerald-600">shield</span> ISO/IEC 27001:2022
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                                    <span className="material-symbols-outlined text-[16px] text-blue-600">lock</span> ISO/IEC 25010
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                                    <span className="material-symbols-outlined text-[16px] text-indigo-600">award_star</span> NEAS Accredited
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-slate-900 text-sm">Hỗ Trợ Thí Sinh</span>
                            <button onClick={() => setIsGuideModalOpen(true)} className="text-left text-slate-500 hover:text-blue-700 transition-colors">
                                Quy trình đăng ký ca thi
                            </button>
                            <a className="text-slate-500 hover:text-blue-700 transition-colors" href="#">
                                Quy chế phòng thi số
                            </a>
                            <a className="text-slate-500 hover:text-blue-700 transition-colors" href="#">
                                Kiểm tra thiết bị &amp; đường truyền
                            </a>
                            <a className="text-slate-500 hover:text-blue-700 transition-colors" href="#">
                                Phúc khảo bài thi
                            </a>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-slate-900 text-sm">Liên Hệ Thường Trực</span>
                            <p className="text-slate-500">Tòa nhà Khảo thí Quốc gia, Ba Đình, Hà Nội</p>
                            <p className="text-slate-500 font-bold text-slate-800">Hotline: 1900 6886</p>
                            <p className="text-slate-500">Email: support.khaothi@edu.vn</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                        <p>© 2026 Bản quyền thuộc Cục Khảo Thí &amp; Đảm Bảo Chất Lượng Giáo Dục.</p>
                        <div className="flex items-center gap-6">
                            <a className="hover:text-slate-800 transition-colors" href="#">Chính sách bảo mật dữ liệu</a>
                            <a className="hover:text-slate-800 transition-colors" href="#">Điều khoản khảo thí</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default HomePage;