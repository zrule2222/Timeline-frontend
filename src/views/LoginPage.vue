<template>
  <form @submit.prevent="login">
    <div class="hero is-fullheight">
      <section class="hero bg-primary is-small">
        <div class="hero-body is-justify-content-center">
          <div class="px-3">

                <img src="https://teltonika-iot-group.com/cdn/companies/light/iot-light.svg" alt="logo" width="191"
                  height="27" class="w-full h-7 max-w-[140px] sm:max-w-full">

            </div>
        </div>
      </section>
      <div v-if="showError" class="notification is-danger has-text-centered">
        <p>{{ errorMessage }}</p>
      </div>
      <div v-if="showMessage" class="notification is-info has-text-centered">
        <p>{{ message }}</p>
      </div>
      <div class="hero-body is-justify-content-center is-align-items-center">
        <div class="columns is-flex is-flex-direction-column box">
          <div class="column">
            <label for="username">Username or email</label>
            <input class="input border-primary-text hover:border-primary-text" type="text" :class="noLoginField ? 'is-danger' : ''"
              placeholder="Username or email" v-model="loginField">
            <p v-show="noLoginField" class="help is-danger">Username is empty</p>
          </div>
          <div class="column">
            <label for="Name">Password</label>
            <input class="input border-primary-text hover:border-primary-text" type="password" :class="noPassword ? 'is-danger' : ''" placeholder="Password"
              v-model="password">
            <p v-show="noPassword" class="help is-danger">Password is empty</p>

          </div>
          <div class="column">
            <button class="button bg-primary is-fullwidth text-white" type="submit">Login</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'loginPage',
  data() {
    return {
      loginField: "",
      password: "",
      showError: false,
      noLoginField: false,
      noPassword: false,
      errorMessage: "",
      showMessage: false,
    };
  },
  props: {
    message: {
      type: String
    }
  },
  methods: {
    async login() {
      if (!this.validateForm()) {
        return
      }
      try {
        const response = await this.$records.login({
          "login": this.loginField,
          "password": this.password
        })
        localStorage.setItem('token', response.data.auth_token)
        this.$router.push('/admin')
      }
      catch (error) {
        this.showError = true
        this.errorMessage = error.response.data.message
      }
    },
    validateForm() {
      if (!this.loginField) {
        this.noLoginField = true
        return false
      }
      else {
        this.noLoginField = false
      }
      if (!this.password) {
        this.noPassword = true
        return false
      }
      else {
        this.noPassword = false
      }
      return true
    },
    checkAndShowMessage() {
      if (this.message) {
        this.showMessage = true
      }
      else {
        this.showMessage = false
      }
    }
  },
  created() {
    this.checkAndShowMessage()
  }
}
</script>