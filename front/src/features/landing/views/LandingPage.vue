<template>
  <main class="landing-page">
    <LeftComponent class="left-half" :expanded="showLogin" />
    <RightComponent class="right-half" @expand="expandLeft" v-if="!showLogin" />
    <LoginComponent v-if="showLogin" class="login-component" />
  </main>
</template>

<script>
import LeftComponent from '@/features/landing/components/LeftComponent.vue';
import RightComponent from '@/features/landing/components/RightComponent.vue';
import LoginComponent from '@/features/landing/components/LoginComponent.vue';
import LandingPageViewModel from '@/features/landing/viewmodels/LandingPageViewModel.js';

export default {
  name: 'LandingPage',
  components: {
    LeftComponent,
    RightComponent,
    LoginComponent,
  },
  data() {
    return LandingPageViewModel.data();
  },
  methods: LandingPageViewModel.methods,
  created() {
    LandingPageViewModel.created.call(this);
  },
};
</script>

<style scoped>
.landing-page {
  display: flex;
  justify-content: space-between;
  width: 100dvw;
  height: 100dvh;
  position: relative;
}

.left-half {
  width: 40%;
  transition: width 0.5s;
}

.left-half[expanded] {
  width: 100%;
}

.right-half {
  width: 60%;
}

.login-component {
  width: 25rem;
  height: 25.9375rem;
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

@media (min-width: 1600px) {
  .left-half {
    width: 50%;
  }

  .right-half {
    width: 50%;
  }

  .login-component {
    width: 35rem;
    height: 35rem;
    left: 75%;
  }
}
</style>

