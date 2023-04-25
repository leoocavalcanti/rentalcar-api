package com.rentalcar.api.services;

import com.rentalcar.api.dto.ModeloDTO;
import com.rentalcar.api.models.Modelo;
import com.rentalcar.api.repositories.ModeloRepository;
import com.rentalcar.api.services.exceptions.DatabaseException;
import com.rentalcar.api.services.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
public class ModeloService {
    @Autowired
    private ModeloRepository repository;

    public Page<ModeloDTO> listar(Pageable pageable, String nome) {

        Page<Modelo> modelos = repository.findByNomeStartingWithIgnoreCase(pageable, nome);
        Page<ModeloDTO> modelosDTO = modelos.map((m) -> new ModeloDTO(m));
        return modelosDTO;
    }

    public ModeloDTO buscar(Long id) {

        Modelo entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Entidade não encontrada!"));
        return new ModeloDTO(entity);

    }

    @Transactional
    public ModeloDTO cadastrar(ModeloDTO dto) {

        try{
            Modelo entity = new Modelo();
            BeanUtils.copyProperties(dto, entity);
            entity.setMarca(dto.getMarca());
            repository.save(entity);
            return new ModeloDTO(entity);
        }
        catch(DataIntegrityViolationException e){

            throw new DatabaseException("Modelo já cadastrado!");
        }
    }

    @Transactional
    public ModeloDTO atualizar(Long id, ModeloDTO dto) {

        Modelo entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Entidade não encontrada!"));
        entity.setNome(dto.getNome());
        entity.setDescricao(dto.getDescricao());
        entity.setCambio(dto.getCambio());
        entity.setCategoria(dto.getCategoria());
        entity.setAno(dto.getAno());
        entity.setImagem(dto.getImagem());
        entity.setMarca(entity.getMarca());
        repository.save(entity);
        return new ModeloDTO(entity);
    }

    @Transactional
    public void deletar(Long id){

        try {

            repository.deleteById(id);
        }

        catch(EmptyResultDataAccessException e) {

            throw new NotFoundException("ID not found: "+ id);
        }

        catch(DataIntegrityViolationException e) {

            throw new DatabaseException("Integrity violation");
        }

        catch(NoSuchElementException e) {

            throw new NotFoundException("ID not found: "+ id);
        }
    }
}
