# 🚀 Guia Rápido - Testando CookBook

## Frontend Rodando em http://localhost:3000/

### ✅ Verificações Rápidas

#### 1. **Backend Status**
Abra um terminal e execute:
```bash
curl http://localhost:8080/receita/health
```
**Esperado:** Mensagem de sucesso com data/hora

#### 2. **Testar Upload de Imagens**
1. Acesse http://localhost:3000/
2. Faça login
3. Vá para "Adicionar Receita"
4. Adicione uma receita **com imagem**
5. Verifique se foi salva com sucesso

#### 3. **Testar Visualização de Receitas**
1. Na lista principal de receitas
2. Clique em "Ver" em qualquer receita
3. **Deve carregar sem erro 500** ✅
4. A imagem deve aparecer (não mais "fotoreceita")

#### 4. **Testar Componente de Imagem**
- **Receitas com imagem:** Devem mostrar a foto
- **Receitas sem imagem:** Devem mostrar placeholder elegante
- **Loading state:** Spinner durante carregamento

### 🔧 Se algo não funcionar:

#### Backend não responde:
```bash
# Iniciar backend local
mvn spring-boot:run

# Ou com Docker
docker-compose up -d --build
```

#### Frontend com problemas:
```bash
# Reinstalar dependências
npm install

# Iniciar desenvolvimento
npm run serve
```

#### Verificar logs detalhados:
- **Frontend:** Console do navegador (F12)
- **Backend:** Terminal onde está rodando
- **Docker:** `docker-compose logs api`

### 🎯 Funcionalidades Testadas

- ✅ **Upload de Imagens:** Corrigido para usar backend correto
- ✅ **Erro 500:** Resolvido com tratamento robusto
- ✅ **Componente RecipeImage:** Fallback elegante
- ✅ **CORS:** Configurado para localhost:3000
- ✅ **Validações:** Arquivos de imagem verificados

### 🚨 Indicadores de Sucesso

1. **Health Check:** `curl http://localhost:8080/receita/health` retorna sucesso
2. **Console limpo:** Sem erros 500 no Network tab
3. **Imagens carregam:** Placeholder quando não há imagem
4. **Navegação fluida:** Detalhes de receita carregam sem erro

### 📱 URLs de Teste

- **Frontend:** http://localhost:3000/
- **Backend Health:** http://localhost:8080/receita/health
- **API Base:** http://localhost:8080/receita/

Tudo deve estar funcionando perfeitamente agora! 🎉
