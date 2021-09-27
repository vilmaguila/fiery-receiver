<template>
  <div class="flex gap-2 justify-center p-2">
    <router-link class="bg-gray-400 p-2 rounded-lg" to="/"> Home </router-link>
    <router-link class="bg-gray-400 p-2 rounded-lg" to="/about">
      ABOUT</router-link
    >
    <router-link class="bg-gray-400 p-2 rounded-lg" to="/track">
      TRACK
    </router-link>
    <router-link
      v-if="!isLoggedIn"
      class="bg-gray-400 p-2 rounded-lg"
      to="/auth"
    >
      LOGIN
    </router-link>
    <router-link v-else class="bg-gray-400 p-2 rounded-lg" to="/profile">
      PROFILE
    </router-link>
    <button
      v-if="isLoggedIn"
      class="hover:bg-gray-500 p-2 rounded-lg"
      @click="logout()"
    >
      Logout
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import { authStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = authStore();
    const router = useRouter();

    const isLoggedIn = computed(() => {
      return store.isAuthenticated;
    });

    const logout = () => {
      store.logout();
      router.replace("/");
    };

    return {
      store,
      router,
      isLoggedIn,
      logout,
    };
  },
};
</script>
