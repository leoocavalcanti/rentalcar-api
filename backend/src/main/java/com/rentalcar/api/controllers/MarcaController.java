package com.rentalcar.api.controllers;

import com.rentalcar.api.dto.LocacaoDTO;
import com.rentalcar.api.dto.MarcaDTO;
import com.rentalcar.api.services.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/marcas")
public class MarcaController {
    @Autowired
    private MarcaService service;

    @GetMapping
    public ResponseEntity<Page<MarcaDTO>> listar(Pageable pageable,  @RequestParam(defaultValue = "") String nome){

        Page<MarcaDTO> entities = service.listar(pageable, nome);
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarcaDTO> buscar(@PathVariable Long id){

        MarcaDTO entity = service.buscar(id);
        return ResponseEntity.ok(entity);
    }

    @PostMapping
    public ResponseEntity<MarcaDTO> cadastrar(@Valid  @RequestBody MarcaDTO dto){

        MarcaDTO entity = service.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MarcaDTO> atualizar(@PathVariable Long id, @Valid @RequestBody MarcaDTO dto) {

        MarcaDTO entity = service.atualizar(id, dto);
        return ResponseEntity.ok(entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<LocacaoDTO> deletar(@PathVariable Long id){

        service.deletar(id);
        return ResponseEntity.noContent().build();

    }
}
