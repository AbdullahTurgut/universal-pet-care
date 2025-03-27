package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.Appointment;
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
@RequestMapping("/appointments")
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

    // ------------- DELETE APPOINTMENT -------------

}
