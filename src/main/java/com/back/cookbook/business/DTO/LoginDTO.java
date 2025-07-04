package com.back.cookbook.business.DTO;

/**
 * DTO imutável para dados de login.
 * Utiliza record para garantir imutabilidade e thread-safety.
 * 
 * @param email Email do usuário
 * @param senha Senha do usuário
 */
public record LoginDTO(String email, String senha) {
    
    /**
     * Construtor compacto com validações básicas para dados sensíveis.
     */
    public LoginDTO {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email não pode ser nulo ou vazio");
        }
        if (senha == null || senha.trim().isEmpty()) {
            throw new IllegalArgumentException("Senha não pode ser nula ou vazia");
        }
    }
}
