package com.nguyenquanghai.aicheck.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.entity.Qhistory;
import com.nguyenquanghai.aicheck.entity.QreportAI;
import com.nguyenquanghai.aicheck.entity.QstudentAnswer;
import com.nguyenquanghai.aicheck.entity.Qstylometry;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class StudentAnswerRepository {

        private final JPAQueryFactory queryFactory;

        QstudentAnswer studentAnswer = QstudentAnswer.studentAnswer;
        Qhistory history = Qhistory.history;
        QreportAI reportAI = QreportAI.reportAI;
        Qstylometry stylometry = Qstylometry.stylometry;

        // Danh sách trong bài kiểm tra đó sinh viên trả lời ra sao và bản báo cáo AI
        // tương ứng
        public List<Tuple> listExamAnswer(UUID historyId) {
                return queryFactory
                                .select(studentAnswer.content, studentAnswer.wordCount, reportAI.statusFlag,
                                                reportAI.stylometry,
                                                reportAI.perplexity, reportAI.burstiness)
                                .from(studentAnswer)
                                .innerJoin(reportAI).on(studentAnswer.reportAI.reportId.eq(reportAI.reportId))
                                .innerJoin(stylometry).on(reportAI.stylometry.stylometryId.eq(stylometry.stylometryId))
                                .where(
                                                studentAnswer.history.historyId.eq(historyId))
                                .fetch();
        }

}
