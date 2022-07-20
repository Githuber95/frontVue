<template lang="pug">
  section#pago(ref="pago")
    div.title
      b-container.mb-xl-5
        b-row.justify-content-center
          b-col.mt-4(cols='6' sm="5" lg="4" xl="3")
            .text-center
              stepper.px-xl-3(:step="'pago'")
      b-container.d-lg-none.mt-2
        b-row.justify-content-center
          b-col(cols="12" sm="8" md="8" lg="6" xl="4" v-if="!showForm")
            b-row.align-items-center.title.my-2.justify-content-center
              //- b-col(cols="10")
              //-   h4.omnes-medium Sobre mi póliza
              b-col.text-center(cols="10")
                b-button.h-auto.w-auto.omnes-semibold(variant="primary" @click="showForm=!showForm") Ver resumen de mi póliza
    div.content.container(style="max-width: initial")
      b-row.box-resumen.justify-content-center.px-xl-5
        b-col.editar.d-lg-none(cols="12" sm="9" md="8" lg="6" xl="5" v-if="showForm")
          b-col(cols="12")
            b-row.align-items-center
              b-col(cols="8")
                h4.omnes-medium Resumen de la póliza
              b-col.text-right.d-lg-none(cols="4")
                b-button.w-auto.h-auto(variant="white" @click="showForm=!showForm") Cerrar
          Verify(:remarketing="remarketing" :remarketingLast="remarketingLast")
        b-col.editar.d-lg-block.d-none.px-xl-5(cols="12" md="8" lg="6" xl="5")
          div.w-100.resumen.mb-5
            b-container
              b-row.title.my-2.my-xl-0.justify-content-center.pt-4
                b-col(cols="12")
                  h3.omnes-medium.text-primary Tu plan de protección
                hr
              b-row.px-0.title.my-2.my-xl-0.justify-content-center     
                Verify(:remarketing="remarketing" :remarketingLast="remarketingLast")
        b-col.px-lg-0(cols="12" sm="8" md="8" lg="6" xl="5")
          hr.d-lg-none
          div.box-pago
            LazyPay
          //- div.box-beneficios.mb-5
            b-container
              b-row
                b-col.title(cols="12")
                  h4.text-center.omnes-medium.d-xl-none Estás a un paso de tener <br><span class="text-primary omnes-medium">asistencias con coberturas gratis <br> </span>por la compra de tu seguro
                  h4.text-center.omnes-regular.d-none.d-xl-block Estás a un paso de tener <br><span class="text-primary omnes-medium">asistencias con coberturas gratis <br> </span>por la compra de tu seguro
                b-col.content.mt-3(cols="12")
                  b-row(align-h="center")
                    b-carousel(:interval="300000" indicators='' label-indicators="Selecciona un slide para mostrar")
                      b-carousel-slide(img-blank  img-alt="comentarios seguro de vida con devolucion")
                        div.border
                          b-row.d-flex.align-items-center.h-100
                            b-col.text-center(cols="5")
                              img(src="@/static/media/common/pago/asistencia_ambulancia.svg" alt="asistencia traslado de urgencia con ambulancia seguro de vida con devolucion")
                            b-col.pl-0(cols="7")
                              //- h3.omnes-medium.mb-2.text-primary Hasta S/ 300
                              h4 Traslado en ambulancia <br> por urgencia médica
                      b-carousel-slide(img-blank  img-alt="comentarios seguro de vida con devolucion")
                        div.border
                          b-row.d-flex.align-items-center.h-100
                            b-col.text-center(cols="5")
                              img(src="@/static/media/common/pago/asistencia_medico.svg" alt="asistencia medico a domicilio seguro de vida con devolucion")
                            b-col.pl-0(cols="7")
                              //- h3.omnes-medium.mb-2.text-primary Sin límite
                              h4 Médico a domicilio para <br> para medicina general
                      b-carousel-slide(img-blank  img-alt="comentarios seguro de vida con devolucion")
                        div.border
                          b-row.d-flex.align-items-center.h-100
                            b-col.text-center(cols="5")
                              img(src="@/static/media/common/pago/asistencia_hogar.png" alt="asistencia traslado de urgencia con ambulancia seguro de vida con devolucion")
                            b-col.pl-0(cols="7")
                              //- h3.omnes-medium.mb-2.text-primary Hasta S/ 150
                              h4 Cerrajero, gasfitero, <br> electricista y vidriero <br> a domicilio por <br>emergencia
                      b-carousel-slide(img-blank  img-alt="comentarios seguro de vida con devolucion")
                        div.border
                          b-row.d-flex.align-items-center.h-100
                            b-col.text-center(cols="5")
                              img(src="@/static/media/common/pago/asistencia_vial.svg" alt="asistencia traslado de urgencia con ambulancia seguro de vida con devolucion")
                            b-col.pl-0(cols="7")
                              //- h3.omnes-medium.mb-2.text-primary Hasta S/ 300  
                              h4 Traslado de vehículo <br> en grúa por accidente o avería
    b-modal#pay.abandono(static size="md" centered hide-footer hide-header)
      b-container
        b-row.justify-content-center
          b-col.text-center.mb-3(cols="12" )
            img(src="@/static/media/interbank/home/abandono_pago_seguro_de_vida.svg" alt="abandonar seguro de vida con devolución")
        b-row.text-center
          b-col.px-0(cols="12")
            h2.omnes-semibold.text-primary.mb-0 ¡Estás a un paso de protegerlos<br> por S/ {{ parseDecimal(parseFloat($store.state.common.cotizacion.sumaAsegurada)) }}!
          b-col(cols="12").mt-4
            h3.text-primary Recuerda que si todo sale <br> bien, <span class="omnes-semibold"> te devolvemos S/ {{ parseDecimal(parseFloat($store.state.common.cotizacion.montoDevolucion) + parseFloat($store.state.common.cotizacionAdicional[1].montoDevolucion)) }} </span><br> para que puedas utilizarlo en:
          b-col(cols="12").my-4
            img(src="@/static/media/interbank/home/abandono_beneficio_seguro_de_vida.svg" alt="abandonar seguro de vida con devolución")
        b-row.justify-content-center.mt-3
          b-col.text-center(cols="12")
            b-button(variant="dark" @click="$nuxt.$emit('bv::hide::modal', 'pay')") QUIERO CONTINUAR
