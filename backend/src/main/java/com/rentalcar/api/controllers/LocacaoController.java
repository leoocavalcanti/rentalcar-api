package com.rentalcar.api.controllers;

import com.rentalcar.api.dto.AutomovelDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.api.dto.LocacaoDTO;
import com.rentalcar.api.services.LocacaoService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/locacoes")
public class LocacaoController {
	
	@Autowired
	private LocacaoService locacaoService;

	@GetMapping
	public ResponseEntity<Page<LocacaoDTO>> listar(Pageable pageable,  @RequestParam(defaultValue = "") String proprietario){
		
		Page<LocacaoDTO> locacoes = locacaoService.listar(pageable, proprietario);
		return ResponseEntity.ok(locacoes);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<LocacaoDTO> buscar(@PathVariable Long id){
		
		
		LocacaoDTO locacao = locacaoService.buscar(id);
		return ResponseEntity.ok(locacao);
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<LocacaoDTO> deletar(@PathVariable Long id){
		
		
		locacaoService.deletar(id);
		return ResponseEntity.noContent().build();
		
	}
	
	@PostMapping
	public ResponseEntity<LocacaoDTO> cadastrar(@Valid  @RequestBody LocacaoDTO locacao){
		
	
		LocacaoDTO locacaoSave = locacaoService.cadastrar(locacao);
		return ResponseEntity.status(HttpStatus.CREATED).body(locacaoSave);
		
	}

	@PostMapping("/resumo")
	public ResponseEntity<LocacaoDTO> resumoValorLocacao(@Valid  @RequestBody LocacaoDTO locacao){


		LocacaoDTO locacaoSave = locacaoService.resumoValorLocacao(locacao);
		return ResponseEntity.status(HttpStatus.CREATED).body(locacaoSave);

	}

	@PostMapping("/devolver/{id}")
	public ResponseEntity<AutomovelDTO> cadastrar(@PathVariable Long id) {

		locacaoService.devolverAutomovelLocacao(id);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/status/{id}")
	public ResponseEntity<LocacaoDTO> atualizarStatus(@PathVariable Long id, @Valid @RequestBody LocacaoDTO locacao){


		LocacaoDTO locacaoDTO = locacaoService.atualizarStatus(id, locacao);
		return ResponseEntity.ok(locacao);

	}
	
	@PutMapping("/{id}")
	public ResponseEntity<LocacaoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody LocacaoDTO locacao){
		
		
		LocacaoDTO locacaoDTO = locacaoService.atualizar(id, locacao);
		return ResponseEntity.ok(locacao);
		
	}
	
	
}
