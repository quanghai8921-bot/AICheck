package com.nguyenquanghai.aicheck.mapper;

import com.nguyenquanghai.aicheck.dto.request.teacher.createExam;
import com.nguyenquanghai.aicheck.entity.bankQuestion;
import com.nguyenquanghai.aicheck.entity.exam;
import com.nguyenquanghai.aicheck.entity.subject;

public class createExamMapper {
        // Chuyển đổi request tạo bài kiểm tra vào entity
        public exam toEntity(createExam request) {
                bankQuestion questionId = bankQuestion.builder()
                                .questionId(request.getQuestionId())
                                .build();
                subject subjectsCode = subject.builder()
                                .subjectCode(request.getSubjectCode())
                                .build();
                return exam.builder()
                                .bankQuestion(questionId)
                                .subjects(subjectsCode)
                                .title(request.getTitle())
                                .startAt(request.getStartAt())
                                .endAt(request.getEndAt())
                                .createdAt(request.getCreatedAt())
                                .type(request.getType())
                                .status(request.getStatus())
                                .passcode(request.getPasscode())
                                .build();
        }
}
