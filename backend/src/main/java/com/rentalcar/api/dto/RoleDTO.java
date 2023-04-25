package com.rentalcar.api.dto;

import com.rentalcar.api.models.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDTO implements Serializable {


    private static final long serialVersionUID = 1L;

    private Long id;
    private String authority;

    public RoleDTO(Role role) {

        id = role.getId();
        authority = role.getAuthority();
    }


}
