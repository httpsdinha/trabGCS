<template>
  <section class="left" :class="{ expanded: expanded }">
    <div class="text">
      <h1 @click="goToPage('/')" >CookBook</h1>
      <h2>Cook que é bom nada...</h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LeftComponent',
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
      goToPage(route) {
        this.$router.push(route);
      },
    },
};
</script>

<style scoped>
.left {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background: linear-gradient(267deg, #A12A09 0%, #940D0D 100%);
  transition: width 0.5s;
}

.left.expanded {
  width: 100%;
}

.text {
  color: white;
  word-wrap: break-word;
  font-family: Jost;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin-bottom: 3rem;
  margin-left: 3rem;
}

h1 {
  font-size: 96px;
  font-weight: 400;
  margin-bottom: 0px;
  margin-left: 2rem;
  cursor: pointer;
}

h2 {
  font-family: 'Josefin Slab';
  font-style: italic;
  font-size: 24px;
  font-weight: 700;
  margin-top: 0px;
  align-self: flex-end;
}
</style>