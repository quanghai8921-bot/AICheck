"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [facultyId, setFacultyId] = useState("GV2024-1049");
    const [facultyPassword, setFacultyPassword] = useState("AcademicSecurePass2025#");

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 1200);
        router.push('/pages/teacher/dashboard/exam/createExam')
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30] antialiased">
            {/* Google Fonts & Icons CDN Link - Thường được đặt ở layout.tsx, nhưng giữ lại dạng tham chiếu ở đây */}
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Plus+Jakarta+Sans:wght@600;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
                rel="stylesheet"
            />

            {/* Main Content */}
            <main className="w-full bg-[#f8f9ff] flex-grow">
                <div className="flex flex-col w-full">
                    <div className="w-full max-w-7xl mx-auto px-6 py-10">
                        {/* Top Breadcrumb & Status Ribbon */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                            <div className="flex items-center gap-1 text-xs text-[#515f74]">
                                <span className="material-symbols-outlined text-[16px] text-[#00236f]">
                                    domain
                                </span>
                                <span>Hội đồng Khảo thí Đại học</span>
                                <span className="text-[#c5c5d3]">/</span>
                                <span className="text-[#0b1c30] font-semibold">
                                    Cổng Cán bộ &amp; Giám thị Coi thi
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-[#eff4ff] px-4 py-1 rounded-full shadow-sm">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#004a31] animate-pulse"></span>
                                <span className="text-xs text-[#004a31] font-semibold">
                                    Máy chủ Khảo thí Trực tuyến Sẵn sàng
                                </span>
                                <span className="text-[#c5c5d3]">|</span>
                                <span className="text-xs text-[#515f74]">
                                    Hạ tầng mã hóa AES-256
                                </span>
                            </div>
                        </div>

                        {/* Main Form Container */}
                        <div className="flex justify-center items-center py-4">
                            <div className="w-full max-w-xl flex flex-col gap-6 bg-white p-10 rounded-xl shadow-md">
                                {/* Badge Header */}
                                <div className="flex flex-col gap-1 text-center items-center">
                                    <div className="inline-flex items-center gap-1 bg-[#dce9ff] px-4 py-1 rounded-full w-fit">
                                        <span className="material-symbols-outlined text-[16px] text-[#00236f]">
                                            badge
                                        </span>
                                        <span className="text-xs text-[#00236f] font-bold tracking-wide uppercase">
                                            CỔNG THÔNG TIN GIẢNG VIÊN &amp; CÁN BỘ
                                        </span>
                                    </div>
                                    <h1 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#0b1c30] tracking-tight mt-1">
                                        Đăng Nhập Cổng Cán Bộ Giảng Viên
                                    </h1>
                                    <p className="text-base text-[#515f74] leading-relaxed">
                                        Dành cho Cán bộ, Giảng viên và Cán bộ Khảo thí. Sử dụng tài
                                        khoản định danh cán bộ (
                                        <span className="font-semibold text-[#00236f]">
                                            @fe.edu.vn
                                        </span>{" "}
                                        hoặc{" "}
                                        <span className="font-semibold text-[#00236f]">
                                            @giangvien.edu.vn
                                        </span>
                                        ).
                                    </p>
                                </div>

                                {/* Form Elements */}
                                <form className="flex flex-col gap-6" onSubmit={handleLogin}>
                                    {/* Field 1: MSGV / Email */}
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-center">
                                            <label
                                                className="text-sm text-[#0b1c30] font-semibold"
                                                htmlFor="facultyId"
                                            >
                                                Mã Cán bộ / Giảng viên (MSGV / Email trường)
                                                <span className="text-[#ba1a1a]">*</span>
                                            </label>
                                            <span className="inline-flex items-center gap-1 text-xs text-[#004a31] bg-[#eff4ff] px-1 py-0.5 rounded">
                                                <span className="material-symbols-outlined text-[13px]">
                                                    verified
                                                </span>
                                                Thẻ cán bộ hợp lệ
                                            </span>
                                        </div>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-3.5 text-[#515f74] text-[20px] pointer-events-none">
                                                badge
                                            </span>
                                            <input
                                                className="w-full pl-11 pr-4 py-2 bg-[#e5eeff] rounded-lg text-base text-[#0b1c30] placeholder-[#515f74] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00236f] shadow-sm transition-all"
                                                id="facultyId"
                                                placeholder="GV2024-1049 hoặc nguyen.van.a@fe.edu.vn"
                                                required
                                                type="text"
                                                value={facultyId}
                                                onChange={(e) => setFacultyId(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Field 2: Password */}
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-center">
                                            <label
                                                className="text-sm text-[#0b1c30] font-semibold"
                                                htmlFor="facultyPassword"
                                            >
                                                Mật khẩu Cán bộ<span className="text-[#ba1a1a]">*</span>
                                            </label>
                                            <button
                                                type="button"
                                                className="text-xs text-[#00236f] font-semibold hover:underline"
                                                onClick={() => router.push('/pages/teacher/auth/forgot-password')}
                                            >
                                                Quên mật khẩu / Yêu cầu OTP?
                                            </button>
                                        </div>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-3.5 text-[#515f74] text-[20px] pointer-events-none">
                                                lock
                                            </span>
                                            <input
                                                className="w-full pl-11 pr-11 py-2 bg-[#e5eeff] rounded-lg text-base text-[#0b1c30] placeholder-[#515f74] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00236f] shadow-sm transition-all"
                                                id="facultyPassword"
                                                placeholder="Nhập mật khẩu an toàn theo chuẩn ISO"
                                                required
                                                type={showPassword ? "text" : "password"}
                                                value={facultyPassword}
                                                onChange={(e) => setFacultyPassword(e.target.value)}
                                            />
                                            <button
                                                aria-label="Ẩn hiện mật khẩu"
                                                className="absolute right-3.5 text-[#515f74] hover:text-[#0b1c30] transition-colors flex items-center justify-center"
                                                type="button"
                                                onClick={togglePassword}
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    {showPassword ? "visibility_off" : "visibility"}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Session Memory Checkbox */}
                                    <div className="flex items-center gap-2">
                                        <input
                                            className="w-4 h-4 text-[#00236f] bg-[#e5eeff] rounded accent-[#00236f] cursor-pointer"
                                            id="rememberSession"
                                            type="checkbox"
                                        />
                                        <label
                                            className="text-sm text-[#515f74] cursor-pointer select-none"
                                            htmlFor="rememberSession"
                                        >
                                            Ghi nhớ tài khoản
                                        </label>
                                    </div>

                                    {/* Primary CTA Button */}
                                    <button
                                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#1e3a8a] text-white hover:bg-[#00236f] disabled:opacity-75 transition-all duration-200 rounded-lg shadow-md text-sm font-bold tracking-wide"
                                        disabled={isLoading}
                                        id="submitBtn"
                                        type="submit"
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="material-symbols-outlined text-[20px] animate-spin">
                                                    refresh
                                                </span>
                                                <span>Đang xác thực thông tin cán bộ...</span>
                                            </>
                                        ) : isSuccess ? (
                                            <>
                                                <span className="material-symbols-outlined text-[20px] text-[#6ffbbe]">
                                                    check_circle
                                                </span>
                                                <span>Xác thực thành công. Đang chuyển hướng...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>ĐĂNG NHẬP HỆ THỐNG CÁN BỘ</span>
                                                <span className="material-symbols-outlined text-[20px]">
                                                    arrow_forward
                                                </span>
                                            </>
                                        )}
                                    </button>

                                    {/* Security Audit Notice */}
                                    <div className="flex items-start gap-2 bg-[#e5eeff] p-2 rounded-lg">
                                        <span className="material-symbols-outlined text-[#515f74] text-[18px] mt-0.5 flex-shrink-0">
                                            shield_lock
                                        </span>
                                        <p className="text-xs text-[#515f74] leading-normal">
                                            <strong>Lưu ý an ninh:</strong> Mọi thao tác truy cập đều
                                            được ghi nhật ký hệ thống (Audit Log). Cán bộ chịu trách
                                            nhiệm bảo mật thông tin tài khoản được cấp.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}