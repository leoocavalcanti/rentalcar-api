package com.rentalcar.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rentalcar.api.models.enums.ModeloCambio;
import com.rentalcar.api.models.enums.ModeloCategoria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Modelo implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, columnDefinition = "text")
	private String descricao;
	@Column(name="img", nullable = false, columnDefinition = "text")
	private String imagem;

	@Column(nullable = false)
	private ModeloCategoria categoria;

	@Column(nullable = false)
	private ModeloCambio cambio;

	@Column(nullable = false, unique = true)
	private String nome;

	@Column(nullable = false)
	private String portas;

	@Column(nullable = false)
	private String ano;
	@ManyToOne
	@JoinColumn(name = "marca_id")
	private Marca marca;

	@OneToMany(mappedBy = "modelo", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<Automovel> automoveis;

}