package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.request.LoginRequest;
import com.dailyalcorwork.universal_pet_care.response.ApiResponse;
import com.dailyalcorwork.universal_pet_care.response.JwtResponse;
import com.dailyalcorwork.universal_pet_care.security.jwt.JwtUtils;
import com.dailyalcorwork.universal_pet_care.security.user.UPCUserDetails;
import com.dailyalcorwork.universal_pet_care.service.token.VerificationTokenService;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import com.dailyalcorwork.universal_pet_care.utils.UrlMapping;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;


@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
@RestController
@RequestMapping(UrlMapping.AUTH)
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final VerificationTokenService tokenService;

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
            return ResponseEntity.ok(new ApiResponse("Authentication successfully", jwtResponse));
        } catch (DisabledException e) {
            return ResponseEntity.status(UNAUTHORIZED)
                    .body(new ApiResponse("Sorry, your account is disabled. please contact the service desk", null));
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
}
