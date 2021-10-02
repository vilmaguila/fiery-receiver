<template>
  <form @submit.prevent="submitForm" class="space-y-2">
    <div class="bg-gray-400 rounded-md shadow-md p-2 w-72 text-center">
      <label for="username"> Username (email) </label>
      <input type="text" v-model.trim="username" />
    </div>
    <div class="bg-gray-400 rounded-md shadow-md p-2 w-72 text-center">
      <label for="passwd"> Password </label>
      <input type="password" v-model.trim="password" />
    </div>
    <p v-if="!formisvalid">Please insert a valid username and password</p>
    <div class="space-x-2">
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
        {{ loginButtonCaption }}
      </button>
      <button
        type="button"
        mode="flat"
        class="bg-gray-200 p-2 rounded-md"
        @click="switchAuthMode"
      >
        {{ changeModeButtonCaption }}
      </button>
    </div>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { authStore } from "@/stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const formisvalid = ref(true);
    const mode = ref("login");
    const store = authStore();
    const router = useRouter();

    const submitForm = () => {
      formisvalid.value = true;
      if (
        username.value === "" ||
        password.value.length < 6 ||
        !username.value.includes("@")
      ) {
        formisvalid.value = false;
        return;
      }

      const authPayload = {
        email: username.value,
        password: password.value
      };

      if (mode.value === "login") {
        store.login(authPayload);
      } else {
        store.signup(authPayload);
      }
      // const redirectUrl = '/' + (router.query.redirect || 'profile')
      router.replace("/about");

      username.value = "";
      password.value = "";
    };

    const switchAuthMode = () => {
      if (mode.value === "login") {
        mode.value = "signup";
      } else {
        mode.value = "login";
      }
    };

    const loginButtonCaption = computed(() => {
      if (mode.value === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    });

    const changeModeButtonCaption = computed(() => {
      if (mode.value === "login") {
        return "Signup here";
      } else {
        return "Login instead";
      }
    });

    const isLoggedIn = computed(() => {
      return store.isAuthenticated;
    });

    return {
      submitForm,
      switchAuthMode,
      formisvalid,
      mode,
      username,
      password,
      loginButtonCaption,
      changeModeButtonCaption,
      isLoggedIn,
      store,
      router,
    };
  },
};
</script>
