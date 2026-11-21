"use client";


import React, { useState } from "react";
import { useRouter } from 'next/navigation';

interface Toast {
    id: number;
    message: string;
    icon: string;
    iconColor: string;
}

export default function ExamReportPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"cau-1" | "cau-2" | "cau-3">("cau-1");
    const [isAppealOpen, setIsAppealOpen] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Form State
    const [appealTarget, setAppealTarget] = useState("cau-3");
    const [appealReason, setAppealReason] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    // Helper Toast Notification
    const showToast = (message: string, icon: string, iconColor: string) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, icon, iconColor }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3200);
    };

    const handleExportPdf = () => {
        showToast("Đang kết xuất bài thi & Bảng điểm PDF có chữ ký số...", "downloading", "text-blue-700");
        setTimeout(() => {
            showToast("Tải thành công: CS201_Exam_Report_SV20248841.pdf", "download_done", "text-emerald-600");
        }, 1200);
    };

    const handlePrint = () => {
        if (typeof window !== "undefined") {
            window.print();
        }
    };

    const handleTabClick = (tabId: "cau-1" | "cau-2" | "cau-3") => {
        setActiveTab(tabId);
        const elem = document.getElementById(`section-${tabId}`);
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleAppealSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAppealOpen(false);
        showToast(
            "Đã ghi nhận đơn phúc khảo số PK-8841-2024. Hội đồng sẽ phản hồi trong 3 ngày làm việc!",
            "mark_email_read",
            "text-emerald-600"
        );
        setAppealReason("");
        setAgreeTerms(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased flex flex-col">
            {/* Dynamic Font & Icons Preload */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />

            {/* HEADER BAR */}

            {/* MAIN CONTAINER */}
            <main className="w-full bg-slate-50 min-h-[calc(100vh-4rem)] flex-1">
                <div className="flex flex-col w-full">
                    {/* Top Breadcrumb & Actions Bar */}
                    <section className="w-full bg-white border-b border-slate-200/80 shadow-sm py-3 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                            <div className="flex items-center flex-wrap gap-2 text-slate-600 text-sm">
                                <button
                                    className="inline-flex items-center gap-1.5 font-semibold text-blue-900 hover:text-blue-700 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-100"
                                    type="button"
                                    onClick={() => router.push('/pages/student/exam/history-exam')}
                                >
                                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                    <span>Lịch sử bài thi</span>
                                </button>
                                <span className="text-slate-300">/</span>
                                <span className="font-medium text-slate-600">CS201 - Cấu Trúc Dữ Liệu &amp; Giải Thuật</span>
                                <span className="text-slate-300">/</span>
                                <span className="font-bold text-blue-900">Chi tiết bài nộp &amp; Báo cáo chấm thi</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-950 text-white transition-all shadow-md font-semibold text-sm"
                                    onClick={() => setIsAppealOpen(true)}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[18px]">gavel</span>
                                    <span>Gửi yêu cầu Phúc khảo điểm</span>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-200 text-blue-950 text-[11px] font-bold">
                                        Còn 05 ngày
                                    </span>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Main Content Area */}
                    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
                        {/* Overview Hero Submission Summary Card */}
                        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200/80 p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                {/* Left Metadata (8 cols) */}
                                <div className="lg:col-span-8 flex flex-col gap-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-900 font-semibold text-xs">
                                            Kỳ thi Cuối kỳ Học kỳ 1 (2024 - 2025)
                                        </span>
                                        <span className="px-2.5 py-1 rounded-md bg-slate-200 text-blue-900 font-semibold text-xs">
                                            Tự luận giải thuật (120 phút)
                                        </span>
                                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">meeting_room</span>
                                            Phòng thi: V-LAB-04
                                        </span>
                                        <span className="px-2.5 py-1 rounded-md bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">task_alt</span>
                                            Đúng hạn (Bản chính thức)
                                        </span>
                                    </div>

                                    <div>
                                        <h1 className="text-2xl sm:text-3xl font-bold text-blue-950 tracking-tight">
                                            CS201 - Cấu Trúc Dữ Liệu &amp; Giải Thuật Ứng Dụng
                                        </h1>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Học phần chuyên sâu ngành Kỹ thuật Phần mềm &amp; Khoa học Máy tính • Mã đề thi:{" "}
                                            <strong className="text-slate-900">DS-FINAL-09A</strong>
                                        </p>
                                    </div>

                                    {/* Quick Stat Chips */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col">
                                            <span className="text-xs text-slate-500 font-medium">Thời gian nộp</span>
                                            <span className="text-sm font-bold text-slate-900 mt-0.5">11:15:32</span>
                                            <span className="text-[11px] text-slate-400">12/10/2024</span>
                                        </div>
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col">
                                            <span className="text-xs text-slate-500 font-medium">Thời gian làm bài</span>
                                            <span className="text-sm font-bold text-blue-900 mt-0.5">105 / 120 phút</span>
                                            <span className="text-[11px] text-emerald-700 font-medium">Tiết kiệm 15 phút</span>
                                        </div>
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col">
                                            <span className="text-xs text-slate-500 font-medium">Dung lượng bài</span>
                                            <span className="text-sm font-bold text-slate-900 mt-0.5">1,842 từ</span>
                                            <span className="text-[11px] text-slate-400">3 câu tự luận lớn</span>
                                        </div>
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col">
                                            <span className="text-xs text-slate-500 font-medium">Tình trạng nộp</span>
                                            <span className="text-sm font-bold text-emerald-600 mt-0.5">Thành công</span>
                                            <span className="text-[11px] text-slate-400">Đồng bộ Cloud 100%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Total Grade Box (4 cols) */}
                                <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-100/50 pointer-events-none"></div>

                                    <div className="flex items-center justify-between relative z-10">
                                        <div>
                                            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                                                Điểm Tổng Kết
                                            </span>
                                            <div className="flex items-baseline gap-1 mt-1">
                                                <span className="text-4xl font-extrabold text-blue-900">9.0</span>
                                                <span className="text-lg font-bold text-slate-400">/ 10.0</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold shadow-sm">
                                                Hạng A • Xuất sắc
                                            </span>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">Top 4% toàn khóa</p>
                                        </div>
                                    </div>

                                    {/* Evaluator Card */}
                                    <div className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-sm flex items-start gap-3 relative z-10">
                                        <div className="w-9 h-9 rounded-full bg-blue-950 text-white flex items-center justify-center font-bold flex-shrink-0 text-xs">
                                            LM
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-xs font-bold text-slate-900 truncate">TS. Lê Quang Mai</h2>
                                                <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-1.5 py-0.5 rounded">
                                                    Chấm chính
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-slate-500 truncate">Bộ môn KHMT • Viện CNTT&amp;TT</p>
                                            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-700 font-semibold">
                                                <span className="material-symbols-outlined text-[13px]">verified</span>
                                                <span>Ký xác thực: 14:20 13/10/2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Asymmetric Split Layout: Left 65% (8/12) | Right 35% (4/12) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            {/* LEFT COLUMN: Student Prose & Interactive Question Tabs */}
                            <div className="lg:col-span-8 flex flex-col gap-6">
                                {/* Question Tab Navigator */}
                                <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <button
                                            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "cau-1"
                                                ? "bg-blue-900 text-white shadow-sm"
                                                : "text-slate-600 hover:bg-slate-100"
                                                }`}
                                            onClick={() => handleTabClick("cau-1")}
                                            type="button"
                                        >
                                            <span>Câu 1: Chia để trị &amp; O(n log n)</span>
                                            <span className="px-1.5 py-0.5 rounded bg-white/20 text-xs">4.0/4.0 đ</span>
                                        </button>

                                        <button
                                            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 transition-all ${activeTab === "cau-2"
                                                ? "bg-blue-900 text-white shadow-sm"
                                                : "text-slate-600 hover:bg-slate-100"
                                                }`}
                                            onClick={() => handleTabClick("cau-2")}
                                            type="button"
                                        >
                                            <span>Câu 2: Cấu trúc AVL Tree</span>
                                            <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 text-xs">
                                                3.0/3.0 đ
                                            </span>
                                        </button>

                                        <button
                                            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 transition-all ${activeTab === "cau-3"
                                                ? "bg-blue-900 text-white shadow-sm"
                                                : "text-slate-600 hover:bg-slate-100"
                                                }`}
                                            onClick={() => handleTabClick("cau-3")}
                                            type="button"
                                        >
                                            <span>Câu 3: Đồ thị &amp; Tối ưu hóa</span>
                                            <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 text-xs">
                                                2.0/3.0 đ
                                            </span>
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-1 px-3 py-1 text-slate-500 text-xs font-semibold">
                                        <span className="material-symbols-outlined text-[16px] text-emerald-700">comment</span>
                                        <span>3 chú thích của Giảng viên</span>
                                    </div>
                                </div>

                                {/* Article Body */}
                                <article className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 sm:p-8 flex flex-col gap-8">
                                    {/* SECTION CÂU 1 */}
                                    <section className="flex flex-col gap-4 scroll-mt-24" id="section-cau-1">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                            <div>
                                                <span className="text-xs text-blue-900 font-bold uppercase tracking-wider">
                                                    Phần I • Trọng số 40%
                                                </span>
                                                <h2 className="text-xl font-bold text-slate-900 mt-1">
                                                    Câu 1: Thiết kế thuật toán tìm cặp điểm gần nhất (Closest Pair of Points) bằng phương pháp
                                                    Chia Để Trị (Divide and Conquer)
                                                </h2>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-bold text-blue-900">4.0</span>
                                                <span className="text-xs text-slate-400">/ 4.0 đ</span>
                                            </div>
                                        </div>

                                        <div className="text-slate-800 leading-relaxed text-sm sm:text-base flex flex-col gap-4">
                                            <p>
                                                Để giải quyết bài toán tìm cặp điểm có khoảng cách Euclidean nhỏ nhất trong tập hợp{" "}
                                                <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">
                                                    P = &#123;p_1, p_2, ..., p_n&#125;
                                                </code>{" "}
                                                trên mặt phẳng hai chiều, giải thuật duyệt vét cạn (Brute-Force) thông thường sẽ xét tất cả{" "}
                                                <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">
                                                    C(n, 2) = n(n-1)/2
                                                </code>{" "}
                                                cặp điểm, dẫn đến độ phức tạp thời gian là O(n²). Khi n ≥ 10⁵, phương pháp này hoàn toàn không
                                                khả thi trong môi trường tính toán thực tế.
                                            </p>

                                            {/* Highlight Block & Teacher Annotation */}
                                            <div className="relative bg-slate-50 border border-slate-200 p-4 rounded-xl">
                                                <p className="italic text-slate-700">
                                                    “Giải pháp tối ưu là áp dụng tư tưởng Chia để trị (Divide and Conquer). Đầu tiên, ta tiền xử
                                                    lý tập điểm bằng cách sắp xếp theo hoành độ X và tung độ Y mất O(n log n). Tại mỗi bước phân
                                                    chia theo đường thẳng trung tuyến x = x_mid, ta đệ quy tìm khoảng cách tối thiểu bên trái d_L
                                                    và bên phải d_R. Gọi δ = min(d_L, d_R), ta chỉ cần kiểm tra dải trung tâm (Strip) có bề rộng
                                                    2δ xoay quanh đường phân cách.”
                                                </p>

                                                <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-blue-900 text-[20px] mt-0.5">
                                                        verified
                                                    </span>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs font-bold text-blue-900">
                                                                Nhận xét của TS. Lê Quang Mai
                                                            </span>
                                                            <span className="text-[11px] text-slate-500">Tiêu chí 1 • 100% điểm</span>
                                                        </div>
                                                        <p className="text-xs text-slate-700 mt-1">
                                                            Lập luận bản chất thuật toán phân tách không gian cực kỳ chuẩn xác. Bạn đã chỉ rõ lý do
                                                            tại sao chỉ cần kiểm tra tối đa 7 điểm lân cận trong dải Strip nhờ nguyên lý Dirichlet
                                                            (Pigeonhole Principle).
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <p>Dưới đây là phần thiết kế mã giả (Pseudocode) chuẩn hóa và cài đặt trực tiếp cấu trúc phân rã:</p>
                                        </div>

                                        {/* Code Snippet Box */}
                                        <div className="rounded-xl overflow-hidden shadow-sm bg-slate-950 text-white">
                                            <div className="px-4 py-2 bg-slate-900 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                                                    <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                                                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                                                    <span className="font-mono ml-2 font-bold text-white">closest_pair_algorithm.cpp</span>
                                                </div>
                                                <span className="font-mono text-[11px]">C++20 • Divide &amp; Conquer</span>
                                            </div>
                                            <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-slate-200">
                                                <code>{`// Hàm giải thuật đệ quy tìm khoảng cách cực tiểu
