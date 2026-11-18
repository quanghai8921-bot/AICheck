package com.nguyenquanghai.aicheck.security.service;

import com.nguyenquanghai.aicheck.dto.response.TokenResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.List;

import org.keycloak.admin.client.Keycloak;
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
@RequiredArgsConstructor
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

    @Value("${keycloak.admin.username}")
    private String adminUsername;

    @Value("${keycloak.admin.password}")
    private String adminPassword;

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

    private final Keycloak adminKeycloak;

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
            log.error("Keycloak returns an HTTP error {} từ {}: {}", e.getStatusCode(), tokenUrl,
                    e.getResponseBodyAsString());
            throw e;
        } catch (ResourceAccessException e) {
            log.error(
                    "Cannot connect to the Keycloak server at [{}]. Please check if Keycloak has started successfully: {}",
                    tokenUrl, e.getMessage());
            throw new RuntimeException("Cannot connect to the Keycloak authentication server!");
        } 
    }

    public void sendResetPasswordEmail(String email) {
        // Find user by Email in Realm "aicheck"
        List<UserRepresentation> users = adminKeycloak.realm(realm)
                .users()
                .searchByEmail(email, true);
        if (users == null || users.isEmpty()) {
            throw new RuntimeException("No account found associated with the email: " + email);
        }
        String userId = users.get(0).getId();
        // Request Keycloak to send an email with the UPDATE_PASSWORD link
        adminKeycloak.realm(realm)
                .users()
                .get(userId)
                .executeActionsEmail(Collections.singletonList("UPDATE_PASSWORD"));
        log.info("Password reset email sent to user: {}", email);
    }
}