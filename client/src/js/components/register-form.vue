<template>
  <div>
    <section v-if="pages.registerPage && !user.isLogin" style="padding-top: 100px">
      <form class="form-signin" @submit.prevent="submitRegister">
        <h1 class="login-font d-flex justify-content-center" style="margin-bottom: 10px">shArea</h1>
        <br />
        <br />
        <h1 class="h5 mb-3 font-weight-normal">Please fill the field</h1>
        <label for="inputEmail" class="sr-only">Full Name</label>
        <input
          type="name"
          id="inputName"
          class="form-control"
          placeholder="Full Name"
          required
          autofocus
          v-model="registerForm.name"
        />
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email-register"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
          v-model="registerForm.email"
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          v-model="registerForm.password"
          style="margin-bottom: 0px"
        />
        <div style="margin-bottom: 20px">
          <a href="#" @click.prevent="clickLogin">
            <small>Already have account?</small>
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
          >Sign up</p>
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
      registerForm: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submitRegister() {
      this.$emit("register", this.registerForm);
    },

    clickLogin() {
      this.$emit("go-to-login-page");
    }
  }
};
</script>

<style>
</style>