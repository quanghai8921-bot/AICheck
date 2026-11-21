package com.nguyenquanghai.aicheck.dto.response.student;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreviousStylometryResponse {
    private String vocabulary;
    private String grammar;
    private String mistake;
    private String express;
}
