<template>
  <header>
    <h1 @click="goToPage('/recipelist')">CookBook</h1>
    <aside class="search responsive-search flex-center">
      <section class="input-container">
        <input
          type="text"
          class="search-input"
          placeholder="Pesquisar"
          @input="onSearchInput"
        />
        <img
          class="search-icon"
          src="@/assets/procurar.png"
          alt="Search Icon"
        />
      </section>
    </aside>
    <div class="nav-actions">
      <button
        @click="goToPage('/favorites')"
        class="favorites-link"
        title="Meus Favoritos"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        <span class="favorites-text">Favoritos</span>
      </button>
      <div class="user-menu">
        <img
          class="usuario"
          @click="toggleModal"
          src="@/assets/usuario.png"
          alt="usuario"
        />
        <div v-if="showModal" class="dropdown-menu">
          <button @click="logout">Sair</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AuthService from "@/utils/AuthService";

export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    goToPage(route) {
      // Se a rota for para uma página protegida, verifica autenticação
      if (route === "/recipelist" && !AuthService.isAuthenticated()) {
        // Se não estiver autenticado, redireciona para login
        this.$router.push("/");
        return;
      }
      this.$router.push(route);
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    logout() {
      localStorage.removeItem("userEmail");
      this.$router.push("/");
    },
    onSearchInput(event) {
      this.$emit("search", event.target.value);
    },
  },
};
</script>

<style scoped>
header {
  justify-content: space-between; /* Changed from center to space-between */
  align-items: center;
  padding: 1.5rem 5%;
  text-align: center;
  background: linear-gradient(270deg, #a12a09 -0.82%, #940d0d 98.56%);
  color: white;
  width: 100vw;
}

h1 {
  color: #fff;
  font-family: "Jost";
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.search {
  width: 100%;
}

.input-container {
  width: 80%;
  max-width: 39.4375rem;
}

.search-input {
  flex: 1;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 0.3125rem;
  background: white;
  border: none;
  width: 100%;
  height: 1.6875rem;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
}

.responsive-search {
  align-items: center;
  width: 100%;
}

.usuario {
  width: 25px;
  height: 25px;
}

.nav-actions {
  align-items: center;
  gap: 1rem;
}

.favorites-link {
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #940d0d;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  font-family: "Jura", sans-serif;
  font-weight: 600;
}

.favorites-link:hover {
  background-color: rgba(148, 13, 13, 0.1);
}

.favorites-text {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .favorites-text {
    display: none;
  }

  .nav-actions {
    gap: 0.5rem;
  }
}

.dropdown-menu {
  position: absolute;
  right: 0;
  background: white;
  border: none;
  border-radius: 0.3125rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-menu button {
  border-radius: 0.3125rem;
  border: none;
  padding: 10px 20px;
  width: 100%;
  text-align: left;
  color: #940d0d;
  font-family: "Jura";
  font-size: 0.8125rem;
  font-weight: 700;
}

.dropdown-menu button:hover {
  color: black;
}
</style>
