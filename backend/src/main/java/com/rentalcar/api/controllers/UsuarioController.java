package com.rentalcar.api.controllers;

import com.rentalcar.api.dto.UsuarioInsertDTO;
import com.rentalcar.api.dto.UsuarioUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rentalcar.api.dto.UsuarioDTO;
import com.rentalcar.api.services.UsuarioService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/usuarios")
public class UsuarioController {
	
	@Autowired
	private UsuarioService service;


	@GetMapping
	public ResponseEntity<Page<UsuarioDTO>> listar(Pageable pageable, @RequestParam(defaultValue = "") String nome){

			Page<UsuarioDTO> usuarios = service.listar(pageable, nome);
			return ResponseEntity.ok(usuarios);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<UsuarioDTO> buscar(@PathVariable Long id){
		
		UsuarioDTO usuario = service.buscar(id);
		return ResponseEntity.ok(usuario);
	}

	@PostMapping(value = "/cadastrar")
	public ResponseEntity<UsuarioDTO> cadastrar(@Valid  @RequestBody UsuarioInsertDTO usuario){

		UsuarioDTO usuarioSave = service.cadastrar(usuario);
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSave);

	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<UsuarioDTO> deletar(@PathVariable Long id){

		service.deletar(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<UsuarioDTO> atualizar(@PathVariable Long id, @Valid  @RequestBody UsuarioUpdateDTO dto){
		
		UsuarioDTO usuario = service.atualizar(id, dto);
		return ResponseEntity.ok(usuario);
	}

	@PutMapping(value = "/admin/{id}")
	public ResponseEntity<UsuarioDTO> setAdmin(@PathVariable Long id){

		UsuarioDTO usuario = service.setAdmin(id);
		return ResponseEntity.ok(usuario);
	}

	

}
