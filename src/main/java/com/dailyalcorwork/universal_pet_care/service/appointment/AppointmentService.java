package com.dailyalcorwork.universal_pet_care.service.appointment;

import com.dailyalcorwork.universal_pet_care.dto.AppointmentDto;
import com.dailyalcorwork.universal_pet_care.dto.EntityConverter;
import com.dailyalcorwork.universal_pet_care.dto.PetDto;
import com.dailyalcorwork.universal_pet_care.enums.AppointmentStatus;
import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.Appointment;
import com.dailyalcorwork.universal_pet_care.model.Pet;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.repository.AppointmentRepository;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.request.AppointmentUpdateRequest;
import com.dailyalcorwork.universal_pet_care.request.BookAppointmentRequest;
import com.dailyalcorwork.universal_pet_care.service.pet.IPetService;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService implements IAppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final IPetService petService;
    //for converting the appointment list to appointmentDto
    private final EntityConverter<Appointment, AppointmentDto> entityConverter;
    private final EntityConverter<Pet, PetDto> petEntityConverter;
    private final ModelMapper modelMapper;

    @Transactional
    @Override
    public Appointment createAppointment(BookAppointmentRequest request, Long senderId, Long recipientId) {
        Optional<User> sender = userRepository.findById(senderId);
        Optional<User> recipient = userRepository.findById(recipientId);
        if (sender.isPresent() && recipient.isPresent()) {

            Appointment appointment = request.getAppointment();
            List<Pet> pets = request.getPets();
            pets.forEach(pet -> pet.setAppointment(appointment));
            List<Pet> savedPets = petService.savePetForAppointment(pets);
            appointment.setPets(savedPets);

            appointment.addPatient(sender.get());
            appointment.addVeterinarian(recipient.get());
            appointment.setAppointmentNo();
            appointment.setStatus(AppointmentStatus.WAITING_FOR_APPROVAL);
            return appointmentRepository.save(appointment);
        }
        throw new ResourceNotFoundException(FeedBackMessage.SENDER_RECIPIENT_NOT_FOUND);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment updateAppointment(Long id, AppointmentUpdateRequest request) {
        Appointment existingAppointment = getAppointmentById(id); // yazdığım get methodu
        if (!Objects.equals(existingAppointment.getStatus(), AppointmentStatus.WAITING_FOR_APPROVAL)) {
            throw new IllegalStateException(FeedBackMessage.ALREADY_APPROVED);
        }
        existingAppointment.setDate(LocalDate.parse(request.getDate()));
        existingAppointment.setTime(LocalTime.parse(request.getTime()));
        existingAppointment.setReason(request.getReason());
        return appointmentRepository.save(existingAppointment);
    }

    @Override
    public void deleteAppointment(Long id) {
        appointmentRepository.findById(id)
                .ifPresentOrElse(appointmentRepository::delete, () -> {
                    throw new ResourceNotFoundException(FeedBackMessage.RESOURCE_NOT_FOUND);
                });
    }

    @Override
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(FeedBackMessage.RESOURCE_NOT_FOUND));
    }

    @Override
    public Appointment getAppointmentByNo(String appointmentNo) {
        return appointmentRepository.findByAppointmentNo(appointmentNo);
    }

    @Override
    public List<AppointmentDto> getUserAppointments(Long userId) {
        List<Appointment> appointments = appointmentRepository.findAllByUserId(userId);
        return appointments
                .stream()
                .map(appointment -> {
                    AppointmentDto appointmentDto = entityConverter.mapEntityToDto(appointment, AppointmentDto.class);
                    List<PetDto> petDto = appointment.getPets()
                            .stream()
                            .map(pet -> petEntityConverter.mapEntityToDto(pet, PetDto.class)).toList();
                    appointmentDto.setPets(petDto);
                    return appointmentDto;
                }).toList();
        // modelMapper ile asagidaki gibi yapilabilir
//                .map((element) -> modelMapper.map(element, AppointmentDto.class))
//                .toList();
    }

    // THE CANCELLING OF THE APPOINTMENT
    @Override
    public Appointment cancelAppointment(Long appointmentId) {
        return appointmentRepository.findById(appointmentId)
                .filter(appointment -> appointment.getStatus().equals(AppointmentStatus.WAITING_FOR_APPROVAL))
                .map(appointment -> {
                    appointment.setStatus(AppointmentStatus.CANCELLED);
                    return appointmentRepository.saveAndFlush(appointment);
                }).orElseThrow(() -> new IllegalStateException(FeedBackMessage.APPOINTMENT_CANNOT_BE_CANCELLED));
    }

    // THE APPROVal OF THE APPOINTMENT
    @Override
    public Appointment approveAppointment(Long appointmentId) {
        return appointmentRepository.findById(appointmentId)
                .filter(appointment -> appointment.getStatus().equals(AppointmentStatus.WAITING_FOR_APPROVAL))
                .map(appointment -> {
                    appointment.setStatus(AppointmentStatus.APPROVED);
                    return appointmentRepository.saveAndFlush(appointment);
                }).orElseThrow(() -> new IllegalStateException(FeedBackMessage.OPERATION_NOT_ALLOWED));
    }

    // THE DECLINE OF THE APPOINTMENT
    @Override
    public Appointment declineAppointment(Long appointmentId) {
        return appointmentRepository.findById(appointmentId)
                .filter(appointment -> appointment.getStatus().equals(AppointmentStatus.WAITING_FOR_APPROVAL))
                .map(appointment -> {
                    appointment.setStatus(AppointmentStatus.NOT_APPROVED);
                    return appointmentRepository.saveAndFlush(appointment);
                }).orElseThrow(() -> new IllegalStateException(FeedBackMessage.OPERATION_NOT_ALLOWED));
    }

    @Override
    public long countAppointments() {
        return appointmentRepository.count();
    }


    // start of getAppointmentsSummary function to frontend
    @Override
    public List<Map<String, Object>> getAppointmentsSummary() {
        return getAllAppointments()
                .stream()
                .collect(Collectors.groupingBy(Appointment::getStatus, Collectors.counting()))
                .entrySet()
                .stream()
                .filter(entry -> entry.getValue() > 0)
                .map(entry -> createStatusSummaryMap(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private Map<String, Object> createStatusSummaryMap(AppointmentStatus status, Long value) {
        Map<String, Object> summaryMap = new HashMap<>();
        summaryMap.put("name", formatAppointmentStatus(status));
        summaryMap.put("value", value);
        return summaryMap;
    }


    private String formatAppointmentStatus(AppointmentStatus appointmentStatus) {
        return appointmentStatus.toString().replace("_", "-").toLowerCase(Locale.ENGLISH);
    }

    @Override
    public List<Long> getAppointmentIds() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.stream()
                .map(Appointment::getId)
                .collect(Collectors.toList());
    }

    @Override
    public void setAppointmentStatus(Long appointmentId) {
        Appointment appointment = getAppointmentById(appointmentId);
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        LocalTime appointmentEndTime = appointment.getTime()
                .plusMinutes(2).truncatedTo(ChronoUnit.MINUTES);

        switch (appointment.getStatus()) {
            case APPROVED:
                if (currentDate.isBefore(appointment.getDate()) ||
                        (currentDate.equals(appointment.getDate()) && currentTime.isBefore(appointment.getTime()))) {
                    appointment.setStatus(AppointmentStatus.UP_COMING);
                    // if already up_coming no change needed.
                }
                break;
            case UP_COMING:
                if (currentDate.equals(appointment.getDate()) &&
                        currentTime.isAfter(appointment.getTime()) && !currentTime.isAfter(appointmentEndTime)) {
                    // Changed to include the end time as part of ON_GOING status
                    appointment.setStatus(AppointmentStatus.ON_GOING);
                }
                break;
            case ON_GOING:
                if (currentDate.isAfter(appointment.getDate()) ||
                        (currentDate.equals(appointment.getDate()) && !currentTime.isBefore(appointmentEndTime))) {
                    // changed to mark as completed when current time is not before the end time
                    appointment.setStatus(AppointmentStatus.COMPLETED);
                }
                break;
            case WAITING_FOR_APPROVAL:
                if (currentDate.isAfter(appointment.getDate()) ||
                        (currentDate.equals(appointment.getDate()) && currentTime.isAfter(appointment.getTime()))) {
                    // adjusted to change status to not-approved if current time is past the appointment time
                    appointment.setStatus(AppointmentStatus.NOT_APPROVED);
                }
                break;
        }
        appointmentRepository.save(appointment);
    }
    // end of getAppointmentsSummary function to frontend
}
