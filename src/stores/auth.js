import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
  state: () => ({
    userId: null,
    token: null,
    tokenExpiration: null,
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
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
  },
});
