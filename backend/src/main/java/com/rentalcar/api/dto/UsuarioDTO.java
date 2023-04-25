package com.rentalcar.api.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.rentalcar.api.integration.models.Endereco;
import com.rentalcar.api.models.Locacao;
import com.rentalcar.api.models.Usuario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;

	@NotBlank(message = "Campo obrigatório")
	private String cpf;

	@NotBlank(message = "Campo obrigatório")
	private String nome;

	private LocalDate dataNascimento;

	@NotBlank(message = "Campo obrigatório")
	private String registroCnh;
	private String cep;

	@NotBlank(message = "Campo obrigatório")
	@Email(message = "Informe um endereço de e-mail válido")
	private String email;

	private Endereco endereco;
	private Set<LocacaoDTO> locacoes = new HashSet<>();

	private Set<RoleDTO> roles = new HashSet<>();
	
	public UsuarioDTO(Usuario usuario) {
		
		this.id = usuario.getId();
		this.cpf = usuario.getCpf();
		this.nome = usuario.getNome();
		this.endereco = usuario.getEndereco();
		this.email = usuario.getEmail();
		this.cep = usuario.getCep();
		this.dataNascimento = usuario.getDataNascimento();
		this.registroCnh = usuario.getRegistroCnh();
		usuario.getRoles().forEach((r) -> this.roles.add(new RoleDTO(r)));
		
	}
	
	public UsuarioDTO(Usuario usuario, Set<Locacao> locacoes) {
		
		this(usuario);
		locacoes.forEach((l) -> this.locacoes.add(new LocacaoDTO(l)));
	}
}
