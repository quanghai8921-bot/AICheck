'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Cấu trúc dữ liệu cho đề bài duy nhất
interface ExamTopic {
  title: string;
  type: string;
  subtitle: string;
  points: number;
  targetWords: string;
  prompt: string;
  rubrics: { label: string; score: string }[];
}

const EXAM_TOPIC: ExamTopic = {
  title: 'Nghị luận & Kỹ năng Viết Học thuật',
  type: 'Tự luận Học thuật',
  subtitle: 'Tư duy phản biện và năng lực lập luận',
  points: 10.0,
  targetWords: '500 - 600 từ',
  prompt:
    'Trình bày suy nghĩ của anh/chị (khoảng 500 – 600 từ) về vai trò của Trí tuệ nhân tạo (AI) trong việc hỗ trợ phương pháp tự học và phát triển tư duy phản biện của học sinh, sinh viên trong kỷ nguyên số.',
  rubrics: [
    { label: 'Bố cục & Cấu trúc lập luận', score: '3.0đ' },
    { label: 'Luận điểm & Dẫn chứng thực tiễn', score: '4.0đ' },
    { label: 'Tư duy phản biện & Đề xuất giải pháp', score: '2.0đ' },
    { label: 'Chính tả, Ngữ pháp & Diễn đạt', score: '1.0đ' },
  ],
};

