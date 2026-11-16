package com.nguyenquanghai.aicheck.security.service;

import com.nguyenquanghai.aicheck.dto.response.TokenResponse;
import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.List;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class KeycloakAuthService {

    @Value("${keycloak.auth-server-url}")
    private String serverUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.client-id}")
    private String clientId;

    @Value("${keycloak.client-id-student:student-client}")
    private String clientIdStudent;

    @Value("${keycloak.client-id-teacher:teacher-client}")
    private String clientIdTeacher;

    @Value("${keycloak.client-secret-student:}")
    private String clientSecretStudent;
    @Value("${keycloak.client-secret-teacher:}")
    private String clientSecretTeacher;

    public String getClientIdStudent() {
        return clientIdStudent;
    }

    public String getClientIdTeacher() {
        return clientIdTeacher;
    }

    public String getClientSecretStudent() {
        return clientSecretStudent;
    }
    public String getClientSecretTeacher() {
        return clientSecretTeacher;
    }

    private final RestTemplate restTemplate = new RestTemplate();

    public TokenResponse loginWithKeycloak(String username, String password) {
        return loginWithKeycloak(username, password, this.clientId, null);
    }

    public TokenResponse loginWithKeycloak(String username, String password, String clientId) {
        return loginWithKeycloak(username, password, clientId, null);
    }

    public TokenResponse loginWithKeycloak(String username, String password, String clientId, String clientSecret) {
        String tokenUrl = serverUrl + "/realms/" + realm + "/protocol/openid-connect/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Đóng gói request dạng x-www-form-urlencoded theo chuẩn OAuth2
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "password");
        body.add("client_id", clientId);
        if (clientSecret != null && !clientSecret.isBlank()) {
            body.add("client_secret", clientSecret);
        }
        body.add("username", username);
        body.add("password", password);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<TokenResponse> response = restTemplate.postForEntity(tokenUrl, request, TokenResponse.class);
            return response.getBody();
        } catch (HttpStatusCodeException e) {
            log.error("Keycloak trả về lỗi HTTP {} từ {}: {}", e.getStatusCode(), tokenUrl, e.getResponseBodyAsString());
            throw e;
        } catch (ResourceAccessException e) {
            log.error("Không thể kết nối đến máy chủ Keycloak tại [{}]. Hãy kiểm tra xem Keycloak đã khởi động thành công chưa: {}", tokenUrl, e.getMessage());
            throw new RuntimeException("Không thể kết nối đến máy chủ xác thực Keycloak!");
        } catch (Exception e) {
            log.error("Lỗi khi gọi Keycloak Token Endpoint: ", e);
            throw new RuntimeException("Lỗi hệ thống trong quá trình xác thực!");
        }
    }

    public void sendResetPasswordEmail(String email) {
        // 1. Khởi tạo Keycloak Admin Client để thực hiện quyền quản trị
        Keycloak adminKeycloak = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm("master")
                .clientId("admin-cli")
                .username("admin")      // Tài khoản admin của Keycloak (trong docker-compose)
                .password("admin")      // Mật khẩu admin của Keycloak
                .build();
        try {
            // 2. Tìm người dùng theo Email trong Realm "aicheck"
            List<UserRepresentation> users = adminKeycloak.realm(realm)
                    .users()
                    .searchByEmail(email, true);
            if (users == null || users.isEmpty()) {
                throw new RuntimeException("Không tìm thấy tài khoản gắn với email: " + email);
            }
            String userId = users.get(0).getId();
            // 3. Yêu cầu Keycloak gửi email kèm liên kết UPDATE_PASSWORD
            adminKeycloak.realm(realm)
                    .users()
                    .get(userId)
                    .executeActionsEmail(Collections.singletonList("UPDATE_PASSWORD"));
            log.info("Đã gửi email đặt lại mật khẩu cho user: {}", email);
        } catch (Exception e) {
            log.error("Lỗi khi gửi email reset password qua Keycloak: ", e);
            throw new RuntimeException(e.getMessage());
        } finally {
            adminKeycloak.close();
        }
    }
}