package com.rentalcar.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rentalcar.api.dto.AutomovelDTO;
import com.rentalcar.api.services.AutomovelService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/automoveis")
public class AutomovelController {
	
	@Autowired
	private AutomovelService service;

	@GetMapping
	public ResponseEntity<Page<AutomovelDTO>> listar(Pageable pageable, @RequestParam(defaultValue = "") String modelo) {

		Page<AutomovelDTO> automoveis = service.listar(pageable, modelo);
		return ResponseEntity.ok(automoveis);

	}
	
	@GetMapping("/{id}")
	public ResponseEntity<AutomovelDTO> buscar(@PathVariable Long id) {
		
		AutomovelDTO automovel = service.buscar(id);
		return ResponseEntity.ok(automovel);
	}
	
	@PostMapping
	public ResponseEntity<AutomovelDTO> cadastrar(@Valid  @RequestBody AutomovelDTO automovel) {
		
		AutomovelDTO automovelSave = service.cadastrar(automovel);
		return ResponseEntity.ok(automovelSave);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<AutomovelDTO> deletar(@PathVariable Long id) {
		
			service.deletar(id);
			return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<AutomovelDTO> atualizar(@PathVariable Long id, @Valid @RequestBody AutomovelDTO automovel) {
		
			AutomovelDTO dto = service.atualizar(id, automovel);
			return ResponseEntity.ok(dto);
	}
}
