<template>
  <nav
    class="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow container-xxl">
    <div class="navbar-container d-flex content">

      <div class="bookmark-wrapper d-flex align-items-center">
        <ul class="nav navbar-nav d-xl-none">
          <li class="nav-item">
            <a class="nav-link menu-toggle" href="#">
              <div class="mr-1" v-html="$feathericons['menu'].toSvg()"></div>
            </a>
          </li>
        </ul>
      </div>

      <ul class="nav navbar-nav align-items-center ms-auto">

        <!--=====================================
             CAMBIAR TEMA DARK & LIGHT
           ======================================-->
        <li class="nav-item d-none d-lg-block" v-if="themeDark">
          <a class="nav-link nav-link-style" @click="changeTheme('semi-dark')">
            <div v-html="$feathericons['sun'].toSvg()"></div>
          </a>
        </li>
        <li class="nav-item d-none d-lg-block" v-else>
          <a class="nav-link nav-link-style" @click="changeTheme('dark-layout')">
            <div v-html="$feathericons['moon'].toSvg()"></div>
          </a>
        </li>
        <!--=====================================
             NOTIFICACIONES
           ======================================-->
        <Notifications/>
        <!--=====================================
           INFORMACIÓN DEL USUARIO
         ======================================-->
        <li class="nav-item dropdown dropdown-user">
          <a class="nav-link dropdown-toggle dropdown-user-link" id="dropdown-user" href="#" data-bs-toggle="dropdown"
             aria-haspopup="true" aria-expanded="false">
            <div class="user-nav d-sm-flex d-none">
              <span class="user-name fw-bolder">{{  $auth.user.name }} {{  $auth.user.last_name }}</span>
              <span class="user-status">Admin</span>
            </div>
            <span class="avatar">
          <img class="round" :src="require(`~/app-assets/images/avatars/avatar.png`)" alt="avatar" height="40"
               width="40">
          <span class="avatar-status-online"></span>
          </span>
          </a>
          <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-user">
            <a class="dropdown-item d-flex align-items-center" href="page-profile.html">
              <div class="mr-1" v-html="$feathericons['user'].toSvg()"></div>
              Perfil
            </a>
            <div class="dropdown-divider"></div>
            <div @click.prevent="logout">
              <a class="dropdown-item d-flex align-items-center" href="#" >
                <div class="mr-1" v-html="$feathericons['power'].toSvg()"></div>
                Cerrar Sesión
              </a>
            </div>

          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {bus} from "../plugins/bus";

export default {
  name: "Header",
  data(){
    return{
      themeDark: false,
    }
  },
  methods:{
    async logout() {
      await this.$auth.logout()
      this.$router.push({name: 'login'});
    },
    changeTheme(theme){
      location.reload()
      switch (theme) {
        case 'dark-layout':
          localStorage.removeItem('theme')
          localStorage.setItem('theme', theme)
          this.themeDark = true
          bus.$emit('themeDark', true)
          break
        case 'semi-dark':
          localStorage.removeItem('theme')
          localStorage.setItem('theme', theme)
          this.themeDark = false
          bus.$emit('themeDark', false)
          break
      }
    }
  },
  mounted() {
    let theme = localStorage.getItem('theme')
    if (theme === 'dark-layout'){
      this.themeDark = true
    }else{
      this.themeDark = false
    }
  }
}
</script>

<style scoped>

</style>
