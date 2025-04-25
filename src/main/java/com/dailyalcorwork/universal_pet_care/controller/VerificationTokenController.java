package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.model.VerificationToken;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.request.VerificationTokenRequest;
import com.dailyalcorwork.universal_pet_care.response.ApiResponse;
import com.dailyalcorwork.universal_pet_care.service.token.IVerificationTokenService;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import com.dailyalcorwork.universal_pet_care.utils.UrlMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(UrlMapping.TOKEN_VERIFICATION)
public class VerificationTokenController {
    private final IVerificationTokenService verificationTokenService;
    private final UserRepository userRepository;

    @GetMapping(UrlMapping.VALIDATE_TOKEN)
    public ResponseEntity<ApiResponse> validateToken(String token) {
        String result = verificationTokenService.validateToken(token);
        ApiResponse response = switch (result) {
            case "Invalid" -> new ApiResponse(FeedBackMessage.INVALID_TOKEN, null);
            case "Verified" -> new ApiResponse(FeedBackMessage.VERIFIED_TOKEN, null);
            case "Expired" -> new ApiResponse(FeedBackMessage.EXPIRED_TOKEN, null);
            case "Valid" -> new ApiResponse(FeedBackMessage.VALID_TOKEN, null);
            default -> new ApiResponse(FeedBackMessage.TOKEN_VALIDATION_ERROR, null);
        };

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse> checkTokenExpiration(String token) {
        boolean isExpired = verificationTokenService.isTokenExpired(token);
        ApiResponse response;
        if (isExpired) {
            response = new ApiResponse(FeedBackMessage.EXPIRED_TOKEN, null);
        } else {
            response = new ApiResponse(FeedBackMessage.VALID_TOKEN, null);
        }

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse> saveVerificationTokenForUser(@RequestBody VerificationTokenRequest request) {
        User user = userRepository.findById(request.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException(FeedBackMessage.RESOURCE_NOT_FOUND));
        verificationTokenService.saveVerificationTokenForUser(request.getToken(), user);

        return ResponseEntity.ok(new ApiResponse(FeedBackMessage.TOKEN_SAVED_SUCCESS, null));
    }

    @PutMapping(UrlMapping.GENERATE_NEW_TOKEN)
    public ResponseEntity<ApiResponse> generateNewVerificationToken(@RequestParam String oldToken) {
        VerificationToken newToken = verificationTokenService.generateNewVerificationToken(oldToken);
        return ResponseEntity.ok(new ApiResponse("", newToken));
    }

    @DeleteMapping(UrlMapping.DELETE_TOKEN)
    public ResponseEntity<ApiResponse> deleteUserToken(@RequestParam Long userId) {
        verificationTokenService.deleteVerificationToken(userId);
        return ResponseEntity.ok(new ApiResponse("User token deleted successfully", null));
    }
}
