"use client";
import React, { useState } from 'react';

interface StudentSubmission {
  id: string;
  name: string;
  studentId: string;
  className: string;
  avatar: string;
  submitTime: string;
  isEarlyOrLate?: boolean;
  timeNote?: string;
  wordCount: string;
  duration: string;
  hash: string;
  riskScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  riskLabel: string;
  stylometry: { value: string; status: string; desc: string; progress: number };
  perplexity: { value: string; status: string; desc: string; progress: number };
  burstiness: { value: string; status: string; progress: number };
  extraInfo: string;
  pasteEvents?: number;
  status: 'graded' | 'pending' | 'flagged';
  score?: number;
  feedback?: string;
}

export default function ExamSubmissionsDashboard() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'graded' | 'aiRisk'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState('ENG302');

  const submissions: StudentSubmission[] = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      studentId: 'SV2024-8841',
      className: 'ENG302.CNTT-K21A',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT5EApZhnrV41me87IJ1AWHnszdggEVgSYnBrIISWk-BSp23f7iT0g7eqGT8NpS8oPHg_rThLDeNdZ6QoFGPKMK72CQz65u3We58a01aacLbZ0BYz45gbfEbC7C-zCQwE5XrJbF7pMYPQgwQ89Uyty_4GfGmYB9BfV8EHBVk3j4_jzEHEL-INlFbPIVflVcoCwAXNKCYnOEkIpMzS6J-o30JDv_agAczBtoJ_Wo_Q6INCIj2LqQWIcAg',
      submitTime: '10:24:18 (Trước hạn 6p)',
      wordCount: '1,240 từ',
      duration: '88 phút',
      hash: 'SHA256: 7f8a91c0e3...b6d41a8e',
      riskScore: 4,
      riskLevel: 'low',
      riskLabel: 'An toàn (Rủi ro Thấp: 4%)',
      stylometry: { value: '94% Chuẩn xác', status: 'Bình thường', desc: 'Tương thích cao với dữ liệu gõ phím lịch sử, nhịp ngắt câu và thói quen từ nối cá nhân.', progress: 94 },
      perplexity: { value: '78.4 PPL', status: 'Tự nhiên & Phong phú', desc: 'Vốn từ vựng biến đổi cao, lỗi diễn đạt đời thường tự nhiên, không rơi vào vùng dự đoán của mô hình LLM.', progress: 78 },
      burstiness: { value: '0.82 (Cao)', status: 'Đa dạng câu', progress: 82 },
      extraInfo: 'Mô hình phân tích: RoBERTa-Large + Linguistic Stylometry v4.2',
      status: 'graded',
      score: 8.5,
      feedback: 'Luận điểm rõ ràng, cấu trúc đoạn mạch lạc. Dẫn chứng học thuật thuyết phục. Cần trau chuốt hơn ở các câu liên kết đoạn cuối bài.',
    },
    {
      id: '2',
      name: 'Trần Mai Linh',
      studentId: 'SV2024-8812',
      className: 'ENG302.CNTT-K21A',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE-UdV3mMbHATLjZ9UAzAud9qSefwzh62DeMl_57aPQJk4eIWY6ZwNPdDivf8DJMVF0JR-Fl0Ywe-dTvwVaWvDVnY6t4WQR0wVBLZo5qbCDk6SuWjs2OxVW9Vi-CRErhDmohvKEVS5OyZy1QNrpo8p37eeOefMYpoDvCVVBqg7ECGDPRK1ngADJvyIp1tkOe2RZa9Uen5cNDKE6Q0CKgwjQ38vRrWBnNmYAmJ8SBn-1EGtwvMI6KK7fw',
      submitTime: '09:12:05 (Bất thường: nộp quá sớm)',
      isEarlyOrLate: true,
      wordCount: '1,890 từ',
      duration: '14 phút (!?)',
      hash: 'FLAG: CLIPBOARD_BULK_INJECTION_DETECTED',
      pasteEvents: 8,
      riskScore: 89,
      riskLevel: 'high',
      riskLabel: 'Cảnh báo can thiệp (89%)',
      stylometry: { value: '42% Bất thường', status: 'Cần đối chiếu', desc: 'Lệch 58% so với bài tập viết kiểm chứng tuần trước; hoàn toàn vắng bóng lỗi chính tả thông thường.', progress: 42 },
      perplexity: { value: '22.1 PPL', status: 'Đặc trưng máy sinh (LLM)', desc: 'Từ ngữ có tính dự đoán lặp lại cực kỳ đều đặn, trùng khớp phân phối xác suất mô hình GPT-4o.', progress: 22 },
      burstiness: { value: '0.18 (Rất thấp)', status: 'Đồng đều cơ học', progress: 18 },
      extraInfo: 'Phát hiện 8 đoạn văn nghi vấn tạo bằng công cụ ngoại vi',
      status: 'flagged',
    },
    {
      id: '3',
      name: 'Lê Hoàng Long',
      studentId: 'SV2024-8890',
      className: 'ENG302.CNTT-K21A',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3uYJF8Rbm92JIY0M26yk6Mna58YCdbdfhKkQ7B_E6QA2PhGzhscUgPbrZkKxlpQknlpoj1QBlw2SDttPo0OlgIfOrZDbnFLoqrtOrhZeEq8ZWN6prQC5qf-r9WtteOrEtxEmotTsvyLpg8xBKMB-4k4T8ZD9Tew7XVjSyLqMCh_jwOmas_ShomgOBgFV4Ye4sekmLoJ6NVc_0owGnP_9yLIBrlzkWxBBJ2zD4RyxR2w00L3OuQqXhoQ',
      submitTime: '10:28:44 (Đúng hạn)',
      wordCount: '1,410 từ',
      duration: '105 phút',
      hash: 'SHA256: 3c5e90a1f2...d891b402',
      riskScore: 38,
      riskLevel: 'moderate',
      riskLabel: 'Đang theo dõi (Trung bình: 38%)',
      stylometry: { value: '71% Ổn định', status: 'Chấp nhận được', desc: '', progress: 71 },
      perplexity: { value: '54.2 PPL', status: 'Mức trung bình', desc: '', progress: 54 },
      burstiness: { value: '0.51 (Vừa phải)', status: 'Tự nhiên cơ bản', progress: 51 },
      extraInfo: 'Ghi nhận sửa lỗi (Backspaces): 412 lần trong bài',
      status: 'pending',
    },
    {
      id: '4',
      name: 'Phạm Thu Trang',
      studentId: 'SV2024-8835',
      className: 'ENG302.CNTT-K21A',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUH94vdzBxrOh3ZTT5hR4YOjtbTL-NcPMT1zGZkFqW2J5WPANFE-F5FIt0GpGVD5-MoITGxGCXFFcllogjVrfaYBuBS2vRZF_FJm4ggA1B-cuVrm7ffz3w06GwQ-NBndgFswzIJqfwbnLyt3G3o-QIDV087D415thO2uvA3TXe_VY0W9YrtE3fCQdw50fwPW-YHJO2EsAEBcqp02Dz3q6A2C0ZkCsCwBOYWrUK9s1-BRQEfeMMG1q3Ug',
      submitTime: '10:15:30 (Đúng hạn)',
      wordCount: '1,380 từ',
      duration: '94 phút',
      hash: 'SHA256: 9e10ab4c81...f3a90711',
      riskScore: 2,
      riskLevel: 'low',
      riskLabel: 'An toàn (Rủi ro Rất Thấp: 2%)',
      stylometry: { value: '98% Đồng nhất', status: 'Tự viết 100%', desc: '', progress: 98 },
      perplexity: { value: '89.6 PPL', status: 'Văn phong xuất sắc', desc: '', progress: 89 },
      burstiness: { value: '0.91 (Rất cao)', status: 'Giàu nhạc tính', progress: 91 },
      extraInfo: 'Ghi nhận 0 lần Paste ngoại vi • Thời gian xem prompt 12 phút đầu',
      status: 'graded',
      score: 9.25,
      feedback: 'Tư duy phản biện sắc bén, khả năng paraphrase học thuật ở mức chuyên nghiệp. Bài viết điển hình có thể dùng làm mẫu tham khảo cho khóa sau.',
    },
  ];

  const filteredSubmissions = submissions.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'pending') return item.status === 'pending';
    if (activeTab === 'graded') return item.status === 'graded';
    if (activeTab === 'aiRisk') return item.riskLevel === 'high';
    return true;
  });

  return (
    <div className="bg-slate-50 font-sans text-slate-900 antialiased min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Main Workspace */}
        <main className="flex-1 w-full px-6 bg-slate-50 pb-6 pt-6">
          <div className="flex flex-col w-full">
            {/* Breadcrumbs & Header Title */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <span className="hover:text-blue-900 transition-colors cursor-pointer">Trang chủ</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="hover:text-blue-900 transition-colors cursor-pointer">Quản lý bài thi</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-slate-900 font-semibold">Nhận bài của sinh viên &amp; Chấm thi</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div className="flex flex-col max-w-3xl">
                  <h1 className="text-2xl lg:text-3xl text-slate-900 tracking-tight font-bold">
                    Nhận Bài &amp; Đánh Giá Liêm Chính Học Thuật Sinh Viên
                  </h1>
                  <p className="text-sm text-slate-600 mt-1">
                    Hệ thống tiếp nhận bài thi viết tự luận trực tiếp, phân tích thuật toán chuyên sâu Stylometry, Perplexity, Burstiness và cung cấp công cụ chấm điểm trực tiếp cho giảng viên.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start lg:self-auto">
                  <button
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold transition-all shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">cloud_download</span>
                    <span>Xuất Báo Cáo Liêm Chính (.CSV)</span>
                  </button>
                  <button
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-900 text-white hover:bg-blue-950 text-sm font-semibold transition-all shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Khóa Sổ Chấm Ca Thi</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Academic Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              {/* Stat 1 */}
              <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                      Tiến Độ Thu Bài
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl text-blue-900 font-bold">58</span>
                      <span className="text-lg text-slate-500 font-semibold">/ 60 SV</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-900 h-full rounded-full transition-all duration-700" style={{ width: '96.6%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-1.5 text-xs text-slate-500">
                    <span className="text-emerald-700 font-semibold">96.7% đã nộp thành công</span>
                    <span>2 vắng mặt</span>
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                      Tiến Độ Chấm Điểm
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl text-slate-900 font-bold">32</span>
                      <span className="text-lg text-slate-500 font-semibold">/ 58 Bài</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">fact_check</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full transition-all duration-700" style={{ width: '55.2%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-1.5 text-xs text-slate-500">
                    <span className="font-semibold text-slate-900">Còn 26 bài cần chấm</span>
                    <span className="text-blue-900 font-bold">55.2%</span>
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                      Cần Đánh Giá Liêm Chính
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl text-red-600 font-bold">04</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-semibold">
                        Cảnh báo cao
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-slate-500 text-xs">
                  <span className="material-symbols-outlined text-red-600 text-[18px]">warning</span>
                  <span>Phát hiện chỉ số Perplexity &amp; Stylometry bất thường</span>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                      Điểm Trung Bình Đã Chấm
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl text-blue-900 font-bold">7.85</span>
                      <span className="text-lg text-slate-500 font-semibold">/ 10</span>
                    </div>
                  </div>
                  <div className="w-16 h-10 flex items-end gap-1">
                    <div className="w-2 bg-slate-200 rounded-t" style={{ height: '30%' }}></div>
                    <div className="w-2 bg-slate-200 rounded-t" style={{ height: '50%' }}></div>
                    <div className="w-2 bg-blue-900 rounded-t" style={{ height: '85%' }}></div>
                    <div className="w-2 bg-slate-200 rounded-t" style={{ height: '65%' }}></div>
                    <div className="w-2 bg-slate-200 rounded-t" style={{ height: '25%' }}></div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>Cao nhất: <strong className="text-slate-900">9.5</strong></span>
                  <span>Thấp nhất: <strong className="text-slate-900">5.0</strong></span>
                  <span className="text-emerald-700 font-semibold">Phổ điểm đẹp</span>
                </div>
              </div>
            </div>

            {/* Filtration & Cohort Bar */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-6 flex flex-col xl:flex-row gap-4 justify-between items-center">
              <div className="flex items-center gap-3 w-full xl:w-auto">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                </div>
                <div className="flex flex-col min-w-[340px]">
                  <label className="text-xs text-slate-500 font-semibold">Học phần ca thi đang mở chấm</label>
                  <div className="relative mt-0.5">
                    <select
                      className="w-full bg-slate-100 text-slate-900 text-sm font-semibold rounded-xl py-1.5 px-3 pr-8 appearance-none focus:outline-none cursor-pointer"
                      value={selectedExam}
                      onChange={(e) => setSelectedExam(e.target.value)}
                    >
                      <option value="ENG302">ENG302 - Kỹ Năng Viết Học Thuật Tiếng Anh Nâng Cao (Ca 08:30 - 10:30 Hôm nay)</option>
                      <option value="ITE401">ITE401 - Phân Tích Thiết Kế Thuật Toán Chuyên Sâu (Ca 13:30 - 15:30 Hôm qua)</option>
                      <option value="LAW201">LAW201 - Pháp Luật Đại Cương &amp; Đạo Đức Nghề Nghiệp (Ca 07:00 - 09:00 Thứ 2)</option>
                    </select>
                    <span className="material-symbols-outlined text-slate-500 text-[20px] absolute right-2.5 top-2.5 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto justify-end">
                {/* Status Tabs */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                  <button
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'all'
                      ? 'bg-white text-blue-900 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                    onClick={() => setActiveTab('all')}
                    type="button"
                  >
                    Tất cả (58)
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'pending'
                      ? 'bg-white text-blue-900 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                    onClick={() => setActiveTab('pending')}
                    type="button"
                  >
                    Cần chấm (26)
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'graded'
                      ? 'bg-white text-blue-900 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                    onClick={() => setActiveTab('graded')}
                    type="button"
                  >
                    Đã chấm (32)
                  </button>
                  <button
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-600 text-xs font-semibold transition-all ${activeTab === 'aiRisk' ? 'bg-red-100' : 'hover:bg-red-50'
                      }`}
                    onClick={() => setActiveTab('aiRisk')}
                    type="button"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    <span>Rủi ro AI (4)</span>
                  </button>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                  <span className="material-symbols-outlined text-slate-400 text-[18px] absolute left-3 top-2.5">
                    search
                  </span>
                  <input
                    className="w-full bg-slate-100 text-slate-900 text-sm rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-900/20 transition-all placeholder:text-slate-400"
                    placeholder="Tìm tên sinh viên, MSSV..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <button
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all"
                  title="Sắp xếp"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">sort</span>
                </button>
              </div>
            </div>

            {/* Submissions List */}
            <div className="flex flex-col gap-4">
              {filteredSubmissions.map((item) => {
                const isHighRisk = item.riskLevel === 'high';
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col xl:flex-row gap-6 items-stretch ${isHighRisk ? 'ring-2 ring-red-500/50 relative' : ''
                      }`}
                  >
                    {/* High Risk Ribbon */}
                    {isHighRisk && (
                      <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        <span>Cảnh Báo Can Thiệp: Rủi Ro AI Tạo Sinh {item.riskScore}%</span>
                      </div>
                    )}

                    {/* Left: Student Info */}
                    <div className={`xl:w-[28%] flex flex-col justify-between border-b xl:border-b-0 border-slate-200 pb-4 xl:pb-0 ${isHighRisk ? 'pt-2 xl:pt-0' : ''}`}>
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                              className="w-full h-full object-cover"
                              alt={item.name}
                              src={item.avatar}
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-base text-slate-900 font-bold truncate">
                                {item.name}
                              </span>
                              <span className="text-xs text-slate-500 px-1.5 py-0.5 rounded bg-slate-100 font-medium">
                                {item.studentId}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500">Lớp: {item.className}</span>
                            <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs">
                              <span className={`material-symbols-outlined text-[16px] ${isHighRisk ? 'text-red-600' : 'text-emerald-600'}`}>
                                {isHighRisk ? 'notification_important' : 'check_circle'}
                              </span>
                              <span className={isHighRisk ? 'text-red-600 font-semibold' : ''}>
                                Nộp lúc: {item.submitTime}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={`grid grid-cols-2 gap-2 mt-4 p-3 rounded-xl text-xs ${isHighRisk ? 'bg-red-50' : 'bg-slate-50'}`}>
                          <div>
                            <span className="text-slate-500 block">Dung lượng viết:</span>
                            <span className={`font-bold font-mono text-sm ${isHighRisk ? 'text-red-600' : 'text-slate-900'}`}>
                              {item.wordCount}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Thời gian thao tác:</span>
                            <span className={`font-bold font-mono text-sm ${isHighRisk ? 'text-red-600' : 'text-slate-900'}`}>
                              {item.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2">
                        <div className="flex items-center justify-between text-slate-500 text-[11px]">
                          <span className="uppercase tracking-wider font-semibold">
                            {isHighRisk ? 'Khối dán văn bản (Paste Events)' : 'Digital Hash Chữ Ký Toàn Vẹn'}
                          </span>
                          {isHighRisk ? (
                            <span className="text-red-600 font-bold font-mono">{item.pasteEvents} lần paste khối lớn</span>
                          ) : (
                            <span className="material-symbols-outlined text-[14px]">fingerprint</span>
                          )}
                        </div>
                        <code className={`block font-mono text-[11px] truncate px-2 py-1 rounded mt-1 ${isHighRisk ? 'text-red-700 bg-red-100' : 'text-slate-600 bg-slate-100'}`}>
                          {item.hash}
                        </code>
                      </div>
                    </div>

                    {/* Middle: AI Metrics */}
                    <div className={`xl:w-[44%] rounded-xl p-4 flex flex-col justify-between ${isHighRisk ? 'bg-red-50/60 border border-red-100' : 'bg-slate-50'}`}>
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className={`material-symbols-outlined text-[18px] ${isHighRisk ? 'text-red-600' : item.riskLevel === 'moderate' ? 'text-slate-600' : 'text-blue-900'}`}>
                              {isHighRisk ? 'gavel' : item.riskLevel === 'moderate' ? 'query_stats' : 'verified_user'}
                            </span>
                            <span className={`text-xs font-bold uppercase tracking-wider ${isHighRisk ? 'text-red-600' : item.riskLevel === 'moderate' ? 'text-slate-700' : 'text-blue-900'}`}>
                              Hồ Sơ Liêm Chính Học Thuật (AI Risk Engine)
                            </span>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm ${isHighRisk
                            ? 'bg-red-600 text-white'
                            : item.riskLevel === 'moderate'
                              ? 'bg-slate-200 text-slate-800'
                              : 'bg-emerald-100 text-emerald-800'
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${isHighRisk ? 'bg-white animate-ping' : item.riskLevel === 'moderate' ? 'bg-slate-600' : 'bg-emerald-500'}`}></span>
                            {item.riskLabel}
                          </span>
                        </div>

                        {/* 3 Metrics */}
                        <div className="space-y-2">
                          {/* Stylometry */}
                          <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
                            <div className="flex justify-between items-center text-slate-900 text-xs">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold">Stylometry (Đặc trưng gõ/viết):</span>
                                <span className={`font-bold ${isHighRisk ? 'text-red-600' : 'text-emerald-700'}`}>
                                  {item.stylometry.value}
                                </span>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${isHighRisk ? 'bg-red-100 text-red-800 font-bold' : 'bg-slate-100 text-emerald-700'}`}>
                                {item.stylometry.status}
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                              <div className={`h-full rounded-full ${isHighRisk ? 'bg-red-600' : item.riskLevel === 'moderate' ? 'bg-slate-500' : 'bg-blue-900'}`} style={{ width: `${item.stylometry.progress}%` }}></div>
                            </div>
                            {item.stylometry.desc && (
                              <span className={`text-[12px] block mt-1 ${isHighRisk ? 'text-red-600' : 'text-slate-500'}`}>
                                {item.stylometry.desc}
                              </span>
                            )}
                          </div>

                          {/* Perplexity */}
                          <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
                            <div className="flex justify-between items-center text-slate-900 text-xs">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold">Perplexity (Độ phức tạp từ vựng):</span>
                                <span className={`font-bold font-mono ${isHighRisk ? 'text-red-600' : 'text-blue-900'}`}>
                                  {item.perplexity.value}
                                </span>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${isHighRisk ? 'bg-red-100 text-red-800 font-bold' : 'bg-slate-100 text-slate-700'}`}>
                                {item.perplexity.status}
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                              <div className={`h-full rounded-full ${isHighRisk ? 'bg-red-600' : item.riskLevel === 'moderate' ? 'bg-slate-500' : 'bg-blue-900'}`} style={{ width: `${item.perplexity.progress}%` }}></div>
                            </div>
                            {item.perplexity.desc && (
                              <span className="text-slate-500 text-[12px] block mt-1">
                                {item.perplexity.desc}
                              </span>
                            )}
                          </div>

                          {/* Burstiness */}
                          <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
                            <div className="flex justify-between items-center text-slate-900 text-xs">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold">Burstiness (Biến thiên độ dài câu):</span>
                                <span className={`font-bold font-mono ${isHighRisk ? 'text-red-600' : 'text-blue-900'}`}>
                                  {item.burstiness.value}
                                </span>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${isHighRisk ? 'bg-red-100 text-red-800 font-bold' : 'bg-slate-100 text-emerald-700'}`}>
                                {item.burstiness.status}
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                              <div className={`h-full rounded-full ${isHighRisk ? 'bg-red-600' : item.riskLevel === 'moderate' ? 'bg-slate-500' : 'bg-blue-900'}`} style={{ width: `${item.burstiness.progress}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`mt-2 flex items-center justify-between text-[11px] ${isHighRisk ? 'text-red-600' : 'text-slate-500'}`}>
                        <span>{item.extraInfo}</span>
                        <span className={`font-semibold cursor-pointer hover:underline ${isHighRisk ? 'font-bold underline hover:opacity-80' : 'text-blue-900'}`}>
                          {isHighRisk ? 'Xem bằng chứng ghi hình Proctored →' : 'Xem chi tiết →'}
                        </span>
                      </div>
                    </div>

                    {/* Right: Grading */}
                    <div className="xl:w-[28%] flex flex-col justify-between bg-white">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500 uppercase font-semibold">
                            {isHighRisk ? 'Chấm Điểm & Xử Lý' : 'Trạng Thái Đánh Giá'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.status === 'graded'
                            ? 'bg-slate-100 text-slate-800'
                            : item.status === 'flagged'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-slate-200 text-slate-800'
                            }`}>
                            {item.status === 'graded' ? 'Đã chấm xong' : item.status === 'flagged' ? 'Tạm giữ chấm' : 'Chưa chấm'}
                          </span>
                        </div>

                        {item.status === 'graded' ? (
                          <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between border border-slate-100">
                            <div>
                              <span className="text-slate-500 text-xs block">Điểm bài thi:</span>
                              <div className="flex items-baseline gap-1 mt-0.5">
                                <span className="text-3xl text-blue-900 font-bold">{item.score}</span>
                                <span className="text-slate-500 text-lg font-semibold">/ 10</span>
                              </div>
                            </div>
                            <button className="px-3 py-1.5 rounded-xl bg-white text-slate-700 hover:text-blue-900 text-xs font-semibold transition-all shadow-xs flex items-center gap-1 border border-slate-200" type="button">
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                              <span>Sửa điểm</span>
                            </button>
                          </div>
                        ) : (
                          <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between border border-slate-100">
                            <div className="flex-1 mr-3">
                              <label className="text-slate-500 text-xs block font-semibold">
                                Cho điểm (Thang 10):
                              </label>
                              <div className="flex items-center gap-2 mt-1">
                                <input
                                  className={`w-20 px-3 py-1.5 rounded-lg bg-white font-mono text-xl font-bold border border-slate-200 focus:outline-none focus:ring-2 ${isHighRisk ? 'text-red-600 focus:ring-red-500' : 'text-blue-900 focus:ring-blue-900'
                                    }`}
                                  max={10}
                                  min={0}
                                  placeholder={isHighRisk ? '0.0' : '7.5'}
                                  step={0.25}
                                  type="number"
                                />
                                <span className="text-slate-500 text-lg font-semibold">/ 10</span>
                              </div>
                            </div>
                            {isHighRisk ? (
                              <button className="px-3 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 text-xs font-bold transition-all shadow-xs flex items-center gap-1" type="button">
                                <span className="material-symbols-outlined text-[16px]">flag</span>
                                <span>Lập Biên Bản</span>
                              </button>
                            ) : (
                              <button className="px-3 py-2 rounded-xl bg-blue-900 text-white hover:bg-blue-950 text-xs font-bold transition-all shadow-xs flex items-center gap-1" type="button">
                                <span className="material-symbols-outlined text-[16px]">save</span>
                                <span>Lưu điểm</span>
                              </button>
                            )}
                          </div>
                        )}

                        <div className="mt-3">
                          <label className="text-xs text-slate-500 block mb-1 font-semibold">
                            {isHighRisk ? 'Ghi chú xác minh của Giảng viên:' : 'Nhận xét của giảng viên:'}
                          </label>
                          {item.status === 'graded' ? (
                            <div className="bg-slate-50 p-2.5 rounded-xl text-slate-800 text-xs leading-relaxed border border-slate-100">
                              "{item.feedback}"
                            </div>
                          ) : (
                            <textarea
                              className={`w-full bg-slate-50 p-2.5 rounded-xl text-slate-900 text-xs border border-slate-200 focus:outline-none focus:bg-white focus:ring-1 transition-all resize-none placeholder:text-slate-400 ${isHighRisk ? 'focus:ring-red-500' : 'focus:ring-blue-900'
                                }`}
                              placeholder={isHighRisk ? 'Ghi nhận lý do nghi vấn hoặc chỉ định sinh viên vấn đáp lại...' : 'Nhập lời phê cho sinh viên...'}
                              rows={2}
                            />
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-1 flex flex-col gap-2">
                        {isHighRisk ? (
                          <>
                            <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 text-sm font-bold transition-all shadow-sm" type="button">
                              <span className="material-symbols-outlined text-[18px]">balance</span>
                              <span>Mở Đối Chiếu Văn Bản &amp; AI Highlighter</span>
                            </button>
                            <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all" type="button">
                              <span className="material-symbols-outlined text-[16px]">call</span>
                              <span>Triệu tập sinh viên giải trình trực tuyến</span>
                            </button>
                          </>
                        ) : (
                          <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-900 text-white hover:bg-blue-950 text-sm font-semibold transition-all shadow-sm" type="button">
                            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            <span>Mở xem bài viết &amp; Chấm chi tiết</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Footer */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-slate-500 text-sm">
                Hiển thị <span className="font-semibold text-slate-900">1 - {filteredSubmissions.length}</span> trên tổng số <span className="font-semibold text-slate-900">58</span> bài nộp của ca thi
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-2 rounded-xl bg-slate-100 text-slate-400 cursor-not-allowed transition-all"
                  disabled
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button className="w-9 h-9 rounded-xl bg-blue-900 text-white text-sm font-bold shadow-sm" type="button">1</button>
                <button className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-all" type="button">2</button>
                <button className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-all" type="button">3</button>
                <span className="px-2 text-slate-400 font-bold">...</span>
                <button className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-all" type="button">15</button>
                <button className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 transition-all" type="button">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs font-semibold">Hiển thị mỗi trang:</span>
                <select className="bg-slate-100 text-slate-900 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer border border-slate-200">
                  <option>4 bài / trang</option>
                  <option>10 bài / trang</option>
                  <option>20 bài / trang</option>
                </select>
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