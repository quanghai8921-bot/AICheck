"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function TeacherHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50">
            <div className="h-16 w-full px-6 flex items-center justify-between gap-4">
                {/* Branding / Logo */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1e3a8a] text-white shadow-sm">
                        <span className="material-symbols-outlined text-[24px]">school</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#00236f] tracking-tight leading-tight uppercase">
                            HỆ THỐNG KHẢO THÍ HỌC THUẬT TRỰC TUYẾN
                        </span>
                        <span className="text-xs font-semibold text-[#515f74] tracking-normal uppercase">
                            CỔNG THÔNG TIN GIẢNG VIÊN &amp; HỘI ĐỒNG CHẤM THI
                        </span>
                    </div>
                </div>

                {/* Right Info & Tools */}
                <div className="flex items-center gap-6">
                    {/* Status Indicators */}
                    <div className="hidden xl:flex items-center gap-1 px-3 py-1 rounded-full bg-[#eff4ff] text-[#00311f] text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                        <span>Đường truyền ổn định (12ms)</span>
                    </div>

                    <div className="hidden lg:flex items-center gap-1 px-3 py-1 rounded-full bg-[#eff4ff] text-[#515f74] text-xs font-semibold">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        <span>UTC+7 09:42:15 NTP</span>
                    </div>

                    {/* Notifications */}
                    <button
                        className="relative p-1 text-[#444651] hover:text-[#0b1c30] hover:bg-[#eff4ff] rounded-xl transition-colors"
                        type="button"
                        title="Thông báo"
                    >
                        <span className="material-symbols-outlined text-[22px]">notifications</span>
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold">
                            3
                        </span>
                    </button>

                    {/* Teacher Profile Info with Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            className={`flex items-center gap-2 pl-2 pr-2 py-1 border-l border-[#c5c5d3] transition-all text-left focus:outline-none cursor-pointer rounded-xl ${
                                pathname?.startsWith('/pages/teacher/dashboard/profile')
                                    ? 'bg-[#eff4ff] text-[#00236f] font-semibold'
                                    : 'hover:opacity-90'
                            }`}
                        >
                            <div className="w-8 h-8 rounded-full bg-[#00236f] flex items-center justify-center flex-shrink-0 shadow-xs">
                                <span className="material-symbols-outlined text-white text-[18px]">person</span>
                            </div>
                            <div className="hidden md:flex flex-col text-left">
                                <span className="text-sm font-semibold text-[#0b1c30] leading-tight">
                                    TS. Lê Quang Mai
                                </span>
                                <span className="text-xs text-[#515f74] leading-tight">
                                    GV2024-1049 • CNTT &amp; KTTT
                                </span>
                            </div>
                            <span className={`material-symbols-outlined text-[#515f74] text-[20px] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#00236f]' : ''}`}>
                                arrow_drop_down
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                <div className="px-4 py-3 border-b border-slate-100 flex flex-col gap-0.5">
                                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Tài khoản Giảng viên</span>
                                    <span className="text-sm font-bold text-[#00236f]">TS. Lê Quang Mai</span>
                                    <span className="text-xs text-[#515f74]">mai.lequang@hust.edu.vn</span>
                                </div>

                                <div className="py-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            router.push('/pages/teacher/dashboard/profile');
                                        }}
                                        className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                                            pathname?.startsWith('/pages/teacher/dashboard/profile')
                                                ? 'bg-[#dce9ff] text-[#00236f] font-bold shadow-xs'
                                                : 'text-slate-700 hover:bg-[#eff4ff] hover:text-[#00236f] font-semibold'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-[#00236f]">badge</span>
                                        <span>Thông tin cá nhân &amp; Bảo mật</span>
                                    </button>
                                </div>

                                <div className="border-t border-slate-100 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            router.push('/pages/teacher/auth');
                                        }}
                                        className="w-full px-4 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-red-600">logout</span>
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#eff4ff] hover:bg-[#ffdad6] text-[#444651] hover:text-[#ba1a1a] transition-all text-xs font-semibold"
                        title="Đăng xuất"
                        onClick={() => {
                            router.push('/pages/teacher/auth');
                        }}
                    >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        <span className="hidden sm:inline">Thoát</span>
                    </button>
                </div>
            </div>
        </header>
    );
}