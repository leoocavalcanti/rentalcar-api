package com.rentalcar.api.dto;

import com.rentalcar.api.services.validation.UsuarioInsertValid;
import lombok.Data;

@Data
@UsuarioInsertValid
public class UsuarioInsertDTO extends UsuarioDTO{

    private static final long serialVersionUID = 1L;

    private String senha;

    public UsuarioInsertDTO(){

        super();
    }
}
