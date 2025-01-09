package com.basketball.league.exception.models;

public class LimitExceededException extends IllegalArgumentException {
    public LimitExceededException(String message) {
        super(message);
    }
}
