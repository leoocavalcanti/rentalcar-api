package com.rentalcar.api.controllers;

import com.rentalcar.api.dto.LocacaoDTO;
import com.rentalcar.api.dto.ModeloDTO;
import com.rentalcar.api.services.ModeloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/modelos")
public class ModeloController {

    @Autowired
    private ModeloService service;

    @GetMapping
    public ResponseEntity<Page<ModeloDTO>> listar(Pageable pageable,  @RequestParam(defaultValue = "") String nome){

        Page<ModeloDTO> entities = service.listar(pageable, nome);
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModeloDTO> buscar(@PathVariable Long id){

        ModeloDTO entity = service.buscar(id);
        return ResponseEntity.ok(entity);
    }

    @PostMapping
    public ResponseEntity<ModeloDTO> cadastrar(@Valid  @RequestBody ModeloDTO dto){

        ModeloDTO entity = service.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModeloDTO> atualizar(@PathVariable Long id, @Valid @RequestBody ModeloDTO dto) {

        ModeloDTO entity = service.atualizar(id, dto);
        return ResponseEntity.ok(entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<LocacaoDTO> deletar(@PathVariable Long id){

        service.deletar(id);
        return ResponseEntity.noContent().build();

    }
}
