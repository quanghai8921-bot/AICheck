package com.nguyenquanghai.aicheck.repository.custom;

import java.util.List;
import java.util.UUID;
import com.querydsl.core.Tuple;

public interface HistoryRepositoryCustom {
    // 1. Giáo viên nhận bài nộp
    List<Tuple> findStudentSubmissions(UUID examId);

    // 2. Giáo viên xem lịch sử bài mình đã chấm
    List<Tuple> findExamGradedByTeacher(UUID historyId, UUID teacherId);

    // 3. Sinh viên xem lịch sử bài mình đã làm
    List<Tuple> findStudentExamHistory(UUID historyId, UUID studentId);
}
