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
}

interface ListExamPageProps {
  onNavigateToStudent?: () => void;
  onNavigateToExam?: () => void;
}

export const ListExamPage: React.FC<ListExamPageProps> = ({ onNavigateToStudent, onNavigateToExam }) => {
  const router = useRouter();
  // --- States ---
  const [exams, setExams] = useState<ExamSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [studentCode, setStudentCode] = useState<string>('Sinh viên');

  const [filterTab, setFilterTab] = useState<'open' | 'upcoming'>('open');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Real-time Clock State (NTP Clock Simulation)
  const [currentTime, setCurrentTime] = useState<string>('10:27:50');
  const [currentDate, setCurrentDate] = useState<string>('');

  // Modal Passcode State
  const [selectedExamForModal, setSelectedExamForModal] = useState<ExamSession | null>(null);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<boolean>(false);
  const [passcodeErrorMessage, setPasscodeErrorMessage] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // --- Hàm định dạng thời gian ---
  const formatTime = (isoString?: string) => {
    if (!isoString) return '--:--';
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  const calculateTimeRemaining = (endAt?: string) => {
    if (!endAt) return '00h 00m';
    const diffMs = new Date(endAt).getTime() - new Date().getTime();
    if (diffMs <= 0) return 'Đã kết thúc';
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m`;
  };

  const calculateOpenAfter = (startAt?: string) => {
    if (!startAt) return '--h --m';
    const diffMs = new Date(startAt).getTime() - new Date().getTime();
    if (diffMs <= 0) return 'Đang mở';
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m`;
  };

  // --- Đồng hồ và ngày tháng thời gian thực ---
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setCurrentTime(timeStr);

      const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const dayName = daysOfWeek[now.getDay()];
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      setCurrentDate(`${dayName}, ${day}/${month}/${year}`);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Gọi API lấy danh sách kỳ thi thực từ Backend ---
  const fetchExams = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const token = sessionStorage.getItem('accessToken');
    const savedStudentCode = sessionStorage.getItem('studentCode');
    if (savedStudentCode) {
      setStudentCode(savedStudentCode);
    }

    if (!token) {
      router.push('/pages/student/auth');
      return;
    }

    try {
      const apiUrl = 'http://localhost:8080';
      const authHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      // Gọi 1 API duy nhất lấy danh sách kỳ thi (cả Actived và Prepare)
      const res = await fetch(`${apiUrl}/api/v1/student/exams`, {
        method: 'GET',
        headers: authHeaders,
      });

      if (res.status === 401 || res.status === 403) {
        sessionStorage.clear();
        router.push('/pages/student/auth');
        return;
      }

      const data = res.ok ? await res.json() : [];

      const mappedExams: ExamSession[] = (data || []).map((item: any, index: number) => {
        const isActived = item.status?.toLowerCase() === 'actived';
        return {
          id: item.examId || `exam-${index + 1}`,
          courseCode: item.courseCode || 'AICHECK',
          classCode: item.courseCode ? `${item.courseCode}.01` : 'Lớp chung',
          courseTitle: item.title || item.courseTitle || 'Bài kiểm tra học phần',
          examType: item.type || item.examType || 'Thi Tự Luận',
          durationMinutes: item.durationMinutes || 60,
          openWindow: `${formatTime(item.startAt)} — ${formatTime(item.endAt)}`,
          roomCode: 'P.ONLINE-01',
          proctorName: item.proctorName || 'Giám thị Hội đồng',
          isOpen: isActived,
          timeRemainingText: calculateTimeRemaining(item.endAt),
          openAfterText: calculateOpenAfter(item.startAt),
        };
      });

      setExams(mappedExams);
    } catch (err: any) {
      console.error('Lỗi khi tải kỳ thi:', err);
      setErrorMessage('Không thể kết nối đến máy chủ lấy danh sách kỳ thi. Vui lòng kiểm tra lại!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // --- Lọc danh sách ca thi theo Tab và Tìm kiếm ---
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesTab = filterTab === 'open' ? exam.isOpen : !exam.isOpen;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        exam.courseTitle.toLowerCase().includes(q) ||
        exam.courseCode.toLowerCase().includes(q) ||
        exam.classCode.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [exams, filterTab, searchQuery]);

  // --- Handlers ---
  const handleOpenPasscodeModal = (exam: ExamSession) => {
    setSelectedExamForModal(exam);
    setPasscodeInput('');
    setPasscodeError(false);
    setPasscodeErrorMessage('');
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
    setPasscodeErrorMessage('');
  };

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExamForModal) return;

    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      router.push('/pages/student/auth');
      return;
    }

    const trimmedPasscode = passcodeInput.trim();
    if (!trimmedPasscode) {
      setPasscodeError(true);
      setPasscodeErrorMessage('Vui lòng nhập mã bảo mật phòng thi.');
      return;
    }

    try {
      setIsVerifying(true);
      setPasscodeError(false);
      setPasscodeErrorMessage('');

      const res = await fetch(`http://localhost:8080/api/v1/student/exams/${selectedExamForModal.id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          examId: selectedExamForModal.id,
          passcode: trimmedPasscode,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.valid) {
        // Lưu thông tin kỳ thi đang làm vào sessionStorage
        sessionStorage.setItem('currentExamId', selectedExamForModal.id);
        sessionStorage.setItem('currentExamTitle', selectedExamForModal.courseTitle);
        sessionStorage.setItem('currentCourseCode', selectedExamForModal.courseCode);

        handleClosePasscodeModal();
        handleNavigateToExam();
      } else {
        setPasscodeError(true);
        setPasscodeErrorMessage(data?.message || 'Mã passcode không chính xác hoặc kỳ thi chưa mở.');
      }
    } catch (err) {
      console.error('Lỗi khi xác thực passcode:', err);
      setPasscodeError(true);
      setPasscodeErrorMessage('Không thể kết nối đến máy chủ xác thực. Vui lòng thử lại!');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans antialiased flex flex-col">
      {/* 1. THÊM HEADER VÀO ĐÂY */}
      <Header
        isLoggedIn={true}
        user={{
          name: studentCode,
          studentId: studentCode,
          department: "Thí sinh dự thi",
          shortName: studentCode.slice(0, 2).toUpperCase()
        }}
        onLogout={() => {
          // Xử lý khi thí sinh bấm Đăng xuất từ dropdown Header
          if (typeof window !== 'undefined') {
            sessionStorage.clear();
          }
          router.push('/pages/home');
        }}
      />

      {/* 2. MAIN CONTENT AREA */}
      <main className="w-full flex-1 bg-slate-100">
        <div className="flex flex-col w-full">
          {/* Greeting & Telemetry Section */}
          <section className="w-full px-4 md:px-6 py-6 bg-white border-b border-slate-200">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                    <span className="material-symbols-outlined text-[15px]">event</span>
                    {currentDate || 'Đang cập nhật...'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-[#00236f] border border-[#dce1ff] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono tracking-wide">{currentTime}</span>
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#00236f] tracking-tight mt-1">
                  Xin chào, {studentCode}
                </h1>
                <p className="text-xs md:text-sm text-slate-500">
                  MSSV: <span className="font-semibold text-slate-800">{studentCode}</span> • Lịch thi tập trung trực tuyến
                </p>
              </div>

              {/* Bento-style Metric Chips */}
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl shadow-xs flex flex-col justify-center min-w-[120px]">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Môn thi hôm nay</span>
                    <span className="material-symbols-outlined text-[#00236f] text-[20px]">assignment</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-900 mt-1">
                    {exams.length.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400">Tổng số ca thi</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl shadow-xs flex flex-col justify-center min-w-[120px]">
                  <div className="flex items-center justify-between text-xs text-emerald-800">
                    <span>Đang mở đề</span>
                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">edit_document</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-950 mt-1">
                    {exams.filter((e) => e.isOpen).length.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Sẵn sàng nhận bài</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Exam Hub Area */}
          <div className="w-full px-4 md:px-6 py-8 max-w-5xl mx-auto">
            {/* Header with Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-[#00236f]">
                  Danh Sách Môn Thi Trực Tuyến Hôm Nay
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Vui lòng kiểm tra kỹ số phòng thi, đường truyền và nhập mã ca thi chính xác trước khi mở đề.
                </p>
              </div>

              {/* Ô tìm kiếm môn thi */}
              <div className="relative w-full md:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Tìm theo tên môn, mã HP..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#00236f] focus:ring-2 focus:ring-[#00236f]/10 shadow-xs"
                />
              </div>
            </div>

            {/* TAB CHUYỂN ĐỔI: ĐANG MỞ / SẮP MỞ */}
            <div className="flex items-center gap-2 mb-6 p-1.5 bg-slate-200/70 rounded-2xl w-fit">
              {/* Tab 1: Đang mở đề */}
              <button
                type="button"
                onClick={() => setFilterTab('open')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterTab === 'open'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Đang mở đề</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${filterTab === 'open'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-300/70 text-slate-700'
                    }`}
                >
                  {exams.filter((e) => e.isOpen).length}
                </span>
              </button>

              {/* Tab 2: Sắp mở */}
              <button
                type="button"
                onClick={() => setFilterTab('upcoming')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterTab === 'upcoming'
                  ? 'bg-white text-amber-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px] text-amber-500">
                  lock_clock
                </span>
                <span>Sắp mở</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${filterTab === 'upcoming'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-300/70 text-slate-700'
                    }`}
                >
                  {exams.filter((e) => !e.isOpen).length}
                </span>
              </button>
            </div>

            {/* Exam Cards List */}
            <div className="flex flex-col gap-6">
              {isLoading ? (
                <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-4 border-[#00236f] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-semibold">Đang tải danh sách kỳ thi...</p>
                </div>
              ) : errorMessage ? (
                <div className="bg-rose-50 rounded-2xl p-6 text-center text-rose-700 border border-rose-200 flex flex-col items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-rose-500">error</span>
                  <p className="text-sm font-semibold">{errorMessage}</p>
                  <button
                    onClick={fetchExams}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    Thử lại
                  </button>
                </div>
              ) : filteredExams.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
                  <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">
                    search_off
                  </span>
                  <p className="text-sm font-semibold">
                    {searchQuery.trim()
                      ? 'Không tìm thấy ca thi phù hợp với từ khóa'
                      : filterTab === 'open'
                        ? 'Hiện không có ca thi nào đang mở đề'
                        : 'Hiện không có ca thi nào sắp mở'}
                  </p>
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
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00236f] via-[#1e3a8a] to-emerald-600" />
                    )}

                    {/* Top Status Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      {exam.isOpen ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff4ff] text-[#00236f] text-xs font-bold border border-[#dce1ff]">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00236f] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00236f]" />
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
                      <h3 className="text-lg md:text-xl font-bold text-[#00236f] leading-snug mt-1">
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
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#00236f] shadow-xs shrink-0">
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
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#00236f] shadow-xs shrink-0">
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

                    {/* Action Footbar */}
                    <div className="flex items-center justify-end pt-4">
                      {exam.isOpen ? (
                        <button
                          onClick={() => handleOpenPasscodeModal(exam)}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
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
          </div>

          {/* 3. MODAL XÁC THỰC PASSCODE */}
          {selectedExamForModal && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-150 border border-slate-200">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#dce9ff] text-[#00236f] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">key</span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-[#00236f]">
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
                    <span className="font-bold text-[#00236f]">{selectedExamForModal.courseCode}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#00236f] font-semibold">
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
                  </div>
                </div>

                {/* Form Input */}
                <form onSubmit={handlePasscodeSubmit} className="flex flex-col gap-4 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-bold text-slate-800 uppercase tracking-wider text-center"
                      htmlFor="passcodeInput"
                    >
                      Mã bảo mật phòng thi
                    </label>
                    <div className="relative flex items-center justify-center">
                      <input
                        autoComplete="off"
                        value={passcodeInput}
                        onChange={(e) => {
                          setPasscodeInput(e.target.value);
                          setPasscodeError(false);
                        }}
                        className="w-full text-center font-mono tracking-[0.35em] text-2xl uppercase font-bold py-3 px-4 rounded-xl bg-white text-[#00236f] border-2 border-[#00236f]/40 focus:border-[#00236f] focus:outline-none focus:ring-4 focus:ring-[#00236f]/15 transition-all shadow-xs"
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
                        <span>{passcodeErrorMessage || 'Mã ca thi không chính xác. Vui lòng kiểm tra lại với Giám thị.'}</span>
                      </div>
                    )}
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <button
                      onClick={handleClosePasscodeModal}
                      disabled={isVerifying}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors disabled:opacity-50"
                      type="button"
                    >
                      Hủy Bỏ
                    </button>
                    <button
                      disabled={isVerifying}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold transition-all shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                    >
                      {isVerifying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Đang Xác Thực...</span>
                        </>
                      ) : (
                        <>
                          <span>Xác Nhận &amp; Vào Phòng Thi</span>
                          <span className="material-symbols-outlined text-[18px]">login</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ListExamPage;