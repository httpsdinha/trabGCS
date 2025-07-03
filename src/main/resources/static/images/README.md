# Diretório de Imagens de Receitas

Este diretório armazena as imagens das receitas enviadas pelos usuários.

## Estrutura

- As imagens são salvas com nomes únicos (UUID) para evitar conflitos
- Formatos suportados: JPG, JPEG, PNG, GIF, WebP
- Tamanho máximo: 5MB por imagem

## Acesso

As imagens são servidas através do endpoint:
```
GET /receita/imagem/{filename}
```

## Limpeza

Considere implementar uma rotina de limpeza para remover imagens orfãs (sem receita associada).

## Backup

Este diretório deve ser incluído em backups regulares do sistema.
