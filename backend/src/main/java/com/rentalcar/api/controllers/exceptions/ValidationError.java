package com.rentalcar.api.controllers.exceptions;

import lombok.Data;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;

@Data
public class ValidationError extends StandardError{
    private static final long serialVersionUID = 1L;
    List<FieldMessage> errors = new ArrayList<>();

    public void addError(String fieldName, String message){

        errors.add(new FieldMessage(fieldName, message));
    }
}
