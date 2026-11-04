"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/StudentHeader';

// Cấu trúc dữ liệu ca thi
interface ExamSession {
  id: string;
  courseCode: string;
  classCode: string;
  courseTitle: string;
  examType: string;
  durationMinutes: number;
  openWindow: string;
  roomCode: string;
  proctorName: string;
  isOpen: boolean;
  timeRemainingText?: string;
  openAfterText?: string;
  webcamStatus: string;
  micStatus: string;
  browserStatus: string;
}

const EXAM_SESSIONS_DATA: ExamSession[] = [
  {
    id: '1',
    courseCode: 'ENG302',
    classCode: 'ENG302.24',
    courseTitle: 'Kỹ Năng Viết Học Thuật Tiếng Anh Nâng Cao (Academic Writing & Critical Essays)',
    examType: 'Thi Viết Tự Luận & Báo Cáo Học Thuật (Online Essay Writing)',
    durationMinutes: 90,
    openWindow: '08:00 — 09:30',
    roomCode: 'P.LAB-04',
    proctorName: 'TS. Nguyễn Văn A',
    isOpen: true,
    timeRemainingText: '01h 14m',
    webcamStatus: 'Chuẩn',
    micStatus: 'Hoạt động',
    browserStatus: 'An toàn',
  },
  {
    id: '2',
    courseCode: 'PHI102',
    classCode: 'PHI102.08',
    courseTitle: 'Triết Học Mác - Lênin & Phương Pháp Luận Nghiên Cứu',
    examType: 'Thi Viết Tự Luận 2 Câu Hỏi Mở • Tra cứu tài liệu mở',
    durationMinutes: 60,
    openWindow: '14:00 — 15:00',
    roomCode: 'P.HALL-02',
    proctorName: 'ThS. Lê Q. Mai',
    isOpen: false,
    openAfterText: '05h 28m',
    webcamStatus: 'Sẵn sàng',
    micStatus: 'Sẵn sàng',
    browserStatus: 'Chờ kích hoạt',
  },
];

interface ListExamPageProps {
  onNavigateToStudent?: () => void;
  onNavigateToExam?: () => void;
}

