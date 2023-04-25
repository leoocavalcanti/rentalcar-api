package com.rentalcar.api.repositories;


import com.rentalcar.api.models.Marca;
import com.rentalcar.api.models.Modelo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Long> {

    public Page<Modelo> findByNomeStartingWithIgnoreCase(Pageable pageable, String nome);
}
