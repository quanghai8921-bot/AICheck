"use client";

import React, { useState } from "react";

export default function CreateExamPage() {
    const [activeTab, setActiveTab] = useState<"create-tab" | "history-tab" | "queue-tab">("create-tab");
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f8f9ff] font-sans text-[#0b1c30] antialiased">

            {/* Main Workspace Area */}
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 pt-6 w-full px-6 py-6 bg-[#f8f9ff]">
                    <div className="flex flex-col w-full">
                        {/* Top Welcome Banner */}
                        <section className="relative overflow-hidden bg-white p-6 rounded-xl shadow-sm mb-6">
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
                                            <span className="px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#444651] text-xs">
                                                MSGV: GV2024-1049
                                            </span>
                                        </div>
                                        <p className="text-base text-[#515f74] mt-1">
                                            Bộ môn Khoa Học Máy Tính &amp; Trí Tuệ Nhân Tạo • Viện Công Nghệ Thông Tin &amp; Truyền Thông
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 bg-[#eff4ff] px-4 py-2.5 rounded-full self-stretch xl:self-auto justify-between xl:justify-start">
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#004a31]"></span>
                                        </span>
                                        <span className="text-sm text-[#0b1c30] font-semibold">Phòng LAB-04 trực tiếp</span>
                                    </div>
                                    <span className="text-[#757682]">|</span>
                                    <span className="text-xs text-[#515f74]">Ca thi: 14:00 hôm nay</span>
                                    <button
                                        className="px-3 py-1 rounded-full bg-[#00236f] text-white text-xs hover:bg-[#1e3a8a] transition-all"
                                        type="button"
                                    >
                                        Vào giám sát
                                    </button>
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-4 border-t-0">
                                <div className="p-4 rounded-xl bg-[#eff4ff] flex flex-col justify-between transition-all hover:bg-[#e5eeff]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs uppercase tracking-wider text-[#515f74]">Tổng đề thi đã tạo</span>
                                        <span className="p-1.5 rounded-lg bg-[#d3e4fe] text-[#00236f]">
                                            <span className="material-symbols-outlined text-[18px]">history_edu</span>
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-['Plus_Jakarta_Sans'] text-3xl text-[#00236f] font-bold">14</span>
                                        <span className="text-xs text-[#515f74]">đề thi lưu hành</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1 text-xs text-[#00311f] font-semibold">
                                        <span className="material-symbols-outlined text-[14px]">sensors</span>
                                        <span>4 đề đang diễn ra tuần này</span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-[#eff4ff] flex flex-col justify-between transition-all hover:bg-[#e5eeff]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs uppercase tracking-wider text-[#515f74]">Bài nộp chờ chấm</span>
                                        <span className="p-1.5 rounded-lg bg-[#d5e3fd] text-[#57657b]">
                                            <span className="material-symbols-outlined text-[18px]">pending_actions</span>
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-['Plus_Jakarta_Sans'] text-3xl text-[#0b1c30] font-bold">86</span>
                                        <span className="text-xs text-[#515f74]">bài tự luận</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1 text-xs text-[#515f74] font-medium">
                                        <span className="material-symbols-outlined text-[14px]">done_all</span>
                                        <span>Từ 2 ca thi vừa đóng đề</span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-[#eff4ff] flex flex-col justify-between transition-all hover:bg-[#e5eeff]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs uppercase tracking-wider text-[#515f74]">Liêm chính học thuật</span>
                                        <span className="p-1.5 rounded-lg bg-[#d3e4fe] text-[#004a31]">
                                            <span className="material-symbols-outlined text-[18px]">verified_user</span>
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-['Plus_Jakarta_Sans'] text-3xl text-[#00236f] font-bold">98.4%</span>
                                        <span className="text-xs text-[#515f74]">đạt chuẩn ISO</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1 text-xs text-[#00311f] font-semibold">
                                        <span className="material-symbols-outlined text-[14px]">shield</span>
                                        <span>AI &amp; SafeExam kiểm duyệt</span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-[#eff4ff] flex flex-col justify-between transition-all hover:bg-[#e5eeff]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs uppercase tracking-wider text-[#515f74]">Lịch ca trực kế tiếp</span>
                                        <span className="p-1.5 rounded-lg bg-[#d3e4fe] text-[#00236f]">
                                            <span className="material-symbols-outlined text-[18px]">videocam</span>
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-['Plus_Jakarta_Sans'] text-3xl text-[#0b1c30] font-bold">14:00</span>
                                        <span className="text-xs text-[#515f74]">Hôm nay</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1 text-xs text-[#515f74]">
                                        <span className="material-symbols-outlined text-[14px]">domain</span>
                                        <span>Phòng LAB-04 (60 máy thi)</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Segmented Controller / Task Switcher */}
                        <div className="bg-white p-2 rounded-xl shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div className="grid grid-cols-1 sm:grid-cols-3 w-full sm:w-auto gap-2">
                                <button
                                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm transition-all ${activeTab === "create-tab"
                                        ? "bg-[#1e3a8a] text-white font-bold shadow-sm"
                                        : "text-[#515f74] hover:bg-[#dce9ff] hover:text-[#0b1c30]"
                                        }`}
                                    onClick={() => setActiveTab("create-tab")}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                                    <span>1. Tạo bài thi mới</span>
                                </button>
                                <button
                                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm transition-all ${activeTab === "history-tab"
                                        ? "bg-[#1e3a8a] text-white font-bold shadow-sm"
                                        : "text-[#515f74] hover:bg-[#dce9ff] hover:text-[#0b1c30]"
                                        }`}
                                    onClick={() => setActiveTab("history-tab")}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                                    <span>2. Lịch sử bài thi đã tạo</span>
                                </button>
                                <button
                                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm transition-all relative ${activeTab === "queue-tab"
                                        ? "bg-[#1e3a8a] text-white font-bold shadow-sm"
                                        : "text-[#515f74] hover:bg-[#dce9ff] hover:text-[#0b1c30]"
                                        }`}
                                    onClick={() => setActiveTab("queue-tab")}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                                    <span>3. Nhận bài &amp; Chấm thi</span>
                                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#d5e3fd] text-[#57657b] text-[11px] font-bold">
                                        58
                                    </span>
                                </button>
                            </div>
                            <div className="hidden lg:flex items-center gap-2 pr-2 text-[#515f74] text-xs">
                                <span className="material-symbols-outlined text-[16px]">sync</span>
                                <span>Đồng bộ máy chủ khảo thí trung tâm</span>
                            </div>
                        </div>

                        {/* TAB CONTENT 1: TẠO BÀI THI MỚI */}
                        {activeTab === "create-tab" && (
                            <section className="flex flex-col gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pb-4 border-b-0">
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
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1 rounded-full bg-[#e5eeff] text-[#444651] text-xs">
                                                Mã định danh tự động: <strong className="text-[#00236f] font-bold">EXAM-2024-Q4</strong>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Step Indicator */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 my-4 py-2 bg-[#eff4ff] p-2 rounded-xl">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white text-[#00236f] shadow-xs">
                                            <span className="w-6 h-6 rounded-full bg-[#00236f] text-white text-xs flex items-center justify-center font-bold">
                                                1
                                            </span>
                                            <span className="text-xs font-semibold">Thông tin học phần</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#515f74]">
                                            <span className="w-6 h-6 rounded-full bg-[#dce9ff] text-[#444651] text-xs flex items-center justify-center font-bold">
                                                2
                                            </span>
                                            <span className="text-xs">Thời gian &amp; Bảo mật</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#515f74]">
                                            <span className="w-6 h-6 rounded-full bg-[#dce9ff] text-[#444651] text-xs flex items-center justify-center font-bold">
                                                3
                                            </span>
                                            <span className="text-xs">Nội dung &amp; Rubric</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#515f74]">
                                            <span className="w-6 h-6 rounded-full bg-[#dce9ff] text-[#444651] text-xs flex items-center justify-center font-bold">
                                                4
                                            </span>
                                            <span className="text-xs">AI Proctoring &amp; Duyệt</span>
                                        </div>
                                    </div>

                                    {/* Two Column Form */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                                        {/* Left Column */}
                                        <div className="flex flex-col gap-4">
                                            <div className="p-4 rounded-xl bg-[#eff4ff]">
                                                <span className="text-sm text-[#00236f] font-bold flex items-center gap-2 mb-2">
                                                    <span className="material-symbols-outlined text-[18px]">menu_book</span>
                                                    Bước 1: Chọn Học Phần &amp; Quy Mô Ca Thi
                                                </span>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-xs text-[#515f74] mb-1">Môn học / Học phần khảo thí *</label>
                                                        <select className="w-full h-11 px-3 py-2 bg-white rounded-xl text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#00236f]">
                                                            <option defaultValue="CS201">CS201 - Cấu Trúc Dữ Liệu &amp; Giải Thuật Ứng Dụng</option>
                                                            <option>OOP301 - Kỹ Thuật Lập Trình Hướng Đối Tượng</option>
                                                            <option>AI402 - Nhập Môn Trí Tuệ Nhân Tạo &amp; Học Máy</option>
                                                            <option>NET105 - Mạng Máy Tính Nâng Cao</option>
                                                        </select>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-xs text-[#515f74] mb-1">Khóa học / Niên khóa</label>
                                                            <input
                                                                className="w-full h-11 px-3 py-2 bg-white rounded-xl text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
                                                                defaultValue="Khóa K2024 - Học kỳ 1"
                                                                type="text"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs text-[#515f74] mb-1">Hình thức bài thi</label>
                                                            <select className="w-full h-11 px-3 py-2 bg-white rounded-xl text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#00236f]">
                                                                <option defaultValue="tuluan">Tự luận viết học thuật</option>
                                                                <option>Kết hợp tự luận &amp; Mã nguồn code</option>
                                                                <option>Tiểu luận phân tích tình huống</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-xl bg-[#eff4ff]">
                                                <span className="text-sm text-[#00236f] font-bold flex items-center gap-2 mb-2">
                                                    <span className="material-symbols-outlined text-[18px]">timer</span>
                                                    Bước 2: Cấu Hình Thời Gian &amp; Mã Ca Thi
                                                </span>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs text-[#515f74] mb-1">Thời lượng làm bài</label>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <button
                                                                className="h-11 rounded-xl bg-[#00236f] text-white text-xs font-semibold"
                                                                type="button"
                                                            >
                                                                90 Phút
                                                            </button>
                                                            <button
                                                                className="h-11 rounded-xl bg-white text-[#515f74] text-xs hover:bg-[#dce9ff]"
                                                                type="button"
                                                            >
                                                                120 Phút
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-[#515f74] mb-1">Passcode Mở Đề (6 Ký tự)</label>
                                                        <div className="relative flex items-center">
                                                            <input
                                                                className="w-full h-11 px-3 py-2 bg-white rounded-xl font-['Plus_Jakarta_Sans'] text-xl text-[#00236f] font-bold tracking-widest text-center"
                                                                readOnly
                                                                type="text"
                                                                value="ENG882"
                                                            />
                                                            <button
                                                                className="absolute right-2 p-1 text-[#515f74] hover:text-[#00236f]"
                                                                title="Tạo mã ngẫu nhiên mới"
                                                                type="button"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">autorenew</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-[#515f74] mb-1">Ngày diễn ra</label>
                                                        <input
                                                            className="w-full h-11 px-3 py-2 bg-white rounded-xl text-sm text-[#0b1c30]"
                                                            defaultValue="2024-10-18"
                                                            type="date"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-[#515f74] mb-1">Khung giờ mở hệ thống</label>
                                                        <div className="grid grid-cols-2 gap-1">
                                                            <input
                                                                className="h-11 px-2 py-2 bg-white rounded-xl text-sm text-[#0b1c30] text-center"
                                                                defaultValue="09:00"
                                                                type="time"
                                                            />
                                                            <input
                                                                className="h-11 px-2 py-2 bg-white rounded-xl text-sm text-[#0b1c30] text-center"
                                                                defaultValue="10:30"
                                                                type="time"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="flex flex-col gap-4">
                                            <div className="p-4 rounded-xl bg-[#eff4ff]">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-[#00236f] font-bold flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-[18px]">description</span>
                                                        Bước 3: Nội Dung Đề &amp; Tiêu Chí Rubric
                                                    </span>
                                                    <span className="text-xs text-[#515f74]">Tối đa 10 điểm</span>
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-[#515f74] mb-1">
                                                        Tóm tắt yêu cầu đề bài hoặc chỉ dẫn thi
                                                    </label>
                                                    <textarea
                                                        className="w-full p-3 bg-white rounded-xl text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#00236f] resize-none"
                                                        placeholder="Nhập hướng dẫn làm bài, cấu trúc câu hỏi tự luận, quy định định dạng file đính kèm..."
                                                        rows={3}
                                                    ></textarea>
                                                </div>
                                                <div className="mt-3 p-3 rounded-xl bg-white flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-[#00236f] text-[24px]">
                                                            cloud_upload
                                                        </span>
                                                        <div>
                                                            <p className="text-xs text-[#0b1c30] font-semibold">Tải tệp đề PDF mã hóa AES-256</p>
                                                            <p className="text-xs text-[#515f74]">Hỗ trợ PDF, DOCX (Tối đa 25MB)</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="px-3 py-1.5 rounded-lg bg-[#dce9ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs"
                                                        type="button"
                                                    >
                                                        Chọn tệp
                                                    </button>
                                                </div>

                                                {/* Rubric Breakdown */}
                                                <div className="mt-3 space-y-1.5">
                                                    <span className="block text-xs text-[#515f74] font-semibold">
                                                        Thang điểm Rubric chuẩn hóa
                                                    </span>
                                                    <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white text-sm">
                                                        <span>1. Phân tích thuật toán &amp; Thiết kế cấu trúc</span>
                                                        <span className="font-bold text-[#00236f]">40% (4.0 đ)</span>
                                                    </div>
                                                    <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white text-sm">
                                                        <span>2. Hiện thực hóa mã giả &amp; Khả năng tối ưu độ phức tạp</span>
                                                        <span className="font-bold text-[#00236f]">40% (4.0 đ)</span>
                                                    </div>
                                                    <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white text-sm">
                                                        <span>3. Liêm chính học thuật &amp; Trình bày luận văn</span>
                                                        <span className="font-bold text-[#00311f]">20% (2.0 đ)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-xl bg-[#eff4ff]">
                                                <span className="text-sm text-[#00236f] font-bold flex items-center gap-2 mb-2">
                                                    <span className="material-symbols-outlined text-[18px]">security</span>
                                                    Bước 4: Cấu Hình Phòng Thi An Toàn &amp; AI Giám Sát
                                                </span>
                                                <div className="space-y-2.5">
                                                    <label className="flex items-center justify-between p-2.5 rounded-lg bg-white cursor-pointer">
                                                        <div className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-[#00311f] text-[20px]">
                                                                videocam
                                                            </span>
                                                            <div>
                                                                <p className="text-xs text-[#0b1c30] font-semibold">Giám sát Camera AI liên tục</p>
                                                                <p className="text-xs text-[#515f74]">
                                                                    Phát hiện quay đầu, vắng mặt hoặc nhiều khuôn mặt
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <input
                                                            defaultChecked
                                                            className="w-4 h-4 accent-[#00236f] rounded"
                                                            type="checkbox"
                                                        />
                                                    </label>
                                                    <label className="flex items-center justify-between p-2.5 rounded-lg bg-white cursor-pointer">
                                                        <div className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-[#00236f] text-[20px]">
                                                                screen_lock_rotation
                                                            </span>
                                                            <div>
                                                                <p className="text-xs text-[#0b1c30] font-semibold">
                                                                    Khóa môi trường trình duyệt (SafeExam)
                                                                </p>
                                                                <p className="text-xs text-[#515f74]">
                                                                    Ngăn chặn chuyển tab, mở công cụ tra cứu bên ngoài
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <input
                                                            defaultChecked
                                                            className="w-4 h-4 accent-[#00236f] rounded"
                                                            type="checkbox"
                                                        />
                                                    </label>
                                                    <label className="flex items-center justify-between p-2.5 rounded-lg bg-white cursor-pointer">
                                                        <div className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-[#515f74] text-[20px]">
                                                                content_paste_off
                                                            </span>
                                                            <div>
                                                                <p className="text-xs text-[#0b1c30] font-semibold">
                                                                    Vô hiệu hóa sao chép / dán (Copy-Paste Lock)
                                                                </p>
                                                                <p className="text-xs text-[#515f74]">
                                                                    Bắt buộc sinh viên gõ văn bản trực tiếp trên editor
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <input
                                                            defaultChecked
                                                            className="w-4 h-4 accent-[#00236f] rounded"
                                                            type="checkbox"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Action Buttons */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t-0">
                                        <div className="flex items-center gap-2 text-[#515f74] text-xs">
                                            <span className="material-symbols-outlined text-[#00311f] text-[18px]">
                                                check_circle
                                            </span>
                                            <span>Bản nháp được tự động lưu lên máy chủ đám mây cách đây 1 phút</span>
                                        </div>
                                        <div className="flex items-center gap-2 w-full sm:w-auto">
                                            <button
                                                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#dce9ff] text-[#0b1c30] text-sm hover:bg-[#e5eeff] transition-all"
                                                type="button"
                                            >
                                                Lưu bản nháp
                                            </button>
                                            <button
                                                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#dce9ff] text-[#0b1c30] text-sm hover:bg-[#e5eeff] transition-all flex items-center justify-center gap-1"
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                                                <span>Xem trước giao diện SV</span>
                                            </button>
                                            <button
                                                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#00236f] text-white text-sm hover:bg-[#1e3a8a] transition-all shadow-sm flex items-center justify-center gap-2 font-bold"
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">send</span>
                                                <span>Phát hành &amp; Tạo mã ca thi</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* TAB CONTENT 2: LỊCH SỬ BÀI THI ĐÃ TẠO */}
                        {activeTab === "history-tab" && (
                            <section className="flex flex-col gap-6">
                                {/* Search & Filter Controls */}
                                <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                                        <span className="text-xs text-[#515f74] uppercase tracking-wider">Lọc ca thi:</span>
                                        <button
                                            className="px-3 py-1.5 rounded-xl bg-[#00236f] text-white text-xs font-semibold"
                                            type="button"
                                        >
                                            Tất cả (14)
                                        </button>
                                        <button
                                            className="px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[#515f74] hover:bg-[#dce9ff] text-xs"
                                            type="button"
                                        >
                                            Đang mở đề (4)
                                        </button>
                                        <button
                                            className="px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[#515f74] hover:bg-[#dce9ff] text-xs"
                                            type="button"
                                        >
                                            Đã chấm xong (8)
                                        </button>
                                        <button
                                            className="px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[#515f74] hover:bg-[#dce9ff] text-xs"
                                            type="button"
                                        >
                                            Bản nháp (2)
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 w-full md:w-auto">
                                        <div className="relative w-full md:w-72">
                                            <span className="material-symbols-outlined text-[#515f74] absolute left-3 top-2.5 text-[20px]">
                                                search
                                            </span>
                                            <input
                                                className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#eff4ff] text-sm text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
                                                placeholder="Tìm theo tên học phần hoặc mã đề..."
                                                type="text"
                                            />
                                        </div>
                                        <select className="h-10 px-3 bg-[#eff4ff] rounded-xl text-xs text-[#515f74]">
                                            <option>HK 1 (2024 - 2025)</option>
                                            <option>HK 2 (2023 - 2024)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Exam Cards List */}
                                <div className="flex flex-col gap-4">
                                    {/* Exam Card 1: Live Active */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm transition-all hover:shadow-md">
                                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#d3e4fe] text-[#004a31] flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined text-[28px]">desktop_windows</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="px-2.5 py-0.5 rounded-full bg-[#4edea3]/40 text-[#005236] text-xs font-bold flex items-center gap-1">
                                                            <span className="w-2 h-2 rounded-full bg-[#004a31] animate-pulse"></span>
                                                            ĐANG MỞ ĐỀ &amp; THU BÀI
                                                        </span>
                                                        <span className="text-xs text-[#515f74]">
                                                            Mã ca: <strong className="text-[#0b1c30]">CS201-98</strong>
                                                        </span>
                                                        <span className="text-xs text-[#515f74]">
                                                            Passcode:{" "}
                                                            <strong className="text-[#00236f] font-mono bg-[#e5eeff] px-2 py-0.5 rounded">
                                                                ENG882
                                                            </strong>
                                                        </span>
                                                    </div>
                                                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#00236f] font-bold mt-1">
                                                        CS201 - Cấu Trúc Dữ Liệu &amp; Giải Thuật Ứng Dụng (Giữa Kỳ K2024)
                                                    </h3>
                                                    <p className="text-sm text-[#515f74] mt-0.5">
                                                        Ngày thi: Hôm nay, 14/10/2024 • Khung giờ: Ca 02 (09:30 - 11:30) • Hình thức: Tự luận giải thuật trực tuyến
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 self-stretch lg:self-auto justify-between lg:justify-end bg-[#eff4ff] lg:bg-transparent p-2 lg:p-0 rounded-xl">
                                                <div className="text-left lg:text-right">
                                                    <span className="block text-xs text-[#515f74]">Tiến độ nộp bài</span>
                                                    <span className="font-['Plus_Jakarta_Sans'] text-lg text-[#00311f] font-bold">
                                                        58 / 60 SV
                                                    </span>
                                                    <div className="w-32 h-2 bg-[#d3e4fe] rounded-full overflow-hidden mt-1">
                                                        <div className="h-full bg-[#004a31] rounded-full" style={{ width: "96%" }}></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="px-4 py-2 rounded-xl bg-[#00236f] text-white text-xs font-semibold hover:bg-[#1e3a8a] transition-all flex items-center gap-1"
                                                        onClick={() => setActiveTab("queue-tab")}
                                                        type="button"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">preview</span>
                                                        <span>Xem phòng thi</span>
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 rounded-xl bg-[#dce9ff] text-[#0b1c30] text-xs hover:bg-[#ffdad6] hover:text-[#ba1a1a] transition-all"
                                                        title="Khóa ca thi ngay lập tức"
                                                        type="button"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">lock</span>
                                                    </button>
                                                    <button
                                                        className="p-2 rounded-xl bg-[#dce9ff] text-[#515f74] hover:text-[#0b1c30]"
                                                        title="Xuất toàn bộ bài nộp .ZIP"
                                                        type="button"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">download</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Exam Card 2: Completed */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm transition-all hover:shadow-md">
                                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#e5eeff] text-[#00236f] flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined text-[28px]">task_alt</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="px-2.5 py-0.5 rounded-full bg-[#d5e3fd] text-[#57657b] text-xs font-semibold">
                                                            ĐÃ ĐÓNG CA - ĐÃ CHẤM XONG 100%
                                                        </span>
                                                        <span className="text-xs text-[#515f74]">
                                                            Mã ca: <strong className="text-[#0b1c30]">OOP301-A1</strong>
                                                        </span>
                                                        <span className="text-xs text-[#00311f] font-semibold">Điểm TB: 8.4 / 10</span>
                                                    </div>
                                                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#0b1c30] font-bold mt-1">
                                                        OOP301 - Kỹ Thuật Lập Trình Hướng Đối Tượng (Bài Thi Cuối Kỳ)
                                                    </h3>
                                                    <p className="text-sm text-[#515f74] mt-0.5">
                                                        Ngày thi: 28/09/2024 • Tổng bài thi nộp: 72/72 • Đã công bố kết quả học tập
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 self-stretch lg:self-auto justify-end">
                                                <button
                                                    className="px-4 py-2 rounded-xl bg-[#dce9ff] text-[#0b1c30] text-xs hover:bg-[#e5eeff] transition-all flex items-center gap-1"
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">table_view</span>
                                                    <span>Xem bảng điểm</span>
                                                </button>
                                                <button
                                                    className="px-4 py-2 rounded-xl bg-[#eff4ff] text-[#515f74] text-xs hover:bg-[#dce9ff] transition-all flex items-center gap-1"
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">rate_review</span>
                                                    <span>Phúc khảo (02)</span>
                                                </button>
                                                <button
                                                    className="px-4 py-2 rounded-xl bg-[#eff4ff] text-[#515f74] text-xs hover:bg-[#dce9ff] transition-all flex items-center gap-1"
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">print</span>
                                                    <span>Báo cáo</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Exam Card 3: Scheduled */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm transition-all hover:shadow-md">
                                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#dce9ff] text-[#515f74] flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined text-[28px]">calendar_clock</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold">
                                                            LÊN LỊCH TỰ ĐỘNG
                                                        </span>
                                                        <span className="text-xs text-[#515f74]">
                                                            Mã ca: <strong className="text-[#0b1c30]">AI402-Q2</strong>
                                                        </span>
                                                        <span className="text-xs text-[#515f74]">Dự kiến 85 sinh viên</span>
                                                    </div>
                                                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#0b1c30] font-bold mt-1">
                                                        AI402 - Nhập Môn Trí Tuệ Nhân Tạo &amp; Học Máy (Thi Cuối Kỳ Dự Kiến)
                                                    </h3>
                                                    <p className="text-sm text-[#515f74] mt-0.5">
                                                        Ngày mở đề: 20/10/2024 • Khung giờ: 14:00 - 16:00 (120 phút) • Chế độ: Giám sát toàn cảnh
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 self-stretch lg:self-auto justify-end">
                                                <button
                                                    className="px-4 py-2 rounded-xl bg-[#dce9ff] text-[#0b1c30] text-xs hover:bg-[#e5eeff] transition-all flex items-center gap-1"
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    <span>Chỉnh sửa đề</span>
                                                </button>
                                                <button
                                                    className="px-4 py-2 rounded-xl bg-[#eff4ff] text-[#515f74] text-xs hover:bg-[#dce9ff] transition-all flex items-center gap-1"
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                                                    <span>Đổi giờ thi</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* TAB CONTENT 3: NHẬN BÀI CỦA SINH VIÊN & CHẤM THI */}
                        {activeTab === "queue-tab" && (
                            <section className="flex flex-col gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b-0">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="relative flex h-2.5 w-2.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#004a31]"></span>
                                                </span>
                                                <span className="text-xs text-[#00311f] font-bold uppercase tracking-wider">
                                                    Cập nhật thời gian thực (Websocket Sync)
                                                </span>
                                                <span className="text-[#c5c5d3]">•</span>
                                                <span className="text-xs text-[#515f74]">Độ trễ máy chủ: 14ms</span>
                                            </div>
                                            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#00236f] font-bold">
                                                Hàng Đợi Tiếp Nhận Bài Thi &amp; Phân Luồng Chấm Tự Luận
                                            </h2>
                                            <p className="text-sm text-[#515f74] mt-1">
                                                Ca thi: <strong>CS201 - Cấu Trúc Dữ Liệu &amp; Giải Thuật</strong> | Phòng máy LAB-01 &amp; Thí sinh làm từ xa
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="px-4 py-2 rounded-xl bg-[#dce9ff] text-[#0b1c30] text-xs hover:bg-[#e5eeff] flex items-center gap-1"
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                                <span>Lọc trạng thái chấm</span>
                                            </button>
                                            <button
                                                className="px-4 py-2 rounded-xl bg-[#00236f] text-white text-xs hover:bg-[#1e3a8a] flex items-center gap-1 font-bold"
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                                                <span>Tải tệp nộp tất cả</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Realtime Ingestion Metrics */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 p-4 bg-[#eff4ff] rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#d3e4fe] text-[#004a31] flex items-center justify-center font-bold">
                                                <span className="material-symbols-outlined text-[22px]">check_circle</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-[#515f74]">Đã nộp thành công</span>
                                                <p className="font-['Plus_Jakarta_Sans'] text-lg text-[#00236f] font-bold">
                                                    58 / 60 Sinh viên
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#d3e4fe] text-[#444651] flex items-center justify-center font-bold">
                                                <span className="material-symbols-outlined text-[22px]">hourglass_top</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-[#515f74]">Đang trong 5 phút chót</span>
                                                <p className="font-['Plus_Jakarta_Sans'] text-lg text-[#0b1c30] font-bold">
                                                    02 Sinh viên
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#d3e4fe] text-[#004a31] flex items-center justify-center font-bold">
                                                <span className="material-symbols-outlined text-[22px]">verified</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-[#515f74]">Vi phạm quy chế</span>
                                                <p className="font-['Plus_Jakarta_Sans'] text-lg text-[#00311f] font-bold">
                                                    0 Phát hiện
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submissions Table */}
                                    <div className="overflow-x-auto mt-6">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-[#eff4ff] text-[#515f74] text-xs uppercase tracking-wider">
                                                    <th className="p-4 rounded-l-xl">Sinh viên &amp; Mã số</th>
                                                    <th className="p-4">Thời điểm nộp</th>
                                                    <th className="p-4">Dung lượng &amp; Bài nộp</th>
                                                    <th className="p-4">Liêm chính AI &amp; Giám sát</th>
                                                    <th className="p-4">Đánh giá &amp; Điểm</th>
                                                    <th className="p-4 rounded-r-xl text-right">Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-transparent text-sm text-[#0b1c30]">
                                                {/* Student 1 */}
                                                <tr className="hover:bg-[#eff4ff]/70 transition-colors">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-10 h-10 rounded-full bg-[#dce1ff] text-[#00236f] font-bold flex items-center justify-center flex-shrink-0">
                                                                NA
                                                            </div>
                                                            <div>
                                                                <span className="text-xs font-bold text-[#0b1c30] block">Nguyễn Văn An</span>
                                                                <span className="text-xs text-[#515f74]">MSSV: SV2024-8841 • Lớp: CS201.01</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-[#0b1c30] font-semibold">11:15:22 NTP</span>
                                                            <span className="text-xs text-[#00311f]">Sớm 14 phút • Hash SHA-256</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-[#0b1c30] font-medium">2,450 từ (Bài luận)</span>
                                                            <span className="text-xs text-[#515f74]">
                                                                +1 File code: <code className="text-[#00236f] font-mono text-[11px]">binary_tree.cpp</code>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#00311f] text-xs font-bold flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-[14px]">verified</span>
                                                                AI: 3.2% (An toàn)
                                                            </span>
                                                            <span className="text-xs text-[#515f74]" title="Số lần rời màn hình thi">
                                                                0 vi phạm
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="px-3 py-1 rounded-full bg-[#dce1ff] text-[#00236f] text-xs font-bold">
                                                            Đã chấm: 9.0 / 10
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <button
                                                                className="px-3 py-1.5 rounded-lg bg-[#e5eeff] text-[#0b1c30] text-xs hover:bg-[#dce9ff] transition-all flex items-center gap-1"
                                                                type="button"
                                                            >
                                                                <span className="material-symbols-outlined text-[16px]">visibility</span>
                                                                <span>Xem bài</span>
                                                            </button>
                                                            <button
                                                                className="p-1.5 rounded-lg bg-[#e5eeff] text-[#515f74] hover:text-[#00236f] transition-all"
                                                                title="Xem nhật ký giám sát camera"
                                                                type="button"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">videocam</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Student 2 */}
                                                <tr className="hover:bg-[#eff4ff]/70 transition-colors bg-[#eff4ff]/30">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-10 h-10 rounded-full bg-[#d5e3fd] text-[#57657b] font-bold flex items-center justify-center flex-shrink-0">
                                                                MP
                                                            </div>
                                                            <div>
                                                                <span className="text-xs font-bold text-[#0b1c30] block">Trần Thị Mai Phương</span>
                                                                <span className="text-xs text-[#515f74]">MSSV: SV2024-9102 • Lớp: CS201.01</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-[#0b1c30] font-semibold">11:28:40 NTP</span>
                                                            <span className="text-xs text-[#515f74]">Sớm 1 phút • Hash SHA-256</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-[#0b1c30] font-medium">1,980 từ (Bài luận)</span>
                                                            <span className="text-xs text-[#515f74]">
                                                                +1 File code: <code className="text-[#00236f] font-mono text-[11px]">dijkstra.cpp</code>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#00311f] text-xs font-bold flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-[14px]">verified</span>
                                                                AI: 4.8% (An toàn)
                                                            </span>
                                                            <span className="text-xs text-[#515f74]">0 vi phạm</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="px-3 py-1 rounded-full bg-[#d3e4fe] text-[#515f74] text-xs font-semibold">
                                                            Chờ giảng viên chấm
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <button
                                                                className="px-3 py-1.5 rounded-lg bg-[#00236f] text-white text-xs hover:bg-[#1e3a8a] transition-all flex items-center gap-1 font-bold shadow-xs"
                                                                type="button"
                                                            >
                                                                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                                                                <span>Chấm bài ngay</span>
                                                            </button>
                                                            <button
                                                                className="p-1.5 rounded-lg bg-[#e5eeff] text-[#515f74] hover:text-[#00236f] transition-all"
                                                                title="Xem nhật ký giám sát camera"
                                                                type="button"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">videocam</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Student 3 */}
                                                <tr className="hover:bg-[#eff4ff]/70 transition-colors">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-10 h-10 rounded-full bg-[#b6c4ff] text-[#00236f] font-bold flex items-center justify-center flex-shrink-0">
                                                                HP
                                                            </div>
                                                            <div>
                                                                <span className="text-xs font-bold text-[#0b1c30] block">Lê Hoàng Phúc</span>
                                                                <span className="text-xs text-[#515f74]">MSSV: SV2024-7832 • Lớp: CS201.02</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-[#0b1c30] font-semibold">11:29:10 NTP</span>
                                                            <span className="text-xs text-[#515f74]">Đúng giờ • Hash SHA-256</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-[#0b1c30] font-medium">2,120 từ (Bài luận)</span>
                                                            <span className="text-xs text-[#515f74]">+1 File PDF phân tích</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#00311f] text-xs font-bold flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-[14px]">verified</span>
                                                                AI: 1.5% (Tuyệt đối)
                                                            </span>
                                                            <span className="text-xs text-[#515f74]">0 vi phạm</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="px-3 py-1 rounded-full bg-[#dce1ff] text-[#00236f] text-xs font-bold">
                                                            Đã chấm: 8.5 / 10
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <button
                                                                className="px-3 py-1.5 rounded-lg bg-[#e5eeff] text-[#0b1c30] text-xs hover:bg-[#dce9ff] transition-all flex items-center gap-1"
                                                                type="button"
                                                            >
                                                                <span className="material-symbols-outlined text-[16px]">visibility</span>
                                                                <span>Xem lại</span>
                                                            </button>
                                                            <button
                                                                className="p-1.5 rounded-lg bg-[#e5eeff] text-[#515f74] hover:text-[#00236f] transition-all"
                                                                title="Xem nhật ký giám sát camera"
                                                                type="button"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">videocam</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Table Footer */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t-0 text-xs text-[#515f74]">
                                        <div>
                                            <span>
                                                Hiển thị <strong>1 - 3</strong> trong tổng số <strong>58</strong> bài đã tiếp nhận
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button className="px-3 py-1 rounded-lg bg-[#eff4ff] text-[#515f74] hover:bg-[#e5eeff]" type="button">
                                                Trước
                                            </button>
                                            <button className="px-3 py-1 rounded-lg bg-[#00236f] text-white font-bold" type="button">
                                                1
                                            </button>
                                            <button className="px-3 py-1 rounded-lg bg-[#eff4ff] text-[#515f74] hover:bg-[#e5eeff]" type="button">
                                                2
                                            </button>
                                            <button className="px-3 py-1 rounded-lg bg-[#eff4ff] text-[#515f74] hover:bg-[#e5eeff]" type="button">
                                                3
                                            </button>
                                            <button className="px-3 py-1 rounded-lg bg-[#eff4ff] text-[#515f74] hover:bg-[#e5eeff]" type="button">
                                                Sau
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full bg-white shadow-[0_-1px_6px_rgba(0,0,0,0.03)] py-4 px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#515f74] text-sm">
                        <div>
                            <span>
                                © 2025 Hội Đồng Khảo Thí &amp; Đảm Bảo Chất Lượng Giáo Dục. Hotline:{" "}
                                <strong className="text-[#0b1c30] font-semibold">1900 6886</strong>
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                            <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] font-semibold">
                                ISO/IEC 27001
                            </span>
                            <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] font-semibold">
                                NEAS QUALITY ACCREDITED
                            </span>
                            <span className="text-[#00311f] flex items-center gap-1 font-semibold">
                                <span className="material-symbols-outlined text-[14px]">verified</span>
                                Đảm bảo chuẩn học thuật
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
