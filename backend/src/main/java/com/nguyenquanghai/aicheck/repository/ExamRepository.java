package com.nguyenquanghai.aicheck.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.entity.Qexam;
import com.nguyenquanghai.aicheck.entity.Qmajor;
import com.nguyenquanghai.aicheck.entity.QsubjectMajor;
import com.nguyenquanghai.aicheck.entity.Qstudent;
import com.nguyenquanghai.aicheck.entity.Qsubject;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class ExamRepository {
        private final JPAQueryFactory queryFactory;

        Qexam exam = Qexam.exam;
        Qsubject subject = Qsubject.subject;
        QsubjectMajor subjectMajor = QsubjectMajor.subjectMajor;
        Qmajor major = Qmajor.major;
        Qstudent student = Qstudent.student;

        // Tìm kiếm kì thi theo ID
        public Tuple findExamById(UUID examId) {

                return queryFactory
                                .select(exam.title, exam.maxScore, exam.startAt, exam.endAt, exam.createdAt)
                                .from(exam)
                                .where(
                                                exam.examId.eq(examId))
                                .fetchOne();
        }

        // Danh sách kì thi được đó tạo bởi giáo viên nào
        public List<Tuple> findExamCreateByTeacherCode(UUID examId) {

                return queryFactory
                                .select(exam.teacher.teacherCode, exam.createdAt)
                                .from(exam)
                                .where(
                                                exam.examId.eq(examId))
                                .fetch();
        }

        // Danh sách kì thi đó đang mở cho sinh viên nào
        public List<Tuple> listExamOpenedForStudent(UUID examId) {

                return queryFactory
                                .select(student.studentCode, subject.subjectCode, exam.title, exam.createdAt,
                                                exam.endAt)
                                .from(exam)
                                .innerJoin(subject).on(exam.subjects.subjectCode.eq(subject.subjectCode))
                                .innerJoin(subjectMajor).on(subject.subjectCode.eq(subjectMajor.subject.subjectCode))
                                .innerJoin(major).on(subjectMajor.major.majorCode.eq(major.majorCode))
                                .innerJoin(student).on(major.majorCode.eq(student.major.majorCode))
                                .where(
                                                exam.examId.eq(examId))
                                .fetch();
        }

}
