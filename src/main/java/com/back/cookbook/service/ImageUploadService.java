package com.back.cookbook.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

/**
 * Serviço para gerenciar upload e servir imagens de receitas
 */
@Service
public class ImageUploadService {
    
    // Diretório para armazenar as imagens dentro do projeto
    private static final String UPLOAD_DIR = "src/main/resources/static/images/";
    
    /**
     * Salva uma imagem no diretório de uploads
     * @param imagem Arquivo de imagem a ser salvo
     * @return Nome do arquivo salvo
     * @throws IOException Se houver erro no upload
     */
    public String salvarImagem(MultipartFile imagem) throws IOException {
        if (imagem == null || imagem.isEmpty()) {
            return null;
        }
        
        if (!imagem.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Arquivo enviado não é uma imagem válida.");
        }

        // Gerar nome único para evitar conflitos
        String nomeOriginal = imagem.getOriginalFilename();
        String extensao = "";
        if (nomeOriginal != null && nomeOriginal.contains(".")) {
            extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf("."));
        }
        String nomeArquivo = UUID.randomUUID().toString() + extensao;
        
        // Criar diretório se não existir
        Path pastaDestino = Paths.get(UPLOAD_DIR);
        if (!Files.exists(pastaDestino)) {
            Files.createDirectories(pastaDestino);
        }

        // Salvar arquivo
        Path caminhoCompleto = pastaDestino.resolve(nomeArquivo);
        Files.copy(imagem.getInputStream(), caminhoCompleto, StandardCopyOption.REPLACE_EXISTING);
        
        return nomeArquivo;
    }
    
    /**
     * Obtém o caminho completo para uma imagem
     * @param nomeArquivo Nome do arquivo
     * @return Path para o arquivo
     */
    public Path getCaminhoImagem(String nomeArquivo) {
        return Paths.get(UPLOAD_DIR).resolve(nomeArquivo).normalize();
    }
    
    /**
     * Verifica se uma imagem existe
     * @param nomeArquivo Nome do arquivo
     * @return true se o arquivo existe
     */
    public boolean imagemExiste(String nomeArquivo) {
        if (nomeArquivo == null || nomeArquivo.trim().isEmpty()) {
            return false;
        }
        return Files.exists(getCaminhoImagem(nomeArquivo));
    }
    
    /**
     * Remove uma imagem do sistema de arquivos
     * @param nomeArquivo Nome do arquivo a ser removido
     * @return true se removido com sucesso
     */
    public boolean removerImagem(String nomeArquivo) {
        if (nomeArquivo == null || nomeArquivo.trim().isEmpty()) {
            return false;
        }
        
        try {
            Path caminhoArquivo = getCaminhoImagem(nomeArquivo);
            return Files.deleteIfExists(caminhoArquivo);
        } catch (IOException e) {
            System.err.println("Erro ao remover imagem: " + e.getMessage());
            return false;
        }
    }
    
    /**
     * Obtém o diretório de upload
     * @return String com o caminho do diretório
     */
    public String getUploadDir() {
        return UPLOAD_DIR;
    }
}
