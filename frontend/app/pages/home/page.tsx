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
            {/* 1. HEADER */}
            <Header onlyTitle={true} />
            {/* 2. KHU VỰC NỘI DUNG CHÍNH */}
            <main className="w-full pt-16 flex-1 bg-slate-50">
                <div className="flex flex-col w-full">
                    {/* Hero Banner Context */}
                    <section className="relative w-full overflow-hidden bg-slate-100/70 border-b border-slate-200">
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
                                    <span className="material-symbols-outlined text-[18px] text-[#00236f]">
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
                                            <div className="w-14 h-14 rounded-2xl bg-[#eff4ff] flex items-center justify-center text-[#00236f] group-hover:scale-105 transition-transform duration-200 border border-[#dce1ff]">
                                                <span className="material-symbols-outlined text-[32px]">school</span>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-[#dce9ff] text-[#00236f] text-xs font-bold uppercase tracking-wider">
                                                Khu Vực Thí Sinh
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#00236f] transition-colors">
                                            Dành Cho Sinh Viên &amp; Thí Sinh
                                        </h2>
                                        <p className="text-xs md:text-sm text-slate-500 mb-6 leading-relaxed">
                                            Truy cập phòng thi số, làm bài thi tự luận hoặc trắc nghiệm, kiểm tra tương thích camera micro và tra cứu kết quả bài thi cá nhân.
                                        </p>

                                        <div className="space-y-3 mb-8 text-xs text-slate-700">
                                            <div className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-[#eff4ff] flex items-center justify-center shrink-0 mt-0.5 text-[#00236f] font-bold">
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                </div>
                                                <span>Xác thực 1 chạm SSO tài khoản trường (@sinhvien.edu.vn)</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-[#eff4ff] flex items-center justify-center shrink-0 mt-0.5 text-[#00236f] font-bold">
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                </div>
                                                <span>Phòng thi viết học thuật chống gián đoạn, tự động đồng bộ</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-[#eff4ff] flex items-center justify-center shrink-0 mt-0.5 text-[#00236f] font-bold">
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                </div>
                                                <span>Kiểm tra thông số micro, webcam &amp; tốc độ mạng tức thì</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 pt-2">
                                        <button
                                            onClick={handleStudentLogin}
                                            className="w-full h-12 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all duration-200"
                                            type="button"
                                        >
                                            <span>Đăng Nhập Với Tư Cách Sinh Viên</span>
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
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

                                        <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#00236f] transition-colors">
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
                                            className="w-full h-12 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all duration-200"
                                            type="button"
                                        >
                                            <span>Đăng Nhập Với Tư Cách Giảng Viên</span>
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};
export default HomePage;