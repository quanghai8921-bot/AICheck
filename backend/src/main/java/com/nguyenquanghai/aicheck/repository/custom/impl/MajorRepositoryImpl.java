package com.nguyenquanghai.aicheck.repository.custom.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.dto.response.student.listSubjectMajor;
import com.nguyenquanghai.aicheck.entity.Qmajor;
import com.nguyenquanghai.aicheck.entity.Qsubject;
import com.nguyenquanghai.aicheck.repository.custom.MajorRepositoryCustom;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MajorRepositoryImpl implements MajorRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private static final Qmajor major = Qmajor.major;
    private static final Qsubject subject = Qsubject.subject;

    // Ngành đó có môn gì
    public List<listSubjectMajor> findSubjectByMajorId(UUID majorId) {
        return queryFactory
                .select(Projections.constructor(
                        listSubjectMajor.class,
                        major.majorId,
                        subject.subjectId,
                        subject.subjectCode,
                        subject.subjectName))
                .from(subject)
                .innerJoin(subject.major, major)
                .where(major.majorId.eq(majorId))
                .fetch();
    }
}
