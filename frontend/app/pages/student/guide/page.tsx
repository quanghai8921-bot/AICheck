"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/StudentHeader';

export default function ExamGuidePage() {
    const router = useRouter();

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const handlePlaySim = () => {
        alert(
            "Đang mở luồng video mô phỏng hệ thống SafeExam 3.2 (Độ phân giải 1080p 60fps)..."
        );
    };

    const handleLaunchSandbox = () => {
        alert(
            "Khởi tạo phòng Sandbox Demo: Đang kiểm tra Webcam, Micro và môi trường trình duyệt cục bộ..."
        );
    };

    const faqData = [
        {
            question:
                "Nếu tôi lỡ tay bấm phím Windows hoặc chuyển tab thì có bị đình chỉ thi không?",
            answer:
                "Hệ thống SafeExam Browser có cơ chế chống trượt phím. Lần thứ 1 và 2 vô tình chuyển tab, hệ thống sẽ đưa ra cảnh báo toàn màn hình dạng vàng và ghi nhận vào biên bản số. Nếu vi phạm tới lần thứ 3 liên tiếp, bài thi sẽ tự động khóa và chuyển sang trạng thái chờ Giám thị trưởng xác minh.",
        },
        {
            question:
                "Làm sao để biết chắc chắn bài viết tự luận của tôi đã được lưu trên máy chủ?",
            answer:
                'Ở góc dưới bên phải màn hình soạn thảo luôn có thanh trạng thái vệ tinh: dấu chấm xanh lá kèm dòng chữ "Đã lưu đám mây lúc HH:MM:SS". Cứ mỗi 5 giây hoặc sau khi gõ xong 1 đoạn văn, bài thi sẽ được đồng bộ. Nếu mạng yếu, chấm xanh sẽ chuyển sang màu cam biểu thị "Đang lưu cục bộ bộ nhớ an toàn".',
        },
        {
            question:
                "Mã băm SHA-256 của bài thi dùng để làm gì sau khi kết thúc ca thi?",
            answer:
                "Mã băm SHA-256 là chuỗi ký tự độc bản đại diện cho toàn bộ nội dung bài viết và thời điểm nộp bài của bạn. Chuỗi này được lưu song song trên Cổng Khảo Thí Quốc Gia và gửi về email sinh viên. Nếu sau này có phúc khảo, hội đồng sẽ so sánh mã băm để chứng minh bài chấm hoàn toàn trùng khớp với bài bạn đã nộp, không thể bị chỉnh sửa hay can thiệp.",
        },
        {
            question:
                "Tôi có thể dùng 2 màn hình (Dual Monitors) để đọc đề 1 bên và viết 1 bên không?",
            answer:
                "KHÔNG ĐƯỢC PHÉP. SafeExam Client bắt buộc thí sinh chỉ được sử dụng 1 màn hình duy nhất. Mọi cổng xuất HDMI, DisplayPort hoặc thiết bị truyền không dây (AirPlay, Miracast) sẽ bị vô hiệu hóa hoặc kích hoạt còi báo động gian lận ngay khi mở đề thi.",
        },
    ];

    const filteredFaqs = faqData.filter(
        (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    router.push('/student/auth/login');
                }}
            />
            {/* Main Content Area */}
            <main className="w-full pt-16 bg-slate-50 flex-grow">
                <div className="flex flex-col w-full">
                    {/* Top Utility Sub-Header & Live Diagnostic Banner */}
                    <section className="w-full bg-slate-100/80 border-b border-slate-200 py-2 px-6 lg:px-12">
                        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
                            <div className="flex items-center gap-2 text-slate-600">
                                <a
                                    className="hover:text-blue-700 transition-colors flex items-center gap-1"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-[15px]">home</span>{" "}
                                    Trang chủ
                                </a>
                                <span>/</span>
                                <span className="text-blue-900 font-bold">Hướng Dẫn Thí Sinh</span>
                                <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-semibold border border-blue-200">
                                    Cập nhật: Kỳ I - 2025
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span>Máy chủ Khảo thí V-Cloud: Sẵn sàng 99.98%</span>
                                </div>
                                <div className="h-3 w-px bg-slate-300 hidden sm:block"></div>
                                <div className="hidden sm:flex items-center gap-1.5 text-slate-600">
                                    <span className="material-symbols-outlined text-[16px] text-blue-600">
                                        security_update_good
                                    </span>
                                    <span>SafeExam Client 3.2.4 Verified</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Editorial Hero & Fast Retrieval Section */}
                    <section className="relative w-full bg-white py-12 lg:py-16 px-6 lg:px-12 border-b border-slate-200 shadow-xs overflow-hidden">
                        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none"></div>
                        <div className="max-w-7xl mx-auto relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-8 flex flex-col gap-4">
                                    <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-100 text-xs font-bold">
                                        <span className="material-symbols-outlined text-[16px] text-blue-600">
                                            verified_user
                                        </span>
                                        <span>
                                            QUY TRÌNH CHUẨN HÓA CẤP QUỐC GIA THEO THÔNG TƯ 08/BGDĐT
                                        </span>
                                    </div>
                                    <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight">
                                        Hướng Dẫn Thí Sinh &amp; Quy Trình Tham Dự Kỳ Thi Trực Tuyến
                                    </h1>
                                    <p className="text-sm lg:text-base text-slate-600 max-w-3xl leading-relaxed">
                                        Bộ tài liệu quy chuẩn từng bước giúp ứng viên hoàn thiện cài
                                        đặt bảo mật Kiosk, định danh khuôn mặt AI, thích ứng môi trường
                                        soạn thảo học thuật chống gian lận và xác thực biên lai nộp
                                        bài mã băm SHA-256.
                                    </p>

                                    <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl">
                                        <div className="relative flex-1">
                                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                                search
                                            </span>
                                            <input
                                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 shadow-xs transition-all"
                                                placeholder="Tìm mã lỗi, quy chuẩn webcam, phím tắt SafeExam..."
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <a
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-all active:scale-[0.98]"
                                            href="#"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                download
                                            </span>
                                            <span>Tải Sổ Tay (PDF - 4.2 MB)</span>
                                        </a>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-600 font-medium">
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-blue-600 text-[16px]">
                                                timelapse
                                            </span>{" "}
                                            Thời gian chuẩn bị khuyến nghị: 45 phút
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-emerald-600 text-[16px]">
                                                fingerprint
                                            </span>{" "}
                                            Xác thực 2 lớp E-ID
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-blue-600 text-[16px]">
                                                cloud_sync
                                            </span>{" "}
                                            Tự động sao lưu bộ đệm 5s
                                        </span>
                                    </div>
                                </div>

                                <div className="lg:col-span-4 flex flex-col gap-3">
                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col gap-4 relative overflow-hidden">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                Hạ Tầng Giám Sát Ca Thi
                                            </span>
                                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                                                PROCTOR V3
                                            </span>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-extrabold text-blue-950 leading-none">
                                                100%
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                Mã hóa luồng dữ liệu E2EE
                                            </span>
                                        </div>
                                        <div className="space-y-3 pt-1 text-xs">
                                            <div>
                                                <div className="flex justify-between text-slate-700 mb-1">
                                                    <span>Chỉ số toàn vẹn bài viết</span>
                                                    <span className="font-bold text-blue-900">
                                                        SHA-256 Ledger
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                                                    <div className="w-full h-full bg-blue-600 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-slate-700 mb-1">
                                                    <span>Tần suất đồng bộ đám mây</span>
                                                    <span className="font-bold text-emerald-600">
                                                        5.0 giây/chu kỳ
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                                                    <div className="w-4/5 h-full bg-emerald-500 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-1 p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                                            <span className="material-symbols-outlined text-blue-600 text-[24px]">
                                                verified
                                            </span>
                                            <p className="text-[12px] text-slate-600 leading-snug">
                                                Được chuẩn hóa kiểm định theo tiêu chuẩn khảo thí quốc
                                                tế ISO/IEC 27001 và khung đánh giá NEAS.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Interactive 5-Step Core Examination Pipeline */}
                    <section className="w-full py-12 lg:py-16 px-6 lg:px-12 bg-slate-50">
                        <div className="max-w-7xl mx-auto flex flex-col gap-8">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <span className="text-xs text-blue-700 font-bold tracking-wider uppercase">
                                        Lộ Trình Kỳ Thi Chuẩn Hóa
                                    </span>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                                        Quy Trình 5 Bước Trước - Trong - Sau Khi Thi
                                    </h2>
                                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                                        Thực hiện tuần tự các bước nghiêm ngặt để đảm bảo quyền lợi
                                        và tính hợp lệ tuyệt đối của bài khảo thí.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 self-start md:self-auto text-xs">
                                    <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center gap-1.5 font-medium shadow-xs">
                                        <span className="material-symbols-outlined text-[16px] text-blue-600">
                                            info
                                        </span>
                                        Thời gian mở phòng thi: T - 30 Phút
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {/* Step 1 */}
                                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center font-bold text-base">
                                                01
                                            </div>
                                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-semibold">
                                                Trước 24 Giờ
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                                devices
                                            </span>
                                            <h3 className="font-bold text-sm text-slate-900">
                                                Chuẩn Bị Kỹ Thuật
                                            </h3>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Cài đặt phần mềm{" "}
                                            <strong className="text-slate-900">
                                                SafeExam Browser v3.2
                                            </strong>
                                            . Kiểm tra góc quay webcam rõ mặt, micro thu âm trong trẻo
                                            không dùng bộ lọc tạp âm giả lập.
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 bg-slate-50 border-t border-slate-100 p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-600">
                                        <span>Băng thông tối thiểu</span>
                                        <span className="font-bold text-blue-700">≥ 15 Mbps</span>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center font-bold text-base">
                                                02
                                            </div>
                                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-bold">
                                                T - 30 Phút
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                                face
                                            </span>
                                            <h3 className="font-bold text-sm text-slate-900">
                                                Sinh Trắc Học AI
                                            </h3>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Định danh sinh trắc học qua camera AI. Cầm sẵn CCCD/Thẻ
                                            sinh viên khớp thông tin. Cấp quyền trọn vẹn màn hình và môi
                                            trường âm thanh.
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 bg-slate-50 border-t border-slate-100 p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-600">
                                        <span>Độ chính xác AI</span>
                                        <span className="font-bold text-emerald-600">
                                            99.4% Khớp ID
                                        </span>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center font-bold text-base">
                                                03
                                            </div>
                                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-bold">
                                                T - 10 Phút
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                                key
                                            </span>
                                            <h3 className="font-bold text-sm text-slate-900">
                                                Nhập Passcode Ca Thi
                                            </h3>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Sử dụng email sinh viên chuẩn trường để đăng nhập. Vào mục{" "}
                                            <span className="text-slate-900 font-semibold">
                                                Danh Sách Hôm Nay
                                            </span>{" "}
                                            và nhập mã PIN gồm 6 số do Giám thị 1 công bố.
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 bg-slate-50 border-t border-slate-100 p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-600">
                                        <span>Hiệu lực PIN</span>
                                        <span className="font-bold text-red-600">Hết hạn sau 5m</span>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base">
                                                04
                                            </div>
                                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-xs font-bold">
                                                Giờ Làm Bài
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                                edit_note
                                            </span>
                                            <h3 className="font-bold text-sm text-slate-900">
                                                Làm Bài Viết Số Hóa
                                            </h3>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Soạn thảo văn bản học thuật trên khung editor không phân
                                            tâm. Cấm tuyệt đối thao tác đổi tab, chia đôi màn hình hoặc
                                            kích hoạt ứng dụng ngầm.
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 bg-slate-50 border-t border-slate-100 p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-600">
                                        <span>Tự lưu bài</span>
                                        <span className="font-bold text-emerald-600">
                                            Lưu mỗi 5 giây
                                        </span>
                                    </div>
                                </div>

                                {/* Step 5 */}
                                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-base">
                                                05
                                            </div>
                                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                                                Kết Thúc Ca
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-blue-600 text-[20px]">
                                                token
                                            </span>
                                            <h3 className="font-bold text-sm text-slate-900">
                                                Nộp &amp; Ký Băm SHA-256
                                            </h3>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Xác thực OTP 2 bước để nộp bài. Hệ thống tạo khóa băm
                                            SHA-256 điện tử có đóng dấu thời gian (Timestamp) chống
                                            giả mạo điểm số.
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 bg-slate-50 border-t border-slate-100 p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-600">
                                        <span>Biên lai số</span>
                                        <span className="font-bold text-blue-700">
                                            Tải PDF &amp; Mã QR
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Technical Specification Matrix */}
                    <section className="w-full py-12 lg:py-16 px-6 lg:px-12 bg-white border-y border-slate-200">
                        <div className="max-w-7xl mx-auto flex flex-col gap-8">
                            <div className="flex flex-col max-w-3xl">
                                <span className="text-xs text-blue-700 font-bold uppercase tracking-wider">
                                    Tiêu Chuẩn Giám Sát Khắt Khe
                                </span>
                                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                                    Ma Trận Yêu Cầu Kỹ Thuật &amp; Môi Trường Phòng Thi
                                </h2>
                                <p className="text-xs md:text-sm text-slate-600 mt-1">
                                    Bảng kiểm tra tính hợp chuẩn của thiết bị và không gian làm
                                    bài thi. Bất kỳ vi phạm nào đều bị hệ thống phát hiện và hủy tư
                                    cách dự thi tự động.
                                </p>
                            </div>

                            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="bg-slate-100 text-slate-900 font-bold">
                                            <th className="py-3.5 px-6 w-1/4 border-b border-slate-200">Hạng Mục Đánh Giá</th>
                                            <th className="py-3.5 px-6 w-5/12 text-emerald-800 font-bold border-b border-slate-200">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                                                        check_circle
                                                    </span>
                                                    <span>ĐẠT CHUẨN (Hợp Lệ Được Phép)</span>
                                                </div>
                                            </th>
                                            <th className="py-3.5 px-6 w-5/12 text-red-700 font-bold border-b border-slate-200">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-red-600 text-[18px]">
                                                        cancel
                                                    </span>
                                                    <span>KHÔNG HỢP LỆ (Bị Hệ Thống Chặn)</span>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 bg-white">
                                        <tr className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-900">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-blue-600 text-[18px]">
                                                        laptop_chromebook
                                                    </span>
                                                    <span>Thiết bị làm bài</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-slate-600">
                                                Laptop hoặc Máy tính để bàn (PC) có webcam tích hợp hoặc
                                                cắm rời độ phân giải tối thiểu 720p HD. Được phép dùng
                                                chuột và bàn phím vật lý rời.
                                            </td>
                                            <td className="py-4 px-6 text-red-600">
                                                Điện thoại thông minh, máy tính bảng (iPad, Galaxy
                                                Tab...), máy tính mini Raspberry Pi, hoặc máy chạy máy
                                                ảo (VirtualBox, VMware).
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-900">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-blue-600 text-[18px]">
                                                        public
                                                    </span>
                                                    <span>Trình duyệt &amp; Phần mềm</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-slate-600">
                                                Google Chrome/Microsoft Edge phiên bản mới nhất kết hợp
                                                với bộ điều phối{" "}
                                                <strong className="text-slate-900">
                                                    SafeExam Kiosk Client 3.2.4
                                                </strong>{" "}
                                                đã tắt hết thông báo.
                                            </td>
                                            <td className="py-4 px-6 text-red-600">
                                                Mở tab ẩn danh (Incognito), trình duyệt có bật extension
                                                chặn quảng cáo, phần mềm dịch văn bản tự động,
                                                TeamViewer, UltraViewer, Discord, Zalo desktop.
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-900">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-blue-600 text-[18px]">
                                                        room_preferences
                                                    </span>
                                                    <span>Không gian &amp; Ánh sáng</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-slate-600">
                                                Phòng khép kín, yên tĩnh tuyệt đối, cửa phòng đóng. Đèn
                                                chiếu sáng trực diện vào khuôn mặt thí sinh, phông nền
                                                phía sau gọn gàng, không có người qua lại.
                                            </td>
                                            <td className="py-4 px-6 text-red-600">
                                                Quán cà phê, thư viện mở, không gian công cộng. Ngồi
                                                ngược sáng (quay lưng vào cửa sổ chói), phòng có bóng
                                                người xuất hiện trong phạm vi camera.
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-900">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-blue-600 text-[18px]">
                                                        headset_mic
                                                    </span>
                                                    <span>Âm thanh &amp; Phụ kiện</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-slate-600">
                                                Chỉ sử dụng loa và microphone tích hợp của máy hoặc tai
                                                nghe có dây chân 3.5mm/USB đơn giản không micro che mặt.
                                                Giữ âm lượng hệ thống ở mức 80%.
                                            </td>
                                            <td className="py-4 px-6 text-red-600">
                                                Tai nghe Bluetooth không dây cỡ lớn (trùm đầu), tai nghe
                                                hạt đậu gián điệp, thiết bị trợ thính không đăng ký
                                                trước, mở nhạc nền hoặc podcast.
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-900">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-blue-600 text-[18px]">
                                                        wifi
                                                    </span>
                                                    <span>Kết nối mạng &amp; Nguồn</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-slate-600">
                                                Cáp mạng LAN hoặc Wi-Fi 5GHz ổn định, Ping máy chủ &lt;
                                                35ms. Thiết bị cắm sạc nguồn trực tiếp suốt thời gian thi
                                                (không dùng pin độc lập).
                                            </td>
                                            <td className="py-4 px-6 text-red-600">
                                                Kết nối thông qua VPN công cộng, mạng proxy qua trung
                                                gian, phát Wi-Fi 4G/5G bằng điện thoại có nguy cơ ngắt
                                                sóng khi có cuộc gọi đến.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-700 text-[22px]">
                                        gavel
                                    </span>
                                    <p className="text-xs text-slate-600">
                                        <strong className="text-slate-900">Lưu ý pháp lý:</strong>{" "}
                                        Gian lận thi trực tuyến sẽ bị xử lý kỷ luật theo Điều 14
                                        Quy chế Khảo thí và gửi thông báo chính thức về trường đại
                                        học chủ quản.
                                    </p>
                                </div>
                                <a
                                    className="text-xs text-blue-700 font-bold hover:underline shrink-0"
                                    href="#"
                                >
                                    Xem chi tiết Quy chế thi →
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Emergency Troubleshooting Grid */}
                    <section className="w-full py-12 lg:py-16 px-6 lg:px-12 bg-slate-50">
                        <div className="max-w-7xl mx-auto flex flex-col gap-8">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <span className="text-xs text-red-600 font-bold tracking-wider uppercase">
                                        Giao Thức Xử Lý Khẩn Cấp
                                    </span>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                                        Quy Trình Xử Lý Khi Gặp Sự Cố Kỹ Thuật Đột Ngột
                                    </h2>
                                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                                        Hệ thống khảo thí tích hợp cơ chế dự phòng bảo vệ quyền
                                        lợi bài thi của thí sinh trong mọi tình huống rủi ro hạ
                                        tầng.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="px-3 py-1.5 rounded-lg bg-red-100 text-red-800 font-bold border border-red-200">
                                        Hotline Phòng Thi: 1900 6886 (Nhánh 1)
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                                    <div className="flex flex-col gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[26px]">
                                                wifi_off
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-base text-slate-900">
                                            Mất Mạng Internet Đột Ngột
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Kỳ thi KHÔNG bị ngắt ngay lập tức. Tính năng{" "}
                                            <strong className="text-slate-900">
                                                Offline-First Cache
                                            </strong>{" "}
                                            tự động lưu toàn bộ câu chữ vào bộ nhớ mã hóa cục bộ của
                                            trình duyệt.
                                        </p>
                                        <div className="mt-2 space-y-2 text-xs text-slate-600">
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">
                                                    check_circle
                                                </span>
                                                <span>
                                                    Tiếp tục gõ bài bình thường, không F5/tải lại trang.
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">
                                                    check_circle
                                                </span>
                                                <span>
                                                    Đồng hồ đếm ngược được khóa lưu vết chính xác.
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">
                                                    check_circle
                                                </span>
                                                <span>
                                                    Hệ thống tự động đồng bộ lên đám mây khi có lại mạng
                                                    trong vòng 5 phút.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-3 bg-slate-50 border-t border-slate-100 p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-600">
                                        <span>Thời hạn kết nối lại</span>
                                        <span className="font-bold text-blue-700">Tối đa 5 phút</span>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                                    <div className="flex flex-col gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[26px]">
                                                no_photography
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-base text-slate-900">
                                            Mất Tín Hiệu Camera/Micro
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Màn hình giám sát phía Hội đồng sẽ cảnh báo màu vàng. Thí
                                            sinh cần giữ bình tĩnh và thực hiện đúng thủ tục thông
                                            báo hỗ trợ tức thời.
                                        </p>
                                        <div className="mt-2 space-y-2 text-xs text-slate-600">
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">
                                                    chat
                                                </span>
                                                <span>
                                                    Bấm nút{" "}
                                                    <strong className="text-slate-900">
                                                        "Chat Với Giám Thị"
                                                    </strong>{" "}
                                                    tại góc phải màn hình thi.
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">
                                                    phone_in_talk
                                                </span>
                                                <span>
                                                    Nếu mất kết nối SafeExam, gọi đường dây nóng 1900 6886
                                                    nhấn nhánh 1.
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">
                                                    photo_camera
                                                </span>
                                                <span>
                                                    Chụp ảnh màn hình điện thoại có rõ thời gian và mã
                                                    lỗi để làm minh chứng.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-3 bg-slate-50 border-t border-slate-100 p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-600">
                                        <span>Kênh hỗ trợ</span>
                                        <span className="font-bold text-emerald-600">
                                            Chat Nội Bộ SafeExam
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                                    <div className="flex flex-col gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[26px]">
                                                vpn_key_alert
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-base text-slate-900">
                                            Sai Passcode / Sai Mã Đề
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Trường hợp nhập mã PIN bị báo hết hạn hoặc đề thi hiển
                                            thị không đúng với học phần đăng ký của kỳ học hiện tại.
                                        </p>
                                        <div className="mt-2 space-y-2 text-xs text-slate-600">
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">
                                                    contact_support
                                                </span>
                                                <span>
                                                    Báo ngay cho Giám thị 2 qua micro hoặc khung hội
                                                    đồng số.
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">
                                                    pin
                                                </span>
                                                <span>
                                                    Hội đồng khảo thí sẽ kích hoạt mã PIN dự phòng thứ
                                                    cấp (Secondary PIN).
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">
                                                    history
                                                </span>
                                                <span>
                                                    Thời gian thi sẽ được bù tương ứng số phút chờ xử lý
                                                    cấp mã mới.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-3 bg-slate-50 border-t border-slate-100 p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-600">
                                        <span>Chính sách bù giờ</span>
                                        <span className="font-bold text-blue-700">
                                            Cộng bù 100% thời gian
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Simulation & Sandbox Center */}
                    <section className="w-full py-12 lg:py-16 px-6 lg:px-12 bg-white border-y border-slate-200">
                        <div className="max-w-7xl mx-auto flex flex-col gap-8">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-7 flex flex-col gap-3">
                                    <div className="relative rounded-2xl overflow-hidden bg-blue-900 shadow-xl group border border-slate-200">
                                        <div
                                            className="w-full h-80 lg:h-96 bg-cover bg-center opacity-85 transition-transform duration-500 group-hover:scale-105"
                                            style={{
                                                backgroundImage:
                                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGBU6LFsCQWwPa-HyqCHJEC9-gLeYue3iTUHpGh5FZ11xt6272yejiN1x8K2lxLmSLoBgsaUTtcqF8BOSLW-6BtrnS6f4Oeu8q_SfFwPkF8zlT-7cSjtnmomdFvvZJflOe4KIwaw2jxazFQqpubSeDCUHDO1Ze6PlTCho-ZlHN3jHaFF7U8pB-DxCfCKMU7e6KFnrWnH8NmZVapZgd-eq58MjBLwqCgDlFiLjD3tF3lExwqlbeaJEW5Q')",
                                            }}
                                        ></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-950/40 to-transparent flex flex-col justify-between p-6">
                                            <div className="flex items-center justify-between">
                                                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-blue-900 text-xs font-bold">
                                                    VIDEO MÔ PHỎNG PHÒNG THI CHUẨN
                                                </span>
                                                <span className="px-2.5 py-1 rounded-md bg-slate-900/80 text-white font-mono text-xs">
                                                    03:45
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    aria-label="Phát video hướng dẫn"
                                                    className="w-14 h-14 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                                                    onClick={handlePlaySim}
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined text-[32px] ml-1">
                                                        play_arrow
                                                    </span>
                                                </button>
                                                <div className="text-white">
                                                    <h4 className="font-bold text-base">
                                                        Làm Quen Với Giao Diện Thi Viết 3 Phút
                                                    </h4>
                                                    <p className="text-xs text-blue-200">
                                                        Hướng dẫn cách canh lề, theo dõi bộ đếm chữ và ký
                                                        nộp số
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-5 flex flex-col gap-4 p-6 lg:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[24px]">
                                            science
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-900">
                                        Làm Bài Thi Thử Nghiệm (Sandbox Demo)
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Mở phiên thi giả lập không tính điểm để kiểm tra toàn diện
                                        webcam, microphone, tốc độ phản hồi bàn phím và khả năng
                                        tương thích của SafeExam trước giờ thi thật.
                                    </p>
                                    <div className="space-y-2 py-1 text-xs text-slate-700">
                                        <div className="flex items-center gap-2.5">
                                            <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                                                check_circle
                                            </span>
                                            <span>Kiểm tra phát hiện khuôn mặt AI thời gian thực</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                                                check_circle
                                            </span>
                                            <span>Thử nghiệm ngắt mạng giả định xem cơ chế lưu 5s</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                                                check_circle
                                            </span>
                                            <span>Trải nghiệm ký nộp biên nhận mã băm SHA-256</span>
                                        </div>
                                    </div>
                                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                        <button
                                            className="flex-1 py-3 px-5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                            onClick={handleLaunchSandbox}
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                play_circle
                                            </span>
                                            <span>Khởi Chạy Sandbox</span>
                                        </button>
                                        <button
                                            className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                help_outline
                                            </span>
                                            <span>Hỏi Đáp FAQ</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Interactive FAQs Accordion */}
                    <section className="w-full py-12 lg:py-16 px-6 lg:px-12 bg-slate-50">
                        <div className="max-w-4xl mx-auto flex flex-col gap-8">
                            <div className="text-center">
                                <span className="text-xs text-blue-700 font-bold uppercase tracking-wider">
                                    Giải Đáp Thắc Mắc Kỹ Thuật
                                </span>
                                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                                    Câu Hỏi Thường Gặp Về Quy Trình Khảo Thí
                                </h2>
                                <p className="text-xs md:text-sm text-slate-600 mt-1">
                                    Những vấn đề thí sinh hay gặp phải trong quá trình làm bài và
                                    nộp bài
                                </p>
                            </div>

                            <div className="space-y-3">
                                {filteredFaqs.map((faq, index) => {
                                    const isOpen = openFaqIndex === index;
                                    return (
                                        <div
                                            key={index}
                                            className="rounded-xl bg-white border border-slate-200 shadow-xs overflow-hidden"
                                        >
                                            <button
                                                className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                                                onClick={() => toggleFaq(index)}
                                                type="button"
                                            >
                                                <span>{faq.question}</span>
                                                <span
                                                    className={`material-symbols-outlined text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                        }`}
                                                >
                                                    expand_more
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 pb-4 pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Persistent Emergency Assistance Ribbon */}
                    <section className="w-full bg-blue-900 text-white py-4 px-6 lg:px-12 shadow-md">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        headset_mic
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">
                                        Cần Trợ Giúp Khẩn Cấp Trong Phòng Thi?
                                    </h4>
                                    <p className="text-xs text-blue-200">
                                        Đội ngũ kỹ thuật trực ban 24/7 phản hồi trong vòng dưới 30
                                        giây đối với mọi sự cố phòng thi.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    className="px-4 py-2 rounded-xl bg-white text-blue-900 text-xs font-bold shadow-xs hover:bg-blue-50 transition-colors flex items-center gap-2"
                                    href="tel:19006886"
                                >
                                    <span className="material-symbols-outlined text-[16px]">
                                        call
                                    </span>
                                    <span>1900 6886 (Nhánh 1)</span>
                                </a>
                                <button
                                    className="px-4 py-2 rounded-xl bg-blue-800 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                                    onClick={() =>
                                        alert(
                                            "Kết nối kênh giám thị hỗ trợ kỹ thuật viên ca thi..."
                                        )
                                    }
                                    type="button"
                                >
                                    Kênh Trực Tuyến
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-white border-t border-slate-200 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
                        <div className="md:col-span-2 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-[18px]">
                                        verified
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-blue-900">
                                    TRUNG TÂM KHẢO THÍ QUỐC GIA
                                </span>
                            </div>
                            <p className="text-slate-500 max-w-md leading-relaxed">
                                Đơn vị chịu trách nhiệm tổ chức, giám sát và kiểm định chuẩn mực
                                đánh giá năng lực học thuật trực tuyến theo chuẩn kiểm định chất
                                lượng giáo dục đại học.
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                                    <span className="material-symbols-outlined text-[16px] text-emerald-600">
                                        shield
                                    </span>{" "}
                                    ISO/IEC 27001:2022
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                                    <span className="material-symbols-outlined text-[16px] text-blue-600">
                                        lock
                                    </span>{" "}
                                    ISO/IEC 25010
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                                    <span className="material-symbols-outlined text-[16px] text-indigo-600">
                                        award_star
                                    </span>{" "}
                                    NEAS Accredited
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-slate-900 text-sm">
                                Hỗ Trợ Thí Sinh
                            </span>
                            <a
                                className="text-slate-500 hover:text-blue-700 transition-colors"
                                href="#"
                            >
                                Quy trình đăng ký ca thi
                            </a>
                            <a
                                className="text-slate-500 hover:text-blue-700 transition-colors"
                                href="#"
                            >
                                Quy chế phòng thi số
                            </a>
                            <a
                                className="text-slate-500 hover:text-blue-700 transition-colors"
                                href="#"
                            >
                                Kiểm tra thiết bị &amp; đường truyền
                            </a>
                            <a
                                className="text-slate-500 hover:text-blue-700 transition-colors"
                                href="#"
                            >
                                Phúc khảo bài thi
                            </a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-slate-900 text-sm">
                                Liên Hệ Thường Trực
                            </span>
                            <p className="text-slate-500">
                                Tòa nhà Khảo thí Quốc gia, Ba Đình, Hà Nội
                            </p>
                            <p className="text-slate-800 font-bold">Hotline: 1900 6886</p>
                            <p className="text-slate-500">Email: support.khaothi@edu.vn</p>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                        <p>
                            © 2026 Bản quyền thuộc Cục Khảo Thí &amp; Đảm Bảo Chất Lượng Giáo
                            Dục.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                className="hover:text-slate-800 transition-colors"
                                href="#"
                            >
                                Chính sách bảo mật dữ liệu
                            </a>
                            <a
                                className="hover:text-slate-800 transition-colors"
                                href="#"
                            >
                                Điều khoản khảo thí
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}