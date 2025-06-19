<template>
  <header>
    <h1 @click="goToPage('/')">CookBook</h1>
    <aside class="search responsive-search">
      <section class="input-container">
        <input type="text" class="search-input" placeholder="Pesquisar" @input="onSearchInput" />
        <img class="search-icon" src="@/assets/procurar.png" alt="Search Icon" />
      </section>
    </aside>
    <div class="user-menu">
      <img class="usuario" @click="toggleModal" src="@/assets/usuario.png" alt="usuario">
      <div v-if="showModal" class="dropdown-menu">
        <button @click="logout">Sair</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    goToPage(route) {
      this.$router.push(route);
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    logout() {
      localStorage.removeItem('userEmail');
      this.$router.push('/');
    },
    onSearchInput(event) {
      this.$emit('search', event.target.value);
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
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
  font-family: 'Jost';
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
}

.search {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.input-container {
  position: relative;
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
  cursor: pointer;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
}

.responsive-search {
  display: flex;
  align-items: center;
  width: 100%;
}

.usuario {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.user-menu {
  position: relative;
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
  cursor: pointer;
  width: 100%;
  text-align: left;
  color: #940D0D;
  font-family: "Jura";
  font-size: 0.8125rem;
  font-weight: 700;
}

.dropdown-menu button:hover {
  color: black;
}
</style>