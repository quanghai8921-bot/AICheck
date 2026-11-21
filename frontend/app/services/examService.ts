import { fetchWithAuth } from './apiClient';

export interface SubmitExamRequest {
  questionId: string;
  content: string;
  wordCount: number;
}

export interface SubmitExamResponse {
  historyId: string;
  examId: string;
  statusSubmission: string;
  submittedAt: string;
  message: string;
}

export interface QuestionResponse {
  examId: string;
  questionId: string;
  content: string;
}

export interface HistoryExamResponse {
  historyId: string;
  examId: string;
  examTitle: string;
  subjectName: string;
  score: number | null;
  feedback: string | null;
  statusSubmission: string;
  statusGrading: string;
}

/**
 * Lấy danh sách lịch sử thi của sinh viên đã đăng nhập
 */
export async function getStudentExamHistory(): Promise<HistoryExamResponse[]> {
  const response = await fetchWithAuth('/api/v1/student/history', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `Không thể tải lịch sử bài thi (Mã lỗi: ${response.status})`
    );
  }

  return response.json();
}

/**
 * Lấy câu hỏi/đề bài thi của sinh viên theo examId
 */
export async function getExamQuestions(examId: string): Promise<QuestionResponse> {
  const response = await fetchWithAuth(`/api/v1/student/exams/${examId}/questions`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `Không thể tải câu hỏi cho kỳ thi (Mã lỗi: ${response.status})`
    );
  }

  return response.json();
}

/**
 * Nộp bài thi của sinh viên
 */
export async function submitExam(
  examId: string,
  payload: SubmitExamRequest
): Promise<SubmitExamResponse> {
  const response = await fetchWithAuth(`/api/v1/student/exams/${examId}/submit`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `Nộp bài thi thất bại (Mã lỗi: ${response.status})`
    );
  }

  return response.json();
}
