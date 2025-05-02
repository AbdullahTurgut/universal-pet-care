package com.dailyalcorwork.universal_pet_care.service.password;

import com.dailyalcorwork.universal_pet_care.event.PasswordResetEvent;
import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.model.VerificationToken;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.repository.VerificationTokenRepository;
import com.dailyalcorwork.universal_pet_care.service.token.VerificationTokenService;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PasswordResetService implements IPasswordResetService {

    private final VerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher eventPublisher;
    private final VerificationTokenService verificationTokenService;


    @Override
    public Optional<User> findUserByPasswordResetToken(String token) {
        //method references
        return tokenRepository.findByToken(token).map(VerificationToken::getUser);
    }

    @Override
    public void requestPasswordReset(String email) {
        userRepository.findByEmail(email).ifPresentOrElse(user -> {
            PasswordResetEvent passwordResetEvent = new PasswordResetEvent(this, user);
            eventPublisher.publishEvent(passwordResetEvent);
        }, () -> {
            throw new ResourceNotFoundException(FeedBackMessage.USER_NOT_FOUND);
        });
    }

    @Override
    public String resetPassword(String password, User user) {
        try {
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            return "Your password has been reset";
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }
}
