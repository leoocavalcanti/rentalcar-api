package com.rentalcar.api.services.validation;
import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.rentalcar.api.controllers.exceptions.FieldMessage;
import com.rentalcar.api.dto.UsuarioInsertDTO;
import com.rentalcar.api.models.Usuario;
import com.rentalcar.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;


public class UsuarioInsertValidator implements ConstraintValidator<UsuarioInsertValid, UsuarioInsertDTO> {

    //CLASSE BOLER PLATE CRIADA PARA TESTES (ANNOTATIONS PERSONALIZADAS)
    @Autowired
    private UsuarioRepository repository;

    @Override
    public void initialize(UsuarioInsertValid ann) {
    }

    @Override
    public boolean isValid(UsuarioInsertDTO dto, ConstraintValidatorContext context) {

        List<FieldMessage> list = new ArrayList<>();

        Usuario usuario = repository.findByEmail(dto.getEmail());

        if(usuario != null){

            list.add(new FieldMessage("email", "Email já existente"));
        }

        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }
        return list.isEmpty();
    }
}