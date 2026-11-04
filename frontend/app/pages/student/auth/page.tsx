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

    // 2. Form state
    const [studentId, setStudentId] = useState("SV2024-8841");
    const [password, setPassword] = useState("AssessmentPass2025#");
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

    // Function: triggerPreflightModal (xử lý khi submit form đăng nhập)
    const triggerPreflightModal = useCallback((e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }
        if (isSubmitting) return;

        const currentStudentId = studentId.trim();
        const currentRoomCode = roomCode.trim() || "A2-LAB04";

        setIsSubmitting(true);

        setTimeout(() => {
            alert(
                `Xác thực thành công thí sinh: ${currentStudentId || "SV2024-8841"}\n` +
                `Mã phòng thi: ${currentRoomCode}\n` +
                `Hệ thống đang chuyển tiếp vào danh sách ca thi...`
            );
            // Gọi callback nếu có hoặc thực hiện chuyển trang
            if (onLoginSuccess) {
                onLoginSuccess();
            } else {
                handleStudentLogin(); // Chuyển sang danh sách ca thi
            }
        }, 1200);
    }, [isSubmitting, studentId, roomCode, onLoginSuccess, handleStudentLogin]);

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
                isLoggedIn={true}
                user={{
                    name: "Nguyễn Văn An",
                    studentId: "SV2024-8841",
                    department: "Khoa Công nghệ Thông tin",
                    shortName: "AN"
                }}
                onLogout={() => {
                    // Xử lý khi thí sinh bấm Đăng xuất từ dropdown Header
                    router.push('/pages/student/auth/login');
                }}
            />
            {/* 2. BODY CHÍNH */}
            <main className="w-full pt-4 pb-12 flex-1 flex flex-col justify-center items-center px-4 md:px-6 lg:px-8">
                <div className="w-full max-w-7xl mx-auto my-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* CỘT TRÁI: FORM ĐĂNG NHẬP (7 Cols) */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 flex flex-col gap-6">
                                {/* Header Info */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                                            CỔNG THÍ SINH CHÍNH THỨC
                                        </span>
                                        <span className="text-slate-400 text-xs font-medium">
                                            • Phiên bản 4.2 Pro
                                        </span>
                                    </div>
                                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                        Đăng Nhập Cổng Khảo Thí Trực Tuyến
                                    </h1>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Sử dụng tài khoản định danh do Nhà trường cấp (
                                        <span className="font-semibold text-blue-700">@sinhvien.edu.vn</span>{" "}
                                        hoặc{" "}
                                        <span className="font-semibold text-blue-700">Mã số sinh viên</span>
                                        ) để truy cập phòng thi đã được gán.
                                    </p>
                                </div>

                                {/* Traditional Form Fields */}
                                <form className="flex flex-col gap-4" onSubmit={triggerPreflightModal}>
                                    {/* Field 1: Student ID */}
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-between text-xs font-semibold">
                                            <label className="text-slate-800" htmlFor="studentId">
                                                Mã số sinh viên (MSSV) / Email trường <span className="text-red-500">*</span>
                                            </label>
                                            <span className="text-blue-600 flex items-center gap-0.5 font-bold">
                                                <span className="material-symbols-outlined text-[14px]">badge</span> Mã sinh viên chuẩn
                                            </span>
                                        </div>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                                                school
                                            </span>
                                            <input
                                                className="w-full pl-11 pr-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm font-medium"
                                                id="studentId"
                                                placeholder="Ví dụ: SV2024-8841 hoặc triet.nvm@sinhvien.edu.vn"
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
                                                className="text-blue-600 hover:underline"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.push('/pages/student/auth/forgot-password');
                                                }}
                                            >
                                                Quên mật khẩu / Khôi phục mã?
                                            </button>
                                        </div>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                                                lock
                                            </span>
                                            <input
                                                className="w-full pl-11 pr-12 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm font-medium"
                                                id="examPassword"
                                                placeholder="Nhập mật khẩu an toàn của bạn"
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

                                    {/* Field 3: Room Passcode */}
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-between text-xs font-semibold">
                                            <label className="text-slate-800" htmlFor="roomCode">
                                                Mã phòng thi <span className="text-red-500">*</span>
                                            </label>
                                            <span className="text-blue-600 flex items-center gap-0.5 font-bold">
                                                <span className="material-symbols-outlined text-[14px]">meeting_room</span> Mặc định: A2-LAB04
                                            </span>
                                        </div>
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                                                domain
                                            </span>
                                            <input
                                                className="w-full pl-11 pr-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm font-medium"
                                                id="roomCode"
                                                placeholder="Nhập mã phòng thi (ví dụ: A2-LAB04)"
                                                type="text"
                                                value={roomCode}
                                                onChange={(e) => setRoomCode(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Remember Device */}
                                    <div className="flex items-center justify-between py-1">
                                        <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-700 font-medium">
                                            <input
                                                checked={rememberDevice}
                                                onChange={(e) => setRememberDevice(e.target.checked)}
                                                className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer accent-blue-600"
                                                type="checkbox"
                                            />
                                            <span>Ghi nhớ tài khoản trên thiết bị này</span>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all ${isSubmitting
                                            ? "bg-blue-400 cursor-not-allowed opacity-90"
                                            : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99] cursor-pointer shadow-blue-500/20"
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

                        {/* CỘT PHẢI: KIỂM TRA KỸ THUẬT & QUY CHẾ (5 Cols) */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* Card 1: Diagnostic Checklist */}
                            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col gap-4">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[18px]">tune</span>
                                        </div>
                                        <h2 className="text-sm font-bold text-slate-900">
                                            Kiểm Tra Kỹ Thuật
                                        </h2>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-blue-700 text-[11px] font-bold border border-slate-200">
                                        Tự động phát hiện
                                    </span>
                                </div>

                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Để bài thi diễn ra không gián đoạn, vui lòng đảm bảo môi trường máy tính đáp ứng đầy đủ tiêu chuẩn khảo thí quốc gia:
                                </p>

                                {/* Checklist Items */}
                                <div className="flex flex-col gap-2.5">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                                videocam
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-800">
                                                    Webcam độ nét cao
                                                </span>
                                                <span className="text-[11px] text-slate-500">
                                                    Góc nhìn rõ khuôn mặt thí sinh
                                                </span>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                                            check_circle
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                                mic
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-800">
                                                    Microphone thu âm
                                                </span>
                                                <span className="text-[11px] text-slate-500">
                                                    Thu tạp âm phòng thi
                                                </span>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                                            check_circle
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                                browser_updated
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-800">
                                                    Chrome / Edge Mới Nhất
                                                </span>
                                                <span className="text-[11px] text-slate-500">
                                                    V120+ khuyến nghị
                                                </span>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                                            check_circle
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                                speed
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-800">
                                                    Băng thông tối thiểu
                                                </span>
                                                <span className="text-[11px] text-slate-500">
                                                    ≥ 15 Mbps độ trễ &lt; 30ms
                                                </span>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                                            check_circle
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${diagnosticStatus === "loading"
                                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                        : diagnosticStatus === "success"
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            : "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                                        }`}
                                    disabled={diagnosticStatus === "loading"}
                                    onClick={runDiagnosticCheck}
                                    type="button"
                                >
                                    {diagnosticStatus === "loading" ? (
                                        <>
                                            <span className="material-symbols-outlined text-[18px] animate-spin">
                                                progress_activity
                                            </span>
                                            <span>Đang đồng bộ thiết bị ngoại vi...</span>
                                        </>
                                    ) : diagnosticStatus === "success" ? (
                                        <>
                                            <span className="material-symbols-outlined text-[18px]">
                                                verified
                                            </span>
                                            <span>Thiết bị đạt tiêu chuẩn 100%</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-[18px]">
                                                build_circle
                                            </span>
                                            <span>Kiểm tra thử thiết bị &amp; đường truyền ngay</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Card 2: Academic Integrity */}
                            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <span className="material-symbols-outlined text-[20px]">gavel</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                                            Cam Kết Trung Thực Học Thuật
                                        </h3>
                                        <span className="text-[11px] text-slate-500 font-medium">
                                            Quy chế thi trực tuyến ban hành 2024
                                        </span>
                                    </div>
                                </div>

                                <div className="relative w-full h-32 rounded-xl overflow-hidden shadow-xs border border-slate-200">
                                    <img
                                        alt="Academic integrity check"
                                        className="w-full h-full object-cover"
                                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end p-3">
                                        <span className="text-xs text-white font-semibold flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px] text-blue-400">
                                                shield_lock
                                            </span>
                                            Giám sát đa luồng: AI Vision &amp; Giám thị Hội đồng
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-red-50 border border-red-200/80 p-3 rounded-xl">
                                    <p className="text-[11px] text-red-700 font-medium leading-relaxed">
                                        • Mọi hành vi gian lận danh tính, chuyển đổi cửa sổ tab không cho phép, hoặc nhờ người thi hộ sẽ bị tự động khóa bài thi và đình chỉ khảo thí theo Điều lệ số 12/BGD&amp;ĐT.
                                    </p>
                                </div>
                            </div>
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
                </div>
            </main>

            {/* 3. FOOTER */}
            <footer className="w-full bg-white border-t border-slate-200 py-6">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-500">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <span className="font-bold text-blue-900">FPT University</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span>© 2024 Bản quyền thuộc Bộ GD&amp;ĐT</span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                                Hệ thống bảo mật hạ tầng đám mây đáp ứng tiêu chuẩn an toàn ISO/IEC 27001:2022 và NIST SP 800-53.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
                            <span className="flex items-center gap-1 text-slate-600">
                                <span className="material-symbols-outlined text-[16px] text-blue-600">lock</span>
                                Mã Hóa TLS 1.3
                            </span>
                            <span className="flex items-center gap-1 text-slate-600">
                                <span className="material-symbols-outlined text-[16px] text-blue-600">mail</span>
                                hotro@khaothi.edu.vn
                            </span>
                            <span className="flex items-center gap-1 text-slate-600">
                                <span className="material-symbols-outlined text-[16px] text-blue-600">call</span>
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