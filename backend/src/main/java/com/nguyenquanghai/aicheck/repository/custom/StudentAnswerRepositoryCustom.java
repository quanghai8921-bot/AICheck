package com.nguyenquanghai.aicheck.repository.custom;

import java.util.List;
import java.util.UUID;

import com.nguyenquanghai.aicheck.dto.response.teacher.DetailAnswerOfStudentResponse;

public interface StudentAnswerRepositoryCustom {
    List<DetailAnswerOfStudentResponse> TeacherViewAnswerOfStudent(UUID historyId);
}
