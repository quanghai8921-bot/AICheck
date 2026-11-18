package com.nguyenquanghai.aicheck.repository.custom;

import java.util.List;
import java.util.UUID;

import com.nguyenquanghai.aicheck.dto.response.student.HistoryExamResponse;
import com.nguyenquanghai.aicheck.dto.response.teacher.HistoryGradedExamResponse;
import com.nguyenquanghai.aicheck.dto.response.teacher.ReceiveExamOfStudentResponse;

public interface HistoryRepositoryCustom {
    // 1. Teacher receive exam
    List<ReceiveExamOfStudentResponse> findStudentSubmissions(UUID examId);

    // 2. Teacher view grade exam
    List<HistoryGradedExamResponse> findExamGradedByTeacher(UUID historyId, UUID teacherId);

    // 3. Student view history exam
    List<HistoryExamResponse> findStudentExamHistory(UUID studentId);
}
