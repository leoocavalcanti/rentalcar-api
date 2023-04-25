package com.rentalcar.api.repositories;

import com.rentalcar.api.models.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.api.models.Locacao;

@Repository
public interface LocacaoRepository extends JpaRepository<Locacao, Long>{

    public Page<Locacao> findByProprietarioStartingWithIgnoreCase(Pageable pageable, String proprietario);
}
