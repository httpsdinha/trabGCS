package com.back.cookbook.dataac.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "favorito")
public class FavoritoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private UsuarioEntity usuario;

    @ManyToOne
    @JoinColumn(name = "receita_id")
    private ReceitaEntity receita;

    // Getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UsuarioEntity getUsuario() { return usuario; }
    public void setUsuario(UsuarioEntity usuario) { this.usuario = usuario; }

    public ReceitaEntity getReceita() { return receita; }
    public void setReceita(ReceitaEntity receita) { this.receita = receita; }
}