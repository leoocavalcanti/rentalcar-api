package com.rentalcar.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rentalcar.api.models.Automovel;

import java.util.List;

@Repository
public interface AutomovelRepository extends JpaRepository<Automovel, Long> {

    @Query("SELECT a FROM Automovel a JOIN a.modelo m WHERE m.nome LIKE :modelo%")
    public Page<Automovel> findByModeloStartingWith(Pageable pageable, @Param("modelo") String modelo);

}
