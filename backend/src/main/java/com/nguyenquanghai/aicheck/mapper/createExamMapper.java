package com.nguyenquanghai.aicheck.mapper;

import com.nguyenquanghai.aicheck.dto.request.teacher.createExam;
import com.nguyenquanghai.aicheck.entity.bankQuestion;
import com.nguyenquanghai.aicheck.entity.exam;
import com.nguyenquanghai.aicheck.entity.subject;
import com.nguyenquanghai.aicheck.entity.teacher;

public class createExamMapper {
        // Chuyển đổi request tạo bài kiểm tra vào entity
        public exam toEntity(createExam request) {
                bankQuestion questionId = bankQuestion.builder()
                                .questionId(request.getQuestionId())
                                .build();
                teacher teacherCode = teacher.builder()
                                .teacherCode(request.getCreatedBy())
                                .build();
                subject subjectsCode = subject.builder()
                                .subjectCode(request.getSubjectCode())
                                .build();
                return exam.builder()
                                .bankQuestion(questionId)
                                .subjects(subjectsCode)
                                .title(request.getTitle())
                                .maxScore(request.getMaxScore())
                                .startAt(request.getStartAt())
                                .endAt(request.getEndAt())
                                .createdAt(request.getCreatedAt())
                                .teacher(teacherCode)
                                .type(request.getType())
                                .status(request.getStatus())
                                .passcode(request.getPasscode())
                                .build();
        }
}
