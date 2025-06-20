package com.back.cookbook.dataac.repositories;

import com.back.cookbook.dataac.entity.ReceitaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceitaRepository extends JpaRepository<ReceitaEntity, Integer>{
}
