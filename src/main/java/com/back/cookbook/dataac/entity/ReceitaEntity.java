package com.back.cookbook.dataac.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity(name = "Receita")
@Table(name = "Receita")
public class ReceitaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "modoPrep")
    private String modoPrep;

    @Column(name = "ingredientes")
    private String ingredientes;

    @Column(name = "tempo")
    private String tempo;

    @Column(name = "qtdPessoas")
    private String qtdPessoas;

    @Column(name = "custo")
    private String custo;

    @Column(name = "imagem", nullable = true)
    private String imagem;

    @ManyToOne
    @JoinColumn(name = "usuarioId", nullable = false)
    @JsonBackReference
    private UsuarioEntity usuario;

    // Construtor com todos os parâmetros
    public ReceitaEntity(String nome, String modoPrep, String ingredientes, String tempo, String qtdPessoas, String custo, String imagem) {
        this.nome = nome;
        this.modoPrep = modoPrep;
        this.ingredientes = ingredientes;
        this.qtdPessoas = qtdPessoas;
        this.tempo = tempo;
        this.custo = custo;
        this.imagem = imagem;
    }

    public ReceitaEntity() {
        // Construtor sem parâmetros necessário para o JPA
    }

    // Getters
    public Integer getId() {
        return this.id;
    }

    public String getNome() {
        return this.nome;
    }

    public String getModoPrep() {
        return this.modoPrep;
    }

    public String getIngredientes() {
        return this.ingredientes;
    }

    public String getTempo() {
        return this.tempo;
    }

    public String getQtdPessoas() {
        return this.qtdPessoas;
    }

    public String getCusto() {
        return this.custo;
    }

    public String getImagem() {
        return this.imagem;
    }

    public UsuarioEntity getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioEntity usuario) {
        this.usuario = usuario;
    }

    // Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setModoPrep(String modoPrep) {
        this.modoPrep = modoPrep;
    }

    public void setIngredientes(String ingredientes) {
        this.ingredientes = ingredientes;
    }

    public void setTempo(String tempo) {
        this.tempo = tempo;
    }

    public void setQtdPessoas(String qtdPessoas) {
        this.qtdPessoas = qtdPessoas;
    }

    public void setCusto(String custo) {
        this.custo = custo;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }
}
