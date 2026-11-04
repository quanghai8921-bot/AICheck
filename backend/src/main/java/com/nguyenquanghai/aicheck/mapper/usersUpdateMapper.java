package com.nguyenquanghai.aicheck.mapper;

import org.springframework.stereotype.Component;

import com.nguyenquanghai.aicheck.dto.request.student.updateInformation;
import com.nguyenquanghai.aicheck.entity.user;

@Component
public class usersUpdateMapper {

    public void UpdateEntity(updateInformation request, user users) {
        if (request.getFullName() != null) {
            users.setFullName(request.getFullName());
        }
        if (request.getEmail() != null) {
            users.setEmail(request.getEmail());
        }
        if (request.getPhoneNumber() != null) {
            users.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getSex() != null) {
            users.setSex(request.getSex());
        }
        if (request.getIndentificationCard() != null) {
            users.setIdentificationCard(request.getIndentificationCard());
        }
        if (request.getAddress() != null) {
            users.setAddress(request.getAddress());
        }
    }

}
