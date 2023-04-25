package com.rentalcar.api.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.*;

import com.rentalcar.api.integration.models.Endereco;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Usuario implements UserDetails, Serializable {
	
	private static final long serialVersionUID = 1L;

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String cpf;

	@Column(nullable = false, name = "data_nascimento")
	private LocalDate dataNascimento;

	@Column(nullable = false, name = "registro_cnh", unique = true)
	private String registroCnh;

	@Column(nullable = false)
	private String cep;

	@Column(nullable = false)
	private String nome;
	@Column(nullable = false, unique = true)
	private String email;
	
	@Column(nullable = false)
	private String senha;

	@Column(nullable = true)
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "usuario_role",
		joinColumns = @JoinColumn(name = "usuario_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id")
	)
	private Set<Role> roles = new HashSet<>();
	
	@OneToMany(mappedBy = "usuario", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	private Set<Locacao> locacoes = new HashSet<>();

	@Column(nullable = true)
	private Endereco endereco;


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return roles.stream().map((r) -> new SimpleGrantedAuthority(r.getAuthority())).collect(Collectors.toList());
	}

	@Override
	public String getPassword() {
		return senha;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public boolean hasRole(String roleName){

		for(Role role: roles){

			if(role.getAuthority().equals(roleName)) {
				return true;
			}
		}
		return false;

	}

    public boolean hasLocation(Long id) {

		for(Locacao l: locacoes){

			if(l.getId().equals(id)){

				return true;
			}
		}
		return false;
    }
}