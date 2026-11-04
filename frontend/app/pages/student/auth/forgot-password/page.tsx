"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function StudentPasswordRecovery() {
    // Quản lý Step (1: Xác minh -> 2: Nhập OTP -> 3: Đổi mật khẩu -> 4: Hoàn tất)
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

    // Thông tin Form
    const [mssv, setMssv] = useState('SV2024-8841');
    const [email, setEmail] = useState('an.nguyen@sinhvien.edu.vn');

    // Captcha State
    const captchaList = ['9K2W7', '5T8Q1', '4X6B9', '8M3Z4', '7G4X9', '2R7N5'];
    const [captchaIndex, setCaptchaIndex] = useState(4);
    const [captchaInput, setCaptchaInput] = useState('7G4X9');

    // OTP 6 chữ số
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [secondsLeft, setSecondsLeft] = useState(299); // 04:59
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // Mật khẩu mới
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // Toast Notification
    const [toast, setToast] = useState<{
        show: boolean;
        title: string;
        message: string;
        icon: string;
    }>({
        show: false,
        title: '',
        message: '',
        icon: 'verified',
    });

    // Ref cho 6 ô OTP
    const otpRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    // Đếm ngược OTP
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isTimerRunning && secondsLeft > 0) {
            timer = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        } else if (secondsLeft === 0) {
            setIsTimerRunning(false);
        }
        return () => clearInterval(timer);
    }, [isTimerRunning, secondsLeft]);

    // Format mm:ss
    const formatTimer = (totalSecs: number) => {
        const mins = Math.floor(totalSecs / 60);
        const secs = totalSecs % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // Hiển thị Toast
    const triggerToast = (title: string, message: string, icon = 'verified') => {
        setToast({ show: true, title, message, icon });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 4500);
    };

    // Refresh Captcha
    const refreshCaptcha = () => {
        const nextIdx = (captchaIndex + 1) % captchaList.length;
        setCaptchaIndex(nextIdx);
        setCaptchaInput('');
    };

    // Submit Bước 1: Gửi OTP
    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
        setSecondsLeft(299);
        setIsTimerRunning(true);
        triggerToast(
            'Mã OTP đã được gửi',
            `Hệ thống vừa gửi mã 6 số tới ${email}. Vui lòng kiểm tra email.`
        );
        setTimeout(() => {
            otpRefs[0].current?.focus();
        }, 150);
    };

    // Nhập OTP
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handleOtpKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    // Gửi lại OTP
    const handleResendOtp = () => {
        setSecondsLeft(299);
        setIsTimerRunning(true);
        triggerToast(
            'Đã gửi lại mã OTP',
            'Mã xác thực mới đã được phát tới email học thuật của bạn.',
            'autorenew'
        );
    };

    // Submit Bước 2: Xác thực OTP
    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.some((v) => v === '')) {
            setOtp(['5', '8', '2', '9', '1', '4']);
        }
        setStep(3);
        setIsTimerRunning(false);
        triggerToast(
            'Xác thực OTP thành công',
            'Chuyển sang bước tạo mật khẩu mới an toàn.',
            'check_circle'
        );
    };

    // Kiểm tra quy tắc mật khẩu
    const isLengthValid = newPassword.length >= 8;
    const isCaseValid = /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword);
    const isNumValid = /[0-9]/.test(newPassword);
    const isSpecialValid = /[@#$%!^&*]/.test(newPassword);

    // Submit Bước 3: Cập nhật mật khẩu
    const handleFinishPasswordReset = (e: React.FormEvent) => {
        e.preventDefault();
        if (confirmPassword && newPassword !== confirmPassword) {
            setPasswordError('Mật khẩu xác nhận chưa trùng khớp.');
            return;
        }
        setPasswordError('');
        setStep(4);
        triggerToast(
            'Đã đổi mật khẩu thành công!',
            'Bạn có thể đăng nhập ngay với mật khẩu mới.',
            'verified'
        );
    };

    // Reset về lại Bước 1
    const resetToStep1 = () => {
        setNewPassword('');
        setConfirmPassword('');
        setOtp(['', '', '', '', '', '']);
        setStep(1);
    };

    return (
        <div className="bg-slate-50 font-sans text-slate-900 antialiased min-h-screen py-8 sm:py-10">
            <main className="w-full">
                <div className="w-full max-w-7xl mx-auto px-6">
                    {/* Breadcrumb & Header Title */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                        <div className="space-y-1">
                            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                <a className="hover:text-blue-900 transition-colors flex items-center gap-1" href="#">
                                    <span className="material-symbols-outlined text-[15px]">home</span>
                                    Trang chủ
                                </a>
                                <span className="text-slate-300">/</span>
                                <a className="hover:text-blue-900 transition-colors" href="#">Cổng sinh viên</a>
                                <span className="text-slate-300">/</span>
                                <span className="text-slate-900 font-semibold">Khôi phục mật khẩu</span>
                            </nav>
                            <h1 className="text-2xl font-bold text-blue-900 tracking-tight">
                                Khôi Phục Mật Khẩu Sinh Viên
                            </h1>
                            <p className="text-xs text-slate-500 max-w-2xl">
                                Hệ thống hỗ trợ thí sinh đặt lại mật khẩu phòng thi thông qua email sinh viên do nhà trường cấp.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 self-start md:self-auto">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs text-emerald-800 uppercase tracking-wider font-semibold">
                                Hệ thống trực tuyến an toàn ISO 27001
                            </span>
                        </div>
                    </div>

                    {/* Stepper Indicator */}
                    <div className="w-full max-w-2xl mx-auto mb-6">
                        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200">
                            <div className="grid grid-cols-3 gap-2 relative">
                                {/* Step 1 Badge */}
                                <div className={`flex flex-col items-center text-center relative z-10 transition-all ${step < 1 ? 'opacity-70' : ''}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-xs transition-all ${step > 1 ? 'bg-emerald-800 text-emerald-300' : 'bg-blue-900 text-white ring-4 ring-blue-100'
                                        }`}>
                                        {step > 1 ? <span className="material-symbols-outlined text-[20px]">check</span> : '1'}
                                    </div>
                                    <span className={`mt-1 text-xs font-bold ${step >= 1 ? 'text-blue-900' : 'text-slate-500'}`}>
                                        Xác minh danh tính
                                    </span>
                                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                                        {step > 1 ? 'Hoàn thành' : 'Đang thực hiện'}
                                    </span>
                                </div>

                                {/* Step 2 Badge */}
                                <div className={`flex flex-col items-center text-center relative z-10 transition-all ${step < 2 ? 'opacity-70' : ''}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step > 2 ? 'bg-emerald-800 text-emerald-300 shadow-xs' : step === 2 ? 'bg-blue-900 text-white ring-4 ring-blue-100 shadow-xs' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {step > 2 ? <span className="material-symbols-outlined text-[20px]">check</span> : '2'}
                                    </div>
                                    <span className={`mt-1 text-xs font-bold ${step >= 2 ? 'text-blue-900' : 'text-slate-500'}`}>
                                        Nhập mã OTP 6 số
                                    </span>
                                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                                        {step > 2 ? 'Hoàn thành' : step === 2 ? 'Chờ nhập mã' : 'Hiệu lực 05 phút'}
                                    </span>
                                </div>

                                {/* Step 3 Badge */}
                                <div className={`flex flex-col items-center text-center relative z-10 transition-all ${step < 3 ? 'opacity-70' : ''}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step === 4 ? 'bg-emerald-800 text-emerald-300 shadow-xs' : step === 3 ? 'bg-blue-900 text-white ring-4 ring-blue-100 shadow-xs' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {step === 4 ? <span className="material-symbols-outlined text-[20px]">check</span> : '3'}
                                    </div>
                                    <span className={`mt-1 text-xs font-bold ${step >= 3 ? 'text-blue-900' : 'text-slate-500'}`}>
                                        Mật khẩu mới
                                    </span>
                                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                                        {step === 4 ? 'Hoàn thành' : 'Chuẩn an toàn cao'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
                        {/* Left Column: Form Card */}
                        <div className="lg:col-span-7 flex flex-col">
                            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 flex flex-col justify-between flex-grow">
                                <div>
                                    {/* Card Header Info */}
                                    <div className="flex items-center gap-4 pb-4 border-b border-slate-200 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center shadow-inner shrink-0">
                                            <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                {step === 1 ? 'shield_person' : step === 2 ? 'pin' : step === 3 ? 'lock_reset' : 'verified'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-base font-bold text-slate-900">
                                                {step === 1 && 'Cổng Định Danh Thí Sinh'}
                                                {step === 2 && 'Xác Thực Mã Bảo Mật OTP'}
                                                {step === 3 && 'Thiết Lập Mật Khẩu Mới'}
                                                {step === 4 && 'Hoàn Tất Đặt Lại Mật Khẩu'}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {step === 1 && 'Phương thức khôi phục: Email sinh viên trường cấp'}
                                                {step === 2 && 'Nhập mã gồm 6 chữ số gửi qua email trường cấp'}
                                                {step === 3 && 'Mật khẩu phòng thi mới tuân thủ quy chuẩn ISO 27001'}
                                                {step === 4 && 'Tài khoản đã được cập nhật thành công'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* STEP 1: Identification */}
                                    {step === 1 && (
                                        <div className="space-y-4">
                                            <div className="bg-slate-50 px-4 py-2.5 rounded-lg flex items-center gap-2 border border-slate-200">
                                                <span className="material-symbols-outlined text-blue-900 text-[20px]">mark_email_read</span>
                                                <span className="text-xs text-blue-900 font-semibold">Xác minh qua hòm thư sinh viên chính chủ</span>
                                            </div>

                                            <form className="space-y-4" onSubmit={handleStep1Submit}>
                                                <div className="space-y-1">
                                                    <label className="block text-xs font-bold text-slate-900" htmlFor="mssv">
                                                        Mã số sinh viên (MSSV) <span className="text-red-600">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">
                                                            school
                                                        </span>
                                                        <input
                                                            className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 border border-slate-200 transition-all"
                                                            id="mssv"
                                                            placeholder="Ví dụ: SV2024-8841"
                                                            required
                                                            type="text"
                                                            value={mssv}
                                                            onChange={(e) => setMssv(e.target.value)}
                                                        />
                                                    </div>
                                                    <p className="text-[11px] text-slate-500">Nhập mã sinh viên in trên thẻ sinh viên hoặc giấy báo dự thi.</p>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="block text-xs font-bold text-slate-900" htmlFor="edu-email">
                                                        Hộp thư điện tử học thuật (@sinhvien.edu.vn) <span className="text-red-600">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">
                                                            mail
                                                        </span>
                                                        <input
                                                            className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 border border-slate-200 transition-all"
                                                            id="edu-email"
                                                            placeholder="Ví dụ: an.nguyen@sinhvien.edu.vn"
                                                            required
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <p className="text-[11px] text-slate-500">Mã OTP sẽ được gửi về hòm thư công vụ của trường để xác nhận.</p>
                                                </div>

                                                {/* Captcha Block */}
                                                <div className="space-y-1 pt-1">
                                                    <label className="block text-xs font-bold text-slate-900" htmlFor="captcha-input">
                                                        Mã kiểm tra an ninh (Captcha) <span className="text-red-600">*</span>
                                                    </label>
                                                    <div className="flex items-center gap-2">
                                                        <div className="relative flex items-center justify-center bg-slate-200 px-4 py-2 rounded-lg select-none overflow-hidden min-w-[120px] shadow-inner">
                                                            <span className="font-mono text-base tracking-widest text-blue-900 italic font-extrabold select-none">
                                                                {captchaList[captchaIndex]}
                                                            </span>
                                                        </div>
                                                        <button
                                                            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-blue-900 hover:bg-slate-200 transition-colors shrink-0"
                                                            type="button"
                                                            onClick={refreshCaptcha}
                                                            title="Lấy mã xác thực mới"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">refresh</span>
                                                        </button>
                                                        <div className="flex-grow">
                                                            <input
                                                                className="w-full bg-slate-50 px-4 py-2 rounded-lg text-xs text-slate-900 placeholder-slate-400 uppercase focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 border border-slate-200 transition-all"
                                                                id="captcha-input"
                                                                placeholder="Nhập mã bên trái"
                                                                required
                                                                type="text"
                                                                value={captchaInput}
                                                                onChange={(e) => setCaptchaInput(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-2">
                                                    <button
                                                        className="w-full min-h-[44px] bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                                                        type="submit"
                                                    >
                                                        <span>Gửi Mã Xác Thực OTP (Hiệu lực 05 phút)</span>
                                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}

                                    {/* STEP 2: OTP Verification */}
                                    {step === 2 && (
                                        <div className="space-y-4">
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
                                                <div className="flex items-center justify-center gap-1.5 text-blue-900 font-semibold text-xs">
                                                    <span className="material-symbols-outlined text-[18px]">mark_email_unread</span>
                                                    <span>Đã gửi mã xác nhận đến email</span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-900">{email}</p>
                                                <p className="text-[11px] text-slate-500">Vui lòng kiểm tra hộp thư đến và nhập mã 6 số dưới đây.</p>
                                            </div>

                                            <form className="space-y-4" onSubmit={handleVerifyOtp}>
                                                <div className="space-y-1">
                                                    <label className="block text-center text-xs font-bold text-slate-900">
                                                        Nhập mã bảo mật 6 số <span className="text-red-600">*</span>
                                                    </label>
                                                    <div className="flex items-center justify-center gap-2 py-2">
                                                        {otp.map((digit, idx) => (
                                                            <input
                                                                key={idx}
                                                                ref={otpRefs[idx]}
                                                                className="w-11 h-12 text-center font-mono text-xl font-bold bg-slate-50 text-blue-900 border border-slate-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-blue-900/20 rounded-lg outline-none transition-all"
                                                                inputMode="numeric"
                                                                maxLength={1}
                                                                type="text"
                                                                value={digit}
                                                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Timer & Resend */}
                                                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-white rounded-lg border border-slate-200">
                                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                                        <span className="material-symbols-outlined text-blue-900 text-[18px]">timer</span>
                                                        <span>Thời gian còn hiệu lực:</span>
                                                        <span className="font-mono font-bold text-red-600">{formatTimer(secondsLeft)}</span>
                                                    </div>
                                                    <button
                                                        className="text-xs text-blue-900 hover:underline font-semibold flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        type="button"
                                                        disabled={secondsLeft > 240}
                                                        onClick={handleResendOtp}
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">autorenew</span>
                                                        <span>Gửi lại mã OTP</span>
                                                    </button>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-2 pt-1">
                                                    <button
                                                        className="px-4 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                                                        type="button"
                                                        onClick={() => setStep(1)}
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                                        <span>Quay lại</span>
                                                    </button>
                                                    <button
                                                        className="flex-grow min-h-[44px] bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                                                        type="submit"
                                                    >
                                                        <span>Xác nhận mã OTP &amp; Tiếp tục</span>
                                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}

                                    {/* STEP 3: Reset Password */}
                                    {step === 3 && (
                                        <div className="space-y-4">
                                            <form className="space-y-4" onSubmit={handleFinishPasswordReset}>
                                                <div className="space-y-1">
                                                    <label className="block text-xs font-bold text-slate-900" htmlFor="new-password">
                                                        Mật khẩu mới <span className="text-red-600">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">
                                                            lock
                                                        </span>
                                                        <input
                                                            className="w-full bg-slate-50 pl-10 pr-12 py-2.5 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 border border-slate-200 transition-all"
                                                            id="new-password"
                                                            placeholder="Nhập mật khẩu mới an toàn"
                                                            required
                                                            type={showNewPassword ? 'text' : 'password'}
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                        />
                                                        <button
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-900 transition-colors p-1"
                                                            type="button"
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">
                                                                {showNewPassword ? 'visibility_off' : 'visibility'}
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="block text-xs font-bold text-slate-900" htmlFor="confirm-password">
                                                        Xác nhận lại mật khẩu mới <span className="text-red-600">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">
                                                            lock_reset
                                                        </span>
                                                        <input
                                                            className="w-full bg-slate-50 pl-10 pr-12 py-2.5 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 border border-slate-200 transition-all"
                                                            id="confirm-password"
                                                            placeholder="Nhập lại chính xác mật khẩu mới"
                                                            required
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            value={confirmPassword}
                                                            onChange={(e) => {
                                                                setConfirmPassword(e.target.value);
                                                                if (passwordError) setPasswordError('');
                                                            }}
                                                        />
                                                        <button
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-900 transition-colors p-1"
                                                            type="button"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">
                                                                {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                                            </span>
                                                        </button>
                                                    </div>
                                                    {passwordError && (
                                                        <p className="text-[11px] text-red-600 font-medium mt-1">{passwordError}</p>
                                                    )}
                                                </div>

                                                {/* Interactive Password Rules */}
                                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                                                    <span className="text-xs font-bold text-slate-900 block">Tiêu chuẩn mật khẩu an toàn:</span>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
                                                        <div className={`flex items-center gap-1.5 ${isLengthValid ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                                                            <span className="material-symbols-outlined text-[16px]">
                                                                {isLengthValid ? 'check_circle' : 'radio_button_unchecked'}
                                                            </span>
                                                            <span>Tối thiểu 8 ký tự</span>
                                                        </div>

                                                        <div className={`flex items-center gap-1.5 ${isCaseValid ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                                                            <span className="material-symbols-outlined text-[16px]">
                                                                {isCaseValid ? 'check_circle' : 'radio_button_unchecked'}
                                                            </span>
                                                            <span>Gồm chữ hoa &amp; chữ thường</span>
                                                        </div>

                                                        <div className={`flex items-center gap-1.5 ${isNumValid ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                                                            <span className="material-symbols-outlined text-[16px]">
                                                                {isNumValid ? 'check_circle' : 'radio_button_unchecked'}
                                                            </span>
                                                            <span>Ít nhất 1 số (0-9)</span>
                                                        </div>

                                                        <div className={`flex items-center gap-1.5 ${isSpecialValid ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                                                            <span className="material-symbols-outlined text-[16px]">
                                                                {isSpecialValid ? 'check_circle' : 'radio_button_unchecked'}
                                                            </span>
                                                            <span>Chứa ký tự đặc biệt (@, #, $, ...)</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-2 pt-1">
                                                    <button
                                                        className="px-4 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                                                        type="button"
                                                        onClick={() => setStep(2)}
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                                        <span>Quay lại</span>
                                                    </button>
                                                    <button
                                                        className="flex-grow min-h-[44px] bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                                                        type="submit"
                                                    >
                                                        <span>Cập nhật mật khẩu &amp; Đăng nhập</span>
                                                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}

                                    {/* SUCCESS VIEW */}
                                    {step === 4 && (
                                        <div className="space-y-4 py-2 text-center">
                                            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                                                <span className="material-symbols-outlined text-[36px]">verified</span>
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg text-blue-900 font-bold">Đặt lại mật khẩu thành công!</h3>
                                                <p className="text-xs text-slate-500 max-w-md mx-auto">
                                                    Mật khẩu tài khoản sinh viên đã được cập nhật thành công trên máy chủ khảo thí trực tuyến.
                                                </p>
                                            </div>

                                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-600 space-y-1">
                                                <div><strong>Mã SV:</strong> <span>{mssv}</span></div>
                                                <div><strong>Email liên kết:</strong> <span>{email}</span></div>
                                                <div><strong>Thời gian áp dụng:</strong> Vừa xong (Hiệu lực tức thì)</div>
                                            </div>

                                            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                                                <a
                                                    className="w-full sm:w-auto px-6 min-h-[44px] bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                                                    href="#"
                                                >
                                                    <span>Đến Cổng Đăng Nhập Sinh Viên</span>
                                                    <span className="material-symbols-outlined text-[18px]">login</span>
                                                </a>
                                                <button
                                                    className="w-full sm:w-auto px-4 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all"
                                                    type="button"
                                                    onClick={resetToStep1}
                                                >
                                                    Làm lại từ đầu
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Security Status */}
                                <div className="mt-6 pt-3 bg-slate-50 -mx-6 -mb-6 px-6 py-2.5 rounded-b-xl flex items-center justify-between text-slate-500 border-t border-slate-200 text-[11px]">
                                    <span className="flex items-center gap-1 font-medium">
                                        <span className="material-symbols-outlined text-[16px] text-emerald-700">lock</span>
                                        Xác thực 2 lớp qua cổng PKI &amp; Mail Server
                                    </span>
                                    <span>IP: 14.162.*.* (Đã mã hóa)</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Notices & Hotline */}
                        <div className="lg:col-span-5 flex flex-col gap-4">
                            {/* Critical Exam Room Warning */}
                            <div className="bg-red-50 text-red-900 p-4 rounded-xl shadow-xs flex flex-col gap-3 border border-red-200">
                                <div className="flex items-start gap-2">
                                    <div className="p-1 rounded-md bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="material-symbols-outlined text-[18px]">emergency_home</span>
                                    </div>
                                    <div>
                                        <h2 className="text-xs font-bold leading-snug text-red-900">
                                            Lưu ý quan trọng cho ca thi sắp tới
                                        </h2>
                                        <p className="mt-1 text-[11px] leading-relaxed text-red-800">
                                            Nếu ca thi của bạn bắt đầu trong vòng <strong>dưới 30 phút</strong>, vui lòng <strong>không tự đổi mật khẩu</strong>. Hành động đổi mật khẩu sát giờ có thể khiến tài khoản đồng bộ chậm tại máy chủ phòng thi.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white text-slate-900 p-3 rounded-lg flex items-center justify-between shadow-xs border border-red-100">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-blue-900 text-[18px]">phone_in_talk</span>
                                        <span className="text-xs font-semibold">Hotline Hội đồng Khảo thí:</span>
                                    </div>
                                    <a className="text-sm font-bold text-blue-900 hover:underline" href="tel:19006886">
                                        1900 6886
                                    </a>
                                </div>
                                <p className="text-[11px] opacity-90 text-center">
                                    Liên hệ ngay Cán bộ Coi thi tại bàn giám thị để nhận Mã PIN dự phòng khẩn cấp.
                                </p>
                            </div>

                            {/* Academic Security Checklist */}
                            <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 space-y-3">
                                <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs pb-1 border-b border-slate-100">
                                    <span className="material-symbols-outlined text-[18px]">policy</span>
                                    Quy chuẩn mật khẩu mới
                                </div>
                                <ul className="space-y-1.5 text-xs text-slate-600">
                                    <li className="flex items-start gap-1.5">
                                        <span className="material-symbols-outlined text-emerald-700 text-[16px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Độ dài tối thiểu <strong>8 ký tự</strong> (khuyến nghị 12 ký tự).</span>
                                    </li>
                                    <li className="flex items-start gap-1.5">
                                        <span className="material-symbols-outlined text-emerald-700 text-[16px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Chứa ít nhất 1 chữ hoa (A-Z), 1 chữ thường (a-z), 1 số (0-9).</span>
                                    </li>
                                    <li className="flex items-start gap-1.5">
                                        <span className="material-symbols-outlined text-emerald-700 text-[16px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Chứa ký tự đặc biệt (@, #, $, %, !, ^, &amp;, *).</span>
                                    </li>
                                    <li className="flex items-start gap-1.5">
                                        <span className="material-symbols-outlined text-emerald-700 text-[16px] shrink-0 mt-0.5">check_circle</span>
                                        <span>Không trùng với 3 mật khẩu đã sử dụng gần nhất.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Secondary Navigation */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
                                <a
                                    className="flex items-center justify-between text-blue-900 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-slate-100 text-xs font-semibold"
                                    href="#"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                        Quay lại trang Đăng nhập sinh viên
                                    </span>
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </a>
                                <a
                                    className="flex items-center justify-between text-slate-600 hover:text-blue-900 transition-colors p-2 rounded-lg hover:bg-slate-100 text-xs"
                                    href="#"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[18px]">person_pin</span>
                                        Khôi phục tài khoản Giảng viên / CBCT
                                    </span>
                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Technical Support Banner */}
                    <div className="mt-8 mb-4 w-full bg-slate-100 rounded-xl p-4 shadow-xs border border-slate-200">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center shrink-0 shadow-xs">
                                    <span className="material-symbols-outlined text-white text-[22px]">contact_support</span>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-blue-900">Trung Tâm Trợ Giúp Kỹ Thuật Khảo Thí &amp; Máy Chủ Thi</h3>
                                    <p className="text-[11px] text-slate-500">
                                        Gặp sự cố lỗi đồng bộ tài khoản, không nhận được OTP, hoặc máy tính phòng thi bị vô hiệu hóa?
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 shrink-0">
                                <a
                                    className="px-3 py-2 bg-white text-blue-900 hover:bg-blue-900 hover:text-white rounded-lg text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-[16px]">chat</span>
                                    Trò chuyện trực tuyến (Live Chat)
                                </a>
                                <a
                                    className="px-3 py-2 bg-blue-900 text-white hover:bg-blue-950 rounded-lg text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-[16px]">help_center</span>
                                    Hướng dẫn giải quyết sự cố
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Notification Toast */}
                {toast.show && (
                    <div className="fixed bottom-6 right-6 max-w-md bg-slate-900 text-white p-4 rounded-xl shadow-2xl z-50 flex items-start gap-3 transition-all">
                        <span className="material-symbols-outlined text-emerald-400 text-[22px]">
                            {toast.icon}
                        </span>
                        <div className="flex-grow">
                            <div className="text-xs font-bold text-white">{toast.title}</div>
                            <p className="text-[11px] text-slate-300 mt-0.5">{toast.message}</p>
                        </div>
                        <button
                            className="text-slate-400 hover:text-white"
                            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
                        >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}