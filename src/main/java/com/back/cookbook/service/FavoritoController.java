package com.back.cookbook.service;

import com.back.cookbook.dataac.entity.FavoritoEntity;
import com.back.cookbook.dataac.entity.UsuarioEntity;
import com.back.cookbook.dataac.entity.ReceitaEntity;
import com.back.cookbook.dataac.repositories.FavoritoRepository;
import com.back.cookbook.dataac.repositories.UserRepository;
import com.back.cookbook.dataac.repositories.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/favoritos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class FavoritoController {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private UserRepository usuarioRepository;

    @Autowired
    private ReceitaRepository receitaRepository;

    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarFavorito(@RequestParam String email, @RequestParam Integer receitaId) {
        UsuarioEntity usuario = usuarioRepository.findByEmail(email);
        ReceitaEntity receita = receitaRepository.findById(receitaId).orElse(null);
        if (usuario == null || receita == null) {
            return ResponseEntity.badRequest().body("Usuário ou receita não encontrados");
        }
        if (favoritoRepository.findByUsuarioAndReceita(usuario, receita).isPresent()) {
            return ResponseEntity.badRequest().body("Já favoritado");
        }
        FavoritoEntity favorito = new FavoritoEntity();
        favorito.setUsuario(usuario);
        favorito.setReceita(receita);
        favoritoRepository.save(favorito);
        return ResponseEntity.ok("Favorito adicionado");
    }

    @DeleteMapping("/remover")
    public ResponseEntity<?> removerFavorito(@RequestParam String email, @RequestParam Integer receitaId) {
        UsuarioEntity usuario = usuarioRepository.findByEmail(email);
        ReceitaEntity receita = receitaRepository.findById(receitaId).orElse(null);
        if (usuario == null || receita == null) {
            return ResponseEntity.badRequest().body("Usuário ou receita não encontrados");
        }
        var favorito = favoritoRepository.findByUsuarioAndReceita(usuario, receita);
        if (favorito.isPresent()) {
            favoritoRepository.delete(favorito.get());
            return ResponseEntity.ok("Favorito removido");
        }
        return ResponseEntity.badRequest().body("Favorito não encontrado");
    }

    @GetMapping("/listar/{email}")
    public ResponseEntity<List<FavoritoEntity>> listarFavoritosPorNome(@PathVariable String email) {
        UsuarioEntity usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            return ResponseEntity.badRequest().build();
        }
        List<FavoritoEntity> favoritos = favoritoRepository.findByUsuario(usuario);
        return ResponseEntity.ok(favoritos);
    }
}
