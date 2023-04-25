package com.rentalcar.api.services;

import java.util.NoSuchElementException;
import java.util.Optional;

import com.rentalcar.api.models.Marca;
import com.rentalcar.api.models.Modelo;
import com.rentalcar.api.models.enums.AutomovelStatus;
import com.rentalcar.api.repositories.MarcaRepository;
import com.rentalcar.api.repositories.ModeloRepository;
import com.rentalcar.api.services.exceptions.IncorrectInputException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentalcar.api.dto.AutomovelDTO;
import com.rentalcar.api.models.Automovel;
import com.rentalcar.api.repositories.AutomovelRepository;
import com.rentalcar.api.services.exceptions.DatabaseException;
import com.rentalcar.api.services.exceptions.NotFoundException;

import javax.persistence.EntityNotFoundException;


@Service
public class AutomovelService {

	@Autowired
	private TaxaDiariaService taxaDiariaService;

	@Autowired
	private MarcaRepository marcaRepository;

	@Autowired
	private ModeloRepository modeloRepository;

	@Autowired
	private AutomovelRepository repository;
	@Transactional(readOnly = true)
	public Page<AutomovelDTO> listar(Pageable pageable, String modelo){

		Page<Automovel> automoveis = repository.findByModeloStartingWith(pageable, modelo);
		Page<AutomovelDTO> automoveisDTO = automoveis.map((l) -> new AutomovelDTO(l));
		return automoveisDTO;
	}

	public AutomovelDTO buscar(Long id) {
		
		Optional<Automovel> automovel = repository.findById(id);
		Automovel entity = automovel.orElseThrow(() -> new NotFoundException("Entidade não encontrada"));
		AutomovelDTO automovelDTO = new AutomovelDTO(entity);
		return automovelDTO;
	}

	@Transactional
	public AutomovelDTO cadastrar(AutomovelDTO automovel) {

		if(!(automovel.getPlaca().matches("[A-Z]{3}[0-9][0-9A-Z][0-9]{2}"))){

				throw new IncorrectInputException("O modelo de placa informado não está nos padrões do Mercosul ou do Brasil.");
		}

		try {

			Automovel automovelSave = new Automovel();

			//copia de objetos para o dto
			Modelo modelo = modeloRepository.findById(automovel.getModelo().getId()).orElseThrow(() -> new EntityNotFoundException("Marca não existente"));
			Marca marca = marcaRepository.findById(modelo.getMarca().getId()).orElseThrow(() -> new EntityNotFoundException("Modelo não existente"));
			automovelSave.setModelo(modelo);
			automovelSave.getModelo().setMarca(marca);
			automovelSave.setValorAutomovel(automovel.getValorAutomovel());
			automovelSave.setPlaca(automovel.getPlaca());
			Double diariaComTaxas = taxaDiariaService.calcularDiaria(automovelSave);
			automovelSave.setDiaria(diariaComTaxas);
			automovelSave.setStatus(AutomovelStatus.DISPONIVEL);
			automovelSave = repository.save(automovelSave);
			AutomovelDTO automovelDTO = new AutomovelDTO(automovelSave);
			return automovelDTO;
		}
		catch(DataIntegrityViolationException e){

			throw new DatabaseException("Automóveis com informações duplicadas no banco de dados não são permitidas!");
		}
	}
	
	public void deletar(Long id) {
		
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
	
	@Transactional
	public AutomovelDTO atualizar(Long id, AutomovelDTO dto) {

		if(!(dto.getPlaca().matches("[A-Z]{3}[0-9][0-9A-Z][0-9]{2}"))){

			throw new IncorrectInputException("O modelo de placa informado não está nos padrões do Mercosul ou do Brasil.");
		}
		
		Optional<Automovel> automovel = repository.findById(id);
		Automovel entity = automovel.orElseThrow(() -> new NotFoundException("Entidade não encontrada"));

		entity.setStatus(dto.getStatus());
		entity.setValorAutomovel(dto.getValorAutomovel());
		entity.setDiaria(dto.getDiaria());
		entity.setModelo(dto.getModelo());
		entity.setPlaca(dto.getPlaca());

		repository.save(entity);
		return new AutomovelDTO(entity);
		
	}



}
