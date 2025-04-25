package com.dailyalcorwork.universal_pet_care.utils;

import java.util.Calendar;
import java.util.Date;

public class SystemUtils {
    private static final int EXPIRATION_TIME = 10;

    public static Date getExpirationTime() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE, EXPIRATION_TIME);

        return new Date(calendar.getTime().getTime());
    }
}
