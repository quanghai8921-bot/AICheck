package com.nguyenquanghai.aicheck.repository.custom;

import com.nguyenquanghai.aicheck.dto.response.student.listExam;
import com.nguyenquanghai.aicheck.dto.response.student.listQuestion;
import com.querydsl.core.Tuple;

import java.util.List;
import java.util.UUID;

public interface ExamRepositoryCustom {

    List<Tuple> findExamCreateByTeacherCode(UUID examId);

    List<listExam> findExamOpenedOrPrepared();

    listQuestion questionForExam(UUID examId);

}
