<template>
  <section class="right flex-center">
    <button class="next" @click="goToPage">ENTRAR</button>
  </section>
</template>

<script>
export default {
  name: "RightComponent",
  methods: {
    goToPage() {
      this.$emit("expand");
    },
  },
};
</script>

<style scoped>
.right {
  background-image: url("@/assets/teste-1.jpeg");
  background-size: cover;
  background-position: center;
  width: 50%;
  flex-direction: column;
}

.next {
  background: linear-gradient(90deg, #a12a09 0%, #940d0d 50%);
  box-shadow: -6px 8px 23.399999618530273px 3px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: 1px rgba(0, 0, 0, 0.26) solid;
  color: #fff;
  font-size: 40px;
  font-family: "Imprima", sans-serif;
  font-weight: 400;
  word-wrap: break-word;
  padding: 10px 20px;
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 13.8125rem;
  height: 4rem;
  flex-shrink: 0;
}

.next:hover {
  background: #a12a09;
}
</style>
