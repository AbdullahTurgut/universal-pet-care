package com.dailyalcorwork.universal_pet_care.exception;

public class AlreadyExistsException extends RuntimeException {
    public AlreadyExistsException(String alreadyRated) {
        super(alreadyRated);
    }
}
