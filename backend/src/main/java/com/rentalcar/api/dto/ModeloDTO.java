package com.rentalcar.api.dto;

import com.rentalcar.api.models.Marca;
import com.rentalcar.api.models.Modelo;
import com.rentalcar.api.models.enums.ModeloCambio;
import com.rentalcar.api.models.enums.ModeloCategoria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModeloDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank(message = "Campo obrigatório")
    private String nome;

    @NotBlank(message = "Campo obrigatório")
    private String descricao;

    private ModeloCategoria categoria;

    private ModeloCambio cambio;

    @NotBlank(message = "Campo obrigatório")
    private String imagem;

    @Max(4)
    private String portas;

    @NotBlank(message = "Campo obrigatório")
    private String ano;

    private Marca marca;


    public ModeloDTO(Modelo entity){

        this.id = entity.getId();
        this.nome = entity.getNome();
        this.portas = entity.getPortas();
        this.descricao = entity.getDescricao();
        this.ano = entity.getAno();
        this.cambio = entity.getCambio();
        this.categoria = entity.getCategoria();
        this.imagem = entity.getImagem();
        this.marca = entity.getMarca();
    }
}