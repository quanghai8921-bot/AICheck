"use client";

import React, { useState } from "react";

export default function CreateExamPage() {
    // 2 tùy chọn: 'bank' (Ngân hàng đề thi) hoặc 'custom' (Tự viết đề thi)
    const [questionSource, setQuestionSource] = useState<"bank" | "custom">("bank");
    const [selectedQuestionId, setSelectedQuestionId] = useState<string>("Q1");
    const [searchBankQuery, setSearchBankQuery] = useState<string>("");
    const [customQuestionContent, setCustomQuestionContent] = useState<string>("");
    const [saveToBank, setSaveToBank] = useState<boolean>(true);

    // Dữ liệu mẫu danh sách câu hỏi trong ngân hàng theo môn học
    const mockBankQuestions = [
        {
            id: "Q1",
            code: "CH-CS201-01",
            content: "Phân tích độ phức tạp thuật toán QuickSort trong trường hợp tốt nhất, trung bình và xấu nhất. Hãy đề xuất giải pháp chọn phần tử chốt (pivot) để tránh trường hợp xấu nhất.",
            topic: "Thuật toán sắp xếp & Đệ quy",
            updatedAt: "10/10/2024",
        },
        {
            id: "Q2",
            code: "CH-CS201-02",
            content: "Trình bày cấu trúc dữ liệu Cây nhị phân tìm kiếm (Binary Search Tree - BST). Viết mã giả thực hiện thao tác xóa một nút có 2 nút con trong cây BST.",
            topic: "Cấu trúc dữ liệu Cây (Tree)",
            updatedAt: "15/10/2024",
        },
        {
            id: "Q3",
            code: "CH-CS201-03",
            content: "So sánh giải thuật Dijkstra và Bellman-Ford trong bài toán tìm đường đi ngắn nhất trên đồ thị. Trường hợp nào bắt buộc phải sử dụng Bellman-Ford?",
            topic: "Đồ thị (Graph Algorithm)",
            updatedAt: "20/10/2024",
        },
        {
            id: "Q4",
            code: "CH-CS201-04",
            content: "Ứng dụng của Bảng băm (Hash Table) trong xử lý dữ liệu lớn. Phân tích 2 kỹ thuật xử lý va chạm: Chaining và Open Addressing.",
            topic: "Bảng băm & Ánh xạ",
            updatedAt: "25/10/2024",
        },
    ];

    const filteredQuestions = mockBankQuestions.filter(
        (q) =>
            q.content.toLowerCase().includes(searchBankQuery.toLowerCase()) ||
            q.topic.toLowerCase().includes(searchBankQuery.toLowerCase()) ||
            q.code.toLowerCase().includes(searchBankQuery.toLowerCase())
    );

    return (
        <div className="w-full font-sans text-[#0b1c30] antialiased pb-10">
            <main className="w-full max-w-5xl mx-auto py-6 px-4 sm:px-6 flex flex-col gap-6">
                {/* Top Welcome Banner */}
                <section className="relative overflow-hidden bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                    <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#dce1ff]/30 blur-3xl pointer-events-none"></div>
                    <div className="absolute right-36 -bottom-16 w-48 h-48 rounded-full bg-[#6ffbbe]/20 blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shadow-md">
                                    <span className="material-symbols-outlined text-[32px]">account_balance</span>
                                </div>
                                <span
                                    className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#4edea3] ring-2 ring-white"
                                    title="Đang trực tuyến"
                                ></span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h1 className="font-['Plus_Jakarta_Sans'] text-2xl lg:text-3xl text-[#00236f] tracking-tight font-bold">
                                        Xin chào Giảng viên, TS. Lê Quang Mai
                                    </h1>
                                    <span className="px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#444651] text-xs font-semibold">
                                        MSGV: GV2024-1049
                                    </span>
                                </div>
                                <p className="text-sm text-[#515f74] mt-1">
                                    Bộ môn Khoa Học Máy Tính &amp; Trí Tuệ Nhân Tạo • Viện Công Nghệ Thông Tin &amp; Truyền Thông
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Khởi Tạo Bài Thi Mới */}
                <section className="flex flex-col gap-6">
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-2">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2.5 py-0.5 rounded-full bg-[#dce1ff] text-[#00164e] text-xs font-bold uppercase tracking-wider">
                                        Khởi tạo đề thi chuẩn học thuật
                                    </span>
                                    <span className="text-xs text-[#515f74]">Quy chế thi Bộ GD&amp;ĐT</span>
                                </div>
                                <h2 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#0b1c30] font-bold">
                                    Thiết Lập Đề Thi &amp; Cấu Hình Phòng Thi Tự Luận
                                </h2>
                            </div>
                        </div>

                        {/* Two Column Form */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                            {/* Left Column */}
                            <div className="flex flex-col gap-4">
                                <div className="p-5 rounded-2xl bg-[#eff4ff] border border-blue-100/50">
                                    <span className="text-sm text-[#00236f] font-bold flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-[18px]">menu_book</span>
                                        Bước 1: Chọn Học Phần &amp; Quy Mô Ca Thi
                                    </span>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#515f74] mb-1">Tiêu đề bài kiểm tra *</label>
                                            <input
                                                type="text"
                                                className="w-full h-11 px-3 py-2 bg-white rounded-xl text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#00236f] border border-slate-200"
                                                placeholder="VD: Kiểm tra giữa kỳ - Thuật toán và Cấu trúc dữ liệu"
                                                defaultValue="Kiểm tra giữa kỳ - Lớp CS201"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#515f74] mb-1">Môn học / Học phần khảo thí *</label>
                                            <select className="w-full h-11 px-3 py-2 bg-white rounded-xl text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#00236f] border border-slate-200">
                                                <option defaultValue="CS201">CS201 - Cấu Trúc Dữ Liệu &amp; Giải Thuật Ứng Dụng</option>
                                                <option>OOP301 - Kỹ Thuật Lập Trình Hướng Đối Tượng</option>
                                                <option>AI402 - Nhập Môn Trí Tuệ Nhân Tạo &amp; Học Máy</option>
                                                <option>NET105 - Mạng Máy Tính Nâng Cao</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#515f74] mb-1">Hình thức bài thi</label>
                                            <select className="w-full h-11 px-3 py-2 bg-white rounded-xl text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#00236f] border border-slate-200">
                                                <option defaultValue="tuluan">Tự luận viết học thuật</option>
                                                <option>Kết hợp tự luận &amp; Mã nguồn code</option>
                                                <option>Tiểu luận phân tích tình huống</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-[#eff4ff] border border-blue-100/50">
                                    <span className="text-sm text-[#00236f] font-bold flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-[18px]">timer</span>
                                        Bước 2: Cấu Hình Thời Gian &amp; Mã Ca Thi
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-semibold text-[#515f74] mb-1">Passcode Mở Đề (6 Ký tự)</label>
                                            <div className="relative flex items-center">
                                                <input
                                                    className="w-full h-11 px-3 py-2 bg-white rounded-xl font-['Plus_Jakarta_Sans'] text-xl text-[#00236f] font-bold tracking-widest text-center border border-slate-200"
                                                    readOnly
                                                    type="text"
                                                    value="ENG882"
                                                />
                                                <button
                                                    className="absolute right-2 p-1 text-[#515f74] hover:text-[#00236f] cursor-pointer"
                                                    title="Tạo mã ngẫu nhiên mới"
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">autorenew</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#515f74] mb-1">Ngày diễn ra</label>
                                            <input
                                                className="w-full h-11 px-3 py-2 bg-white rounded-xl text-sm text-[#0b1c30] border border-slate-200"
                                                defaultValue="2024-10-18"
                                                type="date"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#515f74] mb-1">Khung giờ mở hệ thống</label>
                                            <div className="grid grid-cols-2 gap-1">
                                                <input
                                                    className="h-11 px-2 py-2 bg-white rounded-xl text-sm text-[#0b1c30] text-center border border-slate-200"
                                                    defaultValue="09:00"
                                                    type="time"
                                                />
                                                <input
                                                    className="h-11 px-2 py-2 bg-white rounded-xl text-sm text-[#0b1c30] text-center border border-slate-200"
                                                    defaultValue="10:30"
                                                    type="time"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Bước 3 với 2 Tùy Chọn */}
                            <div className="flex flex-col gap-4">
                                <div className="p-5 rounded-2xl bg-[#eff4ff] border border-blue-100/50 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-[#00236f] font-bold flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[18px]">description</span>
                                                Bước 3: Chọn &amp; Soạn Thảo Đề Thi
                                            </span>
                                            <span className="text-xs text-[#515f74] font-semibold">Thang điểm 10</span>
                                        </div>

                                        {/* Thanh chuyển đổi 2 Tùy Chọn */}
                                        <div className="p-1 bg-white rounded-xl border border-slate-200 flex items-center gap-1 mb-4 shadow-2xs">
                                            <button
                                                type="button"
                                                onClick={() => setQuestionSource("bank")}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                                    questionSource === "bank"
                                                        ? "bg-[#00236f] text-white shadow-xs"
                                                        : "text-[#515f74] hover:bg-slate-50"
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                                                <span>Ngân hàng câu hỏi</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setQuestionSource("custom")}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                                    questionSource === "custom"
                                                        ? "bg-[#00236f] text-white shadow-xs"
                                                        : "text-[#515f74] hover:bg-slate-50"
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                                                <span>Tự viết đề thi mới</span>
                                            </button>
                                        </div>

                                        {/* TÙY CHỌN 1: Sử dụng câu hỏi từ Ngân Hàng Đề Thi */}
                                        {questionSource === "bank" && (
                                            <div className="flex flex-col gap-3">
                                                <div className="relative">
                                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400">
                                                        search
                                                    </span>
                                                    <input
                                                        type="text"
                                                        placeholder="Tìm câu hỏi theo nội dung, chủ đề, mã..."
                                                        value={searchBankQuery}
                                                        onChange={(e) => setSearchBankQuery(e.target.value)}
                                                        className="w-full pl-9 pr-3 py-2 bg-white rounded-xl text-xs text-[#0b1c30] border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00236f]"
                                                    />
                                                </div>

                                                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                                                    {filteredQuestions.length === 0 ? (
                                                        <div className="p-4 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                                                            Không tìm thấy câu hỏi phù hợp trong ngân hàng.
                                                        </div>
                                                    ) : (
                                                        filteredQuestions.map((q) => {
                                                            const isSelected = selectedQuestionId === q.id;
                                                            return (
                                                                <div
                                                                    key={q.id}
                                                                    onClick={() => setSelectedQuestionId(q.id)}
                                                                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                                                                        isSelected
                                                                            ? "bg-[#dce9ff]/60 border-[#00236f] ring-1 ring-[#00236f]"
                                                                            : "bg-white border-slate-200 hover:border-blue-300"
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center justify-between mb-1.5">
                                                                        <span className="text-[11px] font-bold text-[#00236f] px-2 py-0.5 rounded bg-blue-100/70">
                                                                            {q.code}
                                                                        </span>
                                                                        <span className="text-[10px] text-slate-400 font-medium">
                                                                            {q.topic}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-xs text-[#0b1c30] leading-relaxed line-clamp-3">
                                                                        {q.content}
                                                                    </p>
                                                                </div>
                                                            );
                                                        })
                                                    )}
                                                </div>

                                                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/50 flex items-center justify-between text-xs text-[#00236f]">
                                                    <span className="font-semibold flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                        Đã chọn: {mockBankQuestions.find((q) => q.id === selectedQuestionId)?.code || "Chưa chọn"}
                                                    </span>
                                                    <span className="text-[11px] text-slate-500">Đề thi tự luận</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* TÙY CHỌN 2: Tự viết đề thi mới */}
                                        {questionSource === "custom" && (
                                            <div className="flex flex-col gap-3">
                                                <div>
                                                    <label className="block text-xs font-semibold text-[#515f74] mb-1">
                                                        Nội dung câu hỏi / Đề bài tự luận mới *
                                                    </label>
                                                    <textarea
                                                        className="w-full p-3 bg-white rounded-xl text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#00236f] resize-none border border-slate-200 shadow-2xs"
                                                        placeholder="Nhập chi tiết yêu cầu đề bài, câu hỏi tự luận, các tình huống phân tích..."
                                                        rows={7}
                                                        value={customQuestionContent}
                                                        onChange={(e) => setCustomQuestionContent(e.target.value)}
                                                    ></textarea>
                                                </div>

                                                {/* Checkbox tùy chọn lưu vào ngân hàng */}
                                                <label className="flex items-start gap-2 p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={saveToBank}
                                                        onChange={(e) => setSaveToBank(e.target.checked)}
                                                        className="mt-0.5 rounded text-[#00236f] focus:ring-[#00236f]"
                                                    />
                                                    <div className="text-xs">
                                                        <span className="font-semibold text-[#00236f]">
                                                            Đồng thời lưu câu hỏi này vào Ngân hàng câu hỏi
                                                        </span>
                                                        <p className="text-[11px] text-slate-500 mt-0.5">
                                                            Câu hỏi sẽ được gán vào môn học đang chọn để tái sử dụng cho các kỳ thi sau.
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 p-3 rounded-xl bg-white/80 border border-blue-100 flex items-center gap-2 text-xs text-slate-600">
                                        <span className="material-symbols-outlined text-blue-600 text-[18px]">info</span>
                                        <span>Bài thi và đề bài sẽ được đồng bộ trực tiếp tới máy chủ SafeExam khi phát hành.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-6 pt-4 border-t border-slate-100">
                            <button
                                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[20px]">send</span>
                                <span>Phát hành &amp; Tạo mã ca thi</span>
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
