<template>
  <button :class="computedClass" :style="computedStyle" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%",
    },
    maxWidth: {
      type: String,
      default: "7.0625rem",
    },
    height: {
      type: String,
      default: "1.5625rem",
    },
  },
  computed: {
    computedClass() {
      return {
        "button-base": true,
      };
    },
    computedStyle() {
      return {
        width: this.width,
        maxWidth: this.maxWidth,
        height: this.height,
      };
    },
  },
};
</script>

<style scoped>
.button-base {
  border: none;
  background: linear-gradient(90deg, #a12a09 0%, #940d0d 100%);
  font-family: "Jost";
  color: #fff;
  border-radius: 0.3125rem;
}

.button-base:hover {
  background: #a12a09;
}
</style>
