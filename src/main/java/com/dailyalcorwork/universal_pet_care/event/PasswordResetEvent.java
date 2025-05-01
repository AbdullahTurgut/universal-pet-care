package com.dailyalcorwork.universal_pet_care.event;

import com.dailyalcorwork.universal_pet_care.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class PasswordResetEvent extends ApplicationEvent {
    private final User user;

    public PasswordResetEvent(Object source, User user) {
        super(source);
        this.user = user;
    }
}
