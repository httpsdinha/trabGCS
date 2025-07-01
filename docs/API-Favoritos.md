# API de Favoritos - Documentação para Backend

Este documento especifica os endpoints que precisam ser implementados no backend para suportar a funcionalidade de favoritos.

## Endpoints Necessários

### 1. Adicionar Favorito
**POST** `/favorito/adicionar`

**Request Body:**
```json
{
  "email": "usuario@email.com",
  "receitaId": 123
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Favorito adicionado com sucesso"
}
```

**Response Error (400/500):**
```json
{
  "success": false,
  "message": "Erro ao adicionar favorito"
}
```

---

### 2. Remover Favorito
**DELETE** `/favorito/remover`

**Request Body:**
```json
{
  "email": "usuario@email.com",
  "receitaId": 123
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Favorito removido com sucesso"
}
```

---

### 3. Listar Favoritos
**GET** `/favorito/listar?email=usuario@email.com`

**Response Success (200):**
```json
[
  {
    "id": 123,
    "nome": "Nome da Receita",
    "custo": "Médio",
    "tempo": "30-60min",
    "qtdPessoas": 4,
    "imagem": "nome-imagem.jpg",
    "modo_prep": "Modo de preparo...",
    "ingredientes": "Ingrediente 1, Ingrediente 2"
  }
]
```

---

### 4. Verificar se é Favorito
**GET** `/favorito/verificar?email=usuario@email.com&receitaId=123`

**Response Success (200):**
```json
true
```
ou
```json
false
```

## Estrutura de Banco Sugerida

Sugestão de tabela para armazenar favoritos:

```sql
CREATE TABLE favoritos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    receita_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (receita_id) REFERENCES receita(id),
    UNIQUE KEY unique_favorite (usuario_id, receita_id)
);
```

## Headers CORS

Certifique-se de que os endpoints incluam os headers CORS apropriados:
```java
@CrossOrigin(origins = "http://localhost:3000")
```

## Notas de Implementação

1. **Validação**: Sempre validar se o usuário e a receita existem antes de adicionar/remover favoritos
2. **Duplicação**: Evitar duplicação de favoritos para o mesmo usuário/receita
3. **Performance**: Considerar indexar as colunas usuario_id e receita_id
4. **Relacionamentos**: Manter integridade referencial com as tabelas usuario e receita
