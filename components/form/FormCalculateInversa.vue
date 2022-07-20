<template lang="pug">
  b-row#form-calculate.justify-content-center
    h3.text-primary.omnes-medium.text-center.mt-5.mt-lg-0 ¡Cotiza, ahorra y protege!
    b-col.marco(cols="12" sm="10" md="12" lg="12" xl="11")
      b-form
        b-row.mt-4
          // periodos de cobertura
          b-col.px-lg-3(cols="12")
            h5.text-info.d-block.text-lg-left.my-2 ¿Por cu&aacute;ntos a&ntilde;os deseas ahorrar?
          b-col.px-lg-3(cols="12")
            b-row.justify-content-center.botones(style="padding: 0px;")
              b-col
                b-row.row-border
                  b-col.text-center.px-0.col-border(@click="getValorPeriodoButton(periodo.key)" v-for="(periodo, index) in toCalculate.periodosCobertura" :key="periodo.key" :class="[periodo.key === objCalculation.periodoSelect ? 'selected' : 'no-selected']")
                    img(v-if="periodo.key === objCalculation.periodoSelect && ($store.state.common.channel !== 'IBK')" src="@/static/media/common/cotiza/check.svg" alt="icono check seguro de vida")
                    img(v-if="periodo.key === objCalculation.periodoSelect && $store.state.common.channel=== 'IBK'" src="@/static/media/common/cotiza/interbank/check_botones.svg" alt="icono check seguro de vida")
                    h5.omnes-medium(:class="[periodo.key === objCalculation.periodoSelect ? '' : '']") {{ periodo.value }} 
        b-row.mt-4(v-show="objCalculation.periodoSelect")
          b-col.primaRecurrente.px-lg-3(cols="12")
            h5.text-info.d-block.text-lg-left.my-2 ¿Cuánto te gustaría pagar al mes?
          b-col.px-lg-3(cols="12")  
            b-row(style="padding: 0px;")
              b-col
                div.text-center.primaInterval.omnes-medium(style="padding-bottom: 0px; height: 100%;")
                  | S/ {{ objCalculation.primaMin }}
                  div
                    span.primaIntervalText M&iacute;nimo
              b-col(cols="7" style="padding: 2px;border: 1px solid #D1D1D1;border-radius: 4px;").box.col-border
                .box.d-flex.justify-content-between.align-items-center
                  img.back-prima-recurrente#btn-minus(src="@/static/media/icons/pasos/cotiza/-.svg" alt="disminuir periodo de pago prima recurrente" @click="goBack(formQuote.primaRecurrente, 10)")
                  div(style="position: relative")
                    input#pagoPrima(type="text" :value="objCalculation.primaSelect" disabled)
                    h5.omnes-medium S/ {{ objCalculation.primaSelect }}
                  img.next-prima-recurrente#btn-add(src="@/static/media/icons/pasos/cotiza/+.svg" alt="aumentar periodo de pago prima recurrente" @click="goNext(formQuote.primaRecurrente, 10)")
              b-col
                div.text-center.primaInterval.omnes-medium(style="padding-bottom: 0px; height: 100%;")
                  | S/ {{ objCalculation.primaMax }}
                  div
                    span.primaIntervalText M&aacute;ximo
        b-row.mt-4(v-show="objCalculation.periodoSelect && objCalculation.primaSelect")
          // porcentaje
          b-col.px-lg-3(cols="12")
            h5.text-info.d-block.text-lg-left.my-2 Selecciona el porcentaje de devoluci&oacute;n
          b-col.px-lg-3(cols="12")
            b-row.justify-content-center.botones(style="padding: 0px;")
              b-col
                b-row.row-border
                  b-col.text-center.col-border(@click="getValorResumenButton(porcentaje.key)" v-for="(porcentaje, index) in toCalculate.porcentajeDevolucion" :key="porcentaje.key" :class="[porcentaje.key === objCalculation.percentSelect ? 'selected' : (objCalculation.percents.includes(porcentaje.key) ? 'no-selected' : 'inactive')]")
                    img(v-if="porcentaje.key === objCalculation.percentSelect && ($store.state.common.channel !== 'IBK')" src="@/static/media/common/cotiza/check.svg" alt="icono check seguro de vida")
                    img(v-if="porcentaje.key === objCalculation.percentSelect && $store.state.common.channel=== 'IBK'" src="@/static/media/common/cotiza/interbank/check_botones.svg" alt="icono check seguro de vida")
                    h5.omnes-medium(:class="[porcentaje.key === objCalculation.percentSelect ? '' : '']") {{ porcentaje.value }}
                span.percent-text.text-center Para otros % de devoluci&oacute;n, edita el monto de pago
        b-row.mt-2.p-relative(v-if="objCalculation.periodoSelect && objCalculation.primaSelect && objCalculation.percentSelect")
          b-col.text-resumen.px-lg-3(cols="12")
            h5.omnes-semibold.d-block.text-lg-left.my-2 El resultado de tu cotizaci&oacute;n
          b-col(cols="12")
            section.py-3.py-lg-4(style="background:#F2FCFF; border-radius: 8px; width: 100%;")
              b-row
                // Monto con devolucion
                b-col.mb-xl-1.text-center(cols="1")
                  .align-items-center
                    img(src="@/static/media/icons/pasos/cotiza/ahorro.svg" alt="disminuir periodo de pago prima recurrente")
                b-col
                  div.omnes-medium.ml-4
                    span.text-resumen-subtitulo Tu devoluci&oacute;n ser&aacute;
                    div.text-resumen-monto(style="margin-top: -5px;")
                      | S/ {{ parseDecimal(parseFloat(objCalculation.sumaAseguradaDevolucion)) }}
                b-col(style="text-align: end;")
                  b-button.py-1.w-auto.h-auto(variant="primary" v-b-modal.confirmVF style="font-size: 14px;") Detalle
              b-row
                // Monto de suma asegurada
                b-col.mb-xl-1.text-center(cols="1")
                  .align-items-center
                    img(src="@/static/media/icons/pasos/cotiza/escudo.svg" alt="disminuir periodo de pago prima recurrente")
                b-col
                  div.omnes-medium.ml-4
                    span.text-resumen-subtitulo Tu protecci&oacute;n
                    div.text-resumen-monto(style="margin-top: -5px;")
                      | S/ {{ parseDecimal(parseFloat(objCalculation.sumaAsegurada)) }}
      section.mt-4.mt-xl-3
        b-row
          b-col.text-center(cols="12")
            b-button.py-2.mt-3.mb-4#btn-cotizar(variant="dark" @click="goPagePay($event)" :disabled="objCalculation.periodoSelect && objCalculation.primaSelect && objCalculation.percentSelect ? false : true") Continuar
      section.mb-3(v-if="objCalculation.periodoSelect && objCalculation.primaSelect && objCalculation.percentSelect")
        b-container
          b-row.mb-5
            b-col.text-center(cols="12")
              //.box(style="cursor:pointer outline:none;" v-b-modal.sendQuote)
              img(style="width: 168px;" v-b-modal.sendQuote src="@/static/media/icons/envio_cotizacion-seguro_vida.svg" alt="envio de cotizacion de seguro de vida")
    b-modal#sendQuote(static v-if="$store.state.common.saveClient.email" size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.text-right
        img.image-9(@click='hideModal("sendQuote")' src='@/static/media/common/close-modal.svg' width='35' alt='icon close' style="cursor: pointer;")
      b-container
        b-row.text-center
          b-col
            img(v-if="$store.state.common.channel === 'IBK'" src='@/static/media/common/email-interbank.svg' alt="icono de envio de correo" width='85')
            img(v-else src='@/static/media/common/email.svg' alt="icono de envio de correo" width='85')
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
            img(v-if="$store.state.common.channel === 'IBK'" src='@/static/media/common/confirm-quotation-interbank.svg' alt="icono de estrella confirmar" width='70')
            img(v-else  src='@/static/media/common/confirm-quotation.svg' alt="icono de estrella confirmar" width='70')
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
    b-modal#confirmVF(static size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.text-right
        img.image-9(@click="$bvModal.hide('confirmVF')" src='@/static/media/common/close-modal.svg', width='35', alt='icon close' style="cursor: pointer;")
      div.mt-2
        b-row
          b-col.text-center(cols="12")
            img(src='@/static/media/icons/pasos/cotiza/ahorro.svg' alt="icono de ahorro")
          b-row.mt-2
            b-col.text-center.text-primary.omnes-medium(cols="12")
              | Obtendr&aacute;s una devoluci&oacute;n
            b-col(cols="12")
              h3.text-center.text-primary.omnes-medium S/ {{ parseInteger(parseFloat(objCalculation.sumaAseguradaDevolucion)) }}  
        b-row.mt-4
          b-col.text-center.pt-1.mr-1(style="background:#F2FCFF; width: 100%;")
            h3.text-primary.omnes-medium S/ {{ parseInteger(parseFloat(objCalculation.ahorroTotal)) }}
            span.primaIntervalText Ahorro total
          b-col.text-center.pt-1.ml-1(style="background:#F2FCFF; width: 100%;")
            h3.text-primary.omnes-medium S/ {{ parseInteger(parseFloat(objCalculation.restoDevolucion)) }}
            span.primaIntervalText(style="display: inline-flex;") Ganancia con {{ objCalculation.percentSelect }}% de devoluci&oacute;n
        b-row.mt-4
          div.bg-primary.label-resumen
            | Ahorro anual
          b-col.text-center.pt-3.pb-2(cols="5" style="background:#F2FCFF; width: 100%;")
            h4.text-primary.omnes-medium S/ {{ objCalculation.primaSelect }}
            span.primaIntervalText Pago mensual
          b-col.text-center.pt-3.pb-2(style="background:#F2FCFF; width: 100%;padding-left: 0px;")
            h4.text-primary.omnes-medium x 12 meses =    S/ {{ parseInteger(parseFloat(objCalculation.ahorroAnual)) }}
        b-row.mt-4
          div.bg-primary.label-resumen
            | Ahorro total
          b-col.text-center.pt-3.pb-2(cols="5" style="background:#F2FCFF; width: 100%;")
            h4.text-primary.omnes-medium S/ {{ parseInteger(parseFloat(objCalculation.ahorroAnual)) }}
            span.primaIntervalText Pago anual
          b-col.text-center.pt-3.pb-2(style="background:#F2FCFF; width: 100%;padding-left: 0px;")
            h4.text-primary.omnes-medium x {{ formQuote.periodoPago }} &nbsp;a&ntilde;os =    S/ {{ parseInteger(parseFloat(objCalculation.ahorroTotal)) }}
        b-row.mt-4.text-center
          b-col(cols="12")
            b-button.w-50(variant="dark" @click="$bvModal.hide('confirmVF')") ENTENDIDO
        b-row.mt-4
          b-col(cols="1")
            img(src='@/static/media/icons/pasos/cotiza/info.svg' alt="icono de informacion")
          b-col
            span.primaIntervalText &nbsp;El monto de devoluci&oacute;n resultante mostrado solo se aplica terminando el tiempo de contrataci&oacute;n
