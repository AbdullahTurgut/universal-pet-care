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


    /*====================== START PET API ==========================================*/

    public static final String PETS = API + "/pets";
    public static final String SAVE_PETS_FOR_APPOINTMENT = "/all";
    public static final String GET_PET_BY_ID = "/{petId}/pet";
    public static final String DELETE_PET_BY_ID = "/{petId}/delete";
    public static final String UPDATE_PET = "/{petId}/update";

    /*====================== END PET API ==========================================*/

    /*====================== START PHOTO API ==========================================*/
    public static final String PHOTOS = API + "/photos";
    public static final String UPLOAD_PHOTO = "/upload";
    public static final String UPDATE_PHOTO = "/{photoId}/update";
    public static final String DELETE_PHOTO = "/{photoId}/user/{userId}/delete";
    public static final String GET_PHOTO_BY_ID = "/{photoId}/get";

    /*====================== END PHOTO API ==========================================*/

    /*====================== START REVIEW API ==========================================*/
    public static final String REVIEWS = API + "/reviews";
    public static final String SUBMIT_REVIEW = "/submit-review";
    public static final String GET_USER_REVIEWS = "/user/{userId}/reviews";
    public static final String UPDATE_REVIEW = "/{reviewId}/update";
    public static final String DELETE_REVIEW = "/{reviewId}/delete";


    /*====================== END REVIEW API ==========================================*/

}

