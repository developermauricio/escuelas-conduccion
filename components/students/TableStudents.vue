<template>
  <div class="row" id="table-striped">
    <div class="col-12">


      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h4 class="card-title">Lista de Aprendices</h4>
          <div class="d-flex align-items-center">
            <div class="mr-4">
              <label class="form-label">Filtrar por fecha</label>
              <vue-ctk-date-time-picker
                v-model="dateFilter"
                :label="'Seleccionar fecha'"
                :name="'Date'"
                :format="'YYYY-MM-DD'"
                :formatted="'DD MMM, YYYY'"
                :only-date="true"
                :data-vv-as="'date'"
                :input-size="'md'"
                :first-day-of-week="1"
                :color="'#02B8BF'"
                :custom-shortcuts="customShortcuts"
                :dark="calendarIsDark"
                :range="true"
                @validate="filterCalendar"
              ></vue-ctk-date-time-picker>
            </div>

            <div>
              <button class="btn btn-success w-100 mt-2" @click="exportExcel">Exportar Excel</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <client-only>
              <vue-good-table
                @on-selected-rows-change="selectionChanged"
                ref="table-students"
                styleClass="vgt-table striped table-hover"
                :columns="columns"
                :line-numbers="true"
                :rows="students"
                :theme="themeTable"
                :fixed-header="true"
                max-height="500px"

                :select-options="{
    enabled: true,
    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
    selectionInfoClass: 'custom-class',
    selectionText: 'aprendices seleccionados',
    clearSelectionText: 'limpiar',
    disableSelectInfo: false, // disable the select info panel on top
    selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
  }"
                :pagination-options="{
    enabled: true,
    mode: 'records',
    perPage: 20,
    perPageDropdown: [10, 20, 50, 100, 200, 500, 1000],
    dropdownAllowAll: true,
    setCurrentPage: 1,
    jumpFirstOrLast : true,
    firstLabel : 'Primera Página',
    lastLabel : 'Última Página',
    nextLabel: 'Siguiente',
    prevLabel: 'Anterior',
    ofLabel: 'of',
    rowsPerPageLabel: 'Aprendices por página',
    ofLabel: 'of',
    pageLabel: 'page', // for 'pages' mode
    allLabel: 'Todos',
  }">
                <template slot="table-row" slot-scope="props">
                  <div v-if="props.column.field === 'name'">
                    <p @click="openInfoModal(props.row)">{{ props.row.name }}</p>
                  </div>
                  <div v-if="props.column.field === 'email'">
                    <p>{{ props.row.email }}</p>
                  </div>
                  <div v-if="props.column.field === 'document'">
                    <p>{{ props.row.document }}</p>
                  </div>
                  <div v-if="props.column.field === 'phone'">
                    <p>{{ props.row.phone }}</p>
                  </div>
                  <div v-if="props.column.field === 'state_student'">
                    <span
                      :class="`badge badge-glow bg-${stateStudent(props.row.state_student)}`">{{
                        stateTitleStudent(props.row.state_student)
                      }}</span>
                  </div>
                  <div v-if="props.column.field === 'created_at'">
                    <p class="text-capitalize">{{ $moment(props.row.created_at).format("MMMM DD YYYY") }}</p>
                  </div>
                  <div v-if="props.column.field === 'actions'">
                    <button class="btn btn-primary" @click="openInfoModal(props.row)">Ver</button>
                  </div>
                </template>


              </vue-good-table>
            </client-only>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {bus} from "../../plugins/bus";

