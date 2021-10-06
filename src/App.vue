<script setup>
import { ref } from "vue";
import Navigator from "./components/Navigator.vue";
import { authStore } from "@/stores/auth";

const store = authStore();
let counter = ref(0);

setInterval(() => {
  counter.value++;
}, 1000);

store.autoLogin();
</script>

<template>
  <Navigator />
  <div>
    <header class="bg-white shadow" v-if="$route.meta.title">
      <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1
          @click="counter = 0"
          class="text-3xl font-bold leading-tight text-gray-900"
        >
          {{ $route.meta.title }} / {{ counter }}
        </h1>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>
