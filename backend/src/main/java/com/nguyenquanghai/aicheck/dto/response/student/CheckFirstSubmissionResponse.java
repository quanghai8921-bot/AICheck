package com.nguyenquanghai.aicheck.dto.response.student;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckFirstSubmissionResponse {
    private boolean isFirstSummission;
}
