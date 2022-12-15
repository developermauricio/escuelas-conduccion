<template>
  <div class="app-content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-header row">
      </div>
      <div class="content-body">
        <div class="auth-wrapper auth-basic px-2">
          <div class="auth-inner my-2">

            <!-- Confirmed Send Email Reset Password -->
            <ComponentSuccessResponse v-if="confirmSuccess">
              <template slot="message">
                <div>
                  <h5>¡Restablecer contraseña exitoso!</h5>
                  <p>Por favor vuelve al inicio de sesión para ingresar. Si necesitas ayuda no dudes en contactarnos. Gracias!</p>
                </div>
              </template>
              <template slot="action">
                <div>
                  <button @click="goToLogin" class="btn btn-primary">
                    <i class="mr-1" v-html="$feathericons['chevron-left'].toSvg()"></i>
                    Volver a login
                  </button>
                </div>
              </template>
            </ComponentSuccessResponse>

            <!-- Reset Password basic -->
            <div class="card mb-0"  v-if="!confirmSuccess">
              <div class="card-body">
                <nuxt-link to="/login" class="brand-logo">
                  <img width="250" :src="require(`~/app-assets/images/logo/${logo}`)" alt="">
                </nuxt-link>

                <h4 class="card-title mb-1">Restablecer Contraseña 🔒</h4>
                <p class="card-text mb-2">Su nueva contraseña debe ser diferente de las utilizadas anteriormente.</p>

                <div v-if="messageServer" class="alert alert-danger mt-1 alert-validation-msg" role="alert">
                  <div class="alert-body d-flex align-items-center">
                    <div class="mr-1" v-html="$feathericons['info'].toSvg()"></div>
                    {{ messageServer }}
                  </div>
                </div>
                <div class="mb-1">
                  <label for="forgot-password-email" class="form-label"
                         :class="{ 'text-danger': $v.form.email.$error }">Correo Electrónico <span class="text-danger">*</span></label>
                  <input
                    v-model="form.email"
                    type="email"
                    readonly
                    disabled
                    :class="[{ 'is-invalid': $v.form.email.$error }]"
                    class="form-control"
                    name="forgot-password-email"
                    placeholder="john@example.com"
                    aria-describedby="forgot-password-email"
                    tabindex="1"
                    autofocus/>
                  <p class="text-danger mb-1 font-weight-bold" v-if="!$v.form.email.email">Ingrese un correo electrónico
                    válido</p>
                  <p class="text-danger font-weight-bold" v-if="$v.form.email.$error && $v.form.email.email">El correo
                    electrónico es requerido</p>
                </div>
                  <div class="mb-1">
                    <div class="d-flex justify-content-between">
                      <label class="form-label" for="reset-password-new" :class="[{ 'text-danger': $v.form.password.$error }, { 'text-danger': validatePassword }]">Nueva Contraseña <span class="text-danger">*</span></label>
                    </div>
                    <div class="input-group input-group-merge form-password-toggle">
                      <input
                        v-if="showPassword"
                        v-model.trim="form.password"
                        :class="[{ 'is-invalid': $v.form.password.$error }, {'is-invalid': validatePassword}, {'is-invalid': !$v.form.password.minLength}]"
                        type="password"
                        class="form-control form-control-merge"
                        name="reset-password-new"
                        placeholder="**********"
                        aria-describedby="reset-password-new"
                        tabindex="1"
                        autofocus/>
                      <input
                        v-else
                        v-model.trim="form.password"
                        :class="[{ 'is-invalid': $v.form.password.$error }, {'is-invalid': validatePassword}, {'is-invalid': !$v.form.password.minLength}]"
                        type="password"
                        class="form-control form-control-merge"
                        name="reset-password-new"
                        placeholder="**********"
                        aria-describedby="reset-password-new"
                        tabindex="1"
                        autofocus/>
                      <span class="input-group-text cursor-pointer" @click="toggleShow">
                          <i :class="{ 'bx bx-show': showPassword, 'bx bx-low-vision': !showPassword }"></i>
                      </span>
                    </div>
                    <p class="text-danger font-weight-bold" v-if="$v.form.password.$error">La contraseña es requerida</p>
                    <p class="text-danger font-weight-bold" v-if="!$v.form.password.minLength">La contraseña debe contener
                      mínimo 8 caracteres</p>
                  </div>
                  <div class="mb-1">
                    <div class="d-flex justify-content-between">
                      <label class="form-label" for="reset-password-confirm">Confirmar Contraseña <span class="text-danger">*</span></label>
                    </div>
                    <div class="input-group input-group-merge form-password-toggle">
                      <input
                        v-if="showPasswordConfirm"
                        v-model.trim="form.password_confirmation"
                        :class="[{ 'text-danger': $v.form.password_confirmation.$error }, { 'text-danger': validatePassword }]"
                        type="password"
                        class="form-control form-control-merge"
                        name="reset-password-new"
                        placeholder="**********"
                        aria-describedby="reset-password-new"
                        tabindex="1"
                        autofocus/>
                      <input
                        v-else
                        v-model.trim="form.password_confirmation"
                        :class="[{ 'text-danger': $v.form.password_confirmation.$error }, { 'text-danger': validatePassword }]"
                        type="password"
                        class="form-control form-control-merge"
                        name="reset-password-new"
                        placeholder="**********"
                        aria-describedby="reset-password-new"
                        tabindex="1"
                        autofocus/>
                      <span class="input-group-text cursor-pointer" @click="toggleShowConfirm">
                          <i :class="{ 'bx bx-show': showPasswordConfirm, 'bx bx-low-vision': !showPasswordConfirm }"></i>
                      </span>
                    </div>
                    <p v-if="!$v.form.password_confirmation.sameAsPassword" class="text-danger font-weight-bold">La
                      contraseña no coincide</p>
                    <p class="text-danger font-weight-bold " v-if="$v.form.password_confirmation.$error">La confirmación
                      de la contraseña es requerida</p>
                  </div>
                  <button class="btn btn-primary w-100" tabindex="3" @click="resetPassword">Establecer nueva contraseña</button>
                <p class="text-center mt-2">
                  <nuxt-link to="/login"><i class="mr-1" v-html="$feathericons['chevron-left'].toSvg()"></i> Volver a
                    login
                  </nuxt-link>
                </p>
              </div>
            </div>
            <!-- /Reset Password basic -->
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {bus} from "../../../plugins/bus";
import {email, minLength, required, sameAs} from "vuelidate/lib/validators";

