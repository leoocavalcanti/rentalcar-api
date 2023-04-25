package com.rentalcar.api.controllers.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import com.rentalcar.api.services.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler {

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(NotFoundException e, HttpServletRequest request){
		
		StandardError err = new StandardError();
		
		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.NOT_FOUND.value());
		err.setError("Resource not found");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
		
	}
	
	@ExceptionHandler(InvalidCredentials.class)
	public ResponseEntity<StandardError> invalidCredential(InvalidCredentials e, HttpServletRequest request){
		
		StandardError err = new StandardError();
		
		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.UNAUTHORIZED.value());
		err.setError("Invalid credentials");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
		
	}
	
	@ExceptionHandler(DatabaseException.class)
	public ResponseEntity<StandardError> database(DatabaseException e, HttpServletRequest request){
		
		StandardError err = new StandardError();
		
		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.BAD_REQUEST.value());
		err.setError("Database violation");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
		
	}

	@ExceptionHandler(CreateAccountException.class)
	public ResponseEntity<StandardError> accountError(CreateAccountException e, HttpServletRequest request){

		StandardError err = new StandardError();

		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.BAD_REQUEST.value());
		err.setError("Error creating account");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);

	}


	@ExceptionHandler(IncorrectInputException.class)
	public ResponseEntity<StandardError> entityNotFound(IncorrectInputException e, HttpServletRequest request){

		StandardError err = new StandardError();

		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.BAD_REQUEST.value());
		err.setError("Incorrect input");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);

	}

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<StandardError> apiException(ApiException e, HttpServletRequest request){

		StandardError err = new StandardError();

		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.BAD_REQUEST.value());
		err.setError("Api client error");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);

	}

	@ExceptionHandler(LocationException.class)
	public ResponseEntity<StandardError> location(LocationException e, HttpServletRequest request){

		StandardError err = new StandardError();

		HttpStatus status = HttpStatus.BAD_REQUEST;

		err.setTimestamp(Instant.now());
		err.setStatus(status.value());
		err.setError("Validation Exception");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());
		return ResponseEntity.status(status).body(err);

	}
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ValidationError> validation(MethodArgumentNotValidException e, HttpServletRequest request){

		ValidationError err = new ValidationError();

		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.BAD_REQUEST.value());
		err.setError("Data error");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());


		for(FieldError f: e.getBindingResult().getFieldErrors()){

			err.addError(f.getField(), f.getDefaultMessage());
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);

	}
	@ExceptionHandler(ForbiddenException.class)
	public ResponseEntity<AuthError> forbidden(ForbiddenException e, HttpServletRequest request){

		AuthError err = new AuthError();

		HttpStatus status = HttpStatus.FORBIDDEN;

		err.setErrorDescription(e.getMessage());
		err.setError("Sem autorização para acessar esse recurso");
		return ResponseEntity.status(status).body(err);

	}

	@ExceptionHandler(UnauthorizedException.class)
	public ResponseEntity<AuthError> unauthorized(UnauthorizedException e, HttpServletRequest request){

		AuthError err = new AuthError();

		HttpStatus status = HttpStatus.UNAUTHORIZED;

		err.setErrorDescription(e.getMessage());
		err.setError("Você não está autenticado no sistema para acessar esse recurso");
		return ResponseEntity.status(status).body(err);

	}
}
