<template lang="pug">
  section#cotiza
    b-container.mb-xl-2
      //- no-ssr
        IsAppointment(v-if="showQuote && $store.state.common.channel === 'AHORRO_SEGURO'"
          :documentNumber="$store.state.common.saveClient.numeroDocumento"
          :nameProduct="product"
          :nameClient="$store.state.common.saveClient.nombre"
          :phone="$store.state.common.saveClient.numeroTelefono"
          :whatsapp="true"
          :llamada="true"
          :videollamada="true"
          :sms="false"
        )
      b-row.justify-content-center.title
        b-col.mt-4.px-xl-4(cols='6' sm="5" lg="4" xl="3")
          .text-center
            stepper.px-xl-2(:step="stepper")
    b-container.content.mt-xl-5
      section.verifica-completa-cotiza
        b-row.justify-content-center <!--top-->
          b-col.verificar-data.px-lg-3.px-xl-4(cols="12" sm="10" md="8" lg="5") <!--titulo-->
            b-row.d-none.d-lg-block
              b-col.text-center.px-lg-3(cols="12")
                h3.d-block.omnes-medium.mb-3.text-primary(v-if="!dataVacia || (client.nombre || client.apellidoPaterno || client.apellidoMaterno || client.fechaNacimiento || client.sexo || client.numeroTelefono || client.email)") Verifica tus datos
                h3.d-block.omnes-medium.mb-3.text-primary(v-else) Completa tus datos personales
            div.data
              b-row.pb-2.pt-lg-3(v-if="!dataVacia") <!--Datos en resumen o los semicompletados -->
                b-col.d-lg-none(cols="12")
                  h3.text-center.d-block.omnes-medium.mb-3.text-primary Verifica tus datos
                b-col.mt-2(cols="8")
                  h4.omnes-medium.d-lg-none  Mis datos
                  h4.omnes-medium.d-none.d-lg-block Mis datos personales
                b-col.text-right(cols="4")
                  b-button.py-1.w-auto.h-auto.editar(variant="primary" @click="showSave" style="font-size: 14px;") Editar
                personal-data(:clientData="client" :showQuote="showQuote")
              hr.d-lg-none(v-if="!dataVacia" style="width: 100%;position: absolute;left: 0;")
              form-verify-data(:tracking="tracking" :client="client" :dataVacia="dataVacia" :remarketing="remarketing" v-if="!showQuote && (!dataVacia || dataVacia)" cols="12" sm="10" md="8" lg="5")
          div
            // hr(v-if="!dataVacia" style="width: 100vw;position: absolute;left: 0;" class="d-sm-none")
          b-col.px-lg-3.px-xl-4(:class="[!showQuote ? 'd-none d-lg-block' : '' ]" cols="12" sm="10" md="8" lg="5") <!--cotiza-->
            form-calculate-inversa(:tracking="tracking" :formQuote="formQuote" :showPercent="showPercent" :toCalculate="toCalculate" :toCalculateSinDescuento="toCalculateSinDescuento" :remarketing="remarketing" :formQuoteLast="formQuoteLast" ref="formCalculate" :class="[!showQuote ? 'hide-all' : '' ]")
            //- form-calculate(v-else :tracking="tracking" :formQuote="formQuote" :showPercent="showPercent" :toCalculate="toCalculate" :remarketing="remarketing" :formQuoteLast="formQuoteLast" ref="formCalculate" :class="[!showQuote ? 'hide-all' : '' ]")
    section
      b-modal#modalInfo(title="Probando" size="md" centered hide-footer hide-header static no-close-on-esc no-close-on-backdrop)
        div.my-2
          h4.text-center.omnes-medium {{ $store.state.common.saveClient.nombre }}, mira esto antes de seguir
        div.mt-5.border.px-3.px-lg-0
          b-container
            div.text-center
              img(src="@/static/media/icons/beneficio_cubre-nocubre.svg", alt='Cubre seguro de vida con devolución')
            div.cobertura.mt-2
              h4.omnes-medium Lo que cubrimos:
              ul.mt-2
                li Muerte natural o por accidente
            div.sin-cobertura
              h4.omnes-medium Lo que no cubrimos:
              ul.mt-2
                li Muerte a causa de enfermedades preexistentes
                li Muerte por práctica de deportes extremos
                li Muerte a causa de efectos de drogas
                li Muerte a causa de cometer hechos delictivos
            div.mb-3
              h5 *Para conocer más sobre cada una de las exclusiones ingresa&nbsp;
                a(v-bind:href="urlExclusiones" target="_blank") aquí.
        div.mt-4
          p.text-primary.text-center Al dar clic al botón siguiente, acepto que he <br> leído las exclusiones        
        div.mt-4.mb-3.text-center
          b-button(type="submit" variant="dark" style="font-size: 16px;" @click="hideModal") Siguiente
      //- b-modal#verifyData.abandono(static size="md" centered hide-footer hide-header :class="[($store.state.common.subchannel).split('_')[0] !== 'PROMOCION' ? 'bg-general' : '']")
      b-modal#verifyData.abandono.bg-general(static size="md" centered hide-footer hide-header)
        //- b-container(v-if="($store.state.common.subchannel).split('_')[0] !== 'PROMOCION'")
        b-container
          b-row.justify-content-center
            b-col.text-center.mb-5(cols="12")
              img(src="@/static/media/images/abandono_verifica_seguro_de_vida.svg" alt="abandonar seguro de vida")
          b-row.text-center
            b-col(cols="12")
              h2.omnes-semibold.text-white.mb-0 ¿Lo vas a dejar pasar?
            b-col(cols="12").my-4
              h3.text-white Arma un plan a tu medida <br> <span class="omnes-semibold"> desde S/ 23 al mes </span><br> para proteger a quienes más amas. <br> Cotiza en el siguiente paso
          b-row.justify-content-center
            b-col.text-center(cols="12")
              b-button(variant="dark" @click="$nuxt.$emit('bv::hide::modal', 'verifyData')") QUIERO CONTINUAR
        //- b-container(v-else)
          b-row.justify-content-center
            b-col.text-center.mb-5(cols="12")
              img.w-100(src="@/static/media/images/abandono_verifica_seguro_de_vida.svg" alt="primera cuota gratis seguro de vida")
          b-row.justify-content-center
            b-col.text-center(cols="12")
              h2.mb-3.omnes-semibold.text-primary(v-if="$store.state.common.saveClient.nombre") {{ ($store.state.common.saveClient.nombre).toUpperCase() }},
              h3.text-primary Por la compra de tu seguro con un pago mensual, tu primera cuota es gratis *, ¡Quedan pocos días, aprovecha esta oportunidad!
          b-row.justify-content-center.mt-5
            b-col.text-center(cols="12")
              b-button(variant="dark" @click="$nuxt.$emit('bv::hide::modal', 'verifyData')") QUIERO CONTINUAR
        //- b-container
          b-row.justify-content-center
            b-col.text-center.mb-5(cols="12")
              img.w-100(src="@/static/media/seguro_vida/home/banner_hotsale-desktop.png" alt="hot sale descuento")
          b-row.justify-content-center
            b-col.text-center(cols="12")
              h2.mb-3.omnes-semibold.text-primary(v-if="$store.state.common.saveClient.nombre") {{ ($store.state.common.saveClient.nombre).toUpperCase() }},
              h3.text-white ¡Aprovecha esta imperdible promoción! <br>Te devolvemos el&nbsp;<b>70% de tu primer pago</b> <br>al finalizar la compra.
          b-row.justify-content-center.mt-5
            b-col.text-center(cols="12")
              b-button(variant="dark" @click="$nuxt.$emit('bv::hide::modal', 'verifyData')") QUIERO CONTINUAR
      //- b-modal#quote.abandono(static size="md" centered hide-footer hide-header :class="[($store.state.common.subchannel).split('_')[0] !== 'PROMOCION' ? 'bg-general' : '']")
      b-modal#quote.abandono.bg-general(static size="md" centered hide-footer hide-header)
        //- b-container
          b-row.justify-content-center
            b-col.text-center.mb-5(cols="12")
              img.w-100(src="@/static/media/seguro_vida/home/banner_hotsale-desktop.png" alt="hot sale descuento")
          b-row.justify-content-center
            b-col.text-center(cols="12")
              h2.mb-3.omnes-semibold.text-white {{ ($store.state.common.saveClient.nombre).toUpperCase() }},
              h3.text-white ¡Aprovecha esta imperdible promoción! <br>Te devolvemos el&nbsp;<b>70% de tu primer pago</b> <br>al finalizar la compra.
          b-row.justify-content-center.mt-5
            b-col.text-center(cols="12")
              b-button(variant="dark" @click="$nuxt.$emit('bv::hide::modal', 'quote')") QUIERO CONTINUAR
        //- b-container(v-if="($store.state.common.subchannel).split('_')[0] !== 'PROMOCION'")
        b-container
          b-row.justify-content-center
            b-col.text-center.mb-5(cols="12")
              img(src="@/static/media/images/abandono_cotiza_seguro_de_vida.svg" alt="abandonar seguro de vida")
          b-row.text-center
            b-col(cols="12")
              h2.omnes-semibold.text-primary.mb-0(style="font-size: 1.54rem!important") ¡No te vayas sin proteger <br> a quienes más amas!
            b-col(cols="12").my-4
              h3.text-primary(v-if="formQuote.frecuenciaPago === 'M'") Por tan solo<span class="omnes-semibold"> S/ {{ toCalculate.primaRecurrente }} mensual</span><br> estás protegiendo a quienes más. <br> amas por un monto de <span class="omnes-semibold"> S/ {{ parseDecimal(parseFloat(formQuote.sumaAsegurada)) }} </span>
              h3.text-primary(v-if="formQuote.frecuenciaPago === 'T'") Por tan solo<span class="omnes-semibold"> S/ {{ toCalculate.primaRecurrente }} trimestral</span><br> estás protegiendo a quienes más. <br> amas por un monto de <span class="omnes-semibold"> S/ {{ parseDecimal(parseFloat(formQuote.sumaAsegurada)) }} </span>
              h3.text-primary(v-if="formQuote.frecuenciaPago === 'S'") Por tan solo<span class="omnes-semibold"> S/ {{ toCalculate.primaRecurrente }} semestral</span><br> estás protegiendo a quienes más. <br> amas por un monto de <span class="omnes-semibold"> S/ {{ parseDecimal(parseFloat(formQuote.sumaAsegurada)) }} </span>
              h3.text-primary(v-if="formQuote.frecuenciaPago === 'A'") Por tan solo<span class="omnes-semibold"> S/ {{ toCalculate.primaRecurrente }} anual</span><br> estás protegiendo a quienes más. <br> amas por un monto de <span class="omnes-semibold"> S/ {{ parseDecimal(parseFloat(formQuote.sumaAsegurada)) }} </span>
          b-row.justify-content-center
            b-col.text-center(cols="12")
              b-button(variant="dark" @click="$nuxt.$emit('bv::hide::modal', 'quote')") QUIERO CONTINUAR
        //- b-container(v-else)
          b-row.justify-content-center
            b-col.text-center.mb-5(cols="12")
              img.w-100(src="@/static/media/common/abandono_descuento.png" alt="primera cuota gratis seguro de vida")
          b-row.justify-content-center
            b-col.text-center(cols="12")
              h2.mb-3.omnes-semibold.text-primary(v-if="$store.state.common.saveClient.nombre") {{ ($store.state.common.saveClient.nombre).toUpperCase() }},
              h3.text-primary Por la compra de tu seguro con un pago mensual, tu primera cuota es gratis *, ¡Quedan pocos días, aprovecha esta oportunidad!
          b-row.justify-content-center.mt-5
            b-col.text-center(cols="12")
              b-button(variant="dark" @click="$nuxt.$emit('bv::hide::modal', 'quote')") QUIERO CONTINUAR
