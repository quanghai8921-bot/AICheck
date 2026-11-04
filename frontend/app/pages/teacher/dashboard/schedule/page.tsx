"use client";
import React, { useState } from 'react';

// Sub-interface cho dữ liệu ca coi thi
interface ExamSession {
    id: string;
    code: string;
    subjectCode: string;
    subjectName: string;
    type: 'today' | 'ongoing' | 'upcoming' | 'completed';
    timeLabel: string;
    statusBadge: string;
    timeRange: string;
    duration: string;
    location: string;
    role: string;
    colleague: string;
    registeredCount: number;
    totalCount: number;
    examForm: string;
    proctoringType: string;
    cameraFeedUrl?: string;
    note?: string;
    completionRate?: number;
    signedDate?: string;
}

export default function ExamMonitoringSchedule() {
    const [activeTab, setActiveTab] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('HK1_2425');
    const [selectedForm, setSelectedForm] = useState('all');

    // Danh sách các ca thi mẫu
    const examSessions: ExamSession[] = [
        {
            id: '1',
            code: 'EX-2024-CS201-01',
            subjectCode: 'CS201',
            subjectName: 'CS201 - Cấu Trúc Dữ Liệu & Giải Thuật Ứng Dụng',
            type: 'today',
            timeLabel: 'Hôm nay • Ca Chiều',
            statusBadge: 'Sắp bắt đầu (còn 01h 15p)',
            timeRange: '14:00 - 15:30',
            duration: '90 Phút',
            location: 'LAB-C304 & Virtual Room #02',
            role: 'Cán bộ coi thi chính (Giám thị 1)',
            colleague: 'ThS. Hoàng Thị Phương Lan (GT 2)',
            registeredCount: 50,
            totalCount: 50,
            examForm: 'Thi viết tự luận trên máy',
            proctoringType: '2 Luồng Camera (Webcam + 360°)',
            cameraFeedUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFr7cXraICzFun9QSBBAJpr8Or61zkWyHS2VctZo2Lkvpe9V4GRPNywVOZJ117a21ZG-Y0T2dMvEUZOqDzOFjltoZ4disLo_ul7Arj1CkQ9lerNrQ1LopFBk5M5bleyibFJTbrc5H3YLnSnzTRuDf-19a_gNTWvyXZ2xuzcWz6TX62Em9XWhuKPJoTSE70EkAPrVAeStq0AWHDAETmEqYaHyE4Iyvt46-oqRDcW3cMn6j5VLZCy_d5ew',
        },
        {
            id: '2',
            code: 'EX-2024-ENG302-09',
            subjectCode: 'ENG302',
            subjectName: 'ENG302 - Kỹ Năng Viết Học Thuật Tiếng Anh Nâng Cao',
            type: 'ongoing',
            timeLabel: 'Đang diễn ra • Phút 62/120',
            statusBadge: 'Trực tuyến từ xa (Remote Proctoring)',
            timeRange: '08:30 - 10:30',
            duration: '120 Phút',
            location: 'ONLINE HALL A (Zoom + SafeExam)',
            role: 'Giám sát viên dự phòng & Phân tích AI',
            colleague: 'ThS. Nguyễn Văn Bình',
            registeredCount: 38,
            totalCount: 40,
            examForm: 'Tự luận Tiếng Anh trên máy',
            proctoringType: 'SafeExam Browser + AI Vision',
        },
        {
            id: '3',
            code: 'EX-2024-DB102-04',
            subjectCode: 'DB102',
            subjectName: 'DB102 - Cơ Sở Dữ Liệu & Hệ Quản Trị CSDL',
            type: 'upcoming',
            timeLabel: '28/10/2024 • Thứ Hai',
            statusBadge: 'Đã xác nhận phân công',
            timeRange: '09:00 - 10:45',
            duration: '105 Phút',
            location: 'HỘI TRƯỜNG D201 (Cơ sở chính)',
            role: 'Cán bộ coi thi 2',
            colleague: 'PGS.TS. Nguyễn Thanh Hải (GT chính)',
            registeredCount: 120,
            totalCount: 120,
            examForm: 'Trắc nghiệm kết hợp thực hành SQL',
            proctoringType: 'Giám sát tập trung tại hội trường',
            note: 'Yêu cầu rà soát kỹ thiết bị di động trước khi phát mã truy cập SQL Server. Đề nghị có mặt trước 20 phút để kiểm tra mạng LAN phòng D201.',
        },
        {
            id: '4',
            code: 'EX-2024-PHI102-02',
            subjectCode: 'PHI102',
            subjectName: 'PHI102 - Triết Học Mác - Lênin & Phương Pháp Luận Nghiên Cứu',
            type: 'completed',
            timeLabel: '22/10/2024 • Đã diễn ra',
            statusBadge: 'Đã nộp biên bản ca thi (00 vi phạm)',
            timeRange: '13:30 - 15:00',
            duration: '90 Phút',
            location: 'P.ONLINE-01 (65 SV)',
            role: 'Cán bộ coi thi chính',
            colleague: 'ThS. Phạm Đức Minh',
            registeredCount: 65,
            totalCount: 65,
            examForm: 'Trắc nghiệm trực tuyến',
            proctoringType: 'SafeExam Browser',
            completionRate: 100,
            signedDate: '22/10 15:15',
        },
    ];

    // Lọc danh sách theo Tab & Search
    const filteredSessions = examSessions.filter((session) => {
        const matchesSearch =
            session.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.location.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (activeTab === 'today') return session.type === 'today' || session.type === 'ongoing';
        if (activeTab === 'upcoming') return session.type === 'upcoming';
        if (activeTab === 'completed') return session.type === 'completed';

        return true;
    });

    return (
        <div className="bg-slate-50 font-sans text-slate-900 antialiased min-h-screen flex flex-col">
            <div className="flex flex-1">
                {/* Main Workspace */}
                <main className="flex-1 w-full px-6 bg-slate-50 pb-6 pt-6">
                    <div className="flex flex-col w-full">
                        {/* Breadcrumbs & Top Bar */}
                        <div className="flex flex-col gap-1 mb-4">
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                <a className="hover:text-blue-900 transition-colors flex items-center gap-1" href="#">
                                    <span className="material-symbols-outlined text-[16px]">home</span>
                                    Trang chủ
                                </a>
                                <span className="text-slate-300">/</span>
                                <span className="hover:text-slate-900 transition-colors cursor-pointer">Tiện ích &amp; khảo thí</span>
                                <span className="text-slate-300">/</span>
                                <span className="text-blue-900 font-semibold">Lịch coi thi &amp; giám sát</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
                                <div>
                                    <h1 className="text-2xl text-slate-900 font-bold tracking-tight">
                                        Lịch Coi Thi &amp; Giám Sát Ca Thi Trực Tuyến
                                    </h1>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Quản lý lịch phân công coi thi, phòng giám sát AI Proctoring thời gian thực và nhật ký an toàn khảo thí học kỳ I (2024 - 2025).
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-blue-900 text-xs font-semibold transition-all shadow-sm"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                        <span>Xuất lịch (.ICS/Excel)</span>
                                    </button>
                                    <button
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold transition-all shadow-md"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">videocam</span>
                                        <span>Kiểm tra phòng máy &amp; Camera</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* KPI Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            {/* KPI 1 */}
                            <div className="relative overflow-hidden bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase font-semibold">Sắp diễn ra hôm nay</span>
                                        <div className="text-3xl text-slate-900 font-bold mt-1">
                                            01 <span className="text-sm text-slate-500 font-normal">Ca</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[22px]">alarm</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-1 flex items-center gap-1.5 text-slate-700 text-xs font-medium">
                                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                                    <span>Bắt đầu lúc <strong>14:00</strong> tại P.ONLINE-03</span>
                                </div>
                            </div>

                            {/* KPI 2 */}
                            <div className="relative overflow-hidden bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase font-semibold">Tổng số ca phân công</span>
                                        <div className="text-3xl text-slate-900 font-bold mt-1">
                                            12 <span className="text-sm text-slate-500 font-normal">Ca</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[22px]">fact_check</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-1 flex items-center justify-between text-slate-500 text-xs">
                                    <span>Đã hoàn thành: <strong className="text-slate-900">07</strong></span>
                                    <span>Còn lại: <strong className="text-blue-900 font-bold">05 ca</strong></span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div className="bg-blue-900 h-full rounded-full" style={{ width: '58.3%' }}></div>
                                </div>
                            </div>

                            {/* KPI 3 */}
                            <div className="relative overflow-hidden bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase font-semibold">Tỷ lệ vi phạm ghi nhận</span>
                                        <div className="text-3xl text-emerald-700 font-bold mt-1">0.4%</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[22px]">verified_user</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-1 flex items-center gap-1 text-xs text-slate-500">
                                    <span className="material-symbols-outlined text-[16px] text-emerald-600">trending_down</span>
                                    <span>Chỉ số an toàn học thuật: <strong className="text-emerald-700 font-semibold">Rất Cao</strong></span>
                                </div>
                            </div>

                            {/* KPI 4 */}
                            <div className="relative overflow-hidden bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase font-semibold">AI Proctoring Server</span>
                                        <div className="text-lg text-slate-900 font-bold mt-1 flex items-center gap-2">
                                            Ổn định
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[22px]">sensors</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-1 flex items-center justify-between text-slate-500 text-xs">
                                    <span>Độ trễ truyền stream:</span>
                                    <span className="font-mono text-emerald-700 font-bold">14 ms (NTP sync)</span>
                                </div>
                            </div>
                        </div>

                        {/* Filter & Search Bar */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col gap-4">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                                {/* Search input */}
                                <div className="relative w-full lg:w-96">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">
                                        search
                                    </span>
                                    <input
                                        className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-900/20 transition-all border border-transparent focus:border-slate-200"
                                        placeholder="Tìm theo mã môn, tên môn, phòng thi..."
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Filters */}
                                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                                    <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-xl text-slate-900 text-xs">
                                        <span className="material-symbols-outlined text-slate-500 text-[18px]">school</span>
                                        <span className="font-semibold text-slate-500">Học kỳ:</span>
                                        <select
                                            className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer"
                                            value={selectedTerm}
                                            onChange={(e) => setSelectedTerm(e.target.value)}
                                        >
                                            <option value="HK1_2425">Học kỳ 1 (2024 - 2025)</option>
                                            <option value="HK2_2324">Học kỳ 2 (2023 - 2024)</option>
                                            <option value="HK_HE24">Học kỳ Hè 2024</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-xl text-slate-900 text-xs">
                                        <span className="material-symbols-outlined text-slate-500 text-[18px]">tune</span>
                                        <span className="font-semibold text-slate-500">Hình thức:</span>
                                        <select
                                            className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer"
                                            value={selectedForm}
                                            onChange={(e) => setSelectedForm(e.target.value)}
                                        >
                                            <option value="all">Tất cả hình thức</option>
                                            <option value="lab">Thi máy tập trung</option>
                                            <option value="remote">Trực tuyến từ xa (Remote)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Status Tabs */}
                            <div className="flex items-center gap-2 overflow-x-auto pt-1">
                                <button
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === 'all'
                                        ? 'bg-blue-900 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                        }`}
                                    onClick={() => setActiveTab('all')}
                                    type="button"
                                >
                                    Tất cả (12)
                                </button>
                                <button
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === 'today'
                                        ? 'bg-blue-900 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                        }`}
                                    onClick={() => setActiveTab('today')}
                                    type="button"
                                >
                                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                                    Hôm nay (1)
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === 'upcoming'
                                        ? 'bg-blue-900 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                        }`}
                                    onClick={() => setActiveTab('upcoming')}
                                    type="button"
                                >
                                    Sắp tới (4)
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === 'completed'
                                        ? 'bg-blue-900 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                        }`}
                                    onClick={() => setActiveTab('completed')}
                                    type="button"
                                >
                                    Đã hoàn thành (7)
                                </button>
                            </div>
                        </div>

                        {/* Exam Monitoring Schedule List */}
                        <div className="flex flex-col gap-6">
                            {filteredSessions.map((session) => {
                                if (session.type === 'today') {
                                    // CARD 1: HÔM NAY - SẮP DIỄN RA
                                    return (
                                        <div
                                            key={session.id}
                                            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden transition-all hover:shadow-md"
                                        >
                                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4">
                                                <div className="flex items-start sm:items-center gap-2 flex-wrap">
                                                    <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wide">
                                                        {session.timeLabel}
                                                    </span>
                                                    <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-xs font-bold flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                                                        {session.statusBadge}
                                                    </span>
                                                    <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[16px]">security</span>
                                                        SafeExam Browser v3.2
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                                    <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                                                    <span>Mã ca thi: <strong className="text-slate-900">{session.code}</strong></span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                                {/* Main details */}
                                                <div className="lg:col-span-8 flex flex-col justify-between">
                                                    <div>
                                                        <div className="text-blue-900 text-lg font-bold">
                                                            {session.subjectName}
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-3 text-slate-900 text-sm">
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <span className="material-symbols-outlined text-blue-900 text-[20px]">calendar_clock</span>
                                                                <span>Khung giờ: <strong className="text-slate-900">{session.timeRange} ({session.duration})</strong></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <span className="material-symbols-outlined text-blue-900 text-[20px]">meeting_room</span>
                                                                <span>Địa điểm: <strong className="text-slate-900">{session.location}</strong></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <span className="material-symbols-outlined text-blue-900 text-[20px]">badge</span>
                                                                <span>Vai trò: <strong className="text-blue-900 font-semibold">{session.role}</strong></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <span className="material-symbols-outlined text-blue-900 text-[20px]">group</span>
                                                                <span>Phối hợp: <strong className="text-slate-900">{session.colleague}</strong></span>
                                                            </div>
                                                        </div>

                                                        {/* Meta badges */}
                                                        <div className="flex flex-wrap items-center gap-4 mt-4 p-3 rounded-xl bg-slate-50 text-slate-600 text-xs border border-slate-100">
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="material-symbols-outlined text-[18px] text-emerald-600">groups</span>
                                                                <span>Quy mô: <strong className="text-slate-900">{session.registeredCount}/{session.totalCount} Sinh viên</strong></span>
                                                            </div>
                                                            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="material-symbols-outlined text-[18px] text-emerald-600">devices</span>
                                                                <span>Hình thức: <strong className="text-slate-900">{session.examForm}</strong></span>
                                                            </div>
                                                            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="material-symbols-outlined text-[18px] text-emerald-600">shield_person</span>
                                                                <span>Giám sát AI: <strong className="text-emerald-700 font-bold">{session.proctoringType}</strong></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 bg-slate-50 -mx-6 -mb-6 p-6 border-t border-slate-100">
                                                        <button
                                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-sm font-semibold shadow-md transition-all"
                                                            type="button"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">screen_share</span>
                                                            <span>Vào phòng điều hành giám sát trực tuyến</span>
                                                        </button>
                                                        <button
                                                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 text-sm font-semibold transition-all"
                                                            type="button"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                                                            <span>Điểm danh thí sinh ({session.registeredCount})</span>
                                                        </button>
                                                        <button
                                                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-sm font-semibold border border-slate-200 transition-all shadow-sm"
                                                            type="button"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">description</span>
                                                            <span>Đề thi &amp; Đáp án niêm phong</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Right: Camera Live Stream Snapshot */}
                                                <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <div>
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="text-xs font-bold text-slate-500 uppercase">Hiện trạng chuẩn bị phòng</span>
                                                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                                                                SẴN SÀNG
                                                            </span>
                                                        </div>

                                                        <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-900 shadow-inner mb-3 flex items-center justify-center">
                                                            {session.cameraFeedUrl && (
                                                                <img
                                                                    className="object-cover w-full h-full opacity-80"
                                                                    alt="Monitoring stream preview"
                                                                    src={session.cameraFeedUrl}
                                                                />
                                                            )}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent flex items-end p-2.5">
                                                                <div className="flex items-center justify-between w-full text-white text-[11px]">
                                                                    <span className="flex items-center gap-1 font-semibold">
                                                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                                                        LAB-C304 Cam Feed #01
                                                                    </span>
                                                                    <span>50 Máy online</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1.5 text-xs text-slate-500">
                                                            <div className="flex items-center justify-between">
                                                                <span>Trợ giảng kỹ thuật:</span>
                                                                <span className="text-slate-900 font-semibold">KTV. Trần Văn Bách</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span>Kiểm tra cổng kết nối mạng:</span>
                                                                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                                                    <span className="material-symbols-outlined text-[14px]">check_circle</span> 100% Hoàn tất
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="pt-2 mt-2 border-t border-slate-200">
                                                        <a className="text-blue-900 hover:underline text-xs font-semibold flex items-center justify-center gap-1" href="#">
                                                            <span>Xem hướng dẫn xử lý vi phạm quy chế</span>
                                                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                if (session.type === 'ongoing') {
                                    // CARD 2: ĐANG DIỄN RA
                                    return (
                                        <div
                                            key={session.id}
                                            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden transition-all hover:shadow-md"
                                        >
                                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4">
                                                <div className="flex items-start sm:items-center gap-2 flex-wrap">
                                                    <span className="px-3 py-1 rounded-xl bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                                                        {session.timeLabel}
                                                    </span>
                                                    <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[16px]">podium</span>
                                                        {session.statusBadge}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-500 text-xs">
                                                    <span className="material-symbols-outlined text-[18px]">tag</span>
                                                    <span>Mã ca: <strong className="text-slate-900">{session.code}</strong></span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                                <div className="lg:col-span-8 flex flex-col justify-between">
                                                    <div>
                                                        <div className="text-blue-900 text-lg font-bold">
                                                            {session.subjectName}
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-3 text-slate-900 text-sm">
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <span className="material-symbols-outlined text-blue-900 text-[20px]">timer</span>
                                                                <span>Khung giờ: <strong className="text-slate-900">{session.timeRange} (Đang diễn ra)</strong></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <span className="material-symbols-outlined text-blue-900 text-[20px]">videocam</span>
                                                                <span>Phòng thi ảo: <strong className="text-slate-900">{session.location}</strong></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <span className="material-symbols-outlined text-blue-900 text-[20px]">admin_panel_settings</span>
                                                                <span>Vai trò: <strong className="text-blue-900 font-semibold">{session.role}</strong></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <span className="material-symbols-outlined text-blue-900 text-[20px]">person_check</span>
                                                                <span>Sĩ số: <strong className="text-slate-900">{session.registeredCount}/{session.totalCount} Đang làm bài (02 vắng)</strong></span>
                                                            </div>
                                                        </div>

                                                        {/* AI Telemetry Alert Box */}
                                                        <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center flex-shrink-0">
                                                                    <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-xs text-slate-900 font-semibold">Cảnh báo hệ thống AI Vision:</span>
                                                                    <span className="text-xs text-slate-600">
                                                                        Ghi nhận <strong className="text-red-600 font-semibold">02 cảnh báo quay đầu</strong> quá 15s (SV240188), <strong className="text-emerald-700 font-semibold">0 trường hợp rời màn hình</strong>.
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <span className="px-2.5 py-1 rounded-xl bg-white text-slate-500 text-[11px] font-semibold border border-slate-200 self-start sm:self-center shadow-xs">
                                                                Cập nhật: 10 giây trước
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-3 mt-6">
                                                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-sm font-semibold shadow-sm transition-all" type="button">
                                                            <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                                            <span>Xem luồng camera AI đa màn hình</span>
                                                        </button>
                                                        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-all" type="button">
                                                            <span className="material-symbols-outlined text-[18px]">report_problem</span>
                                                            <span>Xem biên bản vi phạm (02)</span>
                                                        </button>
                                                        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-sm transition-all" type="button">
                                                            <span className="material-symbols-outlined text-[18px]">support_agent</span>
                                                            <span>Kênh liên lạc hội đồng</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Right Grid Avatar Simulation */}
                                                <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="text-xs font-bold text-slate-500 uppercase">Trạng thái kết nối SV</span>
                                                            <span className="font-mono text-xs text-emerald-700 font-bold">99.2% Uptime</span>
                                                        </div>

                                                        <div className="grid grid-cols-6 gap-1.5 p-2 bg-white rounded-xl border border-slate-200 shadow-inner mb-3">
                                                            {Array.from({ length: 12 }).map((_, idx) => {
                                                                const isFlagged = idx === 4;
                                                                return (
                                                                    <div
                                                                        key={idx}
                                                                        className={`h-6 rounded flex items-center justify-center text-[9px] font-bold ${isFlagged ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-900'
                                                                            }`}
                                                                        title={isFlagged ? 'Cảnh báo quay đầu' : `Máy ${idx + 1}`}
                                                                    >
                                                                        {String(idx + 1).padStart(2, '0')}{isFlagged ? '!' : ''}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="text-xs text-slate-500 flex items-center justify-between">
                                                            <span>Đang kiểm duyệt âm thanh:</span>
                                                            <span className="text-emerald-700 font-semibold">Tạp âm thấp (&lt; 22dB)</span>
                                                        </div>
                                                    </div>

                                                    <div className="pt-3 mt-3 border-t border-slate-200">
                                                        <button className="w-full py-2 bg-white hover:bg-slate-100 rounded-xl text-blue-900 border border-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-xs" type="button">
                                                            <span className="material-symbols-outlined text-[16px]">chat</span>
                                                            <span>Nhắn tin toàn thể phòng thi</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                if (session.type === 'upcoming') {
                                    // CARD 3: SẮP TỚI - TUẦN SAU
                                    return (
                                        <div
                                            key={session.id}
                                            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md"
                                        >
                                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4">
                                                <div className="flex items-start sm:items-center gap-2 flex-wrap">
                                                    <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-900 text-xs font-bold">
                                                        {session.timeLabel}
                                                    </span>
                                                    <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                        {session.statusBadge}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-500 text-xs">
                                                    <span className="material-symbols-outlined text-[18px]">event</span>
                                                    <span>Mã ca: <strong className="text-slate-900">{session.code}</strong></span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                                <div className="lg:col-span-8 flex flex-col justify-between">
                                                    <div>
                                                        <div className="text-slate-900 text-lg font-bold">
                                                            {session.subjectName}
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-3 text-slate-900 text-sm">
                                                            <div className="flex items-center gap-2 text-slate-500">
                                                                <span className="material-symbols-outlined text-[20px]">schedule</span>
                                                                <span>Khung giờ: <strong className="text-slate-900">{session.timeRange} ({session.duration})</strong></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-500">
                                                                <span className="material-symbols-outlined text-[20px]">apartment</span>
                                                                <span>Địa điểm: <strong className="text-slate-900">{session.location}</strong></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-500">
                                                                <span className="material-symbols-outlined text-[20px]">badge</span>
                                                                <span>Vai trò: <strong className="text-slate-900 font-semibold">{session.role}</strong></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-500">
                                                                <span className="material-symbols-outlined text-[20px]">person</span>
                                                                <span>Giám thị chính: <strong className="text-slate-900">{session.colleague}</strong></span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-4 text-slate-500 text-xs">
                                                            <span>Sĩ số dự kiến: <strong className="text-slate-900">{session.registeredCount} sinh viên</strong></span>
                                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                            <span>Hình thức: <strong className="text-slate-900">{session.examForm}</strong></span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-3 mt-6">
                                                        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-900 text-xs font-semibold transition-all" type="button">
                                                            <span className="material-symbols-outlined text-[18px]">file_download</span>
                                                            <span>Tải danh sách phòng thi &amp; Quy chế (.PDF)</span>
                                                        </button>
                                                        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-200 transition-all shadow-xs" type="button">
                                                            <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                                                            <span>Đề xuất đổi ca coi thi</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                                                    <div>
                                                        <span className="text-xs font-bold text-slate-500 uppercase">Ghi chú từ Trưởng bộ môn</span>
                                                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                                            "{session.note}"
                                                        </p>
                                                    </div>
                                                    <div className="pt-2 mt-2 text-slate-500 text-[11px] flex items-center gap-1 border-t border-slate-200">
                                                        <span className="material-symbols-outlined text-[14px]">info</span>
                                                        Đã đồng bộ vào Google Calendar cá nhân
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                // CARD 4: ĐÃ HOÀN THÀNH
                                return (
                                    <div
                                        key={session.id}
                                        className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all opacity-90 hover:opacity-100 hover:shadow-md"
                                    >
                                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4">
                                            <div className="flex items-start sm:items-center gap-2 flex-wrap">
                                                <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">
                                                    {session.timeLabel}
                                                </span>
                                                <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">verified</span>
                                                    {session.statusBadge}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                                                <span className="material-symbols-outlined text-[18px]">task</span>
                                                <span>Mã ca: <strong className="text-slate-900">{session.code}</strong></span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                            <div className="lg:col-span-8 flex flex-col justify-between">
                                                <div>
                                                    <div className="text-slate-900 text-base font-semibold">
                                                        {session.subjectName}
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-3 text-slate-900 text-sm">
                                                        <div className="flex items-center gap-2 text-slate-500">
                                                            <span className="material-symbols-outlined text-[20px]">history</span>
                                                            <span>Khung giờ: <strong>{session.timeRange}</strong></span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-500">
                                                            <span className="material-symbols-outlined text-[20px]">room</span>
                                                            <span>Địa điểm: <strong>{session.location}</strong></span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-500">
                                                            <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                                                            <span>Kết quả: <strong>{session.registeredCount}/{session.totalCount} bài đã nộp về máy chủ</strong></span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-500">
                                                            <span className="material-symbols-outlined text-[20px]">draw</span>
                                                            <span>Ký số xác nhận: <strong className="text-emerald-700">Đã ký ({session.signedDate})</strong></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-3 mt-6">
                                                    <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-900 text-xs font-semibold transition-all" type="button">
                                                        <span className="material-symbols-outlined text-[18px]">history_edu</span>
                                                        <span>Xem lại nhật ký giám sát AI</span>
                                                    </button>
                                                    <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all" type="button">
                                                        <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                                                        <span>Tải biên bản có chữ ký số (.PDF)</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center">
                                                <div className="flex items-center gap-4">
                                                    {/* Mini Donut Chart Simulation */}
                                                    <div className="relative w-16 h-16 flex-shrink-0">
                                                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                                            <path
                                                                className="text-slate-200"
                                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            />
                                                            <path
                                                                className="text-blue-900"
                                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeDasharray="100, 100"
                                                                strokeLinecap="round"
                                                                strokeWidth="4"
                                                            />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-900">
                                                            {session.completionRate}%
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-slate-900">Tỷ lệ nộp bài chuẩn</span>
                                                        <span className="text-xs text-slate-500">Không có sự cố ngắt kết nối kỹ thuật</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-200">
                            <div className="text-xs text-slate-500">
                                Hiển thị <strong>{filteredSessions.length}</strong> trên tổng số <strong>12</strong> ca thi được phân công
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    className="p-2 rounded-xl bg-slate-100 text-slate-400 cursor-not-allowed"
                                    disabled
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                </button>
                                <button className="w-9 h-9 rounded-xl bg-blue-900 text-white text-xs font-bold shadow-sm" type="button">
                                    1
                                </button>
                                <button className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold transition-colors" type="button">
                                    2
                                </button>
                                <button className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold transition-colors" type="button">
                                    3
                                </button>
                                <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors" type="button">
                                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

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