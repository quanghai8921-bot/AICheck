"use client";
import React, { useState } from 'react';

// Interface cho câu hỏi FAQ
interface FaqItem {
    id: number;
    question: string;
    answer: string;
    icon: string;
}

export default function AcademicExamSupportPolicy() {
    // React State tương tác
    const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
    const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
    const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
    const [toast, setToast] = useState<{ show: boolean; message: string }>({
        show: false,
        message: '',
    });

    // Tải thông báo Toast
    const triggerToast = (message: string) => {
        setToast({ show: true, message });
        setTimeout(() => {
            setToast({ show: false, message: '' });
        }, 3500);
    };

    // Toggle FAQ Accordion
    const toggleFaq = (index: number) => {
        setActiveFaqIndex(activeFaqIndex === index ? null : index);
    };

    // Danh sách FAQ mẫu
    const faqList: FaqItem[] = [
        {
            id: 1,
            question: 'Xử lý thế nào khi sinh viên mất kết nối mạng quá 5 phút trong phòng thi viết?',
            answer:
                'Hệ thống Local Sandbox trên trình duyệt thí sinh vẫn lưu bài viết cục bộ (Local IndexedDB mã hóa AES-256). Nếu mất mạng dưới 10 phút, thí sinh kết nối lại hệ thống tự đồng bộ lên máy chủ trung tâm. Nếu mất kết nối quá 10 phút, giám thị yêu cầu chuyển sang thiết bị 4G dự phòng hoặc lập Mẫu 01-BB/KT để chuyển sang ca thi phụ.',
            icon: 'wifi_off',
        },
        {
            id: 2,
            question: 'Cách xử lý khi điểm số Perplexity dưới 25 và Burstiness dưới 0.20?',
            answer:
                'Đây là chỉ dấu điển hình của văn bản do mô hình ngôn ngữ lớn (LLM) sinh ra. Giảng viên KHÔNG tự ý cho điểm 0 ngay, mà thực hiện gắn cờ "Xem xét liêm chính" (Flagged for Integrity Review), đồng thời lưu vết Keylogger Telemetry và gửi thông báo triệu tập đối chất vấn đáp trong vòng 48 giờ.',
            icon: 'psychology_alt',
        },
        {
            id: 3,
            question: 'Quy trình phúc khảo bài thi viết tự luận trực tuyến diễn ra trong bao lâu?',
            answer:
                'Thời gian tiếp nhận đơn phúc khảo số hóa là 07 ngày làm việc kể từ ngày công bố điểm. Hội đồng chấm phúc khảo gồm 02 giảng viên độc lập xem lại bản ghi snapshot bài thi kèm video giám sát. Kết quả xử lý công bố trong 05 ngày làm việc.',
            icon: 'pending_actions',
        },
        {
            id: 4,
            question: 'Thiết lập lại mã passcode ca thi khi nghi ngờ rò rỉ mã phòng thi?',
            answer:
                'Giảng viên vào mục "Lịch coi thi & giám sát" > Chọn phòng thi tương ứng > Nhấn "Tạo lại mã PIN khẩn cấp". Hệ thống sẽ lập tức gửi OTP mã mới tới email sinh viên trong phòng và đẩy thông báo popup lên máy trạm đang mở đề thi.',
            icon: 'key',
        },
    ];

    return (
        <div className="bg-slate-50 font-sans text-slate-900 antialiased min-h-screen flex flex-col">
            <div className="flex flex-1">
                {/* Main Workspace */}
                <main className="flex-1 w-full px-6 bg-slate-50 pb-6 pt-6">
                    <div className="flex flex-col w-full">
                        {/* Top Breadcrumbs & Identity Strip */}
                        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4">
                            <div className="flex flex-col gap-1">
                                <nav className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                                    <a className="hover:text-blue-900 transition-colors flex items-center gap-1" href="#">
                                        <span className="material-symbols-outlined text-[16px]">home</span>
                                        Trang chủ
                                    </a>
                                    <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
                                    <span className="text-slate-500">Tiện ích &amp; khảo thí</span>
                                    <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
                                    <span className="text-blue-900 font-semibold">Hỗ trợ &amp; Quy chế khảo thí</span>
                                </nav>
                                <div className="flex items-center gap-3 mt-1">
                                    <h1 className="text-2xl text-slate-900 font-bold tracking-tight">
                                        Hỗ Trợ Kỹ Thuật &amp; Quy Chế Khảo Thí Học Thuật
                                    </h1>
                                    <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold">
                                        Kỳ thi HK2 • 2024–2025
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 max-w-4xl">
                                    Văn bản pháp lý, quy chế thi viết trực tuyến của Bộ GD&amp;ĐT, cẩm nang chấm thi liêm chính AI và kênh liên hệ trực tiếp Hội đồng Khảo thí &amp; Đảm bảo chất lượng giáo dục dành cho giảng viên TS. Lê Quang Mai.
                                </p>
                            </div>

                            {/* Quick Meta Chips */}
                            <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
                                <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs border border-slate-200">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                    <span>Pháp lý hiệu lực: QĐ 882/BGDĐT</span>
                                </div>
                                <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1 shadow-xs border border-slate-200">
                                    <span className="material-symbols-outlined text-[16px] text-blue-900">verified_user</span>
                                    <span>Ký số SHA-256</span>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Support Banner / Command Hub */}
                        <div className="relative w-full rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white p-6 shadow-xl overflow-hidden mb-6">
                            <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                                <div className="flex flex-col gap-2 max-w-3xl">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs uppercase tracking-wider font-bold border border-emerald-800">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                            Đường dây nóng Hội đồng Khảo thí &amp; Thanh tra Đào tạo
                                        </span>
                                        <span className="text-blue-200 text-xs font-semibold">Ca trực thi cao điểm 24/7</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 mt-1">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-emerald-400 text-[36px]">support_agent</span>
                                            <span className="font-mono text-3xl font-extrabold tracking-wider text-white">1900 6886</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-blue-100 text-xs font-semibold">
                                            <span className="flex items-center gap-1">
                                                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-[11px]">1</span>
                                                Kỹ thuật phòng thi viết &amp; autosave
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-[11px]">2</span>
                                                Xử lý vi phạm quy chế &amp; đình chỉ
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-blue-100 mt-1">
                                        Kỹ sư điều phối hệ sinh thái khảo thí (NTP Timekeeper, WebSocket Heartbeat &amp; AI Stylometry Proctoring) sẵn sàng phản ứng trong vòng 60 giây khi có yêu cầu hỗ trợ từ giám thị / giảng viên coi thi.
                                    </p>
                                </div>

                                {/* Action Buttons in Banner */}
                                <div className="flex flex-col sm:flex-row items-stretch xl:items-center gap-2 w-full xl:w-auto">
                                    <button
                                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 text-slate-950 text-sm font-bold shadow-md hover:bg-emerald-300 transition-all active:scale-98"
                                        type="button"
                                        onClick={() => setIsLiveChatOpen(true)}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">forum</span>
                                        Mở chat trực tiếp Hội đồng Đề thi
                                    </button>
                                    <button
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/15 backdrop-blur-md text-white hover:bg-white/25 text-sm font-semibold transition-all shadow-sm border border-white/10"
                                        type="button"
                                        onClick={() => setIsIncidentModalOpen(true)}
                                    >
                                        <span className="material-symbols-outlined text-[20px] text-red-300">warning</span>
                                        Báo cáo sự cố khẩn cấp
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Real-time Exam Telemetry Micro-Bar */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-blue-900 flex-shrink-0">
                                    <span className="material-symbols-outlined text-[26px]">network_ping</span>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs text-slate-500 uppercase font-semibold">Đồng bộ máy chủ NTP</span>
                                    <span className="text-lg text-slate-900 font-bold truncate">09:42:15.820</span>
                                    <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Sai số ±1.4ms
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-blue-900 flex-shrink-0">
                                    <span className="material-symbols-outlined text-[26px]">lock_clock</span>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs text-slate-500 uppercase font-semibold">Băm bài thi SHA-256</span>
                                    <span className="text-lg text-slate-900 font-bold truncate">1,420 Bài Đã Ký</span>
                                    <span className="text-xs text-slate-500">Toàn vẹn 100% dữ liệu</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-blue-900 flex-shrink-0">
                                    <span className="material-symbols-outlined text-[26px]">psychology</span>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs text-slate-500 uppercase font-semibold">Giám định Stylometry</span>
                                    <span className="text-lg text-slate-900 font-bold truncate">Active Engine v4.2</span>
                                    <span className="text-xs text-slate-500">Theo dõi nhịp gõ 45 ca</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-blue-900 flex-shrink-0">
                                    <span className="material-symbols-outlined text-[26px]">gavel</span>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs text-slate-500 uppercase font-semibold">Biên bản điện tử</span>
                                    <span className="text-lg text-slate-900 font-bold truncate">02 Ca Vi Phạm</span>
                                    <span className="text-xs text-red-600 font-semibold">Cần Trưởng ban duyệt</span>
                                </div>
                            </div>
                        </div>

                        {/* Main 4 Operational Pillars Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Pillar 1 */}
                            <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                                <div className="flex flex-col">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-sm">
                                                <span className="material-symbols-outlined text-[22px]">policy</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Khung pháp lý số 01</span>
                                                <h2 className="text-lg text-slate-900 font-bold">Quy Chế &amp; Thông Tư Khảo Thí Trực Tuyến</h2>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-slate-100 text-blue-900 text-xs font-semibold">
                                            Bắt buộc áp dụng
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4">
                                        Các quy chuẩn tổ chức đánh giá quá trình và thi kết thúc học phần tự luận trực tuyến được Hội đồng Khoa học &amp; Đào tạo chuẩn hóa theo Thông tư Bộ GD&amp;ĐT.
                                    </p>

                                    <div className="flex flex-col gap-3 mb-6">
                                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                                            <span className="material-symbols-outlined text-blue-900 text-[20px] mt-0.5">description</span>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-slate-900 font-semibold">Thông tư tổ chức thi trực tuyến &amp; đánh giá năng lực</span>
                                                <span className="text-xs text-slate-500">Quy định điều kiện thiết bị, hai góc camera giám sát, kiểm soát âm thanh môi trường và bảo lưu kết quả bài thi.</span>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                                            <span className="material-symbols-outlined text-blue-900 text-[20px] mt-0.5">shield_person</span>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-slate-900 font-semibold">Thẩm quyền lập biên bản đình chỉ thi gian lận công nghệ</span>
                                                <span className="text-xs text-slate-500">Quy định quyền hạn của giảng viên coi thi khi ghi nhận hành vi chia sẻ màn hình, dùng thiết bị ngoại vi hoặc trợ lý ảo.</span>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                                            <span className="material-symbols-outlined text-blue-900 text-[20px] mt-0.5">enhanced_encryption</span>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-slate-900 font-semibold">Quy trình khóa mã băm SHA-256 &amp; ký số giảng viên</span>
                                                <span className="text-xs text-slate-500">Niêm phong số hóa ngay khi kết thúc giờ làm bài. Mọi chỉnh sửa hậu kiểm đều bị coi là can thiệp trái phép.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-slate-100 text-slate-900 mb-4 border border-slate-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs uppercase font-bold text-slate-500">Tóm lược quy trình số hóa 5 bước</span>
                                            <span className="text-xs text-blue-900 font-semibold">Chuẩn khảo thí ISO/IEC</span>
                                        </div>
                                        <div className="grid grid-cols-5 gap-1 text-center text-[11px]">
                                            <div className="p-1 rounded bg-white text-blue-900 font-bold shadow-xs">1. Xác thực ID</div>
                                            <div className="p-1 rounded bg-white text-blue-900 font-bold shadow-xs">2. Khóa Sandbox</div>
                                            <div className="p-1 rounded bg-white text-blue-900 font-bold shadow-xs">3. Ghi Telemetry</div>
                                            <div className="p-1 rounded bg-white text-blue-900 font-bold shadow-xs">4. Băm SHA-256</div>
                                            <div className="p-1 rounded bg-blue-900 text-white font-bold shadow-xs">5. Ký số GV</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 pt-2">
                                    <a
                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-900 text-white hover:bg-blue-950 text-xs font-semibold shadow-sm transition-all"
                                        href="#"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                                        Tải văn bản PDF có dấu đỏ (3.4 MB)
                                    </a>
                                    <button
                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-semibold transition-all"
                                        type="button"
                                        onClick={() => triggerToast('Đang mở văn bản tóm lược quy trình số hóa 5 bước (PDF Viewer).')}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">quick_reference_all</span>
                                        Xem tóm lược quy trình 5 bước
                                    </button>
                                </div>
                            </div>

                            {/* Pillar 2 */}
                            <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                                <div className="flex flex-col">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-sm">
                                                <span className="material-symbols-outlined text-[22px]">fingerprint</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Giám định khoa học số 02</span>
                                                <h2 className="text-lg text-slate-900 font-bold">Cẩm Nang Đánh Giá Liêm Chính AI</h2>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
                                            AI Engine v4.2
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4">
                                        Khung thẩm định khoa học hỗ trợ giảng viên đọc và phân tích 3 chỉ số cốt lõi từ hệ thống AI Proctoring, ngăn chặn suy diễn chủ quan khi đánh giá văn bản nghi vấn.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-blue-900 font-bold">Stylometry</span>
                                                <span className="material-symbols-outlined text-[18px] text-slate-400">keyboard</span>
                                            </div>
                                            <span className="text-sm text-slate-900 font-bold">Gõ &amp; Nhịp Điệu</span>
                                            <span className="text-[12px] text-slate-500 mt-1">Đo gia tốc phím, tần suất xóa ngược và độ dài khoảng dừng.</span>
                                        </div>

                                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-blue-900 font-bold">Perplexity</span>
                                                <span className="material-symbols-outlined text-[18px] text-slate-400">calculate</span>
                                            </div>
                                            <span className="text-sm text-slate-900 font-bold">Độ Bất Ngờ Từ</span>
                                            <span className="text-[12px] text-slate-500 mt-1">Văn bản LLM tạo ra có Perplexity rất thấp (&lt; 25), từ vựng phẳng.</span>
                                        </div>

                                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-blue-900 font-bold">Burstiness</span>
                                                <span className="material-symbols-outlined text-[18px] text-slate-400">show_chart</span>
                                            </div>
                                            <span className="text-sm text-slate-900 font-bold">Biến Thiên Nhịp</span>
                                            <span className="text-[12px] text-slate-500 mt-1">Người thật có câu rất dài xen ngắn (&gt; 0.45). AI có câu đều nhau.</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 mb-4 text-xs text-slate-600">
                                        <div className="flex items-start gap-1.5">
                                            <span className="material-symbols-outlined text-blue-900 text-[18px] mt-0.5">history_toggle_off</span>
                                            <span><strong>Đối chiếu văn bản đối chứng:</strong> So sánh bài nộp hiện tại với 3 bài tiểu luận tự luận các kỳ trước lưu trữ trên kho văn bằng số.</span>
                                        </div>
                                        <div className="flex items-start gap-1.5">
                                            <span className="material-symbols-outlined text-blue-900 text-[18px] mt-0.5">record_voice_over</span>
                                            <span><strong>Quy chuẩn triệu tập vấn đáp:</strong> Khi điểm nghi ngờ &gt; 78%, giảng viên tổ chức phỏng vấn 15 phút ghi âm theo Mẫu 02-BB/LCHT.</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 pt-2">
                                    <button
                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-900 text-white hover:bg-blue-950 text-xs font-semibold shadow-sm transition-all"
                                        type="button"
                                        onClick={() => triggerToast('Đang tải video chuyên đề phân tích chỉ số Stylometry.')}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">play_circle</span>
                                        Xem video hướng dẫn phân tích Stylometry
                                    </button>
                                    <a
                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-semibold transition-all"
                                        href="#"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                                        Tải mẫu biên bản giải trình
                                    </a>
                                </div>
                            </div>

                            {/* Pillar 3 */}
                            <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                                <div className="flex flex-col">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-sm">
                                                <span className="material-symbols-outlined text-[22px]">assignment</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Hành chính khảo thí số 03</span>
                                                <h2 className="text-lg text-slate-900 font-bold">Biểu Mẫu &amp; Biên Bản Khảo Thí Chuẩn Hóa</h2>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-slate-100 text-blue-900 text-xs font-semibold">
                                            Ban hành 2025
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4">
                                        Bộ biểu mẫu phục vụ việc xử lý sự cố bất khả kháng, xử phạt vi phạm quy chế và báo cáo đối soát chấm chéo hai vòng độc lập của giảng viên.
                                    </p>

                                    <div className="flex flex-col gap-3 mb-4">
                                        {/* Form Item 1 */}
                                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-start gap-3">
                                                <span className="px-2 py-1 rounded bg-white text-blue-900 text-xs font-bold shadow-xs border border-slate-200">
                                                    01-BB/KT
                                                </span>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-slate-900 font-semibold">Biên bản sự cố kỹ thuật phòng thi</span>
                                                    <span className="text-xs text-slate-500">Xác nhận đứt mạng quang, sập nguồn máy trạm, lỗi camera WebRTC.</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 self-end sm:self-center">
                                                <button className="px-2 py-1 rounded-lg bg-white text-blue-900 hover:bg-blue-50 text-xs font-semibold border border-slate-200 transition-colors">.DOCX</button>
                                                <button className="px-2 py-1 rounded-lg bg-white text-blue-900 hover:bg-blue-50 text-xs font-semibold border border-slate-200 transition-colors">.PDF</button>
                                                <button className="px-3 py-1 rounded-lg bg-blue-900 text-white hover:bg-blue-950 text-xs font-semibold flex items-center gap-1 shadow-xs transition-all">
                                                    <span className="material-symbols-outlined text-[14px]">edit_note</span> Điền online
                                                </button>
                                            </div>
                                        </div>

                                        {/* Form Item 2 */}
                                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-start gap-3">
                                                <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold border border-red-200">
                                                    02-BB/LCHT
                                                </span>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-slate-900 font-semibold">Biên bản rủi ro liêm chính học thuật</span>
                                                    <span className="text-xs text-slate-500">Ghi nhận can thiệp AI Bot, copy-paste clipboard, nhờ người thi hộ.</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 self-end sm:self-center">
                                                <button className="px-2 py-1 rounded-lg bg-white text-blue-900 hover:bg-blue-50 text-xs font-semibold border border-slate-200 transition-colors">.DOCX</button>
                                                <button className="px-2 py-1 rounded-lg bg-white text-blue-900 hover:bg-blue-50 text-xs font-semibold border border-slate-200 transition-colors">.PDF</button>
                                                <button className="px-3 py-1 rounded-lg bg-blue-900 text-white hover:bg-blue-950 text-xs font-semibold flex items-center gap-1 shadow-xs transition-all">
                                                    <span className="material-symbols-outlined text-[14px]">edit_note</span> Điền online
                                                </button>
                                            </div>
                                        </div>

                                        {/* Form Item 3 */}
                                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-start gap-3">
                                                <span className="px-2 py-1 rounded bg-white text-blue-900 text-xs font-bold shadow-xs border border-slate-200">
                                                    03-BC/CT
                                                </span>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-slate-900 font-semibold">Báo cáo tổng kết ca thi tự luận</span>
                                                    <span className="text-xs text-slate-500">Thống kê điểm số sơ bộ, độ lệch chuẩn và danh sách chấm kiểm tra Vòng 2.</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 self-end sm:self-center">
                                                <button className="px-2 py-1 rounded-lg bg-white text-blue-900 hover:bg-blue-50 text-xs font-semibold border border-slate-200 transition-colors">.DOCX</button>
                                                <button className="px-2 py-1 rounded-lg bg-white text-blue-900 hover:bg-blue-50 text-xs font-semibold border border-slate-200 transition-colors">.PDF</button>
                                                <button className="px-3 py-1 rounded-lg bg-blue-900 text-white hover:bg-blue-950 text-xs font-semibold flex items-center gap-1 shadow-xs transition-all">
                                                    <span className="material-symbols-outlined text-[14px]">edit_note</span> Điền online
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <span className="text-xs text-slate-500">Toàn bộ biểu mẫu có giá trị pháp lý nội bộ trường.</span>
                                    <button className="flex items-center gap-1 text-xs text-blue-900 font-bold hover:underline" type="button">
                                        <span className="material-symbols-outlined text-[18px]">folder_zip</span> Tải toàn bộ gói biểu mẫu (.ZIP 8.1MB)
                                    </button>
                                </div>
                            </div>

                            {/* Pillar 4 */}
                            <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                                <div className="flex flex-col">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-sm">
                                                <span className="material-symbols-outlined text-[22px]">help</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Giải đáp nghiệp vụ số 04</span>
                                                <h2 className="text-lg text-slate-900 font-bold">Câu Hỏi Thường Gặp Của Giảng Viên (FAQ)</h2>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
                                            Cập nhật liên tục
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4">
                                        Hướng dẫn xử lý chuẩn hóa đối với các tình huống phát sinh trong ca thi viết tự luận phân tích văn học và luận đề học thuật trực tuyến.
                                    </p>

                                    {/* Accordion FAQ */}
                                    <div className="flex flex-col gap-2">
                                        {faqList.map((faq, index) => {
                                            const isOpen = activeFaqIndex === index;
                                            return (
                                                <div key={faq.id} className="rounded-xl bg-slate-50 border border-slate-100 overflow-hidden transition-colors">
                                                    <button
                                                        className="w-full p-3 flex items-center justify-between text-left text-xs text-slate-900 font-semibold"
                                                        type="button"
                                                        onClick={() => toggleFaq(index)}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-blue-900 text-[18px]">{faq.icon}</span>
                                                            {faq.question}
                                                        </span>
                                                        <span
                                                            className={`material-symbols-outlined text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''
                                                                }`}
                                                        >
                                                            expand_more
                                                        </span>
                                                    </button>
                                                    {isOpen && (
                                                        <div className="px-3 pb-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                                                            {faq.answer}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-4">
                                    <span className="text-xs text-slate-500">Chưa tìm thấy giải pháp phù hợp?</span>
                                    <button
                                        className="flex items-center gap-1 text-xs text-blue-900 font-bold hover:underline"
                                        type="button"
                                        onClick={() => setIsLiveChatOpen(true)}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">contact_support</span> Gửi câu hỏi riêng cho Ban Thư Ký
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Academic Integrity Case Study & Telemetry Inspector Chart */}
                        <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5 text-blue-900 text-xs font-bold uppercase">
                                        <span className="material-symbols-outlined text-[18px]">query_stats</span>
                                        Minh họa phân tích đo lường thực tế
                                    </div>
                                    <h3 className="text-lg text-slate-900 font-bold">Biểu Đồ Phổ Nhịp Điệu Gõ Phím (Stylometry Keystroke Spectrum)</h3>
                                    <p className="text-xs text-slate-500">
                                        So sánh đối chứng trực quan giữa hành vi gõ văn bản thực tế của thí sinh và đoạn văn sao chép/dán từ trí tuệ nhân tạo.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-semibold">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-blue-900"></span>
                                        <span className="text-slate-900">Bài viết thực tế (Human)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-red-600"></span>
                                        <span className="text-slate-900">Đoạn văn dán tự động (AI Injected)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Inline SVG Visualization Chart */}
                            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-4">
                                <div className="w-full overflow-x-auto">
                                    <svg className="w-full h-44 min-w-[700px]" fill="none" viewBox="0 0 800 160">
                                        {/* Grid Lines */}
                                        <line className="text-slate-200" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="780" y1="20" y2="20" />
                                        <line className="text-slate-200" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="780" y1="60" y2="60" />
                                        <line className="text-slate-200" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="780" y1="100" y2="100" />
                                        <line className="text-slate-300" stroke="currentColor" strokeWidth="1" x1="40" x2="780" y1="140" y2="140" />

                                        {/* Y-Axis Labels */}
                                        <text className="font-sans text-xs font-semibold text-slate-400" fill="currentColor" fontSize="10" x="10" y="24">80 WPM</text>
                                        <text className="font-sans text-xs font-semibold text-slate-400" fill="currentColor" fontSize="10" x="10" y="64">50 WPM</text>
                                        <text className="font-sans text-xs font-semibold text-slate-400" fill="currentColor" fontSize="10" x="10" y="104">20 WPM</text>
                                        <text className="font-sans text-xs font-semibold text-slate-400" fill="currentColor" fontSize="10" x="10" y="144">0 WPM</text>

                                        {/* Human Typing Line */}
                                        <path d="M 40 115 Q 70 85, 100 95 T 160 70 T 220 120 T 280 80 T 340 75 T 400 90 T 450 130" fill="none" stroke="#00236f" strokeLinecap="round" strokeWidth="3" />
                                        {/* AI Paste Anomaly Burst Line */}
                                        <path d="M 450 130 L 460 22 L 540 22 L 550 125" fill="none" stroke="#ba1a1a" strokeLinecap="round" strokeWidth="3.5" />
                                        {/* Human Typing Resume */}
                                        <path d="M 550 125 Q 600 95, 650 85 T 720 105 T 780 90" fill="none" stroke="#00236f" strokeLinecap="round" strokeWidth="3" />

                                        {/* Circles & Annotations */}
                                        <circle cx="460" cy="22" fill="#ba1a1a" r="5" />
                                        <circle cx="540" cy="22" fill="#ba1a1a" r="5" />

                                        <rect fill="#ffdad6" height="24" rx="4" width="130" x="440" y="32" />
                                        <text className="font-sans font-bold" fill="#93000a" fontSize="11" x="450" y="48">Dán 340 từ / 0.8 giây</text>

                                        <rect fill="#dce1ff" height="22" rx="4" width="140" x="180" y="45" />
                                        <text className="font-sans font-bold" fill="#00164e" fontSize="10" x="190" y="60">Nhịp suy nghĩ tự nhiên</text>
                                    </svg>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                                    <div className="p-3 rounded-lg bg-white border border-slate-200">
                                        <span className="text-xs text-slate-500 block">Khoảng biến thiên tốc độ (Human):</span>
                                        <span className="text-xs text-blue-900 font-bold">28 – 54 WPM (Chuẩn mực bình thường)</span>
                                    </div>
                                    <div className="p-3 rounded-lg bg-white border border-slate-200">
                                        <span className="text-xs text-slate-500 block">Điểm đột biến bất thường (Anomaly):</span>
                                        <span className="text-xs text-red-600 font-bold">Đột ngột tăng 820 WPM (Clipboard Paste)</span>
                                    </div>
                                    <div className="p-3 rounded-lg bg-white border border-slate-200">
                                        <span className="text-xs text-slate-500 block">Khuyến nghị của Hội Đồng:</span>
                                        <span className="text-xs text-slate-900 font-bold">Lập Biên bản 02-BB/LCHT và triệu tập đối thoại</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Live Chat Modal */}
            {isLiveChatOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
                    <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col border border-slate-200">
                        <div className="p-4 bg-blue-900 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[18px]">forum</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold">Kênh Trực Ca Hội Đồng Đề Thi</span>
                                    <span className="text-xs text-blue-200">Phiên kết nối bảo mật • ID: CC-2025-09</span>
                                </div>
                            </div>
                            <button
                                className="text-white/80 hover:text-white"
                                type="button"
                                onClick={() => setIsLiveChatOpen(false)}
                            >
                                <span className="material-symbols-outlined text-[24px]">close</span>
                            </button>
                        </div>

                        <div className="p-4 h-80 overflow-y-auto flex flex-col gap-3 bg-slate-50 text-slate-900">
                            <div className="flex items-start gap-2 max-w-[85%]">
                                <div className="w-7 h-7 rounded-full bg-blue-900 text-white flex items-center justify-center text-[12px] font-bold">
                                    HĐ
                                </div>
                                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-xs">
                                    <p className="font-semibold text-blue-900 text-[11px] mb-0.5">Hội Đồng Khảo Thí (Trực ban)</p>
                                    Xin chào TS. Lê Quang Mai! Thầy đang coi thi học phần nào và cần hỗ trợ kỹ thuật hay quy chế khẩn cấp nào?
                                </div>
                            </div>

                            <div className="flex items-start gap-2 max-w-[85%] self-end flex-row-reverse">
                                <div className="w-7 h-7 rounded-full bg-blue-950 text-white flex items-center justify-center text-[12px] font-bold">
                                    LM
                                </div>
                                <div className="p-3 rounded-xl bg-blue-900 text-white shadow-xs text-xs">
                                    Chào Ban Thư ký, tôi đang coi thi phòng KT-04 môn Triết học Mác - Lênin. Có 1 sinh viên máy trạm báo lỗi kết nối WebSocket 1006.
                                </div>
                            </div>

                            <div className="flex items-start gap-2 max-w-[85%]">
                                <div className="w-7 h-7 rounded-full bg-blue-900 text-white flex items-center justify-center text-[12px] font-bold">
                                    HĐ
                                </div>
                                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-xs">
                                    <p className="font-semibold text-blue-900 text-[11px] mb-0.5">Kỹ sư Trực Hệ Thống (NTP Support)</p>
                                    Kỹ thuật đã kiểm tra telemetry của MSSV trên, bài thi vẫn an toàn trong Local Sandbox. Thầy hướng dẫn thí sinh bấm phím F5, hệ thống sẽ tự nạp lại token bảo lưu mà không mất chữ nào.
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white flex items-center gap-2 border-t border-slate-200">
                            <input
                                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900/20 border border-transparent focus:border-slate-200"
                                placeholder="Nhập nội dung trao đổi khẩn cấp với Hội đồng..."
                                type="text"
                            />
                            <button
                                className="px-4 py-2.5 rounded-xl bg-blue-900 text-white hover:bg-blue-950 text-xs font-bold flex items-center gap-1 transition-colors"
                                type="button"
                                onClick={() => triggerToast('Tin nhắn đã được gửi tới Ban Thư ký Hội đồng.')}
                            >
                                <span className="material-symbols-outlined text-[18px]">send</span>
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Emergency Incident Report Modal */}
            {isIncidentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
                    <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col border border-slate-200">
                        <div className="p-4 bg-red-600 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold">Báo Cáo Sự Cố Ca Thi Khẩn Cấp</span>
                                    <span className="text-xs text-red-100">Gửi ngay tới Thanh tra Đào tạo &amp; Ban Giám Hiệu</span>
                                </div>
                            </div>
                            <button
                                className="text-white/80 hover:text-white"
                                type="button"
                                onClick={() => setIsIncidentModalOpen(false)}
                            >
                                <span className="material-symbols-outlined text-[24px]">close</span>
                            </button>
                        </div>

                        <form className="p-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-slate-900">Loại hình sự cố</label>
                                <select className="w-full p-2.5 rounded-xl bg-slate-100 text-slate-900 text-xs focus:outline-none border border-slate-200">
                                    <option>Gian lận công nghệ cao (Dùng AI, mở tab ảo, camera giả mạo)</option>
                                    <option>Mất kết nối mạng diện rộng phòng máy (&gt; 5 sinh viên)</option>
                                    <option>Lộ đề thi / rò rỉ mã passcode phòng thi</option>
                                    <option>Sự cố bất khả kháng (Mất điện lưới, thiên tai)</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-slate-900">Mã phòng thi / Học phần</label>
                                <input
                                    className="w-full p-2.5 rounded-xl bg-slate-100 text-slate-900 text-xs focus:outline-none border border-slate-200"
                                    type="text"
                                    defaultValue="PHONG-402 • TRIẾT HỌC MÁC - LÊNIN (MLN1102)"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-slate-900">Mô tả tóm tắt sự cố &amp; MSSV liên quan (nếu có)</label>
                                <textarea
                                    className="w-full p-2.5 rounded-xl bg-slate-100 text-slate-900 text-xs focus:outline-none border border-slate-200"
                                    placeholder="Nhập chi tiết diễn biến, mã sinh viên nghi vấn và hành động giám thị đã tiến hành tại chỗ..."
                                    rows={3}
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                                <button
                                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200"
                                    type="button"
                                    onClick={() => setIsIncidentModalOpen(false)}
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 text-xs font-bold transition-all shadow-sm"
                                    type="button"
                                    onClick={() => {
                                        setIsIncidentModalOpen(false);
                                        triggerToast('Báo cáo khẩn cấp đã được gửi qua đường truyền mã hóa tới Ban Giám Hiệu.');
                                    }}
                                >
                                    Kích hoạt báo cáo ngay
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Notification Toast */}
            {toast.show && (
                <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl flex items-center gap-3 transition-all">
                    <span className="material-symbols-outlined text-emerald-400 text-[24px]">check_circle</span>
                    <span className="text-xs font-semibold">{toast.message}</span>
                </div>
            )}

            {/* Footer */}
            <footer className="w-full bg-white shadow-sm border-t border-slate-200 py-4 px-6 z-50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
                    <div>
                        <span>© 2025 Hội Đồng Khảo Thí &amp; Đảm Bảo Chất Lượng Giáo Dục. Hotline: <strong className="text-slate-900 font-semibold">1900 6886</strong></span>
                    </div>
                </div>
            </footer>
        </div>
    );
}