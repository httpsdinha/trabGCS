// Este arquivo simula as respostas da API de favoritos
// para permitir o desenvolvimento e teste da funcionalidade no frontend
// Remova este arquivo quando a API do backend estiver pronta

const MOCK_ENABLED = true; // Altere para false quando a API estiver pronta

// Simula armazenamento local de favoritos
let mockFavorites = [];

export const mockFavoriteAPI = {
  // Simula adicionar favorito
  addFavorite: (email, receitaId) => {
    if (!MOCK_ENABLED) return null;
    
    const favorite = { email, receitaId, id: Date.now() };
    mockFavorites.push(favorite);
    console.log('Mock: Favorito adicionado', favorite);
    return Promise.resolve({ success: true, message: 'Favorito adicionado com sucesso' });
  },

  // Simula remover favorito
  removeFavorite: (email, receitaId) => {
    if (!MOCK_ENABLED) return null;
    
    mockFavorites = mockFavorites.filter(
      fav => !(fav.email === email && fav.receitaId == receitaId)
    );
    console.log('Mock: Favorito removido', { email, receitaId });
    return Promise.resolve({ success: true, message: 'Favorito removido com sucesso' });
  },

  // Simula verificar se é favorito
  isFavorite: (email, receitaId) => {
    if (!MOCK_ENABLED) return null;
    
    const isFav = mockFavorites.some(
      fav => fav.email === email && fav.receitaId == receitaId
    );
    console.log('Mock: Verificando favorito', { email, receitaId, isFav });
    return Promise.resolve(isFav);
  },

  // Simula listar favoritos
  getFavorites: (email) => {
    if (!MOCK_ENABLED) return null;
    
    const userFavorites = mockFavorites.filter(fav => fav.email === email);
    console.log('Mock: Listando favoritos para', email, userFavorites);
    
    // Retorna dados de receitas mockadas para os favoritos
    const mockRecipes = userFavorites.map(fav => ({
      id: fav.receitaId,
      nome: `Receita Favorita ${fav.receitaId}`,
      custo: 'Médio',
      tempo: '30-60min',
      qtdPessoas: 4,
      imagem: 'icone.jpg',
      modo_prep: 'Modo de preparo da receita favorita...',
      ingredientes: 'Ingrediente 1, Ingrediente 2, Ingrediente 3'
    }));
    
    return Promise.resolve(mockRecipes);
  }
};

export default mockFavoriteAPI;
