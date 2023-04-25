package com.rentalcar.api.dto;

import com.rentalcar.api.services.validation.UsuarioUpdateValid;
import lombok.Data;

@UsuarioUpdateValid
@Data
public class UsuarioUpdateDTO extends UsuarioDTO{
    private static final long serialVersionUID = 1L;

    private String senha;


}
