package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class receiveExamOfStudent {

    private UUID questionId;
    private String answerId;
    private String content;
    private Integer wordCount;

    private UUID reportId;

}
