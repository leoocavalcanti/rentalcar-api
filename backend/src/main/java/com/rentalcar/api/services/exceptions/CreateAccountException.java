package com.rentalcar.api.services.exceptions;

public class CreateAccountException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public CreateAccountException(String msg) {
		
		super(msg);
	}
}
