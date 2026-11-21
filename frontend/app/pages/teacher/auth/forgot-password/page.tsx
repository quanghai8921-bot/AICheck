"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function LecturerForgotPassword() {
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
        <div className="w-full bg-[#f8f9ff] text-[#0b1c30] antialiased py-8 px-4 sm:px-6 min-h-[calc(100vh-120px)] flex items-center justify-center">
            <main className="w-full max-w-xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#515f74]">
                        <Link href="/" className="hover:text-[#00236f] transition-colors flex items-center gap-1 font-medium">
                            <span className="material-symbols-outlined text-[16px]">home</span>
                            Trang chủ
                        </Link>
                        <span className="text-[#c5c5d3]">/</span>
                        <Link href="/pages/teacher/auth" className="hover:text-[#00236f] transition-colors font-medium">
                            Cổng giảng viên
                        </Link>
                        <span className="text-[#c5c5d3]">/</span>
                        <span className="text-[#00236f] font-semibold">Khôi phục mật khẩu</span>
                    </nav>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 sm:p-8 shadow-sm">
                    {/* Header */}
                    <div className="flex items-center gap-4 pb-5 border-b border-[#f1f5f9] mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[#00236f] text-white flex items-center justify-center shrink-0 shadow-sm">
                            <span className="material-symbols-outlined text-[26px]">
                                {isSubmitted ? 'mark_email_read' : 'lock_reset'}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-[#00236f]">
                                {isSubmitted ? 'Kiểm tra hộp thư của bạn' : 'Khôi Phục Mật Khẩu Giảng Viên'}
                            </h1>
                            <p className="text-xs sm:text-sm text-[#515f74] mt-0.5">
                                {isSubmitted
                                    ? 'Yêu cầu khôi phục mật khẩu tài khoản đã được xử lý'
                                    : 'Nhập địa chỉ Gmail để tìm tài khoản và nhận liên kết khôi phục'}
                            </p>
                        </div>
                    </div>

                    {!isSubmitted ? (
                        /* Form nhập Gmail */
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="block text-xs sm:text-sm font-semibold text-[#0b1c30]" htmlFor="teacher-email">
                                    Gmail giảng viên <span className="text-red-600">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#515f74]">
                                        <span className="material-symbols-outlined text-[20px]">mail</span>
                                    </div>
                                    <input
                                        id="teacher-email"
                                        type="email"
                                        required
                                        placeholder="Ví dụ: giangvien@gmail.com hoặc tengv@edu.vn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#f8faff] text-[#0b1c30] text-sm pl-11 pr-4 py-3 rounded-xl border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#00236f] focus:ring-2 focus:ring-[#00236f]/15 transition-all shadow-xs"
                                    />
                                </div>
                                <p className="text-xs text-[#515f74]">
                                    Hệ thống sẽ tra cứu tài khoản tương ứng và gửi liên kết đổi mật khẩu tới địa chỉ này.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-[#00236f] hover:bg-[#1a3889] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                                        <span>Đang xác nhận...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Xác nhận</span>
                                        <span className="material-symbols-outlined text-[20px]">send</span>
                                    </>
                                )}
                            </button>

                            <div className="pt-2 text-center">
                                <Link
                                    href="/pages/teacher/auth"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00236f] hover:underline"
                                >
                                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                    Quay lại Đăng nhập Giảng viên
                                </Link>
                            </div>
                        </form>
                    ) : (
                        /* Thông báo đã gửi liên kết thành công */
                        <div className="space-y-5">
                            <div className="p-4 sm:p-5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46]">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#059669] text-[26px] shrink-0 mt-0.5">
                                        check_circle
                                    </span>
                                    <div className="space-y-1.5">
                                        <h2 className="text-sm sm:text-base font-bold text-[#065f46]">
                                            Đã gửi liên kết đổi mật khẩu!
                                        </h2>
                                        <p className="text-xs sm:text-sm text-[#047857] leading-relaxed">
                                            Gmail chứa đường dẫn liên kết đổi mật khẩu đã được gửi đến địa chỉ:
                                        </p>
                                        <p className="text-xs sm:text-sm font-bold text-[#00236f] bg-white/90 px-3 py-1.5 rounded-lg inline-block border border-[#a7f3d0] font-mono">
                                            {email}
                                        </p>
                                        <p className="text-xs text-[#047857] mt-1 leading-relaxed">
                                            Vui lòng kiểm tra hộp thư đến (hoặc hòm thư rác/Spam) của bạn để truy cập đường dẫn và tiến hành đặt lại mật khẩu mới.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#f1f5f9]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSubmitted(false);
                                    }}
                                    className="text-xs font-semibold text-[#515f74] hover:text-[#00236f] flex items-center gap-1 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[16px]">refresh</span>
                                    Nhập lại email khác
                                </button>

                                <Link
                                    href="/pages/teacher/auth"
                                    className="w-full sm:w-auto px-5 py-2.5 bg-[#00236f] hover:bg-[#1a3889] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
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
