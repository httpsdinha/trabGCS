package com.back.cookbook.business;

import com.back.cookbook.dataac.entity.ReceitaEntity;
import com.back.cookbook.dataac.entity.UsuarioEntity;
import java.util.List;
import com.back.cookbook.dataac.repositories.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Responsável pela lógica das receitas
 */
@Service
public class ReceitaManager {
    @Autowired(required = true)
    ReceitaRepository receitaRepository;

    public void criarReceita(String nome, String modo_prep, String ingredientes, String tempo, String qtd_pessoas, String custo, String imagem, UsuarioEntity usuario) {
        ReceitaEntity receita = new ReceitaEntity(nome, modo_prep, ingredientes, tempo, qtd_pessoas, custo, imagem);
        receita.setUsuario(usuario);
        receitaRepository.save(receita);
    }

    public ReceitaEntity obterReceitaPorId(Integer id) {
        return receitaRepository.getReferenceById(id);
    }

    public void atualizarReceita(Integer id, String nome, String modo_prep, String ingredientes, String tempo, String qtd_pessoas, String custo, String imagem) {
        ReceitaEntity receita = receitaRepository.getReferenceById(id);
        if (receita != null) {
            if (nome != null) receita.setNome(nome);
            if (modo_prep != null) receita.setModo_prep(modo_prep);
            if (ingredientes != null) receita.setIngredientes(ingredientes);
            if (tempo != null) receita.setTempo(tempo);
            if (qtd_pessoas != null) receita.setQtdPessoas(qtd_pessoas);
            if (custo != null) receita.setCusto(custo);
            if (imagem != null) receita.setImagem(imagem);
            receitaRepository.save(receita);
        }
    }

    public void deletarReceita(Integer id) {
        receitaRepository.deleteById(id);
    }

    public List<ReceitaEntity> listarReceitas() {
        return receitaRepository.findAll();
    }
}
