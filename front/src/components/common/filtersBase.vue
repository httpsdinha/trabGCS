<template>
  <section class="filtersall">
    <articles class="select-container">
      <img src="@/assets/valor.png" alt="Valor Icon" class="select-icon" />
      <select class="filters" ref="customSelect" @change="onValueChange">
        <option value="none">Custo</option>
        <option value="Alto">Alto</option>
        <option value="Médio">Médio</option>
        <option value="Baixo">Baixo</option>
      </select>
    </articles>
    <articles class="select-container">
      <img src="@/assets/tempo.png" alt="Tempo Icon" class="select-icon" />
      <select class="filters" @change="onTimeChange">
        <option value="none">Tempo</option>
        <option value="10-30min">10-30min</option>
        <option value="30-60min">30-60min</option>
        <option value="+60min">+60min</option>
      </select>
    </articles>
    <articles class="select-container">
      <img src="@/assets/serve.png" alt="Serve Icon" class="select-icon" />
      <select class="filters" @change="onServeChange">
        <option value="none">Serve</option>
        <option value="1-2 pessoas">1-2 pessoas</option>
        <option value="3-5 pessoas">3-5 pessoas</option>
        <option value="+6 pessoas">+6 pessoas</option>
      </select>
    </articles>
</section>
</template>

<script>
export default {
  name: "FiltersBase",
  methods: {
    onValueChange(event) {
      this.$emit('valueChange', event.target.value);
    },
    onTimeChange(event) {
      this.$emit('timeChange', event.target.value);
    },
    onServeChange(event) {
      this.$emit('serveChange', event.target.value);
    },
  },
};
</script>

<style scoped>
.filtersall {
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 30rem;
  max-width: 100%;
  cursor: pointer;
}

.select-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.select-icon {
  margin: 5px;
  position: absolute;
  left: 10px;
  width: 16px;
  height: 16px;
  pointer-events: none;
  cursor: pointer;
}

.filters {
  font-family: 'Jura';
  width: 9.0625rem;
  height: 1.5625rem;
  padding-left: 35px;
  border-radius: 0.3125rem;
  background: #fff;
  border: 1px solid #940D0D;
  margin: 0.5rem;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.select-container::after {
  content: '';
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-image: url('@/assets/arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;

}
</style>
