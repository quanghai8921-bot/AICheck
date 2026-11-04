'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Cấu trúc dữ liệu cho các câu hỏi
interface Question {
  id: number;
  title: string;
  type: string;
  subtitle: string;
  points: number;
  targetWords: string;
  status: 'DONE' | 'DOING' | 'TODO';
  prompt: string;
  rubrics: { label: string; score: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Câu 1: Nghị luận Xã hội',
    type: 'Nghị Luận Xã Hội',
    subtitle: 'Trách nhiệm của công dân số',
    points: 2.0,
    targetWords: '200 từ',
    status: 'TODO',
    prompt: 'Trình bày suy nghĩ ngắn gọn (khoảng 200 từ) về trách nhiệm bảo vệ thông tin cá nhân và ứng xử văn minh của thanh niên trên môi trường mạng xã hội hiện nay.',
    rubrics: [
      { label: '1. Bố cục & Cấu trúc', score: '0.5đ' },
      { label: '2. Luận điểm & Dẫn chứng', score: '1.0đ' },
      { label: '3. Chính tả & Diễn đạt', score: '0.5đ' },
    ],
  },
  {
    id: 2,
    title: 'Câu 2: Nghị luận Văn học',
    type: 'Nghị Luận Văn Học',
    subtitle: 'Bình luận tư tưởng tác phẩm',
    points: 3.0,
    targetWords: '500 - 600 từ',
    status: 'DOING',
    prompt: 'Trình bày suy nghĩ của anh/chị (khoảng 500 – 600 từ) về vai trò của Trí tuệ nhân tạo (AI) trong việc hỗ trợ phương pháp tự học và tư duy phản biện của học sinh, sinh viên trong kỷ nguyên số.',
    rubrics: [
      { label: '1. Bố cục & Cấu trúc', score: '0.5đ' },
      { label: '2. Luận điểm & Dẫn chứng', score: '1.5đ' },
      { label: '3. Tư duy phản biện', score: '0.5đ' },
      { label: '4. Chính tả & Diễn đạt', score: '0.5đ' },
    ],
  },
  {
    id: 3,
    title: 'Câu 3: Tổng hợp & Phân tích',
    type: 'Tổng hợp & Phân tích',
    subtitle: 'Đánh giá số liệu và góc nhìn đa chiều',
    points: 5.0,
    targetWords: '600 từ',
    status: 'TODO',
    prompt: 'Phân tích bảng số liệu về xu hướng lao động trong ngành công nghệ thông tin và đề xuất giải pháp phát triển kỹ năng thích ứng cho sinh viên đại học.',
    rubrics: [
      { label: '1. Phân tích số liệu', score: '2.0đ' },
      { label: '2. Giải pháp thực tiễn', score: '2.0đ' },
      { label: '3. Khả năng tổng hợp', score: '1.0đ' },
    ],
  },
];

