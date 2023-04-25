package com.rentalcar.api.services;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

import com.rentalcar.api.models.enums.AutomovelStatus;
import com.rentalcar.api.models.enums.LocacaoStatus;
import com.rentalcar.api.services.exceptions.IncorrectInputException;
import com.rentalcar.api.services.exceptions.LocationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentalcar.api.dto.LocacaoDTO;
import com.rentalcar.api.models.Automovel;
import com.rentalcar.api.models.Locacao;
import com.rentalcar.api.models.Usuario;
import com.rentalcar.api.repositories.AutomovelRepository;
import com.rentalcar.api.repositories.LocacaoRepository;
import com.rentalcar.api.repositories.UsuarioRepository;
import com.rentalcar.api.services.exceptions.DatabaseException;
import com.rentalcar.api.services.exceptions.NotFoundException;

@Service
public class LocacaoService {
	
	@Autowired
	private LocacaoRepository repository;

	@Autowired
	private TaxaLocacaoService taxaLocacaoService;

	@Autowired 
	private AutomovelRepository automovelRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private AuthService authService;
	
	public Page<LocacaoDTO> listar(Pageable pageable, String proprietario){

		authService.isAdmin();
		
		Page<Locacao> locacoes = repository.findByProprietarioStartingWithIgnoreCase(pageable, proprietario);
		Page<LocacaoDTO> locacoesDTO = locacoes.map((l) -> new LocacaoDTO(l));
		return locacoesDTO;
	}
	
	public LocacaoDTO buscar(Long id){

		authService.isLocationBelongUser(id);
			
		Optional<Locacao> locacao = repository.findById(id);
		Locacao locado = locacao.orElseThrow(() -> new NotFoundException("Entidade não encontrada!"));
		LocacaoDTO locacaoDTO = new LocacaoDTO(locado);
		return locacaoDTO;
	}
	
