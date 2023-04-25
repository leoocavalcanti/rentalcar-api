package com.rentalcar.api.repositories;

import com.rentalcar.api.models.Locacao;
import com.rentalcar.api.models.Marca;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {

    public Page<Marca> findByNomeStartingWithIgnoreCase(Pageable pageable, String nome);
}
