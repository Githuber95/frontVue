<template lang="pug">
  b-row#form-calculate.justify-content-center
    h3.text-primary.omnes-medium.text-center.mt-5.mt-lg-0(style="color: #0855C4!important") ¡Cotiza y protege!
    b-col(cols="12" sm="10" md="12" lg="12" xl="11")
      b-form
        b-row.mt-4.p-relative
          // sumaAsegurada
          b-col(cols="12")
            b-form-select.mb-2.valid(id="sumaAsegurada" variant='success' @change="makeQuote('periodo', 'sumaAsegurada', $event)" :options="toCalculate.rangoSumaAseguradaSoles" v-model="formQuote.sumaAsegurada" value-field="key" text-field="value")
            label(for="sumaAsegurada" placeholder="Quiero proteger a quienes más amo por" v-if="$store.state.common.channel != 'ENDOSOS'")
            label(for="sumaAsegurada" :style="{ height: ($store.state.common.subchannel == 'ENDOSOS_MULTIBANCOS') ? '2.5rem' : 'initial' }" placeholder="Mi cobertura de fallecimiento será" v-else :class="[$store.state.common.channel === 'ENDOSOS' ? 'mb-0' : ''] " )
          b-col.my-3.mt-xl-0.mb-xl-3(cols="12" v-if="$store.state.common.channel === 'ENDOSOS'")
            h6.lh-1.pt-1.pt-xl-0(style="color: #0855c4;") El monto de cobertura de fallecimiento debe ser igual o mayor al monto de tu crédito (monto max. S/200,000)
        b-row
          // Periodo
          b-col(cols="12")
            b-form-select.mb-2(id="periodo" ref="periodo" variant='success' :class="[formQuote.periodoPago ? 'valid' : '']" @change="makeQuote('frecuencia', 'periodo')" :options="toCalculate.periodosCobertura" v-model="formQuote.periodoPago" value-field="key" text-field="value")
            label(for="periodo" placeholder="Por un período de" v-if="$store.state.common.channel != 'ENDOSOS'")
            label(for="periodo" :style="{ height: ($store.state.common.subchannel == 'ENDOSOS_MULTIBANCOS') ? '2.5rem' : 'initial' }" placeholder="Por un período" v-else :class="[$store.state.common.channel === 'ENDOSOS' ? 'mb-0' : ''] "  )
          b-col.my-3.mt-xl-0.mb-xl-3(cols="12" v-if="$store.state.common.channel === 'ENDOSOS'")
            h6.lh-1.pt-1.pt-xl-0(style="color: #0855c4;") El periodo debe ser igual o mayor del tiempo del pago de tu crédito (periodo min. 10 años)
          // Frecuencia
          b-col(cols="12" :class="[ $store.state.common.channel === 'ENDOSOS' ? 'mb-xl-1' : 'mb-xl-3' ]")
            b-form-select.mb-2#depositare.ml-0(ref="frecuencia" :class="[formQuote.frecuenciaPago ? 'valid' : '']" @change="makeQuote('', 'depositare', $event)" v-model="formQuote.frecuenciaPago" :options="toCalculate.frecuenciaPago" value-field="key" text-field="value")
            label(for="depositare" placeholder="Depositaré de manera" v-if="$store.state.common.channel != 'ENDOSOS'")
            label(for="depositare" :style="{ height: ($store.state.common.subchannel == 'ENDOSOS_MULTIBANCOS') ? '2.5rem' : 'initial' }" placeholder="Frecuencia de pago" v-else  )
        section(v-if="showPercent && formQuote.periodoPago && formQuote.frecuenciaPago")
          // COVERAGE ADICIONAL
          coverage-adicional(@setMainValue="setCoverageAdicional($event)" :form="formQuote" :toCalculate="toCalculate" :formAdicional="formAdicional" v-if="$store.state.common.channel === 'ENDOSOS'")
          b-row.justify-content-center.mb-1
            b-col.px-0.py-2.d-xl-none(cols="12")
              h4.omnes-medium.text-center.text-primary(style="color: #454A6C!important") Si todo sale bien, puedes <br> recuperar todo tu dinero
            b-col.px-0.py-2.d-none.d-xl-block(cols="12")
              h4.omnes-medium.text-center Si todo sale bien, puedes <br> recuperar todo tu dinero
          b-row(:class="[formQuote.periodoPago < 16 ? 'pb-2' : 'pb-4' ]")
            b-col
              div.text-center.primaInterval.omnes-medium(style="padding-bottom: 0px; height: 100%;background: #F6F6F8;")
                | {{ objCalculo.porcentajeMin }}%
                div
                  span.primaIntervalText M&iacute;nimo
            b-col.box.col-border(cols="7" style="padding: 2px;border: 1px solid #D1D1D1;border-radius: 4px;")
              .box.d-flex.justify-content-between.align-items-center
                img.back-prima-recurrente#btn-minus(src="@/static/media/icons/pasos/cotiza/-.svg" alt="disminuir periodo de pago prima recurrente" style="background-color: { $store.state.common.subchannel=='ENDOSOS' ? '#00BB31!important;' : '' }" @click="goBack(objCalculo.porcentajeSelec)")
                div(style="position: relative")
                  input#pagoPrima(type="text" :value="objCalculo.porcentajeSelec" disabled)
                  h5.omnes-medium {{ objCalculo.porcentajeSelec }}%
                img.next-prima-recurrente#btn-add(src="@/static/media/icons/pasos/cotiza/+.svg" alt="aumentar periodo de pago prima recurrente" style="background-color: { $store.state.common.subchannel=='ENDOSOS' ? '#00BB31!important;' : '' }" @click="goNext(objCalculo.porcentajeSelec)")
            b-col
              div.text-center.primaInterval.omnes-medium(style="padding-bottom: 0px; height: 100%;background: #F6F6F8;")
                | {{ objCalculo.porcentajeMax }}%
                div
                  span.primaIntervalText M&aacute;ximo
          b-row.pb-4(v-if="formQuote.periodoPago < 16 && $store.state.common.channel != 'ENDOSOS'")
            b-col
              h6.omnes-semibold.text-center(style="color: #0855c3;") Para m&aacute;s de 150%, elige el periodo a partir de 16 años
          section.py-3.py-lg-4.resumen-cotizacion(style="background:#F6F6F8; border-radius: 12px;")
            b-row
              div.box-promocion(v-if="channelDiscount")
                p.omnes-semibold.py-1.text-center {{ parseOneDecimal(parseFloat(((toCalculateSinDescuento.primaRecurrente - toCalculate.primaRecurrente) / toCalculateSinDescuento.primaRecurrente) * 100)) }}% dscto.</span>
              // Monto de prima
              b-col.mb-xl-1.pr-0.text-center(cols="12")
                span Pagarás de manera <span style='text-transform: lowercase; display: inline-block;'> {{ getTextFrecuenciaPago() }}: </span>
              b-col.mt-1.mb-xl-1.text-center.pl-0(cols="12")
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: 1.1rem;" v-if="!formAdicional.montoDevolucion") S/ {{ parseFloat(toCalculate.primaRecurrente) }}
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: 1.1rem;" v-else) S/ {{ parseDecimal(parseFloat(toCalculate.primaRecurrente) + parseFloat(formAdicional.primaRecurrente)) }}
                h5.spacing-transition.d-block(style="font-size: .9rem;color: #6E7288" v-if="channelDiscount") Precio regular: S/{{ parseDecimal(parseFloat(toCalculateSinDescuento.primaRecurrente)) }}
            b-row.mt-3#devolucion
              b-col.pr-0(cols="12")
                span.d-block.text-center Tu monto de devoluci&oacute;n
                // Al finalizar la póliza recibirás {{ formQuote.porcentaje }}%:
              b-col.text-center.pl-0.mt-1(cols="12")
                h4#devolucionMoney.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: 1.1rem;" v-if="!formAdicional.montoDevolucion") S/ {{ parseDecimal(parseFloat(toCalculate.montoDevolucion)) }}
                h4.text-primary.omnes-semibold(style="font-size: 1.1rem;"  v-else) S/ {{ parseDecimal(parseFloat(toCalculate.montoDevolucion) + parseFloat(formAdicional.montoDevolucion)) }}
            b-row.mt-3#cobertura-fallecimiento(v-if="formAdicional.montoDevolucion")
              b-col.pr-0(cols="12")
                span.d-block.text-center Cobertura por fallecimiento
                // Al finalizar la póliza recibirás {{ formQuote.porcentaje }}%:
              b-col.text-center.pl-0.mt-1(cols="12")
                h4#devolucionMoney.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: 1.1rem;" ) S/ {{ (formQuote.sumaAsegurada).toString().split(/(?=(?:\d{3})+$)/).join(',') }}
            b-row.mt-3#cobertura-ivalidez-total(v-if="$store.state.common.channel === 'ENDOSOS'")
              b-col.pr-0(cols="12")
                span.d-block.text-center Cobertura por invalidez total y <br> permanente
                // Al finalizar la póliza recibirás {{ formQuote.porcentaje }}%:
              b-col.text-center.pl-0.mt-1(cols="12")
                h4#devolucionMoney.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: 1.1rem;") S/ {{ (formAdicional.sumaAsegurada).toString().split(/(?=(?:\d{3})+$)/).join(',') }}
          section.container(v-if="$store.state.common.channel == 'ENDOSOS'")
            b-row.my-3.box-endosos
              b-col.px-lg-0(cols="12")
                b-row 
                  b-col(cols="12")
                    p Este seguro no cubre preexistencias a menos que sean declaradas por el contratante y aceptadas por Interseguro.
                  b-col(cols="10")
                    p.text-blue Por favor, indícanos si tienes preexistencias y/o tratamiento actual en proceso a declarar.
                  b-col(cols="2")
                    .switcher-box.mt-lg-1.mb-lg-2
                      span.switcher.switcher-1
                        input#switcher_invalidez-total(type='checkbox' v-model="preExistencia" @change.prevent="getPreExistencia($event.target.checked)")
                        label.cursor-pointer(for='switcher_invalidez-total')
      section.mt-4.mt-xl-3
        b-row
          b-col.text-center(cols="12")
            b-button.py-2.mt-3.mb-4#btn-cotizar(variant="dark" @click="goPagePay($event)" :class="[formQuote.periodoPago && formQuote.sumaAsegurada && formQuote.frecuenciaPago ? '' : 'd-none']") Continuar
      section.mb-3(v-if="showPercent && formQuote.periodoPago && formQuote.frecuenciaPago && $store.state.common.channel != 'ENDOSOS'")
        b-container
          b-row.mb-5
            b-col.text-center(cols="12")
              div(style="cursor:pointer outline:none;" v-b-modal.sendQuote)
                img(src="@/static/media/icons/envio_cotizacion-seguro_vida.svg" alt="envio de cotizacion de seguro de vida")
    b-modal#sendQuote(static v-if="$store.state.common.saveClient.email" size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.text-right
        img.image-9(@click='hideModal("sendQuote")' src='@/static/media/common/close-modal.svg' width='35' alt='icon close' style="cursor: pointer;")
      b-container
        b-row.text-center
          b-col
            img(v-if="$store.state.common.channel === 'WEB'" src='@/static/media/common/email.svg' alt="icono de envio de correo" width='85')
            img(v-else src='@/static/media/common/email-interbank.svg' alt="icono de envio de correo" width='85')
        b-row.text-center
          b-col
            h3.text-center.omnes-medium Ingresa tu correo para<br> enviarte la cotización
            b-form-input#email.d-block(autocomplete="off" type='text' @blur="$v.sendQuotation.email.$touch()" v-model="sendQuotation.email" aria-label="Ingrese su correo" placeholder="ejem.lperez@gmail.com" :state="$v.sendQuotation.email.$dirty ? !$v.sendQuotation.email.$error : null" aria-describedby="emailFeedback")
          b-col(cols="12").mb-4  
            b-form-invalid-feedback#emailFeedback(v-if="$v.sendQuotation.email.$error && !$v.sendQuotation.email.email")
              | Ingresa un correo válido
        b-row.mb-4.text-center
          b-col(cols="12")
            b-button.w-75(variant="dark" @click='confirmQuotation' :class="[$v.sendQuotation.$invalid ? 'disabled' : '']") ENVIAR
    b-modal#confirmSendQuote(static size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.text-right
        img.image-9(src='@/static/media/common/close-modal.svg' width='35', alt='icon close' style="cursor: pointer;" @click="hideModal('confirmSendQuote')")
      b-container
        b-row
          b-col.text-center
            img(v-if="$store.state.common.channel === 'WEB'"  src='@/static/media/common/confirm-quotation.svg' alt="icono de estrella confirmar" width='70')
            img(v-else src='@/static/media/common/confirm-quotation-interbank.svg' alt="icono de estrella confirmar" width='70')
        b-row.text-center
          b-col.text-center
            h3.omnes-medium ¡Tu cotización ha<br> sido enviada!
    b-modal#optionVidaFree(static size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.text-right
        img.image-9(@click="hideModalVidafree('optionVidaFree')" src='@/static/media/common/close-modal.svg', width='35', alt='icon close' style="cursor: pointer;")
      b-container.mt-2
        b-row
          b-col.text-center.px-0
            h3.text-primary(v-if="!maxSuma") Las coberturas mayores a <br> S/200, 000 requieren de una <br>asesoría personalizada. <br><span class="omnes-medium"> ¿Deseas ser contactado por <br>uno de nuestros agentes <br>de venta?</span>
            h3.text-primary(v-else) Las coberturas mayores a <br> S/{{(toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.max).toString().split(/(?=(?:\d{3})+$)/).join(',')}} requieren de una <br>asesoría personalizada. <br><span class="omnes-medium"> ¿Deseas ser contactado por <br>uno de nuestros agentes <br>de venta?</span>
        b-row.my-4
          b-col
            h3.text-center.omnes-medium.mb-2 Mi número de celular es:
            b-form-input(autocomplete="off" type='tel' v-model="clientFree.telefono" aria-label="Ingresa tu N° de celular" placeholder="Ingresa tu N° de celular" :maxLength="9")
        b-row.mb-4
          b-col(cols="12")
            b-button.w-100(variant="dark" @click="saveClientData") SÍ, QUIERO QUE ME CONTACTEN
    b-modal#confirmVF(static v-if="$store.state.common.saveClient.nombre" size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.text-right
        img.image-9(@click="hideModalVidafree('confirmVF')" src='@/static/media/common/close-modal.svg', width='35', alt='icon close' style="cursor: pointer;")
      b-container.mt-2
        b-row
          b-col.text-center
            img(v-if="$store.state.common.channel === 'WEB'" src='@/static/media/common/star.svg' alt="icono de estrella confirmar" width='85')
            img(v-else src='@/static/media/common/star-interbank.svg' alt="icono de estrella confirmar" width='85')
        b-row.my-2
          b-col.text-center.my-3
            h3.text-primary.omnes-medium ¡{{ capitalize( $store.state.common.saveClient.nombre) }}, <span class="omnes-regular">nos contactaremos <br> contigo lo más pronto <br> posible!</span>
        b-row.mb-4.text-center
          b-col(cols="12")
            b-button.w-50(variant="dark" @click="hideModalVidafree('confirmVF')") ENTENDIDO
