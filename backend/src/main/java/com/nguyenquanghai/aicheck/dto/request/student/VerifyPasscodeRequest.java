package com.nguyenquanghai.aicheck.dto.request.student;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyPasscodeRequest {
    @NotBlank(message = "Passcode is required")
    private String passcode;
}
