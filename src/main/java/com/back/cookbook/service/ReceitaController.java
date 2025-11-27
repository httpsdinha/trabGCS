package com.back.cookbook.service;

import com.back.cookbook.business.DTO.ReceitaRequestDTO;
import com.back.cookbook.business.ReceitaManager;
import com.back.cookbook.business.UsuarioManager;
import com.back.cookbook.dataac.entity.ReceitaEntity;
import com.back.cookbook.dataac.entity.UsuarioEntity;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/receita")
public class ReceitaController {

    // Dependências finais para injeção via construtor
    private final ReceitaManager receitaManager;
    private final UsuarioManager usuarioManager;
    private final ImageUploadService imageUploadService;

    // Injeção via construtor (Melhor para testes)
    public ReceitaController(ReceitaManager receitaManager, 
                             UsuarioManager usuarioManager, 
                             ImageUploadService imageUploadService) {
        this.receitaManager = receitaManager;
        this.usuarioManager = usuarioManager;
        this.imageUploadService = imageUploadService;
    }

    // O método "getReceitas" ("oi") foi removido (Remoção de Código Morto)

    @PostMapping(value = "/adicionar", consumes = "multipart/form-data")
    public ResponseEntity<String> adicionar(@ModelAttribute ReceitaRequestDTO receitaDto) {
        try {
            // A lógica pesada de validação de usuário e upload deve ir para o Manager.
            // O Controller apenas passa o DTO.
            receitaManager.criarReceita(receitaDto);
            return ResponseEntity.ok("Receita adicionada com sucesso.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro ao adicionar receita: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReceitaEntity> obterReceita(@PathVariable Integer id) {
        ReceitaEntity receita = receitaManager.obterReceitaPorId(id);
        if (receita != null) {
            return ResponseEntity.ok(receita);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping(value = "/atualizar", consumes = "multipart/form-data")
    public ResponseEntity<String> atualizarReceita(
            @RequestParam Integer id,
            @ModelAttribute ReceitaRequestDTO receitaDto) {
        try {
            // Novamente, agrupamos os parâmetros no DTO
            receitaManager.atualizarReceita(id, receitaDto);
            return ResponseEntity.ok("Receita atualizada com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro ao atualizar: " + e.getMessage());
        }
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarReceita(@PathVariable Integer id) {
        try {
            receitaManager.deletarReceita(id);
            return ResponseEntity.ok("Receita deletada com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro ao deletar: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ReceitaEntity>> listarReceitas(@RequestParam String email) {
        // A lógica de buscar usuário e limpar referência circular deveria estar no Manager/DTO
        // Mantivemos aqui por compatibilidade com o código original, mas é um ponto de atenção.
        UsuarioEntity usuario = usuarioManager.findByEmail(email);
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<ReceitaEntity> receitas = usuario.getReceitas();
        receitas.forEach(receita -> receita.setUsuario(null)); 
        return ResponseEntity.ok(receitas);
    }

    // Endpoints de imagem mantidos, mas idealmente iriam para um 'ImagemController'
    @GetMapping("/imagem/{filename:.+}")
    public ResponseEntity<Resource> servirImagem(@PathVariable String filename) {
        try {
            Path caminhoArquivo = imageUploadService.getCaminhoImagem(filename);
            Resource recurso = new UrlResource(caminhoArquivo.toUri());

            if (recurso.exists() && recurso.isReadable()) {
                String contentType = Files.probeContentType(caminhoArquivo);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + recurso.getFilename() + "\"")
                        .body(recurso);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
