package com.nguyenquanghai.aicheck.dto.request.student;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class examPasscode {
    //Kiểm tra passcode
    //Có id kì thi đó từ response listExam
    private String passcode;
}
