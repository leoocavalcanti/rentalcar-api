package com.rentalcar.api.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.rentalcar.api.models.enums.AutomovelStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Automovel implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, name="valor_automovel")
	public Double valorAutomovel;

	@Column(nullable = true)
	private AutomovelStatus status;

	@Column(nullable = false, unique = true)
	private String placa;

	@ManyToOne(cascade = CascadeType.REMOVE)
	private Modelo modelo;
	
	@Column(name="valor_diaria", nullable = true)
	private Double diaria;
	
	@JsonIgnore
	@OneToMany(mappedBy = "automovel", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Locacao> locacoes = new ArrayList<>();

}