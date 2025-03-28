package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.Appointment;
import com.dailyalcorwork.universal_pet_care.request.AppointmentUpdateRequest;
import com.dailyalcorwork.universal_pet_care.response.ApiResponse;
import com.dailyalcorwork.universal_pet_care.service.appointment.AppointmentService;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    // ------------- GET ALL APPOINTMENTS -------------
    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllAppointments() {
        try {
            List<Appointment> appointments = appointmentService.getAllAppointments();
            return ResponseEntity.status(FOUND).body(new ApiResponse(FeedBackMessage.FOUND, appointments));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // ------------- POST APPOINTMENT -------------
    @PostMapping("/book-appointment")
    public ResponseEntity<ApiResponse> bookAppointment(
            @RequestBody Appointment appointment,
            @RequestParam Long senderId,
            @RequestParam Long recipientId
    ) {
        try {
            Appointment theAppointment = appointmentService.createAppointment(appointment, senderId, recipientId);
            return ResponseEntity.status(FOUND).body(new ApiResponse(FeedBackMessage.SUCCESS, theAppointment));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // ------------- GET APPOINTMENT BY ID -------------
    @GetMapping("/appointment/{id}")
    public ResponseEntity<ApiResponse> getAppointmentById(@PathVariable Long id) {
        // ctrl+alt+t ile try catch vs icine alabiliyoruz
        try {
            Appointment appointment = appointmentService.getAppointmentById(id);
            return ResponseEntity.status(FOUND).body(new ApiResponse(FeedBackMessage.FOUND, appointment));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // ------------- GET APPOINTMENT BY NUMBER -------------
    @GetMapping("/appointment/{appointmentNo}")
    public ResponseEntity<ApiResponse> getAppointmentById(@PathVariable String appointmentNo) {
        // ctrl+alt+t ile try catch vs icine alabiliyoruz
        try {
            Appointment appointment = appointmentService.getAppointmentByNo(appointmentNo);
            return ResponseEntity.status(FOUND).body(new ApiResponse(FeedBackMessage.FOUND, appointment));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // ------------- DELETE APPOINTMENT -------------
    @DeleteMapping("/appointment/{id}/delete")
    public ResponseEntity<ApiResponse> deleteAppointmentById(@PathVariable Long id) {
        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.DELETE_SUCCESS, null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // ------------- UPDATE APPOINTMENT -------------
    @PutMapping("/appointment/{id}/update")
    public ResponseEntity<ApiResponse> updateAppointment(
            @PathVariable("id") Long id,
            @RequestBody AppointmentUpdateRequest request
    ) {
        try {
            Appointment appointment = appointmentService.updateAppointment(id, request);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.UPDATE_SUCCESS, appointment));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(NOT_ACCEPTABLE).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }
}
