# Integração Backend - Funcionalidade de Favoritos

## 📋 Resumo

O frontend está **100% pronto** para consumir a API de favoritos do backend. Esta documentação detalha exatamente o que precisa ser implementado no lado do servidor.

## 🎯 Endpoints Requeridos

### Base URL: `http://localhost:8080`

### 1. 📌 Adicionar Favorito
```http
POST /favorito/adicionar
Content-Type: application/json

{
  "email": "usuario@email.com",
  "receitaId": 123
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Favorito adicionado com sucesso"
}
```

**Resposta de Erro (400/500):**
```json
{
  "success": false,
  "message": "Descrição do erro"
}
```

### 2. 🗑️ Remover Favorito
```http
DELETE /favorito/remover
Content-Type: application/json

{
  "email": "usuario@email.com",
  "receitaId": 123
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Favorito removido com sucesso"
}
```

### 3. 📋 Listar Favoritos
```http
GET /favorito/listar?email=usuario@email.com
```

**Resposta de Sucesso (200):**
```json
[
  {
    "id": 123,
    "nome": "Bolo de Chocolate",
    "custo": "Médio",
    "tempo": "30-60min",
    "qtdPessoas": 4,
    "imagem": "bolo-chocolate.jpg",
    "modo_prep": "Modo de preparo detalhado...",
    "ingredientes": "Farinha, ovos, chocolate, açúcar"
  },
  {
    "id": 456,
    "nome": "Lasanha",
    "custo": "Alto",
    "tempo": "+60min",
    "qtdPessoas": 6,
    "imagem": "lasanha.jpg",
    "modo_prep": "Modo de preparo da lasanha...",
    "ingredientes": "Massa, carne, molho, queijo"
  }
]
```

### 4. ✅ Verificar se é Favorito
```http
GET /favorito/verificar?email=usuario@email.com&receitaId=123
```

**Resposta de Sucesso (200):**
```json
true
```
ou
```json
false
```

## 🏗️ Estrutura de Banco Sugerida

### Tabela `favoritos`
```sql
CREATE TABLE favoritos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    receita_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (receita_id) REFERENCES receita(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (usuario_id, receita_id)
);

-- Índices para performance
CREATE INDEX idx_favoritos_usuario ON favoritos(usuario_id);
CREATE INDEX idx_favoritos_receita ON favoritos(receita_id);
```

## 📝 Exemplo de Implementação Java/Spring Boot

### Controller
```java
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/favorito")
public class FavoritoController {
    
    @Autowired
    private FavoritoService favoritoService;
    
    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarFavorito(@RequestBody FavoritoDTO dto) {
        try {
            favoritoService.adicionarFavorito(dto.getEmail(), dto.getReceitaId());
            return ResponseEntity.ok(Map.of("success", true, "message", "Favorito adicionado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }
    
    @DeleteMapping("/remover")
    public ResponseEntity<?> removerFavorito(@RequestBody FavoritoDTO dto) {
        try {
            favoritoService.removerFavorito(dto.getEmail(), dto.getReceitaId());
            return ResponseEntity.ok(Map.of("success", true, "message", "Favorito removido com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }
    
    @GetMapping("/listar")
    public ResponseEntity<List<ReceitaEntity>> listarFavoritos(@RequestParam String email) {
        try {
            List<ReceitaEntity> favoritos = favoritoService.listarFavoritos(email);
            return ResponseEntity.ok(favoritos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping("/verificar")
    public ResponseEntity<Boolean> verificarFavorito(
            @RequestParam String email, 
            @RequestParam Long receitaId) {
        try {
            boolean isFavorito = favoritoService.isFavorito(email, receitaId);
            return ResponseEntity.ok(isFavorito);
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }
}
```

### DTO
```java
public class FavoritoDTO {
    private String email;
    private Long receitaId;
    
    // getters e setters
}
```

### Service (Interface)
```java
public interface FavoritoService {
    void adicionarFavorito(String email, Long receitaId);
    void removerFavorito(String email, Long receitaId);
    List<ReceitaEntity> listarFavoritos(String email);
    boolean isFavorito(String email, Long receitaId);
}
```

## ⚙️ Configurações Importantes

### CORS
Certifique-se de configurar CORS corretamente:
```java
@CrossOrigin(origins = "http://localhost:3000")
```

### Validações Necessárias
1. **Email existe**: Verificar se o usuário existe antes de adicionar favorito
2. **Receita existe**: Verificar se a receita existe
3. **Duplicação**: Evitar favoritos duplicados (usar UNIQUE constraint)
4. **Autorização**: Verificar se o usuário pode acessar a receita

## 🧪 Como Testar

### 1. Usar Postman/Insomnia
Teste cada endpoint individualmente com os payloads mostrados acima.

### 2. Teste Integrado com Frontend
1. Inicie o backend na porta 8080
2. Inicie o frontend na porta 3000
3. Faça login no sistema
4. Teste favoritar/desfavoritar receitas
5. Acesse a página de favoritos

### 3. Logs Úteis
Adicione logs no backend para debug:
```java
logger.info("Adicionando favorito - Usuario: {}, Receita: {}", email, receitaId);
```

## 🚨 Possíveis Problemas

### CORS
Se houver erro CORS, adicione:
```java
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
```

### JSON Parsing
Certifique-se que o Spring está configurado para JSON:
```java
@RequestMapping(consumes = "application/json", produces = "application/json")
```

### Relacionamentos JPA
Se usar JPA, configure os relacionamentos corretamente:
```java
@Entity
public class FavoritoEntity {
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private UsuarioEntity usuario;
    
    @ManyToOne
    @JoinColumn(name = "receita_id")
    private ReceitaEntity receita;
}
```

## ✅ Checklist de Implementação

- [ ] Endpoint POST `/favorito/adicionar`
- [ ] Endpoint DELETE `/favorito/remover`
- [ ] Endpoint GET `/favorito/listar`
- [ ] Endpoint GET `/favorito/verificar`
- [ ] Tabela `favoritos` criada
- [ ] CORS configurado
- [ ] Validações implementadas
- [ ] Testes unitários
- [ ] Teste integrado com frontend

## 🎯 Próximos Passos Após Implementação

1. **Performance**: Adicionar cache para favoritos frequentes
2. **Analytics**: Rastrear receitas mais favoritadas
3. **Recommendations**: Sugerir receitas baseadas em favoritos
4. **Export**: Permitir exportar lista de favoritos

## 📞 Suporte

Se houver dúvidas durante a implementação, verifique:
1. Logs do backend
2. Network tab do navegador
3. Console do frontend
4. Esta documentação

O frontend está preparado para lidar com qualquer erro da API de forma elegante.
