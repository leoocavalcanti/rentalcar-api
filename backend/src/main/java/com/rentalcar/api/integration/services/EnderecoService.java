package com.rentalcar.api.integration.services;

import com.rentalcar.api.integration.models.Endereco;
import com.rentalcar.api.services.exceptions.ApiException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EnderecoService {


    public Endereco buscar(String cep){

        try {

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Endereco> resp = restTemplate.getForEntity(String.format("https://viacep.com.br/ws/%s/json/", cep), Endereco.class);
            return resp.getBody();

        }
        catch (Exception e) {

            throw new ApiException("Erro inesperado durante a consumação da API");
        }
    }


}
