<template>
  <div class="alert-overlay flex-center" v-if="show">
    <div class="alert-box">
      <div class="alert-content flex-center">
        <p>Receita Adicionada!</p>
        <button @click="handleClose">Página Inicial</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
      this.$router.push("/recipelist");
    },
  },
};
</script>

<style scoped>
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  z-index: 999;
}

p {
  color: #000;
  text-align: center;
  font-family: Jost;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
}

.alert-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 0.3125rem;
  background: #fff;
  box-shadow: 0px 0px 0px 100vw rgba(0, 0, 0, 0.25); /* Update this line */
  z-index: 1000;
  width: 15.875rem;
  height: 8.125rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
}
.alert-content {
  text-align: center;
  flex-direction: column;
}
button {
  background: transparent;
  border-radius: 0.3125rem;
  border: 1px solid #940d0d;
  color: #940d0d;
  font-family: Jockey One;
  font-size: 0.9375rem;
  font-weight: 400;
  margin-top: 1rem;
  padding: 0.2rem 0.5rem;
}

button:hover {
  border-radius: 0.3125rem;
  border: 1px solid #940d0d;
  background: #940d0d;
  color: #fff;
}
</style>
