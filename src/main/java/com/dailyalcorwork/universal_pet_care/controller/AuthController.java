package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.event.RegistrationCompleteEvent;
import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.model.VerificationToken;
import com.dailyalcorwork.universal_pet_care.request.LoginRequest;
import com.dailyalcorwork.universal_pet_care.request.PasswordResetRequest;
import com.dailyalcorwork.universal_pet_care.response.ApiResponse;
import com.dailyalcorwork.universal_pet_care.response.JwtResponse;
import com.dailyalcorwork.universal_pet_care.security.jwt.JwtUtils;
import com.dailyalcorwork.universal_pet_care.security.user.UPCUserDetails;
import com.dailyalcorwork.universal_pet_care.service.password.PasswordResetService;
import com.dailyalcorwork.universal_pet_care.service.token.VerificationTokenService;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import com.dailyalcorwork.universal_pet_care.utils.UrlMapping;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;


@RequiredArgsConstructor
@RestController
@RequestMapping(UrlMapping.AUTH)
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final VerificationTokenService tokenService;
    private final PasswordResetService passwordResetService;
    private final ApplicationEventPublisher publisher;

    @PostMapping(UrlMapping.LOGIN)
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication =
                    authenticationManager
                            .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateTokenForUser(authentication);
            UPCUserDetails userDetails = (UPCUserDetails) authentication.getPrincipal();
            JwtResponse jwtResponse = new JwtResponse(userDetails.getId(), jwt);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.SUCCESS_AUTHENTICATION, jwtResponse));
        } catch (DisabledException e) {
            return ResponseEntity.status(UNAUTHORIZED)
                    .body(new ApiResponse(FeedBackMessage.DISABLED_ACCOUNT, null));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(UNAUTHORIZED)
                    .body(new ApiResponse(e.getMessage(), "Invalid username or password"));
        }
    }

    @GetMapping(UrlMapping.VERIFY_YOUR_EMAIL)
    public ResponseEntity<ApiResponse> verifyEmail(@RequestParam("token") String token) {
        String result = tokenService.validateToken(token);
        return switch (result) {
            case "Valid" -> ResponseEntity.ok(new ApiResponse(FeedBackMessage.VALID_TOKEN, null));
            case "Verified" -> ResponseEntity.ok(new ApiResponse(FeedBackMessage.VERIFIED_TOKEN, null));
            case "Expired" ->
                    ResponseEntity.status(HttpStatus.GONE).body(new ApiResponse(FeedBackMessage.EXPIRED_TOKEN, null));
            case "Invalid" ->
                    ResponseEntity.status(HttpStatus.GONE).body(new ApiResponse(FeedBackMessage.INVALID_TOKEN, null));
            default ->
                    ResponseEntity.internalServerError().body(new ApiResponse(FeedBackMessage.TOKEN_VALIDATION_ERROR, null));
        };
    }

    @PutMapping(UrlMapping.RESEND_VERIFY_EMAIL)
    public ResponseEntity<ApiResponse> resendVerificationToken(@RequestParam("token") String oldToken) {
        try {
            VerificationToken verificationToken = tokenService.generateNewVerificationToken(oldToken);
            User theUser = verificationToken.getUser();
            publisher.publishEvent(new RegistrationCompleteEvent(theUser));
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.NEW_VERIFICATION_TOKEN_SENT, null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), null));
        }
    }

    // received password reset request for method----------------------
    @PostMapping(UrlMapping.REQUEST_PASSWORD_RESET)
    public ResponseEntity<ApiResponse> requestPasswordReset(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(FeedBackMessage.EMAIL_ASSOCIATED_WITH_ACCOUNT, null));
        }

        try {
            passwordResetService.requestPasswordReset(email);
            return ResponseEntity
                    .ok(new ApiResponse(FeedBackMessage.SENT_RESET_PASSWORD_REQUEST, null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PostMapping(UrlMapping.RESET_PASSWORD)
    public ResponseEntity<ApiResponse> resetPassword(@RequestBody PasswordResetRequest request) {
        String token = request.getToken();
        String newPassword = request.getNewPassword();
        if (token == null || token.trim().isEmpty() || newPassword == null || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse(FeedBackMessage.MISSING_TOKEN_OR_PASSWORD, null));
        }
        Optional<User> theUser = passwordResetService.findUserByPasswordResetToken(token);
        if (theUser.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse(FeedBackMessage.INVALID_TOKEN, null));
        }
        User user = theUser.get();
        String message = passwordResetService.resetPassword(newPassword, user);
        return ResponseEntity.ok(new ApiResponse(message, null));
    }
}
