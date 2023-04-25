package com.rentalcar.api.dto;

import java.io.Serializable;

import com.rentalcar.api.models.Automovel;

import com.rentalcar.api.models.Marca;
import com.rentalcar.api.models.Modelo;
import com.rentalcar.api.models.enums.AutomovelStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutomovelDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	public Double valorAutomovel;

	private AutomovelStatus status;

	@Positive(message = "A diária não pode ser negativa")
	private Double diaria;

	@NotBlank(message = "Campo obrigatório")
	private String placa;

	private Modelo modelo;

	
	public AutomovelDTO(Automovel automovel) {
		
		this.id = automovel.getId();
		this.placa = automovel.getPlaca();
		this.diaria = automovel.getDiaria();
		this.modelo = automovel.getModelo();
		this.valorAutomovel = automovel.getValorAutomovel();
		this.status = automovel.getStatus();
	}
	
	

}
