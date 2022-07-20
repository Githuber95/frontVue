<template lang="pug">
  div
    ul.steps.has-content-centered
      li.steps-segment(v-for='tab in tabs', :class="{ 'is-active': tab.isActive }", v-bind:key='tab.name')
        span.steps-marker
        .steps-content
          p.is-size-4 {{tab.name}}
          p {{tab.info}}
    .tab-details
      slot(:formdata='formData')
    br
    .field.is-grouped
      .control(v-if='currentActive > 0')
        button.button.is-primary(@click='previousTab()') Previous
      .control(v-if='currentActive < totalTabs - 1')
        button.button.is-link(@click='nextTab()') Next
      .control(v-if='currentActive === totalTabs -1')
        button.button.is-success(@click='submit()') Submit
</template>

<script>
export default {
  // name: 'form-wizard',
  data () {
    return {
      tabs: [],
      currentActive: 0,
      totalTabs: 0,
      formData: {
        name: '',
        email: '',
        about: '',
        gender: '',
        reference: '',
        terms: ''
      }
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    this.totalTabs = this.tabs.length
  },
  methods: {
    previousTab () {
      this.currentActive--
      this.tabs.forEach(tab => {
        tab.isActive = false
      })
      this.tabs[this.currentActive].isActive = true
    },
    nextTab () {
      // Validate input
      this.$root.$validator.validate('step' + (this.currentActive + 1) + '.*').then(valid => {
        if (valid) {
          this.currentActive++
          this.tabs.forEach(tab => {
            tab.isActive = false
          })
          this.tabs[this.currentActive].isActive = true
        }
      })
    },
    submit () {
      this.$root.$validator.validate('step' + this.totalTabs + '.*').then(valid => {
        if (valid) {
          alert('Everything passes ! Ready to Submit')
        }
      })
    }
  }
}
</script>
