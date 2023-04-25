package com.rentalcar.api.services.validation;

import com.rentalcar.api.controllers.exceptions.FieldMessage;
import com.rentalcar.api.dto.UsuarioUpdateDTO;
import com.rentalcar.api.models.Usuario;
import com.rentalcar.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class UsuarioUpdateValidator implements ConstraintValidator<UsuarioUpdateValid, UsuarioUpdateDTO> {

    //CLASSE BOLER PLATE CRIADA PARA TESTES (ANNOTATIONS PERSONALIZADAS)

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private UsuarioRepository repository;

    @Override
    public void initialize(UsuarioUpdateValid ann) {
    }

    @Override
    public boolean isValid(UsuarioUpdateDTO dto, ConstraintValidatorContext context) {

        @SuppressWarnings("unchecked")
        var uriVars = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        long usuarioId = Long.parseLong(uriVars.get("id"));


        List<FieldMessage> list = new ArrayList<>();

        Usuario usuario = repository.findByEmail(dto.getEmail());

        if(usuario != null && usuarioId != usuario.getId()){

            list.add(new FieldMessage("email", "O email já pertence a outro usuário"));
        }

        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }
        return list.isEmpty();
    }
}