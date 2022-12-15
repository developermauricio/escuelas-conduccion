<template>
  <div>
    <div class="app-content content-login">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper">
        <div class="content-header row">
        </div>
        <div class="content-body">
          <div class="auth-wrapper auth-basic px-2">
            <div class="auth-inner my-2">
              <!-- Login basic -->
              <div class="card mb-0">
                <div class="card-body">
                  <nuxt-link to="/login" class="brand-logo">
                    <img width="250" :src="require(`~/app-assets/images/logo/${logo}`)" alt="">
                  </nuxt-link>

                  <h4 class="card-title mb-1">Bievenido de nuevo! 👋</h4>
                  <p class="card-text mb-2">Por favor, ingrese sus credenciales de acceso</p>
                  <div v-if="messageInvalid" class="alert alert-danger mt-1 alert-validation-msg" role="alert">
                    <div class="alert-body d-flex align-items-center">
                      <div class="mr-1" v-html="$feathericons['info'].toSvg()"></div> {{ messageInvalid[0] }}
                    </div>
                  </div>
                  <div class="mb-1">
                    <label for="login-email" class="form-label" :class="{ 'text-danger': $v.form.email.$error }">Correo
                      Electrónico
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      v-model="form.email"
                      type="email"
                      class="form-control"
                      :class="[{ 'is-invalid': $v.form.email.$error }]"
                      name="login-email"
                      placeholder="john@example.com"
                      aria-describedby="login-email"
                      tabindex="1" autofocus/>
                    <p class="text-danger font-weight-bold" v-if="!$v.form.email.email">Ingrese un correo
                      electrónico
                      válido</p>
                    <p class="text-danger  font-weight-bold" v-if="$v.form.email.$error && $v.form.email.email">El
                      correo
                      electrónico es requerido</p>
                  </div>

                  <div class="mb-1">
                    <div class="d-flex justify-content-between">
                      <label class="form-label" for="login-password">Contraseña <span
                        class="text-danger">*</span></label>
                      <nuxt-link to="/password/email">
                        <small>Olvidó su contraseña?</small>
                      </nuxt-link>
                    </div>
                    <div class="">
                      <!--                        <input-->
                      <!--                          v-model.trim="form.password"-->
                      <!--                          :class="[{ 'is-invalid': $v.form.password.$error }]"-->
                      <!--                          type="password" -->
                      <!--                          class="form-control form-control-merge"  -->
                      <!--                          name="login-password" -->
                      <!--                          tabindex="2" -->
                      <!--                          placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" -->
                      <!--                          aria-describedby="login-password" />-->
                      <!--                        <span class="input-group-text cursor-pointer"><i data-feather="eye"></i></span>-->

                      <div class="d-flex w-100">
                        <input v-if="showPassword"
                               v-model.trim="form.password"
                               class="form-control form-control-merge input-password"
                               :class="[{ 'is-invalid': $v.form.password.$error }]"
                               type="text"
                               placeholder="**********">
                        <input v-else
                               v-model.trim="form.password"
                               :class="[{ 'is-invalid': $v.form.password.$error }]"
                               type="password"
                               placeholder="**********"
                               class="form-control form-control-merge input-password">
                        <span class="input-group-text cursor-pointer" @click="toggleShow">
                          <i :class="{ 'bx bx-show': showPassword, 'bx bx-low-vision': !showPassword }"></i>
                        </span>
                      </div>
                    </div>

                  </div>
                  <div class="mb-1">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="remember-me" tabindex="3"/>
                      <label class="form-check-label" for="remember-me"> Recordarme </label>
                    </div>
                  </div>
                  <button class="btn btn-primary w-100" @click="login">Iniciar Sesión</button>

                  <!--                  <p class="text-center mt-2">-->
                  <!--                    <span>New on our platform?</span>-->
                  <!--                    <a href="auth-register-basic.html">-->
                  <!--                      <span>Create an account</span>-->
                  <!--                    </a>-->
                  <!--                  </p>-->

                </div>
              </div>
              <!-- /Login basic -->
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from "../../../plugins/bus";
import {email, required} from "vuelidate/lib/validators";

export default {
  name: "Login",
  middleware: ['guest'],
  data() {
    return {
      showPassword: false,
      messageInvalid: '',
      messageActiveAccount: '',
      form: {
        // email: String(),
        // password: String(),
        email: '',
        password: ''
      },

      theme: '',
      logo: this.$config.logoPrimary
    }
  },
  validations: {
    form: {
      email: {required, email},
      password: {required}
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },

    async login() {
      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.$toast.error("Verifique que todos los campos requeridos esten llenos");
        return
      }
      this.$vs.loading({
        color: this.$config.colorLoading,
        text: 'Espere por favor...'
      })
      const loginSuccess = await this.$auth.loginWith('local', {
        data: this.form
      }).then(res => {
        // this.$auth.setUser(res.data.user)
        this.$router.push({name: 'index.panel.control'});
        this.$vs.loading.close()
      })
        .catch(e => {
          this.$vs.loading.close()
          console.log(e)
          // if (e.response.status === 422) {
            this.messageActiveAccount = e.response.data.errors.verification ? e.response.data.errors.verification : null
            this.messageInvalid = e.response.data.errors.email ? e.response.data.errors.email : ''
          // }

        })

      // if (loginSuccess) {
      //   await this.$auth.setUser(this.form)
      // }
    }
  },
  beforeMount() {
    this.theme = localStorage.getItem('theme')
  },
  head() {
    return {
      htmlAttrs: {
        // class: 'dark-layout'
        class: this.theme
      },
    }
  },
  mounted() {
    setTimeout(() => {
      bus.$on('themeDark', (data) => {
        data === true ? this.logo = this.$config.logoDark : this.logo = this.$config.logoPrimary
      })
    }, 200)


    let theme = localStorage.getItem('theme')
    theme === 'dark-layout' ? this.logo = this.$config.logoDark : this.logo = this.$config.logoPrimary
  },
  watch: {
    'form.email': function (val) {
      if (val) {
        this.messageInvalid = ''
        this.messageActiveAccount = ''
      }
    },
    'form.password': function (val) {
      if (val) {
        this.messageInvalid = ''
        this.messageActiveAccount = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
