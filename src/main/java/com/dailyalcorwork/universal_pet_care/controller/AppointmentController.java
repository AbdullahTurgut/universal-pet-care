package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.event.AppointmentApprovedEvent;
import com.dailyalcorwork.universal_pet_care.event.AppointmentBookedEvent;
import com.dailyalcorwork.universal_pet_care.event.AppointmentDeclinedEvent;
import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.Appointment;
import com.dailyalcorwork.universal_pet_care.request.AppointmentUpdateRequest;
import com.dailyalcorwork.universal_pet_care.request.BookAppointmentRequest;
import com.dailyalcorwork.universal_pet_care.response.ApiResponse;
import com.dailyalcorwork.universal_pet_care.service.appointment.AppointmentService;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import com.dailyalcorwork.universal_pet_care.utils.UrlMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(UrlMapping.APPOINTMENT)
public class AppointmentController {
    private final AppointmentService appointmentService;

    private final ApplicationEventPublisher publisher;

    // ------------- GET ALL APPOINTMENTS -------------
    @GetMapping(UrlMapping.GET_ALL_APPOINTMENTS)
    public ResponseEntity<ApiResponse> getAllAppointments() {
        try {
            List<Appointment> appointments = appointmentService.getAllAppointments();
            return ResponseEntity.status(FOUND).body(new ApiResponse(FeedBackMessage.APPOINTMENTS_FOUND, appointments));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }


    // ------------- POST APPOINTMENT -------------
    @PostMapping(UrlMapping.BOOK_APPOINTMENT)
    public ResponseEntity<ApiResponse> bookAppointment(
            @RequestBody BookAppointmentRequest request,
            @RequestParam Long senderId,
            @RequestParam Long recipientId
    ) {
        try {
            Appointment theAppointment = appointmentService.createAppointment(request, senderId, recipientId);
            publisher.publishEvent(new AppointmentBookedEvent(theAppointment));
            return ResponseEntity.status(FOUND).body(new ApiResponse(FeedBackMessage.CREATE_APPOINTMENT_SUCCESS, theAppointment));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // ------------- GET APPOINTMENT BY ID -------------
    @GetMapping(UrlMapping.GET_APPOINTMENT_BY_ID)
    public ResponseEntity<ApiResponse> getAppointmentById(@PathVariable Long id) {
        // ctrl+alt+t ile try catch vs icine alabiliyoruz
        try {
            Appointment appointment = appointmentService.getAppointmentById(id);
            return ResponseEntity.status(FOUND).body(new ApiResponse(FeedBackMessage.APPOINTMENT_FOUND, appointment));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // ------------- GET APPOINTMENT BY NUMBER -------------
    @GetMapping(UrlMapping.GET_APPOINTMENT_BY_NO)
    public ResponseEntity<ApiResponse> getAppointmentByNo(@PathVariable String appointmentNo) {
        // ctrl+alt+t ile try catch vs icine alabiliyoruz
        try {
            Appointment appointment = appointmentService.getAppointmentByNo(appointmentNo);
            return ResponseEntity.status(FOUND).body(new ApiResponse(FeedBackMessage.APPOINTMENT_FOUND, appointment));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // ------------- DELETE APPOINTMENT -------------
    @DeleteMapping(UrlMapping.DELETE_APPOINTMENT_BY_ID)
    public ResponseEntity<ApiResponse> deleteAppointmentById(@PathVariable Long id) {
        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.DELETE_APPOINTMENT_SUCCESS, null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // ------------- UPDATE APPOINTMENT -------------
    @PutMapping(UrlMapping.UPDATE_APPOINTMENT)
    public ResponseEntity<ApiResponse> updateAppointment(
            @PathVariable Long id,
            @RequestBody AppointmentUpdateRequest request
    ) {
        try {
            Appointment appointment = appointmentService.updateAppointment(id, request);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.UPDATE_APPOINTMENT_SUCCESS, appointment));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(NOT_ACCEPTABLE).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }


    // ----------- CANCEL APPOINTMENT -------------------
    @PutMapping(UrlMapping.CANCEL_APPOINTMENT)
    public ResponseEntity<ApiResponse> cancelAppointment(@PathVariable Long appointmentId) {
        try {
            Appointment appointment = appointmentService.cancelAppointment(appointmentId);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.CANCEL_APPOINTMENT_SUCCESS, appointment));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(NOT_ACCEPTABLE).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // ----------- CANCEL APPOINTMENT -------------------
    @PutMapping(UrlMapping.APPROVE_APPOINTMENT)
    public ResponseEntity<ApiResponse> approveAppointment(@PathVariable Long appointmentId) {
        try {
            Appointment appointment = appointmentService.approveAppointment(appointmentId);
            publisher.publishEvent(new AppointmentApprovedEvent(appointment));
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.APPROVE_APPOINTMENT_SUCCESS, appointment));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(NOT_ACCEPTABLE).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PutMapping(UrlMapping.DECLINE_APPOINTMENT)
    public ResponseEntity<ApiResponse> declineAppointment(@PathVariable Long appointmentId) {
        try {
            Appointment appointment = appointmentService.declineAppointment(appointmentId);
            publisher.publishEvent(new AppointmentDeclinedEvent(appointment));
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.DECLINE_APPOINTMENT_SUCCESS, appointment));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping(UrlMapping.COUNT_APPOINTMENTS)
    public long countAppointments() {
        return appointmentService.countAppointments();
    }

    // start controller method for getAppointmentsSummary

    @GetMapping("/summary/appointments-summary")
    public ResponseEntity<ApiResponse> getAppointmentsSummary() {
        try {
            List<Map<String, Object>> summary = appointmentService.getAppointmentsSummary();
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.APPOINTMENT_SUMMARY, summary));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(FeedBackMessage.APPOINTMENT_SUMMARY_ERROR + e.getMessage(), null));
        }
    }
}