</template>

<script>
import * as _ from 'lodash'
import Swal from 'sweetalert2'
import moment from 'moment'

import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  props: ['tracking', 'formQuote', 'showPercent', 'toCalculate', 'toCalculateSinDescuento', 'remarketing', 'formQuoteLast'],
  data () {
    return {
      modalSA: false,
      modalPD: false,
      channelDiscount: false, // condicional con channel
      maxPD: 50,
      minPD: 0,
      maxSuma: 0,
      modalDetail: false,
      objCalculation: {
        primaMin: 0,
        primaMax: 0,
        percentMin: 0,
        porcentajes: [],
        periodoSelect: 0,
        primaSelect: 0,
        percents: [],
        percentSelect: 0,
        sumaAsegurada: 0,
        sumaAseguradaDevolucion: 0,
        ahorroAnual: 0,
        ahorroTotal: 0,
        devolucionTotal: 0,
        ganancia: 0,
        restoDevolucion: 0
      },
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
      idSelected: 0
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
  },
  updated () {
  },
  destroyed () {
    this.$nuxt.$off('generate-parametter-to-calculate')
    this.$nuxt.$off('show-range')
  },
  mounted () {
    window.dataLayer = window.dataLayer || [ ]
    this.$nuxt.$on('generate-parametter-to-calculate', ({saveClient}) => {
      this.generateParametter(saveClient)
    })
    this.$nuxt.$on('show-range', ({ respuesta, sinDescuento }) => {
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
        this.$store.commit('common/setPrimaRecurrenteDescuento', this.toCalculateSinDescuento.primaRecurrente)
      }
      this.toCalculate.primaClienteAnual = respuesta[porcentajeD].primaClienteAnual
      // this.toCalculate.porcentajeDevolucion.filter(f => {
        // if (f.key === parseInt(porcentajeD)) {
          // input range
          // this.sizeRangeFinal = f.sizeRange
        // }
      // })
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
      if ((this.formQuote.frecuenciaPago === 'M' || this.formQuote.frecuenciaPago === 'Mensual' ) && (this.$store.state.common.subchannel).split('_')[0] === 'PROMOCION' && parseInt(this.formQuote.porcentaje) >= 100 && parseInt(this.formQuote.sumaAsegurada) >= 100000) {
        this.$nuxt.$emit('show-alert')
      } else {
        this.$nuxt.$emit('hide-alert')
      }
      this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
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
        let goPath = (this.$store.state.common.channel === 'IBK') ? '/interbank' : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? '/universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? '/proteccion-segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? '/ahorro-seguro' : '/vida-con-devolucion'
        this.$nuxt.$router.push({ path: goPath })
      }, 1500)
    },
    capitalize (nombreCompleto) {
      nombreCompleto = nombreCompleto.toLowerCase()
      return nombreCompleto.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
    },
    showDetail (state) {
      this.modalDetail = state
    },
    goNext(primaRecurrente, interval) {
      document.getElementById('btn-minus').style.opacity = '1'
      const limitMax = this.objCalculation.primaMax
      if ((this.objCalculation.primaSelect + interval) <= limitMax) {
        this.objCalculation.primaSelect = this.objCalculation.primaSelect + interval
        this.formQuote.primaRecurrente = this.objCalculation.primaSelect
        this.preCalculationPorcentajeDevolucion(this.objCalculation.periodoSelect, this.objCalculation.primaSelect)
        this.getValorResumenButton(this.objCalculation.percentSelect)
      }
      if (this.objCalculation.primaSelect >= limitMax) {
        document.getElementById('btn-add').style.opacity = '0.6'
      }
    },
    goBack(primaRecurrente, interval) {
      document.getElementById('btn-add').style.opacity = '1'
      const limitMin = this.objCalculation.primaMin
      if ((this.objCalculation.primaSelect - interval) >= limitMin) {
        this.objCalculation.primaSelect = this.objCalculation.primaSelect - interval
        this.formQuote.primaRecurrente = this.objCalculation.primaSelect
        this.preCalculationPorcentajeDevolucion(this.formQuote.periodoPago, this.objCalculation.primaSelect)
        this.getValorResumenButton(this.objCalculation.percentSelect)
      }
      if (this.objCalculation.primaSelect <= limitMin) {
        document.getElementById('btn-minus').style.opacity = '0.6'
      }
    },
    preCalculationPrimaRecurrente(periodo, porcentaje) {
      let amounts = this.objCalculation.data
                        .filter(o => o.periodoCobertura === periodo)
                        .map(p => p.prima)
                        .sort((a, b) => a > b ? 1 : -1)
      let amountsFilter = Array.from(new Set(amounts))
      this.objCalculation.primaMin = amountsFilter[0]
      this.objCalculation.primaMax = amountsFilter[amountsFilter.length - 1]
      this.objCalculation.primaSelect = amountsFilter[0]
      this.formQuote.periodoPago = periodo
      this.formQuote.primaRecurrente = this.objCalculation.primaSelect
      this.formQuote.periodoVigencia= periodo
      this.formQuote.frecuenciaPago= 'M'
    },
    preCalculationPorcentajeDevolucion(periodo, prima) {
      let percents = this.objCalculation.data
                          .filter(o => o.periodoCobertura === periodo && o.prima === prima)
                          .map(p => p.porcentaje)
                          .sort((a, b) => a > b ? 1 : -1)
      let percentsFilter = Array.from(new Set(percents))
      this.objCalculation.percents = percentsFilter
      this.objCalculation.percentSelect = percentsFilter[0]
      this.formQuote.porcentaje= this.objCalculation.percentSelect
    },
    precalculation (fecha) {
      this.formQuote.sexo= this.$store.state.common.saveClient.sexo
      this.formQuote.edadContratacion= (moment().diff(fecha, 'years'))
      this.formQuote.fechaNacimiento= fecha
      this.sendQuotation.email = this.$store.state.common.saveClient.email
      this.$store.dispatch('common/makeQuoteReverse', {
        edad: (moment().diff(fecha, 'years')),
        sexo: this.$store.state.common.saveClient.sexo
      }).then(res => {
        if (res.code === '01') {
          // porcentajes
          this.objCalculation.data = res.data

          this.preCalculationPrimaRecurrente(10, 100)
          this.preCalculationPorcentajeDevolucion(10, this.objCalculation.primaMin)
        }
      }, res => {
        if (res.response.data.message) {
          Swal.fire(
            'Oops...!',
            res.response.data.message + 'XXXXX',
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
      })
    },
    parameterQuote (fecha) {
      this.$store.dispatch('common/parameterQuote', {
        numeroDocumento: this.$store.state.common.dniCliente,
        idProducto: this.idProducto,
        edad: (moment().diff(fecha, 'years'))
      }).then(res => {
        if (res.code === '01') {
          this.$store.commit('common/setShowModalOnce', 1)
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
          if (coberturaFallecimiento.edadMaximaIngreso >= (moment().diff(fecha, 'years'))) {
            this.toCalculate.coberturaFallecimiento = coberturaFallecimiento
            this.toCalculate.rangoSumaAseguradaSoles = []
            if (this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.max < 0 || this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.min < 0) {
              this.$nuxt.$emit('hide-loader')
              this.alertGoHome()
            }
            this.toCalculate.rangoSumaAseguradaSoles.min = this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.min
            this.toCalculate.rangoSumaAseguradaSoles.max = this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.max
            if (this.toCalculate.rangoSumaAseguradaSoles.min > this.toCalculate.rangoSumaAseguradaSoles.max) {
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
            } else {
              // SET para el maximo de suma asegurada por landing escogida
              let makeMinSA = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO' || this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 100000 : this.toCalculate.rangoSumaAseguradaSoles.min
              for (let i = makeMinSA; i <= this.toCalculate.rangoSumaAseguradaSoles.max; i++) {
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
            // console.log(this.$store.state.common.channel)
            if (this.$store.state.common.channel === 'WEB') {
              // Add option to Modal Vida Free
              this.toCalculate.rangoSumaAseguradaSoles.push({ 
                key: this.toCalculate.rangoSumaAseguradaSoles.max + 1, 
                value: 'Más de S/ ' + (this.toCalculate.rangoSumaAseguradaSoles.max).toString().split(/(?=(?:\d{3})+$)/).join(',')
              })
              // console.log(this.toCalculate.rangoSumaAseguradaSoles.max)
              this.maxSuma = (this.toCalculate.rangoSumaAseguradaSoles.max)
              /// penultima opcion
              this.formQuote.sumaAsegurada = (this.toCalculate.rangoSumaAseguradaSoles[this.toCalculate.rangoSumaAseguradaSoles.length - 2].key)
            } else {
              this.maxSuma = (this.toCalculate.rangoSumaAseguradaSoles.max)
              // ÚLTIMA OPCION
              this.formQuote.sumaAsegurada = (this.toCalculate.rangoSumaAseguradaSoles[this.toCalculate.rangoSumaAseguradaSoles.length - 1].key)
            }
            // -----------------------------------------------------
            
            // Periodo: X años -----------------------------------
            let objPeriodoCobertura = res.data.producto.planes[0].periodosCobertura
            let makeMaxPC = (this.$store.state.common.channel === 'WEB' || this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO' || this.$store.state.common.channel === 'AHORRO_SEGURO') ? 20 : 24
            this.toCalculate.periodosCobertura = (objPeriodoCobertura).filter(pC => {
              if (pC.value % 2 === 0 && pC.value <= makeMaxPC) {
                pC.value = ' ' + pC.value + ' ' // + 'años'
                return pC.value
              }
            })
            if (this.toCalculate.periodosCobertura[this.toCalculate.periodosCobertura.length - 1].key !== objPeriodoCobertura[objPeriodoCobertura.length - 1].key && objPeriodoCobertura[objPeriodoCobertura.length - 1].key <= makeMaxPC) {
              (this.toCalculate.periodosCobertura).push({
                key: objPeriodoCobertura[objPeriodoCobertura.length - 1].key,
                value: (objPeriodoCobertura[objPeriodoCobertura.length - 1].value) //+ ' años'
              })
            }
            // Deposito: Mensual, trimestral, semestral o anual
            this.toCalculate.frecuenciaPago = res.data.mesesFrecuenciaPago
            //this.toCalculate.periodosCobertura.unshift({ key: null, value: '', disabled: true })
            this.toCalculate.frecuenciaPago.unshift({ key: null, value: '', disabled: true })
            // % Devolucion -----------------------------------------
            this.toCalculate.porcentajeDevolucion = (res.data.producto.planes[0].porcentajeDevolucionPrima).filter(pD => {
              // Limitando el Maximo porcentaje de devolucion
              this.maxPD = (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 0 : 150
              this.minPD = (this.$store.state.common.channel === 'WEB') ? 0 : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 100 : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 100 : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 100 : 0
              this.formQuote.porcentaje = (this.$store.state.common.channel === 'WEB') ? 100 : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 125 : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 100 : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 125 : 0
              if (pD.value <= this.maxPD && pD.value >= this.minPD) {
                pD.value = pD.value + '%'
                return pD.value
              }
            })
            if (this.channelDiscount) {
              this.toCalculateSinDescuento.porcentajeDevolucion = _.cloneDeep(this.toCalculate.porcentajeDevolucion)
            }
            // -----------------------------------------------------
          } else {
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
        let goPath = (this.$store.state.common.channel === 'IBK') ? '/interbank' : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? '/universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? '/proteccion-segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? '/ahorro-seguro' :'/vida-con-devolucion'
        this.$nuxt.$router.push({ path: goPath })
      })
    },
    generateParametter (saveClient) {
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
        this.precalculation(fecha)
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
    getValorPeriodoButton (valor) {
      this.objCalculation.periodoSelect = valor
      this.preCalculationPrimaRecurrente(valor, 100)
      this.preCalculationPorcentajeDevolucion(valor, this.objCalculation.primaMin)
      this.getValorResumenButton(100)
    },
    getValorResumenButton (percent) {
      if (this.objCalculation.percents.includes(percent)) {
        this.objCalculation.percentSelect = percent
        let resumen = this.objCalculation.data
                          .filter(o => o.periodoCobertura === this.formQuote.periodoPago && o.porcentaje === this.objCalculation.percentSelect && o.prima === this.objCalculation.primaSelect)
        this.objCalculation.sumaAsegurada = resumen[0].sumaAsegurada
        this.objCalculation.sumaAseguradaDevolucion = resumen[0].montoDevolucion
        this.objCalculation.ahorroAnual = this.objCalculation.primaSelect * 12
        this.objCalculation.ahorroTotal = this.objCalculation.ahorroAnual * this.objCalculation.periodoSelect
        this.objCalculation.devolucionTotal = this.objCalculation.sumaAseguradaDevolucion + this.objCalculation.ahorroTotal
        this.objCalculation.restoDevolucion =  this.objCalculation.sumaAseguradaDevolucion - this.objCalculation.ahorroTotal
        this.formQuote.sumaAsegurada = this.objCalculation.sumaAsegurada
        this.formQuote.montoDevolucion = this.objCalculation.sumaAseguradaDevolucion
      }
    },
    getValorButton (valor) {
      let index = this.toCalculate.porcentajeDevolucion.findIndex(i => i.key === valor)
      this.formQuote.porcentaje = valor
      this.toCalculate.primaRecurrente = this.toCalculate.porcentajeDevolucion[index].primaRecurrente
      this.toCalculate.montoDevolucion = this.toCalculate.porcentajeDevolucion[index].montoDevolucion
      this.toCalculate.primaClienteAnual = this.toCalculate.porcentajeDevolucion[index].primaClienteAnual
      if (this.channelDiscount) {
        this.toCalculateSinDescuento.primaRecurrente = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaRecurrente
        this.toCalculateSinDescuento.montoDevolucion = this.toCalculateSinDescuento.porcentajeDevolucion[index].montoDevolucion
        this.toCalculateSinDescuento.primaClienteAnual = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaClienteAnual
        this.$store.commit('common/setPrimaRecurrenteDescuento', this.toCalculateSinDescuento.primaRecurrente)
      }
      if ((this.formQuote.frecuenciaPago === 'M' || this.formQuote.frecuenciaPago === 'Mensual' ) && (this.$store.state.common.subchannel).split('_')[0] === 'PROMOCION' && parseInt(this.formQuote.porcentaje) >= 100 && parseInt(this.formQuote.sumaAsegurada) >= 100000) {
        this.$nuxt.$emit('show-alert')
      } else {
        this.$nuxt.$emit('hide-alert')
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
    },
    getValor (event) {
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
          this.$store.commit('common/setPrimaRecurrenteDescuento', this.toCalculateSinDescuento.primaRecurrente)
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
          this.$store.commit('common/setPrimaRecurrenteDescuento', this.toCalculateSinDescuento.primaRecurrente)
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
    parseInteger (valor) {
      if (parseFloat(valor) > 999) {
        let nuevoValor = valor.toFixed('0').split('.')
        nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(',')
        return nuevoValor
      } else if (!parseFloat(valor)) {
        return '0'
      } else {
        return valor.toFixed('0')
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
      evt.preventDefault()
      if (this.$store.state.common.saveClient.nombre && this.$store.state.common.saveClient.fechaNacimiento && this.$store.state.common.saveClient.sexo && this.$store.state.common.saveClient.numeroTelefono && this.$store.state.common.saveClient.email) {
        let newQuote = this.formQuote
        newQuote.fechaNacimiento = this.$store.state.common.saveClient.fechaNacimiento
        newQuote.sexo = this.$store.state.common.saveClient.sexo
        newQuote.periodoVigencia = this.objCalculation.periodoSelect
        newQuote.frecuenciaPago = 'Mensual'
        newQuote.porcentaje = this.objCalculation.percentSelect
        newQuote.sumaAsegurada = this.objCalculation.sumaAsegurada //(document.getElementById('sumaAsegurada').value)
        // newQuote.frecuenciaPago = (document.getElementById('depositare')).options[document.getElementById('depositare').selectedIndex].text
        newQuote.montoDevolucion = this.objCalculation.sumaAseguradaDevolucion
        newQuote.primaRecurrente = this.objCalculation.primaSelect
        newQuote.tipoCotizacion = 'INVERSA'
        // newQuote.sizeRangeFinal = this.sizeRangeFinal
        // document.getElementById('range-tooltip').style.left = self.sizeRangeFinal + 'px'
        window.dataLayer.push({
          'event': 'PCotizar CTA',
          'category': 'Paso Cotizar',
          'action': 'Click',
          'label': 'CTA lo quiero',
          'porcentaje': this.objCalculation.percentSelect,
          'sumaAsegurada': this.objCalculation.sumaAsegurada,
          'periodo vigencia': this.objCalculation.periodoSelect,
          'frecuencia pago': this.formQuote.frecuenciaPago
        })
        let productName = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'Vida con devolución Univ' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'Vida con devolución Jub' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'Vida con devolución Segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'Vida con devolución Seguro' : 'Vida con devolución'
        let productId = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'VidaUniv' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'VidaJub' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'VidaSegura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'VidaSeguro' :  'VidaCash'
        window.dataLayer.push({
          'event': 'EECaddToCart',
          'ecommerce': {
            'currencyCode': 'PEN',
            'add': {                    
              'products': [{
                'name': productName,
                'id': productId,
                'price': (this.objCalculation.ahorroAnual).toString(),
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
          'monto': (this.objCalculation.ahorroAnual).toString()
        });
        this.$store.commit('common/setPrimaClienteAnual', (this.objCalculation.ahorroAnual).toString())
        this.formQuote.edadContratacion = (moment().diff((this.$store.state.common.saveClient.fechaNacimiento).replace(/\s/g, '').split('/').reverse().join('-'), 'years'))
        this.$store.commit('common/setCotizacion', this.formQuote)
        let goPath = (this.$store.state.common.channel === 'IBK') ? '../../interbank/paso/pago' : '../../paso/pago'
        this.$nuxt.$router.push({ path: goPath })
      } else {
        Swal.fire(
          'Oops...!',
          'Por favor, verifica tus datos',
          'error'
        )
      }
    },
    makeQuote (reference, addValid, event) {if ('sumaAsegurada' === addValid && event > this.maxSuma) {
        this.clientFree.telefono = this.$store.state.common.saveClient.numeroTelefono
        // emit modal for VIDA  fFREE
        this.$nuxt.$emit('bv::show::modal', 'optionVidaFree')
      }
      // if (reference) { this.$refs[reference].focus() }
      // document.getElementById(addValid).classList.add('valid')
      this.$nuxt.$emit('make-quote')
    },
    confirmQuotation () {
      let self = this
      // sendApiQuotation ...
      this.sendQuotation.numeroDocumento = this.$store.state.common.saveClient.numeroDocumento
      this.sendQuotation.urlCancelacion = process.env.base + 'seguro-de-vida/' + 'unsubscribe/' + this.$store.state.common.codeRemarketing
      // channel
      let makeUrlRMKT = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? '/universitario/' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion/' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? '/proteccion-segura/' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? '/ahorro-seguro/' : '/vida-con-devolucion/'
      this.sendQuotation.urlRemarketing = process.env.base + 'seguro-de-vida' + makeUrlRMKT + this.$store.state.common.saveClient.numeroDocumento + '?utm_campaign=cotizacion'

      this.sendQuotation.cotizacion = this.formQuote
      this.sendQuotation.cotizacion.frecuenciaPago = 'M'
      this.sendQuotation.cotizacion.sumaAsegurada = this.objCalculation.sumaAsegurada
      this.sendQuotation.cotizacion.primaRecurrente = this.objCalculation.primaSelect
      this.sendQuotation.cotizacion.montoDevolucion = this.objCalculation.sumaAseguradaDevolucion
      this.sendQuotation.cotizacion.porcentaje = this.objCalculation.percentSelect
      this.sendQuotation.cotizacion.porcentajeDevolucion = this.objCalculation.percentSelect
      this.sendQuotation.cotizacion.sexo = this.$store.state.common.saveClient.sexo
      this.sendQuotation.cotizacion.periodoVigencia = this.sendQuotation.cotizacion.periodoPago
      this.sendQuotation.cotizacion.fechaNacimiento = this.$store.state.common.saveClient.fechaNacimiento
      this.sendQuotation.cotizacion.edadContratacion = (moment().diff((this.$store.state.common.saveClient.fechaNacimiento).replace(/\s/g, '').split('/').reverse().join('-'), 'years'))
      this.$nuxt.$emit('save-data-remarketing', {
        envioCotizacion: true,
        sendQuotation: self.sendQuotation
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
      }, res => {
        // go home
        this.alertGoHome()
      })
      
    },
    resetSumaAsegurada () {
      this.formQuote.sumaAsegurada = (this.toCalculate.rangoSumaAseguradaSoles[this.toCalculate.rangoSumaAseguradaSoles.length - 2].key)
    },
    hideModalVidafree (modal) {
      this.resetSumaAsegurada()
    },
    getTextFrecuenciaPago () {
      let indexFrecuencia = this.toCalculate.frecuenciaPago.findIndex(i => i.key === this.formQuote.frecuenciaPago)
      return this.toCalculate.frecuenciaPago[indexFrecuencia].value
    }
  },
  beforeDestroy () {
  }
}
</script>
<style scoped>
.inactive {
  background-color: #F7F6F6;
  color: #B9BEDE!important;
}
#cotiza #form-calculate .botones .row-border {
  display: flex;
}
#cotiza #form-calculate .botones .col-border:first-child {
    border-top-left-radius: 4px!important;
    border-bottom-left-radius: 4px!important;
}
#cotiza #form-calculate .botones .col-border:last-child {
    border-top-right-radius: 4px!important;
    border-bottom-right-radius: 4px!important;
}
@media (max-width: 768px) {
  .container .row {
      padding-right: 10px;
      padding-left: 10px;
  }
}
</style>
