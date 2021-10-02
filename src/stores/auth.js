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
    async signup(payload) {
      this.auth({ ...payload, mode: "signup" });
    },
    async login(payload) {
      this.auth({ ...payload, mode: "login" });
    },
    async auth(payload) {
      const mode = payload.mode;
      let url = "http://localhost:1337/auth/local";
      let credentials = {
        identifier: payload.email,
        password: payload.password,
      };

      if (mode === "signup") {
        url = "http://localhost:1337/auth/local/register";
        credentials = {
          username: payload.email,
          email: payload.email,
          password: payload.password,
        };
      }
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(credentials),
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

      localStorage.setItem("token", responseData.jwt);
      localStorage.setItem("userId", responseData.user);

      this.$patch((state) => {
        (state.userId = responseData.user), (state.token = responseData.jwt);
      });
    },
    autoLogin() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        this.$patch((state) => {
          (state.userId = userId), (state.token = token);
        });
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$reset();
    },
  },
});
