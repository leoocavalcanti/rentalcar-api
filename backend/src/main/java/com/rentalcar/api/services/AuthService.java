package com.rentalcar.api.services;

import com.rentalcar.api.models.Usuario;
import com.rentalcar.api.repositories.UsuarioRepository;
import com.rentalcar.api.services.exceptions.ForbiddenException;
import com.rentalcar.api.services.exceptions.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {


    @Autowired
    private UsuarioRepository usuarioRepository;

    //VERIFICAR USUÁRIO AUTENTICADO PELO SPRING SECURITY

    public Usuario isAuthenticated(){

        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            return usuarioRepository.findByEmail(username);
        }
        catch(Exception e){

            throw new UnauthorizedException("Usuário inválido");
        }
    }

    public void validateselfOrAdmin(Long id){

        Usuario usuario = isAuthenticated();
        if(!usuario.getId().equals(id) && !usuario.hasRole("ROLE_ADMIN")){

            throw new ForbiddenException("Acesso negado");
        }
    }

    public void isAdmin(){

        Usuario usuario = isAuthenticated();
        if(!usuario.hasRole("ROLE_ADMIN")){

            throw new ForbiddenException("Acesso negado");
        }
    }

    //VALIDAR SE A LOCAÇÃO QUE O USUÁRIO ESTÁ TENTANDO ACESSAR PERTENCE A ELE

    public void isLocationBelongUser(Long id){

        Usuario usuario = isAuthenticated();

        if(!usuario.hasLocation(id) && !usuario.hasRole("ROLE_ADMIN")){

            throw new ForbiddenException("Acesso negado");
        }
    }

}
