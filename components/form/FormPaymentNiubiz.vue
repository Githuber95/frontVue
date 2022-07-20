<template lang="pug">
  b-row.pt-1
    b-col
      b-row.box-card.pl-sm-1.py-0.justify-content-center
        b-col.pl-md-3.pr-md-4.pl-lg-0.pr-lg-1.mx-lg-0.mx-xl-0.px-xl-0(lg="12" xl="12")
          b-row.py-0.px-0.justify-content-center
            PagoNiubiz(v-if="niubizConfig.sessionkey"
                :configuration="niubizConfig"
                :elementStyle="styles"
                :dataClient="pagador"
                identifierID="500065432"
                :showCheckOption="checkRecurrente"
                labelCheckOption="Autorizo se realicen cobros de mis cuotas recurrentes a estas tarjetas"
                :showCheckAcceptConditions="checkAccept"
                :buttonText="botonTexto"
                :buttonAction="getTokenNiubiz()"
                :vuetifyStyle="vuetify"
            )
</template>

<script>

import { PagoNiubiz } from 'is-payment-component-front'

export default {
  props: ['payment'],
  data () {
    return {
      primaRecurrenteAdicional: 0,
      session: {
        currency: 'PEN',
        amount: parseFloat(this.$store.state.common.cotizacion.primaRecurrente),
        clientIP: '',
        merchantDefineData : {
          "MDD1": this.$store.state.common.saveClient.numeroDocumento,
          "MDD2": this.$store.state.common.saveClient.email,
          "MDD3": this.$store.state.common.saveClient.nombre
        }
      },
      niubizConfig: {
        sessionkey: '', // dato obtenido desde la API del backend
        channel: 'paycard' ,
        merchantid: process.env.configNiubiz.comercioNiubiz, // código del comercio por producto TEST
        purchasenumber: '0780000001', // Ejemplo: Número de póliza, número de Venta, etc
        amount: parseFloat(this.$store.state.common.cotizacion.primaRecurrente), // El precio a cobrar
        callbackurl: '', // {urlForGetToken}
        language: 'es', // ejemplo: es o en
        font: 'https://fonts.googleapis.com/css?family=Montserrat:400&display=swap',
        recurrentmaxamount: '5000.00' // Máx. pago
      },
      styles: {
        base: {
            color: '#495057',
            fontWeight: 100,
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            placeholder: {
                color: '#c4c4c4'
            },
            autofill: {
                color: '#e39f48'
            }
        },
        invalid: {
            color: '#dc3545',
            '::placeholder': { color: '#FFCCA5' }
        }
      },
      vuetify: false, // si es verdadero mostrar elementos de VUETIFY sino BOOTSTRAP
      pagador: { // datos del cliente (tarjetahabiente)
          name: this.$store.state.common.saveClient.nombre,
          lastName: this.$store.state.common.saveClient.apellidoPaterno + " "+ this.$store.state.common.saveClient.apellidoMaterno,
          // email: 'accept@cybersource.com',
          email: this.$store.state.common.saveClient.email,
          alias: this.$store.state.common.saveClient.nombre,
          userBlockId: this.$store.state.common.saveClient.numeroDocumento
      },
      checkRecurrente: false, // para mostrar el check de 'pago recurrente'
      checkAccept: true, // para mostrar los tyc con el modal
      botonTexto: 'Pagar S/' + this.$store.state.common.cotizacion.primaRecurrente, // el texto del boton pagar
    }
  },
  head: {
    link: [{ rel: 'stylesheet', href: process.env.configNiubiz.linkNiubiz }],
    //- script: [{ src: process.env.configNiubiz.scriptNiubiz}]
  },
  created () {
    let niubizScript = document.createElement('script')
    niubizScript.setAttribute('src', process.env.configNiubiz.scriptNiubiz)
    document.head.appendChild(niubizScript)
  },
  mounted () {
    this.primaRecurrenteAdicional = ((Object.keys(this.$store.state.common.cotizacionAdicional).length)) ? this.$store.state.common.cotizacionAdicional[1].primaRecurrente : 0
    this.botonTexto = 'Pagar S/' + (parseFloat(this.$store.state.common.cotizacion.primaRecurrente) + parseFloat(this.primaRecurrenteAdicional)).toFixed(2)
    let self = this
    self.niubizConfig.sessionkey = ''
    this.$nuxt.$emit('show-loader', {
      text: 'Estamos obteniendo tus datos...'
    })
    self.$store.commit('payment/setSessionKey', '')
    this.$store.dispatch('payment/getSessionKey', self.session).then(respuesta => {
      let channelPay = (self.$store.state.common.channel === 'IBK') ? 'seguro-de-vida/interbank/paso/pago' : 'seguro-de-vida/paso/pago'
      if (respuesta.code === '01') {
        self.niubizConfig.callbackurl = process.env.base + 'payment-api/api/v2/token?protocol=https&host='+process.env.url+'&path='+ channelPay
        try {
          if (payform) {
            self.niubizConfig.sessionkey = respuesta.data.sessionKey
            setTimeout(function () {
              try {
                // ocultar el formulario de niubiz
                if (document.querySelectorAll("#inputFechaExpiracion")[0].children[0].children.length < 1) {
                  throw "Error en Niubiz"
                }
              } catch (err) {
                console.log('Mostrando error al no cargar el iframe: ', err)
                self.changeToCulqi()
              }
            }, 10500)
          } else {
            setTimeOut(()=> {
              self.niubizConfig.sessionkey = respuesta.data.sessionKey
              setTimeout(function () {
                try {
                  // ocultar el formulario de niubiz
                  if (document.querySelectorAll("#inputFechaExpiracion")[0].children[0].children.length < 1) {
                    throw "Error en Niubiz"
                  }
                } catch (err) {
                  console.log('Mostrando error al no cargar el iframe2: ', err)
                  self.changeToCulqi()
                }
              }, 10500)
            }, 2000)
          }
        } catch (err) {
          self.changeToCulqi()
          console.log('Catch error dont load payform', err)
        }
      } else {
        console.log('respuesya diferente de 01 en session')
        self.changeToCulqi()
      }
    }, res => {
      console.log('no hay respuesya de session')
      self.changeToCulqi()
    })
  },
  methods: {
    getTokenNiubiz () {
      // this.$store.dispatch('payment/getTokenNiubiz', this.poliza).then(respuesta => {
      //   console.log('respuestaTokenNiubiz', respuesta)
      // })
    },
    changeToCulqi () {
      this.niubizConfig.sessionkey = ''
      // ocultar el formulario de niubiz
      this.$nuxt.$emit('hide-loader')
      this.$nuxt.$emit('show-payment',  {
        payment: 'CULQI'
      })
    }
  },
  mixins: [
    // validationMixin
  ],
  destroyed () {
    this.$nuxt.$emit('show-payment',  { payment: 'CULQI' })
    // window.removeEventListener('resize', this.handleResize, { passive: true })
  },
  components: {
    // TermsAndConditions,
    PagoNiubiz
  }
}
</script>