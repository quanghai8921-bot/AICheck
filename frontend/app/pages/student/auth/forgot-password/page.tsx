"use client";
import React, { useState, useCallback } from 'react';
import Link from 'next/link';

export default function StudentForgotPassword() {
    const [studentId, setStudentId] = useState("");
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        // 1. Chặn hành vi submit mặc định của HTML Form (tránh reload lại trang)
        e.preventDefault();

        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setErrorMessage("Vui lòng nhập địa chỉ Gmail.");
            return;
        }

        setErrorMessage('');
        setIsLoading(true);

        try {
            // 4. Lấy Base URL từ http://localhost:8080
            const apiUrl = "http://localhost:8080";

            // 5. Sử dụng hàm fetch chuẩn của Browser để gửi HTTP POST request
            const response = await fetch(`${apiUrl}/api/v1/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: trimmedEmail,
                }),
            });

            // 6. Đọc kết quả JSON trả về từ Backend
            const data = await response.json();

            // 7. Kiểm tra mã trạng thái HTTP (200 - 299)
            if (response.ok) {
                // Thành công: chuyển sang màn hình thông báo đã gửi
                setIsSubmitted(true);
            } else {
                // Backend trả về lỗi (400, 404, 500...)
                setErrorMessage(data.message || "Không thể gửi yêu cầu. Vui lòng kiểm tra lại email!");
            }
        } catch (error) {
            // Lỗi mạng, sập server hoặc không kết nối được
            console.error("Lỗi khi gọi API forgot-password:", error);
            setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng thử lại sau!");
        } finally {
            // 8. Tắt trạng thái loading (luôn chạy dù thành công hay thất bại)
            setIsLoading(false);
        }
    };

    return (
        <div className="font-sans text-slate-900 antialiased py-8 px-4 sm:px-6 min-h-[calc(100vh-120px)] flex items-center justify-center">
            <main className="w-full max-w-lg mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center justify-between gap-4 mb-4">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Link className="hover:text-[#00236f] transition-colors flex items-center gap-1" href="/">
                            <span className="material-symbols-outlined text-[15px]">home</span>
                            Trang chủ
                        </Link>
                        <span className="text-slate-300">/</span>
                        <Link className="hover:text-[#00236f] transition-colors" href="/pages/student/auth">
                            Cổng sinh viên
                        </Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900 font-semibold">Quên mật khẩu</span>
                    </nav>
                </div>

                {/* Form Card */}
                <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[#00236f] text-white flex items-center justify-center shadow-sm shrink-0">
                            <span className="material-symbols-outlined text-[26px]">
                                {isSubmitted ? 'mark_email_read' : 'lock_reset'}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-900">
                                {isSubmitted ? 'Kiểm tra hộp thư của bạn' : 'Quên mật khẩu sinh viên'}
                            </h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {isSubmitted
                                    ? 'Yêu cầu đặt lại mật khẩu đã được tiếp nhận'
                                    : 'Nhập địa chỉ Gmail liên kết với tài khoản để tìm lại mật khẩu'}
                            </p>
                        </div>
                    </div>

                    {!isSubmitted ? (
                        /* Form nhập Gmail */
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-800" htmlFor="student-email">
                                    Gmail tài khoản sinh viên <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">
                                        mail
                                    </span>
                                    <input
                                        id="student-email"
                                        type="email"
                                        required
                                        placeholder="Ví dụ: nguyenvana@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00236f]/20 border border-slate-200 transition-all"
                                    />
                                </div>
                                <p className="text-[11px] text-slate-500">
                                    Hệ thống sẽ tra cứu tài khoản và gửi liên kết đổi mật khẩu về hòm thư này.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full min-h-[46px] bg-[#00236f] hover:bg-[#1e3a8a] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                                        <span>Đang gửi...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Xác nhận</span>
                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                    </>
                                )}
                            </button>

                            <div className="pt-2 text-center">
                                <Link
                                    href="/pages/student/auth"
                                    className="inline-flex items-center gap-1.5 text-xs text-[#00236f] hover:underline font-semibold"
                                >
                                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                    Quay lại Đăng nhập
                                </Link>
                            </div>
                        </form>
                    ) : (
                        /* Thông báo đã gửi liên kết thành công */
                        <div className="space-y-5">
                            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-emerald-600 text-[24px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <div className="space-y-1">
                                        <h2 className="text-sm font-bold text-emerald-900">
                                            Đã gửi liên kết thành công!
                                        </h2>
                                        <p className="text-xs text-emerald-800 leading-relaxed">
                                            Gmail chứa đường dẫn liên kết đổi mật khẩu đã được gửi đến địa chỉ:
                                        </p>
                                        <p className="text-xs font-bold text-[#00236f] bg-white/80 px-2.5 py-1 rounded-md inline-block border border-emerald-200">
                                            {email}
                                        </p>
                                        <p className="text-[11px] text-emerald-700 mt-1">
                                            Vui lòng kiểm tra hộp thư đến (hoặc hòm thư rác/Spam) của bạn để tiến hành đổi mật khẩu mới.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSubmitted(false);
                                    }}
                                    className="text-xs text-slate-600 hover:text-[#00236f] font-semibold flex items-center gap-1 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[16px]">refresh</span>
                                    Nhập lại email khác
                                </button>

                                <Link
                                    href="/pages/student/auth"
                                    className="w-full sm:w-auto px-5 py-2.5 bg-[#00236f] hover:bg-[#1e3a8a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                                >
                                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                    Về trang đăng nhập
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
