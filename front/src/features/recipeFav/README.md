# Funcionalidade de Favoritos - Frontend

Esta implementação adiciona a funcionalidade completa de favoritos ao CookBook, permitindo que os usuários marquem receitas como favoritas e visualizem sua lista pessoal.

## 🎯 Funcionalidades Implementadas

### ✅ Critérios de Aceite Atendidos

1. **Ícone de favorito nos cards das receitas**
   - Botão de coração em cada RecipeCard
   - Animação ao adicionar/remover favoritos
   - Feedback visual do status (preenchido/vazio)

2. **Ícone de favorito na página de detalhes**
   - Botão de favorito na página RecipePage
   - Posicionado junto ao botão de editar

3. **Página "Meus Favoritos"**
   - Nova página dedicada aos favoritos
   - Lista todas as receitas favoritadas
   - Interface vazia elegante quando não há favoritos
   - Botão para explorar receitas

4. **Navegação integrada**
   - Link para favoritos no header principal
   - Ícone responsivo (texto oculto em mobile)

## 📁 Estrutura de Arquivos Criados

```
front/src/features/recipeFav/
├── components/
│   └── FavoriteButton.vue          # Botão de favorito reutilizável
├── models/
│   └── FavoriteModel.js           # Modelo para interação com API
├── viewmodels/
│   └── FavoriteViewModel.js       # Lógica de negócio
├── views/
│   └── FavoritesPage.vue          # Página de listagem de favoritos
└── README.md
```

## 🔧 Arquivos Modificados

- `RecipeCard.vue` - Adicionado botão de favorito
- `RecipePage.vue` - Adicionado botão de favorito na página de detalhes
- `headerComponent.vue` - Adicionado link para favoritos
- `router.js` - Nova rota para página de favoritos
- `globalComponents.js` - Registro do componente FavoriteButton

## 🎨 Design e UX

### Componente FavoriteButton
- Ícone de coração SVG responsivo
- Estados visuais claros (preenchido/vazio)
- Animação suave ao favoritar
- Tooltip informativo
- Design consistente com o resto da aplicação

### Página de Favoritos
- Layout limpo e organizado
- Mensagem amigável quando vazia
- Reutiliza RecipeCard para consistência
- Responsiva para mobile
- Tratamento de erros elegante

### Header Navigation
- Ícone intuitivo de coração
- Texto "Favoritos" (oculto em mobile)
- Integração visual harmoniosa

## 🔌 Integração com Backend

### API Configurada para Backend
- Todas as chamadas apontam para `http://localhost:8080`
- Tratamento de erros robusto
- Feedback claro para usuário

### Endpoints Necessários
```javascript
POST   /favorito/adicionar    # Adicionar favorito
DELETE /favorito/remover      # Remover favorito
GET    /favorito/listar       # Listar favoritos do usuário
GET    /favorito/verificar    # Verificar se é favorito
```

### Estrutura de Dados
```javascript
// Adicionar/Remover favorito
{
  email: "usuario@email.com",
  receitaId: 123
}

// Resposta de favoritos
[
  {
    id: 123,
    nome: "Nome da Receita",
    custo: "Médio",
    tempo: "30-60min",
    qtdPessoas: 4,
    imagem: "imagem.jpg",
    // ... outros campos da receita
  }
]
```

## 🚀 Como Usar

### 1. Favoritar uma Receita
- Clique no ícone de coração em qualquer RecipeCard
- Ou use o botão na página de detalhes da receita
- Feedback visual imediato

### 2. Acessar Favoritos
- Clique em "Favoritos" no header
- Ou navegue para `/favorites`

### 3. Remover Favoritos
- Clique novamente no ícone de coração
- Receita será removida da lista de favoritos

## 🛡️ Tratamento de Erros

### Estados de Erro Cobertos
- **API não disponível (404)**: Mensagem específica informando que funcionalidade ainda não está disponível
- **Erro de rede**: Instrução para verificar conexão
- **Outros erros**: Mensagem genérica com opção de tentar novamente

### Feedback Visual
- Tela de erro com ícone e mensagem clara
- Botão "Tentar Novamente" para refazer requisições
- Alertas informativos nos botões de favorito

## 📱 Responsividade

- **Desktop**: Todos os elementos visíveis com texto
- **Tablet**: Layout otimizado, ícones mantidos
- **Mobile**: Texto "Favoritos" oculto, apenas ícone

## 🎯 Próximos Passos

1. **Backend**: Implementar endpoints conforme documentação
2. **Testes**: Adicionar testes unitários
3. **Performance**: Implementar cache de favoritos
4. **Filtros**: Adicionar filtros na página de favoritos

## 🛠️ Desenvolvimento

### Instalar Dependências
```bash
cd front
npm install
```

### Executar em Desenvolvimento
```bash
npm run serve
```

### Backend Requerido
A funcionalidade requer que o backend esteja rodando em `http://localhost:8080` com os endpoints de favoritos implementados.

## 📋 Checklist de Implementação

- [x] Botão de favorito nos cards
- [x] Botão de favorito na página de detalhes
- [x] Página de favoritos funcional
- [x] Navegação no header
- [x] Design responsivo
- [x] Animações e feedback visual
- [x] Documentação da API
- [x] Tratamento de erros robusto
- [x] Estados de loading
- [x] Integração com backend na porta 8080

## 🤝 Integração com Backend

Ver `docs/API-Favoritos.md` para especificações completas dos endpoints necessários.

A implementação está pronta para consumir a API do backend assim que os endpoints estiverem disponíveis.
