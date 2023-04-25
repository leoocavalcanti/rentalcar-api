package com.rentalcar.api.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rentalcar.api.models.enums.LocacaoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Locacao implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name="data_locacao", nullable = false)
	private LocalDate dataLocacao;

	@Column(nullable = true)
	private LocacaoStatus status;
	
	@Column(name="data_devolucao", nullable = false)
	private LocalDate dataDevolucao;
	
	@Column(name="valor_locacao", nullable = true)
	private Double valor;

	@Column(nullable = true)
	private String proprietario;

	@ManyToOne(cascade = CascadeType.REMOVE)
	private Automovel automovel;
	@ManyToOne
	@JoinColumn(nullable = false, name = "usuario_id")
	private Usuario usuario;
	
}