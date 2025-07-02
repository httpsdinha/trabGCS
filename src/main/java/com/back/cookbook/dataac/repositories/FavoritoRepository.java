package com.back.cookbook.dataac.repositories;

import com.back.cookbook.dataac.entity.FavoritoEntity;
import com.back.cookbook.dataac.entity.UsuarioEntity;
import com.back.cookbook.dataac.entity.ReceitaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoritoRepository extends JpaRepository<FavoritoEntity, Long> {
    List<FavoritoEntity> findByUsuario(UsuarioEntity usuario);
    Optional<FavoritoEntity> findByUsuarioAndReceita(UsuarioEntity usuario, ReceitaEntity receita);
}