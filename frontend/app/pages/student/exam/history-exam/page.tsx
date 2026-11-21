'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/layout/StudentHeader';
import { useRouter } from 'next/navigation';
import { getStudentExamHistory, HistoryExamResponse } from '@/app/services/examService';

export const HistoryExamPage: React.FC = () => {
  const router = useRouter();

  // --- States ---
  const [historyList, setHistoryList] = useState<HistoryExamResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [studentCode, setStudentCode] = useState<string>('');

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Modal Phúc Khảo State
  const [selectedReviewExam, setSelectedReviewExam] = useState<HistoryExamResponse | null>(null);
  const [reviewReason, setReviewReason] = useState<string>('');

  // Modal Chi Tiết Bài Nộp State
  const [selectedDetailExam, setSelectedDetailExam] = useState<HistoryExamResponse | null>(null);

  // --- Fetch Data ---
  const fetchHistory = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
    const savedCode = typeof window !== 'undefined' ? sessionStorage.getItem('studentCode') : null;
    if (savedCode) {
      setStudentCode(savedCode);
    }

    if (!token) {
      router.push('/pages/student/auth');
      return;
    }

    try {
      const data = await getStudentExamHistory();
      setHistoryList(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Không thể tải lịch sử làm bài thi. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // --- Điểm & Xếp loại Helpers ---
  const getGradeInfo = (score: number | null, statusGrading: string) => {
    const isGraded =
      statusGrading?.toUpperCase() === 'GRADED' ||
      statusGrading?.toUpperCase() === 'ĐÃ CHẤM' ||
      (score !== null && score !== undefined);

    if (!isGraded || score === null || score === undefined) {
      return {
        scoreDisplay: '--',
        letterGrade: '?',
        badgeText: 'Chờ chấm',
        colorClass: 'bg-amber-500 text-white',
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    }

    const s = Number(score);
    if (s >= 9.0) {
      return {
        scoreDisplay: s.toFixed(1),
        letterGrade: 'A+',
        badgeText: 'Xuất sắc',
        colorClass: 'bg-emerald-600 text-white',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    }
    if (s >= 8.5) {
      return {
        scoreDisplay: s.toFixed(1),
        letterGrade: 'A',
        badgeText: 'Giỏi',
        colorClass: 'bg-[#00236f] text-white',
        badgeBg: 'bg-blue-50 text-[#00236f] border-blue-200',
      };
    }
    if (s >= 8.0) {
      return {
        scoreDisplay: s.toFixed(1),
        letterGrade: 'B+',
        badgeText: 'Khá Giỏi',
        colorClass: 'bg-[#00236f] text-white',
        badgeBg: 'bg-blue-50 text-[#00236f] border-blue-200',
      };
    }
    if (s >= 7.0) {
      return {
        scoreDisplay: s.toFixed(1),
        letterGrade: 'B',
        badgeText: 'Khá',
        colorClass: 'bg-indigo-600 text-white',
        badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      };
    }
    if (s >= 6.5) {
      return {
        scoreDisplay: s.toFixed(1),
        letterGrade: 'C+',
        badgeText: 'Trung bình khá',
        colorClass: 'bg-amber-600 text-white',
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    }
    if (s >= 5.5) {
      return {
        scoreDisplay: s.toFixed(1),
        letterGrade: 'C',
        badgeText: 'Trung bình',
        colorClass: 'bg-amber-600 text-white',
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    }
    if (s >= 5.0) {
      return {
        scoreDisplay: s.toFixed(1),
        letterGrade: 'D+',
        badgeText: 'TB Yếu',
        colorClass: 'bg-orange-600 text-white',
        badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      };
    }
    if (s >= 4.0) {
      return {
        scoreDisplay: s.toFixed(1),
        letterGrade: 'D',
        badgeText: 'Đạt',
        colorClass: 'bg-orange-600 text-white',
        badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      };
    }
    return {
      scoreDisplay: s.toFixed(1),
      letterGrade: 'F',
      badgeText: 'Chưa đạt',
      colorClass: 'bg-rose-600 text-white',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    };
  };

  const getSubmissionBadge = (status?: string | null) => {
    if (!status) return null;
    const s = status.trim().toUpperCase();
    let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
    if (s === 'SUBMITTED' || s === 'ĐÃ NỘP') {
      colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (s === 'LATE' || s === 'NỘP MUỘN') {
      colorClass = 'bg-rose-50 text-rose-700 border-rose-200';
    } else if (s === 'IN_PROGRESS' || s === 'DOING') {
      colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
    }
    return { text: status, className: colorClass };
  };

  const getGradingBadge = (status?: string | null) => {
    if (!status) return null;
    const s = status.trim().toUpperCase();
    let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
    if (s === 'GRADED' || s === 'ĐÃ CHẤM') {
      colorClass = 'bg-blue-50 text-[#00236f] border-blue-200';
    } else if (s === 'PENDING' || s === 'CHƯA CHẤM' || s === 'NOT_GRADED') {
      colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
    }
    return { text: status, className: colorClass };
  };

  // --- Thống kê tổng quan ---
  const stats = useMemo(() => {
    const total = historyList.length;
    const graded = historyList.filter(
      (item) => item.statusGrading?.toUpperCase() === 'GRADED' || item.score !== null
    );
    const gradedCount = graded.length;
    const sumScore = graded.reduce((acc, curr) => acc + (curr.score ? Number(curr.score) : 0), 0);
    const avgScore = gradedCount > 0 ? (sumScore / gradedCount).toFixed(2) : '--';

    return { total, gradedCount, avgScore };
  }, [historyList]);

  // --- Filter Logic ---
  const filteredExams = useMemo(() => {
    return historyList.filter((item) => {
      // Lọc trạng thái chấm điểm
      const isGraded =
        item.statusGrading?.toUpperCase() === 'GRADED' ||
        item.statusGrading?.toUpperCase() === 'ĐÃ CHẤM' ||
        item.score !== null;

      let matchStatus = true;
      if (statusFilter === 'graded') {
        matchStatus = isGraded;
      } else if (statusFilter === 'pending') {
        matchStatus = !isGraded;
      }

      // Lọc từ khóa tìm kiếm
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        (item.subjectName && item.subjectName.toLowerCase().includes(q)) ||
        (item.examTitle && item.examTitle.toLowerCase().includes(q)) ||
        (item.historyId && item.historyId.toLowerCase().includes(q)) ||
        (item.examId && item.examId.toLowerCase().includes(q));

      return matchStatus && matchSearch;
    });
  }, [historyList, statusFilter, searchQuery]);

  // --- Handlers Modal Phúc Khảo ---
  const handleOpenReviewModal = (exam: HistoryExamResponse) => {
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
      `Đã gửi đơn phúc khảo bài thi "${selectedReviewExam?.subjectName || selectedReviewExam?.examTitle}" tới Ban Thư Ký Khảo Thí!`
    );
    handleCloseReviewModal();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans antialiased flex flex-col">
      {/* 1. HEADER */}
      <Header
        isLoggedIn={true}
        user={{
          name: studentCode ? `Sinh viên (${studentCode})` : 'Sinh viên',
          studentId: studentCode || 'SV-AICHECK',
          department: 'Khoa Công nghệ Thông tin',
          shortName: studentCode ? studentCode.slice(-2).toUpperCase() : 'SV',
        }}
        onLogout={() => {
          if (typeof window !== 'undefined') {
            sessionStorage.clear();
          }
          router.push('/pages/home');
        }}
      />

      {/* 2. MAIN CONTENT AREA */}
      <main className="w-full flex-1 bg-slate-100">
        <div className="relative w-full overflow-hidden">
          {/* Ambient blur background */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#dce9ff]/60 blur-3xl pointer-events-none" />
          <div className="absolute top-96 -left-32 w-80 h-80 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col gap-6">
            {/* Breadcrumb Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <button
                  className="flex items-center gap-1 font-semibold text-[#00236f] hover:text-blue-800 transition-colors"
                  type="button"
                  onClick={() => router.push('/pages/student/exam/listExam')}
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Danh sách môn thi hôm nay</span>
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-600 font-medium">Lịch sử bài thi đã nộp</span>
              </div>
            </div>

            {/* Candidate Header Banner */}
            <div className="relative w-full rounded-2xl bg-white p-5 md:p-6 shadow-sm border border-slate-200 overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#00236f]" />
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-200 shrink-0 shadow-inner flex items-center justify-center bg-gradient-to-br from-[#00236f] to-blue-700 text-white">
                    <span className="material-symbols-outlined text-4xl">school</span>
                    <div
                      className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white"
                      title="Trạng thái: Đã đăng nhập"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#00236f] font-bold uppercase tracking-wider">
                        Sinh viên chính quy
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                        Hệ Thống AICheck
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                      Lịch Sử Bài Thi Của Tôi
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#00236f]">
                          badge
                        </span>
                        Mã sinh viên:{' '}
                        <strong className="text-slate-800">{studentCode || 'Đang cập nhật'}</strong>
                      </span>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#00236f]">
                          history_edu
                        </span>
                        Tổng số bài thi đã làm:{' '}
                        <strong className="text-slate-800">{stats.total} bài</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Academic Quick Stats */}
                <div className="grid grid-cols-3 gap-3 self-stretch lg:self-auto">
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 uppercase font-semibold">Đã làm</span>
                    <span className="text-lg font-bold text-[#00236f]">{stats.total}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                    <span className="text-[11px] text-blue-600 uppercase font-semibold">Đã chấm</span>
                    <span className="text-lg font-bold text-blue-700">{stats.gradedCount}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <span className="text-[11px] text-emerald-600 uppercase font-semibold">ĐTB</span>
                    <span className="text-lg font-bold text-emerald-700">{stats.avgScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters & View Controls */}
            <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                {/* Select Trạng thái chấm điểm */}
                <div className="relative min-w-[200px]">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-slate-400 pointer-events-none">
                    filter_alt
                  </span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer appearance-none"
                  >
                    <option value="all">Tất cả bài thi ({historyList.length})</option>
                    <option value="graded">Đã có điểm chấm ({stats.gradedCount})</option>
                    <option value="pending">Đang chờ chấm ({stats.total - stats.gradedCount})</option>
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
                    placeholder="Tìm theo tên môn học hoặc tên kỳ thi..."
                    type="text"
                  />
                </div>
              </div>

              {/* Counter, Refresh & View Mode Toggle */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                <button
                  onClick={fetchHistory}
                  disabled={isLoading}
                  title="Tải lại danh sách"
                  className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors flex items-center justify-center disabled:opacity-50"
                  type="button"
                >
                  <span className={`material-symbols-outlined text-[18px] ${isLoading ? 'animate-spin' : ''}`}>
                    refresh
                  </span>
                </button>

                <span className="text-xs text-slate-500">
                  Hiển thị <strong className="text-[#00236f] font-bold">{filteredExams.length}</strong> bài thi
                </span>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white text-[#00236f] shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Dạng danh sách"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">view_list</span>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white text-[#00236f] shadow-sm'
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

            {/* Error Message Box */}
            {errorMessage && (
              <div className="w-full bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-rose-700 text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-rose-600">error</span>
                  <span>{errorMessage}</span>
                </div>
                <button
                  onClick={fetchHistory}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg transition-colors shrink-0"
                >
                  Thử lại
                </button>
              </div>
            )}

            {/* Loading Skeleton */}
            {isLoading && (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse flex flex-col md:flex-row gap-6 justify-between"
                  >
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-1/4" />
                      <div className="h-6 bg-slate-200 rounded w-3/4" />
                      <div className="h-16 bg-slate-100 rounded w-full" />
                    </div>
                    <div className="w-full md:w-64 h-32 bg-slate-100 rounded-xl shrink-0" />
                  </div>
                ))}
              </div>
            )}

            {/* Examination History List / Grid Container */}
            {!isLoading && (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'flex flex-col gap-6'
                }
              >
                {filteredExams.length === 0 ? (
                  <div className="col-span-full bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
                    <span className="material-symbols-outlined text-5xl text-slate-300 mb-2">
                      fact_check
                    </span>
                    <p className="text-sm font-semibold text-slate-700">
                      {historyList.length === 0
                        ? 'Bạn chưa có lịch sử làm bài thi nào'
                        : 'Không tìm thấy bài thi phù hợp với bộ lọc'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                      {historyList.length === 0
                        ? 'Các bài thi tự luận bạn đã hoàn thành và nộp bài sẽ tự động xuất hiện tại đây kèm điểm số và nhận xét.'
                        : 'Vui lòng thử lại từ khóa khác hoặc chuyển bộ lọc sang "Tất cả bài thi".'}
                    </p>
                    {historyList.length === 0 && (
                      <button
                        onClick={() => router.push('/pages/student/exam/listExam')}
                        className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#00236f] hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        <span>Xem danh sách bài thi hôm nay</span>
                      </button>
                    )}
                  </div>
                ) : (
                  filteredExams.map((item) => {
                    const gradeInfo = getGradeInfo(item.score, item.statusGrading);
                    const subBadge = getSubmissionBadge(item.statusSubmission);
                    const gradBadge = getGradingBadge(item.statusGrading);
                    const isGraded =
                      item.statusGrading?.toUpperCase() === 'GRADED' ||
                      item.statusGrading?.toUpperCase() === 'ĐÃ CHẤM' ||
                      item.score !== null;

                    return (
                      <div
                        key={item.historyId || item.examId}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200 overflow-hidden flex flex-col"
                      >
                        <div className="p-5 md:p-6 flex flex-col lg:flex-row lg:items-start justify-between gap-6 flex-1">
                          {/* Left Info & Feedback */}
                          <div className="flex-1 flex flex-col gap-4">
                            {/* Badges & Titles */}
                            <div className="flex flex-col gap-1.5">
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                {subBadge && (
                                  <span className={`px-2.5 py-0.5 rounded-md font-semibold border ${subBadge.className}`}>
                                    {item.statusSubmission}
                                  </span>
                                )}
                                {gradBadge && (
                                  <span className={`px-2.5 py-0.5 rounded-md font-semibold border ${gradBadge.className}`}>
                                    {item.statusGrading}
                                  </span>
                                )}
                                {item.historyId && (
                                  <span className="px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-500 font-mono text-[11px] border border-slate-100 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[13px]">fingerprint</span>
                                    {item.historyId.substring(0, 8)}...
                                  </span>
                                )}
                              </div>

                              <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                                {item.subjectName || 'Môn học chưa xác định'}
                              </h2>

                              <p className="text-xs text-slate-600 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[15px] text-[#00236f]">
                                  assignment
                                </span>
                                Kỳ thi: <span className="font-semibold text-slate-800">{item.examTitle || 'Bài kiểm tra tự luận'}</span>
                              </p>
                            </div>

                            {/* Feedback Box */}
                            <div className="relative bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                              <div className="flex items-center gap-1.5 text-[#00236f] mb-1.5 text-xs font-bold uppercase tracking-wider">
                                <span className="material-symbols-outlined text-[18px]">
                                  format_quote
                                </span>
                                <span>Nhận xét của Giảng viên chấm thi:</span>
                              </div>
                              {item.feedback && item.feedback.trim() ? (
                                <p className="text-slate-700 italic text-sm leading-relaxed pl-1 font-serif">
                                  "{item.feedback}"
                                </p>
                              ) : (
                                <p className="text-slate-400 italic text-xs pl-1">
                                  {isGraded
                                    ? 'Giảng viên không để lại nhận xét bằng lời cho bài thi này.'
                                    : 'Bài làm đang trong quá trình chấm điểm, nhận xét sẽ hiển thị khi có kết quả chính thức.'}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Right Grade Visual & Action Buttons */}
                          <div className="w-full lg:w-72 shrink-0 flex flex-col justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                            {/* Điểm tổng kết */}
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase font-semibold">
                                  Điểm số đạt được
                                </span>
                                <div className="flex items-baseline gap-1 mt-0.5">
                                  <span className="text-3xl font-bold text-[#00236f]">
                                    {gradeInfo.scoreDisplay}
                                  </span>
                                  <span className="text-base text-slate-400 font-medium">
                                    / 10
                                  </span>
                                </div>
                              </div>
                              <div
                                className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl ${gradeInfo.colorClass} shadow-sm`}
                              >
                                <span className="text-xl font-bold leading-none">
                                  {gradeInfo.letterGrade}
                                </span>
                                <span className="text-[10px] uppercase font-medium mt-0.5 text-center px-1">
                                  {gradeInfo.badgeText}
                                </span>
                              </div>
                            </div>

                            {/* Summary info chips */}
                            <div className="flex flex-col gap-2 py-2 bg-white p-3 rounded-lg border border-slate-100 text-xs">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-500">Trạng thái bài nộp:</span>
                                <span className="font-semibold text-slate-800">{item.statusSubmission}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-500">Tiến độ chấm:</span>
                                <span className="font-semibold text-slate-800">{item.statusGrading}</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 text-xs">
                              <button
                                onClick={() => setSelectedDetailExam(item)}
                                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#00236f] hover:bg-blue-900 text-white font-semibold transition-all shadow-sm"
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  visibility
                                </span>
                                <span>Xem thông tin bài thi</span>
                              </button>

                              {isGraded && (
                                <button
                                  onClick={() => handleOpenReviewModal(item)}
                                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium transition-all"
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[16px]">
                                    gavel
                                  </span>
                                  <span>Đề nghị phúc khảo</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 3. MODAL XEM THÔNG TIN BÀI THI */}
      {selectedDetailExam && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-150">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#00236f] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">assignment</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Thông tin bài thi đã nộp
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    {selectedDetailExam.subjectName || 'Chi tiết bài thi'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDetailExam(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-5 flex flex-col gap-4 text-xs">
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Môn học:</span>
                  <span className="font-bold text-slate-800">{selectedDetailExam.subjectName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Kỳ thi:</span>
                  <span className="font-semibold text-slate-800">{selectedDetailExam.examTitle}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Điểm số:</span>
                  <span className="font-bold text-[#00236f]">
                    {selectedDetailExam.score !== null ? `${Number(selectedDetailExam.score).toFixed(1)} / 10` : 'Chờ chấm điểm'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Trạng thái nộp bài:</span>
                  <span className="font-semibold text-slate-800">{selectedDetailExam.statusSubmission}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Trạng thái chấm:</span>
                  <span className="font-semibold text-slate-800">{selectedDetailExam.statusGrading}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 font-mono text-[11px]">
                  <span className="text-slate-500 font-sans">Mã lịch sử (History ID):</span>
                  <span className="text-slate-600 truncate max-w-[240px]">{selectedDetailExam.historyId}</span>
                </div>
                <div className="flex justify-between py-1 font-mono text-[11px]">
                  <span className="text-slate-500 font-sans">Mã kỳ thi (Exam ID):</span>
                  <span className="text-slate-600 truncate max-w-[240px]">{selectedDetailExam.examId}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                <span className="font-semibold text-slate-700">Nhận xét của Giảng viên:</span>
                <p className="text-slate-600 italic">
                  {selectedDetailExam.feedback && selectedDetailExam.feedback.trim()
                    ? `"${selectedDetailExam.feedback}"`
                    : 'Chưa có nhận xét cho bài thi này.'}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedDetailExam(null)}
                  className="px-4 py-2 rounded-xl bg-[#00236f] hover:bg-blue-900 text-white font-semibold transition-colors"
                  type="button"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL ĐƠN PHÚC KHẢO */}
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
                    {selectedReviewExam.subjectName}
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
                <span className="font-bold text-[#00236f] text-sm">
                  {selectedReviewExam.subjectName} - {selectedReviewExam.examTitle}
                </span>
                <div className="flex items-center justify-between text-slate-600 pt-2 mt-1 border-t border-slate-200">
                  <span>
                    Điểm số hiện tại:{' '}
                    <strong className="text-[#00236f] font-bold">
                      {selectedReviewExam.score !== null ? Number(selectedReviewExam.score).toFixed(1) : '--'}/10
                    </strong>
                  </span>
                  <span>
                    Trạng thái:{' '}
                    <strong className="text-slate-800">{selectedReviewExam.statusGrading}</strong>
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

              <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce1ff] flex items-start gap-2 text-[#00236f]">
                <span className="material-symbols-outlined text-[18px] text-[#00236f] shrink-0 mt-0.5">
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
                  className="px-5 py-2 rounded-xl bg-[#00236f] hover:bg-blue-900 text-white font-bold transition-all shadow-sm flex items-center gap-1.5"
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
    </div>
  );
};

export default HistoryExamPage;
