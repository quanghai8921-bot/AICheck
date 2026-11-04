package com.nguyenquanghai.aicheck.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.entity.Qexam;
import com.nguyenquanghai.aicheck.entity.Qhistory;
import com.nguyenquanghai.aicheck.entity.exam;
import com.nguyenquanghai.aicheck.entity.history;
import com.nguyenquanghai.aicheck.entity.student;
import com.nguyenquanghai.aicheck.entity.teacher;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class HistoryRepository {
        private final JPAQueryFactory queryFactory;
        private final EntityManager entityManager;

        Qhistory qhistory = Qhistory.history;
        Qexam exam = Qexam.exam;

        // Lịch sử sinh viên xem mình đã làm bài kiểm tra nào
        public List<Tuple> listStudentDoingExam(String studentCode) {
                return queryFactory
                                .select(qhistory.student.studentCode, exam.title, qhistory.score, qhistory.feedback,
                                                qhistory.statusSubmission)
                                .from(qhistory)
                                .innerJoin(exam).on(qhistory.exam.examId.eq(exam.examId))
                                .where(
                                                qhistory.student.studentCode.eq(studentCode))
                                .fetch();
        }

        // Lịch sử giáo viên xem những bài kiểm tra mà mình đã chấm
        public List<Tuple> listExamGrade(String teacherCode) {
                return queryFactory
                                .select(exam.title, qhistory.student.studentCode, qhistory.score, qhistory.feedback,
                                                qhistory.gradeAt)
                                .from(qhistory)
                                .innerJoin(exam).on(qhistory.exam.examId.eq(exam.examId))
                                .where(
                                                qhistory.teacher.teacherCode.eq(teacherCode))
                                .fetch();
        }

        public history createJoin(String studentCode, UUID examId) {
                boolean alreadyJoined = queryFactory
                                .selectOne()
                                .from(qhistory)
                                .where(
                                                qhistory.student.studentCode.eq(studentCode),
                                                qhistory.exam.examId.eq(examId))
                                .fetchFirst() != null;

                if (alreadyJoined) {
                        throw new IllegalStateException("Sinh viên đã tham gia kỳ thi này.");
                }

                history entity = history.builder()
                                .student(entityManager.getReference(student.class, studentCode))
                                .exam(entityManager.getReference(exam.class, examId))
                                .statusJoin("JOINED")
                                .statusSubmission("NOT_SUBMITTED")
                                .joinAt(LocalDateTime.now())
                                .build();

                entityManager.persist(entity);
                return entity;
        }

        public boolean markSubmitted(UUID historyId, String studentCode) {
                long updated = queryFactory
                                .update(qhistory)
                                .set(qhistory.statusSubmission, "SUBMITTED")
                                .set(qhistory.submissionAt, LocalDateTime.now())
                                .where(
                                                qhistory.historyId.eq(historyId),
                                                qhistory.student.studentCode.eq(studentCode),
                                                qhistory.statusJoin.eq("JOINED"),
                                                qhistory.statusSubmission.eq("NOT_SUBMITTED"))
                                .execute();

                return updated == 1;
        }

        public boolean markGraded(
                        UUID historyId,
                        String teacherCode,
                        BigDecimal grade,
                        String feedback) {

                long updated = queryFactory
                                .update(qhistory)
                                .set(qhistory.score, grade)
                                .set(qhistory.feedback, feedback)
                                .set(qhistory.teacher,
                                                entityManager.getReference(teacher.class, teacherCode))
                                .set(qhistory.gradeAt, LocalDateTime.now())
                                .set(qhistory.statusGrading, "GRADED")
                                .where(
                                                qhistory.historyId.eq(historyId),
                                                qhistory.statusSubmission.eq("SUBMITTED"),
                                                qhistory.statusGrading.eq("PENDING"))
                                .execute();

                return updated == 1;
        }

}
