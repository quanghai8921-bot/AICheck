package com.nguyenquanghai.aicheck.repository.custom;

import com.nguyenquanghai.aicheck.dto.response.student.ListExamResponse;
import com.nguyenquanghai.aicheck.dto.response.student.QuestionResponse;
import com.nguyenquanghai.aicheck.dto.response.teacher.ListExamCreatedResponse;

import java.util.List;
import java.util.UUID;

public interface ExamRepositoryCustom {

    List<ListExamCreatedResponse> findExamCreateByTeacherCode(UUID examId);

    List<ListExamResponse> findExamOpenedOrPrepared();

    QuestionResponse questionForExam(UUID examId);

}
