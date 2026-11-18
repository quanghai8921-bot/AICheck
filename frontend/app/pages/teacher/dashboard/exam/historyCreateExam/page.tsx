"use client";

import React, { useState } from "react";

export default function ExamHistoryPage() {
    const [selectedSemester, setSelectedSemester] = useState("hk1-24-25");
    const [activeFilter, setActiveFilter] = useState("all");

    return (
        <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] antialiased">

            {/* Main Container */}
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 pt-2 w-full px-6 bg-[#f8f9ff] pb-4">
                    <div className="flex flex-col w-full pt-4">
                        {/* Top Hero / Banner Overview */}
                        <section className="relative w-full rounded-2xl bg-white p-6 mb-6 shadow-sm overflow-hidden">
                            <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-[#dce1ff]/30 blur-3xl pointer-events-none"></div>
                            <div className="absolute right-64 -bottom-20 w-80 h-80 rounded-full bg-[#6ffbbe]/20 blur-2xl pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="flex flex-col max-w-2xl">
                                    {/* Breadcrumbs */}
                                    <nav
                                        aria-label="Breadcrumb"
                                        className="flex items-center gap-1 text-[#515f74] text-xs font-semibold mb-1"
                                    >
                                        <a className="hover:text-[#00236f] transition-colors flex items-center gap-1" href="#">
                                            <span className="material-symbols-outlined text-[15px]">home</span> Trang chủ
                                        </a>
                                        <span className="text-[#c5c5d3]">/</span>
                                        <span className="hover:text-[#00236f] transition-colors cursor-pointer">
                                            Quản lý bài thi
                                        </span>
                                        <span className="text-[#c5c5d3]">/</span>
                                        <span className="text-[#00236f] font-semibold">Lịch sử đề thi</span>
                                    </nav>

                                    <h1 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#00236f] tracking-tight">
                                        Lịch Sử Bài Thi Đã Tạo
                                    </h1>
                                    <p className="text-base text-[#515f74] mt-1">
                                        Hệ thống lưu trữ, giám sát thời gian thực và quản lý hội đồng khảo thí học kỳ I
                                        (2024 - 2025). Đã ghi nhận <strong>14 ca thi</strong> trực thuộc Bộ môn Công Nghệ
                                        &amp; Khoa Học Máy Tính.
                                    </p>
                                </div>

                                {/* Quick Action & Academic Metrics Pill */}
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-4 bg-[#eff4ff] px-4 py-2 rounded-xl">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-[#515f74] uppercase font-semibold">Ca thi đang mở</span>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-ping"></span>
                                                <span className="font-['Plus_Jakarta_Sans'] text-18px text-[#0b1c30] font-bold">
                                                    02
                                                </span>
                                                <span className="text-xs text-[#515f74]">hội đồng</span>
                                            </div>
                                        </div>
                                        <div className="w-px h-8 bg-[#d3e4fe]"></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-[#515f74] uppercase font-semibold">
                                                Tổng SV làm bài
                                            </span>
                                            <span className="font-['Plus_Jakarta_Sans'] text-18px text-[#00236f] font-bold">
                                                118
                                                <span className="text-sm text-[#515f74] font-normal"> / 120</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Control & Filter Toolbar Strip */}
                        <section className="w-full bg-white rounded-xl p-4 shadow-sm mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                            {/* Search Bar */}
                            <div className="relative flex-1 min-w-[280px]">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#515f74] text-[20px] pointer-events-none">
                                    search
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#eff4ff] text-[#0b1c30] placeholder:text-[#757682] text-sm focus:outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(30,58,138,0.3)] transition-all"
                                    placeholder="Tìm theo tên học phần, mã môn (ENG302, CS201, DB102...)"
                                    type="text"
                                />
                            </div>

                            {/* Filter Group */}
                            <div className="flex flex-wrap items-center gap-2">
                                {/* Semester Selector */}
                                <div className="relative flex items-center bg-[#eff4ff] rounded-xl px-2 py-1.5">
                                    <span className="material-symbols-outlined text-[#515f74] text-[18px] ml-1 mr-1.5">
                                        date_range
                                    </span>
                                    <select
                                        className="bg-transparent text-[#0b1c30] text-sm font-semibold focus:outline-none pr-6 cursor-pointer"
                                        value={selectedSemester}
                                        onChange={(e) => setSelectedSemester(e.target.value)}
                                    >
                                        <option value="hk1-24-25">Học kỳ 1 năm học 2024-2025</option>
                                        <option value="hk3-23-24">Học kỳ Phụ (Hè 2024)</option>
                                        <option value="hk2-23-24">Học kỳ 2 năm học 2023-2024</option>
                                    </select>
                                </div>

                                {/* Status Quick Filters */}
                                <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-xl text-xs font-semibold">
                                    <button
                                        className={`px-3 py-1.5 rounded-lg transition-colors ${activeFilter === "all"
                                            ? "bg-white text-[#00236f] font-bold shadow-sm"
                                            : "text-[#515f74] hover:text-[#0b1c30]"
                                            }`}
                                        type="button"
                                        onClick={() => setActiveFilter("all")}
                                    >
                                        Tất cả (5)
                                    </button>
                                    <button
                                        className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${activeFilter === "ongoing"
                                            ? "bg-white text-[#00236f] font-bold shadow-sm"
                                            : "text-[#515f74] hover:text-[#0b1c30]"
                                            }`}
                                        type="button"
                                        onClick={() => setActiveFilter("ongoing")}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span> Đang diễn ra (2)
                                    </button>
                                    <button
                                        className={`px-3 py-1.5 rounded-lg transition-colors ${activeFilter === "pending"
                                            ? "bg-white text-[#00236f] font-bold shadow-sm"
                                            : "text-[#515f74] hover:text-[#0b1c30]"
                                            }`}
                                        type="button"
                                        onClick={() => setActiveFilter("pending")}
                                    >
                                        Chờ mở đề (1)
                                    </button>
                                    <button
                                        className={`px-3 py-1.5 rounded-lg transition-colors ${activeFilter === "finished"
                                            ? "bg-white text-[#00236f] font-bold shadow-sm"
                                            : "text-[#515f74] hover:text-[#0b1c30]"
                                            }`}
                                        type="button"
                                        onClick={() => setActiveFilter("finished")}
                                    >
                                        Đã kết thúc (1)
                                    </button>
                                    <button
                                        className={`px-3 py-1.5 rounded-lg transition-colors ${activeFilter === "draft"
                                            ? "bg-white text-[#00236f] font-bold shadow-sm"
                                            : "text-[#515f74] hover:text-[#0b1c30]"
                                            }`}
                                        type="button"
                                        onClick={() => setActiveFilter("draft")}
                                    >
                                        Bản nháp (1)
                                    </button>
                                </div>

                                {/* Export Tools */}
                                <button
                                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#eff4ff] text-[#515f74] hover:text-[#00236f] hover:bg-[#e5eeff] transition-colors"
                                    title="Xuất báo cáo tổng quan"
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[20px]">file_download</span>
                                </button>
                            </div>
                        </section>

                        {/* Examination Cards Flow */}
                        <div className="flex flex-col gap-6 pb-2">
                            {/* CARD 1: ENG302 */}
                            <article className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#004a31] via-[#4edea3] to-[#1e3a8a]"></div>
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pt-1">
                                    <div className="flex flex-col">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="px-2.5 py-0.5 rounded-full bg-[#dce1ff] text-[#00164e] text-xs font-bold tracking-wide">
                                                ENG302 - NHÓM 02
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#515f74] text-xs">
                                                Thi Tự Luận Học Thuật (Online Essay Writing)
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#515f74] text-xs flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">lock</span> Passcode:{" "}
                                                <code className="font-bold text-[#0b1c30]">WRIT-2024</code>
                                            </span>
                                        </div>
                                        <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#0b1c30] hover:text-[#00236f] transition-colors cursor-pointer">
                                            Kỹ Năng Viết Học Thuật Tiếng Anh Nâng Cao (Academic Essay Writing &amp;
                                            Argumentation)
                                        </h2>
                                        <div className="flex items-center gap-4 text-[#515f74] text-sm mt-1">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    meeting_room
                                                </span>{" "}
                                                Phòng: <strong>LAB-C304 Trực Tuyến</strong>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    calendar_today
                                                </span>{" "}
                                                Ngày 24/10/2024
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    schedule
                                                </span>{" "}
                                                Ca thi: 08:30 – 10:30 (120 phút)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row lg:flex-col items-end justify-between gap-2 flex-shrink-0">
                                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#004a31] text-[#6ffbbe] text-xs font-bold tracking-tight">
                                            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
                                            <span>Đang diễn ra • Đang thu bài</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#dce9ff] px-4 py-1.5 rounded-xl">
                                            <span className="material-symbols-outlined text-[#00236f] text-[18px]">
                                                timer
                                            </span>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[10px] text-[#515f74] uppercase font-semibold leading-none">
                                                    Thời gian còn lại
                                                </span>
                                                <span className="font-['Plus_Jakarta_Sans'] text-lg text-[#00236f] font-bold tracking-wider leading-tight">
                                                    00:42:15
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                                    <div className="bg-[#eff4ff] rounded-xl p-4 flex flex-col justify-between">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-[#515f74] uppercase font-semibold">
                                                Tỷ lệ SV đang làm bài
                                            </span>
                                            <span className="text-sm font-bold text-[#00311f]">96.6%</span>
                                        </div>
                                        <div className="w-full bg-[#d3e4fe] rounded-full h-2.5 overflow-hidden my-1">
                                            <div className="bg-[#004a31] h-full rounded-full transition-all duration-500" style={{ width: "96.6%" }}></div>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-[#515f74] mt-1">
                                            <span>Đã kết nối: <strong className="text-[#0b1c30]">58 / 60 SV</strong></span>
                                            <span className="text-[#ba1a1a] font-medium">02 vắng mặt</span>
                                        </div>
                                    </div>

                                    <div className="bg-[#eff4ff] rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-[#515f74] uppercase font-semibold">
                                                Bài nộp lưu trữ Cloud
                                            </span>
                                            <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#00236f] mt-0.5">
                                                46 / 58
                                            </span>
                                            <span className="text-[12px] text-[#515f74]">Tự động đồng bộ mỗi 15 giây</span>
                                        </div>
                                        <svg className="w-20 h-10 text-[#1e3a8a]" fill="none" viewBox="0 0 80 40">
                                            <path
                                                d="M0 32 L15 28 L30 25 L45 18 L60 12 L75 4"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.5"
                                            />
                                            <circle className="fill-[#00236f]" cx="75" cy="4" r="3.5" />
                                        </svg>
                                    </div>

                                    <div className="bg-[#eff4ff] rounded-xl p-4 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#6ffbbe]/30 flex items-center justify-center text-[#00311f] flex-shrink-0">
                                            <span className="material-symbols-outlined text-[26px]">verified_user</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-[#515f74] uppercase font-semibold">
                                                Giám sát khảo thí (Safe Exam)
                                            </span>
                                            <span className="text-sm font-bold text-[#0b1c30]">
                                                Khóa màn hình &amp; AI Check
                                            </span>
                                            <span className="text-[12px] text-[#00311f] font-medium">
                                                0 trường hợp nghi vấn bất thường
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                                    <div className="flex items-center gap-1 text-[#515f74] text-xs font-semibold">
                                        <span className="material-symbols-outlined text-[16px] text-[#00311f]">
                                            check_circle
                                        </span>
                                        <span>Đề thi chính thức đã niêm phong mã hóa SHA-256</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-4 py-2 rounded-xl bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#0b1c30] text-sm font-semibold transition-colors flex items-center gap-1.5"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                                            <span>Xem chi tiết ca thi</span>
                                        </button>
                                        <button
                                            className="px-4 py-2 rounded-xl bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#0b1c30] text-sm font-semibold transition-colors flex items-center gap-1.5"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                download_for_offline
                                            </span>
                                            <span>Xuất bài nộp</span>
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* CARD 2: CS201 */}
                            <article className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#004a31] via-[#4edea3] to-[#00236f]"></div>
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pt-1">
                                    <div className="flex flex-col">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="px-2.5 py-0.5 rounded-full bg-[#dce1ff] text-[#00164e] text-xs font-bold tracking-wide">
                                                CS201 - NHÓM 01
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#515f74] text-xs">
                                                Tự luận thuật toán &amp; Thiết kế mã giả (Pseudo-code Analysis)
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#515f74] text-xs flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">lock</span> Passcode:{" "}
                                                <code className="font-bold text-[#0b1c30]">ALGO-CS201</code>
                                            </span>
                                        </div>
                                        <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#0b1c30] hover:text-[#00236f] transition-colors cursor-pointer">
                                            Cấu Trúc Dữ Liệu &amp; Giải Thuật Ứng Dụng (Applied Data Structures &amp; Algorithms)
                                        </h2>
                                        <div className="flex items-center gap-4 text-[#515f74] text-sm mt-1">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    meeting_room
                                                </span>{" "}
                                                Phòng: <strong>SERVER-ROOM 02</strong>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    calendar_today
                                                </span>{" "}
                                                Ngày 24/10/2024
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    schedule
                                                </span>{" "}
                                                Ca thi: 09:00 – 10:45 (105 phút)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row lg:flex-col items-end justify-between gap-2 flex-shrink-0">
                                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#004a31] text-[#6ffbbe] text-xs font-bold tracking-tight">
                                            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
                                            <span>Đang diễn ra • Giám sát cao độ</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#dce9ff] px-4 py-1.5 rounded-xl">
                                            <span className="material-symbols-outlined text-[#00236f] text-[18px]">
                                                timer
                                            </span>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[10px] text-[#515f74] uppercase font-semibold leading-none">
                                                    Thời gian còn lại
                                                </span>
                                                <span className="font-['Plus_Jakarta_Sans'] text-lg text-[#00236f] font-bold tracking-wider leading-tight">
                                                    01:02:40
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                                    <div className="bg-[#eff4ff] rounded-xl p-4 flex flex-col justify-between">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-[#515f74] uppercase font-semibold">
                                                Tỷ lệ SV đang làm bài
                                            </span>
                                            <span className="text-sm font-bold text-[#00311f]">100%</span>
                                        </div>
                                        <div className="w-full bg-[#d3e4fe] rounded-full h-2.5 overflow-hidden my-1">
                                            <div className="bg-[#004a31] h-full rounded-full transition-all duration-500" style={{ width: "100%" }}></div>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-[#515f74] mt-1">
                                            <span>Đã kết nối: <strong className="text-[#0b1c30]">50 / 50 SV</strong></span>
                                            <span className="text-[#00311f] font-medium">Đủ chỉ tiêu sĩ số</span>
                                        </div>
                                    </div>

                                    <div className="bg-[#eff4ff] rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-[#515f74] uppercase font-semibold">
                                                Số lượt giải mã testcase
                                            </span>
                                            <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#00236f] mt-0.5">
                                                142 lần
                                            </span>
                                            <span className="text-[12px] text-[#515f74]">Hệ thống sandbox chấm biên dịch</span>
                                        </div>
                                        <svg className="w-20 h-10 text-[#1e3a8a]" fill="none" viewBox="0 0 80 40">
                                            <path
                                                d="M0 35 L20 20 L40 28 L60 10 L75 8"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.5"
                                            />
                                            <circle className="fill-[#00236f]" cx="75" cy="8" r="3.5" />
                                        </svg>
                                    </div>

                                    <div className="bg-[#eff4ff] rounded-xl p-4 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#d5e3fd] text-[#57657b] flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-[26px]">terminal</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-[#515f74] uppercase font-semibold">
                                                Công cụ phòng thi
                                            </span>
                                            <span className="text-sm font-bold text-[#0b1c30]">
                                                Chống Gian Lận Tab-switch
                                            </span>
                                            <span className="text-[12px] text-[#515f74]">Tự động cảnh báo rời cửa sổ</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                                    <div className="flex items-center gap-1 text-[#515f74] text-xs font-semibold">
                                        <span className="material-symbols-outlined text-[16px] text-[#00311f]">
                                            check_circle
                                        </span>
                                        <span>Chấm mã nguồn tự động qua Sandbox Docker độc lập</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-4 py-2 rounded-xl bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#0b1c30] text-sm font-semibold transition-colors flex items-center gap-1.5"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                                            <span>Xem chi tiết</span>
                                        </button>
                                        <a
                                            className="px-6 py-2 rounded-xl bg-[#00236f] text-white hover:bg-[#1e3a8a] text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5"
                                            href="#"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                desktop_windows
                                            </span>
                                            <span>Vào giám sát trực tuyến</span>
                                        </a>
                                    </div>
                                </div>
                            </article>

                            {/* CARD 3: DB102 */}
                            <article className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 overflow-hidden">
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                    <div className="flex flex-col">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="px-2.5 py-0.5 rounded-full bg-[#d5e3fd] text-[#57657b] text-xs font-bold tracking-wide">
                                                DB102 - CHÍNH QUY
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#515f74] text-xs">
                                                Thiết kế Hệ Cơ Sở Dữ Liệu &amp; Tối Ưu Truy Vấn SQL
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#515f74] text-xs flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">vpn_key</span> Khóa bảo mật: Đã kích hoạt
                                            </span>
                                        </div>
                                        <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#0b1c30] hover:text-[#00236f] transition-colors cursor-pointer">
                                            Cơ Sở Dữ Liệu &amp; Hệ Quản Trị CSDL (Relational Database Management Systems)
                                        </h2>
                                        <div className="flex items-center gap-4 text-[#515f74] text-sm mt-1">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    meeting_room
                                                </span>{" "}
                                                Phòng: <strong>HỘI TRƯỜNG D201</strong>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    calendar_today
                                                </span>{" "}
                                                Ngày 24/10/2024
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    schedule
                                                </span>{" "}
                                                Ca thi: 14:00 – 15:30 (90 phút)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row lg:flex-col items-end justify-between gap-2 flex-shrink-0">
                                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#dce9ff] text-[#00236f] text-xs font-bold">
                                            <span className="material-symbols-outlined text-[16px] text-[#00236f]">
                                                schedule
                                            </span>
                                            <span>Chờ mở ca thi • Đã duyệt đề</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#eff4ff] px-4 py-1.5 rounded-xl text-[#515f74]">
                                            <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[10px] uppercase font-semibold leading-none">
                                                    Dự kiến mở đề
                                                </span>
                                                <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#0b1c30] leading-tight">
                                                    Mở sau 04h 30m
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#eff4ff] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#515f74]">
                                            <span className="material-symbols-outlined text-[22px]">approval</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-[#0b1c30]">
                                                Đề thi đã được Trưởng Khoa duyệt &amp; Ký số bảo mật
                                            </span>
                                            <span className="text-xs text-[#515f74]">
                                                Dung lượng gói đề thi: 4.8MB (kèm 01 file dataset .sql thực hành)
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 text-[#515f74] text-xs font-semibold">
                                        <div>
                                            Dự thi: <strong className="text-[#0b1c30]">75 Sinh viên</strong>
                                        </div>
                                        <div className="w-px h-4 bg-[#c5c5d3]"></div>
                                        <div>
                                            Giám thị 1: <strong className="text-[#0b1c30]">TS. Mai Quang</strong>
                                        </div>
                                        <div className="w-px h-4 bg-[#c5c5d3]"></div>
                                        <div>
                                            Giám thị 2: <strong className="text-[#0b1c30]">ThS. Hoàng Yến</strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 pt-1">
                                    <span className="text-xs text-[#515f74]">
                                        Mã ca thi nội bộ: <code className="font-mono text-[#0b1c30]">EXAM-2024-DB102-Q1</code>
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-4 py-2 rounded-xl bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#0b1c30] text-sm font-semibold transition-colors flex items-center gap-1.5"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">preview</span>
                                            <span>Xem trước đề thi</span>
                                        </button>
                                        <button
                                            className="px-4 py-2 rounded-xl bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#0b1c30] text-sm font-semibold transition-colors flex items-center gap-1.5"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">key</span>
                                            <span>Quản lý mã đề &amp; Passcode</span>
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* CARD 4: PHI102 */}
                            <article className="relative bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4 overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                    <div className="flex flex-col">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="px-2.5 py-0.5 rounded-full bg-[#d3e4fe] text-[#515f74] text-xs font-bold tracking-wide">
                                                PHI102 - TOÀN TRƯỜNG
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#515f74] text-xs">
                                                Tự Luận Nghiên Cứu Chuyên Sâu &amp; Phản Biện Triết Học
                                            </span>
                                        </div>
                                        <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#0b1c30] hover:text-[#00236f] transition-colors cursor-pointer">
                                            Triết Học Mác - Lênin &amp; Phương Pháp Luận Nghiên Cứu Khoa Học
                                        </h2>
                                        <div className="flex items-center gap-4 text-[#515f74] text-sm mt-1">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    meeting_room
                                                </span>{" "}
                                                Phòng: <strong>ONLINE EXAM HALL A</strong>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    calendar_today
                                                </span>{" "}
                                                Ngày 22/10/2024
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    schedule
                                                </span>{" "}
                                                Ca thi: 13:30 – 15:00 (90 phút)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row lg:flex-col items-end justify-between gap-2 flex-shrink-0">
                                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#e5eeff] text-[#515f74] text-xs font-semibold">
                                            <span className="material-symbols-outlined text-[16px]">task_alt</span>
                                            <span>Đã kết thúc • Thu bài 100%</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#eff4ff] px-4 py-1.5 rounded-xl text-[#515f74]">
                                            <span className="material-symbols-outlined text-[18px]">history</span>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[10px] uppercase font-semibold leading-none">
                                                    Trạng thái thời gian
                                                </span>
                                                <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#757682] leading-tight">
                                                    00:00:00
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-1">
                                    <div className="bg-[#eff4ff] p-2 rounded-xl flex flex-col">
                                        <span className="text-xs text-[#515f74] uppercase">Tổng bài thi thu</span>
                                        <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#0b1c30]">
                                            60 / 60 <span className="text-xs text-[#00311f]">(100%)</span>
                                        </span>
                                    </div>
                                    <div className="bg-[#eff4ff] p-2 rounded-xl flex flex-col">
                                        <span className="text-xs text-[#515f74] uppercase">Trạng thái chấm điểm</span>
                                        <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#00236f]">
                                            Chờ chấm vòng 1
                                        </span>
                                    </div>
                                    <div className="bg-[#eff4ff] p-2 rounded-xl flex flex-col">
                                        <span className="text-xs text-[#515f74] uppercase">
                                            Kiểm tra đạo văn (AI/Turnitin)
                                        </span>
                                        <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#0b1c30]">
                                            Trung bình 6.4%
                                        </span>
                                    </div>
                                    <div className="bg-[#eff4ff] p-2 rounded-xl flex flex-col">
                                        <span className="text-xs text-[#515f74] uppercase">Biên bản vi phạm</span>
                                        <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#515f74]">
                                            00 biên bản
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                                    <span className="text-xs text-[#515f74]">
                                        Đã đóng cổng nộp bài lúc 15:00:02 GMT+7
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-4 py-2 rounded-xl bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#0b1c30] text-sm font-semibold transition-colors flex items-center gap-1.5"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">table_chart</span>
                                            <span>Báo cáo khảo thí (PDF/Excel)</span>
                                        </button>
                                        <a
                                            className="px-4 py-2 rounded-xl bg-[#1e3a8a] text-white hover:bg-[#00236f] text-sm font-semibold transition-colors flex items-center gap-1.5"
                                            href="#"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">rate_review</span>
                                            <span>Mở bàn chấm thi</span>
                                        </a>
                                    </div>
                                </div>
                            </article>

                            {/* CARD 5: SE304 */}
                            <article className="relative bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4 overflow-hidden border border-dashed border-[#c5c5d3]">
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                    <div className="flex flex-col">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#515f74] text-xs font-bold tracking-wide">
                                                SE304 - CHUYÊN NGÀNH
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#515f74] text-xs">
                                                Thiết Kế Kiến Trúc Phần Mềm &amp; Phân Tích Ca Lâm Sàng Hệ Thống
                                            </span>
                                        </div>
                                        <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#515f74] hover:text-[#00236f] transition-colors cursor-pointer">
                                            Thiết Kế Kiến Trúc Phần Mềm Phân Tán (Microservices &amp; Cloud Architecture)
                                        </h2>
                                        <div className="flex items-center gap-4 text-[#515f74] text-sm mt-1">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    edit_note
                                                </span>{" "}
                                                Tạo lần cuối: 23/10/2024 lúc 16:40
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px] text-[#757682]">
                                                    timer
                                                </span>{" "}
                                                Thời lượng dự kiến: 120 phút
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row lg:flex-col items-end justify-between gap-2 flex-shrink-0">
                                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#e5eeff] text-[#757682] text-xs font-semibold">
                                            <span className="material-symbols-outlined text-[16px]">draw</span>
                                            <span>Bản nháp • Chưa xuất bản</span>
                                        </div>
                                        <span className="text-xs text-[#757682]">Chưa cấp mã phòng</span>
                                    </div>
                                </div>

                                <p className="text-base text-[#515f74] bg-[#eff4ff] p-4 rounded-xl">
                                    Bản đề thi đang được soạn thảo dở dang. Hiện có 03 câu hỏi tự luận phân tích sơ đồ C4 Model và bài toán cân bằng tải hệ thống. Đề chưa gửi phê duyệt lên Hội đồng Khảo thí.
                                </p>

                                <div className="flex items-center justify-between gap-4 pt-1">
                                    <span className="text-xs text-[#515f74]">Phiên bản nháp: v0.4 (Autosaved)</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-4 py-2 rounded-xl bg-[#ffdad6] text-[#93000a] hover:bg-[#ba1a1a] hover:text-white text-sm font-semibold transition-colors flex items-center gap-1"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                            <span>Hủy đề</span>
                                        </button>
                                        <a
                                            className="px-6 py-2 rounded-xl bg-[#00236f] text-white hover:bg-[#1e3a8a] text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5"
                                            href="#"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">edit_document</span>
                                            <span>Tiếp tục chỉnh sửa</span>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Pagination Bottom Bar */}
                        <section className="w-full bg-white rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                            <span className="text-sm text-[#515f74]">
                                Hiển thị <strong>1 – 5</strong> trong tổng số <strong>14</strong> bài thi đã tạo (Học
                                kỳ I 2024-2025)
                            </span>
                            <div className="flex items-center gap-1">
                                <button
                                    className="p-2 rounded-lg text-[#c5c5d3] cursor-not-allowed"
                                    disabled
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                </button>
                                <button
                                    className="w-8 h-8 rounded-lg bg-[#1e3a8a] text-white text-xs font-bold"
                                    type="button"
                                >
                                    1
                                </button>
                                <button
                                    className="w-8 h-8 rounded-lg text-[#515f74] hover:bg-[#e5eeff] hover:text-[#0b1c30] text-xs font-semibold"
                                    type="button"
                                >
                                    2
                                </button>
                                <button
                                    className="w-8 h-8 rounded-lg text-[#515f74] hover:bg-[#e5eeff] hover:text-[#0b1c30] text-xs font-semibold"
                                    type="button"
                                >
                                    3
                                </button>
                                <button
                                    className="p-2 rounded-lg text-[#515f74] hover:bg-[#e5eeff] hover:text-[#0b1c30]"
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                </button>
                            </div>
                        </section>
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
                        <div className="flex items-center gap-4 text-xs font-semibold"></div>
                    </div>
                </footer>
            </div>
        </div>
    );
}