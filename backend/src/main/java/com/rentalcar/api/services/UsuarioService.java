package com.rentalcar.api.services;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import com.rentalcar.api.dto.*;
import com.rentalcar.api.integration.models.Endereco;
import com.rentalcar.api.integration.services.EnderecoService;
import com.rentalcar.api.models.Role;
import com.rentalcar.api.repositories.RoleRepository;
import com.rentalcar.api.services.exceptions.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentalcar.api.models.Usuario;
import com.rentalcar.api.repositories.UsuarioRepository;

@Service
public class UsuarioService implements UserDetailsService {

	private static Logger logger = LoggerFactory.getLogger(UsuarioService.class);
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private AuthService authService;

	@Autowired
	private EnderecoService enderecoService;

	@Autowired
	private UsuarioRepository repository;

	@Autowired
	private RoleRepository roleRepository;
	
	public Page<UsuarioDTO> listar(Pageable pageable, String nome) {

		authService.isAdmin();

		Page<Usuario> usuarios = repository.findByNomeStartingWithIgnoreCase(pageable, nome);
		Page<UsuarioDTO> usuariosDTO = usuarios.map((u) -> new UsuarioDTO(u));
		return usuariosDTO;
	}

	public UsuarioDTO buscar(Long id) {

		authService.validateselfOrAdmin(id);

		Optional<Usuario> entity = repository.findById(id);
		Usuario usuario = entity.orElseThrow(() -> new NotFoundException("Entidade não encontrada!"));
		UsuarioDTO usuarioDTO = new UsuarioDTO(usuario);
		usuarioDTO.setLocacoes(new HashSet<>(usuario.getLocacoes().stream().map(LocacaoDTO::new).toList()));
		return usuarioDTO;

	}

	@Transactional
	public UsuarioDTO cadastrar(UsuarioInsertDTO usuario) {

		if(!(usuario.getCpf().matches("([0-9]{2}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[-]?[0-9]{2})"))){

			throw new IncorrectInputException("O CPF informado não é válido!");
		}

		try {

			Usuario usuarioSave = new Usuario();
			BeanUtils.copyProperties(usuario, usuarioSave);
			if(verificarMenorDeIdade(usuario.getDataNascimento())){

				throw new CreateAccountException("Apenas maiores de idade podem se registrar");
			}
			Endereco endereco = enderecoService.buscar(usuario.getCep());
			usuarioSave.setEndereco(endereco);
			usuarioSave.setRegistroCnh(usuario.getRegistroCnh());
			usuarioSave.setSenha(passwordEncoder.encode(usuario.getSenha()));
			usuarioSave.getRoles().clear();
			Long id = 1L;

			Role role = roleRepository.findById(id).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));
			usuarioSave.getRoles().add(role);

			repository.save(usuarioSave);
			
			UsuarioDTO usuarioDTO = new UsuarioDTO(usuarioSave);
			usuarioDTO.setLocacoes(new HashSet<>(usuarioSave.getLocacoes().stream().map(LocacaoDTO::new).toList()));
			return usuarioDTO;
		}
		
		catch(DataIntegrityViolationException e) {
			
			throw new DatabaseException("Usuário já existente!");
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
		
	}

	public UsuarioDTO setAdmin(Long id) {

		authService.isAdmin();

		Usuario entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));

		Role roleOperator = roleRepository.findById(1L).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));
		Role roleAdmin = roleRepository.findById(2L).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));


		if (entity.hasRole("ROLE_ADMIN")) {

			entity.getRoles().remove(roleAdmin);
		}

		else{

			entity.getRoles().add(roleAdmin);
		}

		repository.save(entity);
		return new UsuarioDTO(entity);


	}

	@Transactional
	public UsuarioDTO atualizar(Long id, UsuarioUpdateDTO dto) {

		authService.validateselfOrAdmin(id);

		if(!(dto.getCpf().matches("([0-9]{2}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[-]?[0-9]{2})"))){

			throw new IncorrectInputException("O CPF informado não é válido!");
		}

		Usuario entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));
		Endereco endereco = enderecoService.buscar(dto.getCep());

		entity.setEmail(dto.getEmail());
		entity.setNome(dto.getNome());
		entity.setCep(dto.getCep());
		entity.setDataNascimento(dto.getDataNascimento());
		entity.setRegistroCnh(dto.getRegistroCnh());
		entity.setEndereco(endereco);

		//CHECANDO SE O USUÁRIO ESTÁ ENVIANDO A SENHA PARA SER ATUALIZADA
		if(!dto.getSenha().isEmpty()){

			entity.setSenha(passwordEncoder.encode(dto.getSenha()));
		}

		Role roleOperator = roleRepository.findById(1L).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));
		Role roleAdmin = roleRepository.findById(2L).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));

		for(Role role: entity.getRoles()){

			entity.getRoles().add(roleOperator);

			if(entity.hasRole("ROLE_ADMIN")){
				entity.getRoles().add(roleAdmin);
			}

		}

		repository.save(entity);
		return new UsuarioDTO(entity);

	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Usuario usuario = repository.findByEmail(username);
		if(usuario == null){

			logger.error("Usuário não encontrado: " + username);
			throw new UsernameNotFoundException("Email não encontrado!");
		}
		logger.info("Usuário encontrado: " + username);

		return usuario;
	}

	public boolean verificarMenorDeIdade(LocalDate dataNascimentoCliente){

		LocalDate dataAtual = LocalDate.now();
		long idadeCliente = ChronoUnit.YEARS.between(dataNascimentoCliente, dataAtual);
		if(idadeCliente < 18) return true;
		return false;
	}

}


		
