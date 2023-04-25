package com.rentalcar.api.integration.controllers;

import com.rentalcar.api.integration.models.Feriado;
import com.rentalcar.api.integration.services.FeriadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/feriados")
public class FeriadoController {

	@Autowired
	private FeriadoService service;

	@GetMapping("/{ano}")
	public ResponseEntity<List<Feriado>> listar(@PathVariable String ano) {

		List<Feriado> feriados = service.listar(ano);
		return ResponseEntity.ok(feriados);

	}

}
