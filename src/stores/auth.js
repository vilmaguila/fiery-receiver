import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
  state: () => ({
    userId: null,
    token: null,
    tokenExpiration: null,
  }),
  getters: {
    getToken: (state) => {
      return state.token;
    },
    getUserId: (state) => {
      return state.userId;
    },
    isAuthenticated: (state) => {
      return !!state.token;
    },
  },
  actions: {
    async signup(username, password) {
      const response = await fetch(
        "http://localhost:1337/auth/local/register",
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            email: username,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to sign up");
        throw error;
      }
      console.log(responseData);
      this.$patch((state) => {
        (state.userId = responseData.user), (state.token = responseData.jwt);
      });
    },
    async login(username, password) {
      const response = await fetch("http://localhost:1337/auth/local", {
        method: "POST",
        body: JSON.stringify({
          identifier: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to authenticate"
        );
        throw error;
      }
      console.log(responseData);
      this.$patch((state) => {
        (state.userId = responseData.user), (state.token = responseData.jwt);
      });
    },
    async logout() {
      this.$reset();
    },
  },
});