export const DoingPage: React.FC = () => {
  const router = useRouter();

  // --- States ---
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isProctorModalOpen, setIsProctorModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Quản lý nội dung bài làm từng câu (Trống để học sinh gõ từ đầu)
  const [answers, setAnswers] = useState<Record<number, string>>({
    1: '',
    2: '',
    3: '',
  });

  // Đồng hồ đếm ngược (84 phút 15 giây)
  const [timeLeft, setTimeLeft] = useState<number>(84 * 60 + 15);
  const editorRef = useRef<HTMLDivElement>(null);

  // --- Effects ---
  // 1. Đồng hồ đếm ngược
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Đồng bộ nội dung trong editor khi chuyển câu hỏi
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerText = answers[activeQuestionId] || '';
    }
  }, [activeQuestionId]);

  // Format thời gian đếm ngược
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Tính toán số từ & số đoạn của câu hiện tại
  const currentText = answers[activeQuestionId] || '';
  const wordCount = currentText.trim() ? currentText.trim().split(/\s+/).length : 0;
  const paragraphCount = currentText
    .split('\n')
    .filter((p) => p.trim().length > 0).length;

  // Tính tổng số từ toàn bài thi
  const totalWordCount = Object.values(answers).reduce((acc, text) => {
    return acc + (text.trim() ? text.trim().split(/\s+/).length : 0);
  }, 0);

  // Lấy dữ liệu câu hỏi hiện tại
  const currentQuestion =
    QUESTIONS.find((q) => q.id === activeQuestionId) || QUESTIONS[0];

  // --- Handlers ---
  const handleEditorInput = () => {
    if (editorRef.current) {
      setAnswers((prev) => ({
        ...prev,
        [activeQuestionId]: editorRef.current?.innerText || '',
      }));
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
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">school</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm md:text-base text-blue-900 tracking-tight font-bold uppercase">
                  Kỳ thi đánh giá năng lực viết học thuật
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Đang diễn ra
                </span>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                HỌC KỲ II • Khóa thi chuẩn hóa năng lực học thuật trực tuyến
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="material-symbols-outlined text-blue-600 text-[20px]">
                timer
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Thời gian còn lại
                </span>
                <span className="font-mono text-base font-bold text-blue-700">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs font-semibold"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">help</span>
              <span className="hidden md:inline">Trợ giúp &amp; Quy chế</span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-slate-800 leading-tight">
                  Nguyễn Văn Minh Triết
                </div>
                <div className="text-[11px] text-slate-500">
                  MSSV: SV2024-8841 • K22-CNTT01
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. ASIDE SIDEBAR CẤU TRÚC ĐỀ THI */}
      <aside className="fixed left-0 bottom-0 w-72 bg-white z-40 flex flex-col p-4 border-r border-slate-200 overflow-y-auto top-16 hidden md:flex">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            Cấu trúc đề thi
          </span>
          <span className="text-xs text-slate-500 font-medium">3 Câu hỏi</span>
        </div>
        <nav className="space-y-2 flex-1">
          {QUESTIONS.map((q) => {
            const isActive = q.id === activeQuestionId;
            const hasAnswer = (answers[q.id] || '').trim().length > 0;
            return (
              <button
                key={q.id}
                onClick={() => setActiveQuestionId(q.id)}
                className={`w-full text-left flex flex-col p-3 rounded-xl transition-all border ${isActive
                  ? 'bg-blue-50 border-blue-200 text-blue-900 shadow-sm'
                  : 'bg-white border-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-200'
                  }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{q.title}</span>
                  {hasAnswer ? (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">
                      ĐÃ LÀM
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-semibold">
                      CHƯA LÀM
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500 truncate">{q.subtitle}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 3. KHU VỰC NỘI DUNG CHÍNH */}
      <div className="md:pl-72">
        <main className="relative min-h-screen flex flex-col">
          {/* Sub-header */}
          <section className="w-full px-4 md:px-6 py-3 bg-white border-b border-slate-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
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

              <div className="flex items-center justify-between lg:justify-end gap-4 md:gap-6">
                <button
                  onClick={() => setIsProctorModalOpen(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all text-xs font-semibold border border-rose-200"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    support_agent
                  </span>
                  <span>Cần hỗ trợ</span>
                </button>
              </div>
            </div>

            <div className="w-full pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider">
                Đang xem: Câu {activeQuestionId}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-slate-600">
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  <span>
                    Tổng từ toàn bài: <strong className="text-slate-900">{totalWordCount} từ</strong>
                  </span>
                </div>
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-sm"
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
              {/* CỘT TRÁI: ĐỀ BÀI (5/12) */}
              <aside className="lg:col-span-5 flex flex-col gap-4 lg:sticky top-20 max-h-[calc(100vh-120px)]">
                <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
                  {QUESTIONS.map((q) => {
                    const isActive = q.id === activeQuestionId;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setActiveQuestionId(q.id)}
                        className={`flex-1 py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-0.5 text-center border ${isActive
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100'
                          }`}
                        type="button"
                      >
                        <div className="flex items-center gap-1 text-xs font-bold">
                          <span>Câu {q.id}</span>
                        </div>
                        <span
                          className={`text-[10px] truncate max-w-full ${isActive ? 'text-blue-100' : 'text-slate-500'
                            }`}
                        >
                          {q.points}đ • {q.targetWords}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex-1 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-xs font-bold uppercase">
                        CÂU SỐ {currentQuestion.id}
                      </span>
                      <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                        {currentQuestion.type}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                      {currentQuestion.points.toFixed(1)} ĐIỂM
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                      Yêu cầu trọng tâm
                    </span>
                    <h2 className="text-sm md:text-base text-slate-800 font-semibold leading-relaxed">
                      {currentQuestion.prompt}
                    </h2>
                  </div>

                  {/* Rubric Chấm Điểm */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                        Tiêu chí chấm điểm chi tiết (Rubric)
                      </span>
                      <span className="text-xs text-blue-700 font-bold">
                        Tổng: {currentQuestion.points.toFixed(1)}đ
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {currentQuestion.rubrics.map((r, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between"
                        >
                          <span className="text-slate-700">{r.label}</span>
                          <span className="font-bold text-blue-700">{r.score}</span>
                        </div>
                      ))}
                    </div>
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
                    data-placeholder="Nhập nội dung bài làm của bạn tại đây..."
                    className="w-full flex-1 outline-none text-slate-800 text-base leading-relaxed min-h-[300px] font-serif focus:ring-0 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
                  />
                </div>

                {/* Footer số từ & Nút nộp bài */}
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xl font-bold text-blue-700">
                        {wordCount}
                      </span>
                      <span className="text-slate-500 font-medium">từ</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-slate-500 border-l border-slate-200 pl-3">
                      <span>{paragraphCount} đoạn văn</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={activeQuestionId === 1}
                      onClick={() => setActiveQuestionId((prev) => Math.max(1, prev - 1))}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-700 font-medium transition-colors flex items-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      <span>Câu trước</span>
                    </button>

                    <button
                      disabled={activeQuestionId === QUESTIONS.length}
                      onClick={() =>
                        setActiveQuestionId((prev) => Math.min(QUESTIONS.length, prev + 1))
                      }
                      className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-700 font-medium transition-colors flex items-center gap-1"
                      type="button"
                    >
                      <span>Câu tiếp</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>

                    <button
                      onClick={() => setIsSubmitModalOpen(true)}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold transition-all shadow-sm flex items-center gap-1.5 ml-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">grading</span>
                      <span>Xem lại &amp; Nộp bài</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* 4. MODAL XÁC NHẬN NỘP BÀI THI */}
          {isSubmitModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-150">
                <div className="px-6 py-4 bg-blue-600 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[24px]">fact_check</span>
                    <div>
                      <h3 className="text-base font-bold leading-tight">Xác nhận Nộp Bài Thi</h3>
                      <p className="text-xs text-blue-100">Kỳ thi Đánh giá Năng lực Viết Học thuật</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="w-8 h-8 rounded-lg hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        MT
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">Nguyễn Văn Minh Triết</p>
                        <p className="text-slate-500">MSSV: SV2024-8841 • Lớp: K22-CNTT01</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                      Đã định danh
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">
                      Tình trạng bài làm chi tiết:
                    </span>
                    {QUESTIONS.map((q) => {
                      const words = (answers[q.id] || '').trim().split(/\s+/).filter(Boolean).length;
                      return (
                        <div
                          key={q.id}
                          className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`material-symbols-outlined text-[18px] ${words > 0 ? 'text-emerald-600' : 'text-slate-400'
                                }`}
                            >
                              {words > 0 ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            <span className="font-semibold text-slate-800">{q.title}</span>
                          </div>
                          <span className="text-slate-600">
                            {words} từ{' '}
                            {words > 0 ? (
                              <strong className="text-emerald-600 ml-1">(Đã viết)</strong>
                            ) : (
                              <strong className="text-rose-500 ml-1">(Chưa viết)</strong>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2 text-xs">
                    <span className="material-symbols-outlined text-amber-600 text-[20px] shrink-0 mt-0.5">
                      warning
                    </span>
                    <div>
                      Thời gian còn lại: <strong>{formatTime(timeLeft)}</strong>. Sau khi bấm “NỘP BÀI CHÍNH THỨC”, bài thi sẽ khóa hoàn toàn.
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 text-xs">
                  <button
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors"
                    type="button"
                  >
                    Quay lại kiểm tra
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md flex items-center gap-1.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>NỘP BÀI CHÍNH THỨC</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. MODAL HỖ TRỢ GIÁM THỊ KHẨN CẤP */}
          {isProctorModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-150">
                <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      e911_emergency
                    </span>
                    <span>Kênh Hỗ Trợ Kỹ Thuật Khẩn Cấp</span>
                  </div>
                  <button
                    onClick={() => setIsProctorModalOpen(false)}
                    className="w-7 h-7 rounded-lg hover:bg-slate-200 text-slate-500 flex items-center justify-center"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>

                <div className="p-4 space-y-3 text-xs">
                  <p className="text-slate-600">
                    Bạn gặp sự cố về bàn phím hoặc kết nối? Hãy chọn phương thức bên dưới để thông báo cho Hội đồng giám thị:
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => alert('Đã gửi tín hiệu cứu trợ tới Giám thị!')}
                      className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-left transition-all"
                      type="button"
                    >
                      <p className="font-bold text-slate-800">Yêu cầu giám thị kiểm tra tại chỗ</p>
                      <p className="text-slate-500 text-[11px]">Gửi thông báo âm thầm tới máy giám thị</p>
                    </button>
                  </div>
                </div>

                <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 text-right">
                  <button
                    onClick={() => setIsProctorModalOpen(false)}
                    className="px-4 py-1.5 rounded-lg bg-slate-800 text-white font-medium text-xs hover:bg-slate-900 transition-colors"
                    type="button"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. MODAL TRỢ GIÚP & QUY CHẾ THI */}
          {isHelpModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-150">
                <div className="px-5 py-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                    <span className="material-symbols-outlined text-[20px] text-blue-600">help</span>
                    <span>Quy chế &amp; Hướng dẫn bài thi</span>
                  </div>
                  <button
                    onClick={() => setIsHelpModalOpen(false)}
                    className="w-7 h-7 rounded-lg hover:bg-slate-200 text-slate-500 flex items-center justify-center"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>

                <div className="p-5 space-y-3 text-xs text-slate-700 max-h-[60vh] overflow-y-auto">
                  <h4 className="font-bold text-slate-900 text-sm">1. Quy định bài làm</h4>
                  <p>Học sinh nhập trực tiếp nội dung bài làm từ bàn phím vào khung soạn thảo của từng câu.</p>
                  <h4 className="font-bold text-slate-900 text-sm pt-2 border-t border-slate-100">2. Lưu trữ bài làm</h4>
                  <p>Hệ thống tự động đồng bộ văn bản gõ phím vào bộ nhớ ứng dụng realtime.</p>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-right">
                  <button
                    onClick={() => setIsHelpModalOpen(false)}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors"
                    type="button"
                  >
                    Đã hiểu quy chế
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