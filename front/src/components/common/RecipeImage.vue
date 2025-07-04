<template>
  <div class="recipe-image-container">
    <img 
      v-if="imageUrl && !hasError"
      :src="imageUrl" 
      :alt="altText"
      :class="imageClass"
      @load="onImageLoad"
      @error="onImageError"
      :style="imageStyle"
    />
    <div 
      v-else 
      class="image-placeholder"
      :class="placeholderClass"
      :style="imageStyle"
    >
      <div class="placeholder-icon">
        <img src="@/assets/chapeu-de-chef.png" alt="Ícone de receita" class="chef-icon" />
      </div>
      <p class="placeholder-text">{{ placeholderText }}</p>
    </div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script>
import ImageService from '@/services/ImageService';

export default {
  name: 'RecipeImage',
  props: {
    imageName: {
      type: String,
      default: null
    },
    altText: {
      type: String,
      default: 'Imagem da receita'
    },
    width: {
      type: String,
      default: '9.375rem'
    },
    height: {
      type: String,
      default: '9.375rem'
    },
    borderRadius: {
      type: String,
      default: '0.5rem'
    },
    placeholderText: {
      type: String,
      default: 'Imagem não disponível'
    },
    imageClass: {
      type: String,
      default: 'recipe-img'
    },
    placeholderClass: {
      type: String,
      default: 'recipe-placeholder'
    }
  },
  data() {
    return {
      imageUrl: null,
      hasError: false,
      isLoading: true
    };
  },
  computed: {
    imageStyle() {
      return {
        width: this.width,
        height: this.height,
        borderRadius: this.borderRadius
      };
    }
  },
  async mounted() {
    await this.loadImage();
  },
  watch: {
    imageName: {
      async handler() {
        await this.loadImage();
      },
      immediate: false
    }
  },
  methods: {
    async loadImage() {
      this.isLoading = true;
      this.hasError = false;
      
      if (!this.imageName) {
        this.imageUrl = null;
        this.hasError = true;
        this.isLoading = false;
        return;
      }

      try {
        // Primeiro, verifica se a imagem existe
        const exists = await ImageService.imageExists(this.imageName);
        
        if (exists) {
          this.imageUrl = ImageService.getImageUrl(this.imageName);
        } else {
          console.warn(`Imagem não encontrada no servidor: ${this.imageName}`);
          this.hasError = true;
          this.imageUrl = null;
        }
      } catch (error) {
        console.error('Erro ao carregar imagem:', error);
        this.hasError = true;
        this.imageUrl = null;
      } finally {
        this.isLoading = false;
      }
    },
    onImageLoad() {
      this.isLoading = false;
      this.hasError = false;
    },
    onImageError() {
      console.error(`Falha ao carregar imagem: ${this.imageUrl}`);
      this.hasError = true;
      this.isLoading = false;
      this.imageUrl = null;
    }
  }
};
</script>

<style scoped>
.recipe-image-container {
  position: relative;
  display: inline-block;
}

.recipe-img {
  object-fit: cover;
  border: 1px solid #ddd;
  transition: opacity 0.3s ease;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  color: #6c757d;
  font-family: 'Jost', sans-serif;
  position: relative;
}

.placeholder-icon {
  margin-bottom: 0.5rem;
}

.chef-icon {
  width: 2rem;
  height: 2rem;
  opacity: 0.5;
  filter: grayscale(100%);
}

.placeholder-text {
  font-size: 0.8rem;
  text-align: center;
  margin: 0;
  padding: 0 0.5rem;
  line-height: 1.2;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
}

.loading-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #940D0D;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive design */
@media (max-width: 768px) {
  .placeholder-text {
    font-size: 0.7rem;
  }
  
  .chef-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
