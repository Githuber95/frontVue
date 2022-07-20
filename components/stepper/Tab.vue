<template lang="pug">
  div(v-show="isActive")
      slot
</template>

<script>
export default {
  name: 'tab',
  props: {
    name: { required: true },
    info: {},
    selected: { default: false }
  },
  data () {
    return {
      isActive: false
    }
  },
  created () {
    this.isActive = this.selected
  }
}
</script>