export const DoingPage: React.FC = () => {
  const router = useRouter();

  // --- States ---
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Thông tin sinh viên & ca thi thực tế
  const [studentInfo, setStudentInfo] = useState({
    name: 'Thí sinh',
    studentCode: '---',
    shortName: 'TS',
  });
  const [examMeta, setExamMeta] = useState({
    title: 'Kỳ thi đánh giá năng lực viết học thuật',
    courseCode: 'AICHECK',
  });

  // Nội dung bài làm
  const [answer, setAnswer] = useState<string>('');

  // Đồng hồ đếm ngược (84 phút 15 giây)
  const [timeLeft, setTimeLeft] = useState<number>(84 * 60 + 15);
  const editorRef = useRef<HTMLDivElement>(null);

  // --- Helper giải mã JWT Token có hỗ trợ Unicode UTF-8 (Tiếng Việt) ---
  const decodeJwtPayload = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const binaryStr = atob(base64);
      const bytes = Uint8Array.from(binaryStr, (c) => c.charCodeAt(0));
      return JSON.parse(new TextDecoder('utf-8').decode(bytes));
    } catch (e) {
      console.error('Lỗi giải mã token UTF-8:', e);
      return null;
    }
  };

  // --- Helper trích xuất chữ cái đầu ---
  const getInitials = (fullName: string) => {
    if (!fullName) return 'TS';
    const words = fullName.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  // --- Effects ---
  // 1. Đọc dữ liệu thực tế từ Access Token & Session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('accessToken');
      const savedCode = sessionStorage.getItem('studentCode') || '';
      const savedTitle = sessionStorage.getItem('currentExamTitle');
      const savedCourse = sessionStorage.getItem('currentCourseCode');

      if (savedTitle || savedCourse) {
        setExamMeta({
          title: savedTitle || 'Kỳ thi đánh giá năng lực viết học thuật',
          courseCode: savedCourse || 'AICHECK',
        });
      }

      if (token) {
        const payload = decodeJwtPayload(token);
        if (payload) {
          const name = payload.name || (savedCode ? `Thí sinh ${savedCode}` : 'Thí sinh');
          const code = savedCode || payload.preferred_username || '---';
          setStudentInfo({
            name,
            studentCode: code,
            shortName: getInitials(name),
          });
        } else if (savedCode) {
          setStudentInfo({
            name: `Thí sinh ${savedCode}`,
            studentCode: savedCode,
            shortName: savedCode.slice(-2).toUpperCase(),
          });
        }
      } else if (savedCode) {
        setStudentInfo({
          name: `Thí sinh ${savedCode}`,
          studentCode: savedCode,
          shortName: savedCode.slice(-2).toUpperCase(),
        });
      }
    }
  }, []);

  // 2. Đồng hồ đếm ngược
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format thời gian đếm ngược
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Tính toán số từ & số đoạn
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const paragraphCount = answer
    .split('\n')
    .filter((p) => p.trim().length > 0).length;

  // --- Handlers ---
  const handleEditorInput = () => {
    if (editorRef.current) {
      setAnswer(editorRef.current.innerText || '');
    }
  };

  const handleExecCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitModalOpen(false);
    alert('Nộp bài thi thành công! Hệ thống đang mã hóa và gửi bài về hội đồng thi.');
    router.push('/pages/student/exam/listExam');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans antialiased">
      {/* 1. HEADER CHÍNH */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="h-16 w-full px-4 md:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#00236f] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">school</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm md:text-base text-[#00236f] tracking-tight font-bold uppercase">
                  {examMeta.title}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Đang diễn ra
                </span>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                MÃ HỌC PHẦN: {examMeta.courseCode} • Khóa thi chuẩn hóa năng lực trực tuyến
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="material-symbols-outlined text-[#00236f] text-[20px]">
                timer
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Thời gian còn lại
                </span>
                <span className="font-mono text-base font-bold text-[#00236f]">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-1 text-slate-500 text-xs">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                cloud_done
              </span>
              <span>Tự động lưu bài làm</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs font-semibold cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">help</span>
              <span className="hidden md:inline">Trợ giúp &amp; Quy chế</span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-slate-800 leading-tight">
                  {studentInfo.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  MSSV: {studentInfo.studentCode} • Thí sinh dự thi
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#00236f] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                {studentInfo.shortName}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. KHU VỰC NỘI DUNG CHÍNH (TOÀN MÀN HÌNH KHÔNG CẦN SIDEBAR CHUYỂN CÂU) */}
      <div className="pt-16">
        <main className="relative min-h-[calc(100vh-64px)] flex flex-col">
          {/* Sub-header */}
          <section className="w-full px-4 md:px-6 py-3 bg-white border-b border-slate-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#dce9ff] text-[#00236f] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">
                      menu_book
                    </span>
                  </span>
                  <div>
                    <h1 className="text-base font-bold text-slate-900 leading-tight">
                      Ngữ văn &amp; Kỹ năng Viết Học thuật Chuyên sâu
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Mã môn:{' '}
                      <span className="font-semibold text-slate-700">ENG201 / VIE102</span>{' '}
                      • Phòng thi:{' '}
                      <span className="font-semibold text-slate-700">A2-LAB04</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <span className="material-symbols-outlined text-[16px] text-[#00236f]">edit_note</span>
                  <span>
                    Số từ hiện tại: <strong className="text-slate-900 font-bold">{wordCount} từ</strong>
                  </span>
                </div>
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-sm text-xs cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">task_alt</span>
                  <span>Nộp bài thi</span>
                </button>
              </div>
            </div>
          </section>

          {/* WORKSPACE CHÍNH */}
          <div className="p-4 md:p-6 flex-1 flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
              {/* CỘT TRÁI: NỘI DUNG ĐỀ BÀI (5/12) */}
              <aside className="lg:col-span-5 flex flex-col gap-4 lg:sticky top-20 max-h-[calc(100vh-140px)]">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex-1 overflow-y-auto space-y-5">
                  {/* Tiêu đề & Thông số đề bài (Không đánh số thứ tự câu hỏi) */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-md bg-[#00236f] text-white text-xs font-bold uppercase tracking-wider">
                        ĐỀ BÀI
                      </span>
                      <span className="text-xs font-bold text-[#00236f] uppercase tracking-wider">
                        {EXAM_TOPIC.type}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#eff4ff] text-[#00236f] text-xs font-bold border border-[#dce1ff]">
                      {EXAM_TOPIC.points.toFixed(1)} ĐIỂM
                    </span>
                  </div>

                  {/* Nội dung đề bài */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                        Yêu cầu bài thi
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Độ dài khuyến nghị: <strong className="text-slate-800">{EXAM_TOPIC.targetWords}</strong>
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900">
                      <p className="text-sm md:text-base font-semibold leading-relaxed">
                        {EXAM_TOPIC.prompt}
                      </p>
                    </div>
                  </div>

                  {/* Tiêu chí chấm điểm (Rubrics) */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block">
                      Tiêu chí đánh giá bài viết (Rubric)
                    </span>
                    <div className="space-y-1.5">
                      {EXAM_TOPIC.rubrics.map((r, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 text-xs text-slate-700 border border-slate-100"
                        >
                          <span className="font-medium">{r.label}</span>
                          <span className="font-bold text-[#00236f]">{r.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lưu ý bài thi */}
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#00236f]">
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      <span>Lưu ý của hội đồng coi thi</span>
                    </div>
                    <p className="text-blue-800 leading-relaxed text-[11px]">
                      Hệ thống tự động lưu trữ bài viết liên tục. Hãy kiểm tra kỹ cấu trúc đoạn văn, chính tả và số lượng từ trước khi bấm nộp bài chính thức.
                    </p>
                  </div>
                </div>
              </aside>

              {/* CỘT PHẢI: KHU VỰC SOẠN THẢO BÀI LÀM (7/12) */}
              <section className="lg:col-span-7 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[calc(100vh-140px)]">
                {/* Formatting Toolbar */}
                <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleExecCommand('bold')}
                      className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                      title="In đậm (Ctrl+B)"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">format_bold</span>
                    </button>
                    <button
                      onClick={() => handleExecCommand('italic')}
                      className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                      title="In nghiêng (Ctrl+I)"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">format_italic</span>
                    </button>
                    <button
                      onClick={() => handleExecCommand('underline')}
                      className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                      title="Gạch chân (Ctrl+U)"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">format_underlined</span>
                    </button>
                    <span className="w-px h-4 bg-slate-300 mx-1" />
                    <button
                      onClick={() => handleExecCommand('undo')}
                      className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                      title="Hoàn tác (Ctrl+Z)"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">undo</span>
                    </button>
                    <button
                      onClick={() => handleExecCommand('redo')}
                      className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                      title="Làm lại (Ctrl+Y)"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">redo</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <button
                      onClick={toggleFullscreen}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                      </span>
                      <span className="hidden sm:inline">
                        {isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Ô gõ bài làm trực tiếp từ bàn phím */}
                <div className="flex-1 p-5 flex flex-col overflow-y-auto">
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleEditorInput}
                    data-placeholder="Bắt đầu viết bài làm của bạn tại đây..."
                    className="w-full flex-1 outline-none text-slate-800 text-base leading-relaxed min-h-[420px] font-serif focus:ring-0 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
                  />
                </div>

                {/* Footer số từ & Nút nộp bài (Bỏ các nút chuyển câu) */}
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xl font-bold text-[#00236f]">
                        {wordCount}
                      </span>
                      <span className="text-slate-500 font-medium">từ đã viết</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-slate-500 border-l border-slate-200 pl-3">
                      <span>{paragraphCount} đoạn văn</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="px-5 py-2 rounded-xl bg-[#00236f] hover:bg-[#1a3889] text-white font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-[0.99]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">grading</span>
                    <span>Xem lại &amp; Nộp bài thi</span>
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* 3. MODAL XÁC NHẬN NỘP BÀI THI */}
          {isSubmitModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-150">
                <div className="px-6 py-4 bg-[#00236f] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[24px]">fact_check</span>
                    <div>
                      <h3 className="text-base font-bold leading-tight">Xác nhận Nộp Bài Thi</h3>
                      <p className="text-xs text-blue-100">{examMeta.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="w-8 h-8 rounded-lg hover:bg-blue-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-slate-500">MSSV: {studentInfo.studentCode} • Thí sinh dự thi</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider block">
                      Tình trạng bài làm:
                    </span>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800">Bài thi tự luận:</span>
                        <span className="font-bold text-[#00236f]">{wordCount} từ</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Trạng thái:</span>
                        {wordCount > 0 ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Đã hoàn thành bài viết
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-500 font-bold">
                            <span className="material-symbols-outlined text-[16px]">error</span>
                            Chưa nhập nội dung bài làm
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2 text-xs">
                    <span className="material-symbols-outlined text-amber-600 text-[20px] shrink-0 mt-0.5">
                      warning
                    </span>
                    <div>
                      Thời gian làm bài còn lại: <strong>{formatTime(timeLeft)}</strong>. Sau khi bấm “NỘP BÀI CHÍNH THỨC”, bài thi sẽ được khóa và gửi lên máy chủ hội đồng chấm thi.
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 text-xs">
                  <button
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors cursor-pointer"
                    type="button"
                  >
                    Quay lại kiểm tra
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>NỘP BÀI CHÍNH THỨC</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. MODAL TRỢ GIÚP & QUY CHẾ */}
          {isHelpModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-150">
                <div className="px-5 py-4 bg-[#00236f] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[22px]">policy</span>
                    <h3 className="text-base font-bold">Quy Chế &amp; Trợ Giúp Phòng Thi</h3>
                  </div>
                  <button
                    onClick={() => setIsHelpModalOpen(false)}
                    className="w-8 h-8 rounded-lg hover:bg-blue-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <div className="p-5 space-y-3 text-xs text-slate-600 leading-relaxed">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <p className="font-bold text-slate-800">Quy định về liêm chính học thuật:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                      <li>Không chuyển tab hoặc thoát khỏi màn hình bài thi.</li>
                      <li>Hệ thống lưu trữ tự động toàn bộ thao tác gõ phím.</li>
                      <li>Bài làm cần đạt độ dài tối thiểu theo yêu cầu đề bài.</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                    Trường hợp gặp sự cố kết nối hoặc phần cứng, hãy liên hệ ngay với giám thị phòng thi.
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-right">
                  <button
                    onClick={() => setIsHelpModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#00236f] text-white font-semibold text-xs hover:bg-[#1a3889] transition-colors cursor-pointer"
                    type="button"
                  >
                    Đã hiểu &amp; Tiếp tục làm bài
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoingPage;