export default {
  name: "TableStudents",
  data() {
    return {
      dateFilter: null,
      calendarIsDark: false,
      customShortcuts: [
        {key: 'thisWeek', label: 'Esta semana', value: 'isoWeek'},
        {key: 'lastWeek', label: 'La semana pasada', value: '-isoWeek'},
        {key: 'last7Days', label: 'Últimos 7 días', value: 7},
        {key: 'last30Days', label: 'Últimos 30 días', value: 30},
        {key: 'thisMonth', label: 'Este mes', value: 'month'},
        {key: 'lastMonth', label: 'El mes pasado', value: '-month'},
        {key: 'thisYear', label: 'Este año', value: 'year'},
        {key: 'lastYear', label: 'El año pasado', value: '-year'}
      ],

      themeTable: 'polar-bear',
      columns: [
        {
          label: 'Nombre',
          field: 'name',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: 'Buscar por nombre',
          }
        },
        {
          label: 'Correo Electrónico',
          field: 'email',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: 'Buscar por correo electrónico',
          }
        },
        {
          label: 'Documento',
          field: 'document',
          sortable: false,
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: 'Buscar por documento',
          }
        },
        {
          label: 'Teléfono',
          field: 'phone',
          sortable: false,
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: 'Buscar por teléfono',
          }
        },
        {
          label: 'Estado',
          field: 'state_student',
          sortable: false,
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: 'Filtrar por estado', // placeholder for filter input
            filterDropdownItems: [
              {value: 'completed', text: 'Finalizado'},
              {value: 'in_classes', text: 'En Clase'},
              {value: 'pending_course', text: 'Pendiente'}
            ], // dropdown (with selected values) instead of text input
            trigger: 'enter', //only trigger on enter not on keyup
          },
        },
        {
          label: 'Fecha de Registro',
          field: 'created_at',
          sortable: true,
        },
        {
          label: 'Acciones',
          field: 'actions',
          sortable: false,
        },
      ],
      students: [],
      checked: [],
      urlExportExcel: '',
      selectedStudents: [],
    }
  },

  methods: {
    filterCalendar() {
      this.getStudents(this.dateFilter)
    },

    async exportExcel() {
      if (this.checked.length > 0) {
        this.$swal.fire(
          {
            title: `Se exportarán ${this.checked.length} aprendices seleccionados`,
            icon: 'warning',
            confirmButtonText: 'Exportar',
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
            await window.open(
              this.$config.urlBack + this.urlExportExcel, "_blank"
            ).focus();
          }
        })

      } else {
        this.$swal.fire(
          {
            title: `Se exportarán todos los aprendices`,
            icon: 'warning',
            confirmButtonText: 'Exportar',
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
            await window.open(
              this.$config.urlBack + '/api/v1/get-students/export', "_blank"
            ).focus();
          }
        })
      }

    },
    selectionChanged() {
      this.selectedStudents = this.$refs['table-students'].selectedRows
    },
    async getStudents(dateFilter) {
      this.$vs.loading({
        color: this.$config.colorLoading,
        text: 'Espere por favor...'
      })
      await this.$axios.get(`/api/v1/get-students/${JSON.stringify(this.dateFilter)}`).then(resp => {
        this.students = resp.data
        if (this.dateFilter !== null){
          this.selectedStudents = resp.data
        }
        this.$vs.loading.close()
      }).catch(e => {
        this.$vs.loading.close()
        console.log(e)
        this.$toast.error("Error al obtener los aprendices. Consulte al administrador");
      })
    },
    stateStudent(state) {
      switch (state) {
        case 'completed':
          return 'success'
        case 'in_classes':
          return 'warning'
        case 'pending_course':
          return 'danger'
      }
    },
    stateTitleStudent(state) {
      switch (state) {
        case 'completed':
          return 'Finalizado'
        case 'in_classes':
          return 'En Clase'
        case 'pending_course':
          return 'Pendiente'
      }
    },
    openInfoModal(student) {
      alert(JSON.stringify(student))
    }
  },

  watch: {
    dateFilter: function (value){
       if (!value){
         this.dateFilter = null
         this.selectedStudents = []
         this.getStudents()
       }
    },
    selectedStudents: function (value) {
      this.checked = []
      if (value) {
        this.selectedStudents.forEach(student => {
          this.checked.push(student.id)
        })
      } else {
        this.selectedStudents = []
      }

    },
    checked: function (value) {
      this.urlExportExcel = `/api/v1/get-students-selected/export/${this.checked}`
    }

  },

  mounted() {
    this.themeTable = localStorage.getItem('theme') === 'dark-layout' ? 'nocturnal' : 'polar-bear'
    this.calendarIsDark = localStorage.getItem('theme') === 'dark-layout'
    this.getStudents()
  }
}
</script>

<style scoped>

</style>
