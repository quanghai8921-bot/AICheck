package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class detailAnswerOfStudent {
    private UUID answerId;
    private String content;
    private Integer wordCount;
    private UUID reportId;

}
