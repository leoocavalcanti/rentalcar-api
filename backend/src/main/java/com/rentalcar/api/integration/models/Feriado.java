package com.rentalcar.api.integration.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Feriado {

    private LocalDate date;
    private String name;
    private String type;
}
