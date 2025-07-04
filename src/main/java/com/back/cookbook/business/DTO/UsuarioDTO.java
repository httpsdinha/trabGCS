package com.back.cookbook.business.DTO;

import com.back.cookbook.dataac.entity.ReceitaEntity;

import java.util.List;

public record UsuarioDTO (
        Integer id,
        String nome,
        String email,
        List<ReceitaEntity> receitas
) {
}
