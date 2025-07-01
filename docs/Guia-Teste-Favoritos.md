# Guia de Teste - Funcionalidade de Favoritos

## 🧪 Como Testar a Funcionalidade

### Pré-requisitos
1. Backend rodando em `http://localhost:8080`
2. Frontend rodando em `http://localhost:3000`
3. Usuário logado no sistema

### Passos para Teste

#### 1. Testar Botão de Favorito nos Cards
1. Acesse a página de lista de receitas (`/recipelist`)
2. Observe os ícones de coração nos cards das receitas
3. Clique em um coração vazio - deve ficar preenchido
4. Clique novamente - deve voltar a ficar vazio
5. Verifique no console do navegador os logs da API mock

#### 2. Testar Botão de Favorito na Página de Detalhes
1. Clique em "Ver" em qualquer receita
2. Na página de detalhes, observe o botão de coração ao lado do botão de editar
3. Teste favoritar/desfavoritar
4. Volte para a lista e verifique se o status está sincronizado

#### 3. Testar Página de Favoritos
1. Clique em "Favoritos" no header (ícone de coração)
2. Se não houver favoritos: veja a mensagem elegante e botão "Explorar Receitas"
3. Se houver favoritos: veja a lista de receitas favoritadas
4. Teste remover favoritos diretamente da página de favoritos

#### 4. Testar Responsividade
1. **Desktop**: Todos os elementos visíveis
2. **Mobile**: Texto "Favoritos" no header deve ficar oculto
3. **Tablet**: Layout deve se adaptar apropriadamente

### Casos de Teste Específicos

#### ✅ Casos de Sucesso
- Adicionar favorito em card da lista
- Adicionar favorito na página de detalhes
- Remover favorito de qualquer local
- Navegar para página de favoritos
- Visualizar lista de favoritos
- Botão "Explorar Receitas" quando lista vazia

#### 🔄 Sincronização
- Status de favorito sincronizado entre lista e detalhes
- Remoção de favorito atualiza lista de favoritos
- Estados visuais consistentes

#### 📱 Responsividade
- Layout funcional em mobile
- Ícones apropriados para touch
- Texto escondido adequadamente

### Debug e Troubleshooting

#### Verificar Console do Navegador
```javascript
// Logs esperados com API mock ativa:
// "Mock: Favorito adicionado {email: ..., receitaId: ...}"
// "Mock: Favorito removido {email: ..., receitaId: ...}"
// "Mock: Verificando favorito {email: ..., receitaId: ..., isFav: true/false}"
```

#### Verificar LocalStorage
- `userEmail` deve estar presente
- Deve conter o email do usuário logado

#### Verificar Network (quando backend estiver pronto)
- POST `/favorito/adicionar`
- DELETE `/favorito/remover`
- GET `/favorito/listar`
- GET `/favorito/verificar`

### Estados de Erro para Testar

#### Sem Internet/Backend Offline
- Sistema deve usar API mock automaticamente
- Funcionalidade deve continuar operando
- Logs de fallback devem aparecer

#### Usuário Não Logado
- userEmail null no localStorage
- Sistema deve falhar graciosamente

#### Receita Inexistente
- IDs inválidos devem ser tratados
- Erros não devem quebrar a interface

### Performance

#### Verificar Loading States
- Botões devem mostrar estado de carregamento
- Múltiplos cliques devem ser prevenidos
- Feedback visual adequado

### Melhorias Futuras Identificadas

Durante o teste, observe:
- Tempos de resposta
- Necessidade de cache
- UX de loading
- Possíveis melhorias visuais

### Problemas Conhecidos

#### API Mock Limitações
- Dados perdidos ao recarregar página
- Não persiste entre sessões
- Dados de receitas simulados

#### Backend Integration
- Aguardando implementação dos endpoints
- Estrutura de dados pode precisar ajustes
- CORS configuration necessária

### Checklist de Teste

- [ ] Favoritar receita na lista
- [ ] Favoritar receita na página de detalhes
- [ ] Desfavoritar receita
- [ ] Acessar página de favoritos
- [ ] Ver lista de favoritos
- [ ] Remover favorito da página de favoritos
- [ ] Testar em mobile
- [ ] Testar sem backend
- [ ] Verificar logs do console
- [ ] Testar navegação

### Relatório de Bugs

Documente bugs encontrados:
1. **Localização**: Onde o bug ocorre
2. **Passos**: Como reproduzir
3. **Esperado**: Comportamento esperado
4. **Atual**: Comportamento atual
5. **Console**: Erros no console

### Conclusão

A funcionalidade de favoritos está implementada e pronta para uso com o sistema mock. Quando o backend estiver pronto, apenas desative o mock em `mockAPI.js` e a integração será automática.
