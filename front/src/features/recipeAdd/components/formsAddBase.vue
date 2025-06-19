<template>
  <form @submit.prevent="submitForm" enctype="multipart/form-data">
    <nav class="filters-container">
      <filters-base @valueChange="custo = $event" @timeChange="tempo = $event" @serveChange="qtd_pessoas = $event" />
    </nav>
    <label for="name">Nome da Receita</label>
    <input type="text" id="input-name" class="add-input-nome" v-model="nome"/>
    
    <label for="ingrediente">Ingredientes</label>
    <textarea id="input-ingrediente" class="add-input-ingrediente" v-model="ingredientes"></textarea>
    
    <label for="preparo">Modo de Preparo</label>
    <textarea id="input-preparo" class="add-input-preparo" v-model="modo_prep"></textarea>
        
    <article class="add-select-containeimage">
      <input type="file" id="image-upload" class="image-upload" @change="handleImageUpload" />
      <label for="image-upload" class="image-upload-label">enviar imagem</label>
      <p v-if="imageName" class="image-name">{{ imageName }}</p>
    </article>
    <button type="submit" class="add-button-adicionar" :disabled="isFormIncomplete">ADICIONAR</button>
    <AlertBox :show="showAlert" @close="closeAlert" />
  </form>
</template>

<script>
import { useRecipeAddViewModel } from '../viewmodels/RecipeAddViewModel';
export default {
  setup() {
    const {
      nome,
      ingredientes,
      modo_prep,
      custo,
      tempo,
      qtd_pessoas,
      imageName,
      isFormIncomplete,
      handleImageUpload,
      submitForm,
      showAlert,
      closeAlert, 
    } = useRecipeAddViewModel();

    const enhancedHandleImageUpload = () => {
      const file = document.querySelector('#image-upload').files[0];
      handleImageUpload({ target: { files: [file] } });
      console.log('Imagem selecionada:', file);
    };

    return {
      nome,
      ingredientes,
      modo_prep,
      custo,
      tempo,
      qtd_pessoas,
      imageName,
      isFormIncomplete,
      handleImageUpload: enhancedHandleImageUpload,
      submitForm,
      showAlert,
      closeAlert,
    };
  },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    width: 80%; 
    margin: 0 auto; 
    padding-bottom: 5em;
    position: relative; 
}

.filters-container {
    display: flex;
    justify-content: center;
    width: 100%;
}

label {
    margin-top: 0.5rem;
    margin-bottom: 0rem;
    color: #000;
    font-family: "Jost";
    font-size: 0.9rem;
    font-weight: 700;
}

.add-input-nome, .add-input-ingrediente, .add-input-preparo {
    border-radius: 0.3125rem;
    background: transparent;
    border: 1px solid #940D0D;
}

.add-input-nome{
    width: 100%; 
    height: 5vh;
    padding:0.5rem;
}

.add-input-preparo, .add-input-ingrediente {
    width: 100%;
    height: 10vh;
    padding:0.5rem;
}

.add-button-adicionar{
    border-radius: 0.3125rem;
    background: linear-gradient(90deg, #A12A09 0%, #940D0D 100%);
    width: 6.1875rem;
    height: 1.75rem;
    border:none;
    color: #FFF;
    font-family: "Jockey One";
    font-size: 0.9375rem;
    position: absolute; 
    bottom: 1rem; 
    left: 50%; 
    transform: translateX(-50%); 
    cursor: pointer;
}

.add-button-adicionar:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.image-upload {
  display: none;
  width: 6.1875rem;
  height: 1.5625rem;
}

.image-upload-label {
  width: 8rem; 
  height: 2rem; 
  border-radius: 0.3125rem;
  border: 1px solid #940D0D;
  cursor: pointer;
  color: #000;
  font-family: 'Jost'; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-select-containeimage {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  width: 8rem;
  margin-left: 0; 
}

.image-name {
  font-size: 0.6rem;
  font-family: 'Jura';
  color: #000;
  display: flex;
  justify-content: center;
}
</style>