</template>

<script>
// @ is an alias to /src
import Stepper from '@/components/common/Stepper.vue'
import FormVerifyData from '@/components/form/FormVerifyData'
import FormCalculateInversa from '@/components/form/FormCalculateInversa'
import PersonalData from '@/components/PersonalData'
import Swal from 'sweetalert2'
import moment from 'moment'

import _ from 'lodash'
export default {
  layout: 'steps',
  data () {
    return {
      product: 'Vida',
      tracking: {
        channel: this.$store.state.common.channel,
        trackingId : this.$store.state.common.trackingId,
        screen: 'cotizador',
        document: this.$store.state.common.dniCliente,
        name: this.$store.state.common.saveClient.nombre + ' ' + this.$store.state.common.saveClient.apellidoPaterno + ' ' + this.$store.state.common.saveClient.apellidoMaterno,
        dob: this.$store.state.common.saveClient.fechaNacimiento,
        email: this.$store.state.common.saveClient.email,
        phone: this.$store.state.common.saveClient.numeroTelefono,
        data: {}
      },
      dataVacia: false,
      showQuote: false,
      showForm: false,
      urlExclusiones: '',
      showModal: true,
      stepper: 'cotiza',
      maxEdad: 60,
      mayorEdad: 18,
      form: { idProducto: 2, edad: 29 }, // 2: Vida con devolución
      client: {
        numeroDocumento: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        sexo: null,
        numeroTelefono: '',
        email: ''
      },
      clientLast: {},
      showPercent: false,
      idProducto: 2,
      formQuote: {
        sumaAsegurada: 0,
        periodoVigencia: null,
        periodoPago: null,
        frecuenciaPago: null,
        codMoneda: 1, // 1:Soles y 2:Dolares
        sexo: null,
        edadContratacion: 0,
        fechaNacimiento: null,
        porcentaje: 100
      },
      formQuoteLast: {},
      toCalculate: {
        porcentajeDevolucion: [],
        primaRecurrente: 0,
        montoDevolucion: 0,
        primaClienteAnual: '',
        coberturaFallecimiento: [],
        rangoSumaAseguradaSoles: [],
        frecuenciaPago: [],
        periodosCobertura: []
      },
      toCalculateSinDescuento: {
        porcentajeDevolucion: [],
        primaRecurrente: 0,
        montoDevolucion: 0,
        primaClienteAnual: ''
      },
      frequencyText: '',
      remarketing: {
        producto: '3',
        codigoRemarketing: this.$store.state.common.codeRemarketing,
        identificador: this.$store.state.common.saveClient.numeroDocumento, // dni
        detalle: {
          correo: this.$store.state.common.saveClient.email,
          celular: this.$store.state.common.saveClient.numeroTelefono,
          canalVenta: this.$store.state.common.channel,
          codigoVenta: this.$store.state.common.trackingId, // trackingId
          pantalla: 1,
          enviarCorreo: 0, // 0: enviar correo 1: no envia el primer 2: no envia remarketing
          datosCorreo:{
            url: (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? process.env.base + 'seguro-de-vida/universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? process.env.base + 'seguro-de-vida/ahorro-jubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? process.env.base + 'seguro-de-vida/proteccion-segura' : (this.$store.state.common.subchannel === 'SIN_BENEFICIARIOS') ? process.env.base + 'seguro-de-vida/ahorro-seguro/v2' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? process.env.base + 'seguro-de-vida/ahorro-seguro'  : process.env.base + 'seguro-de-vida/vida-con-devolucion',
            plantilla:{
              // 1:'verificacion-01.html',
              // 2:'verificacion-02.html'
              1:(this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'verificacion_universitario-01-02.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'verificacion_jubilacion-01-02.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'verificacion_proteccion-01-02.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'verificacion_ahorroseguro-01.html' : 'verificacion-01.html',
              2:(this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'verificacion_universitario-01-02.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'verificacion_jubilacion-01-02.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'verificacion_proteccion-01-02.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'verificacion_ahorroseguro-02.html' : 'verificacion-02.html'
            },
            utm:{
              1: 'utm_campaign=remarketingVer1&canal=remarketing',
              2: 'utm_campaign=remarketingVer2&canal=remarketing'
            }
          },
          datosProducto: {
            sumaAsegurada: '',
            periodoVigencia: '',
            periodoPago: '',
            frecuenciaPago: '',
            codMoneda: '',
            porcentaje: '',
            primaRecurrente: '',
            montoDevolucion: '',
            datosTitular: {}
          },
          datosTitular: {
            nombre: ''
          },
          remitente: {
            correoRemitente: (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'seguro.universitario@interseguro.com.pe' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'ahorro.jubilacion@interseguro.com.pe' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'proteccion.segura@interseguro.com.pe' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'ahorro.seguro@interseguro.com.pe' : 'segurodevidacondevolucion@interseguro.com.pe',
            correoRemitenteDisplay: (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'Interseguro - Seguro universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'Interseguro - Ahorro jubilación' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'Interseguro - Protección segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'Interseguro - Ahorro seguro' : 'Interseguro - Seguro de Vida'
          }
        }
      },
      remarketingLast: {},
      interval: null
    }
  },
  created () {
    let self = this
    window.dataLayer = window.dataLayer || []
    // window.onbeforeunload = self.leaving
    this.urlExclusiones = require('./../../../../static/docs/Exclusiones-VidaConDevolucion.pdf')
    this.client.numeroDocumento = this.$store.state.common.saveClient.numeroDocumento || ''
    this.client.nombre = this.$store.state.common.saveClient.nombre || ''
    this.client.apellidoPaterno = this.$store.state.common.saveClient.apellidoPaterno || ''
    this.client.apellidoMaterno = this.$store.state.common.saveClient.apellidoMaterno || ''
    this.client.fechaNacimiento = this.$store.state.common.saveClient.fechaNacimiento || ''
    this.client.sexo = this.$store.state.common.saveClient.sexo || null
    this.client.numeroTelefono = this.$store.state.common.saveClient.numeroTelefono || ''
    this.client.email = this.$store.state.common.saveClient.email || ''
    this.formQuote.periodoVigencia = null
    this.formQuote.periodoPago = null
    // Evento para validar los datos del cliente y mostrar la información adecuada
    this.$nuxt.$on('save-data-remarketing', ({ envioCotizacion, sendQuotation }) => { self.startSessionSave(envioCotizacion, sendQuotation) } )
    this.$nuxt.$on('validate-data-client', ({ client, edad }) => {
      // console.log('----------------------------validate-data-client------------------------------------')
      try {
        let fieldsRequired = [
          { field: 'nombre', message: 'Nombre es un campo obligatorio' },
          { field: 'apellidoPaterno', message: 'Apellido paterno es un campo obligatorio' },
          { field: 'apellidoMaterno', message: 'Apellido materno es un campo obligatorio' },
          { field: 'sexo', message: 'Sexo es un campo obligatorio' },
          { field: 'fechaNacimiento', message: 'Fecha de nacimiento es un campo obligatorio' },
          { field: 'email', message: 'Correo es un campo obligatorio' },
          { field: 'numeroTelefono', message: 'Celular es un campo obligatorio' }
        ]
        fieldsRequired.forEach(f => { if (!client[f.field]) { throw f.message } })
        // eslint-disable-next-line no-throw-literal
        if (edad < this.mayorEdad || edad > this.maxEdad || !edad) { throw 'Fecha de nacimiento es un campo obligatorio' }
        // eslint-disable-next-line no-throw-literal
        if (client.fechaNacimiento.length !== 10) { throw 'Fecha de nacimiento es un campo obligatorio' }
        // Mostrar el cotizador
        this.$nuxt.$emit('show-loader', { text: 'Estamos cargando tu cotización...' })
        if (this.$store.state.common.verifyDataClient) {
          this.dataVacia = false
          this.showQuote = true
          this.$nuxt.$emit('generate-parametter-to-calculate', { saveClient: '' })
        } else {
          this.dataVacia = true
          this.showQuote = false
        }
        window.dataLayer.push({
          'event': 'PCotizarDatos datos completos',
          'category': 'Paso Cotizar',
          'action': 'Cargar datos',
          'label': 'datos completos'
        })
        this.$nuxt.$emit('hide-loader')
      } catch (err) {
        this.dataVacia = (!client.nombre && !client.apellidoPaterno && !client.apellidoMaterno && !client.sexo && !client.fechaNacimiento && !client.numeroTelefono)
        this.showQuote = false
        if (this.dataVacia) {
          // Datos vacios
          window.dataLayer.push({
            'event': 'PCotizarDatos datos vacios',
            'category': 'Paso Cotizar',
            'action': 'Cargar datos',
            'label': 'datos vacios'
          })
        } else {
          // Datos semicompletos
          window.dataLayer.push({
            'event': 'PCotizarDatos dato no completos',
            'category': 'Paso Cotizar',
            'action': 'Cargar datos',
            'label': 'datos no completos'
          })
        }
      }
      // console.log('----------------FIN VALIDATE-DATA-CLIENT---------------------')
    })
    // Evento para realizar la cotizacion
    this.$nuxt.$on('make-quote', () => { // Actualizacion del monto a pagar y el monto de devolucion
      if (this.formQuote.periodoPago && this.formQuote.frecuenciaPago) {
        this.formQuote.periodoVigencia = this.formQuote.periodoPago
        let fecha = (this.$store.state.common.saveClient.fechaNacimiento).replace(/\s/g, '').split('/').reverse().join('-')
        this.formQuote.fechaNacimiento = (this.$store.state.common.saveClient.fechaNacimiento).replace(/\s/g, '')
        this.formQuote.edadContratacion = (moment().diff(fecha, 'years'))
        this.formQuote.sexo = this.$store.state.common.saveClient.sexo
        if ((this.formQuote.frecuenciaPago).length === 1) {
          this.showPercent = true
          // Agregar loader
          this.$nuxt.$emit('show-loader', {
            text: 'Estamos cargando tu cotización...'
          })
          this.formQuote.fechaNacimiento = (this.$store.state.common.saveClient.fechaNacimiento).replace(/\s/g, '')
          this.formQuote.sexo = this.$store.state.common.saveClient.sexo
          this.formQuote.periodoVigencia = this.formQuote.periodoPago
          this.$store.dispatch('common/makeQuote', this.formQuote).then(res => {
            // console.log('make-quote', res.data)
            if (res.code === '01') {
              this.$store.dispatch('common/makeQuoteWithout', this.formQuote).then(sinDescuento => {
                this.showPercent = true
                window.dataLayer.push({
                  'event': 'PCotizar generar cotizacion',
                  'category': 'Paso Cotizar',
                  'action': 'Click',
                  'label': 'generar cotizacion'
                })
                
                setTimeout(() => {
                  // SIN DESCUENTO
                  this.$nuxt.$emit('show-range', { respuesta: sinDescuento.data })
                  // CON DESCUENTO
                  // this.$nuxt.$emit('show-range', { respuesta: res.data, sinDescuento: sinDescuento.data })
                  // if (this.$store.state.common.channel === 'AHORRO_SEGURO') {
                  //   this.$nuxt.$emit('show-range', { respuesta: sinDescuento.data })
                  // } else {
                  //   this.$nuxt.$emit('show-range', { respuesta: res.data, sinDescuento: sinDescuento.data })
                  // }
                  
                  this.$nuxt.$emit('hide-loader')
                }, 500)

              }, res => {
                // res.response.data.message
                // TRACKING ERROR: error de cotización
                this.tracking.errorType = 'BACKEND'
                this.tracking.errorData = res.response.data.message
                this.tracking.primaRecurrente = ''
                this.tracking.data = _.cloneDeep(this.formQuote)
                this.remarketing.detalle.datosProducto = this.tracking.data

                this.remarketing.detalle.datosProducto.sumaAsegurada =  _.cloneDeep(this.tracking.data.sumaAsegurada)
                this.remarketing.detalle.datosProducto.sumaAsegurada =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.sumaAsegurada))
                this.remarketing.detalle.datosProducto.primaRecurrente =  _.cloneDeep(this.tracking.data.primaRecurrente)
                this.remarketing.detalle.datosProducto.primaRecurrente =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.primaRecurrente))
                this.remarketing.detalle.datosProducto.montoDevolucion =  _.cloneDeep(this.tracking.data.montoDevolucion)
                this.remarketing.detalle.datosProducto.montoDevolucion =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.montoDevolucion))

                this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
                  // console.log('tracking error Cotización', resTracking)
                })
                window.dataLayer.push({
                  'event': 'PCotizar error en el servidor',
                  'category': 'Paso Cotizar',
                  'action': 'Error',
                  'label': 'error en el servidor'
                })
                this.showPercent = false
                alert('Estamos teniendo problemas')
                this.$nuxt.$emit('hide-loader')
              }).catch((error) => {
                this.showPercent = true
                this.$nuxt.$emit('hide-loader')
                // console.log('Error', error)
              })
              
            } else {
              window.dataLayer.push({
                'event': 'PCotizar error en el servidor',
                'category': 'Paso Cotizar',
                'action': 'Error',
                'label': 'error en el servidor'
              })
              this.showPercent = false
              this.$nuxt.$emit('hide-loader')
              alert('Estamos teniendo problemas')
              this.tracking.errorType = 'BACKEND'
              this.tracking.errorData = 'Error no identificado'
              this.tracking.primaRecurrente = ''
              this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
                // console.log('tracking Cotización', resTracking)
              })
            }
          }, res => {
            // res.response.data.message
            // TRACKING ERROR: error de cotización
            this.tracking.errorType = 'BACKEND'
            this.tracking.errorData = res.response.data.message
            this.tracking.primaRecurrente = ''
            this.tracking.data = _.cloneDeep(this.formQuote)
            this.remarketing.detalle.datosProducto = this.tracking.data

            this.remarketing.detalle.datosProducto.sumaAsegurada =  _.cloneDeep(this.tracking.data.sumaAsegurada)
            this.remarketing.detalle.datosProducto.sumaAsegurada =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.sumaAsegurada))
            this.remarketing.detalle.datosProducto.primaRecurrente =  _.cloneDeep(this.tracking.data.primaRecurrente)
            this.remarketing.detalle.datosProducto.primaRecurrente =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.primaRecurrente))
            this.remarketing.detalle.datosProducto.montoDevolucion =  _.cloneDeep(this.tracking.data.montoDevolucion)
            this.remarketing.detalle.datosProducto.montoDevolucion =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.montoDevolucion))

            this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
              // console.log('tracking error Cotización', resTracking)
            })
            window.dataLayer.push({
              'event': 'PCotizar error en el servidor',
              'category': 'Paso Cotizar',
              'action': 'Error',
              'label': 'error en el servidor'
            })
            this.showPercent = false
            alert('Estamos teniendo problemas')
            this.$nuxt.$emit('hide-loader')
          }).catch((error) => {
            this.showPercent = true
            this.$nuxt.$emit('hide-loader')
            // console.log('Error', error)
          })
        }
      } else {
        document.getElementById('btn-cotizar').setAttribute('disabled', '')
      }
      // console.log('---------------FIN evento make-quote-------------------------------------')
    })
  },
  mounted () {
    if (document.getElementById('is')) {
      document.getElementById('is').addEventListener('mouseleave', this.mouseLeave, { passive: true })
    }
    this.interval = setInterval(this.startSessionSave, 2000)
    // this.interval = setInterval(this.startSessionSave, 15000)
    window.scrollTo(0, 0)
    // Emitiendo evento para validar los datos del cliente y mostrar la información adecuada
    console.log('Identificado::' + this.$store.state.common.identificador)
    if (this.$store.state.common.identificador) {
      setTimeout(() => {
        this.setFormQuote()
      }, 1500)
    }
    this.$nuxt.$emit('validate-data-client', {
      client: this.$store.state.common.saveClient,
      edad: this.$store.state.common.cotizacion.edadContratacion
    })
  },
  destroyed () {
    clearInterval(this.interval)
    document.getElementById('is').removeEventListener('mouseleave', this.mouseLeave, { passive: true })
    this.$nuxt.$off('validate-data-client')
    this.$nuxt.$off('make-quote')
    this.$nuxt.$off('save-data-remarketing')
    this.interval = null
  },
  methods: {
    mouseLeave (e) {
      if ((e.clientX < 0 || e.clientY < 0) && !this.$store.state.common.leaveMessage) {
        if (this.showQuote && !this.dataVacia && this.formQuote.sumaAsegurada && this.formQuote.primaRecurrente && this.formQuote.frecuenciaPago) {
          this.$store.commit('common/setLeaveMessage', 1)
          document.getElementById('is').removeEventListener('mouseleave', this.mouseLeave, { passive: true })
          this.$nuxt.$emit('bv::show::modal', 'quote')
          this.$nuxt.$emit('bv::hide::modal', 'verifyData')
        } else {
          this.$store.commit('common/setLeaveMessage', 1)
          document.getElementById('is').removeEventListener('mouseleave', this.mouseLeave, { passive: true })
          this.$nuxt.$emit('bv::show::modal', 'verifyData')
          this.$nuxt.$emit('bv::hide::modal', 'quote')
        }
      }
    },
    startSessionSave (envioCotizacion, sendQuotation) {
      let self = this
      //TODO
      let bool = _.isEqual(this.formQuoteLast, this.formQuote)
      let bool_ = _.isEqual(this.clientLast, this.client)
      if ((!bool || !bool_) && this.client.email) {
      //if (this.client.email) {
        this.clientLast = _.cloneDeep(this.client)
        this.remarketing.detalle.datosProducto = _.cloneDeep(this.formQuote)

        this.remarketing.detalle.datosProducto.sumaAsegurada =  _.cloneDeep(this.formQuote.sumaAsegurada)
        this.remarketing.detalle.datosProducto.sumaAsegurada =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.sumaAsegurada))
        this.remarketing.detalle.datosProducto.primaRecurrente =  _.cloneDeep(this.formQuote.primaRecurrente)
        this.remarketing.detalle.datosProducto.primaRecurrente =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.primaRecurrente))
        this.remarketing.detalle.datosProducto.montoDevolucion =  _.cloneDeep(this.formQuote.montoDevolucion)
        this.remarketing.detalle.datosProducto.montoDevolucion =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.montoDevolucion))
        this.remarketing.detalle.datosProducto.datosTitular = _.cloneDeep(this.clientLast)
        if (this.formQuote.sumaAsegurada && this.formQuote.periodoPago &&
        this.formQuote.periodoVigencia && this.formQuote.frecuenciaPago && this.formQuote.primaRecurrente &&
        this.formQuote.montoDevolucion) { // cotizacion
          this.formQuoteLast = _.cloneDeep(this.formQuote)
          this.remarketing.detalle.datosProducto = _.cloneDeep(this.formQuote)
          // console.log(this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.sumaAsegurada)), this.formQuoteLast.periodoPago, this.formQuoteLast.frecuenciaPago, this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.primaRecurrente)), this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.montoDevolucion)))
          // console.log(this.formQuote.sumaAsegurada, this.formQuote.periodoPago, this.formQuote.frecuenciaPago, this.toCalculate.primaRecurrente, this.toCalculate.montoDevolucion)
          this.remarketing.detalle.datosProducto.sumaAsegurada =  _.cloneDeep(this.formQuote.sumaAsegurada)
          this.remarketing.detalle.datosProducto.sumaAsegurada =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.sumaAsegurada))
          this.remarketing.detalle.datosProducto.primaRecurrente =  _.cloneDeep(this.toCalculate.primaRecurrente)
          this.remarketing.detalle.datosProducto.primaRecurrente =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.primaRecurrente))
          this.remarketing.detalle.datosProducto.montoDevolucion =  _.cloneDeep(this.toCalculate.montoDevolucion)
          this.remarketing.detalle.datosProducto.montoDevolucion =  this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.montoDevolucion))
          this.frequencyText = (this.formQuote.frecuenciaPago === 'M') ? 'mensual' : (this.formQuote.frecuenciaPago === 'T') ? 'trimestral' : (this.formQuote.frecuenciaPago === 'S') ? 'semestral' : 'anual'

          this.remarketing.detalle.datosProducto.datosTitular = _.cloneDeep(this.clientLast)
          let firstName = (this.clientLast.nombre.split(" ").length === 1 ) ? this.clientLast.nombre : this.clientLast.nombre.split(" ")[0]
          this.$store.commit('common/setNombreCliente', firstName)
          let asuntoCot = {
            'universitario': [
              (firstName).toUpperCase() + ', no dejes de ahorrar S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.sumaAsegurada)) + ' para el futuro de tus pequeños pagando S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.primaRecurrente)) + ' ' + this.frequencyText,
              (firstName).toUpperCase() + ', ¿Vas a dejar pasar tu ahorro por S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.sumaAsegurada)) + ' ¡Hoy es un buen momento para hacerlo pagando S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.primaRecurrente)) + ' ' + this.frequencyText + '!',
              (firstName).toUpperCase() + ', no dejes de ahorrar  desde hoy para el  futuro de tus pequeños  y protegerlos por si un  día no estás para ellos'
            ],
            'jubilacion':  [
              (firstName).toUpperCase() + ', no dejes de ahorrar S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.sumaAsegurada)) + ' para tu futuro pagando S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.primaRecurrente)) + ' ' + this.frequencyText,
              (firstName).toUpperCase() + ', ¿Vas a dejar pasar tu ahorro por S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.sumaAsegurada)) + ' ¡Hoy es un buen momento para hacerlo pagando S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.primaRecurrente)) + ' ' + this.frequencyText + '!',
              (firstName).toUpperCase() + ', no dejes de ahorrar para tu futuro y proteger a los que más amas en un solo producto'
            ],
            'proteccion': [
              (firstName).toUpperCase() + ', no dejes de proteger a los que amas por S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.sumaAsegurada)) + ' pagando S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.primaRecurrente)) + ' ' + this.frequencyText,
              (firstName).toUpperCase() + ', ¿Vas a dejar pasar tu protección por S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.sumaAsegurada)) + '? ¡Hoy es un buen momento para proteger por tan solo S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.primaRecurrente)) + ' ' + this.frequencyText + '!',
              (firstName).toUpperCase() + ', no dejes de ahorrar de proteger a quienes más amas por si un día no estás para ellos'
            ],
            'ahorroseguro': [
              (firstName).toUpperCase() + ', no dejes pasar esos  S/ ' + this.remarketing.detalle.datosProducto.montoDevolucion + ' de ahorro pagando tan solo S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.primaRecurrente)) + ' ' + this.frequencyText,
              (firstName).toUpperCase() + ', empieza desde hoy a ahorrar y rentabilizar tu dinero',
              (firstName).toUpperCase() + ', arma tu fondo de ahorros por S/ ' + this.remarketing.detalle.datosProducto.montoDevolucion + ' con tan solo S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.primaRecurrente)) + ' ' + this.frequencyText,
            ],
            'vida': [
              (firstName).toUpperCase() + ', no dejes pasar esos S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.sumaAsegurada)) + ' de respaldo para los que amas por tan solo S/ ' + this.parseDecimal(parseFloat(this.formQuoteLast.primaRecurrente)) + ' ' + this.frequencyText,
              (firstName).toUpperCase() + ', tu cotización está pendiente... sigue donde te quedaste',
              (firstName).toUpperCase() + ', no dejes de proteger a los que más amas y ahorrar a la vez'
            ] 
          }
          //- console.log('STEP 5')
          this.remarketing.detalle.datosProducto.asunto1 = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ?  asuntoCot.universitario[0] : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? asuntoCot.jubilacion[0] : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? asuntoCot.proteccion[0] : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? asuntoCot.ahorroseguro[0] : asuntoCot.vida[0]
          this.remarketing.detalle.datosProducto.asunto2 = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ?  asuntoCot.universitario[1] : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? asuntoCot.jubilacion[1] : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? asuntoCot.proteccion[1] : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? asuntoCot.ahorroseguro[1] : asuntoCot.vida[1]
          this.remarketing.detalle.datosProducto.asunto3 = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ?  asuntoCot.universitario[2] : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? asuntoCot.jubilacion[2] : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? asuntoCot.proteccion[2] : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? asuntoCot.ahorroseguro[2] : asuntoCot.vida[2]
          this.remarketing.detalle.datosTitular = _.cloneDeep(this.clientLast)
          this.remarketing.detalle.datosCorreo.plantilla[1] = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'cotizacion_universitario-01-02-03.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'cotizacion_jubilacion-01-02-03.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'cotizacion_proteccion-01-02-03.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'cotizacion_ahorroseguro-01-02.html' : 'cotizacion-01-02.html'
          this.remarketing.detalle.datosCorreo.plantilla[2] = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'cotizacion_universitario-01-02-03.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'cotizacion_jubilacion-01-02-03.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'cotizacion_proteccion-01-02-03.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'cotizacion_ahorroseguro-01-02.html' : 'cotizacion-01-02.html'
          this.remarketing.detalle.datosCorreo.plantilla[3] = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'cotizacion_universitario-01-02-03.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'cotizacion_jubilacion-01-02-03.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'cotizacion_proteccion-01-02-03.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'cotizacion_ahorroseguro-03.html' : 'cotizacion-03.html'
          this.remarketing.detalle.datosCorreo.utm[1] = "utm_campaign=remarketingCot1&canal=remarketing"
          this.remarketing.detalle.datosCorreo.utm[2] = "utm_campaign=remarketingCot2&canal=remarketing"
          this.remarketing.detalle.datosCorreo.utm[3] = "utm_campaign=remarketingCot3&canal=remarketing"

          let correo = (this.$store.state.common.saveClient.email) ? this.$store.state.common.saveClient.email : this.clientLast.email
          this.remarketing.detalle.correo = correo
          this.remarketing.detalle.datosProducto.datosTitular.email = correo
          this.remarketing.detalle.datosTitular.email = correo
          //- console.log('STEP 6')
          if (envioCotizacion) {
            //- console.log('STEP 7')
            //- console.log(this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.sumaAsegurada)), this.formQuoteLast.periodoPago, this.formQuoteLast.frecuenciaPago, this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.primaRecurrente)), this.parseDecimal(parseFloat(this.remarketing.detalle.datosProducto.montoDevolucion)))
            //- console.log(this.formQuote.sumaAsegurada, this.formQuote.periodoPago, this.formQuote.frecuenciaPago, this.toCalculate.primaRecurrente, this.toCalculate.montoDevolucion)
            this.remarketing.detalle.enviarCorreo = 2 // no enviar
          }
          //- console.log('STEP 8')
          this.$store.dispatch('common/makeRemarketing', this.remarketing).then(rem => {
            this.$store.commit('common/setCodeRemarketing', rem.codigoRemarketing)
            this.remarketing.codigoRemarketing = rem.codigoRemarketing
            if (envioCotizacion) {
              sendQuotation.channel = this.$store.state.common.channel
              // this.$store.dispatch(urlQuotation, sendQuotation).then( res => {
              this.$store.dispatch('common/quotationWithout', sendQuotation).then( res => { // SIN DESCUEUNTO
              // this.$store.dispatch('common/quotation', sendQuotation).then( res => { //  CON DESCUENTO
                this.$nuxt.$emit('bv::show::modal', 'confirmSendQuote')
              }, res => {
                Swal.fire(
                  'Oops...!',
                  'Estamos teniendo problemas para enviar su cotización. Para mayor información puedes comunicarte al +51 933559693',
                  'error'
                )
              })
            }
          })
        } else if (!bool_) { // verificacion
          this.remarketing.detalle.datosTitular = _.cloneDeep(this.clientLast)
          let firstName = (this.clientLast.nombre.split(" ").length === 1 ) ? this.clientLast.nombre : this.clientLast.nombre.split(" ")[0]
          this.$store.commit('common/setNombreCliente', firstName)
          this.remarketing.detalle.datosProducto.asunto1 = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO' || this.$store.state.common.channel === 'AHORRO_JUBILACION') ? (firstName).toUpperCase() + ', ¿Sabías que puedes ahorrar todo tu dinero y ganar hasta 50% adicional?'  : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? (firstName).toUpperCase() + ', ¿Sabías que puedes proteger a los que más amas desde S/23 al mes?' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? (firstName).toUpperCase() + ', ¿Sabías que puedes recuperar todo tu dinero y ganar hasta 50% más? ' : (firstName).toUpperCase() + ', ¿Quién necesita un seguro de Vida con Devolución? Probablemente tú'
          this.remarketing.detalle.datosProducto.asunto2 = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? (firstName).toUpperCase() + ', ¿Buscando asegurar el futuro de tus pequeños? ¡Hoy es un buen momento para hacerlo!' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? (firstName).toUpperCase() + ', ¿Buscando ahorrar para tu futuro? ¡Hoy es un buen momento para hacerlo!' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? (firstName).toUpperCase() + ', ¿Buscando proteger a los que más amas por si un día no estás para ellos? Esto es para ti' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? (firstName).toUpperCase() + ', ¿Sabías que puedes rentabilizar tu dinero hasta en 50% adicional? ' : (firstName).toUpperCase() + ', ¿Qué pasa si un día no estás? Déjalos protegidos desde hoy'
          this.remarketing.detalle.datosProducto.asunto3 = ''
          this.remarketing.detalle.datosCorreo.plantilla[1] = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'verificacion_universitario-01-02.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'verificacion_jubilacion-01-02.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'verificacion_proteccion-01-02.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'verificacion_ahorroseguro-01.html' : 'verificacion-01.html'
          this.remarketing.detalle.datosCorreo.plantilla[2] = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'verificacion_universitario-01-02.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'verificacion_jubilacion-01-02.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'verificacion_proteccion-01-02.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'verificacion_ahorroseguro-02.html' : 'verificacion-02.html'
          this.remarketing.detalle.datosCorreo.plantilla[3] = ''
          this.remarketing.detalle.datosCorreo.utm[3] = ''
          
          let correo = (this.$store.state.common.saveClient.email) ? this.$store.state.common.saveClient.email : this.client.email
          this.remarketing.detalle.correo = correo
          this.remarketing.detalle.datosProducto.datosTitular.email = correo
          this.remarketing.detalle.datosTitular.email = correo
          this.$store.dispatch('common/makeRemarketing', this.remarketing).then(rem => {
            this.$store.commit('common/setCodeRemarketing', rem.codigoRemarketing)
            this.remarketing.codigoRemarketing = rem.codigoRemarketing
            //- // console.log('1 Remarketing index-cotiza: ', this.remarketing.detalle.datosProducto)
          })
        }
      }
      // console.log('------------------------------------')
    },
    parseDecimal (valor) {
      // console.log('entra?', valor)
      valor = parseFloat(valor)
      if (valor > 999) {
        // console.log('valor: ', valor, typeof valor)
        let nuevoValor = valor.toFixed('2').split('.')
        // console.log('nuevoValor: ', nuevoValor)
        if (nuevoValor.length > 1 && nuevoValor[1] != '00') {
          nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(',') + '.' + nuevoValor[1]
        } else if (nuevoValor.length > 1 && nuevoValor[1] == '00') {
          nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(',')
        } else {
          nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(',')
        }
        return nuevoValor
      } else {
        return valor.toFixed('2')
      }
    },
    parseDecimalSpace (valor) {
      // console.log('entra?', valor)
      valor = parseFloat(valor)
      if (valor > 999) {
        // console.log('valor: ', valor, typeof valor)
        let nuevoValor = valor.toFixed('2').split('.')
        // console.log('nuevoValor: ', nuevoValor)
        if (nuevoValor.length > 1 && nuevoValor[1] != '00') {
          nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(', ') + '.' + nuevoValor[1]
        } else if (nuevoValor.length > 1 && nuevoValor[1] == '00') {
          nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(', ')
        } else {
          nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(', ')
        }
        return nuevoValor
      } else {
        return valor.toFixed('2')
      }
    },
    setFormQuote () {
      let self = this
      if (this.$store.state.common.cotizacion.sumaAsegurada &&
            this.$store.state.common.cotizacion.periodoVigencia &&
            this.$store.state.common.cotizacion.periodoPago &&
            this.$store.state.common.cotizacion.frecuenciaPago &&
            this.$store.state.common.cotizacion.codMoneda &&
            this.$store.state.common.cotizacion.edadContratacion &&
            this.$store.state.common.cotizacion.porcentaje &&
            this.$store.state.common.cotizacion.primaRecurrente &&
            this.$store.state.common.cotizacion.montoDevolucion &&
            this.$store.state.common.cotizacion.sexo &&
            this.$store.state.common.cotizacion.fechaNacimiento) {
        this.formQuote.sumaAsegurada = (typeof this.$store.state.common.cotizacion.sumaAsegurada ==='number') ? this.$store.state.common.cotizacion.sumaAsegurada : parseInt(this.$store.state.common.cotizacion.sumaAsegurada.split(',').join(''))
        this.formQuote.periodoVigencia = this.$store.state.common.cotizacion.periodoVigencia
        this.formQuote.periodoPago = this.$store.state.common.cotizacion.periodoPago
        this.formQuote.frecuenciaPago = this.$store.state.common.cotizacion.frecuenciaPago
        this.formQuote.codMoneda = this.$store.state.common.cotizacion.codMoneda
        this.formQuote.sexo = this.$store.state.common.cotizacion.sexo
        this.formQuote.edadContratacion = this.$store.state.common.cotizacion.edadContratacion
        this.formQuote.fechaNacimiento = this.$store.state.common.cotizacion.fechaNacimiento
        this.formQuote.porcentaje = this.$store.state.common.cotizacion.porcentaje
        this.formQuote.primaRecurrente = parseFloat(this.$store.state.common.cotizacion.primaRecurrente.split(',').join('')).toFixed('2')
        this.formQuote.montoDevolucion = parseFloat(this.$store.state.common.cotizacion.montoDevolucion.split(',').join('')).toFixed('2')
        this.$store.commit('common/setCotizacion', _.cloneDeep(this.formQuote))
        //- if (this.$store.state.common.pantalla === 1) {
        //-   this.$store.commit('common/setIdentificador', null)
        //-   this.$nuxt.$emit('make-quote')
        //- } else {
        //-   this.$nuxt.$router.push({ path: '/paso/pago' })  
        //- }
        this.$store.commit('common/setIdentificador', null)
        this.$nuxt.$emit('make-quote')
      } else {
        this.$store.commit('common/setIdentificador', null)
      }
      this.$nuxt.$emit('bv::hide::modal', 'modalInfo')
    },
    capitalize (nombreCompleto) {
      nombreCompleto = nombreCompleto.toLowerCase()
      return nombreCompleto.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
    },
    hideModal () {
      this.$nuxt.$emit('bv::hide::modal', 'modalInfo')
      window.dataLayer.push({
        'event': 'PCotizar AceptarExclusiones',
        'category': 'Paso Cotizar',
        'action': 'Click',
        'label': 'Aceptar exclusiones'
      })
    },
    showSave () {
      this.dataVacia = true
      this.showQuote = false
      // console.log('Editar datos')
      window.dataLayer.push({
        'event': 'PCotizarEditar editar datos',
        'category': 'Paso Cotizar',
        'action': 'Click',
        'label': 'editar datos'
      })
    }
  },
  components: {
    PersonalData,
    Stepper,
    FormCalculateInversa,
    FormVerifyData,
    // IsAppointment: () => {if (process.client) { return import('@/components/AppointmentComponent') }}
  },
  middleware: 'is-quote-page'
}
</script>
