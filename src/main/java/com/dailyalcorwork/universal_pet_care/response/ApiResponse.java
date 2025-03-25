package com.dailyalcorwork.universal_pet_care.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse {

    // one message and one data
    private String message;
    private Object data;
}