export const ListExamPage: React.FC<ListExamPageProps> = ({ onNavigateToStudent, onNavigateToExam }) => {
  const router = useRouter();
  // --- States ---
  const [filterTab, setFilterTab] = useState<'all' | 'open'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Real-time Clock State (NTP Clock Simulation)
  const [currentTime, setCurrentTime] = useState<string>('10:27:50');

  // Modal Passcode State
  const [selectedExamForModal, setSelectedExamForModal] = useState<ExamSession | null>(null);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<boolean>(false);

  // --- Đồng hồ thời gian thực ---
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setCurrentTime(timeStr);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Lọc danh sách ca thi ---
  const filteredExams = useMemo(() => {
    return EXAM_SESSIONS_DATA.filter((exam) => {
      const matchesTab = filterTab === 'all' || (filterTab === 'open' && exam.isOpen);
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        exam.courseTitle.toLowerCase().includes(q) ||
        exam.courseCode.toLowerCase().includes(q) ||
        exam.classCode.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [filterTab, searchQuery]);

  // --- Handlers ---
  const handleOpenPasscodeModal = (exam: ExamSession) => {
    setSelectedExamForModal(exam);
    setPasscodeInput('');
    setPasscodeError(false);
  };

  const handleNavigateToExam = () => {
    if (onNavigateToExam) {
      onNavigateToExam(); // ✅ Gọi prop được truyền từ component cha (App/Page)
    } else {
      // Nếu dùng Next.js Router:
      router.push('/pages/student/exam/doing');
    }
  };

  const handleClosePasscodeModal = () => {
    setSelectedExamForModal(null);
    setPasscodeInput('');
    setPasscodeError(false);
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim().toUpperCase() === 'ENG84K' || passcodeInput.trim().length === 6) {
      alert(`Xác thực thành công! Hệ thống đang kích hoạt chế độ Fullscreen Lockdown cho môn ${selectedExamForModal?.courseCode}...`);
      handleClosePasscodeModal();
      handleNavigateToExam();
    } else {
      setPasscodeError(true);
    }
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
        <div className="flex flex-col w-full">
          {/* Greeting & Telemetry Section */}
          <section className="w-full px-4 md:px-6 py-6 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                    <span className="material-symbols-outlined text-[15px]">event</span>
                    Thứ Năm, 24/10/2024
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono tracking-wide">{currentTime}</span>
                    <span className="text-slate-400 font-normal text-[11px]">UTC+7 (NTP Sync)</span>
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-blue-950 tracking-tight mt-1">
                  Xin chào, Nguyễn Văn An
                </h1>
                <p className="text-xs md:text-sm text-slate-500">
                  MSSV: <span className="font-semibold text-slate-800">SV2024-8841</span> • Khoa Công nghệ Thông tin • Lịch thi tập trung học kỳ 1 năm học 2024–2025
                </p>
              </div>

              {/* Bento-style Metric Chips */}
              <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl shadow-xs flex flex-col justify-center min-w-[120px]">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Môn thi hôm nay</span>
                    <span className="material-symbols-outlined text-blue-600 text-[20px]">assignment</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-900 mt-1">02</span>
                  <span className="text-[10px] text-slate-400">Tổng số ca thi</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl shadow-xs flex flex-col justify-center min-w-[120px]">
                  <div className="flex items-center justify-between text-xs text-emerald-800">
                    <span>Đang mở đề</span>
                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">edit_document</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-950 mt-1">01</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Sẵn sàng nhận bài</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl shadow-xs flex flex-col justify-center min-w-[120px]">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>AI Proctoring</span>
                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">security</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 mt-1">SẴN SÀNG</span>
                  <span className="text-[10px] text-slate-400">Thiết bị đạt chuẩn</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Exam Hub Area */}
          <div className="w-full px-4 md:px-6 py-8 max-w-7xl mx-auto">
            {/* Header with Filters & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-blue-950">
                  Danh Sách Môn Thi Trực Tuyến Hôm Nay
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Vui lòng kiểm tra kỹ số phòng thi, đường truyền và nhập mã ca thi chính xác trước khi mở đề.
                </p>
              </div>

              {/* Filter Tabs + Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="inline-flex p-1 bg-slate-200 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setFilterTab('all')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${filterTab === 'all'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                    type="button"
                  >
                    Tất cả ca thi ({EXAM_SESSIONS_DATA.length})
                  </button>
                  <button
                    onClick={() => setFilterTab('open')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${filterTab === 'open'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                    type="button"
                  >
                    Đang mở ({EXAM_SESSIONS_DATA.filter((e) => e.isOpen).length})
                  </button>
                </div>

                <div className="relative">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors shadow-xs"
                    placeholder="Tìm theo mã môn hoặc tên..."
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-[18px]">
                    search
                  </span>
                </div>
              </div>
            </div>

            {/* Layout Grid: Exam Cards (8 cols) + Diagnostics Checklist (4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Exam Cards */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {filteredExams.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">
                      search_off
                    </span>
                    <p className="text-sm font-semibold">Không tìm thấy ca thi phù hợp</p>
                  </div>
                ) : (
                  filteredExams.map((exam) => (
                    <article
                      key={exam.id}
                      className={`bg-white rounded-2xl border border-slate-200 p-6 relative overflow-hidden transition-all duration-300 ${exam.isOpen
                        ? 'shadow-md hover:shadow-lg'
                        : 'opacity-90 hover:opacity-100 shadow-sm'
                        }`}
                    >
                      {/* Top Accent Gradient (chỉ cho card đang mở) */}
                      {exam.isOpen && (
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />
                      )}

                      {/* Top Status Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        {exam.isOpen ? (
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                            </span>
                            ĐANG MỞ ĐỀ THI • CA THI VIẾT SỐ 1
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                            <span className="material-symbols-outlined text-[16px]">lock_clock</span>
                            CHƯA ĐẾN GIỜ MỞ ĐỀ • DỰ KIẾN 13:45
                          </div>
                        )}

                        <div className="text-xs font-bold">
                          {exam.isOpen ? (
                            <span className="inline-flex items-center gap-1 text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                              <span className="material-symbols-outlined text-[16px]">alarm</span>
                              Thời gian mở đề còn: {exam.timeRemainingText}
                            </span>
                          ) : (
                            <span className="text-slate-500">Ca thi buổi Chiều (Hôm nay)</span>
                          )}
                        </div>
                      </div>

                      {/* Subject Meta & Title */}
                      <div className="mb-4">
                        <span className="text-xs text-slate-400 tracking-wider uppercase font-bold">
                          Mã Học Phần: {exam.courseCode} • Lớp HP: {exam.classCode}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-blue-950 leading-snug mt-1">
                          {exam.courseTitle}
                        </h3>
                        <div className="flex items-center gap-1 text-slate-500 mt-1 text-xs">
                          <span className="material-symbols-outlined text-[18px]">history_edu</span>
                          <span>Hình thức: {exam.examType}</span>
                        </div>
                      </div>

                      {/* Key Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl mb-4 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-xs shrink-0">
                            <span className="material-symbols-outlined text-[22px]">timer</span>
                          </div>
                          <div className="flex flex-col text-xs min-w-0">
                            <span className="text-slate-500">Thời lượng làm bài</span>
                            <span className="font-bold text-slate-800 text-sm">
                              {exam.durationMinutes} Phút
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-xs shrink-0">
                            <span className="material-symbols-outlined text-[22px]">
                              nest_clock_farsight_analog
                            </span>
                          </div>
                          <div className="flex flex-col text-xs min-w-0">
                            <span className="text-slate-500">Khung giờ mở đề</span>
                            <span className="font-bold text-slate-800 text-sm">
                              {exam.openWindow}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Diagnostics Summary or Advisory */}
                      {exam.isOpen ? (
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-4 text-xs border-b border-slate-100">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 text-emerald-700 font-medium">
                              <span className="material-symbols-outlined text-[18px]">videocam</span>
                              Webcam: {exam.webcamStatus}
                            </span>
                            <span className="flex items-center gap-1 text-emerald-700 font-medium">
                              <span className="material-symbols-outlined text-[18px]">mic</span>
                              Micro: {exam.micStatus}
                            </span>
                            <span className="flex items-center gap-1 text-emerald-700 font-medium">
                              <span className="material-symbols-outlined text-[18px]">verified</span>
                              Trình duyệt: {exam.browserStatus}
                            </span>
                          </div>
                          <span className="text-slate-400 italic">Yêu cầu nhập Passcode từ giám thị</span>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs">
                          <div className="flex items-center gap-1 text-slate-500">
                            <span className="material-symbols-outlined text-[18px]">
                              notification_important
                            </span>
                            <span>Hệ thống mở phòng chuẩn bị trước giờ thi 15 phút (lúc 13:45).</span>
                          </div>
                        </div>
                      )}

                      {/* Action Footbar */}
                      <div className="flex items-center justify-end pt-4">
                        {exam.isOpen ? (
                          <button
                            onClick={() => handleOpenPasscodeModal(exam)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                            type="button"
                          >
                            <span>VÀO THI NGAY</span>
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed border border-slate-200"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">lock</span>
                            <span>Chưa Đến Giờ Thi (Mở sau {exam.openAfterText})</span>
                          </button>
                        )}
                      </div>
                    </article>
                  ))
                )}
              </div>

              {/* Right Column: Devices & Rules Widget */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600 text-[22px]">
                        health_and_safety
                      </span>
                      Kiểm Tra Thiết Bị Thi
                    </h4>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
                      Tự động
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Hệ thống giám sát AI liên tục theo dõi tình trạng môi trường làm bài.
                  </p>
                  <div className="flex flex-col gap-2.5 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                          videocam
                        </span>
                        <span className="font-medium text-slate-800">Camera hình ảnh</span>
                      </div>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        HD 1080p
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                          mic
                        </span>
                        <span className="font-medium text-slate-800">Micro thu âm</span>
                      </div>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Tín hiệu tốt
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                          wifi
                        </span>
                        <span className="font-medium text-slate-800">Độ trễ mạng</span>
                      </div>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        18ms (Tuyệt vời)
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                          fullscreen
                        </span>
                        <span className="font-medium text-slate-800">Trình duyệt SafeExam</span>
                      </div>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Sẵn sàng khóa
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. MODAL XÁC THỰC PASSCODE */}
          {selectedExamForModal && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-150 border border-slate-200">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">key</span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-blue-950">
                        Xác Thực Mã Ca Thi Từ Giám Thị
                      </h3>
                      <p className="text-xs text-slate-500">
                        Nhập mã bảo mật 6 ký tự để mở khóa đề thi viết.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClosePasscodeModal}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                {/* Summary Info */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-700">{selectedExamForModal.courseCode}</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 font-semibold">
                      Phòng: {selectedExamForModal.roomCode}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 text-sm truncate">
                    {selectedExamForModal.courseTitle}
                  </span>
                  <div className="flex items-center gap-3 text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">timer</span>
                      <span>Thời lượng: {selectedExamForModal.durationMinutes} Phút</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">verified_user</span>
                      <span>Giám sát AI tích hợp</span>
                    </span>
                  </div>
                </div>

                {/* Form Input */}
                <form onSubmit={handlePasscodeSubmit} className="flex flex-col gap-4 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-bold text-slate-800 uppercase tracking-wider text-center"
                      htmlFor="passcodeInput"
                    >
                      Mã bảo mật phòng thi (Passcode)
                    </label>
                    <div className="relative flex items-center justify-center">
                      <input
                        autoComplete="off"
                        value={passcodeInput}
                        onChange={(e) => {
                          setPasscodeInput(e.target.value);
                          setPasscodeError(false);
                        }}
                        className="w-full text-center font-mono tracking-[0.35em] text-2xl uppercase font-bold py-3 px-4 rounded-xl bg-white text-blue-900 border-2 border-blue-600/40 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/15 transition-all shadow-xs"
                        maxLength={6}
                        placeholder="VD: ENG84K"
                        required
                        spellCheck="false"
                        type="text"
                      />
                    </div>
                    {passcodeError && (
                      <div className="text-rose-600 text-center flex items-center justify-center gap-1 mt-1 font-semibold">
                        <span className="material-symbols-outlined text-[16px]">error</span>
                        <span>Mã ca thi không chính xác. Vui lòng kiểm tra lại với Giám thị.</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100 text-slate-600 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">
                      fullscreen
                    </span>
                    <span>
                      <strong>Lưu ý giám sát:</strong> Sau khi xác thực thành công, giao diện sẽ kích hoạt chế độ toàn màn hình <em>(Full-screen Lockdown)</em>. Thoát khỏi màn hình quá 3 lần sẽ bị đình chỉ bài thi.
                    </span>
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <button
                      onClick={handleClosePasscodeModal}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                      type="button"
                    >
                      Hủy Bỏ
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md active:scale-[0.98]"
                      type="submit"
                    >
                      <span>Xác Nhận &amp; Vào Phòng Thi</span>
                      <span className="material-symbols-outlined text-[18px]">login</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

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

export default ListExamPage;