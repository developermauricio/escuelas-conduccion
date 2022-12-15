<template>
  <div class="card mb-0 component-success-response">
    <div class="card-body">
      <div class="mr-1 text-success icon-success pt-2 pb-2" v-html="$feathericons['check-circle'].toSvg()"></div>
      <div>
        <slot name="message"></slot>
      </div>
      <div>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponentSuccessResponse"
}
</script>

<style scoped>

</style>
