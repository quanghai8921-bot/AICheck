package com.nguyenquanghai.aicheck.repository.custom.impl;

import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.entity.Qexam;
import com.nguyenquanghai.aicheck.entity.Qhistory;
import com.nguyenquanghai.aicheck.entity.QreportAI;
import com.nguyenquanghai.aicheck.entity.Qstudent;
import com.nguyenquanghai.aicheck.entity.Qsubject;
import com.nguyenquanghai.aicheck.entity.Quser;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import com.nguyenquanghai.aicheck.repository.custom.HistoryRepositoryCustom;

@Repository
@RequiredArgsConstructor
public class HistoryRepositoryImpl implements HistoryRepositoryCustom {
        private final JPAQueryFactory queryFactory;

        private static final Qhistory history = Qhistory.history;
        private static final Qexam exam = Qexam.exam;
        private static final Qstudent student = Qstudent.student;
        private static final Quser user = Quser.user;
        private static final QreportAI reportAI = QreportAI.reportAI;
        private static final Qsubject subject = Qsubject.subject;

        // Giáo viên nhận bài của sinh viên nộp 
        @Override
        public List<Tuple> findStudentSubmissions(UUID examId) {
                return queryFactory
                                .select(
                                                history.historyId,
                                                student.studentId,
                                                student.studentCode,
                                                history.statusSubmission,
                                                history.submissionAt,
                                                reportAI.statusFlag,
                                                reportAI.reportId
                                )
                                .from(history)
                                .innerJoin(history.student, student)
                                .where(
                                        history.exam.examId.eq(examId)
                                )
                                .fetch();
        }

        // Lịch sử giáo viên xem những bài kiểm tra mà mình đã chấm
        @Override
        public List<Tuple> findExamGradedByTeacher(UUID historyId, UUID teacherId) {

                return queryFactory
                                .select(
                                                history.historyId,
                                                exam.examId,
                                                exam.title,
                                                student.studentCode,
                                                user.fullName,
                                                history.score,
                                                history.feedback,
                                                history.gradeAt
                                        )
                                .from(history)
                                .innerJoin(history.exam, exam)
                                .innerJoin(history.student, student)
                                .innerJoin(student.user, user)
                                .where(
                                        history.historyId.eq(historyId),
                                        history.teacher.teacherId.eq(teacherId)
                                )
                                .fetch();
        }

        // Lịch sử sinh viên xem mình đã làm bài kiểm tra nào
        @Override
        public List<Tuple> findStudentExamHistory(UUID historyId, UUID studentId) {

                return queryFactory
                                .select(
                                                history.historyId,
                                                exam.examId,
                                                exam.title,
                                                exam.subjects.subjectName,
                                                history.score,
                                                history.feedback,
                                                history.statusSubmission,
                                                history.statusGrading
                                        )
                                .from(history)
                                .innerJoin(history.exam, exam)
                                .leftJoin(exam.subjects, subject)
                                .where(
                                        history.historyId.eq(historyId),
                                        history.student.studentId.eq(studentId)
                                )
                                .fetch();
        }

}
