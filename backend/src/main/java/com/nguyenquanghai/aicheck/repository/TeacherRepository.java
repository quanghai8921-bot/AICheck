package com.nguyenquanghai.aicheck.repository;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.entity.Qsubject;
import com.nguyenquanghai.aicheck.entity.Qteacher;
import com.nguyenquanghai.aicheck.entity.Quser;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class TeacherRepository {
        private final JPAQueryFactory queryFactory;

        Qteacher teacher = Qteacher.teacher;
        Qsubject subject = Qsubject.subject;
        Quser user = Quser.user;

        // Thông tin cá nhân của teacher theo ID và người ấy dạy môn gì
        public Tuple findTeacherByCode(String teacherCode) {
                return queryFactory
                                .select(teacher.teacherCode, user.fullName, user.email, user.phoneNumber,
                                                user.dateOfBirth,
                                                user.sex, user.identificationCard, user.address,
                                                teacher.subject.subjectCode,
                                                subject.subjectName,
                                                teacher.experience,
                                                teacher.startAt, teacher.endAt)
                                .from(teacher)
                                .innerJoin(user).on(teacher.user.userId.eq(user.userId))
                                .innerJoin(subject).on(teacher.subject.subjectCode.eq(subject.subjectCode))
                                .where(
                                                teacher.teacherCode.eq(teacherCode))
                                .fetchOne();
        }

}
