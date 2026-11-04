package com.nguyenquanghai.aicheck.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.nguyenquanghai.aicheck.entity.QbankQuestion;
import com.nguyenquanghai.aicheck.entity.Qsubject;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class BankQuestionRepository {
    private final JPAQueryFactory queryFactory;

    Qsubject subject = Qsubject.subject;
    QbankQuestion bankQuestions = QbankQuestion.bankQuestion;

    // Danh sách môn đó có những ngân hàng câu hỏi nào
    public List<Tuple> listBankQuestion(String subjectCode) {
        return queryFactory
                .select(bankQuestions.content, subject.subjectCode)
                .from(bankQuestions)
                .innerJoin(subject).on(bankQuestions.subject.subjectCode.eq(subject.subjectCode))
                .where(
                        bankQuestions.subject.subjectCode.eq(subjectCode))
                .fetch();
    }

}
