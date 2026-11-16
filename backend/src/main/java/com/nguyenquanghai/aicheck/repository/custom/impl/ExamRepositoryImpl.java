package com.nguyenquanghai.aicheck.repository.custom.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.dto.response.student.listExam;
import com.nguyenquanghai.aicheck.dto.response.student.listQuestion;
import com.nguyenquanghai.aicheck.entity.QbankQuestion;
import com.nguyenquanghai.aicheck.entity.Qexam;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import com.nguyenquanghai.aicheck.repository.custom.ExamRepositoryCustom;

@Repository
@RequiredArgsConstructor
public class ExamRepositoryImpl implements ExamRepositoryCustom {
        private final JPAQueryFactory queryFactory;

        private static final Qexam exam = Qexam.exam;
        private static final QbankQuestion bankQuestion = QbankQuestion.bankQuestion;

        // Lịch sử giáo viên đó tạo bài kiểm tra nào
        public List<Tuple> findExamCreateByTeacherCode(UUID examId) {

                return queryFactory
                                .select(exam.teacher.teacherCode, exam.createdAt)
                                .from(exam)
                                .where(
                                                exam.examId.eq(examId))
                                .fetch();
        }

        // Kì thi đang mở hoặc sắp mở theo mã môn
        public List<listExam> findExamOpenedOrPrepared() {
                return queryFactory
                                .select(Projections.constructor(
                                                listExam.class,
                                                exam.examId,
                                                exam.title,
                                                exam.type,
                                                exam.startAt,
                                                exam.endAt,
                                                exam.status))
                                .from(exam)
                                .where(
                                                exam.status.equalsIgnoreCase("Actived")
                                                                .or(exam.status.equalsIgnoreCase("Prepare")))
                                .fetch();
        }

        // Kì thi đó có câu hỏi gì
        public listQuestion questionForExam(UUID examId) {
                return queryFactory
                                .select(Projections.constructor(
                                                listQuestion.class,
                                                exam.examId,
                                                bankQuestion.questionId,
                                                bankQuestion.content))
                                .from(exam)
                                .innerJoin(exam.bankQuestion, bankQuestion)
                                .where(
                                                exam.examId.eq(examId))
                                .fetchOne();
        }
}
