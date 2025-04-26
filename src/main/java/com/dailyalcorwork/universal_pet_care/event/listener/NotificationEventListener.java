package com.dailyalcorwork.universal_pet_care.event.listener;

import com.dailyalcorwork.universal_pet_care.email.EmailService;
import com.dailyalcorwork.universal_pet_care.event.RegistrationCompleteEvent;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.service.token.IVerificationTokenService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class NotificationEventListener implements ApplicationListener<ApplicationEvent> {
    private final EmailService emailService;
    private final IVerificationTokenService tokenService;

    @Value("${frontend.base.url}")
    private String frontendBaseUrl;

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        Object source = event.getSource();
    }

    /* ========== START user registration email verification ============*/
    private void handleSendRegistrationVerificationEmail(RegistrationCompleteEvent event) {
        User user = event.getUser();
        //Generate a token for user
        String vToken = UUID.randomUUID().toString();
        //Save the token for user
        tokenService.saveVerificationTokenForUser(vToken, user);
        // Build the verification url
        String verificationUrl = frontendBaseUrl + "/email-verification?token=" + vToken;
        try {
            sendRegistrationVerificationEmail(user, verificationUrl);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    private void sendRegistrationVerificationEmail(User user, String verificationUrl) throws MessagingException, UnsupportedEncodingException {
        String subject = "Verify your email:";
        String senderName = "Universal Pet Care";
        String mailContent = "<p> Hi, " + user.getFirstName() + ", </p>" +
                "<p> Thank you for registering with us, " +
                "Please, follow the link below to complete your registration.</p>" +
                "<a href=\"" + verificationUrl + "\">Verify your email</a>" +
                "<p> Thank you <br> Universal Pet Care Email Verification Service";
        emailService.sendEmail(user.getEmail(), subject, senderName, mailContent);
    }
}
