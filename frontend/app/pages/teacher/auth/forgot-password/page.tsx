"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LecturerPasswordRecovery() {
    const router = useRouter();

    // State quản lý phương thức xác thực ('A' hoặc 'B')
    const [authMethod, setAuthMethod] = useState<'A' | 'B'>('A');

    // State lưu trữ dữ liệu Form
    const [formData, setFormData] = useState({
        msgv: 'GV2024-1049',
        officialEmail: 'mai.lequang@hust.edu.vn',
        cccdLast4: '8899',
    });

    // State đồng hồ thời gian thực
    const [liveNtpTime, setLiveNtpTime] = useState('');

    // State xử lý quét thiết bị PKI Token
    const [tokenStatus, setTokenStatus] = useState('Đang chờ kết nối thiết bị Token PKCS#11...');
    const [isTokenConnected, setIsTokenConnected] = useState(false);
    const [isScanningToken, setIsScanningToken] = useState(false);

    // State trạng thái Submit & Modal thông báo
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Đồng hồ thời gian thực GMT+7
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setLiveNtpTime(`${hours}:${minutes}:${seconds} GMT+7`);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // Thay đổi input form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Quét thiết bị phần cứng (USB Token)
    const detectHardwareToken = () => {
        setIsScanningToken(true);
        setTokenStatus('Đang quét cổng USB / NFC Security Key...');

        setTimeout(() => {
            setIsScanningToken(false);
            setIsTokenConnected(true);
            setTokenStatus('Tìm thấy: VNPT-CA Token PKI (ID: SN-77391-EDU - Cấp độ 4)');
        }, 1200);
    };

    // Xử lý gửi Form khôi phục
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setShowModal(true);
        }, 1200);
    };

    return (
        <div className="w-full bg-[#f8f9ff] text-[#0b1c30] antialiased py-6 sm:py-8">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
                {/* Breadcrumb & Security Level Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <nav className="flex items-center gap-2 text-xs text-[#515f74]">
                        <Link href="/pages/teacher/auth" className="hover:text-[#00236f] transition-colors flex items-center gap-1 font-medium">
                            <span className="material-symbols-outlined text-[16px]">home</span>
                            Trang chủ
                        </Link>
                        <span className="text-[#c5c5d3]">/</span>
                        <Link href="/pages/teacher/auth" className="hover:text-[#00236f] transition-colors font-medium">
                            Cổng giảng viên
                        </Link>
                        <span className="text-[#c5c5d3]">/</span>
                        <span className="text-[#00236f] font-semibold">Khôi phục mật khẩu &amp; Khóa truy cập</span>
                    </nav>

                    <div className="flex items-center gap-2 bg-[#eff4ff] border border-[#d6e4ff] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#00236f] shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#004a31] animate-pulse" />
                        <span>Mức an ninh Cấp 4 (NIST SP 800-63B / Ban Cơ Yếu)</span>
                    </div>
                </div>

                {/* Headline Banner */}
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 sm:p-7 shadow-sm mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-[#00236f] text-xs font-bold uppercase tracking-wider mb-2">
                                <span className="material-symbols-outlined text-[18px]">verified</span>
                                Hội đồng Khảo thí &amp; Đảm bảo Chất lượng Giáo dục Đại học
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-[#00236f] tracking-tight mb-2">
                                Khôi Phục Mật Khẩu Giảng Viên &amp; Cán Bộ Khảo Thí
                            </h1>
                            <p className="text-sm text-[#515f74] leading-relaxed">
                                Dành cho Giảng viên, Giám thị và Thành viên Hội đồng Đề thi. Quy trình bắt buộc thực hiện kiểm tra định danh đa lớp (MFA/Token CA) nhằm đảm bảo an toàn tuyệt đối cho ngân hàng đề thi và hệ thống chấm thi độc lập.
                            </p>
                        </div>

                        {/* Telemetry Badge */}
                        <div className="flex flex-col items-start lg:items-end justify-center bg-[#f0f4ff] border border-[#d6e4ff] rounded-xl p-4 min-w-[220px]">
                            <span className="text-xs text-[#515f74] uppercase tracking-wider font-medium">Phiên giám sát</span>
                            <span className="font-mono text-base font-bold text-[#00236f] tracking-wider my-0.5">SEC-ID #9812-VN</span>
                            <div className="flex items-center gap-1.5 text-xs text-[#004a31] font-semibold">
                                <span className="material-symbols-outlined text-[16px]">shield</span>
                                Kênh mã hóa AES-256
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Layout: Main Workspace + Right Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Form Workspace (8 cols) */}
                    <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm p-6 sm:p-8">
                        {/* Header of Form */}
                        <div className="flex items-start gap-4 pb-6 border-b border-[#f1f5f9]">
                            <div className="w-12 h-12 rounded-xl bg-[#00236f] text-white flex items-center justify-center shrink-0 shadow-sm">
                                <span className="material-symbols-outlined text-[26px]">key_vertical</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg sm:text-xl font-bold text-[#00236f]">
                                        Xác Thực Danh Tính Cán Bộ Khảo Thí
                                    </h2>
                                    <span className="material-symbols-outlined text-[#004a31] text-[20px]" title="Được chứng nhận bởi Ban Cơ yếu Chính phủ">
                                        gpp_good
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-[#515f74] mt-1">
                                    Vui lòng lựa chọn phương thức xác thực số đã đăng ký với Trung tâm Quản trị Hạ tầng &amp; Khảo thí.
                                </p>
                            </div>
                        </div>

                        {/* Method Selector Segment */}
                        <div className="mt-6 mb-6">
                            <label className="block text-sm font-bold text-[#0b1c30] mb-3">
                                Phương thức xác thực phân quyền:
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {/* Option A */}
                                <button
                                    type="button"
                                    onClick={() => setAuthMethod('A')}
                                    className={`flex flex-col text-left p-4 rounded-xl border transition-all cursor-pointer ${
                                        authMethod === 'A'
                                            ? 'bg-[#eff4ff] border-[#00236f] shadow-xs'
                                            : 'bg-white border-[#e2e8f0] hover:bg-[#f8faff] hover:border-[#cbd5e1]'
                                    }`}
                                >
                                    <div className="flex items-center justify-between w-full mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[20px] text-[#00236f]">mail_lock</span>
                                            <span className="text-sm font-bold text-[#00236f]">Tùy Chọn A (Chuẩn)</span>
                                        </div>
                                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                                            authMethod === 'A' ? 'border-[#00236f] bg-[#00236f]' : 'border-[#cbd5e1] bg-white'
                                        }`}>
                                            {authMethod === 'A' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </span>
                                    </div>
                                    <span className="text-xs text-[#515f74] leading-relaxed">
                                        Email Công Vụ Cán Bộ (@hust.edu.vn / @edu.vn) &amp; Mã xác thực OTP SMS
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Form Body */}
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Panel Method A */}
                            {authMethod === 'A' && (
                                <div className="space-y-4">
                                    {/* MSGV */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <label className="text-xs sm:text-sm font-semibold text-[#0b1c30] flex items-center gap-1" htmlFor="msgv">
                                                Mã số giảng viên / Cán bộ (MSGV) <span className="text-red-600">*</span>
                                            </label>
                                            <span className="text-xs text-[#515f74]">Định dạng: GVxxxx-xxxx</span>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#515f74]">
                                                <span className="material-symbols-outlined text-[20px]">badge</span>
                                            </div>
                                            <input
                                                type="text"
                                                id="msgv"
                                                required
                                                value={formData.msgv}
                                                onChange={handleInputChange}
                                                placeholder="Ví dụ: GV2024-1049"
                                                className="w-full bg-[#f8faff] text-[#0b1c30] text-sm pl-11 pr-4 py-2.5 rounded-xl border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#00236f] focus:ring-2 focus:ring-[#00236f]/15 transition-all shadow-xs"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <label className="text-xs sm:text-sm font-semibold text-[#0b1c30] flex items-center gap-1" htmlFor="officialEmail">
                                                Email công vụ trường cấp <span className="text-red-600">*</span>
                                            </label>
                                            <span className="text-xs text-[#515f74]">Yêu cầu tên miền *.edu.vn</span>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#515f74]">
                                                <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                                            </div>
                                            <input
                                                type="email"
                                                id="officialEmail"
                                                required
                                                value={formData.officialEmail}
                                                onChange={handleInputChange}
                                                placeholder="Ví dụ: mai.lequang@hust.edu.vn"
                                                className="w-full bg-[#f8faff] text-[#0b1c30] text-sm pl-11 pr-4 py-2.5 rounded-xl border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#00236f] focus:ring-2 focus:ring-[#00236f]/15 transition-all shadow-xs"
                                            />
                                        </div>
                                    </div>

                                    {/* CCCD Last 4 digits */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <label className="text-xs sm:text-sm font-semibold text-[#0b1c30] flex items-center gap-1" htmlFor="cccdLast4">
                                                4 số cuối CCCD đã đồng bộ VNeID Mức 2 <span className="text-red-600">*</span>
                                            </label>
                                            <span className="text-xs text-[#515f74]">Kiểm định sinh trắc học cán bộ</span>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#515f74]">
                                                <span className="material-symbols-outlined text-[20px]">fingerprint</span>
                                            </div>
                                            <input
                                                type="text"
                                                id="cccdLast4"
                                                maxLength={4}
                                                pattern="[0-9]{4}"
                                                required
                                                value={formData.cccdLast4}
                                                onChange={handleInputChange}
                                                placeholder="Ví dụ: 8899"
                                                className="w-full bg-[#f8faff] text-[#0b1c30] text-sm pl-11 pr-4 py-2.5 rounded-xl border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#00236f] focus:ring-2 focus:ring-[#00236f]/15 transition-all shadow-xs tracking-widest font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Panel Method B */}

                            {/* Security Hierarchy 3 Levels */}
                            <div className="pt-2">
                                <div className="text-xs font-bold uppercase text-[#515f74] tracking-wider mb-2.5">
                                    Quy trình xác minh bảo mật 3 cấp (Security Hierarchy)
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="bg-[#f8faff] border border-[#e2e8f0] p-3 rounded-xl flex flex-col justify-between">
                                        <div className="flex items-center gap-1.5 text-[#00236f] text-xs font-bold mb-1">
                                            <span className="w-5 h-5 rounded-full bg-[#00236f] text-white flex items-center justify-center text-[11px]">1</span>
                                            Cấp 1: Kiểm Tra
                                        </div>
                                        <span className="text-[11px] text-[#515f74] leading-snug">
                                            Tra cứu tư cách Hội đồng, chức vụ Giám thị &amp; quyền ngân hàng đề
                                        </span>
                                    </div>

                                    <div className="bg-[#f8faff] border border-[#e2e8f0] p-3 rounded-xl flex flex-col justify-between">
                                        <div className="flex items-center gap-1.5 text-[#00236f] text-xs font-bold mb-1">
                                            <span className="w-5 h-5 rounded-full bg-[#00236f] text-white flex items-center justify-center text-[11px]">2</span>
                                            Cấp 2: Xác Nhận OTP
                                        </div>
                                        <span className="text-[11px] text-[#515f74] leading-snug">
                                            Kích hoạt OTP song song qua SMS SIM công vụ &amp; Email bảo mật
                                        </span>
                                    </div>

                                    <div className="bg-[#f8faff] border border-[#e2e8f0] p-3 rounded-xl flex flex-col justify-between">
                                        <div className="flex items-center gap-1.5 text-[#00236f] text-xs font-bold mb-1">
                                            <span className="w-5 h-5 rounded-full bg-[#00236f] text-white flex items-center justify-center text-[11px]">3</span>
                                            Cấp 3: Cấp Mật Khẩu
                                        </div>
                                        <span className="text-[11px] text-[#515f74] leading-snug">
                                            Phát hành mật khẩu phiên tạm kèm chữ ký điện tử ký số SHA-512
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 bg-[#00236f] hover:bg-[#1a3889] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                                            <span>Đang xử lý dữ liệu kiểm toán...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                                            <span>
                                                {authMethod === 'A'
                                                    ? 'Tiến Hành Xác Thực & Gửi Yêu Cầu Cấp Lại'
                                                    : 'Đọc Chứng Thư Token & Xác Thực Khóa CA'}
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Success Notification Alert */}
                            {showModal && (
                                <div className="p-4 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] shadow-xs">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-[#059669] text-[24px] shrink-0 mt-0.5">task_alt</span>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-bold text-[#065f46]">
                                                Yêu Cầu Khôi Phục Đã Được Ghi Nhận
                                            </h4>
                                            <p className="text-xs text-[#047857] leading-relaxed">
                                                Hệ thống đã mã hóa yêu cầu và chuyển tiếp tới Trung tâm Kiểm thử Khảo thí. Một mã OTP xác nhận cấp độ 2 gồm 6 chữ số đã được gửi tới số điện thoại và email công vụ của đồng chí. Vui lòng kiểm tra hộp thư trong vòng 5 phút.
                                            </p>
                                            <div className="pt-2 flex flex-wrap items-center gap-2">
                                                <span className="text-xs text-[#00236f] bg-white border border-[#bfdbfe] px-2.5 py-1 rounded-md shadow-xs">
                                                    Mã tham chiếu: <strong className="font-mono">EXAM-REC-7729-NTP</strong>
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => router.push('/pages/teacher/auth')}
                                                    className="text-xs font-semibold text-[#00236f] hover:underline flex items-center gap-1 cursor-pointer"
                                                >
                                                    Đến màn hình đăng nhập
                                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Security Footer inside Card */}
                        <div className="mt-8 pt-4 border-t border-[#f1f5f9] flex flex-wrap items-center justify-between gap-3 text-xs text-[#515f74]">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-1.5 font-medium">
                                    <span className="material-symbols-outlined text-[16px] text-[#004a31]">security</span>
                                    <span>Chuẩn ISO/IEC 27001:2022</span>
                                </div>
                                <span className="text-[#cbd5e1]">|</span>
                                <div className="flex items-center gap-1.5 font-medium">
                                    <span className="material-symbols-outlined text-[16px] text-[#00236f]">token</span>
                                    <span>FIPS 140-3 Hardware Level</span>
                                </div>
                            </div>
                            <div className="font-medium">
                                Thời gian máy chủ: <span className="font-mono text-[#00236f] font-bold">{liveNtpTime || 'Đang kết nối...'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar (4 cols) */}
                    <div className="lg:col-span-4 space-y-5">
                        {/* Policy Card */}
                        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm relative overflow-hidden">
                            <div className="w-1.5 h-full absolute left-0 top-0 bg-[#00236f]" />
                            <div className="flex items-center gap-2 text-[#00236f] text-xs font-bold uppercase tracking-wider mb-3">
                                <span className="material-symbols-outlined text-[#00236f] text-[20px]">policy</span>
                                QUY ĐỊNH LIÊM CHÍNH HỌC THUẬT
                            </div>

                            <div className="bg-[#fffbeb] border border-[#fef3c7] p-3.5 rounded-xl mb-3.5">
                                <p className="text-xs text-[#92400e] leading-relaxed">
                                    <strong className="font-bold">Lưu ý nghiệp vụ cao điểm:</strong> Mọi yêu cầu đổi mật khẩu tài khoản Giảng viên trong khung giờ diễn ra ca thi trực tuyến sẽ được ghi lại tự động trong <strong>Nhật ký Kiểm toán (Audit Trail NTP)</strong> và thông báo trực tiếp đến Chủ tịch Hội đồng thi.
                                </p>
                            </div>

                            <p className="text-xs text-[#515f74] leading-relaxed mb-4">
                                Sau khi khôi phục thành công, phiên đăng nhập mới sẽ tự động kích hoạt tính năng kiểm tra thiết bị độc quyền <strong>Kiosk SafeExam Browser</strong> và yêu cầu cấu hình xác thực sinh trắc học lại từ đầu.
                            </p>

                            <div className="bg-[#f8faff] border border-[#e2e8f0] p-3 rounded-xl flex items-center justify-between text-xs text-[#515f74]">
                                <span>Trạng thái máy chủ SafeExam:</span>
                                <span className="text-[#004a31] font-bold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#004a31] animate-pulse" />
                                    HOẠT ĐỘNG
                                </span>
                            </div>
                        </div>

                        {/* Navigation Links Card */}
                        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm space-y-4">
                            <h3 className="text-xs font-bold text-[#00236f] uppercase tracking-wider">
                                Điều hướng truy cập
                            </h3>
                            <div className="space-y-2">
                                <Link
                                    href="/pages/teacher/auth"
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#eff4ff] text-[#0b1c30] hover:text-[#00236f] text-xs sm:text-sm font-semibold transition-all border border-transparent hover:border-[#d6e4ff] group"
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px] text-[#515f74] group-hover:text-[#00236f]">
                                            arrow_back
                                        </span>
                                        Quay lại Đăng nhập Giảng viên
                                    </span>
                                    <span className="material-symbols-outlined text-[16px] text-[#94a3b8] group-hover:text-[#00236f]">chevron_right</span>
                                </Link>

                                <Link
                                    href="/pages/student/auth/forgot-password"
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#eff4ff] text-[#0b1c30] hover:text-[#00236f] text-xs sm:text-sm font-semibold transition-all border border-transparent hover:border-[#d6e4ff] group"
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px] text-[#515f74] group-hover:text-[#00236f]">
                                            school
                                        </span>
                                        Khôi phục mật khẩu Thí sinh / SV
                                    </span>
                                    <span className="material-symbols-outlined text-[16px] text-[#94a3b8] group-hover:text-[#00236f]">arrow_forward</span>
                                </Link>
                            </div>

                            {/* Hotline Box */}
                            <div className="pt-2">
                                <div className="bg-[#eff4ff] border border-[#bfdbfe] p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-[#00236f] text-xs font-bold mb-1">
                                        <span className="material-symbols-outlined text-[18px]">emergency</span>
                                        Hội Đồng &amp; Giám Thị Khẩn Cấp
                                    </div>
                                    <p className="text-xs text-[#515f74] mb-3 leading-relaxed">
                                        Trường hợp khóa tài khoản đột xuất trong ca thi chính thức:
                                    </p>
                                    <a
                                        href="tel:19006886"
                                        className="flex items-center justify-between bg-[#00236f] hover:bg-[#1a3889] text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
                                    >
                                        <span>Ban Thư Ký Hội Đồng (Nhánh 2)</span>
                                        <span className="font-mono">1900 6886</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Root CA Certification */}
                        <div className="bg-[#f8faff] border border-[#e2e8f0] rounded-2xl p-5 shadow-xs">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white border border-[#cbd5e1] flex items-center justify-center text-[#00236f] shadow-xs">
                                    <span className="material-symbols-outlined text-[22px]">account_balance</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-[#0b1c30] uppercase">
                                        Hội Đồng Khảo Thí Quốc Gia
                                    </span>
                                    <span className="text-[11px] text-[#515f74]">
                                        Cổng Chứng thực Điện tử Bộ GD&amp;ĐT
                                    </span>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-[#e2e8f0] text-[#515f74] text-[11px] leading-relaxed">
                                Mã chứng chỉ số Root CA: <span className="font-mono text-[#00236f] font-semibold">VN-GOV-CA-EXAM-2024-ALPHA</span>. Hệ thống được bảo vệ bởi tường lửa ứng dụng web WAF chuyên dụng cho kỳ thi chuẩn quốc gia.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}