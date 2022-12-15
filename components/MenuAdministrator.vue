<template>
  <div>
    <div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
      <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
          <li class="nav-item me-auto">
            <nuxt-link to="/panel-control" class="navbar-brand" >
              <span class="brand-logo">
                <img width="500" :src="require(`~/app-assets/images/logo/${logo}`)" alt="">
              </span>
            </nuxt-link>
          </li>
          <li class="nav-item nav-toggle">
            <a class="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse">

              <i class="d-block d-xl-none text-primary toggle-icon font-medium-4" v-html="$feathericons['x'].toSvg()"
                 data-feather="x"></i>
              <i class="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary"
                 v-html="$feathericons['disc'].toSvg()"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="shadow-bottom"></div>
      <div class="main-menu-content mt-1">
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
          <li class=" nav-item">
            <nuxt-link to="/panel-control" class="d-flex align-items-center menu-principal">
              <div v-html="$feathericons['home'].toSvg()"></div>
              <div class="content-title-text ">
                <span class="menu-title text-truncate">Panel de Control</span>
<!--                <span class="badge badge-light-warning rounded-pill ms-auto me-1">2</span>-->
              </div>
            </nuxt-link>
          </li>
          <li class=" navigation-header">
            <span data-i18n="Apps &amp; Pages">Menú Principal</span>
<!--            <div v-html="$feathericons['more-horizontal'].toSvg()"></div>-->
          </li>
          <li class=" nav-item">
            <nuxt-link to="/aprendices" class="d-flex align-items-center menu-principal">
              <div v-html="$feathericons['users'].toSvg()"></div>
              <div class="content-title-text">
                <span class="menu-title text-truncate">Aprendices</span>
              </div>
            </nuxt-link>
          </li>

          <li class=" nav-item">
            <a class="d-flex align-items-center menu-principal" href="app-email.html">
              <div v-html="$feathericons['users'].toSvg()"></div>
              <div class="content-title-text">
                <span class="menu-title text-truncate">Instructores</span>
              </div>
            </a>
          </li>

          <li class="nav-item" style="margin-top: 5px">
            <a class="d-flex align-items-center menu-principal" href="app-email.html">
              <img style="width: 2rem" :src="require(`~/app-assets/images/icons/${currentTheme === 'dark-layout' ? 'icon-car-white.png' : 'icon-car-black.png'}`)" alt="">
              <div class="content-title-text icon-car">
                <span class="menu-title text-truncate">Vehículos</span>
              </div>
            </a>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from "../plugins/bus";

export default {
  name: "MenuAdministrator",
  data() {
    return {
      logo: this.$config.logoPrimary,
      currentTheme: ''
    }
  },
  mounted() {
    setTimeout(() => {
      bus.$on('themeDark', (data) => {
        data === true ? this.logo = this.$config.logoDark : this.logo = this.$config.logoPrimary
        data === true ? this.currentTheme = 'dark-layout' : this.currentTheme = 'semi-dark'
      })
    }, 200)


    let theme = localStorage.getItem('theme')
    theme === 'dark-layout' ? this.logo = this.$config.logoDark : this.logo = this.$config.logoPrimary
    theme === 'dark-layout' ? this.currentTheme = 'dark-layout' : this.currentTheme = 'semi-dark'
  }
}
</script>

<style scoped>
.main-menu.menu-light .menu-principal.router-link-exact-active{
  background: linear-gradient(118deg, #16B4BC, rgba(22, 180, 188, 0.76)) !important;
  box-shadow: 0 0 10px 1px rgba(22, 180, 188, 0.49) !important;
  color: #fff !important;
  font-weight: 400 !important;
  border-radius: 4px !important;
}
</style>
