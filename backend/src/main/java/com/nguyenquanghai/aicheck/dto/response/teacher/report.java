package com.nguyenquanghai.aicheck.dto.response.teacher;

import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class report {
    // Lồng từ phong cách viết
    private UUID stylometryId;
    private String vocabulary;
    private String grammar;
    private String mistake;
    private String express;

    private UUID reportId;
    private String perplexity;
    private String burstiness;
    private String statusFlag;
}
