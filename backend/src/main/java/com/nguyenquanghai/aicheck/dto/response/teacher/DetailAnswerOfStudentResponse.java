package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailAnswerOfStudentResponse {
    private UUID answerId;
    private String content;
    private Integer wordCount;
    private UUID reportId;
    private String statusFlag;
    private String perplexity;
    private String burstiness;
    private UUID stylometryId;
    private String vocabulary;
    private String mistake;
    private String grammar;
    private String express;

}
