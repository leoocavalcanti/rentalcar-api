package com.rentalcar.api.services.exceptions;

public class ApiException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ApiException(String msg) {
		
		super(msg);
	}
}
