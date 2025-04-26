package com.dailyalcorwork.universal_pet_care.event;

import com.dailyalcorwork.universal_pet_care.model.Appointment;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class AppointmentApprovedEvent extends ApplicationEvent {
    private final Appointment appointment;

    public AppointmentApprovedEvent(Appointment appointment) {
        super(appointment);
        this.appointment = appointment;
    }
}
