import headerComponent from '@/components/header/headerComponent.vue';
import buttonBase from '@/components/common/buttonBase.vue';
import filtersBase from '@/components/common/filtersBase.vue';
import RecipeForm from '@/features/recipeAdd/components/formsAddBase.vue';
import AlertBox from '@/features/recipeAdd/components/alertBox.vue'

export default {
    install(app) {
        app.component('buttonBase', buttonBase);
        app.component('headerComponent', headerComponent);
        app.component('filtersBase', filtersBase);
        app.component('RecipeForm', RecipeForm);
        app.component('AlertBox', AlertBox);
        
    },
};