package com.rentalcar.api.services;

import com.rentalcar.api.dto.AutomovelDTO;
import com.rentalcar.api.models.Automovel;
import com.rentalcar.api.models.enums.ModeloCambio;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class TaxaDiariaService {

    private static final double PORCENTAGEM_FIXA_DIARIA = 0.0017;
    private static final double TAXA_CAMBIO_AUTOMATICO = 1.05;
    private static final double TAXA_CATEGORIA_AUTOMOVEL_SEDAN = 1.03;
    private static final double TAXA_CATEGORIA_AUTOMOVEL_SUV = 1.15;
    private static final double TAXA_CATEGORIA_AUTOMOVEL_CAMINHONETE = 1.15;
    private static final double TAXA_CATEGORIA_AUTOMOVEL_ESPORTIVO = 1.20;
    private static final double TAXA_CATEGORIA_AUTOMOVEL_CONVERSIVEL = 1.25;


    public Double calcularDiaria(Automovel automovel) {

        Double diaria = (automovel.getValorAutomovel() * PORCENTAGEM_FIXA_DIARIA);

        // APLICAR TAXA EM CIMA DA CATEGORIA DO VEÍCULO
        switch (automovel.getModelo().getCategoria()) {

            case SEDAN:
                diaria *= TAXA_CATEGORIA_AUTOMOVEL_SEDAN;
                break;
            case SUV:
                diaria *= TAXA_CATEGORIA_AUTOMOVEL_SUV;
                break;
            case CAMINHONETE:
                diaria *= TAXA_CATEGORIA_AUTOMOVEL_CAMINHONETE;
                break;
            case ESPORTIVO:
                diaria *= TAXA_CATEGORIA_AUTOMOVEL_ESPORTIVO;
                break;
            case CONVERSIVEL:
                diaria *= TAXA_CATEGORIA_AUTOMOVEL_CONVERSIVEL;
                break;
            default:
                diaria *= 1;

        }

        // APLICAR TAXA EM CIMA DE UM VEÍCULO COM CÂMBIO AUTOMÁTICO
        if (Objects.requireNonNull(automovel.getModelo().getCambio()) == ModeloCambio.AUTOMATICO) {
            diaria *= TAXA_CAMBIO_AUTOMATICO;
        }

        return diaria;

    }

}
