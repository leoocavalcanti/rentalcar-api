package com.rentalcar.api.services;

import com.rentalcar.api.integration.models.Feriado;
import com.rentalcar.api.integration.services.FeriadoService;
import com.rentalcar.api.models.Automovel;
import com.rentalcar.api.models.Usuario;
import com.rentalcar.api.repositories.AutomovelRepository;
import com.rentalcar.api.repositories.UsuarioRepository;
import com.rentalcar.api.services.exceptions.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaxaLocacaoService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FeriadoService feriadoService;

    @Autowired
    private AutomovelRepository automovelRepository;

    private static Logger logger = LoggerFactory.getLogger(UsuarioService.class);
    private static final Double TAXA_CLIENTE_IDADE = 0.12;
    private static final Double TAXA_FERIADO = 0.12;
    private static final Double TAXA_SEGURO_AUTOMOVEL = 0.000001;
    private static final LocalDate DATA_ATUAL = LocalDate.now();

    public Double calcularTaxasLocacao(LocalDate dataLocacao, Long automovelId){

        Automovel automovel = automovelRepository.findById(automovelId).orElseThrow(() -> new NotFoundException("Entidade não encontrada"));
        Double seguroAutomovel = automovel.getValorAutomovel() * TAXA_SEGURO_AUTOMOVEL;

        Usuario usuario = usuarioRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        LocalDate dataNascimentoCliente = usuario.getDataNascimento();
        long idadeCliente = ChronoUnit.YEARS.between(dataNascimentoCliente, DATA_ATUAL);

        Double taxasLocacao = 1.0;

        //TAXA EM CIMA DO VALOR DA LOCAÇÃO SE O CLIENTE FOR MENOR DE 23 ANOS
        if(idadeCliente < 23){

            logger.info("Idade do cliente é " + idadeCliente);
            taxasLocacao += TAXA_CLIENTE_IDADE;
        }

        //PUXANDO LISTA DE FERIADOS DO ANO ATUAL
        List<Feriado> feriados = feriadoService.listar(Integer.toString(DATA_ATUAL.getYear()));
        long dias;

        for(Feriado feriado: feriados){

            dias = ChronoUnit.DAYS.between(feriado.getDate(), dataLocacao);
            if(dias >= 0 && dias <= 4){

                taxasLocacao += TAXA_FERIADO;
                break;
            }

        }

        taxasLocacao += seguroAutomovel;

        return taxasLocacao;
    }


}