</template>

<script>
// @ is an alias to /src
import Stepper from '@/components/common/Stepper.vue'
import LazyPay from '@/components/LazyPay.vue'
import Verify from '@/components/Verify.vue'

import _ from 'lodash'
export default {
  layout: 'steps',
  data () {
    return {
      tracking: {
        channel: this.$store.state.common.channel,
        trackingId : this.$store.state.common.trackingId,
        screen: 'datos_tarjeta',
        document: this.$store.state.common.dniCliente,
        name: this.$store.state.common.saveClient.nombre + ' ' + this.$store.state.common.saveClient.apellidoPaterno + ' ' + this.$store.state.common.saveClient.apellidoMaterno,
        dob: this.$store.state.common.saveClient.fechaNacimiento,
        email: this.$store.state.common.saveClient.email,
        phone: this.$store.state.common.saveClient.numeroTelefono,
        data: this.$store.state.common.cotizacion
      },
      showForm: false,
      remarketing: {
        producto: '3',
        codigoRemarketing: this.$store.state.common.codeRemarketing,
        identificador: this.$store.state.common.saveClient.numeroDocumento, // dni
        detalle: {
          correo: this.$store.state.common.saveClient.email,
          celular: this.$store.state.common.saveClient.numeroTelefono,
          canalVenta: this.$store.state.common.channel,
          codigoVenta: this.$store.state.common.trackingId, // trackingId
          pantalla: 3,
          enviarCorreo: 0, // 0: enviar correo 1: no envia el primer 2: no envia remarketing
          datosCorreo:{
            url: process.env.base + 'seguro-de-vida/interbank',
            plantilla:{
              1:"interbank-pago-01-02-03.html",
              2:"interbank-pago-01-02-03.html",
              3:"interbank-pago-01-02-03.html",
              4:"interbank-pago-04.html"
            },
            utm:{
              1: "utm_campaign=remarketingPago1&canal=remarketing",
              2: "utm_campaign=remarketingPago2&canal=remarketing",
              3: "utm_campaign=remarketingPago3&canal=remarketing",
              4: "utm_campaign=remarketingPago4&canal=remarketing"
            }
          },
          // datosProducto: this.$store.state.common.cotizacion,
          datosProducto: {
            sumaAsegurada: this.$store.state.common.cotizacion.sumaAsegurada,
            periodoVigencia: this.$store.state.common.cotizacion.periodoVigencia,
            periodoPago: this.$store.state.common.cotizacion.periodoPago,
            frecuenciaPago: this.$store.state.common.cotizacion.frecuenciaPago,
            codMoneda: this.$store.state.common.cotizacion.codMoneda,
            edadContratacion: this.$store.state.common.cotizacion.edadContratacion,
            porcentaje: this.$store.state.common.cotizacion.porcentaje,
            primaRecurrente: this.$store.state.common.cotizacion.primaRecurrente,
            montoDevolucion: this.$store.state.common.cotizacion.montoDevolucion,
            datosTitular: this.$store.state.common.saveClient,
            datosBeneficiario: null,
            asunto1: (this.$store.state.common.nombreCliente).toUpperCase() + ', tu plan está reservado, continúa hacia el paso final',
            asunto2: (this.$store.state.common.nombreCliente).toUpperCase() + ', ¡Decídete ya! Este es el mejor precio que encontrarás',
            asunto3: (this.$store.state.common.nombreCliente).toUpperCase() + ', ¡ya no falta nada! La seguridad de tu familia a un solo clic',
            asunto4: (this.$store.state.common.nombreCliente).toUpperCase() + ', ¿Aún no te decides? ¡Protege a los que más amas desde hoy!'
          },
          datosTitular: this.$store.state.common.saveClient,
          remitente: {
            correoRemitente: 'segurodevidacondevolucion@interseguro.com.pe',
            correoRemitenteDisplay: 'Interseguro - Seguro de Vida'
          }
        }
      },
      remarketingLast: {},
      interval: null
    }
  },
  created () {
  },
  mounted () {
    document.getElementById('ibk').addEventListener('mouseleave', this.mouseLeave, { passive: true })
    window.dataLayer = window.dataLayer || []
    this.interval = setInterval(this.startSessionSave, 2000)
    // this.interval = setInterval(this.startSessionSave, 10000)
    let primaRecurrente = parseFloat(this.$store.state.common.cotizacion.primaRecurrente)
    let primaFrecuencia = (this.$store.state.common.cotizacion.frecuenciaPago === 'M') ? (primaRecurrente * 12) : (this.$store.state.common.cotizacion.frecuenciaPago === 'T') ? (primaRecurrente * 4) : (this.$store.state.common.cotizacion.frecuenciaPago === 'S') ? (primaRecurrente * 2) : primaRecurrente

    window.dataLayer.push({
      'event': 'virtualPageView',
      'pageTitle': 'Pago | ' + process.env.channel[process.env.subChannel[this.$store.state.common.subchannel]].PAGE_TITLE,
      'pageUrl': process.env.channel[process.env.subChannel[this.$store.state.common.subchannel]].URL_BASE + 'paso/pago/'
    })
    
    window.dataLayer.push({
      'event': 'EECcheckout',
      'ecommerce': {
        'checkout': {
            'actionField': {'step': 1},
            'products': [{
              'name': 'Vida con devolución IBK',
              'id': 'VidaIBK',
              'price': primaFrecuencia.toString(),
              'quantity': '1',
              'category': 'Póliza'        
            }]
          }
      }
    })

    this.tracking.errorType = ''
    this.tracking.errorData = ''
    this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
      // console.log('tracking datos_tarjeta', resTracking)
    })
    if (this.$store.state.common.identificador && this.$store.state.common.pantalla != 1) {
      this.$store.commit('common/setIdentificador', null)
    }
  },
  methods: {
    mouseLeave (e) {
      if ((e.clientX < 0 || e.clientY < 0) && !this.$store.state.common.leaveMessage) {
        this.$store.commit('common/setLeaveMessage', 1)
        document.getElementById('ibk').removeEventListener('mouseleave', this.mouseLeave, { passive: true })
        this.$nuxt.$emit('bv::show::modal', 'pay')
      }
    },
    startSessionSave () {
      let bool = _.isEqual(this.remarketingLast, this.remarketing)
      // console.log('bool pago', !bool)
      if (!bool) {
        // console.log('ingresando pago')
        this.remarketing.detalle.datosProducto.sumaAsegurada = this.parseDecimal(parseFloat(this.$store.state.common.cotizacion.sumaAsegurada))
        this.remarketing.detalle.datosProducto.primaRecurrente = this.parseDecimal(parseFloat(this.$store.state.common.cotizacion.primaRecurrente))
        this.remarketing.detalle.datosProducto.montoDevolucion = this.parseDecimal(parseFloat(this.$store.state.common.cotizacion.montoDevolucion))
        this.remarketingLast = _.cloneDeep(this.remarketing)
        this.$store.dispatch('common/makeRemarketing', this.remarketing).then(rem => {
          // console.log('1 Remarketing index-pago: ', this.remarketing.detalle.datosProducto)
        })
      }
    },
    parseDecimal (valor) {
      valor = parseFloat(valor)
      if (valor > 999) {
        // console.log(valor, typeof valor)
        let nuevoValor = valor.toFixed('2').split('.')
        if (nuevoValor.length > 1) {
          nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(',') + '.' + nuevoValor[1]
        } else {
          nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(',')
        }
        return nuevoValor
      } else {
        return valor.toFixed('2')
      }
    },
    backPage () {
      this.$nuxt.$router.push({ path: '/paso/cotiza' })
    }
  },
  destroyed () {
    document.getElementById('ibk').removeEventListener('mouseleave', this.mouseLeave, { passive: true })
    clearInterval(this.interval)
  },
  components: {
    Stepper,
    Verify,
    LazyPay
  },
  middleware: 'ibk-protect-page'
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: .5
  }
</style>
