<template>
  <form @submit.prevent="submitForm" class="space-y-2">
    <div class="bg-gray-400 rounded-md shadow-md p-2 w-72 text-center">
      <label for="username"> Username </label>
      <input type="text" v-model="username" />
    </div>
    <div class="bg-gray-400 rounded-md shadow-md p-2 w-72 text-center">
      <label for="passwd"> Password </label>
      <input type="password" v-model="password" />
    </div>
    <button
      class="
        bg-gray-400
        rounded-md
        shadow-md
        cursor-pointer
        p-2
        hover:bg-gray-600
      "
    >
      Submit
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const username = ref('');
    const password = ref('');

    const submitForm = () => {
      console.log(['username:', ' ', username.value].join(''));
      console.log(['password:', ' ', password.value].join(''));
      username.value = ''
      password.value = ''
    };
    return {
      submitForm,
      username,
      password,
    };
  },
};
</script>
