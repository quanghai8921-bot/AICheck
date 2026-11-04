'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface HeaderProps {
    // Cho phép truyền trạng thái đăng nhập từ layout/page hoặc Context/Redux
    isLoggedIn?: boolean;
    user?: {
        name: string;
        studentId: string;
        department: string;
        shortName: string;
    };
    onLogout?: () => void;
}

export default function Header({
    isLoggedIn = false, // Đổi default thành true để kiểm tra hoặc truyền qua props
    user = {
        name: 'Nguyễn Văn An',
        studentId: 'SV2024-8841',
        department: 'Khoa Công nghệ Thông tin',
        shortName: 'AN',
    },
    onLogout,
}: HeaderProps) {
    const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

    // State quản lý đóng/mở menu profile
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    const isHomeActive = pathname === '/pages/home' || pathname === '/';
    const isGuideActive = pathname?.startsWith('/pages/student/guide');

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200">
            <div className="h-16 max-w-7xl mx-auto px-4 md:px-6 lg:px-12 flex items-center justify-between gap-4">
                {/* Logo & Tên hệ thống */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                        <span className="material-symbols-outlined text-[24px]">school</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-bold text-blue-900 tracking-tight leading-tight uppercase">
                            HỆ THỐNG KHẢO THÍ HỌC THUẬT TRỰC TUYẾN
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                            CỔNG THÔNG TIN KHẢO THÍ CHUẨN HÓA QUỐC GIA
                        </span>
                    </div>
                </div>

                {/* Nav menu desktop */}
                <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
                    <button
                        className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                            isHomeActive
                                ? 'text-blue-700 bg-blue-100/70 font-bold shadow-xs'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        type="button"
                        onClick={() => {
                            router.push('/pages/home');
                        }}
                    >
                        Trang Chủ
                    </button>
                    <button
                        className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                            isGuideActive
                                ? 'text-blue-700 bg-blue-100/70 font-bold shadow-xs'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                        type="button"
                        onClick={() => {
                            router.push('/pages/student/guide');
                        }}
                    >
                        Hướng Dẫn Thí Sinh
                    </button>
                </nav>

                {/* Hotline, Switch Language & Profile area */}
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        <span className="material-symbols-outlined text-[16px] text-blue-600">
                            support_agent
                        </span>
                        <span className="text-xs font-bold text-slate-800">1900 6886</span>
                    </div>

                    {/* Render điều kiện theo trạng thái đăng nhập */}
                    {isLoggedIn ? (
                        /* User Profile Dropdown khi ĐÃ đăng nhập */
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                type="button"
                                className="flex items-center gap-2 pl-2 pr-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 border border-slate-200 shadow-sm"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                    {user.shortName}
                                </div>
                                <div className="hidden sm:flex flex-col text-left">
                                    <span className="text-xs font-semibold text-slate-800 leading-tight">
                                        {user.name}
                                    </span>
                                    <span className="text-[10px] text-slate-500 leading-tight">
                                        MSSV: {user.studentId}
                                    </span>
                                </div>
                                <span className="material-symbols-outlined text-slate-500 text-[20px]">
                                    arrow_drop_down
                                </span>
                            </button>

                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl p-2 z-50 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="px-3 py-2 mb-1 border-b border-slate-100 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                                            <span className="material-symbols-outlined text-[22px]">school</span>
                                        </div>
                                        <div className="flex flex-col min-w-0 text-xs">
                                            <span className="font-bold text-slate-900 truncate">{user.name}</span>
                                            <span className="text-slate-500 truncate">{user.department}</span>
                                            <span className="font-semibold text-blue-700">MSSV: {user.studentId}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-0.5 text-xs">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsProfileMenuOpen(false); // Đóng dropdown
                                                router.push('/pages/student/profile'); // Chuyển hướng về trang login
                                            }}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                                                pathname?.startsWith('/pages/student/profile')
                                                    ? 'bg-blue-100/70 text-blue-700 font-bold shadow-xs'
                                                    : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                                account_circle
                                            </span>
                                            <div className="flex flex-col text-left">
                                                <span className="font-semibold leading-tight">Hồ sơ</span>
                                                <span className="text-[11px] opacity-75 leading-tight">
                                                    Thông tin cá nhân &amp; sinh viên
                                                </span>
                                            </div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsProfileMenuOpen(false); // Đóng dropdown
                                                router.push('/pages/student/exam/history-exam'); // Chuyển hướng về trang login
                                            }}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                                                pathname?.startsWith('/pages/student/exam/history-exam')
                                                    ? 'bg-blue-100/70 text-blue-700 font-bold shadow-xs'
                                                    : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                                history_edu
                                            </span>
                                            <div className="flex flex-col text-left">
                                                <span className="font-semibold leading-tight">Lịch sử bài thi</span>
                                                <span className="text-[11px] opacity-75 leading-tight">
                                                    Lịch sử làm bài, điểm số &amp; nhận xét
                                                </span>
                                            </div>
                                        </button>
                                        <div className="my-1 border-t border-slate-100" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsProfileMenuOpen(false); // Đóng dropdown
                                                router.push('/pages/student/auth'); // Chuyển hướng về trang login
                                            }}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-left"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">logout</span>
                                            <div className="flex flex-col">
                                                <span className="font-bold leading-tight">Đăng xuất</span>
                                                <span className="text-[11px] text-slate-400 leading-tight">
                                                    Đăng xuất khỏi hệ thống thi
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Icon Person mặc định khi CHƯA đăng nhập */
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[18px]">person</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}