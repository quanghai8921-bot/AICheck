package com.nguyenquanghai.aicheck.repository.custom;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.nguyenquanghai.aicheck.dto.response.student.PreviousStylometryResponse;
import com.nguyenquanghai.aicheck.dto.response.teacher.DetailAnswerOfStudentResponse;

public interface StudentAnswerRepositoryCustom {
    List<DetailAnswerOfStudentResponse> TeacherViewAnswerOfStudent(UUID historyId);

    // Kiểm tra sinh viên này đã từng có bản báo cáo Stylometry nào trong hệ thống chưa
    boolean existsStylometryByStudentId(UUID studentId);

    // Lấy mốc phân tích Stylometry gần nhất của sinh viên
    Optional<PreviousStylometryResponse> findLatestStylometryByStudentId(UUID studentId);
}
