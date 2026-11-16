package com.nguyenquanghai.aicheck.repository.custom.impl;

import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.entity.Qmajor;
import com.nguyenquanghai.aicheck.entity.Qstudent;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.nguyenquanghai.aicheck.dto.response.student.studentMajor;

import lombok.RequiredArgsConstructor;
import com.nguyenquanghai.aicheck.repository.custom.StudentRepositoryCustom;

@Repository
@RequiredArgsConstructor
public class StudentRepositoryImpl implements StudentRepositoryCustom {
        private final JPAQueryFactory queryFactory;

        private static final Qstudent student = Qstudent.student;
        private static final Qmajor major = Qmajor.major;

        // Sinh viên đó học ngành gì
        @Override
        public studentMajor studentMajor(UUID studentId) {
                return queryFactory
                                .select(Projections.constructor(
                                                studentMajor.class,
                                                student.studentId,
                                                student.studentCode,
                                                major.majorId,
                                                major.majorCode))
                                .from(student)
                                .innerJoin(student.major, major)
                                .where(
                                                student.studentId.eq(studentId))
                                .fetchOne();
        }

}
