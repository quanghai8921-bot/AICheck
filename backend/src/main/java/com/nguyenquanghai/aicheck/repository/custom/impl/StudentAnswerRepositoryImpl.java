package com.nguyenquanghai.aicheck.repository.custom.impl;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.entity.QreportAI;
import com.nguyenquanghai.aicheck.entity.QstudentAnswer;
import com.nguyenquanghai.aicheck.entity.Qstylometry;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import com.nguyenquanghai.aicheck.repository.custom.StudentAnswerRepositoryCustom;

@Repository
@RequiredArgsConstructor
public class StudentAnswerRepositoryImpl implements StudentAnswerRepositoryCustom{

        private final JPAQueryFactory queryFactory;

        private static final QstudentAnswer studentAnswer = QstudentAnswer.studentAnswer;
        private static final QreportAI reportAI = QreportAI.reportAI;
        private static final Qstylometry stylometry = Qstylometry.stylometry;

        // Trong bài kiểm tra đó sinh viên trả lời ra sao và bản báo cáo AI
        // tương ứng
        public List<Tuple> ExamAnswer(UUID historyId) {
                return queryFactory
                                .select(studentAnswer.content, studentAnswer.wordCount, reportAI.statusFlag,
                                                reportAI.stylometry,
                                                reportAI.perplexity, reportAI.burstiness)
                                .from(studentAnswer)
                                .innerJoin(studentAnswer.reportAI, reportAI)
                                .innerJoin(reportAI.stylometry, stylometry)
                                .where(
                                                studentAnswer.history.historyId.eq(historyId))
                                .fetch();
        }

}
