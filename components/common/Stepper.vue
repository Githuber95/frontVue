<template lang="pug">
  section.stepper
    div(style="position: relative;")
      ul.steps.is-horizontal
        // Cotiza
        li.steps-segment(v-bind:class="[step === 'cotiza' || step === 'pago' ? 'act' : 'inact', step === 'cotiza' ? 'is-active' : '']" @click="goQuote")
          span.steps-marker
            svg(xmlns="http://www.w3.org/2000/svg" width="4.98" height="13.14" viewBox="0 0 4.98 13.14")
              path(d="M-.32-10.12a1.819,1.819,0,0,1-1.34.54,1.721,1.721,0,0,1-1.15-.38,1.245,1.245,0,0,1-.45-1,1.235,1.235,0,0,1,.13-.56,1.082,1.082,0,0,1,.27-.37q.14-.11.18-.09a1.685,1.685,0,0,0,1.18.46,1.52,1.52,0,0,0,1.09-.43,1.749,1.749,0,0,0,.53-1.09h.7q.9,0,.9.94V-.84Q1.72.1.82.1H.56Q-.32.1-.32-.84Z" transform="translate(3.26 13.04)")
          //texto
          div.steps-content.ml-0
            p.text-left Cotiza
        // Pago
        li.steps-segment(v-bind:class="[step === 'pago' ? 'act' : 'inact', step === 'pago' ? 'is-active' : '']"  @click="goPay")
          span.steps-marker
            svg(xmlns="http://www.w3.org/2000/svg" width="9.46" height="13.2" viewBox="0 0 9.46 13.2")
              path(d="M-2.67-1.76H3.89q.98,0,.98.8v.12q0,.84-.98.84h-7.2a1.487,1.487,0,0,1-.98-.26,1.085,1.085,0,0,1-.3-.86v-.5a4.415,4.415,0,0,1,.32-1.71,3.645,3.645,0,0,1,.98-1.35,9.944,9.944,0,0,1,1.23-.94,15.867,15.867,0,0,1,1.47-.8A16.2,16.2,0,0,0,1.77-7.74,1.966,1.966,0,0,0,2.63-9.3a1.914,1.914,0,0,0-.7-1.57,2.99,2.99,0,0,0-1.94-.57A3.017,3.017,0,0,0-3.17-8.96q-.06,0-.36.01a1.034,1.034,0,0,1-.65-.26.894.894,0,0,1-.35-.75,2.9,2.9,0,0,1,1.27-2.2A5.187,5.187,0,0,1,.13-13.2a4.935,4.935,0,0,1,3.32,1.03,3.533,3.533,0,0,1,1.2,2.83,3.553,3.553,0,0,1-.29,1.48,3.121,3.121,0,0,1-.91,1.14,8.675,8.675,0,0,1-1.15.8q-.53.3-1.45.72-.88.4-1.38.67a8.654,8.654,0,0,0-1.05.68,2.646,2.646,0,0,0-.81.93A2.754,2.754,0,0,0-2.67-1.76Z" transform="translate(4.59 13.2)")
          //texto
          div.steps-content.ml-0
            p.text-left Paga
</template>

<script>
// @ is an alias to /src
import FormWizard from '@/components/stepper/FormWizard.vue'
import Tab from '@/components/stepper/Tab.vue'

export default {
  props: ['step'],
  data () {
    return {
    }
  },
  methods: {
    goQuote () {
      if (this.step === 'cotiza' || this.step === 'pago') {
        let goPath = (this.$store.state.common.subchannel === 'ENDOSOS_MULTIBANCOS') ? '/endoso-con-devolucion/paso/cotiza' : (this.$store.state.common.channel === 'ENDOSOS') ? '/endosos/paso/cotiza' : (this.$store.state.common.channel === 'IBK') ? '/interbank/paso/cotiza': '/paso/cotiza'
        goPath = (this.$store.state.common.channel === 'AHORRO_SEGURO' && this.$store.state.common.inversa === true) ? '/paso/cotiza/inversa' : goPath
        this.$nuxt.$router.push({ path: goPath })
      }
    },
    goPay () {
      if (this.step === 'pago') {
        let goPath = (this.$store.state.common.subchannel === 'ENDOSOS_MULTIBANCOS') ? '/endoso-con-devolucion/paso/pago' : (this.$store.state.common.channel === 'ENDOSOS') ? '/endosos/paso/pago' : (this.$store.state.common.channel === 'IBK') ? '/interbank/paso/pago' : '/paso/pago'
        this.$nuxt.$router.push({ path: goPath })
      }
    }
  },
  mounted () {
    // import('bulma/css/bulma.css')
  },
  components: {
    FormWizard,
    Tab
  }
}
</script>

<style lang="sass">
  .stepper
    @import 'bulma/bulma.sass';
    @import 'bulma-steps-component/bulma-steps.sass';
</style>
