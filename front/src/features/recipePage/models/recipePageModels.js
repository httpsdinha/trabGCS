import axiosInstance from '@/plugins/axios';

class Recipe {
    constructor(nome, modo_prep, ingredientes, tempo, qtd_pessoas, custo, imagem) {
        this.nome = nome;
        this.modo_prep = modo_prep;
        this.ingredientes = ingredientes;
        this.tempo = tempo;
        this.qtd_pessoas = qtd_pessoas;
        this.custo = custo;
        this.imagem = imagem;
    }

    static async getRecipe(recipeId) {
        try {
            const response = await axiosInstance.get(`/receita/${recipeId}`);
            return {
                ...response.data,
                qtdPessoas: response.data.qtdPessoas || response.data.qtd_pessoas // Ensure compatibility with API response
            };
        } catch (error) {
            console.error('Error fetching recipe:', error);
            if (error.response?.status === 404) {
                throw new Error('Receita não encontrada');
            } else if (error.response?.status >= 500) {
                throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
            } else {
                throw new Error('Erro ao carregar receita. Verifique sua conexão.');
            }
        }
    }
}

export { Recipe };
