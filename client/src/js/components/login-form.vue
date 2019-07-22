<template>
  <div>
    <section v-if="pages.loginPage && !user.isLogin" style="padding-top: 100px">
      <form class="form-signin" @submit.prevent="submitLogin">
        <h1 class="login-font d-flex justify-content-center" style="margin-bottom: 10px">shArea</h1>
        <br />
        <br />
        <h1 class="h5 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
          v-model="loginForm.email"
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          v-model="loginForm.password"
          style="margin-bottom: 0px"
        />
        <div style="margin-bottom: 20px">
          <a href="#" @click.prevent="clickRegister">
            <small>Don't have account?</small>
          </a>
        </div>
        <button
          class="btn btn-lg btn-block"
          type="submit"
          style="background-color: #1C1C1C; color: #fff"
        >
          <p
            class="d-flex justify-content-center align-self-center"
            style="margin: 0px; padding-bottom: 3px"
          >Sign in</p>
        </button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    pages: Object,
    user: Object
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submitLogin() {
      this.$emit("login", this.loginForm);
    },

    clickRegister() {
      this.$emit("go-to-register-page");
    }
  }
};
</script>

<style>
</style>