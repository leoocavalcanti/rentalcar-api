package com.rentalcar.api.integration.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Endereco implements Serializable {

    private static final long serialVersionUID = 1L;

    private String logradouro;

    private String bairro;

    private String localidade;

    private String uf;


}
