package com.rentalcar.api.services;

import com.rentalcar.api.dto.MarcaDTO;
import com.rentalcar.api.dto.ModeloDTO;
import com.rentalcar.api.models.Marca;
import com.rentalcar.api.models.Modelo;
import com.rentalcar.api.repositories.MarcaRepository;
import com.rentalcar.api.repositories.ModeloRepository;
import com.rentalcar.api.services.exceptions.DatabaseException;
import com.rentalcar.api.services.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.NoSuchElementException;

@Service
public class MarcaService {

    @Autowired
    private MarcaRepository repository;

    @Autowired
    private ModeloRepository modeloRepository;

    public Page<MarcaDTO> listar(Pageable pageable, String nome) {

        Page<Marca> marcas = repository.findByNomeStartingWithIgnoreCase(pageable, nome);
        Page<MarcaDTO> marcasDTO = marcas.map((m) -> new MarcaDTO(m));
        return marcasDTO;
    }

    public MarcaDTO buscar(Long id) {

        Marca entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Entidade não encontrada!"));
        return new MarcaDTO(entity);

    }

    @Transactional
    public MarcaDTO cadastrar(MarcaDTO dto) {

        Marca entity = new Marca();
        entity.setNome(dto.getNome());
        entity.setDescricao(dto.getDescricao());
        repository.save(entity);
        return new MarcaDTO(entity);
    }

    @Transactional
    public MarcaDTO atualizar(Long id, MarcaDTO dto) {

        Marca entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Entidade não encontrada!"));
        entity.setNome(dto.getNome());
        entity.setDescricao(dto.getDescricao());
        repository.save(entity);
        return new MarcaDTO(entity);
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
