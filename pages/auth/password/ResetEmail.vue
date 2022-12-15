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
            <ComponentSuccessResponse v-if="confirmSendEmail">
              <template slot="message">
                <div>
                  <p>Por favor revisa la bandeja de entrada de tu correo electrónico para restablecer tu contraseña. Si
                    no recibiste el correo electrónico, no dudes en contactarnos. Gracias!</p>
                </div>
              </template>
              <template slot="action">
                <div>
                  <nuxt-link to="/login" class="btn btn-primary">
                    <i class="mr-1" v-html="$feathericons['chevron-left'].toSvg()"></i>
                    Volver a login
                  </nuxt-link>
                </div>
              </template>
            </ComponentSuccessResponse>
            <!-- Forgot Password basic -->
            <div class="card mb-0" v-if="!confirmSendEmail">
              <div class="card-body">
                <nuxt-link to="/login" class="brand-logo">
                  <img width="250" :src="require(`~/app-assets/images/logo/${logo}`)" alt="">
                </nuxt-link>

                <h4 class="card-title mb-1">¿Ha olvidado su contraseña? 🔒</h4>
                <p class="card-text mb-2">Introduzca su correo electrónico y enviaremos instrucciones para restablecer
                  su contraseña.</p>

                <div v-if="messageServer" class="alert alert-danger mt-1 alert-validation-msg" role="alert">
                  <div class="alert-body d-flex align-items-center">
                    <div class="mr-1" v-html="$feathericons['info'].toSvg()"></div>
                    {{ messageServer }}
                  </div>
                </div>
                <div class="mb-1">
                  <label for="forgot-password-email" class="form-label"
                         :class="{ 'text-danger': $v.form.email.$error }">Correo Electrónico</label>
                  <input
                    v-model="form.email"
                    type="email"
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
                <button class="btn btn-primary w-100" tabindex="2" @click="sendEmail">Restablecer Contraseña</button>

                <p class="text-center mt-2">
                  <nuxt-link to="/login"><i class="mr-1" v-html="$feathericons['chevron-left'].toSvg()"></i> Volver a
                    login
                  </nuxt-link>
                </p>
              </div>
            </div>
            <!-- /Forgot Password basic -->
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
  name: "ResetEmail",
  data() {
    return {
      confirmSendEmail: false,
      messageServer: '',
      form: {
        email: String(),
      },

      theme: '',
      logo: this.$config.logoPrimary,
      color: this.$config.colorLoading

    }
  },
  validations: {
    form: {
      email: {required, email},
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

  methods: {
    sendEmail() {
      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.$toast.error("El correo electrónico es requerido");
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
          await this.$axios.post('password/email', this.form).then(resp =>{
            this.$vs.loading.close()
            setTimeout(() => {
              this.confirmSendEmail = true
            }, 500)
            this.$toast.success("Correo electrónico enviado exitosamente!");
          }).catch(e =>{
            console.log(e.response);
            this.$vs.loading.close()
            // this.$toast.error("Error al enviar correo electrónico. Consulte al administrador");
            this.messageServer = e.response.data.email
          })
        }
      })
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
}
</script>

<style scoped>

</style>
