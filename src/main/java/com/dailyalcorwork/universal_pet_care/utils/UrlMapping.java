package com.dailyalcorwork.universal_pet_care.utils;

public class UrlMapping {
    public static final String API = "/api/v1";
    public static final String USERS = API + "/users";
    public static final String REGISTER_USER = "/register";
    public static final String UPDATE_USER = "/update_user/{userId}";
    public static final String GET_USER_BY_ID = "/user/{userId}";
    public static final String DELETE_USER_BY_ID = "/delete/{userId}";
    public static final String GET_ALL_USERS = "/all-users";

    /*======================= START APPOINTMENT API =================================*/
    public static final String APPOINTMENT = API + "/appointments";
    public static final String BOOK_APPOINTMENT = "/book-appointment";
    public static final String GET_APPOINTMENT_BY_ID = "/{id}/appointment";
    public static final String GET_APPOINTMENT_BY_NO = "/{id}/appointmentNo";
    public static final String GET_ALL_APPOINTMENTS = "/all";
    public static final String UPDATE_APPOINTMENT = "/{id}/update";
    public static final String DELETE_APPOINTMENT_BY_ID = "/{id}/delete";
    /*======================= END APPOINTMENT API =================================*/

}
