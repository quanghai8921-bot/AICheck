package com.nguyenquanghai.aicheck.entity;

import java.io.Serializable;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subjectMajorId")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
class subjectMajorId implements Serializable {

    private String majorId;
    private String subjectId;
}

@Entity
@Table(name = "subjectMajor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class subjectMajor {

    @EmbeddedId
    private String subjectMajortId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("majorIde")
    @JoinColumn(name = "majorId", referencedColumnName = "majorId")
    private major major;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("subjectId")
    @JoinColumn(name = "subjectId", referencedColumnName = "subjectId")
    private subject subject;

}
// Bảng phụ