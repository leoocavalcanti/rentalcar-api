package com.rentalcar.api.dto;

import com.rentalcar.api.models.Marca;
import com.rentalcar.api.models.Modelo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarcaDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank(message = "Campo obrigatório")
    private String nome;

    @NotBlank(message = "Campo obrigatório")
    private String descricao;

    public MarcaDTO(Marca entity){

        this.id = entity.getId();
        this.nome = entity.getNome();
        this.descricao = entity.getDescricao();
    }
}