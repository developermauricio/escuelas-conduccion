<template>
  <div>
    <footer class="footer footer-static footer-light">
      <p class="clearfix mb-0">
        <span class="float-md-start d-block d-md-inline-block mt-25">COPYRIGHT &copy; 2022
<!--        <a class="ms-25" href="https://1.envato.market/pixinvent_portfolio" target="_blank">Pixinvent</a>-->
<!--        <span class="d-none d-sm-inline-block">, All rights Reserved</span>-->
      </span>
<!--        <span class="float-md-end d-none d-md-block">Hand-crafted & Made with<i data-feather="heart"></i></span>-->
      </p>
    </footer>

    <button class="btn btn-primary btn-icon scroll-top" type="button">
      <i class="mr-1" v-html="$feathericons['arrow-up'].toSvg()"></i>
<!--      <i data-feather="arrow-up"></i>-->
    </button>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>
