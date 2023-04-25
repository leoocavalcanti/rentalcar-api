package com.rentalcar.api.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.rentalcar.api.models.Automovel;
import com.rentalcar.api.models.Locacao;

import com.rentalcar.api.models.enums.LocacaoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocacaoDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;

	private LocalDate dataLocacao;

	private LocalDate dataDevolucao;
	@Positive(message = "O valor deve ser positivo")
	private Double valor;

	private LocacaoStatus status;
	private Long usuarioId;

	private String proprietario;

	private Automovel automovel;


	public LocacaoDTO(Locacao locacao){
		
		this.id = locacao.getId();
		this.dataLocacao = locacao.getDataLocacao();
		this.dataDevolucao = locacao.getDataDevolucao();
		this.valor = locacao.getValor();
		this.automovel = locacao.getAutomovel();
		this.status = locacao.getStatus();
		this.proprietario = locacao.getUsuario().getNome();
		this.usuarioId = locacao.getUsuario().getId();

		
	}
}
