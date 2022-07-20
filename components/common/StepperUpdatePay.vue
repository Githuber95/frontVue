<template lang="pug">
  section.stepper
    div(style="position: relative;")
      ul.steps.is-horizontal
        // Poliza
        li.steps-segment(v-bind:class="[step === 'poliza' || step === 'pago' ? 'act' : 'inact', step === 'poliza' ? 'is-active' : '']" @click="goPoliza")
          span.steps-marker
            // imagen
            svg(xmlns="http://www.w3.org/2000/svg" width="23.237" height="26.463" viewBox="0 0 23.237 26.463")
              g(transform='translate(-60.234 -311.547)')
                g(transform='translate(60.234 311.547)')
                  path.a(d='M1599.062,250.636h-16.75a3.235,3.235,0,0,1-2.351-1,3.15,3.15,0,0,1-.89-2.322l.751-20.065a3.213,3.213,0,0,1,3.241-3.081h15.4a3.208,3.208,0,0,1,3.242,3.1l.6,20.065a3.151,3.151,0,0,1-.9,2.306A3.237,3.237,0,0,1,1599.062,250.636Zm-16-24.792a1.547,1.547,0,0,0-1.571,1.472l-.752,20.065a1.492,1.492,0,0,0,.423,1.1,1.577,1.577,0,0,0,1.147.484h16.75a1.579,1.579,0,0,0,1.144-.48,1.494,1.494,0,0,0,.427-1.093l-.6-20.065a1.544,1.544,0,0,0-1.571-1.483Z', transform='translate(-1579.068 -224.173)')
                g(transform='translate(66.931 317.675)')
                  g(transform='translate(0 0)')
                    rect.a(width='10.405', height='1.671', rx='0.836')
                g(transform='translate(65.655 321.458)')
                  g(transform='translate(0 0)')
                    rect.a(width='12.564', height='1.671', rx='0.836')
                g(transform='translate(65.066 325.449)')
                  g(transform='translate(0 0)')
                    rect.a(width='13.742', height='1.671', rx='0.836')
                g(transform='translate(64.23 329.282)')
                  g(transform='translate(0)')
                    path.a(d='M1614.885,321.344h-13.376a.885.885,0,0,1-.926-.836h0a.885.885,0,0,1,.926-.836h13.376a.884.884,0,0,1,.926.836h0A.884.884,0,0,1,1614.885,321.344Z', transform='translate(-1600.583 -319.673)')
          //texto
          div.steps-content.ml-0
            p.text-left Tu póliza
        // Pago
        li.steps-segment(v-bind:class="[step === 'pago' ? 'act' : 'inact', step === 'pago' ? 'is-active' : '']" @click="goPay")
          span.steps-marker
            // imagen
            svg(version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 19" style="enable-background:new 0 0 22 19;" xml:space="preserve")
              path( d="M19.9,3.4H2C1.3,3.4,0.8,4,0.8,4.6v9.7c0,0.7,0.5,1.2,1.2,1.2h17.9c0.7,0,1.2-0.5,1.2-1.2\
                V4.6C21.1,4,20.6,3.4,19.9,3.4z M19.7,4.9v2.5H2.2V4.9H19.7z M19.7,10.3H2.2V8.8h17.4L19.7,10.3z M2.2,14.1v-2.4h17.4v2.4H2.2z")
          //texto
          div.steps-content.ml-0
            p.text-left Medio de pago
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
    goPoliza () {
      if (this.step === 'poliza' || this.step === 'pago') {
        this.$nuxt.$router.push({ path: '/actualizarTarjeta/datos' })
      }
    },
    goPay () {
      if (this.step === 'pago') {
        this.$nuxt.$router.push({ path: '/paso/pago' })
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
