package com.nguyenquanghai.aicheck.mapper;

import com.nguyenquanghai.aicheck.dto.response.teacher.listBankQuestion;
import com.nguyenquanghai.aicheck.entity.bankQuestion;

public class listBankQuestionMapper {

    public listBankQuestion toResponse(bankQuestion bankQuestions) {
        return listBankQuestion.builder()
                .questionId(bankQuestions.getQuestionId())
                .content(bankQuestions.getContent())
                .build();
    }

}
