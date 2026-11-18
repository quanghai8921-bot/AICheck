package com.nguyenquanghai.aicheck.repository.custom.impl;

import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.dto.response.student.HistoryExamResponse;
import com.nguyenquanghai.aicheck.dto.response.teacher.HistoryGradedExamResponse;
import com.nguyenquanghai.aicheck.dto.response.teacher.ReceiveExamOfStudentResponse;
import com.nguyenquanghai.aicheck.entity.QExam;
import com.nguyenquanghai.aicheck.entity.QHistory;
import com.nguyenquanghai.aicheck.entity.QReportAI;
import com.nguyenquanghai.aicheck.entity.QStudent;
import com.nguyenquanghai.aicheck.entity.QSubject;
import com.nguyenquanghai.aicheck.entity.QUser;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import com.nguyenquanghai.aicheck.repository.custom.HistoryRepositoryCustom;

@Repository
@RequiredArgsConstructor
public class HistoryRepositoryImpl implements HistoryRepositoryCustom {
        private final JPAQueryFactory queryFactory;

        private static final QHistory history = QHistory.history;
        private static final QExam exam = QExam.exam;
        private static final QStudent student = QStudent.student;
        private static final QUser user = QUser.user;
        private static final QReportAI reportAI = QReportAI.reportAI;
        private static final QSubject subject = QSubject.subject;

        // Giáo viên nhận bài của sinh viên nộp
        @Override
        public List<ReceiveExamOfStudentResponse> findStudentSubmissions(UUID examId) {
                return queryFactory
                                .select(Projections.constructor(
                                                ReceiveExamOfStudentResponse.class,
                                                history.historyId,
                                                student.studentId,
                                                student.studentCode,
                                                history.statusSubmission,
                                                history.submissionAt,
                                                reportAI.reportId,
                                                reportAI.statusFlag))
                                .from(history)
                                .innerJoin(history.student, student)
                                .where(
                                                history.exam.examId.eq(examId))
                                .fetch();
        }

        // Lịch sử giáo viên xem những bài kiểm tra mà mình đã chấm
        @Override
        public List<HistoryGradedExamResponse> findExamGradedByTeacher(UUID historyId, UUID teacherId) {

                return queryFactory
                                .select(Projections.constructor(
                                                HistoryGradedExamResponse.class,
                                                history.historyId,
                                                exam.examId,
                                                exam.title,
                                                student.studentId,
                                                student.studentCode,
                                                history.score,
                                                history.feedback,
                                                history.statusGrading))

                                .from(history)
                                .innerJoin(history.exam, exam)
                                .innerJoin(history.student, student)
                                .innerJoin(student.user, user)
                                .where(
                                                history.historyId.eq(historyId),
                                                history.teacher.teacherId.eq(teacherId))
                                .fetch();
        }

        // Lịch sử sinh viên xem mình đã làm bài kiểm tra nào
        @Override
        public List<HistoryExamResponse> findStudentExamHistory(UUID studentId) {
                return queryFactory
                                .select(Projections.constructor(
                                                HistoryExamResponse.class,
                                                history.historyId,
                                                exam.examId,
                                                exam.title,
                                                subject.subjectName,
                                                history.score,
                                                history.feedback,
                                                history.statusSubmission,
                                                history.statusGrading))
                                .from(history)
                                .innerJoin(history.exam, exam)
                                .leftJoin(exam.subject, subject)
                                .where(history.student.studentId.eq(studentId))
                                .orderBy(history.submissionAt.desc())
                                .fetch();
        }

}
