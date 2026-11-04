package com.nguyenquanghai.aicheck.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "roleId", nullable = false)
    private UUID roleId;

    @Column(name = "roleName", nullable = false, length = 255)
    private String roleName;
}
