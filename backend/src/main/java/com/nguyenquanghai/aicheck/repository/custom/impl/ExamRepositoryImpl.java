package com.nguyenquanghai.aicheck.repository.custom.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.common.enums.ExamStatus;
import com.nguyenquanghai.aicheck.dto.response.student.ListExamResponse;
import com.nguyenquanghai.aicheck.dto.response.student.QuestionResponse;
import com.nguyenquanghai.aicheck.dto.response.teacher.ListExamCreatedResponse;
import com.nguyenquanghai.aicheck.entity.QBankQuestion;
import com.nguyenquanghai.aicheck.entity.QExam;
import com.nguyenquanghai.aicheck.entity.QSubject;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import com.nguyenquanghai.aicheck.repository.custom.ExamRepositoryCustom;

@Repository
@RequiredArgsConstructor
public class ExamRepositoryImpl implements ExamRepositoryCustom {
        private final JPAQueryFactory queryFactory;

        private static final QExam exam = QExam.exam;
        private static final QBankQuestion bankQuestion = QBankQuestion.bankQuestion;
        private static final QSubject subject = QSubject.subject;

        // Which tests did that teacher create history for?
        @Override
        public List<ListExamCreatedResponse> findExamCreateByTeacherCode(UUID examId) {

                return queryFactory
                                .select(Projections.constructor(
                                                ListExamCreatedResponse.class,
                                                exam.examId,
                                                exam.title,
                                                exam.startAt,
                                                exam.endAt,
                                                exam.createdAt,
                                                exam.status,
                                                exam.type,
                                                exam.passcode))
                                .from(exam)
                                .where(
                                                exam.examId.eq(examId))
                                .fetch();
        }

        // Which exams are currently open or about to open by status
        @Override
        public List<ListExamResponse> findExamOpenedOrPrepared() {
                return queryFactory
                                .select(Projections.constructor(
                                                ListExamResponse.class,
                                                exam.examId,
                                                exam.title,
                                                exam.type,
                                                exam.startAt,
                                                exam.endAt,
                                                exam.status,
                                                subject.subjectId,
                                                subject.subjectCode,
                                                subject.subjectName))
                                .from(exam)
                                .innerJoin(exam.subject, subject)
                                .where(
                                                exam.status.in(ExamStatus.OPEN.name(),
                                                                ExamStatus.PREPARE.name()))
                                .fetch();
        }

        // What questions were on that exam?
        @Override
        public QuestionResponse questionForExam(UUID examId) {
                return queryFactory
                                .select(Projections.constructor(
                                                QuestionResponse.class,
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
