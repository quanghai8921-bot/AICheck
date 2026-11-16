package com.nguyenquanghai.aicheck.mapper;

import com.nguyenquanghai.aicheck.dto.response.student.historyExam;
import com.nguyenquanghai.aicheck.entity.history;

public class historyExamMapper {
    public historyExam toRespone(history history) {
        return historyExam.builder()
                .examId(history.getExam().getExamId())
                .historyId(history.getHistoryId())
                .score(history.getScore())
                .feedback(history.getFeedback())
                .statusGrading(history.getStatusGrading())
                .build();
    }
}
