package com.nguyenquanghai.aicheck.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nguyenquanghai.aicheck.dto.response.student.listSubjectMajor;
import com.nguyenquanghai.aicheck.repository.MajorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final MajorRepository majorRepository;

    @Transactional
    public List<listSubjectMajor> getAllSubjects(UUID majorId) {
        return majorRepository.findSubjectByMajorId(majorId);
    }
}
