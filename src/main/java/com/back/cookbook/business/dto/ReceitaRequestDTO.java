package com.back.cookbook.business.DTO;

import org.springframework.web.multipart.MultipartFile;
import java.math.BigDecimal;

public record ReceitaRequestDTO(
    String nome,
    String modoPreparo,
    String ingredientes,
    Integer tempoMinutos,
    Integer qtdPessoas,  
    BigDecimal custo,     
    MultipartFile imagem,
    String emailUsuario
) {}
