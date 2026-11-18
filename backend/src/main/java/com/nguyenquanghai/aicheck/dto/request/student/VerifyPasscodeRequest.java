package com.nguyenquanghai.aicheck.dto.request.student;

import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyPasscodeRequest {
    private UUID examId;
    private String passcode;
}
