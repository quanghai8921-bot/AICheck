package com.nguyenquanghai.aicheck.mapper;

import com.nguyenquanghai.aicheck.dto.request.teacher.gradeSubmission;
import com.nguyenquanghai.aicheck.entity.history;

public class gradeSubmissionMapper {
    public history toEntity(gradeSubmission request) {
        return history.builder()
                .historyId(request.getHistoryId())
                .score(request.getScore())
                .feedback(request.getFeedback())
                .build();
    }
}
