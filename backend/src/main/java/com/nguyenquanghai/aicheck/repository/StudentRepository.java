package com.nguyenquanghai.aicheck.repository;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.entity.Qmajor;
import com.nguyenquanghai.aicheck.entity.Qstudent;
import com.nguyenquanghai.aicheck.entity.Quser;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class StudentRepository {
    private final JPAQueryFactory queryFactory;

    Qstudent student = Qstudent.student;
    Qmajor major = Qmajor.major;
    Quser user = Quser.user;

    //Thông tin cá nhân của sinh viên theo ID
    public Tuple findUserByCode(String studentCode) {

        return queryFactory
                .select(student.studentCode, user.fullName, user.phoneNumber, user.email, user.sex,
                        user.identificationCard, user.address, student.major.majorCode, student.semester,
                        student.startAt, student.endAt)
                .from(student)
                .innerJoin(user).on(student.user.userId.eq(user.userId))
                .innerJoin(major).on(student.major.majorCode.eq(major.majorCode))
                .where(
                        student.studentCode.equalsIgnoreCase(studentCode))
                .fetchOne();
    }

}
