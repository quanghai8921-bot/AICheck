package com.nguyenquanghai.aicheck.dto.response.student;

import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class listQuestion {
    //Đã có id danh sách kì thi, sẽ biết danh sách câu hỏi của kì thi
    private UUID questionId;
    private String content;
}
