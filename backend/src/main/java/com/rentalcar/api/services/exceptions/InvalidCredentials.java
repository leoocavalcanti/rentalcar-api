package com.rentalcar.api.services.exceptions;

public class InvalidCredentials extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public InvalidCredentials(String mensagem){
		
		super(mensagem);
	}
}