export default {
  name: "PasswordReset",
  data(){
    return{
      messageServer: false,
      confirmSuccess: false,
      showPassword: false,
      showPasswordConfirm: false,
      validatePassword: false,
      form: {
        email: String(),
        password: String(),
        password_confirmation: String(),
        token: this.$route.query.token,
      },

      theme: '',
      logo: this.$config.logoPrimary,
    }
  },
  validations: {
    form: {
      email: {required, email},
      password: {required, minLength: minLength(8)},
      password_confirmation: {sameAsPassword: sameAs('password')},
    },
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
  methods:{
    goToLogin(){
      this.$router.push({name: 'login'});
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirm() {
      this.showPasswordConfirm = !this.showPasswordConfirm;
    },
    resetPassword() {
      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.$toast.error("Verifique que los datos requeridos");
        return
      }
      this.$swal.fire(
        {
          title: '¿Esta seguro de restablecer su contraseña?',
          icon: 'warning',
          confirmButtonText: 'Estoy seguro',
          cancelButtonText: 'Cancelar',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger mr-2'
          },

          buttonsStyling: false,
          showCancelButton: true,
          reverseButtons: true,
          allowOutsideClick: false,
        }).then(async result => {
        if (result.value) {
          this.$vs.loading({
            color: this.$config.colorLoading,
            text: 'Espere por favor...'
          })
          await this.$axios.post('/api/v1/password/reset', this.form).then(resp =>{
            this.$vs.loading.close()
            setTimeout(() => {
              this.confirmSuccess = true
            }, 500)
            this.$toast.success("Restablecimiento exitoso!");
          }).catch(e =>{
            console.log(e.response);
            this.$vs.loading.close()
            if (e.response.status === 422){
              this.$toast.error("Error al restablecer contraseña. Consulte al administrador");
            }

            this.messageServer = e.response.data.email
          })
        }
      })
    }
  },

  mounted() {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token

    setTimeout(() => {
      bus.$on('themeDark', (data) => {
        data === true ? this.logo = this.$config.logoDark : this.logo = this.$config.logoPrimary
      })
    }, 200)
    let theme = localStorage.getItem('theme')
    theme === 'dark-layout' ? this.logo = this.$config.logoDark : this.logo = this.$config.logoPrimary
  },
}
</script>

<style scoped>

</style>
