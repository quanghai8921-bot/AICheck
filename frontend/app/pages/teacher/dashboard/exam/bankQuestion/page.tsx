"use client";
import React, { useState } from 'react';

// Sub-interface cho dữ liệu câu hỏi trong ngân hàng đề thi
interface ExamQuestion {
    id: string;
    code: string;
    subjectCode: string;
    subjectName: string;
    bloomLevel: string;
    bloomLabel: string;
    status: 'approved' | 'pending' | 'draft';
    statusLabel: string;
    promptText: string;
    questionType: string;
    timesUsed: number;
    discriminationIndex: number;
    author: string;
    rubricScore: number;
    rubricCriteriaCount?: number;
    rubricBreakdown?: { name: string; weight: string }[];
    isSqlSandbox?: boolean;
    evaluationNote?: string;
    reviewer?: string;
    reviewDate?: string;
}

export default function QuestionBankDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('CS201');
    const [selectedBloom, setSelectedBloom] = useState('C4-C5');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    // Danh sách câu hỏi mẫu từ giao diện
    const questions: ExamQuestion[] = [
        {
            id: '1',
            code: 'CS201-TL-084',
            subjectCode: 'CS201',
            subjectName: 'Cấu Trúc Dữ Liệu & Giải Thuật (CS201)',
            bloomLevel: 'C5',
            bloomLabel: 'Bloom C5 • Vận dụng cao',
            status: 'approved',
            statusLabel: 'Đã thẩm định & Đang lưu hành',
            promptText:
                'Phân tích độ phức tạp thời gian và không gian của thuật toán QuickSort trong trường hợp xấu nhất so với MergeSort. Hãy đề xuất cơ chế chọn pivot Median-of-three và viết mã giả cài đặt chứng minh sự triệt tiêu trường hợp suy thoái $O(N^2)$.',
            questionType: 'Tự luận học thuật kèm vẽ đồ thị bộ nhớ & mã giả',
            timesUsed: 3,
            discriminationIndex: 0.68,
            author: 'TS. Lê Quang Mai',
            rubricScore: 10.0,
            rubricCriteriaCount: 4,
        },
        {
            id: '2',
            code: 'ENG302-ESSAY-029',
            subjectCode: 'ENG302',
            subjectName: 'Kỹ Năng Viết Học Thuật (ENG302)',
            bloomLevel: 'Critical Analysis',
            bloomLabel: 'Critical Analysis • Vận dụng cao',
            status: 'approved',
            statusLabel: 'Đã thẩm định',
            promptText:
                '"Write a 1,200-word argumentative essay evaluating the ethical implications of Generative AI in higher education assessment. Provide at least three scholarly citations conforming strictly to APA 7th edition formatting and synthesize opposing viewpoints regarding academic integrity."',
            questionType: 'Essay',
            timesUsed: 2,
            discriminationIndex: 0.75,
            author: 'TS. Lê Quang Mai',
            rubricScore: 10.0,
            rubricBreakdown: [
                { name: 'Thesis Statement & Structure', weight: '20%' },
                { name: 'Evidence & Critical Thinking', weight: '40%' },
                { name: 'Academic Tone & Style', weight: '20%' },
                { name: 'APA 7th Citation Integrity', weight: '20%' },
            ],
        },
        {
            id: '3',
            code: 'DB102-SQL-041',
            subjectCode: 'DB102',
            subjectName: 'Cơ Sở Dữ Liệu Quan Hệ (DB102)',
            bloomLevel: 'C4',
            bloomLabel: 'Bloom C4 • Vận dụng',
            status: 'approved',
            statusLabel: 'Đã kiểm thử Sandbox thực thi SQL',
            promptText:
                'Cho lược đồ cơ sở dữ liệu quan hệ thương mại điện tử gồm 5 bảng (Orders, OrderItems, Customers, Products, Payments). Viết truy vấn báo cáo doanh thu theo tháng và giải thích kế hoạch thực thi (EXPLAIN ANALYZE) khi đánh chỉ mục B-Tree đa cột (composite index) so với Hash Index.',
            questionType: 'Tự động chấm cú pháp PostgreSQL 16 & Tự luận diễn giải 50/50',
            timesUsed: 5,
            discriminationIndex: 0.72,
            author: 'TS. Lê Quang Mai',
            rubricScore: 10.0,
            isSqlSandbox: true,
        },
        {
            id: '4',
            code: 'SE304-ARCH-015',
            subjectCode: 'SE304',
            subjectName: 'Thiết Kế Kiến Trúc Phần Mềm (SE304)',
            bloomLevel: 'Vận dụng cao',
            bloomLabel: 'Vận dụng cao • Phân tích hệ thống',
            status: 'pending',
            statusLabel: 'Chờ duyệt phản biện của Trưởng bộ môn',
            promptText:
                'Phân tích mô hình Event-Driven Architecture (sử dụng Apache Kafka/RabbitMQ) so với RESTful Microservices đồng bộ trong bài toán xử lý đối soát giao dịch tài chính với yêu cầu độ trễ cực thấp (Sub-millisecond) và đảm bảo tính nhất quán cuối cùng (Eventual Consistency).',
            questionType: 'Tự luận hệ thống',
            timesUsed: 0,
            discriminationIndex: 0.0,
            author: 'TS. Lê Quang Mai',
            rubricScore: 10.0,
            evaluationNote:
                'Cần làm rõ thêm tiêu chí chấm Rubric về sơ đồ trình tự Sequence Diagram ở thang điểm 8-10.',
            reviewer: 'PGS. TS. Trần Đình Hải',
            reviewDate: '18/10/2025',
        },
    ];

    // Lọc câu hỏi theo ô tìm kiếm và các dropdown lọc
    const filteredQuestions = questions.filter((q) => {
        const matchesSearch =
            q.promptText.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.subjectName.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (selectedSubject && q.subjectCode !== selectedSubject) return false;
        if (selectedStatus && q.status !== selectedStatus) return false;

        return true;
    });

    return (
        <div className="bg-slate-50 font-sans text-slate-900 antialiased min-h-screen flex flex-col">
            <div className="flex flex-1">
                {/* Main Workspace */}
                <main className="flex-1 w-full px-6 bg-slate-50 pb-6 pt-6">
                    <div className="flex flex-col w-full gap-6">
                        {/* Breadcrumbs & Header Banner */}
                        <div className="flex flex-col gap-1">
                            <nav className="flex items-center gap-1 text-xs text-slate-500">
                                <a className="hover:text-blue-900 transition-colors flex items-center gap-1" href="#">
                                    <span className="material-symbols-outlined text-[16px]">home</span>
                                    Trang chủ
                                </a>
                                <span className="text-slate-300">/</span>
                                <span className="text-slate-500">Tiện ích &amp; Khảo thí</span>
                                <span className="text-slate-300">/</span>
                                <span className="text-blue-900 font-semibold">Ngân hàng đề thi</span>
                            </nav>
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
                                <div>
                                    <h1 className="text-2xl text-slate-900 font-bold tracking-tight">
                                        Ngân Hàng Đề Thi &amp; Quản Lý Câu Hỏi Học Thuật
                                    </h1>
                                    <p className="text-sm text-slate-600 mt-0.5">
                                        Quản lý thư viện câu hỏi tự luận, đề thi chuẩn hóa có ma trận Rubric và kiểm định độ phân hóa kiến thức học thuật.
                                    </p>
                                </div>

                                {/* Quick Action Group */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold transition-all shadow-sm"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-slate-600">upload_file</span>
                                        <span>Nhập / Xuất Rubric</span>
                                    </button>
                                    <button
                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-sm font-semibold transition-all shadow-sm"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                                        <span>Tạo đề thi ma trận tự động</span>
                                    </button>
                                    <button
                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-sm font-semibold transition-all shadow-md"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                        <span>+ Thêm câu hỏi mới</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* KPI Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            {/* KPI 1 */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                                            Tổng câu hỏi lưu trữ
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl text-slate-900 font-bold">1,248</span>
                                            <span className="text-xs text-slate-500 font-medium">câu</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900">
                                        <span className="material-symbols-outlined text-[22px]">quiz</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-1 flex items-center justify-between text-xs text-slate-500">
                                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                                        <span className="material-symbols-outlined text-[16px]">trending_up</span>
                                        +42 câu mới
                                    </span>
                                    <span>Trong tháng 10/2025</span>
                                </div>
                            </div>

                            {/* KPI 2 */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                                            Bộ đề hoàn chỉnh duyệt
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl text-blue-900 font-bold">36</span>
                                            <span className="text-xs text-slate-500 font-medium">bộ đề</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                                        <span className="material-symbols-outlined text-[22px]">verified</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-1 flex items-center gap-1 text-xs text-slate-500">
                                    <span className="material-symbols-outlined text-[16px] text-emerald-700">lock</span>
                                    <span>Bảo mật chữ ký số SHA-256</span>
                                </div>
                            </div>

                            {/* KPI 3 */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                                            Độ phân biệt (D-Index)
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl text-emerald-700 font-bold">0.84</span>
                                            <span className="text-xs text-emerald-700 font-medium">Xuất sắc</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                                        <span className="material-symbols-outlined text-[22px]">analytics</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-1 flex items-center justify-between text-xs text-slate-500">
                                    <span>Chuẩn khảo thí quốc tế</span>
                                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold text-[10px]">≥ 0.40</span>
                                </div>
                            </div>

                            {/* KPI 4 */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                                            Chờ phản biện chuyên môn
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl text-red-600 font-bold">03</span>
                                            <span className="text-xs text-slate-500 font-medium">bộ đề</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-700">
                                        <span className="material-symbols-outlined text-[22px]">hourglass_top</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-1 flex items-center gap-1 text-xs text-red-600 font-semibold">
                                    <span className="material-symbols-outlined text-[16px]">priority_high</span>
                                    <span>Hạn thẩm định trước 30/10/2025</span>
                                </div>
                            </div>
                        </div>

                        {/* Search & Advanced Filter Panel */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                {/* Search Input */}
                                <div className="md:col-span-5 relative">
                                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                        search
                                    </span>
                                    <input
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-900/20 border border-transparent focus:border-slate-200 transition-all"
                                        placeholder="Tìm kiếm theo từ khóa, mã câu hỏi (CS201, ENG302), nội dung prompt..."
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Subject Filter */}
                                <div className="md:col-span-3">
                                    <div className="relative">
                                        <select
                                            className="w-full appearance-none pl-4 pr-8 py-2.5 rounded-xl bg-slate-100 text-slate-900 text-sm focus:outline-none cursor-pointer border border-transparent focus:border-slate-200"
                                            value={selectedSubject}
                                            onChange={(e) => setSelectedSubject(e.target.value)}
                                        >
                                            <option value="">Tất cả học phần (Khoa CNTT &amp; LL)</option>
                                            <option value="CS201">CS201 - Cấu trúc dữ liệu &amp; Giải thuật</option>
                                            <option value="ENG302">ENG302 - Viết học thuật nâng cao</option>
                                            <option value="DB102">DB102 - Hệ quản trị cơ sở dữ liệu</option>
                                            <option value="SE304">SE304 - Thiết kế kiến trúc phần mềm</option>
                                        </select>
                                        <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                            expand_more
                                        </span>
                                    </div>
                                </div>

                                {/* Bloom Taxonomy Filter */}
                                <div className="md:col-span-2">
                                    <div className="relative">
                                        <select
                                            className="w-full appearance-none pl-4 pr-8 py-2.5 rounded-xl bg-slate-100 text-slate-900 text-sm focus:outline-none cursor-pointer border border-transparent focus:border-slate-200"
                                            value={selectedBloom}
                                            onChange={(e) => setSelectedBloom(e.target.value)}
                                        >
                                            <option value="">Mức độ tư duy Bloom</option>
                                            <option value="C1">C1 - Nhận biết</option>
                                            <option value="C2">C2 - Thông hiểu</option>
                                            <option value="C3">C3 - Vận dụng</option>
                                            <option value="C4-C5">C4/C5 - Phân tích &amp; Đánh giá</option>
                                            <option value="C6">C6 - Sáng tạo tổng hợp</option>
                                        </select>
                                        <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                            expand_more
                                        </span>
                                    </div>
                                </div>

                                {/* Status Filter */}
                                <div className="md:col-span-2 flex items-center gap-1">
                                    <div className="relative w-full">
                                        <select
                                            className="w-full appearance-none pl-4 pr-8 py-2.5 rounded-xl bg-slate-100 text-slate-900 text-sm focus:outline-none cursor-pointer border border-transparent focus:border-slate-200"
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                        >
                                            <option value="">Trạng thái thẩm định</option>
                                            <option value="approved">Đã phê duyệt (Lưu hành)</option>
                                            <option value="pending">Chờ phản biện bộ môn</option>
                                            <option value="draft">Bản thảo giảng viên</option>
                                        </select>
                                        <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                            filter_alt
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Active Tags bar */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <span className="text-slate-500 font-semibold">Đang chọn:</span>
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-200 text-slate-800 font-medium">
                                        Học phần: {selectedSubject || 'Tất cả'} &amp; {selectedBloom || 'Mọi mức Bloom'}
                                        <span
                                            className="material-symbols-outlined text-[14px] cursor-pointer hover:text-red-600"
                                            onClick={() => {
                                                setSelectedSubject('');
                                                setSelectedBloom('');
                                            }}
                                        >
                                            close
                                        </span>
                                    </span>
                                    <button
                                        className="text-blue-900 text-xs hover:underline ml-1 font-semibold"
                                        type="button"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedSubject('');
                                            setSelectedBloom('');
                                            setSelectedStatus('');
                                        }}
                                    >
                                        Xóa bộ lọc
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span>
                                        Hiển thị <strong>{filteredQuestions.length}</strong> trên <strong>1,248</strong> câu hỏi đạt tiêu chí
                                    </span>
                                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                                        <button
                                            className={`p-1 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                                            title="Dạng bảng chi tiết"
                                            type="button"
                                            onClick={() => setViewMode('list')}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">view_list</span>
                                        </button>
                                        <button
                                            className={`p-1 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                                            title="Dạng lưới thẻ"
                                            type="button"
                                            onClick={() => setViewMode('grid')}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">grid_view</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Question Bank Repository List */}
                        <div className="flex flex-col gap-4">
                            {filteredQuestions.map((q) => {
                                const isApproved = q.status === 'approved';
                                const isPending = q.status === 'pending';

                                return (
                                    <div
                                        key={q.id}
                                        className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden ${isPending ? 'border-amber-300' : ''
                                            }`}
                                    >
                                        {isPending && <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400"></div>}

                                        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 pb-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-sm font-bold px-3 py-1 rounded-lg bg-blue-900 text-white">
                                                    {q.code}
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold">
                                                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                                                    {q.bloomLabel}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    Học phần: <strong>{q.subjectName}</strong>
                                                </span>
                                                <span className="text-slate-300">•</span>
                                                <span className={`inline-flex items-center gap-1 text-xs font-semibold ${isApproved ? 'text-emerald-700' : 'text-amber-700'}`}>
                                                    <span className={`w-2 h-2 rounded-full ${isApproved ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                                                    {q.statusLabel}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 self-end xl:self-auto">
                                                <button
                                                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-blue-900 text-xs font-semibold transition-all flex items-center gap-1"
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                                                    {isPending ? 'Gửi duyệt lại' : 'Xem trước ca thi'}
                                                </button>
                                                <button
                                                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center gap-1"
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                                                    Nhân bản
                                                </button>
                                                <button
                                                    className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold transition-all flex items-center gap-1 shadow-xs"
                                                    type="button"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                                    Chỉnh sửa
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content Prompt Body */}
                                        <div className="my-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                            <p className="text-sm text-slate-900 font-medium leading-relaxed">
                                                {q.promptText}
                                            </p>
                                        </div>

                                        {/* Extended Rubric Breakdown / Metadata */}
                                        {q.rubricBreakdown ? (
                                            <div className="flex flex-col gap-2 pt-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="text-xs text-slate-500 font-semibold">Thang Rubric đánh giá:</span>
                                                    {q.rubricBreakdown.map((r, i) => (
                                                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs">
                                                            {r.name}: <strong>{r.weight}</strong>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1 items-center">
                                                <div className="md:col-span-8 flex flex-wrap items-center gap-y-2 gap-x-4 text-slate-500 text-xs">
                                                    <div className="flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[16px] text-slate-400">draw</span>
                                                        <span>Hình thức: {q.questionType}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[16px] text-slate-400">history</span>
                                                        <span>Đã dùng: <strong>{q.timesUsed} ca thi gần nhất</strong></span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[16px] text-emerald-600">tune</span>
                                                        <span>Độ khó khảo thí: <strong>{q.discriminationIndex}</strong> (Phân hóa xuất sắc)</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[16px] text-slate-400">badge</span>
                                                        <span>Tác giả: <strong>{q.author}</strong></span>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-4 flex items-center justify-end">
                                                    <button
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold transition-all"
                                                        type="button"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">fact_check</span>
                                                        <span>Ma trận Rubric 4 tiêu chí ({q.rubricScore.toFixed(1)} Điểm)</span>
                                                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Pending Review Feedback Note */}
                                        {q.evaluationNote && (
                                            <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-slate-700 text-xs">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[18px] text-amber-600">feedback</span>
                                                    <span>
                                                        Ghi chú từ Hội đồng thẩm định: <em>"{q.evaluationNote}"</em>
                                                    </span>
                                                </div>
                                                <span className="text-slate-500 font-semibold">{q.reviewer} • {q.reviewDate}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination & Matrix Guidelines */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start pt-1">
                            {/* Guidelines Block */}
                            <div className="lg:col-span-8 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-blue-900 font-bold">Chỉ Dẫn Chuẩn Hóa Ma Trận Đề Thi Tự Luận</span>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Mỗi đề thi được tự động sinh ngẫu nhiên từ ngân hàng cần đảm bảo độ bao phủ kiến thức tối thiểu 70% chuẩn đầu ra môn học (CLO), kết hợp ít nhất 2 mức độ tư duy Bloom (C3-C5) và kèm ma trận Rubric định lượng chi tiết cho hội đồng giám khảo 2 vòng độc lập.
                                    </p>
                                    <div className="flex items-center gap-4 mt-1 text-xs">
                                        <a className="text-blue-900 font-bold hover:underline flex items-center gap-1" href="#">
                                            <span className="material-symbols-outlined text-[16px]">download</span>
                                            Tải mẫu khung Rubric chuẩn ISO/IEC 17024 (.docx)
                                        </a>
                                        <span className="text-slate-300">•</span>
                                        <a className="text-slate-500 hover:text-slate-900" href="#">Quy chuẩn đánh giá độ phân biệt Item Analysis</a>
                                    </div>
                                </div>
                            </div>

                            {/* Pagination Controls */}
                            <div className="lg:col-span-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between h-full">
                                <div className="flex items-center justify-between text-xs text-slate-500 pb-3">
                                    <span>Trang <strong>1</strong> / <strong>312</strong></span>
                                    <span>20 mục / trang</span>
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                    <button
                                        className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center cursor-not-allowed"
                                        disabled
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                    </button>
                                    <button className="w-9 h-9 rounded-xl bg-blue-900 text-white font-bold text-xs flex items-center justify-center shadow-sm" type="button">
                                        1
                                    </button>
                                    <button className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-semibold flex items-center justify-center transition-colors" type="button">
                                        2
                                    </button>
                                    <button className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-semibold flex items-center justify-center transition-colors" type="button">
                                        3
                                    </button>
                                    <span className="px-1 text-slate-400 font-bold">...</span>
                                    <button className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-semibold flex items-center justify-center transition-colors" type="button">
                                        312
                                    </button>
                                    <button className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors" type="button">
                                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                    </button>
                                </div>
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