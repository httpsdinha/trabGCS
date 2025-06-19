export default class Recipe {
  constructor({ nome, ingredientes, modo_prep, custo, tempo, qtd_pessoas, imagem = null, email }) {
    this.nome = nome;
    this.ingredientes = Array.isArray(ingredientes) ? ingredientes : [];
    this.modo_prep = modo_prep;
    this.custo = custo;
    this.tempo = tempo;
    this.qtd_pessoas = qtd_pessoas;
    this.imagem = imagem;
    this.email = email;
  }

  isComplete() {
    return (
      this.nome &&
      this.ingredientes.length > 0 &&
      this.modo_prep &&
      this.custo !== '0' &&
      this.tempo !== '0' &&
      this.qtd_pessoas !== '0'
    );
  }

  setImage(imageFile) {
    this.imagem = imageFile;
  }

  toFormData() {
    const formData = new FormData();
    formData.append('nome', this.nome);
    formData.append('ingredientes', JSON.stringify(this.ingredientes)); // Serializa para JSON
    formData.append('modo_prep', this.modo_prep);
    formData.append('custo', this.custo);
    formData.append('tempo', this.tempo);
    formData.append('qtd_pessoas', this.qtd_pessoas);
    formData.append('email', this.email); 
    if (this.imagem) {
      formData.append('imagem', this.imagem);
    }
    
    // Log FormData para debug
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    return formData;
  }
}