</template>

<script>
import * as _ from 'lodash'
import Swal from 'sweetalert2'
import moment from 'moment'

import CoverageAdicional from '@/components/CoverageAdicional'

import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  props: ['tracking', 'formQuote', 'showPercent', 'toCalculate', 'toCalculateSinDescuento', 'remarketing', 'formQuoteLast'],
  data () {
    return {
      preExistencia: this.$store.state.payment.enfermedadesGraves,
      formAdicional: {
        codCobertura: '',
        sumaAsegurada: '',
        montoDevolucion: '',
        primaRecurrente: '',
        periodoVigencia: ''
      },
      modalSA: false,
      modalPD: false,
      channelDiscount: false,
      maxPD: 200,
      maxSuma: 0,
      // showPercent: false,
      sendQuotation: {
        numeroDocumento: this.$store.state.common.saveClient.dniCliente,
        urlRemarketing: '',
        urlCancelacion: '', // enviar la url generada de makeRemarketing
        email: '',
        cotizacion: {
        }
      },
      clientFree: {
        numeroDocumento: this.$store.state.common.saveClient.numeroDocumento,
        telefono: ''
      },
      idProducto: 2,
      edad: 0,
      // sizeRangeFinal: 0,
      idSelected: 0,
      objCalculo: {
        porcentajeMin: 0,
        porcentajeMax: 150,
        porcentajeSelec: 100
      },
      resumen: {
        ahorroAnual: 0,
        ahorroTotal: 0,
        ganancia: 0
      }
    }
  },
   mixins: [
    validationMixin
  ],
  validations: {
    sendQuotation: {
      email: {
        required,
        email
      }
    }
  },
  created () {
    this.showPercent = false
    // console.log('.................created FC.................')
  },
  updated () {
    // console.log('updated')
  },
  destroyed () {
    this.$nuxt.$off('generate-parametter-to-calculate')
    // this.$nuxt.$off('show-range')
  },
  mounted () {
    window.dataLayer = window.dataLayer || [ ]
    this.$nuxt.$on('generate-parametter-to-calculate', ({saveClient}) => {
      this.generateParametter(saveClient)
    })
    this.$nuxt.$on('show-range-ibk', ({ respuesta, sinDescuento }) => {
      this.sendQuotation.email = this.$store.state.common.saveClient.email
      this.toCalculate.porcentajeDevolucion.filter((f, index) => {
        if ( index < (Object.keys(respuesta).length)) {
          if ((f.key).toString() === respuesta[(f.key).toString()].porcentajeDevolucion) {
            f.montoDevolucion = respuesta[(f.key).toString()].montoDevolucion
            f.primaRecurrente = respuesta[(f.key).toString()].primaRecurrente
            f.primaClienteAnual = respuesta[(f.key).toString()].primaClienteAnual
          }
        } else {
          this.toCalculate.porcentajeDevolucion[index].montoDevolucion = null
          this.toCalculate.porcentajeDevolucion[index].primaClienteAnual = null
          this.toCalculate.porcentajeDevolucion[index].primaRecurrente = null
          // delete this.toCalculate.porcentajeDevolucion[index]
        }
      })
      let porcentajeD = (this.formQuote.porcentaje).toString()
      if (!respuesta[porcentajeD]) {
        this.formQuote.porcentaje = 100
        porcentajeD = (this.formQuote.porcentaje).toString()
      } 
      this.toCalculate.primaRecurrente = respuesta[porcentajeD].primaRecurrente
      this.toCalculate.montoDevolucion = respuesta[porcentajeD].montoDevolucion
      if (this.channelDiscount) {
        this.toCalculateSinDescuento.porcentajeDevolucion.filter((x, i) => {
          if ((x.key).toString() === sinDescuento[(x.key).toString()].porcentajeDevolucion) {
            x.montoDevolucion = sinDescuento[(x.key).toString()].montoDevolucion
            x.primaRecurrente = sinDescuento[(x.key).toString()].primaRecurrente
            x.primaClienteAnual = sinDescuento[(x.key).toString()].primaClienteAnual
            // input range
            // x.sizeRange = sizeRange[i]
          }
        })
        this.toCalculateSinDescuento.primaRecurrente = sinDescuento[porcentajeD].primaRecurrente
        this.toCalculateSinDescuento.montoDevolucion = sinDescuento[porcentajeD].montoDevolucion
      }
      this.toCalculate.primaClienteAnual = respuesta[porcentajeD].primaClienteAnual
      // input range
      // document.getElementById('range-tooltip').style.left = this.sizeRangeFinal + 'px'
      document.getElementById('btn-cotizar').removeAttribute('disabled')
      if (this.$refs['devolucion']) {
        var refX = (this.$refs['devolucion']).offsetTop
        window.scrollTo(0, refX - 20)
      }
      this.tracking.data = this.formQuote
      this.tracking.screen = 'cotizador'
      this.tracking.errorType = ''
      this.tracking.errorData = ''
      this.tracking.trackingId = this.$store.state.common.trackingId
      this.tracking.data.primaRecurrente = this.toCalculate.primaRecurrente
      // console.log('SUMA ASEGURADA')
      // console.log(this.formQuote.sumaAsegurada)
      // console.log(this.formQuote.porcentaje)
      // console.log(this.formQuote.porcentaje)
      if (parseInt(this.formQuote.porcentaje) >= 100 && ((this.$store.state.common.subchannel).split('_VALE_')[0] === 'IBK_PROMOCION' || this.$store.state.common.subchannel === 'IBK_CROSS')) {
        this.$nuxt.$emit('show-alert')
      } else {
        this.$nuxt.$emit('hide-alert')
      }
      this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
        // console.log('tracking Cotización RANGE', resTracking)
      })
      this.$nuxt.$emit('hide-loader')
    })
  },
  methods: {
    alertGoHome () {
      Swal.fire(
        '',
        '¡Hola! En estos momentos no contamos con una plan que se adecúe a tus necesidades. Para mayor información puedes comunicarte al (01) 500-0000',
        'info'
      )
      setTimeout(() => {
        let goPath = (this.$store.state.common.channel === 'IBK') ? '/interbank' : (this.$store.state.common.subchannel === 'ENDOSOS') ? '/endosos' : (this.$store.state.common.subchannel === 'ENDOSOS_MULTIBANCOS') ? '/endoso-con-devolucion' : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? '/universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? '/proteccion-segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? '/ahorro-seguro' : '/vida-con-devolucion'
        this.$nuxt.$router.push({ path: goPath })
      }, 1500)
    },
    capitalize (nombreCompleto) {
      nombreCompleto = nombreCompleto.toLowerCase()
      return nombreCompleto.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
    },
    
    setCoverageAdicional (form) {
      //- console.log('update setCoverageAdicional: ', form)
      this.$set(this.formAdicional, 'codCobertura', form.codCobertura)
      this.$set(this.formAdicional, 'sumaAsegurada', form.sumaAsegurada)
      this.$set(this.formAdicional, 'montoDevolucion', form.montoDevolucion)
      this.$set(this.formAdicional, 'primaRecurrente', form.primaRecurrente)
      this.$set(this.formAdicional, 'periodoVigencia', form.periodoPago)
      this.$set(this.formAdicional, 'periodoPago', form.periodoPago)
      return this.formAdicional
    },
    parameterQuote (fecha) {
      this.$store.dispatch('common/parameterQuote', {
        numeroDocumento: this.$store.state.common.dniCliente,
        idProducto: this.idProducto,
        edad: (moment().diff(fecha, 'years'))
      }).then(res => {
        if (res.code === '01') {
          this.$store.commit('common/setShowModalOnce', 1)
          // console.log('codigo 01 para mostrar parametros')
          window.dataLayer.push({
            'event': 'PCotizarGuardar parámetros para cotizar',
            'category': 'Paso Cotizar',
            'action': 'Cargar parámetros',
            'label': 'parametros para cotizar'
          })
          // Validar por edad maxima ingreso
          // Suma asegurada --------------------------------------
          let coberturaFallecimiento = (res.data.producto.planes[0].coberturas).filter(f => {
            return (f.nombre === 'Fallecimiento')
          })[0]
          let coberturaInvalidezTotal = (res.data.producto.planes[0].coberturas).filter(f => { return (f.nombre === 'Invalidez total por Accidente o Enfermedad como adelanto de capital') })[0]
          let coberturaInvalidezAccidental = (res.data.producto.planes[0].coberturas).filter(f => { return (f.nombre === 'Invalidez Accidental') })[0]
          if (coberturaFallecimiento.edadMaximaIngreso >= (moment().diff(fecha, 'years'))) {
            this.toCalculate.coberturaFallecimiento = coberturaFallecimiento
            this.toCalculate.coberturaInvalidezTotal = coberturaInvalidezTotal
            this.toCalculate.coberturaInvalidezTotal.codCobertura = coberturaInvalidezTotal.idCobertura
            this.toCalculate.coberturaInvalidezAccidental = coberturaInvalidezAccidental
            this.toCalculate.coberturaInvalidezAccidental.codCobertura = coberturaInvalidezAccidental.idCobertura
            this.toCalculate.rangoSumaAseguradaSoles = []
            if (this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.max < 0 || this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.min < 0) {
              this.$nuxt.$emit('hide-loader')
              this.alertGoHome()
            }
            this.toCalculate.rangoSumaAseguradaSoles.min = this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.min
            //- this.toCalculate.rangoSumaAseguradaSoles.max = this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.max
            this.toCalculate.rangoSumaAseguradaSoles.max = 200000
            if (this.toCalculate.rangoSumaAseguradaSoles.min > this.toCalculate.rangoSumaAseguradaSoles.max) {
              this.$nuxt.$emit('bv::hide::modal', 'modalInfo')
              Swal.fire(
                'Oops...!',
                '¡Lo sentimos! Por el momento no contamos con una cotización que se ajuste a tus necesidades',
                'error'
              )
              setTimeout(() => {
                this.$nuxt.$emit('hide-loader')
                let goPath = (this.$store.state.common.channel === 'IBK') ? '/interbank' : (this.$store.state.common.subchannel === 'ENDOSOS') ? '/endosos' : (this.$store.state.common.subchannel === 'ENDOSOS_MULTIBANCOS') ? '/endoso-con-devolucion' : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? '/universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? '/proteccion-segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? '/ahorro-seguro' : '/vida-con-devolucion'
                this.$nuxt.$router.push({ path: goPath })
              }, 2500)
            } else {
              for (let i = this.toCalculate.rangoSumaAseguradaSoles.min; i <= this.toCalculate.rangoSumaAseguradaSoles.max; i++) {
                if (i % 25000 === 0) {
                  (this.toCalculate.rangoSumaAseguradaSoles).push({
                    key: i,
                    value: 'S/ ' + i.toString().split(/(?=(?:\d{3})+$)/).join(',')
                  })
                }
              }
            }
            // Agregar el maximo de rangosuma asegurado siempre y cuando sea diferente del último valor del objeto
            if (this.toCalculate.rangoSumaAseguradaSoles.max !== this.toCalculate.rangoSumaAseguradaSoles[this.toCalculate.rangoSumaAseguradaSoles.length - 1].key) {
              this.toCalculate.rangoSumaAseguradaSoles.push({
                key: this.toCalculate.rangoSumaAseguradaSoles.max,
                value: 'S/ ' + (this.toCalculate.rangoSumaAseguradaSoles.max).toString().split(/(?=(?:\d{3})+$)/).join(',')
              })
            }
            if (this.$store.state.common.channel === 'WEB') {
              // Add option to Modal Vida Free
              this.toCalculate.rangoSumaAseguradaSoles.push({ 
                key: this.toCalculate.rangoSumaAseguradaSoles.max + 1, 
                value: 'Más de S/ ' + (this.toCalculate.rangoSumaAseguradaSoles.max).toString().split(/(?=(?:\d{3})+$)/).join(',')
              })
              //- this.maxSuma = (this.toCalculate.rangoSumaAseguradaSoles.max)
              this.maxSuma = 200000
              /// penultima opcion
              this.formQuote.sumaAsegurada = (this.toCalculate.rangoSumaAseguradaSoles[this.toCalculate.rangoSumaAseguradaSoles.length - 2].key)
            } else {
              //- this.maxSuma = (this.toCalculate.rangoSumaAseguradaSoles.max)
              this.maxSuma = 200000
              // ÚLTIMA OPCION
              this.formQuote.sumaAsegurada = (this.toCalculate.rangoSumaAseguradaSoles[this.toCalculate.rangoSumaAseguradaSoles.length - 1].key)
            }
            // -----------------------------------------------------
 
            
            // Periodo: X años -----------------------------------
            let objPeriodoCobertura = res.data.producto.planes[0].periodosCobertura
            let makeMaxPC = (this.$store.state.common.channel === 'IBK') ? 20 : 24
            this.toCalculate.periodosCobertura = (objPeriodoCobertura).filter(pC => {
              if (pC.value % 2 === 0 && pC.value <= makeMaxPC) {
                pC.value = pC.value + ' ' + 'años'
                return pC.value
              }
            })
            if (this.toCalculate.periodosCobertura[this.toCalculate.periodosCobertura.length - 1].key !== objPeriodoCobertura[objPeriodoCobertura.length - 1].key && objPeriodoCobertura[objPeriodoCobertura.length - 1].key <= makeMaxPC) {
              (this.toCalculate.periodosCobertura).push({
                key: objPeriodoCobertura[objPeriodoCobertura.length - 1].key,
                value: (objPeriodoCobertura[objPeriodoCobertura.length - 1].value) + ' años'
              })
            }
            // Deposito: Mensual, trimestral, semestral o anual
            this.toCalculate.frecuenciaPago = res.data.mesesFrecuenciaPago
            this.toCalculate.periodosCobertura.unshift({ key: null, value: '', disabled: true })
            this.toCalculate.frecuenciaPago.unshift({ key: null, value: '', disabled: true })
            // % Devolucion -----------------------------------------
            this.objCalculo.porcentajeMin = (this.$store.state.common.channel === 'ENDOSOS') ? 100 : 0
            this.objCalculo.porcentajeMax = (this.$store.state.common.channel === 'ENDOSOS') ? 150 : 150
            
            this.maxPD = (this.$store.state.common.channel === 'ENDOSOS') ? 150 : 200
            this.toCalculate.porcentajeDevolucion = (res.data.producto.planes[0].porcentajeDevolucionPrima).filter(pD => {
              if (pD.value <= this.maxPD) {
                pD.value = pD.value + '%'
                return pD.value
              }
            })
            if (this.channelDiscount) {
              this.toCalculateSinDescuento.porcentajeDevolucion = _.cloneDeep(this.toCalculate.porcentajeDevolucion)
            }
            // -----------------------------------------------------
          } else {
            // console.log(coberturaFallecimiento.edadMaximaIngreso)
            // console.log((moment().diff(fecha, 'years')))
            this.$nuxt.$emit('bv::hide::modal', 'modalInfo')
            Swal.fire(
              'Oops...!',
              '¡Lo sentimos! Por el momento no contamos con una cotización que se ajuste a tus necesidades',
              'error'
            )
            setTimeout(() => {
              this.$nuxt.$emit('hide-loader')
              let goPath = (this.$store.state.common.channel === 'IBK') ? '/interbank' : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? '/universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? '/proteccion-segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? '/ahorro-seguro' : '/vida-con-devolucion'
              this.$nuxt.$router.push({ path: goPath })
            }, 2500)
          }
          this.$nuxt.$emit('hide-loader')
        } else {
          // console.log('respuesta diferente de 01', res.code)
        }
        this.$nuxt.$emit('hide-loader')
      }, res => {
        if (res.response.data.message) {
          Swal.fire(
            'Oops...!',
            res.response.data.message + ' Para mayor información puedes comunicarte al +51 933559693',
            'error'
          )
        } else {
          Swal.fire(
            'Oops...!',
            'Estamos teniendo problemas para generar los mejores planes para ti',
            'error'
          )
        }
        this.$nuxt.$emit('hide-loader')
        let goPath = (this.$store.state.common.channel === 'IBK') ? '/interbank' : (this.$store.state.common.subchannel === 'ENDOSOS') ? '/endosos' : (this.$store.state.common.subchannel === 'ENDOSOS_MULTIBANCOS') ? '/endoso-con-devolucion' : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? '/universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? '/proteccion-segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? '/ahorro-seguro' :'/vida-con-devolucion'
        this.$nuxt.$router.push({ path: goPath })
      })
    },
    generateParametter (saveClient) {
      // if (!this.$store.state.common.showModalOnce) { this.$parent.$nuxt.$emit('bv::show::modal', 'modalInfo') }
      this.formQuote.periodoPago = null
      this.formQuote.frecuenciaPago = null
      this.formQuote.sumaAsegurada = null
      let fecha = (saveClient) ? (saveClient.fechaNacimiento).replace(/\s/g, '').split('/').reverse().join('-') : (this.$store.state.common.saveClient.fechaNacimiento).replace(/\s/g, '').split('/').reverse().join('-')
      let formMakeClient = (saveClient) ? _.cloneDeep(saveClient) : _.cloneDeep(this.$store.state.common.saveClient)
      formMakeClient.channel = this.$store.state.common.channel
      formMakeClient.numeroDocumento = this.$store.state.common.dniCliente
      this.$store.dispatch('common/makeClient', formMakeClient)
      .then(res => {
        if (saveClient) {
          if (!this.$store.state.common.showModalOnce) { this.$parent.$nuxt.$emit('bv::show::modal', 'modalInfo') }
          this.$store.commit('common/setSaveClient', saveClient)
        }
        this.parameterQuote(fecha)
      }, response => {
        this.$nuxt.$emit('hide-loader')
        this.$parent.showQuote = true
        this.$store.dispatch('common/getClients', formMakeClient.numeroDocumento).then(res => {
          this.$store.commit('common/setSaveClient', {
            numeroDocumento: res.data.numeroDocumento,
            nombre: res.data.nombre,
            apellidoPaterno: res.data.apellidoPaterno,
            apellidoMaterno: res.data.apellidoMaterno,
            fechaNacimiento: res.data.fechaNacimiento,
            sexo: res.data.sexo,
            numeroTelefono: res.data.numeroTelefono,
            email: res.data.email,
            numeroDocumento: res.data.numeroDocumento
          })
        })
        if (response.response.data.code) {
          Swal.fire(
            'Oops...!',
            'No es posible modificar los datos porque el cliente ya tiene una poliza',
            'error'
          )
        } else {
          Swal.fire(
            'Oops...!',
            'Estamos teniendo problemas para realizar la venta. Para mayor información puedes comunicarte al +51 933559693',
            'error'
          )
        }
        this.parameterQuote(fecha)
        // console.log('response makeCLIENT', res.response.data.message)
      })
    },
    getValorButton (valor) {
      let index = this.toCalculate.porcentajeDevolucion.findIndex(i => i.key === valor)
      this.formQuote.porcentaje = valor
      if (parseInt(this.formQuote.porcentaje) >= 100 && ((this.$store.state.common.subchannel).split('_VALE_')[0] === 'IBK_PROMOCION' || this.$store.state.common.subchannel === 'IBK_CROSS')) {
        this.$nuxt.$emit('show-alert')
      } else {
        this.$nuxt.$emit('hide-alert')
      }
      this.toCalculate.primaRecurrente = this.toCalculate.porcentajeDevolucion[index].primaRecurrente
      this.toCalculate.montoDevolucion = this.toCalculate.porcentajeDevolucion[index].montoDevolucion
      this.toCalculate.primaClienteAnual = this.toCalculate.porcentajeDevolucion[index].primaClienteAnual
      if (this.channelDiscount) {
        this.toCalculateSinDescuento.primaRecurrente = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaRecurrente
        this.toCalculateSinDescuento.montoDevolucion = this.toCalculateSinDescuento.porcentajeDevolucion[index].montoDevolucion
        this.toCalculateSinDescuento.primaClienteAnual = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaClienteAnual
      }
      setTimeout(() => {
        if (document.getElementById('primaRecurrente')) {
          document.getElementById('primaRecurrente').classList.add('spacing-transition')
          document.getElementById('devolucionMoney').classList.add('spacing-transition')
        }
      }, 500)
      this.tracking.data = this.formQuote
      this.tracking.screen = 'cotizador'
      this.tracking.errorType = ''
      this.tracking.errorData = ''
      this.tracking.trackingId = this.$store.state.common.trackingId
      this.tracking.data.primaRecurrente = this.toCalculate.primaRecurrente
      this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
      })
      if(this.formAdicional.sumaAsegurada) {
        let valorFinal1 = {}
        valorFinal1 = this.$store.state.common.coverageAdicional[(this.formAdicional.codCobertura)].filter( x => (x.sumaAsegurada == this.formAdicional.sumaAsegurada))
                                                                .filter( sum => (sum.porcentajeDevolucion == this.formQuote.porcentaje))
        let form = {}
        form.codCobertura = valorFinal1[0].codCobertura
        form.sumaAsegurada = valorFinal1[0].sumaAsegurada
        form.montoDevolucion = valorFinal1[0].montoDevolucion
        form.primaRecurrente = valorFinal1[0].primaRecurrente
        form.periodoPago = form.periodoVigencia = this.formQuote.periodoVigencia = this.formQuote.periodoPago
        //- console.log('when change return percent', form)
        this.setCoverageAdicional( form)                                                        
      }
    },
    getValorRange (event) {
      document.getElementById('primaRecurrente').classList.remove('spacing-transition')
      document.getElementById('devolucionMoney').classList.remove('spacing-transition')
      if (event === '25') {
        event = '0'
        document.getElementById('range-tooltip').style.left = '0px'
        document.getElementById('range-porcentaje').value = '0'
        let index = 0
        this.toCalculate.primaRecurrente = this.toCalculate.porcentajeDevolucion[index].primaRecurrente
        this.toCalculate.montoDevolucion = this.toCalculate.porcentajeDevolucion[index].montoDevolucion
        this.toCalculate.primaClienteAnual = this.toCalculate.porcentajeDevolucion[index].primaClienteAnual
        if (this.channelDiscount) {
          this.toCalculateSinDescuento.primaRecurrente = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaRecurrente
          this.toCalculateSinDescuento.montoDevolucion = this.toCalculateSinDescuento.porcentajeDevolucion[index].montoDevolucion
          this.toCalculateSinDescuento.primaClienteAnual = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaClienteAnual
        }
        document.getElementById('range-porcentaje').value = '0'
        this.formQuote.porcentaje = '0'
        setTimeout(() => {
          document.getElementById('range-porcentaje').value = '0'
          document.getElementById('primaRecurrente').classList.add('spacing-transition')
          document.getElementById('devolucionMoney').classList.add('spacing-transition')
        }, 500)
      } else {
        let index = this.toCalculate.porcentajeDevolucion.findIndex(i => i.key === parseInt(event))
        document.getElementById('range-tooltip').style.left = this.toCalculate.porcentajeDevolucion[index].sizeRange + 'px'
        this.sizeRangeFinal = this.toCalculate.porcentajeDevolucion[index].sizeRange
        this.toCalculate.primaRecurrente = this.toCalculate.porcentajeDevolucion[index].primaRecurrente
        this.toCalculate.montoDevolucion = this.toCalculate.porcentajeDevolucion[index].montoDevolucion
        this.toCalculate.primaClienteAnual = this.toCalculate.porcentajeDevolucion[index].primaClienteAnual
        if (this.channelDiscount) {
          this.toCalculateSinDescuento.primaRecurrente = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaRecurrente
          this.toCalculateSinDescuento.montoDevolucion = this.toCalculateSinDescuento.porcentajeDevolucion[index].montoDevolucion
          this.toCalculateSinDescuento.primaClienteAnual = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaClienteAnual
        }
        setTimeout(() => {
          document.getElementById('primaRecurrente').classList.add('spacing-transition')
          document.getElementById('devolucionMoney').classList.add('spacing-transition')
        }, 500)
      }
      this.tracking.data = this.formQuote
      this.tracking.screen = 'cotizador'
      this.tracking.errorType = ''
      this.tracking.errorData = ''
      this.tracking.trackingId = this.$store.state.common.trackingId
      this.tracking.data.primaRecurrente = this.toCalculate.primaRecurrente
      this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
      })
    },
    parseOneDecimal (valor) {
      if (parseFloat(valor) > 999) {
        let nuevoValor = valor.toFixed('1').split('.')
        nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(',') + '.' + nuevoValor[1]
        return nuevoValor
      } else if (!parseFloat(valor)) {
        return '0'
      } else {
        return valor.toFixed('1')
      }
    },
    parseDecimal (valor) {
      if (parseFloat(valor) > 999) {
        let nuevoValor = valor.toFixed('2').split('.')
        nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(',') + '.' + nuevoValor[1]
        return nuevoValor
      } else if (!parseFloat(valor)) {
        return '0'
      } else {
        return valor.toFixed('2')
      }
    },
    parseDecimalWhithoutComma (valor) {
      if (parseFloat(valor) > 999) {
        let nuevoValor = valor.toFixed('2').split('.')
        nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join('') + '.' + nuevoValor[1]
        return nuevoValor
      } else if (!parseFloat(valor)) {
        return '0'
      } else {
        return valor.toFixed('2')
      }
    },
    goPagePay (evt) {
      console.log('goPagePay')
      let coverages = []
      evt.preventDefault()
      if (this.$store.state.common.saveClient.nombre && this.$store.state.common.saveClient.fechaNacimiento && this.$store.state.common.saveClient.sexo && this.$store.state.common.saveClient.numeroTelefono && this.$store.state.common.saveClient.email) {
        let newQuote = this.formQuote
        newQuote.sumaAsegurada = (document.getElementById('sumaAsegurada').value)
        newQuote.frecuenciaPago = (document.getElementById('depositare')).options[document.getElementById('depositare').selectedIndex].text
        newQuote.montoDevolucion = this.toCalculate.montoDevolucion
        newQuote.primaRecurrente = this.toCalculate.primaRecurrente
        newQuote.sizeRangeFinal = this.sizeRangeFinal
        // input range
        // document.getElementById('range-tooltip').style.left = self.sizeRangeFinal + 'px'
        let index = this.toCalculate.rangoSumaAseguradaSoles.findIndex(i => i.key === parseInt(this.formQuote.sumaAsegurada))
        let productNamePixel = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'segurouniversitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'ahorrojubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'proteccionsegura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'ahorroseguro' : 'segurodevida'
        window.dataLayer.push({
          'event': 'PCotizar CTA',
          'category': 'Paso Cotizar',
          'action': 'Click',
          'label': 'CTA lo quiero',
          'product': productNamePixel,
          'content_ids': 'sku00' + (index + 1),
          'content_category': 'Cobertura'+this.formQuote.sumaAsegurada,
          'porcentaje': this.formQuote.porcentaje,
          'sumaAsegurada': this.formQuote.sumaAsegurada,
          'periodo vigencia': this.formQuote.periodoVigencia,
          'frecuencia pago': this.formQuote.frecuenciaPago
        })
        window.dataLayer.push({
          'event': 'EECaddToCart',
          'ecommerce': {
            'currencyCode': 'PEN',
            'add': {                    
              'products': [{
                'name': 'Vida con devolución IBK',
                'id': 'VidaIBK',
                'price': (this.toCalculate.primaClienteAnual).toString(),
                'quantity': '1',
                'category': 'Póliza'        
                }]
            }
          }
        })
        window.dataLayer.push({
          'event': 'userData',
          'firstname': this.$store.state.common.saveClient.nombre,
          'lastname': this.$store.state.common.saveClient.apellidoPaterno + ' '+ this.$store.state.common.saveClient.apellidoMaterno,
          'email': this.$store.state.common.saveClient.email,
          'phone': this.$store.state.common.saveClient.numeroTelefono,
          'monto': (this.toCalculate.primaClienteAnual).toString()
        });
        this.$store.commit('common/setPrimaClienteAnual', (this.toCalculate.primaClienteAnual).toString())
        this.$store.commit('common/setCotizacion', this.formQuote)
        if (this.formAdicional.sumaAsegurada) {
          this.formAdicional.description = (this.toCalculate.coberturaInvalidezTotal.codCobertura === this.formAdicional.codCobertura) ? 'Fallecimiento  invalidez total' : 'Fallecimiento accidental'
          console.log('COBERTURA ELEGIDA', this.formAdicional)
          coverages.push({
            "codCobertura": this.toCalculate.coberturaFallecimiento.idCobertura,
            "sumaAsegurada": this.formQuote.sumaAsegurada,
            "periodoVigencia": this.formQuote.periodoVigencia,
            "periodoPago": this.formQuote.periodoPago
          })
          
          coverages.push(this.formAdicional)
          //- console.log('COVERAGE FINAL CON ADICIONAL: ', coverages)
          
          //- console.log('COTIZACION ADICIONAL GUARDANDO: ', this.formAdicional)
        }
        this.$store.commit('common/setCotizacionAdicional', coverages) 
        let goPath = (this.$store.state.common.channel === 'IBK') ? '/interbank/paso/pago' : (this.$store.state.common.subchannel === 'ENDOSOS') ? '/endosos/paso/pago' : (this.$store.state.common.subchannel === 'ENDOSOS_MULTIBANCOS') ? '/endoso-con-devolucion/paso/pago' : '/paso/pago'
        console.log('gooo', goPath)
        this.$nuxt.$router.push({ path: goPath })
      } else {
        Swal.fire(
          'Oops...!',
          'Por favor, verifica tus datos',
          'error'
        )
      }
    },
    makeQuote (reference, addValid, event) {
      //console.log(this.formQuote.periodoPago)
      this.objCalculo.porcentajeSelec = 100
      this.getValorButton(this.objCalculo.porcentajeSelec)
      if (this.formQuote.periodoPago > 15) {
        this.objCalculo.porcentajeMax = (this.$store.state.common.channel === 'ENDOSOS') ? 150 : 200
      } else {
        this.objCalculo.porcentajeMax = (this.$store.state.common.channel === 'ENDOSOS') ? 150 : 150
      }
      if ('sumaAsegurada' === addValid && event > this.maxSuma) {
        this.clientFree.telefono = this.$store.state.common.saveClient.numeroTelefono
        // emit modal for VIDA  fFREE
        this.$nuxt.$emit('bv::show::modal', 'optionVidaFree')
      }
      // if (reference) { this.$refs[reference].focus() }
      // document.getElementById(addValid).classList.add('valid')
      this.$nuxt.$emit('make-quote-ibk')
    },
    confirmQuotation () {
      // sendApiQuotation ...
      this.sendQuotation.numeroDocumento = this.$store.state.common.saveClient.numeroDocumento
      this.sendQuotation.urlCancelacion = process.env.base + 'seguro-de-vida/' + 'unsubscribe/' + this.$store.state.common.codeRemarketing
      this.sendQuotation.urlRemarketing = process.env.base + 'seguro-de-vida/interbank/' + this.$store.state.common.saveClient.numeroDocumento + '?utm_campaign=cotizacion'

      this.sendQuotation.cotizacion = this.formQuote
      this.sendQuotation.cotizacion.porcentajeDevolucion = this.formQuote.porcentaje
      this.$nuxt.$emit('save-data-remarketing-ibk', {
        envioCotizacion: true,
        sendQuotation: this.sendQuotation
      })
      
      
      this.$nuxt.$emit('bv::hide::modal', 'sendQuote')
    },
    hideModal (idModal) {
      this.$nuxt.$emit('bv::hide::modal', idModal)
    },
    saveClientData () {
      // sendApi and save Data TO VIDAFREE
      this.$store.dispatch('common/saveClientFree', this.clientFree).then(respuesta => {
        if (respuesta) {
          this.$nuxt.$emit('bv::hide::modal', 'optionVidaFree')
          this.$nuxt.$emit('bv::show::modal', 'confirmVF')
        }
        // console.log('tracking Cotización RANGE', resTracking)
      }, res => {
        // go home
        this.alertGoHome()
      })
      
    },
    resetSumaAsegurada () {
      this.formQuote.sumaAsegurada = (this.toCalculate.rangoSumaAseguradaSoles[this.toCalculate.rangoSumaAseguradaSoles.length - 2].key)
    },
    hideModalVidafree (modal) {
      this.hideModal(modal)
      this.resetSumaAsegurada()
    },
    goBack (percent) {
      const len = this.toCalculate.porcentajeDevolucion.length
      let idx = this.toCalculate.porcentajeDevolucion.findIndex(p => p.key === percent)
      if (idx >= 1 && this.toCalculate.porcentajeDevolucion[idx - 1].key >= this.objCalculo.porcentajeMin) {
        this.objCalculo.porcentajeSelec = this.toCalculate.porcentajeDevolucion[idx - 1].key
        this.getValorButton(this.objCalculo.porcentajeSelec)
      } else {
        this.formQuote.porcentaje = percent
      }
    },
    goNext (percent) {
      const len = this.toCalculate.porcentajeDevolucion.length
      let idx = this.toCalculate.porcentajeDevolucion.findIndex(p => p.key === percent)
      if (idx <= len - 2 && this.toCalculate.porcentajeDevolucion[idx + 1].key <= this.objCalculo.porcentajeMax) {
        this.objCalculo.porcentajeSelec = this.toCalculate.porcentajeDevolucion[idx + 1].key
        this.getValorButton(this.objCalculo.porcentajeSelec)
      } else {
        this.formQuote.porcentaje = percent
      }
    },
    getTextFrecuenciaPago () {
      let indexFrecuencia = this.toCalculate.frecuenciaPago.findIndex(i => i.key === this.formQuote.frecuenciaPago)
      return this.toCalculate.frecuenciaPago[indexFrecuencia].value
    },
    getPreExistencia (evt) {
      console.log('evento: pre', evt)
      this.preExistencia = evt
      if (evt) {
        Swal.fire(
          '',
          '¡Hola! En estos momentos no contamos con una plan que se adecúe a tus necesidades. Para mayor información puedes comunicarte al (01) 500-0000',
          'info'
        )
        setTimeout(() => {
          let goPath = (this.$store.state.common.subchannel === 'ENDOSOS_MULTIBANCOS') ? '/endoso-con-devolucion' : '/endosos'
          this.$nuxt.$router.push({ path: goPath })
        }, 1500)
      }
    }
  },
   components: {
    CoverageAdicional
  },
  beforeDestroy () {
    // console.log('destruyendo form-calculate')
  }
}
</script>
