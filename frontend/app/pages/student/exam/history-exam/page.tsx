'use client';
import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/StudentHeader';
import { useRouter } from 'next/navigation';

// Cấu trúc dữ liệu bài thi lịch sử
interface MetricBar {
  label: string;
  score: string;
  percentage: number;
}

interface ExamHistoryItem {
  code: string;
  name: string;
  semester: string;
  typeText: string;
  durationText: string;
  dateText: string;
  shiftText: string;
  lecturerName: string;
  lecturerAvatar: string;
  department: string;
  feedbackText: string;
  similarityText: string;
  feedbackTime: string;
  finalScore: number;
  letterGrade: string;
  gradeBadgeText: string;
  metrics: MetricBar[];
}

const EXAM_HISTORY_DATA: ExamHistoryItem[] = [
  {
    code: 'CS201',
    name: 'Cấu Trúc Dữ Liệu & Giải Thuật Ứng Dụng',
    semester: 'hk1-2024-2025',
    typeText: 'Tự luận giải thuật',
    durationText: '120 phút',
    dateText: '12/10/2024',
    shiftText: 'Ca thi 02 (09:30 - 11:30)',
    lecturerName: 'TS. Lê Quang Mai',
    lecturerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsN8snxtVzJr_Z-SwaavNtl64fWYtCXDGrmVE_Xg-iAmI-KHatyBtoGffBfQz8wuttwNqbwMw8BSsCM9KQXO7N_3gCi_EKG2n7LWxiBfeh0dZdv9IsNpfOtNhJBwHT1W0NMV9zWvru4musXTTb6ml7KwTqK8TuS8Ls4dT1CKYkJM__vWx3GPWLf3uvAS77ATH5eupdrjiLkB2m_FkHOx-Za6tD45-Ym13ROCIaIM9u-uj7k1g9lzZG_Q',
    department: 'Bộ môn Khoa Học Máy Tính',
    feedbackText:
      'Phần lập luận thuật toán tối ưu tốt, mã giả rõ ràng, bài viết tự luận phân tích độ phức tạp thời gian O(n log n) rất sâu sắc và thuyết phục.',
    similarityText: '3.2%',
    feedbackTime: '14:20 13/10/2024',
    finalScore: 9.0,
    letterGrade: 'A',
    gradeBadgeText: 'Xuất sắc',
    metrics: [
      { label: 'Thuật toán & Độ phức tạp:', score: '4.8 / 5.0', percentage: 96 },
      { label: 'Trình bày mã giả & Luận điểm:', score: '4.2 / 5.0', percentage: 84 },
    ],
  },
  {
    code: 'OOP301',
    name: 'Kỹ Thuật Lập Trình Nâng Cao & Thiết Kế Hướng Đối Tượng',
    semester: 'hk1-2024-2025',
    typeText: 'Thiết kế phần mềm & Tự luận',
    durationText: '90 phút',
    dateText: '28/09/2024',
    shiftText: 'Ca thi 01 (07:30 - 09:00)',
    lecturerName: 'ThS. Hoàng Thị Phương Lan',
    lecturerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA7SjEA2I4U0pm9cxMh90cnDRIBw17nIrcW6eMCU0pWeR_n26EKnPYNN4OnenJ-tM-BN7X57DwQrFo8emAIdvQ6JrX9QXsv66hWCutGjcSjKeMXY6BbIiGTvebO5sX7kjanxsWPF1f93EuXv14jagoXXesghVkJ5d__6Gg0MaAnWkxrb1Z64Lnwsps4IwG-HSIggAv2X3moK0ur5--hv6s8SkylkKsbginwpnb3McggFG4giQYwKVGGtQ',
    department: 'Bộ môn Công Nghệ Phần Mềm',
    feedbackText:
      'Cấu trúc thiết kế mẫu áp dụng chuẩn xác. Cần lưu ý giải thích chi tiết hơn ở câu hỏi mở về nguyên lý Dependency Inversion.',
    similarityText: '4.8%',
    feedbackTime: '09:15 30/09/2024',
    finalScore: 8.5,
    letterGrade: 'B+',
    gradeBadgeText: 'Giỏi',
    metrics: [
      { label: 'Thiết kế mẫu & Kiến trúc:', score: '4.5 / 5.0', percentage: 90 },
      { label: 'Nguyên lý SOLID & Tự luận:', score: '4.0 / 5.0', percentage: 80 },
    ],
  },
  {
    code: 'ENG201',
    name: 'Kỹ Năng Viết Học Thuật Tiếng Anh Cơ Bản',
    semester: 'hk2-2023-2024',
    typeText: 'Academic Essay Writing',
    durationText: '100 phút',
    dateText: '15/06/2024',
    shiftText: 'Ca thi 03 (13:30 - 15:10)',
    lecturerName: 'ThS. David Henderson',
    lecturerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTRP8hg1FWNX0ToQG-6F_AQW1rx8wd4PxGVtmZpiX9LEEhptNdpX7pzztSQYzJdzxP4Ewp7OjtmMsx5Iw2ACBgPb5-n4W_9Dw777_2mpIxKCWkkTLg6CAKFl93KrB6AOWkZJ7xaVdfV5IMn_yk5iRgq358LrDPYSX3YUpeNrAV2KU04KoklwD6NsdDsA23FZk1WayIrr8q8kIfh6TJlTJz_Qu63gHMfKPM5SPLXM3RM6LTFfiwREj0Cw',
    department: 'Khoa Ngoại Ngữ Chuyên Ngành',
    feedbackText:
      'Luận điểm (thesis statement) gãy gọn, từ vựng học thuật đa dạng. Đoạn kết luận cần liên kết chặt chẽ hơn với bối cảnh thực tiễn.',
    similarityText: '2.1%',
    feedbackTime: '16:45 18/06/2024',
    finalScore: 8.2,
    letterGrade: 'B+',
    gradeBadgeText: 'Khá Giỏi',
    metrics: [
      { label: 'Thesis & Argumentation:', score: '4.2 / 5.0', percentage: 84 },
      { label: 'Lexical Resource & Grammar:', score: '4.0 / 5.0', percentage: 80 },
    ],
  },
  {
    code: 'DB102',
    name: 'Cơ Sở Dữ Liệu & Hệ Quản Trị CSDL',
    semester: 'hk2-2023-2024',
    typeText: 'Tự luận thiết kế hệ thống',
    durationText: '120 phút',
    dateText: '04/05/2024',
    shiftText: 'Ca thi 01 (08:00 - 10:00)',
    lecturerName: 'PGS.TS. Nguyễn Thanh Hải',
    lecturerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDYurp3ZQHnkCTipwZD4tBLErQNDeROLfaIrCwijcy20VdpX4VZVMCEBdR2ILUyLSzvPAL_mPY5pjoIodkvb125294jkn8SzE6mWCgGoc-e5LsmKspnc3EtGQix63919N9OehHP2lCgLZHOg0ia0E6VwUgb4JY9tMUuuMXtEwCYMoA0FWBjVU6DNNw_DBt9cg2QDiXcyHzODe9zcmx-6M0DM_b8PHGo0F_DQS45ERNeJCI02dRaOtMMlQ',
    department: 'Viện Nghiên Cứu Hệ Thống Thông Tin',
    feedbackText:
      'Bài làm xuất sắc. Chuẩn hóa dạng 3NF và BCNF chính xác, câu tự luận mở về đánh chỉ mục truy vấn phân tán rất hay.',
    similarityText: '1.5%',
    feedbackTime: '11:30 06/05/2024',
    finalScore: 9.2,
    letterGrade: 'A+',
    gradeBadgeText: 'Xuất sắc',
    metrics: [
      { label: 'Chuẩn hóa lược đồ CSDL:', score: '4.9 / 5.0', percentage: 98 },
      { label: 'Tối ưu hóa chỉ mục truy vấn:', score: '4.3 / 5.0', percentage: 86 },
    ],
  },
];

