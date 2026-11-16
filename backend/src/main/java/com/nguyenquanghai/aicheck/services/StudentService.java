package com.nguyenquanghai.aicheck.services;

import com.nguyenquanghai.aicheck.repository.StudentRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nguyenquanghai.aicheck.dto.request.student.SubmitAnswer;
import com.nguyenquanghai.aicheck.dto.request.student.VerifyPasscodeRequest;
import com.nguyenquanghai.aicheck.dto.response.student.VerifyPasscodeResponse;
import com.nguyenquanghai.aicheck.dto.response.student.listExam;
import com.nguyenquanghai.aicheck.dto.response.student.listQuestion;
import com.nguyenquanghai.aicheck.dto.response.student.listSubjectMajor;
import com.nguyenquanghai.aicheck.dto.response.student.studentMajor;
import com.nguyenquanghai.aicheck.repository.ExamRepository;
import com.nguyenquanghai.aicheck.repository.HistoryRepository;
import com.nguyenquanghai.aicheck.repository.MajorRepository;

import jakarta.persistence.EntityNotFoundException;

import com.nguyenquanghai.aicheck.entity.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final ExamRepository examRepository;
    private final HistoryRepository historyRepository;
    private final MajorRepository majorRepository;
    Qexam qexam = Qexam.exam;
    Qsubject qsubject = Qsubject.subject;

    @Transactional
    public void submitExam(String studentId, SubmitAnswer request) {
        LocalDateTime now = LocalDateTime.now();
        exam currentExam = examRepository.findById(request.getExamId())
                .orElseThrow(() -> new RuntimeException("Kì thi không tồn tại"));
        if (now.isAfter(currentExam.getEndAt())) {
            throw new RuntimeException("Đã hết thời gian nộp bài");
        }

        UUID historyId = null;
        String status = "Submission";

        history history = historyRepository.findById(historyId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy lịch sử"));

        // Kiểm tra tránh ghi đè lịch sử lần 2
        if (status.equalsIgnoreCase(history.getStatusSubmission())) {
            throw new IllegalStateException("Bạn đã nộp bài kiểm tra rồi");
        }

    }

    @Transactional(readOnly = true)
    public List<listExam> getActiveOrPrepareExam() {

        return examRepository.findExamOpenedOrPrepared();
        
    }

    public VerifyPasscodeResponse verifyPasscode(VerifyPasscodeRequest request) {
        exam exam = examRepository.findById(request.getExamId())
                .orElseThrow(() -> new EntityNotFoundException("Kỳ thi không tồn tại"));

        LocalDateTime now = LocalDateTime.now();

        String passcode = exam.getPasscode();
        LocalDateTime startAt = exam.getStartAt();
        LocalDateTime endAt = exam.getEndAt();

        // 1. Kiểm tra khung giờ mở đề
        if (startAt != null && now.isBefore(startAt)) {
            throw new IllegalStateException("Kỳ thi chưa đến thời gian mở");
        }
        if (endAt != null && now.isAfter(endAt)) {
            throw new IllegalStateException("Kỳ thi đã kết thúc");
        }

        if (!passcode.equalsIgnoreCase(request.getPasscode().trim())) {
            return VerifyPasscodeResponse.builder()
                    .valid(false)
                    .message("Mã passcode không chính xác")
                    .build();
        }
        return VerifyPasscodeResponse.builder()
                .valid(true)
                .message("Xác thực thành công")
                .examId(exam.getExamId())
                .build();
    }

    //Ngành đó có môn gì
    @Transactional(readOnly = true)
    public List<listSubjectMajor> getSubjectsByMajor(UUID majorId) {
        return majorRepository.findSubjectByMajorId(majorId);
    }

    // Sinh viên đó học ngành gì
    @Transactional(readOnly = true)
    public studentMajor getStudentMajor(UUID studentId) {
        return studentRepository.studentMajor(studentId);
    }

    //Kì thi đó có câu hỏi gì
    public listQuestion getListQuestion(UUID examId){
        return examRepository.questionForExam(examId);
    }
}
