<template>
  <div class="card-info-student">
    <splide :slides="items" :options="options">
      <splide-slide v-for="item in items" :key="item.id">
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="fw-bolder mb-0">{{ item.total }}</h2>
              <p class="card-text">{{ nameType(item.type) }}</p>
            </div>
            <div :class="`avatar bg-light-${color(item.type)} p-50 m-0`">
              <div class="avatar-content">
                <div class="mr-1" v-html="$feathericons['users'].toSvg()"></div>
              </div>
            </div>
          </div>
        </div>
      </splide-slide>
    </splide>
  </div>
</template>

<script>
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

export default {
  name: "CardsInfoStudents",
  data() {
    return {
      options: {
        // type: 'slide',
        drag: true,
        padding: '0.5rem',
        gap: '1.5rem',
        focus: 0,
        autoplay: true,
        // height: '5rem',
        perPage: 4,
        arrows: false,
        // autoWidth: true,
        pagination: false,
        trimSpace: true,
        breakpoints: {
          480: {
            autoplay: true,
            autoWidth: false,
            drag: true,
            pagination: true,
            // type   : 'loop',
            perPage: 1,
            gap: '1.5rem',
          },
        },
      },

      items: []
    }
  },
  methods: {
    async getCountStudents() {
      this.$vs.loading({
        color: this.$config.colorLoading,
        text: 'Espere por favor...'
      })
      await this.$axios.get('/api/v1/get-count-students').then(resp => {
        this.items = resp.data
        this.$vs.loading.close()
      }).catch(e =>{
        console.log(e.response);
        this.$vs.loading.close()
        this.$toast.error("Error al consultar el contador de aspirantes. Consulte al administrador");
      })
    },
    nameType(type) {
      switch (type) {
        case 'totalStudents':
          return 'Total Aprendices'
        case 'finishedStudents':
          return 'Finalizados'
        case 'inCourseStudents':
          return 'En Clases'
        case 'pendingStudents':
          return 'Pendiente'
      }
    },
    color(type){
      switch (type) {
        case 'totalStudents':
          return 'primary'
        case 'finishedStudents':
          return 'success'
        case 'inCourseStudents':
          return 'warning'
        case 'pendingStudents':
          return 'danger'
      }
    }
  },
  created() {
    this.getCountStudents()
  }
}
</script>

<style scoped>

</style>
