package com.rentalcar.api.services.exceptions;

public class UnauthorizedException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public UnauthorizedException(String mensagem){
		
		super(mensagem);
	}
}