	@Transactional
	public void deletar(Long id){

		authService.isLocationBelongUser(id);
		
		try {

			Optional<Locacao> locacaoOptional = repository.findById(id);
			Locacao locacao = locacaoOptional.get();
			locacao.getAutomovel().setStatus(AutomovelStatus.DISPONIVEL);
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
	public LocacaoDTO resumoValorLocacao(LocacaoDTO locacao){

		authService.validateselfOrAdmin(locacao.getUsuarioId());

		//PROCURANDO SE O AUTOMÓVEL EXISTE E PEGANDO O VALOR DA SUA DIÁRIA
		Automovel automovel = automovelRepository.findById(locacao.getAutomovel().getId()).orElseThrow(() -> new NotFoundException("Entity not found"));

		Double valorLocacao = calcularLocacao(automovel, locacao);
		Double taxasLocacao = taxaLocacaoService.calcularTaxasLocacao(locacao.getDataLocacao(), locacao.getAutomovel().getId());

		valorLocacao *= taxasLocacao;

		//PEGANDO USUÁRIO
		Usuario usuario = usuarioRepository.findById(locacao.getUsuarioId()).orElseThrow(() -> new NotFoundException("Entity not found"));

		//ATRIBUIÇÃO DO VALOR DA LOCAÇÃO E CÓPIA DO OBJETO
		Locacao novaLocacao = new Locacao();
		novaLocacao.setDataLocacao(locacao.getDataLocacao());
		novaLocacao.setDataDevolucao(locacao.getDataDevolucao());
		novaLocacao.setValor(valorLocacao == 0 ? automovel.getDiaria() : valorLocacao);
		novaLocacao.setAutomovel(automovel);
		novaLocacao.setUsuario(usuario);
		novaLocacao.setProprietario(usuario.getNome());

		//RETORNANDO
		LocacaoDTO locacaoDTO = new LocacaoDTO(novaLocacao);
		return locacaoDTO;

	}
	
	@Transactional
	public LocacaoDTO cadastrar(LocacaoDTO locacao){

		authService.validateselfOrAdmin(locacao.getUsuarioId());
	
		//PROCURANDO SE O AUTOMÓVEL EXISTE E PEGANDO O VALOR DA SUA DIÁRIA
		Optional<Automovel> entity = automovelRepository.findById(locacao.getAutomovel().getId());
		Automovel automovel = entity.orElseThrow(() -> new NotFoundException("Entity not found"));

		Double valorLocacao = calcularLocacao(automovel, locacao);
		Double taxasLocacao = taxaLocacaoService.calcularTaxasLocacao(locacao.getDataLocacao(), locacao.getAutomovel().getId());

		valorLocacao *= taxasLocacao;

		//PEGANDO USUÁRIO
		Optional<Usuario> entityUser = usuarioRepository.findById(locacao.getUsuarioId());
		Usuario usuario = entityUser.orElseThrow(() -> new NotFoundException("Entity not found"));
		
		//ATRIBUIÇÃO DO VALOR DA LOCAÇÃO E CÓPIA DO OBJETO
		Locacao novaLocacao = new Locacao();

		LocalDate dataAtual = LocalDate.now();

		if(locacao.getDataLocacao().isBefore(dataAtual) || locacao.getDataDevolucao().isBefore(dataAtual)){

			throw new IncorrectInputException("As datas precisam ser presentes ou futuras!");
		}

		novaLocacao.setDataLocacao(locacao.getDataLocacao());
		novaLocacao.setDataDevolucao(locacao.getDataDevolucao());
		novaLocacao.setValor(valorLocacao == 0 ? automovel.getDiaria() : valorLocacao);
		novaLocacao.setAutomovel(automovel);
		novaLocacao.setUsuario(usuario);
		novaLocacao.setProprietario(usuario.getNome());
		novaLocacao.getAutomovel().setStatus(AutomovelStatus.INDISPONIVEL);
		novaLocacao.setStatus(LocacaoStatus.PENDENTE);
		
		//SALVANDO
		repository.save(novaLocacao);

		LocacaoDTO locacaoDTO = new LocacaoDTO(novaLocacao);
		return locacaoDTO;
		
	}

	public Double calcularLocacao(Automovel automovel, LocacaoDTO locacao){

		Long dias = ChronoUnit.DAYS.between(locacao.getDataLocacao(), locacao.getDataDevolucao());

		//CHECANDO SE O AUTOMÓVEL ESTÁ DISPONÍVEL
		if(automovel.getStatus().equals(AutomovelStatus.INDISPONIVEL)){

			throw new LocationException("Apenas carros disponíveis podem ser alugados");
		}

		Double diaria = automovel.getDiaria();

		//CÁLCULO DE DIÁRIA NO ATO DO CADASTRO DA LOCAÇÃO
		Double valorLocacao = (dias * diaria);

		if(valorLocacao < 0) throw new DatabaseException("Informe datas válidas");

		return valorLocacao;

	}
	
	@Transactional
	public LocacaoDTO atualizar(Long id, LocacaoDTO dto) {
		
		Optional<Locacao> locacao = repository.findById(id);
		Locacao entity = locacao.orElseThrow(() -> new NotFoundException("Entidade não encontrada"));
		
		entity.setDataDevolucao(dto.getDataDevolucao());
		entity.setAutomovel(dto.getAutomovel());
		entity.setDataLocacao(dto.getDataLocacao());
		entity.setValor(dto.getValor());
		entity.setStatus(dto.getStatus());

		Automovel automovel = automovelRepository.findById(dto.getAutomovel().getId()).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));

		if (Objects.requireNonNull(dto.getStatus()) == LocacaoStatus.ATIVO || Objects.requireNonNull(dto.getStatus()) == LocacaoStatus.PENDENTE) {
			automovel.setStatus(AutomovelStatus.INDISPONIVEL);
		}

		else automovel.setStatus(AutomovelStatus.DISPONIVEL);

		repository.save(entity);
		automovelRepository.save(automovel);
		return new LocacaoDTO(entity);
		
	}

	@Transactional
	public LocacaoDTO atualizarStatus(Long id, LocacaoDTO dto) {

		Locacao entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));

		entity.setStatus(dto.getStatus());

		Automovel automovel = automovelRepository.findById(dto.getAutomovel().getId()).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));

		if (Objects.requireNonNull(dto.getStatus()) == LocacaoStatus.ATIVO || Objects.requireNonNull(dto.getStatus()) == LocacaoStatus.PENDENTE) {
			automovel.setStatus(AutomovelStatus.INDISPONIVEL);
		}

		else automovel.setStatus(AutomovelStatus.DISPONIVEL);

		repository.save(entity);
		automovelRepository.save(automovel);
		return new LocacaoDTO(entity);

	}

	@Transactional
	public void devolverAutomovelLocacao(Long id){

		authService.isLocationBelongUser(id);

		Locacao locacao = repository.findById(id).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));

		if(locacao.getAutomovel().getStatus().equals(AutomovelStatus.INDISPONIVEL)){

			locacao.getAutomovel().setStatus(AutomovelStatus.DISPONIVEL);
		}

		locacao.setStatus(LocacaoStatus.DEVOLVIDO);
		repository.save(locacao);

	}
	
		
}