export const HistoryExamPage: React.FC = () => {
  const router = useRouter();
  // --- States ---
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Modal Phúc Khảo State
  const [selectedReviewExam, setSelectedReviewExam] = useState<ExamHistoryItem | null>(null);
  const [reviewReason, setReviewReason] = useState<string>('');

  // --- Filter Logic ---
  const filteredExams = useMemo(() => {
    return EXAM_HISTORY_DATA.filter((item) => {
      const matchSemester =
        selectedSemester === 'all' || item.semester === selectedSemester;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.lecturerName.toLowerCase().includes(q);
      return matchSemester && matchSearch;
    });
  }, [selectedSemester, searchQuery]);

  // --- Handlers ---
  const handleOpenReviewModal = (exam: ExamHistoryItem) => {
    setSelectedReviewExam(exam);
    setReviewReason('');
  };

  const handleCloseReviewModal = () => {
    setSelectedReviewExam(null);
    setReviewReason('');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewReason.trim() || reviewReason.trim().length < 30) {
      alert('Vui lòng nhập lý do đề nghị phúc khảo cụ thể (tối thiểu 30 ký tự).');
      return;
    }
    alert(
      `Đã gửi đơn phúc khảo học phần ${selectedReviewExam?.code} - ${selectedReviewExam?.name} tới Ban Thư Ký Khảo Thí!`
    );
    handleCloseReviewModal();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans antialiased flex flex-col">
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
      {/* 2. MAIN CONTENT AREA */}
      <main className="w-full flex-1 bg-slate-100">
        <div className="relative w-full overflow-hidden">
          {/* Ambient blur background */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
          <div className="absolute top-96 -left-32 w-80 h-80 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col gap-6">
            {/* Breadcrumb Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <button
                  className="flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                  type="button"
                  onClick={() => router.push('/pages/student/exam/listExam')}
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Danh sách môn thi hôm nay</span>
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-600 font-medium">Lịch sử môn đã thi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 hidden md:inline">Dữ liệu đồng bộ:</span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-slate-200 text-xs text-slate-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Chữ ký số hợp lệ (AES-256)</span>
                </div>
              </div>
            </div>

            {/* Candidate Header Banner */}
            <div className="relative w-full rounded-2xl bg-white p-5 md:p-6 shadow-sm border border-slate-200 overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-blue-600" />
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-200 shrink-0 shadow-inner">
                    <img
                      className="w-full h-full object-cover"
                      alt="Avatar sinh viên"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSoxDzJmxjudxIqEOEPQ18Ye2FIId1yBM62oH5aLb6sf4WC2hFtgfXCjaBb-anYHDM1doC3FLbiXYPcz74zWqPRiiCmCPxOiYbNEMqV8_pz5zADBX6p4ur_E5Xv59bvaWvGR7XgyvUBtCxTJEumRz_pjJSnM8JsUyz7hSGoainE9PMVYuxbyp27acSY_RN4wXm-rs34RYvpeppYvVAPb0feJgrpx9BcBIkMujEdrzWDB1wmRm-vKQC9w"
                    />
                    <div
                      className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white"
                      title="Trạng thái: Đã xác thực sinh trắc học"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold uppercase tracking-wider">
                        Sinh viên chính quy
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                        Khóa K2024
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                      Nguyễn Văn An
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-blue-600">
                          badge
                        </span>
                        MSSV: <strong className="text-slate-800">SV2024-8841</strong>
                      </span>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-blue-600">
                          domain
                        </span>
                        Khoa Khoa Học Máy Tính &amp; Kỹ Thuật Thông Tin
                      </span>
                    </div>
                  </div>
                </div>

                {/* Academic Seal Badge */}
                <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 self-start lg:self-center">
                  <div className="w-11 h-11 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[26px]">verified</span>
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="text-slate-500 uppercase font-semibold">
                      Hội đồng Khảo thí
                    </span>
                    <span className="font-bold text-blue-900 text-sm">
                      Xác nhận Kết quả kỳ thi
                    </span>
                    <span className="text-slate-500">Cập nhật lúc 08:30 • 14/10/2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Statistics Bento Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat Card 1: GPA */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                      GPA Khảo thí bài viết
                    </span>
                    <span className="text-xs text-slate-400">Thang điểm 10.0</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">auto_stories</span>
                  </div>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-blue-900">8.6</span>
                      <span className="text-base text-slate-500 font-medium">/10</span>
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-0.5 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">trending_up</span>
                      Top 5% toàn niên khóa
                    </span>
                  </div>
                  {/* Radial SVG progress */}
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                      <circle
                        className="text-slate-100"
                        cx={18}
                        cy={18}
                        fill="none"
                        r={14}
                        stroke="currentColor"
                        strokeWidth={3}
                      />
                      <circle
                        className="text-blue-600"
                        cx={18}
                        cy={18}
                        fill="none"
                        r={14}
                        stroke="currentColor"
                        strokeDasharray="88, 100"
                        strokeLinecap="round"
                        strokeWidth={3}
                      />
                    </svg>
                    <span className="absolute text-[11px] font-bold text-blue-700">86%</span>
                  </div>
                </div>
              </div>

              {/* Stat Card 2: Completed Exams */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                      Bài thi hoàn thành
                    </span>
                    <span className="text-xs text-slate-400">Kỳ đánh giá chính thức</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-blue-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">
                      assignment_turned_in
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-blue-900">08</span>
                      <span className="text-xs text-slate-500 font-medium">học phần</span>
                    </div>
                    <span className="text-xs text-slate-500">Đã tích lũy đủ 24 tín chỉ</span>
                  </div>
                  <div className="w-16 h-8 flex items-end gap-1">
                    <span className="w-2.5 bg-blue-200 h-4 rounded-t-sm" />
                    <span className="w-2.5 bg-blue-300 h-6 rounded-t-sm" />
                    <span className="w-2.5 bg-blue-400 h-5 rounded-t-sm" />
                    <span className="w-2.5 bg-blue-600 h-8 rounded-t-sm" />
                  </div>
                </div>
              </div>

              {/* Stat Card 3: New Feedback */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                      Nhận xét mới
                    </span>
                    <span className="text-xs text-slate-400">Cần xem phản hồi</span>
                  </div>
                  <div className="relative w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">rate_review</span>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                  </div>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-blue-900">02</span>
                      <span className="text-xs text-slate-500 font-medium">bài thi</span>
                    </div>
                    <span className="text-xs text-blue-700 font-semibold">
                      TS. Lê Quang Mai &amp; ThS. Lan
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-[18px]">
                      chat_bubble
                    </span>
                  </div>
                </div>
              </div>

              {/* Stat Card 4: AI Proctoring */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                      Tuân thủ quy chế thi
                    </span>
                    <span className="text-xs text-slate-400">AI Proctoring &amp; Giám sát</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">security</span>
                  </div>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <span className="text-3xl font-bold text-slate-900 block leading-tight">
                      100%
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        check_circle
                      </span>
                      Không vi phạm liêm chính
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-[20px]">task_alt</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters & View Controls */}
            <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                {/* Select Học kỳ */}
                <div className="relative min-w-[240px]">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400 pointer-events-none">
                    calendar_month
                  </span>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer appearance-none"
                  >
                    <option value="all">Tất cả các học kỳ</option>
                    <option value="hk1-2024-2025">Học kỳ 1 năm học 2024-2025</option>
                    <option value="hk2-2023-2024">Học kỳ 2 năm học 2023-2024</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-slate-400 pointer-events-none">
                    expand_more
                  </span>
                </div>

                {/* Search Input */}
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400 pointer-events-none">
                    search
                  </span>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                    placeholder="Tìm kiếm theo tên môn thi hoặc mã học phần (CS201, OOP301...)"
                    type="text"
                  />
                </div>
              </div>

              {/* Counter & View Mode Toggle */}
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                <span className="text-xs text-slate-500">
                  Hiển thị <strong className="text-blue-700 font-bold">{filteredExams.length}</strong> bài thi tự luận
                </span>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${viewMode === 'list'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                      }`}
                    title="Dạng danh sách"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">view_list</span>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${viewMode === 'grid'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                      }`}
                    title="Dạng lưới"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Examination History List / Grid Container */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                  : 'flex flex-col gap-6'
              }
            >
              {filteredExams.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
                  <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">
                    search_off
                  </span>
                  <p className="text-sm font-semibold">Không tìm thấy bài thi phù hợp</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Vui lòng thử lại từ khóa hoặc chọn học kỳ khác.
                  </p>
                </div>
              ) : (
                filteredExams.map((item) => (
                  <div
                    key={item.code}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200 overflow-hidden"
                  >
                    <div className="p-5 md:p-6 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      {/* Left Info & Feedback */}
                      <div className="flex-1 flex flex-col gap-4">
                        {/* Tags & Subject Title */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-bold">
                              {item.code}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-blue-900 font-semibold">
                              {item.typeText} ({item.durationText})
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-800 flex items-center gap-1 font-medium">
                              <span className="material-symbols-outlined text-[14px]">
                                event
                              </span>
                              Ngày thi: {item.dateText}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-500 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">
                                lightbulb_2
                              </span>
                              {item.shiftText}
                            </span>
                          </div>
                          <h2 className="text-lg md:text-xl font-bold text-blue-950 tracking-tight">
                            {item.name}
                          </h2>
                        </div>

                        {/* Lecturer Card */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                            <img
                              className="w-full h-full object-cover"
                              alt={item.lecturerName}
                              src={item.lecturerAvatar}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-slate-400">Cán bộ chấm thi chính</span>
                            <span className="font-bold text-slate-800">
                              {item.lecturerName}
                            </span>
                          </div>
                          <span className="ml-auto px-2 py-0.5 rounded bg-slate-200 text-slate-600 hidden sm:inline-block">
                            {item.department}
                          </span>
                        </div>

                        {/* Feedback Box */}
                        <div className="relative bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                          <div className="flex items-center gap-1.5 text-blue-900 mb-1.5 text-xs font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[18px]">
                              format_quote
                            </span>
                            <span>Lời nhận xét chi tiết của Giảng viên:</span>
                          </div>
                          <p className="text-slate-700 italic text-sm leading-relaxed pl-1 font-serif">
                            "{item.feedbackText}"
                          </p>
                          <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 text-xs">
                            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                              <span className="material-symbols-outlined text-[15px]">
                                verified
                              </span>
                              Đã kiểm chứng tính liêm chính (Tương đồng {item.similarityText})
                            </span>
                            <span>•</span>
                            <span>Nhận xét lúc: {item.feedbackTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Grade Visual & Action Buttons */}
                      <div className="w-full lg:w-72 shrink-0 flex flex-col justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                        {/* Điểm tổng kết */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 uppercase font-semibold">
                              Điểm tổng kết
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-3xl font-bold text-blue-900">
                                {item.finalScore.toFixed(1)}
                              </span>
                              <span className="text-base text-slate-400 font-medium">
                                / 10
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-blue-600 text-white shadow-sm">
                            <span className="text-xl font-bold leading-none">
                              {item.letterGrade}
                            </span>
                            <span className="text-[10px] uppercase font-medium mt-0.5">
                              {item.gradeBadgeText}
                            </span>
                          </div>
                        </div>

                        {/* Metric mini-bars */}
                        <div className="flex flex-col gap-2 py-2 bg-white p-3 rounded-lg border border-slate-100 text-xs">
                          {item.metrics.map((m, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-slate-500">{m.label}</span>
                                <span className="text-blue-700 font-bold">{m.score}</span>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-blue-600 h-full rounded-full"
                                  style={{ width: `${m.percentage}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col gap-2 text-xs">
                          <button
                            onClick={() => {
                              alert(`Đang tải chi tiết bài làm & biên bản chấm điểm môn ${item.code}...`);
                              router.push(`/pages/student/exam/doing/details?code=${item.code}`);
                            }}
                            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-sm"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              description
                            </span>
                            <span>Xem chi tiết bài làm</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quy định Phúc khảo Footer Banner */}
            <div className="w-full bg-white rounded-2xl p-5 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[24px]">info</span>
                </div>
                <div className="flex flex-col gap-0.5 text-xs">
                  <span className="text-sm font-bold text-slate-900">
                    Quy định về Khiếu nại &amp; Phúc khảo điểm thi tự luận trực tuyến
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Thời hạn nộp đơn phúc khảo trực tuyến là trong vòng{' '}
                    <strong>07 ngày làm việc</strong> kể từ ngày công bố điểm thi. Mỗi ca thi chỉ được gửi tối đa một yêu cầu phúc khảo chính thức kèm theo lệ phí quy định.
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert('Đang tải văn bản Quy chế khảo thí 2024-2025 PDF...')}
                className="shrink-0 px-4 py-2 rounded-xl bg-slate-100 text-blue-900 hover:bg-slate-200 font-semibold text-xs border border-slate-200 transition-colors"
                type="button"
              >
                Quy chế khảo thí PDF
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. MODAL ĐƠN PHÚC KHẢO */}
      {selectedReviewExam && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-150">
            {/* Modal Header */}
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">gavel</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Đơn phúc khảo trực tuyến
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    {selectedReviewExam.code}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCloseReviewModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitReview} className="p-5 flex flex-col gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                <span className="text-slate-400">Học phần đề nghị:</span>
                <span className="font-bold text-blue-900 text-sm">
                  {selectedReviewExam.name}
                </span>
                <div className="flex items-center justify-between text-slate-600 pt-2 mt-1 border-t border-slate-200">
                  <span>
                    Điểm hiện tại:{' '}
                    <strong className="text-blue-700 font-bold">
                      {selectedReviewExam.finalScore.toFixed(1)}/10
                    </strong>
                  </span>
                  <span>
                    Giảng viên chấm 1:{' '}
                    <strong className="text-slate-800">{selectedReviewExam.lecturerName}</strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="font-semibold text-slate-800 flex items-center justify-between"
                  htmlFor="reviewReason"
                >
                  <span>Lý do đề nghị chấm lại bài thi (Bắt buộc):</span>
                  <span className="text-slate-400 font-normal">Tối thiểu 30 ký tự</span>
                </label>
                <textarea
                  id="reviewReason"
                  rows={4}
                  value={reviewReason}
                  onChange={(e) => setReviewReason(e.target.value)}
                  placeholder="Vui lòng chỉ rõ câu hỏi hoặc tiêu chí rubric bạn nhận thấy cần đối chiếu lại với barem đáp án..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-2 text-blue-900">
                <span className="material-symbols-outlined text-[18px] text-blue-600 shrink-0 mt-0.5">
                  verified_user
                </span>
                <span>
                  Khi gửi yêu cầu, bài làm sẽ được chuyển tới Ban Thư Ký Khảo Thí để chỉ định Giảng viên chấm độc lập thứ hai. Kết quả chấm lại là điểm số chính thức cuối cùng.
                </span>
              </div>

              {/* Modal Footer */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  onClick={handleCloseReviewModal}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                  type="button"
                >
                  Hủy bỏ
                </button>
                <button
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm flex items-center gap-1.5"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Xác nhận gửi đơn</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. FOOTER HỆ THỐNG */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs">
          <div className="flex flex-col">
            <span className="font-bold text-blue-900 text-sm">
              HỘI ĐỒNG KHẢO THÍ VÀ ĐẢM BẢO CHẤT LƯỢNG GIÁO DỤC
            </span>
            <span className="text-slate-500 mt-0.5">
              Cổng thông tin thi trực tuyến dành cho sinh viên chính quy • Bản quyền © 2026
            </span>
          </div>
          <div className="flex items-center gap-6 text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-600">
                support_agent
              </span>
              <span>Đường dây nóng: 1900 6886</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-600">
                verified_user
              </span>
              <span>Bảo mật AES-256</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default HistoryExamPage;