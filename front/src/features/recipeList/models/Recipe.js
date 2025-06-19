//estrutura da receita no banco de dados
export default class Recipe {
  constructor({ id, nome, modo_prep, ingredientes, tempo, qtdPessoas, custo, imagem }) {
    this.id = id;
    this.nome = nome;
    this.modo_prep = modo_prep;
    this.ingredientes = ingredientes;
    this.tempo = tempo;
    this.qtdPessoas = qtdPessoas; // Ensure this matches the template
    this.custo = custo;
    this.imagem = imagem;
  }
}
