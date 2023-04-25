package com.rentalcar.api.integration.controllers;

import com.rentalcar.api.integration.models.Endereco;
import com.rentalcar.api.integration.services.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/endereco")
public class EnderecoController {

	@Autowired
	private EnderecoService service;

	@GetMapping("/{cep}")
	public ResponseEntity<Endereco> buscar(@PathVariable String cep) {

		Endereco endereco = service.buscar(cep);
		return ResponseEntity.ok(endereco);

	}


}