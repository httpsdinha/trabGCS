package com.back.cookbook.business;

import com.back.cookbook.business.DTO.ReceitaRequestDTO;
import com.back.cookbook.dataac.entity.ReceitaEntity;
import com.back.cookbook.dataac.entity.UsuarioEntity;
import com.back.cookbook.dataac.repositories.ReceitaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * Responsável pela lógica de negócios das receitas.
 */
@Service
public class ReceitaManager {

    // 1. Refatoração: Injeção via Construtor (elimina Field Injection)
    private final ReceitaRepository receitaRepository;

    public ReceitaManager(ReceitaRepository receitaRepository) {
        this.receitaRepository = receitaRepository;
    }

    /**
     * Cria uma nova receita a partir do DTO.
     * Refatoração: Long Parameter List -> Parameter Object (DTO)
     */
    public void criarReceita(ReceitaRequestDTO dados, UsuarioEntity usuario, String caminhoImagem) {
        // Assume que ReceitaEntity foi refatorada para aceitar tipos fortes (Integer, BigDecimal)
        // conforme o smell "Primitive Obsession"
        ReceitaEntity receita = new ReceitaEntity();
        
        receita.setNome(dados.nome());
        receita.setModoPrep(dados.modoPreparo());
        receita.setIngredientes(dados.ingredientes());
        receita.setTempo(dados.tempoMinutos()); // Agora é Integer
        receita.setQtdPessoas(dados.qtdPessoas()); // Agora é Integer
        receita.setCusto(dados.custo()); // Agora é BigDecimal
        receita.setImagem(caminhoImagem);
        receita.setUsuario(usuario);

        receitaRepository.save(receita);
    }

    public ReceitaEntity obterReceitaPorId(Integer id) {
        return receitaRepository.findById(id).orElse(null);
    }

    /**
     * Atualiza uma receita existente.
     * Refatoração: Correção de Naming (modo_prep -> modoPreparo) e uso de DTO.
     */
    public void atualizarReceita(Integer id, ReceitaRequestDTO dados, String caminhoImagem) {
        // Usamos findById para evitar Proxy exceptions do getReferenceById se o ID não existir
        ReceitaEntity receita = receitaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Receita não encontrada com id: " + id));

        if (dados.nome() != null && !dados.nome().isBlank()) {
            receita.setNome(dados.nome());
        }
        
        if (dados.modoPreparo() != null && !dados.modoPreparo().isBlank()) {
            receita.setModoPrep(dados.modoPreparo());
        }

        if (dados.ingredientes() != null && !dados.ingredientes().isBlank()) {
            receita.setIngredientes(dados.ingredientes());
        }

        if (dados.tempoMinutos() != null) {
            receita.setTempo(dados.tempoMinutos());
        }

        if (dados.qtdPessoas() != null) {
            receita.setQtdPessoas(dados.qtdPessoas());
        }

        if (dados.custo() != null) {
            receita.setCusto(dados.custo());
        }

        if (caminhoImagem != null) {
            receita.setImagem(caminhoImagem);
        }

        receitaRepository.save(receita);
    }

    public void deletarReceita(Integer id) {
        if (receitaRepository.existsById(id)) {
            receitaRepository.deleteById(id);
        }
        // Se não existir, silenciosamente ignora ou poderia lançar exceção, dependendo da regra de negócio.
    }

    public List<ReceitaEntity> listarReceitas() {
        return receitaRepository.findAll();
    }
}
