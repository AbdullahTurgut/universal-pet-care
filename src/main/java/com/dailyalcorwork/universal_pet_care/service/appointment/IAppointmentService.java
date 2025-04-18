package com.dailyalcorwork.universal_pet_care.service.appointment;

import com.dailyalcorwork.universal_pet_care.dto.AppointmentDto;
import com.dailyalcorwork.universal_pet_care.model.Appointment;
import com.dailyalcorwork.universal_pet_care.request.AppointmentUpdateRequest;
import com.dailyalcorwork.universal_pet_care.request.BookAppointmentRequest;

import java.util.List;

public interface IAppointmentService {

    Appointment createAppointment(BookAppointmentRequest request, Long sender, Long recipient);

    List<Appointment> getAllAppointments();

    Appointment updateAppointment(Long id, AppointmentUpdateRequest request);

    void deleteAppointment(Long id);

    Appointment getAppointmentById(Long id);

    Appointment getAppointmentByNo(String appointmentNo);

    List<AppointmentDto> getUserAppointments(Long userId);

    // THE CANCELLING OF THE APPOINTMENT
    Appointment cancelAppointment(Long appointmentId);

    // THE APPROVE OF THE APPOINTMENT
    Appointment approveAppointment(Long appointmentId);

    Appointment declineAppointment(Long appointmentId);
}
