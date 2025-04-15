package com.dailyalcorwork.universal_pet_care.request;

import lombok.Data;

@Data
public class ChangePasswordRequest {

    // frontend de oluşturduğumuz promplar
    private String currentPassword;
    private String newPassword;
    private String confirmNewPassword;
}