double closestUtil(Point Px[], Point Py[], int n) {
    // Trường hợp cơ sở: kích thước nhỏ hơn hoặc bằng 3 điểm
    if (n <= 3) return bruteForce(Px, n);

    int mid = n / 2;
    Point midPoint = Px[mid];

    // Phân tách Py thành hai nửa trái và phải theo midPoint.x
    Point Pyl[mid], Pyr[n - mid];
    splitPresortedY(Py, n, midPoint, Pyl, Pyr);

    double dl = closestUtil(Px, Pyl, mid);
    double dr = closestUtil(Px + mid, Pyr, n - mid);
    double d = std::min(dl, dr);

    // Kiểm tra dải hẹp Strip quanh midPoint với biên độ 2*d
    Point strip[n];
    int j = 0;
    for (int i = 0; i < n; i++) {
        if (abs(Py[i].x - midPoint.x) < d)
            strip[j++] = Py[i];
    }
    return stripClosest(strip, j, d);
}`}</code>
                                            </pre>
                                        </div>

                                        {/* Complexity Proof */}
                                        <div className="text-slate-800 leading-relaxed text-sm sm:text-base flex flex-col gap-3 pt-2">
                                            <h4 className="text-base font-bold text-blue-900">
                                                Chứng minh độ phức tạp thời gian theo Định lý Thợ (Master Theorem):
                                            </h4>
                                            <p>Phương trình hệ thức truy hồi của giải thuật phân rã trên được biểu diễn như sau:</p>
                                            <div className="p-3 bg-slate-100 rounded-lg font-mono text-center text-blue-900 font-bold text-sm sm:text-base border border-slate-200">
                                                T(n) = 2 • T(n / 2) + O(n)
                                            </div>
                                            <p>
                                                Áp dụng Định lý Thợ với <code className="font-mono">a = 2, b = 2</code>, và{" "}
                                                <code className="font-mono">f(n) = O(n)</code>. Ta có{" "}
                                                <code className="font-mono">log_b(a) = log_2(2) = 1</code>. Vì{" "}
                                                <code className="font-mono">f(n) = Θ(n)</code>, bài toán rơi vào Trường hợp 2 (Case 2) của
                                                Master Theorem. Kết quả suy ra:
                                            </p>
                                            <div className="p-3 bg-slate-50 rounded-lg font-mono text-center text-emerald-700 font-bold text-sm sm:text-base border border-slate-200">
                                                T(n) = Θ(n • log n)
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                Bộ nhớ phụ trợ (Auxiliary Space): Do tạo các mảng tạm tại mỗi tầng đệ quy và mảng Strip có tối
                                                đá n phần tử, tổng không gian bộ nhớ phụ là O(n).
                                            </p>
                                        </div>
                                    </section>

                                    <hr className="border-slate-200" />

                                    {/* SECTION CÂU 2 */}
                                    <section className="flex flex-col gap-4 scroll-mt-24" id="section-cau-2">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                            <div>
                                                <span className="text-xs text-blue-900 font-bold uppercase tracking-wider">
                                                    Phần II • Trọng số 30%
                                                </span>
                                                <h2 className="text-xl font-bold text-slate-900 mt-1">
                                                    Câu 2: Thiết kế và Cân bằng Cây Nhị Phân Tìm Kiếm AVL (AVL Tree Self-Balancing Operations)
                                                </h2>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-bold text-blue-900">3.0</span>
                                                <span className="text-xs text-slate-400">/ 3.0 đ</span>
                                            </div>
                                        </div>

                                        <div className="text-slate-800 leading-relaxed text-sm sm:text-base flex flex-col gap-4">
                                            <p>
                                                Cây AVL là cây nhị phân tìm kiếm (BST) tự cân bằng, trong đó với mọi nút u, chênh lệch chiều cao
                                                giữa cây con trái và cây con phải (Hệ số cân bằng{" "}
                                                <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-xs">
                                                    BalanceFactor(u) = h_left - h_right
                                                </code>
                                                ) chỉ nhận một trong ba giá trị &#123;-1, 0, 1&#125;.
                                            </p>

                                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
                                                <span className="material-symbols-outlined text-slate-500 text-[20px] mt-0.5">
                                                    rate_review
                                                </span>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-slate-900">
                                                            Nhận xét của ThS. Hoàng Thị Phương Lan
                                                        </span>
                                                        <span className="text-[11px] text-emerald-700 font-bold">Chấm chéo • Hoàn hảo</span>
                                                    </div>
                                                    <p className="text-xs text-slate-700 mt-1">
                                                        Hình vẽ minh họa 4 trường hợp xoay (LL, RR, LR, RL) rất rõ ràng. Phân tích chi tiết trường
                                                        hợp xoay kép Left-Right (LR Rotation) đạt độ sâu học thuật cao.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Interactive Diagram Box */}
                                            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center gap-3">
                                                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                                                    SƠ ĐỒ PHÉP XOAY KÉP LR (LEFT-RIGHT ROTATION) MINH HỌA
                                                </span>
                                                <div className="font-mono text-xs text-slate-900 bg-white p-4 rounded-lg border border-slate-200 shadow-sm w-full max-w-lg overflow-x-auto text-left leading-5">
                                                    &nbsp;&nbsp;&nbsp;&nbsp;Node Z (BF=+2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Node Z&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Node Y<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;\<br />
                                                    &nbsp;&nbsp;&nbsp;Node X (BF=-1)&nbsp;&nbsp;---[Rotate Left X]---&gt;&nbsp;&nbsp;Node Y&nbsp;&nbsp;---[Rotate Right Z]---&gt;&nbsp;Node X&nbsp;&nbsp;Node Z<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Node Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Node X&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T2&nbsp;&nbsp;&nbsp;T3
                                                </div>
                                                <span className="text-xs text-slate-500">
                                                    Độ phức tạp thời gian xoay nút: O(1) • Chiều cao cây luôn duy trì ≤ 1.44 log_2(n)
                                                </span>
                                            </div>
                                        </div>
                                    </section>

                                    <hr className="border-slate-200" />

                                    {/* SECTION CÂU 3 */}
                                    <section className="flex flex-col gap-4 scroll-mt-24" id="section-cau-3">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                            <div>
                                                <span className="text-xs text-blue-900 font-bold uppercase tracking-wider">
                                                    Phần III • Trọng số 30%
                                                </span>
                                                <h2 className="text-xl font-bold text-slate-900 mt-1">
                                                    Câu 3: Bài toán tối ưu hóa đường đi ngắn nhất đa điều kiện trên Đồ thị có trọng số âm
                                                </h2>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-bold text-slate-700">2.0</span>
                                                <span className="text-xs text-slate-400">/ 3.0 đ</span>
                                            </div>
                                        </div>

                                        <div className="text-slate-800 leading-relaxed text-sm sm:text-base flex flex-col gap-4">
                                            <p>
                                                Để phát hiện chu trình âm và tính khoảng cách ngắn nhất từ nguồn đơn s tới tất cả các đỉnh còn
                                                lại, thuật toán Bellman-Ford thực hiện nới lỏng (Relaxation) tất cả |E| cạnh qua |V| - 1 vòng
                                                lặp. Nếu ở vòng lặp thứ |V| vẫn còn cạnh có thể nới lỏng, đồ thị chắc chắn chứa chu trình âm.
                                            </p>

                                            {/* Deduction Warning Box */}
                                            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col gap-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined text-[18px]">info</span>
                                                        Góp ý chấm thi: Trừ 1.0 điểm (Tiêu chí 3: Phân tích trường hợp biên)
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 text-xs font-bold">
                                                        Mất 1.0 đ
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-800 leading-relaxed">
                                                    <strong>TS. Lê Quang Mai phê bình:</strong> “Sinh viên đã cài đặt tốt giải thuật Bellman-Ford
                                                    cơ bản nhưng chưa giải quyết triệt để trường hợp đồ thị có các thành phần liên thông rời rạc
                                                    (Disconnected Graph) mà chu trình âm nằm ngoài vùng có thể tiếp cận được từ đỉnh nguồn s. Cần
                                                    thêm kỹ thuật bổ sung đỉnh ảo kết nối trọng số 0 tới toàn bộ đỉnh (như thuật toán Johnson).”
                                                </p>
                                            </div>

                                            <p>
                                                Nhìn chung, với các bài toán đồ thị thưa có mật độ |E| ≪ |V|², thuật toán SPFA (Shortest Path
                                                Faster Algorithm) tối ưu bằng hàng đợi có thể rút ngắn thời gian trung bình xuống O(|E|), dù
                                                trong trường hợp xấu nhất vẫn suy biến về O(|V| · |E|).
                                            </p>
                                        </div>
                                    </section>
                                </article>
                            </div>

                            {/* RIGHT COLUMN: Instructor Endorsement & AI Integrity Proctoring */}
                            <div className="lg:col-span-4 flex flex-col gap-6">
                                {/* 1. Instructor Official Endorsement Card */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 flex flex-col gap-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                        <span className="material-symbols-outlined text-blue-900 text-[20px]">chat</span>
                                        <h3 className="text-base font-bold text-blue-950">Lời Phê Của Hội Đồng Chấm</h3>
                                    </div>

                                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-blue-900">TS. Lê Quang Mai</span>
                                                <span className="text-[11px] text-slate-500">Cán bộ chấm 1</span>
                                            </div>
                                            <span className="material-symbols-outlined text-blue-900 text-[18px]">format_quote</span>
                                        </div>
                                        <p className="text-xs text-slate-700 italic leading-relaxed">
                                            “Phần lập luận thuật toán tối ưu rất tốt, mã giả rõ ràng, bài viết tự luận phân tích độ phức tạp
                                            thời gian O(n log n) rất sâu sắc và thuyết phục. Cần chú ý thêm trường hợp mảng có các phần tử
                                            trùng lặp lớn ở phần câu hỏi mở để bài làm hoàn thiện tuyệt đối.”
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-slate-900">ThS. Hoàng Thị Phương Lan</span>
                                                <span className="text-[11px] text-slate-500">Cán bộ đối soát 2</span>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-400 text-[18px]">format_quote</span>
                                        </div>
                                        <p className="text-xs text-slate-700 italic leading-relaxed">
                                            “Đồng thuận điểm số 9.0/10 với Giám khảo 1. Đánh giá rất cao cách tiếp cận phân rã không gian và
                                            đệ quy có nhớ (Memoization).”
                                        </p>
                                    </div>
                                </div>

                                {/* 2. AI Integrity & Proctoring Telemetry Report */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 flex flex-col gap-4">
                                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-emerald-700 text-[20px]">shield</span>
                                            <h3 className="text-base font-bold text-blue-950">Liêm Chính Học Thuật &amp; AI</h3>
                                        </div>
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-800 text-white text-xs font-bold">
                                            100% Hợp Lệ
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col">
                                            <span className="text-xs text-slate-500">AI Tương đồng</span>
                                            <span className="text-base sm:text-lg font-bold text-emerald-700 mt-0.5">3.2%</span>
                                            <span className="text-[11px] text-slate-400">Ngưỡng an toàn &lt; 15%</span>
                                        </div>
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col">
                                            <span className="text-xs text-slate-500">Vi phạm Proctor</span>
                                            <span className="text-base sm:text-lg font-bold text-blue-900 mt-0.5">0 Vi phạm</span>
                                            <span className="text-[11px] text-slate-400">Khóa toàn màn hình</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 pt-1">
                                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                                            Phân tích văn phong (Stylometry):
                                        </span>

                                        <div className="flex items-center justify-between text-xs text-slate-700 p-2 rounded hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px] text-slate-400">keyboard</span>
                                                <span>Tốc độ gõ trung bình:</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-slate-900">68 WPM</span>
                                                <span className="text-[11px] text-emerald-700 block font-medium">Tự nhiên (0 Paste Event)</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-slate-700 p-2 rounded hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px] text-slate-400">psychology</span>
                                                <span>Độ phức tạp (Perplexity):</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-slate-900">58.4</span>
                                                <span className="text-[11px] text-emerald-700 block font-medium">Người viết thật (&gt; 45.0)</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-slate-700 p-2 rounded hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px] text-slate-400">tune</span>
                                                <span>Biến thiên câu (Burstiness):</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-slate-900">0.52</span>
                                                <span className="text-[11px] text-emerald-700 block font-medium">Nhịp điệu tự nhiên</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 flex flex-col gap-1 text-xs text-slate-800">
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px] text-emerald-700">videocam</span>
                                                Xác thực Camera AI khuôn mặt:
                                            </span>
                                            <strong className="text-emerald-700">100% liên tục</strong>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px] text-emerald-700">tab</span>
                                                SafeExam Browser ghi nhận tab rời:
                                            </span>
                                            <strong className="text-emerald-700">0 lần</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="w-full bg-slate-100 border-t border-slate-200 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                            HỘI ĐỒNG KHẢO THÍ VÀ ĐẢM BẢO CHẤT LƯỢNG GIÁO DỤC
                        </span>
                        <span className="text-xs text-slate-500">
                            Cổng thông tin thi trực tuyến dành cho sinh viên chính quy • Bản quyền © 2025
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                            <span className="material-symbols-outlined text-[16px]">support_agent</span>
                            <span>Đường dây nóng: 1900 6886</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                            <span className="material-symbols-outlined text-[16px]">verified_user</span>
                            <span>Bảo mật AES-256</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* MODAL: Grade Appeal Request Dialog */}
            {isAppealOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-150">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[18px]">gavel</span>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-blue-950">Đề Nghị Phúc Khảo Điểm Thi</h3>
                                    <p className="text-xs text-slate-500">Môn: CS201 - Cấu Trúc Dữ Liệu &amp; Giải Thuật</p>
                                </div>
                            </div>
                            <button
                                className="w-8 h-8 rounded-full text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors flex items-center justify-center"
                                onClick={() => setIsAppealOpen(false)}
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form className="flex flex-col gap-4" onSubmit={handleAppealSubmit}>
                            <div>
                                <label className="block text-xs font-bold text-slate-900 mb-1">
                                    Chọn câu hỏi muốn phúc khảo:
                                </label>
                                <select
                                    className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900"
                                    value={appealTarget}
                                    onChange={(e) => setAppealTarget(e.target.value)}
                                >
                                    <option value="cau-3">Câu 3: Bài toán tối ưu hóa đồ thị (Hiện tại: 2.0 / 3.0 điểm)</option>
                                    <option value="cau-1">Câu 1: Thuật toán chia để trị (Hiện tại: 4.0 / 4.0 điểm)</option>
                                    <option value="cau-2">Câu 2: Thiết kế cây AVL (Hiện tại: 3.0 / 3.0 điểm)</option>
                                    <option value="all">Toàn bộ bài thi (Tổng điểm hiện tại: 9.0 / 10.0)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-900 mb-1">
                                    Luận cứ phúc khảo (Trình bày chi tiết lý do &amp; cơ sở học thuật):
                                </label>
                                <textarea
                                    className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                                    placeholder="Ví dụ: Em nhận thấy ở Câu 3, em đã bổ sung giải thuật kiểm tra thành phần liên thông bằng BFS trước khi chạy Bellman-Ford ở dòng 42 của mã giả..."
                                    required
                                    rows={4}
                                    value={appealReason}
                                    onChange={(e) => setAppealReason(e.target.value)}
                                ></textarea>
                                <span className="text-[11px] text-slate-400 mt-1 block">
                                    Tối thiểu 50 từ để Hội đồng tiếp nhận và thẩm định học thuật.
                                </span>
                            </div>

                            <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <input
                                    className="mt-0.5 rounded accent-blue-900"
                                    id="agree-terms"
                                    required
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                />
                                <label className="text-xs text-slate-700 leading-tight cursor-pointer" htmlFor="agree-terms">
                                    Em cam kết các luận cứ trên là trung thực và hiểu rõ điểm phúc khảo có thể tăng, giữ nguyên hoặc giảm
                                    tùy thuộc kết luận của Hội đồng Độc lập.
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                                <button
                                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors"
                                    onClick={() => setIsAppealOpen(false)}
                                    type="button"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    className="px-4 py-2 rounded-lg bg-blue-900 text-white text-xs font-bold shadow-md hover:bg-blue-950 transition-colors flex items-center gap-1.5"
                                    type="submit"
                                >
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                    <span>Gửi đơn phúc khảo</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* TOAST CONTAINER */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="pointer-events-auto bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-xs sm:text-sm border border-slate-800 animate-in slide-in-from-bottom-2 duration-200"
                    >
                        <span className={`material-symbols-outlined ${toast.iconColor}`}>{toast.icon}</span>
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}