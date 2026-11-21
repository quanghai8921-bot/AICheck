package com.nguyenquanghai.aicheck.dto.response.student;

import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder 
public class VerifyPasscodeResponse {
    private boolean valid;
    private String message;
    private UUID examId;
}
