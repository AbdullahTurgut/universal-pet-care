package com.dailyalcorwork.universal_pet_care.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentUpdateRequest {
    private String date;
    private String time;
    private String reason;
}
