package com.rentalcar.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.api.models.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	public Usuario findByEmail(String email);
	public Page<Usuario> findByNomeStartingWithIgnoreCase(Pageable pageable, String nome);
}
