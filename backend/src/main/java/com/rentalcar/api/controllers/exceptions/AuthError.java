package com.rentalcar.api.controllers.exceptions;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthError implements Serializable {

	private static final long serialVersionUID = 1L;
	private String error;

	@JsonProperty(value = "error_description")
	private String errorDescription;
	
}
