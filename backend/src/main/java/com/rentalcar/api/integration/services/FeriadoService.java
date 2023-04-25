package com.rentalcar.api.integration.services;

import com.rentalcar.api.integration.models.Feriado;
import com.rentalcar.api.services.exceptions.ApiException;
import com.rentalcar.api.services.exceptions.UnauthorizedException;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class FeriadoService {

    public List<Feriado> listar(String ano){

        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<List<Feriado>> response = restTemplate.exchange(
                    "https://brasilapi.com.br/api/feriados/v1/"+ano,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Feriado>>() {
                    });
            return response.getBody();

        }
        catch (Exception e) {

            throw new ApiException("Erro inesperado durante a consumação da API");
        }
    }
}
