<template>
  <h1>This is the login page {{ greeting }}</h1>
  <the-user-auth></the-user-auth>
</template>

<script>
import TheUserAuth from "../components/TheUserAuth.vue";
import { ref } from "vue";

export default {
  components: {
    TheUserAuth,
  },
  setup() {
    const greeting = ref(import.meta.env.VITE_GREETING);

    return {
      greeting,
    };
  },
};
</script>
