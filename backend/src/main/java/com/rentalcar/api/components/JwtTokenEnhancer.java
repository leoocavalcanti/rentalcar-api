package com.rentalcar.api.components;

import com.rentalcar.api.models.Usuario;
import com.rentalcar.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenEnhancer implements TokenEnhancer {

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {

        Usuario usuario = usuarioRepository.findByEmail(authentication.getName());
        Map<String, Object> map = new HashMap<>();
        map.put("id", usuario.getId());
        map.put("nome", usuario.getNome());

        DefaultOAuth2AccessToken token = (DefaultOAuth2AccessToken) accessToken;
        token.setAdditionalInformation(map);

        return accessToken;
    }
}
