<template lang="pug">
  section#pago(ref="pago" :class="[($store.state.common.channel === 'IBK') ? 'interbank' : ($store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'universitario' : ($store.state.common.channel === 'AHORRO_JUBILACION') ? 'ahorro-jubilacion' : ($store.state.common.channel === 'PROTECCION_SEGURA') ? 'proteccion-segura' : ($store.state.common.channel === 'AHORRO_SEGURO') ? 'ahorro-seguro' : 'vida-con-devolucion']")
    div.title
      b-container.mb-lg-3.mb-xl-4
        b-row.justify-content-center
          b-col.mt-4(cols='6' sm="5" lg="4" xl="3")
            .text-center
              stepper.px-xl-3(:step="'pago'")
      b-container.d-lg-none.mt-2
        b-row.justify-content-center
          b-col(cols="12" sm="8" md="8" lg="6" xl="4" v-if="!showForm")
            b-row.align-items-center.title.my-2.justify-content-center
              b-col.text-center(cols="12" sm="10")
                b-button.h-auto.w-100.omnes-semibold(variant="primary" @click="showForm=!showForm" v-if="($store.state.common.subchannel!='V2_SEGURO')") Ver resumen de mi póliza
                b-button.h-auto.w-100.omnes-semibold.resumen-text(variant="primary" @click="showForm=!showForm" v-else) Resumen de mi póliza
    div.content.pt-2.container(style="max-width: initial")
      b-row.justify-content-center
        b-col.editar.d-lg-block.d-none.px-lg-0.px-xl-5.mb-lg-4(cols="12" md="8" lg="5" xl="5" :class="[($store.state.common.subchannel === 'V2_SEGURO') ? 'border-white' : '']")
          div.w-100.resumen.mb-5
            b-container
              b-row.title.my-2.my-xl-0.pt-4.justify-content-center
                b-col(cols="12")
                  h3.omnes-medium.text-primary Tu plan de protección
                hr
              b-row.px-0.title.my-2.my-xl-0.justify-content-center     
                Verify(:remarketing="remarketing" :remarketingLast="remarketingLast")
        b-col(cols="11" lg="5" xl="5")
          b-row.justify-content-center 
            b-col(cols="12" lg="11" :class="[($store.state.common.subchannel === 'V2_SEGURO') ? 'border-blue pt-2' : '']")   
              h3.text-center.omnes-medium.text-white(:class="[($store.state.common.subchannel !== 'V2_SEGURO') ? 'd-none' : '']") ¡Recibir&aacute;s S/{{parseDecimal($store.state.common.cotizacion.montoDevolucion)}}!
              p.text-center.text-white.pb-2.sub-title(v-if="$store.state.common.cotizacion.porcentaje > 100" :class="[($store.state.common.subchannel != 'V2_SEGURO') ? 'd-none' : '']") {{ parseFloat($store.state.common.cotizacion.porcentaje) - 100 }}% más de lo pagado al final de la contratación
              b-row.box-resumen.px-lg-0
                b-col.editar.d-lg-none(cols="12" v-if="showForm" :class="[($store.state.common.subchannel === 'V2_SEGURO') ? 'border-white' : '']")
                  b-col.pt-2(cols="12")
                    b-row.align-items-center
                      b-col(cols="8")
                        h4.omnes-medium Resumen de la póliza
                      b-col.text-right.d-lg-none(cols="4")
                        b-button.w-auto.h-auto(variant="white" @click="showForm=!showForm") Cerrar
                  Verify(:remarketing="remarketing" :remarketingLast="remarketingLast")
                b-col.px-0(cols="12" :class="[($store.state.common.subchannel === 'V2_SEGURO') ? 'border-white' : '']")
                  hr.d-lg-none(v-if="$store.state.common.channel !== 'V2_SEGURO'")
                  div.box-pago
                    LazyPay
          b-row.pt-3(align-h="center" :class="[($store.state.common.subchannel != 'V2_SEGURO') ? 'd-none' : '']")
            b-col(cols="12" lg="11")
              b-row.py-3(:class="[($store.state.common.subchannel === 'V2_SEGURO') ? 'border-proof' : '']")
                b-col.text-center(cols="3")
                  img(src="@/static/media/ahorro_seguro/home/social_proof.svg" alt="social proof")
                b-col.pl-0(cols="9")
                  h5.text-primary Más de <span class="omnes-semibold">2 millones</span> de personas <br>confían en Interseguro
          b-row(align-h="center" :class="[($store.state.common.subchannel != 'V2_SEGURO') ? 'd-none' : '']")
            b-col.px-0.px-xl-0.pt-3(cols="12" lg="11")
              b-row.box-beneficios.d-lg-block.px-lg-0
                b-col.pr-1.px-lg-0(cols="8" lg="12")
                  .d-flex.py-3.pb-xl-1.border-beneficios
                    img.px-2(src="@/static/media/ahorro_seguro/asistencia_medica.svg" alt="social proof")
                    div
                      h5.omnes-medium Asistencia Médica
                      h6 Envío de médico a domicilio <br class="d-lg-none">(Medicina general) por S/35 
                b-col.pl-1.px-lg-0(cols="8" lg="12")
                  .d-flex.py-3.pt-xl-1.border-beneficios
                    img.px-2(src="@/static/media/ahorro_seguro/ambulancia.svg" alt="ambulancia")
                    div
                      h5.omnes-medium Ambulancia 24/7
                      h6 Traslado en ambulancia <br class="d-lg-none">por urgencia médica
    b-modal#pay.abandono.bg-general(static size="md" centered hide-footer hide-header)
      b-container(v-if="($store.state.common.subchannel).split('_')[0] !== 'PROMOCION'")
        b-row.justify-content-center
          b-col.text-center.mb-3(cols="12" )
            img(src="@/static/media/images/abandono_pago_seguro_de_vida.svg" alt="abandonar seguro de vida con devolución")
        b-row.text-center
          b-col.px-0(cols="12")
            h2.omnes-semibold.text-white.mb-0 ¡Estás a un paso de protegerlos<br> por S/ {{ parseDecimal(parseFloat($store.state.common.cotizacion.sumaAsegurada)) }}!
          b-col(cols="12").mt-4
            h3.text-white Recuerda que si todo sale <br> bien, <span class="omnes-semibold"> te devolvemos S/ {{ parseDecimal(parseFloat($store.state.common.cotizacion.montoDevolucion)) }} </span><br> para que puedas utilizarlo en:
          b-col(cols="12").my-4
            img(src="@/static/media/images/abandono_beneficio_seguro_de_vida.svg" alt="abandonar seguro de vida con devolución")
        b-row.justify-content-center.mt-3
          b-col.text-center(cols="12")
            b-button(variant="dark" @click="$nuxt.$emit('bv::hide::modal', 'pay')") QUIERO CONTINUAR
      b-container(v-else)
        b-row.justify-content-center
          b-col.text-center.mb-5(cols="12")
            img.w-100(src="@/static/media/common/abandono_descuento.svg" alt="primera cuota gratis seguro de vida")
        b-row.justify-content-center
          b-col.text-center(cols="12")
            h2.mb-3.omnes-semibold.text-white(v-if="$store.state.common.saveClient.nombre") {{ ($store.state.common.saveClient.nombre).toUpperCase() }},
            h3.text-white Aprovecha el Cyber Interseguro, compra tu Vida con Devolución y gana <span class="omnes-semibold">un vale de S/ 250 en todas las frecuencias de pago </span>
            h3.omnes-semibold.text-white + <br>10% de dscto. <span class="omnes-regular"> en tu seguro de viaje Interseguro.</span>
            h3.omnes-semibold.text-white ¡No lo dejes pasar!
        b-row.justify-content-center.mt-5
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
      urlExclusiones: '',
      showAgent: 0,
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
      asuntoPag: {
        'universitario': [
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', tu plan de ahorro para asegurar  el futuro de tus pequeños  está reservado, continúa hacia el paso final',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', ¿Ya te decidiste? Este es el mejor precio que encontrarás para asegurar el futuro de tus pequeños',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', ¡Ya no falta nada! La seguridad de proteger el futuro de tus pequeños a un solo clic',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ',  ¡Ya no falta nada! La seguridad de proteger el futuro de tus pequeños a un solo clic'
        ],
        'jubilacion':  [
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', tu plan de ahorro para asegurar tu futuro está reservado, continúa hacia el paso final',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', ¿Ya te decidiste? Este es el mejor precio que encontrarás para asegurar tu futuro',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', ¡Ya no falta nada! La seguridad de proteger tu futuro a un solo clic',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ',  ¡Ya no falta nada! La seguridad de proteger tu futuro a un solo clic'
        ],
        'proteccion': [
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', tu plan de protección para quienes más amas está reservado, continúa hacia el paso final' ,
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', ¿Ya te decidiste? Este es el mejor precio que encontrarás para proteger a quienes más amas',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', ¡Ya no falta nada! La seguridad de proteger a quienes más amas a un solo clic',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ',  ¡Ya no falta nada! La seguridad de proteger a quienes más amas a un solo clic'
        ],
        'ahorroseguro': [
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', el crecimiento de tus ahorros está asegurado, continúa hacia el paso final' ,
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', ¿Ya te decidiste? Esta es la mejor manera que encontrarás de ahorrar tu  dinero',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', ¡Ya no falta nada! Haz crecer tus ahorros y protege a los que más amas con un solo clic',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ',  ¿Aún no te decides? ¡Empieza a ahorrar desde hoy con los mejores beneficios!'
        ],
        'vida': [
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', tu plan está reservado, continúa hacia el paso final',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', ¡Decídete ya! Este es el mejor precio que encontrarás',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', ¡ya no falta nada! La seguridad de tu familia a un solo clic',
          (this.$store.state.common.saveClient.nombre).toUpperCase() + ', ¿Aún no te decides? ¡Protege a los que más amas desde hoy!'
        ] 
      },
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
            url: (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? process.env.base + 'seguro-de-vida/universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? process.env.base + 'seguro-de-vida/ahorro-jubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? process.env.base + 'seguro-de-vida/proteccion-segura' : (this.$store.state.common.subchannel === 'SIN_BENEFICIARIOS') ? process.env.base + 'seguro-de-vida/ahorro-seguro/v2' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? process.env.base + 'seguro-de-vida/ahorro-seguro' : process.env.base + 'seguro-de-vida/vida-con-devolucion',
            plantilla:{
              1: (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'pago_universitario-01-02-03-04.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'pago_jubilacion-01-02-03-04.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'pago_proteccion-01-02-03-04.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'pago_ahorroseguro-01-02-03.html' : 'pago-01-02-03.html',
              2: (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'pago_universitario-01-02-03-04.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'pago_jubilacion-01-02-03-04.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'pago_proteccion-01-02-03-04.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'pago_ahorroseguro-01-02-03.html' : 'pago-01-02-03.html',
              3: (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'pago_universitario-01-02-03-04.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'pago_jubilacion-01-02-03-04.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'pago_proteccion-01-02-03-04.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'pago_ahorroseguro-01-02-03.html' : 'pago-01-02-03.html',
              4: (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'pago_universitario-01-02-03-04.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'pago_jubilacion-01-02-03-04.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'pago_proteccion-01-02-03-04.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'pago_ahorroseguro-04.html' : 'pago-04.html'
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
            asunto1: '',
            asunto2: '',
            asunto3: '',
            asunto4: ''
          },
          datosTitular: this.$store.state.common.saveClient,
          remitente: {
            correoRemitente: (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'seguro.universitario@interseguro.com.pe' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'ahorro.jubilacion@interseguro.com.pe' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'proteccion.segura@interseguro.com.pe' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'ahorro.seguro@interseguro.com.pe' : 'segurodevidacondevolucion@interseguro.com.pe',
            correoRemitenteDisplay: (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'Interseguro - Seguro universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'Interseguro - Ahorro jubilación' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'Interseguro - Protección segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'Interseguro - Ahorro seguro' : 'Interseguro - Seguro de Vida'
          }
        }
      },
      remarketingLast: {},
      interval: null,
      codigoAgente: null
    }
  },
  created () {
    this.$nuxt.$emit('show-loader', {
      text: 'Estamos obteniendo tus datos...'
    })
    this.urlExclusiones = require('./../../../static/docs/Exclusiones-VidaConDevolucion.pdf')
  },
  mounted () {
    document.getElementById('is').addEventListener('mouseleave', this.mouseLeave, { passive: true })
    window.dataLayer = window.dataLayer || []
    this.interval = setInterval(this.startSessionSave, 2000)
    // this.interval = setInterval(this.startSessionSave, 10000)
    window.dataLayer.push({
      'event': 'virtualPageView',
      'pageTitle': 'Pago | ' + process.env.channel[process.env.subChannel[this.$store.state.common.subchannel]].PAGE_TITLE,
      'pageUrl': process.env.channel[process.env.subChannel[this.$store.state.common.subchannel]].URL_BASE  + 'paso/pago/'
    })
    let productName = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'Vida con devolución Univ' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'Vida con devolución Jub' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'Vida con devolución Segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'Vida con devolución Seguro' : 'Vida con devolución'
    let productId = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'VidaUniv' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'VidaJub' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'VidaSegura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'VidaSeguro' : 'VidaCash'
    let primaRecurrente = parseFloat(this.$store.state.common.cotizacion.primaRecurrente)
    let primaFrecuencia = (this.$store.state.common.cotizacion.frecuenciaPago === 'M') ? (primaRecurrente * 12) : (this.$store.state.common.cotizacion.frecuenciaPago === 'T') ? (primaRecurrente * 4) : (this.$store.state.common.cotizacion.frecuenciaPago === 'S') ? (primaRecurrente * 2) : primaRecurrente
    window.dataLayer.push({
      'event': 'EECcheckout',
      'ecommerce': {
        'checkout': {
            'actionField': {'step': 1},
            'products': [{
              'name': productName,
              'id': productId,
              'price': primaFrecuencia.toString(),
              'quantity': '1',
              'category': 'Póliza'        
            }]
          }
      }
    })

    this.tracking.errorType = ''
    this.tracking.errorData = ''
    this.tracking.data.provider = this.$store.state.payment.provider
    this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
      // console.log('tracking datos_tarjeta', resTracking)
    })
    if (this.$store.state.common.identificador && this.$store.state.common.pantalla != 1) {
      this.$store.commit('common/setIdentificador', null)
    }
    if (!this.$store.state.common.showModalOnce && this.$store.state.common.channel !='AHORRO_SEGURO') { this.$parent.$nuxt.$emit('bv::show::modal', 'modalInfo') }
  },
  methods: {
    mouseLeave (e) {
      if ((e.clientX < 0 || e.clientY < 0) && !this.$store.state.common.leaveMessage) {
        this.$store.commit('common/setLeaveMessage', 1)
        document.getElementById('is').removeEventListener('mouseleave', this.mouseLeave, { passive: true })
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
        this.remarketing.detalle.datosProducto.asunto1 = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ?  this.asuntoPag.universitario[0] : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? this.asuntoPag.jubilacion[0] : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? this.asuntoPag.proteccion[0] : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? this.asuntoPag.ahorroseguro[0] : this.asuntoPag.vida[0]
        this.remarketing.detalle.datosProducto.asunto2 = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ?  this.asuntoPag.universitario[1] : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? this.asuntoPag.jubilacion[1] : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? this.asuntoPag.proteccion[1] : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? this.asuntoPag.ahorroseguro[1] : this.asuntoPag.vida[1]
        this.remarketing.detalle.datosProducto.asunto3 = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ?  this.asuntoPag.universitario[2] : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? this.asuntoPag.jubilacion[2] : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? this.asuntoPag.proteccion[2] : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? this.asuntoPag.ahorroseguro[2] : this.asuntoPag.vida[2]
        this.remarketing.detalle.datosProducto.asunto4 = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ?  this.asuntoPag.universitario[3] : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? this.asuntoPag.jubilacion[3] : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? this.asuntoPag.proteccion[3] : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? this.asuntoPag.ahorroseguro[3] : this.asuntoPag.vida[3]
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
    },
    exclusionesAmplitude () {
      this.$amplitude.getInstance()
      .logEvent(
        'Vida - Exclusiones Vistas',
        {
          'Selección Pop Up': 'Ver exclusiones'
        }
      )
    },
    hideModal () {
      this.$store.commit('common/setShowModalOnce', 1)
      this.$amplitude.getInstance()
      .logEvent(
        'Vida - Exclusiones Vistas',
        {
          'Selección Pop Up': 'Continuar'
        }
      )
      window.dataLayer.push({
        'event': 'PCotizar AceptarExclusiones',
        'category': 'Paso Cotizar',
        'action': 'Click',
        'label': 'Aceptar exclusiones'
      })
      this.$nuxt.$emit('bv::hide::modal', 'modalInfo')
    }
  },
  destroyed () {
    document.getElementById('is').removeEventListener('mouseleave', this.mouseLeave, { passive: true })
    clearInterval(this.interval)
  },
  components: {
    Stepper,
    Verify,
    LazyPay
    // LazyPay: () => {if (process.client) { return import('@/components/LazyPay') }}
  },
  middleware: 'is-protect-page'
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
