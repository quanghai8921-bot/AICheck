'use client';

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/StudentHeader';

interface LoginPageProps {
    onLoginSuccess?: () => void;
    onBackToHome?: () => void;
    onNavigateToStudent?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBackToHome, onNavigateToStudent }) => {
    const router = useRouter();
    // 1. Password reveal state
    const [showPassword, setShowPassword] = useState(false);

    // Thêm state lưu thông báo lỗi
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // 2. Form state
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [roomCode, setRoomCode] = useState("A2-LAB04");
    const [rememberDevice, setRememberDevice] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 3. Diagnostic check state
    const [diagnosticStatus, setDiagnosticStatus] = useState<"idle" | "loading" | "success">("idle");
    const [isDiagnosticFeedbackVisible, setIsDiagnosticFeedbackVisible] = useState(false);

    // Timer references for diagnostic check
    const diagnosticTimerRef = useRef<NodeJS.Timeout | null>(null);
    const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Function: togglePasswordVisibility
    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    // --- Handlers ---
    const handleStudentLogin = () => {
        if (onNavigateToStudent) {
            onNavigateToStudent();
            return;
        }
        router.push('/pages/student/exam/listExam');
    };

    // Function: closeDiagnosticFeedback
    const closeDiagnosticFeedback = useCallback(() => {
        setIsDiagnosticFeedbackVisible(false);
        if (feedbackTimerRef.current) {
            clearTimeout(feedbackTimerRef.current);
            feedbackTimerRef.current = null;
        }
    }, []);

    // Function: runDiagnosticCheck
    const runDiagnosticCheck = useCallback(() => {
        setDiagnosticStatus("loading");

        if (diagnosticTimerRef.current) {
            clearTimeout(diagnosticTimerRef.current);
        }
        if (feedbackTimerRef.current) {
            clearTimeout(feedbackTimerRef.current);
        }

        diagnosticTimerRef.current = setTimeout(() => {
            setDiagnosticStatus("success");
            setIsDiagnosticFeedbackVisible(true);

            feedbackTimerRef.current = setTimeout(() => {
                setIsDiagnosticFeedbackVisible(false);
            }, 6000);
        }, 1200);
    }, []);

    // Function: triggerPreflightModal (xử lý khi submit form đăng nhập gọi API Backend)
    const triggerPreflightModal = useCallback(async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }
        if (isSubmitting) return;

        const currentStudentId = studentId.trim();
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const apiUrl = "http://localhost:8080";
            const response = await fetch(`${apiUrl}/api/v1/auth/student/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    studentCode: currentStudentId,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // 1. Lưu token và thông tin vào sessionStorage
                sessionStorage.setItem("accessToken", data.accessToken);
                sessionStorage.setItem("tokenType", data.tokenType || "Bearer");
                sessionStorage.setItem("role", data.role || "STUDENT");
                sessionStorage.setItem("studentCode", currentStudentId);

                // 2. Chuyển tiếp vào danh sách ca thi
                if (onLoginSuccess) {
                    onLoginSuccess();
                } else {
                    handleStudentLogin();
                }
            } else {
                // Đăng nhập thất bại (401 hoặc lỗi khác)
                setErrorMessage(data.message || "Mã sinh viên hoặc mật khẩu không chính xác.");
            }
        } catch (error) {
            console.error("Lỗi kết nối máy chủ:", error);
            setErrorMessage("Không thể kết nối đến máy chủ xác thực. Vui lòng kiểm tra lại!");
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, studentId, password, onLoginSuccess, handleStudentLogin]);

    useEffect(() => {
        return () => {
            if (diagnosticTimerRef.current) clearTimeout(diagnosticTimerRef.current);
            if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col">
            {/* 1. THÊM HEADER VÀO ĐÂY */}
            <Header
                isLoggedIn={false}
                onLogout={() => {
                    if (typeof window !== 'undefined') {
                        sessionStorage.clear();
                    }
                    router.push('/pages/home');
                }}
            />
            {/* 2. BODY CHÍNH */}
            <main className="w-full py-8 flex-1 flex flex-col justify-center items-center px-4 md:px-6">
                <div className="w-full max-w-xl mx-auto my-auto">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 flex flex-col gap-6">
                        {/* Header Info */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-center sm:text-left">
                                Đăng Nhập Cổng Khảo Thí Trực Tuyến
                            </h1>
                        </div>

                        {/* Thông báo lỗi nếu có */}
                        {errorMessage && (
                            <div className="p-3.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 animate-shake">
                                <span className="material-symbols-outlined text-[20px] shrink-0">
                                    error
                                </span>
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        {/* Traditional Form Fields */}
                        <form className="flex flex-col gap-4" onSubmit={triggerPreflightModal}>
                            {/* Field 1: Student ID */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between text-xs font-semibold">
                                    <label className="text-slate-800" htmlFor="studentId">
                                        Mã số sinh viên (MSSV) <span className="text-red-500">*</span>
                                    </label>
                                </div>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                                        school
                                    </span>
                                    <input
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:border-[#00236f] focus:ring-2 focus:ring-[#dce9ff] transition-all outline-none text-sm font-medium"
                                        id="studentId"
                                        placeholder="MSSV"
                                        required
                                        type="text"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Field 2: Password */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between text-xs font-semibold">
                                    <label className="text-slate-800" htmlFor="examPassword">
                                        Mật khẩu <span className="text-red-500">*</span>
                                    </label>
                                    <button
                                        className="text-[#00236f] hover:underline"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push('/pages/student/auth/forgot-password');
                                        }}
                                    >
                                        Quên mật khẩu ?
                                    </button>
                                </div>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                                        lock
                                    </span>
                                    <input
                                        className="w-full pl-11 pr-12 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:border-[#00236f] focus:ring-2 focus:ring-[#dce9ff] transition-all outline-none text-sm font-medium"
                                        id="examPassword"
                                        placeholder="Nhập mật khẩu"
                                        required
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        className="absolute right-3.5 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
                                        id="togglePassBtn"
                                        onClick={togglePasswordVisibility}
                                        title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showPassword ? "visibility" : "visibility_off"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all ${isSubmitting
                                    ? "bg-[#00236f]/60 cursor-not-allowed opacity-90"
                                    : "bg-[#00236f] hover:bg-[#1e3a8a] active:scale-[0.99] cursor-pointer shadow-[#00236f]/20"
                                    }`}
                                disabled={isSubmitting}
                                type="submit"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="material-symbols-outlined text-[20px] animate-spin">
                                            progress_activity
                                        </span>
                                        <span>Đang xác thực thông tin thí sinh...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>ĐĂNG NHẬP VÀO THI</span>
                                        <span className="material-symbols-outlined text-[20px]">
                                            arrow_forward
                                        </span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Toast Alert Feedback */}
                <div
                    className={`${isDiagnosticFeedbackVisible ? "flex" : "hidden"
                        } fixed bottom-6 right-6 z-50 max-w-md bg-white rounded-2xl p-4 shadow-xl border border-slate-200 items-start gap-3 transition-all animate-bounce`}
                >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">done_all</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-slate-900">
                            Kiểm tra thiết bị hoàn tất!
                        </span>
                        <p className="text-xs text-slate-500">
                            Camera, Microphone và Đường truyền của bạn đã sẵn sàng tiếp nhận đề thi viết.
                        </p>
                    </div>
                    <button
                        className="text-slate-400 hover:text-slate-700 ml-auto"
                        onClick={closeDiagnosticFeedback}
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
            </main>

            {/* 3. FOOTER */}
            <footer className="w-full bg-white border-t border-slate-200 py-6">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-500">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <span className="font-bold text-[#00236f]">FPT University</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span>© 2024 Bản quyền thuộc Bộ GD&amp;ĐT</span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                                Hệ thống bảo mật hạ tầng đám mây đáp ứng tiêu chuẩn an toàn ISO/IEC 27001:2022 và NIST SP 800-53.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
                            <span className="flex items-center gap-1 text-slate-600">
                                <span className="material-symbols-outlined text-[16px] text-[#00236f]">lock</span>
                                Mã Hóa TLS 1.3
                            </span>
                            <span className="flex items-center gap-1 text-slate-600">
                                <span className="material-symbols-outlined text-[16px] text-[#00236f]">mail</span>
                                hotro@khaothi.edu.vn
                            </span>
                            <span className="flex items-center gap-1 text-slate-600">
                                <span className="material-symbols-outlined text-[16px] text-[#00236f]">call</span>
                                024 3869 3131
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LoginPage;