package com.nguyenquanghai.aicheck.dto.request.teacher;

import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// Phân trang
public class StudentSearchFilter {
    private UUID examId; // Lọc theo bài kiểm tra cụ thể (RẤT QUAN TRỌNG)
    private String studentCode; // Tìm kiếm theo mã sinh viên
    private String fullName; // Tìm kiếm theo tên sinh viên
    private String statusSubmission; // Trạng thái nộp bài (submitted, late,...)
    private String statusGrading; // Trạng thái chấm (graded, pending)
    private String statusFlagAI; // Lọc các bài bị cờ AI (high_risk, safe,...)
}
