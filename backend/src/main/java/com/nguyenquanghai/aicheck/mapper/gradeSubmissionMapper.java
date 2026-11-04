package com.nguyenquanghai.aicheck.mapper;

import com.nguyenquanghai.aicheck.dto.request.teacher.gradeSubmission;
import com.nguyenquanghai.aicheck.entity.history;
import com.nguyenquanghai.aicheck.entity.teacher;

public class gradeSubmissionMapper {
    public history toEntity(gradeSubmission request) {
        teacher teacherCode = teacher.builder()
                .teacherCode(request.getGradeBy())
                .build();
        return history.builder()
                .historyId(request.getHistoryId())
                .score(request.getScore())
                .feedback(request.getFeedback())
                .statusGrading(request.getStatusGrading())
                .teacher(teacherCode)
                .build();
    }
}
