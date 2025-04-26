package com.dailyalcorwork.universal_pet_care.event.listener;

import com.dailyalcorwork.universal_pet_care.email.EmailService;
import com.dailyalcorwork.universal_pet_care.event.AppointmentApprovedEvent;
import com.dailyalcorwork.universal_pet_care.event.AppointmentBookedEvent;
import com.dailyalcorwork.universal_pet_care.event.AppointmentDeclinedEvent;
import com.dailyalcorwork.universal_pet_care.event.RegistrationCompleteEvent;
import com.dailyalcorwork.universal_pet_care.model.Appointment;
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

        switch (source.getClass().getSimpleName()) {
            case "RegistrationCompleteEvent":
                if (source instanceof User) {
                    RegistrationCompleteEvent registrationCompleteEvent = (RegistrationCompleteEvent) event;
                    handleSendRegistrationVerificationEmail(registrationCompleteEvent);
                }
                break;
            case "AppointmentBookedEvent":
                if (source instanceof Appointment) {
                    AppointmentBookedEvent appointmentBookedEvent = (AppointmentBookedEvent) event;
                    try {
                        handleAppointmentBookedNotification(appointmentBookedEvent);
                    } catch (MessagingException | UnsupportedEncodingException e) {
                        throw new RuntimeException(e);
                    }
                }
                break;
            case "AppointmentApprovedEvent":
                if (source instanceof Appointment) {
                    AppointmentApprovedEvent appointmentApprovedEvent = (AppointmentApprovedEvent) event;
                    try {
                        handleAppointmentApprovedNotification(appointmentApprovedEvent);
                    } catch (MessagingException | UnsupportedEncodingException e) {
                        throw new RuntimeException(e);
                    }
                }
                break;
            case "AppointmentDeclinedEvent":
                if (source instanceof Appointment) {
                    AppointmentDeclinedEvent appointmentDeclinedEvent = (AppointmentDeclinedEvent) event;
                    try {
                        handleAppointmentDeclinedNotification(appointmentDeclinedEvent);
                    } catch (MessagingException | UnsupportedEncodingException e) {
                        throw new RuntimeException(e);
                    }
                }
                break;
            default:
                break;
        }
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
    /* ========== End user registration email verification ============*/

    /* ========== START new appointment booked notifications ============*/

    private void handleAppointmentBookedNotification(AppointmentBookedEvent event) throws MessagingException, UnsupportedEncodingException {
        Appointment appointment = event.getAppointment();
        User veterinary = appointment.getVeterinarian();
        sendAppointmentBookedNotification(veterinary, frontendBaseUrl);
    }

    private void sendAppointmentBookedNotification(User veterinary, String frontendBaseUrl) throws MessagingException, UnsupportedEncodingException {
        String subject = "New Appointment Notification";
        String senderName = "Universal Pet Care";
        String mailContent = "<p> Hi, " + veterinary.getFirstName() + ", </p>" +
                "<p> You have a new appointment schedule: " +
                "<a href=\"" + frontendBaseUrl + "\">Please, check the clinic portal to view appointment details.</a>" +
                "<p> Best Regards. <br /> Universal Pet Care Service";
        emailService.sendEmail(veterinary.getEmail(), subject, senderName, mailContent);
    }

    /* ========== End new appointment booked notifications ============*/

    /* ========== START approve appointment notifications ============*/

    private void handleAppointmentApprovedNotification(AppointmentApprovedEvent event) throws MessagingException, UnsupportedEncodingException {
        Appointment appointment = event.getAppointment();
        User patient = appointment.getPatient();
        sendAppointmentBookedNotification(patient, frontendBaseUrl);
    }

    private void sendAppointmentApprovedNotification(User user, String frontendBaseUrl) throws MessagingException, UnsupportedEncodingException {
        String subject = "Appointment Approved";
        String senderName = "Universal Pet Care Notification Service";
        String mailContent = "<p> Hi, " + user.getFirstName() + ", </p>" +
                "<p> Your appointment has been approved " +
                "<a href=\"" + frontendBaseUrl + "\">Please, check the clinic portal to view appointment details.</a>" +
                "and veterinarian information.</a><br/>" +
                "<p> Best Regards. <br> Universal Pet Care";
        emailService.sendEmail(user.getEmail(), subject, senderName, mailContent);
    }

    /* ========== End approve appointment notifications ============*/

    /* ========== START appointment decline notifications ============*/

    private void handleAppointmentDeclinedNotification(AppointmentDeclinedEvent event) throws MessagingException, UnsupportedEncodingException {
        Appointment appointment = event.getAppointment();
        User patient = appointment.getPatient();
        sendAppointmentBookedNotification(patient, frontendBaseUrl);
    }

    private void sendAppointmentDeclinedNotification(User user, String frontendBaseUrl) throws MessagingException, UnsupportedEncodingException {
        String subject = "Appointment Not Approved";
        String senderName = "Universal Pet Care Notification Service";
        String mailContent = "<p> Hi, " + user.getFirstName() + ", </p>" +
                "<p> We are sorry, your appointment was not approved at this time,<br/> " +
                "Please kindly make a reschedule for another date. Thanks </p> " +
                "<a href=\"" + frontendBaseUrl + "\">Please, check the clinic portal to view appointment details.</a> <br/>" +
                "<p> Best Regards. <br /> Universal Pet Care";
        emailService.sendEmail(user.getEmail(), subject, senderName, mailContent);
    }

    /* ========== End appointment decline notifications ============*/
}
