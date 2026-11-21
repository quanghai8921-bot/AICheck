package com.nguyenquanghai.aicheck.repository.custom.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.dto.response.student.PreviousStylometryResponse;
import com.nguyenquanghai.aicheck.dto.response.teacher.DetailAnswerOfStudentResponse;
import com.nguyenquanghai.aicheck.entity.QHistory;
import com.nguyenquanghai.aicheck.entity.QReportAI;
import com.nguyenquanghai.aicheck.entity.QStudentAnswer;
import com.nguyenquanghai.aicheck.entity.QStylometry;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import com.nguyenquanghai.aicheck.repository.custom.StudentAnswerRepositoryCustom;

@Repository
@RequiredArgsConstructor
public class StudentAnswerRepositoryImpl implements StudentAnswerRepositoryCustom {

        private final JPAQueryFactory queryFactory;

        private static final QStudentAnswer studentAnswer = QStudentAnswer.studentAnswer;
        private static final QReportAI reportAI = QReportAI.reportAI;
        private static final QStylometry stylometry = QStylometry.stylometry;
        private static final QHistory history = QHistory.history;

        // Trong bài kiểm tra đó sinh viên trả lời ra sao và bản báo cáo AI tương ứng
        @Override
        public List<DetailAnswerOfStudentResponse> TeacherViewAnswerOfStudent(UUID historyId) {
                return queryFactory
                                .select(Projections.constructor(
                                                DetailAnswerOfStudentResponse.class,
                                                studentAnswer.answerId,
                                                studentAnswer.content,
                                                studentAnswer.wordCount,
                                                reportAI.reportId,
                                                reportAI.statusFlag,
                                                reportAI.perplexity,
                                                reportAI.burstiness,
                                                reportAI.stylometry.stylometryId,
                                                reportAI.stylometry.vocabulary,
                                                reportAI.stylometry.mistake,
                                                reportAI.stylometry.grammar,
                                                reportAI.stylometry.express))
                                .from(studentAnswer)
                                .leftJoin(studentAnswer.reportAI, reportAI)
                                .innerJoin(reportAI.stylometry, stylometry)
                                .where(
                                                studentAnswer.history.historyId.eq(historyId))
                                .fetch();
        }

        // Kiểm tra sinh viên đã có mốc văn phong (Stylometry) nào được lưu hay chưa
        @Override
        public boolean existsStylometryByStudentId(UUID studentId) {
                Integer result = queryFactory
                                .selectOne()
                                .from(studentAnswer)
                                .innerJoin(studentAnswer.history, history)
                                .innerJoin(studentAnswer.reportAI, reportAI)
                                .where(
                                                history.student.studentId.eq(studentId),
                                                reportAI.stylometry.isNotNull())
                                .fetchFirst();

                return result != null;
        }

        // Lấy mốc phân tích Stylometry gần nhất của sinh viên
        @Override
        public Optional<PreviousStylometryResponse> findLatestStylometryByStudentId(UUID studentId) {
                PreviousStylometryResponse response = queryFactory
                                .select(Projections.constructor(
                                                PreviousStylometryResponse.class,
                                                stylometry.vocabulary,
                                                stylometry.grammar,
                                                stylometry.mistake,
                                                stylometry.express))
                                .from(studentAnswer)
                                .innerJoin(studentAnswer.history, history)
                                .innerJoin(studentAnswer.reportAI, reportAI)
                                .innerJoin(reportAI.stylometry, stylometry)
                                .where(
                                                history.student.studentId.eq(studentId))
                                .orderBy(history.submissionAt.desc())
                                .fetchFirst();

                return Optional.ofNullable(response);
        }

}
