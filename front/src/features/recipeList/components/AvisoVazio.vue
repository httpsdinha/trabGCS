<template>
    <div class="alert-empty">
        <div class="alert-empty-icon">
            <img src="@/assets/chapeu-de-chef.png" alt="fotoaviso" class="foto-aviso">
        </div>
        <div class="alert-empty-title">
            <h2 class="aviso-title">Nenhuma receita encontrada</h2>
            <p class="aviso-text">Você ainda não possui receitas cadastradas. Que tal começar agora?</p>
            <button class="button-aviso" @click="goToPage('/add')">Adicionar Receita</button>
        </div>

    </div>
</template>

<script>    
    export default {
        name: 'AvisoVazio',
        data() {
            return {
                imageSrc: require('@/assets/chapeu-de-chef.png')
            };
        },
        methods: {
            goToPage(page) {
                this.$router.push(page);
            }
        }
    }
</script>

<style scoped>

.alert-empty {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 30rem;
    width: 100%;
    height: 100%;
    padding-top: 5rem;
    padding-bottom: 0;
}

.foto-aviso {
    width: 10rem;
    height: 10rem;
    margin: 1.25rem auto;
}

.aviso-text, .aviso-title {
    color: #919191;
}

.button-aviso {
    margin-top: 32px;
    width: 10rem;
    height: 2.5rem;
    background: linear-gradient(90deg, #A12A09 0%, #940D0D 100%);
    color: #FFF;
    border: none;
    border-radius: 0.3125rem;
    font-family: "Jost";
    cursor: pointer;
}

</style>


