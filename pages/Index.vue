<template>
  <div>
    <Header/>
    <SidebarManu/>
    <router-view/> <!-- Componentes del sistema-->
    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>
    <!-- BEGIN: Footer-->
    <Footer/>
    <!-- END: Footer-->
  </div>
</template>

<script>

export default {
  name: 'Index',
  middleware: ['auth'],
  data(){
    return{
      theme: ''
    }
  },
  beforeMount() {
    this.theme = localStorage.getItem('theme')
  },
  head () {
    return {
      htmlAttrs: {
        // class: 'dark-layout'
        class: this.theme
      },
    }
  },
}
</script>
