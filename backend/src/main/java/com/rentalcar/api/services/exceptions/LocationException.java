package com.rentalcar.api.services.exceptions;

public class LocationException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public LocationException(String msg) {
		
		super(msg);
	}
}
