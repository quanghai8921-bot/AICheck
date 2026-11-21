"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [facultyId, setFacultyId] = useState("");
    const [facultyPassword, setFacultyPassword] = useState("");

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
            const response = await fetch(`${apiUrl}/api/v1/auth/teacher/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    teacherCode: facultyId.trim(),
                    password: facultyPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                // Lưu token vào sessionStorage
                sessionStorage.setItem("accessToken", data.accessToken);
                sessionStorage.setItem("tokenType", data.tokenType || "Bearer");
                sessionStorage.setItem("role", data.role || "TEACHER");
                sessionStorage.setItem("teacherCode", facultyId.trim());

                router.push('/pages/teacher/dashboard/exam/createExam');
            } else {
                setErrorMessage(data.message || "Mã giảng viên hoặc mật khẩu không chính xác.");
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            setErrorMessage("Không thể kết nối đến máy chủ xác thực. Vui lòng kiểm tra lại!");
        } finally {
            setIsLoading(false);
        }
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


                        {/* Main Form Container */}
                        <div className="flex justify-center items-center py-4">
                            <div className="w-full max-w-xl flex flex-col gap-6 bg-white p-10 rounded-xl shadow-md">
                                {/* Badge Header */}
                                <div className="flex flex-col gap-1 text-center items-center">
                                    <h1 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#0b1c30] tracking-tight mt-1">
                                        Đăng Nhập Cổng Cán Bộ Giảng Viên
                                    </h1>
                                </div>

                                {/* Form Elements */}
                                <form className="flex flex-col gap-6" onSubmit={handleLogin}>
                                    {/* Thông báo lỗi nếu có */}
                                    {errorMessage && (
                                        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px] shrink-0">
                                                error
                                            </span>
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    {/* Field 1: MSGV / Email */}
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-center">
                                            <label
                                                className="text-sm text-[#0b1c30] font-semibold"
                                                htmlFor="facultyId"
                                            >
                                                Mã số giảng viên (MGV)
                                                <span className="text-[#ba1a1a]"> *</span>
                                            </label>
                                        </div>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-3.5 text-[#515f74] text-[20px] pointer-events-none">
                                                badge
                                            </span>
                                            <input
                                                className="w-full pl-11 pr-4 py-2 bg-[#e5eeff] rounded-lg text-base text-[#0b1c30] placeholder-[#515f74] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00236f] shadow-sm transition-all"
                                                id="facultyId"
                                                placeholder="MGV"
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
                                                Mật khẩu<span className="text-[#ba1a1a]"> *</span>
                                            </label>
                                            <button
                                                type="button"
                                                className="text-xs text-[#00236f] font-semibold hover:underline"
                                                onClick={() => router.push('/pages/teacher/auth/forgot-password')}
                                            >
                                                Quên mật khẩu ?
                                            </button>
                                        </div>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-3.5 text-[#515f74] text-[20px] pointer-events-none">
                                                lock
                                            </span>
                                            <input
                                                className="w-full pl-11 pr-11 py-2 bg-[#e5eeff] rounded-lg text-base text-[#0b1c30] placeholder-[#515f74] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00236f] shadow-sm transition-all"
                                                id="facultyPassword"
                                                placeholder="Nhập mật khẩu"
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
                                                <span>ĐĂNG NHẬP TÀI KHOẢN</span>
                                                <span className="material-symbols-outlined text-[20px]">
                                                    arrow_forward
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}