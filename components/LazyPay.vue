<template lang="pug">
  div(ref="pay")
    b-container.title.px-1.pt-3
      b-row.justify-content-center
        b-col.text-center.mb-3.mb-xl-4.p-relative(cols="12")
          h3.p-0.mb-0.mt-2.mt-xl-0.d-block.omnes-medium.text-primary Ingresa los datos de tarjeta de <span class="d-block omnes-medium"> crédito o débito para los pagos</span>
    b-container.content.px-1     
      b-row.form-payment.justify-content-center
        b-col.px-lg-0(cols="12")
          payment-culqi(:payment="paymentForm" v-if="pay.informacionPago.provider === 'CULQI'")
          payment-niubiz(:payment="paymentForm" v-else-if="pay.informacionPago.provider === 'NIUBIZ'")
      
      b-row.autorizar.justify-content-center(v-if="pay.informacionPago.provider === 'CULQI'")
        b-col.text-center(align="center" cols="12")
          h6.my-2.my-lg-1.text-black Al continuar acepto las<h6 class="omnes-semibold" v-b-modal.show-conditions @click="modalConditions" style="display:inline;cursor:pointer;text-decoration: underline;">&nbsp;condiciones y exclusiones </h6>de la póliza. <br> Autorizo el envío de la póliza electrónica y comunicaciones de <br>Interseguro a mi correo.
      b-row.button.justify-content-center.mt-3.mb-2.mb-lg-2.mt-xl-4(v-if="pay.informacionPago.provider === 'CULQI'")
        b-col.text-center(align="center" lg="6")
          b-button.text-center.omnes-semibold.my-lg-2.py-2.px-lg-0(variant="dark" @click="goConfirm") Pagar S/ {{ (parseFloat($store.state.common.cotizacion.primaRecurrente) + parseFloat(primaRecurrenteAdicional)).toFixed(2)}}
      b-row.justify-content-center.mb-3(v-if="$store.state.common.subchannel === 'V2_UNIVERSITARIO'")
        b-col.text-center(align="center" cols="12")
          h4.my-2.my-lg-1.omnes-semibold Otras opciones de pago:
      b-row.justify-content-center.pago-efectivo(v-if="$store.state.common.subchannel === 'V2_UNIVERSITARIO'")
        b-col.text-center.mb-4.mb-xl-4.p-relative(cols="6")
          div.border
            img.w-100#pago-efectivo(src="@/static/media/common/pago/pago_efectivo.png" alt="pago efectivo" @click="getPagoEfectivo")
      b-row.justify-content-center.px-0.mt-2.mb-3(v-if="(($store.state.common.subchannel).split('_VALE_')[0] === 'IBK_PROMOCION' || $store.state.common.subchannel === 'IBK_CROSS') && parseInt($store.state.common.cotizacion.porcentaje) >= 100 && parseInt($store.state.common.cotizacion.sumaAsegurada) >= 100000")
        b-col.px-1.box-beneficio.text-center(cols="9" lg="8")
          h4.text-center.text-primary.omnes-medium(style="color: #02BB32!important;") ¡Gana vales o cuota gratis !
      b-row.justify-content-center.mb-2.pt-2
        b-col.compra-segura(cols="11")
          b-row.px-2.py-3
            b-col.px-0(cols="1")
              img(src="@/static/media/common/pago/candado_seguro.svg" alt="candado seguro")
            b-col.pr-0(cols="11")
              h6.omnes-medium.text-black Tu compra es 100% segura.
              h6.text-black Contamos con el respaldo del Grupo Intercorp
              img.logo_tarjeta.w-75(v-if="$store.state.common.channel!=='IBK'" src="@/static/media/common/pago/tarjetas/logos_tarjetas.svg" alt='monto seguro de vida')
              img.logo_tarjeta(v-else src="@/static/media/common/pago/tarjetas/logos_tarjetas_ibk.png" alt='monto seguro de vida')
    b-modal#show-conditions(static size="lg" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div
        img.image-9(@click='hideModal()' src='https://uploads-ssl.webflow.com/5b29b333e01a7071fadb2f1c/5b5f46206abb673bc5374fdb_icon-close.svg' width='40' alt="icon close" style="cursor: pointer;")
      h3.omnes-medium.text-center Declaración jurada del contratante
      div.my-3.px-2
        p Declaro que tengo conocimiento y acepto las Condiciones Generales, Particulares y Especiales relacionadas con la Póliza de Seguros de Interseguro Compañía de Seguros.
        p Certifico que las respuestas y declaraciones realizadas en este sitio web son verídicas y que se ajustan a la realidad y de no serlo, cualquier declaración falsa hecha por el Contratante, voluntaria o involuntariamente, invalida esta solicitud y libera de toda responsabilidad y compromiso indemnizatorio a Interseguro Compañía de Seguros, quedando el seguro emitido en virtud de esta solicitud nulo y sin efecto.
        p El Contratante otorga su consentimiento para que su Póliza de seguro electrónica, endosos futuros, cartas y/u otra documentación, sean enviados vía correo electrónico desde el dominio @interseguro. Todas aquellos documentos y comunicaciones se entenderán por recibidos en la casilla de correo electrónica declarada por el Contratante, a través de la confirmación del servidor de destino. La póliza contendrá una firma digital y una contraseña de acceso para visualizar el documento, ello garantizará la autenticidad e integridad del documento, de acuerdo con lo estipulado en la Ley N° 27269 - Ley de Firmas y Certificados Digitales. Asimismo, declara conocer las medidas de seguridad que debe adoptar para la recepción de los citados documentos, las ventajas y riesgos asociados a esta modalidad de envío, garantiza haber suministrado un correo electrónico válido en la Solicitud de Seguro, el cual mantendrá activo y con espacio suficiente para recibir la Póliza y se comprometen a informar su nuevo correo electrónico, en caso sea dado de baja o desee modificar la cuenta de correo declarada.
</template>

<script>
import PaymentCulqi from '@/components/form/FormPaymentCulqi'
import PaymentNiubiz from '@/components/form/FormPaymentNiubiz'
import Swal from 'sweetalert2'
import CondicionesExclusiones from '@/components/modals/CondicionesExclusionesPoliza'
export default {
  data () {
    return {
      primaRecurrenteAdicional: 0,
      modalTarjeta: false,
      tracking: {
        channel: this.$store.state.common.channel,
        trackingId : this.$store.state.common.trackingId,
        screen: 'pago',
        document: this.$store.state.common.dniCliente,
        name: this.$store.state.common.saveClient.nombre + ' ' + this.$store.state.common.saveClient.apellidoPaterno + ' ' + this.$store.state.common.saveClient.apellidoMaterno,
        dob: this.$store.state.common.saveClient.fechaNacimiento,
        email: this.$store.state.common.saveClient.email,
        phone: this.$store.state.common.saveClient.numeroTelefono,
        data: this.$store.state.common.cotizacion,
        errorType: '',
        errorData: ''
      },
      
      paymentForm: {
        email: this.$store.state.common.saveClient.email,
        card_number: '',
        public_key: process.env.culqiPK,
        url: process.env.culqiURL,
        cvv: '',
        expiration_date: null,
        expiration_year: null,
        expiration_month: null
      },
      cotizacion: {
        codMoneda: this.$store.state.common.cotizacion.codMoneda,
        porcentajeDevolucion: this.$store.state.common.cotizacion.porcentaje,
        frecuenciaPago: (this.$store.state.common.cotizacion.frecuenciaPago).split('')[0],
        edadContratacion: this.$store.state.common.cotizacion.edadContratacion
      },
      pay: {
        channel: this.$store.state.common.channel,
        subchannel: this.$store.state.common.subchannel,
        agencia: this.$store.state.common.agencia,
        channelSellIs: this.$store.state.common.channelSellIs,
        idAgente: '',
        //- sumaAsegurada: this.$store.state.common.cotizacion.sumaAsegurada,
        //- periodoVigencia: this.$store.state.common.cotizacion.periodoVigencia,
        //- periodoPago: this.$store.state.common.cotizacion.periodoPago,
        asegurado:
        {
          nombre: this.$store.state.common.saveClient.nombre,
          email: this.$store.state.common.saveClient.email,
          apellidoPaterno: this.$store.state.common.saveClient.apellidoPaterno,
          apellidoMaterno: this.$store.state.common.saveClient.apellidoMaterno,
          fechaNacimiento: this.$store.state.common.saveClient.fechaNacimiento,
          sexo: this.$store.state.common.saveClient.sexo,
          numeroDocumento: this.$store.state.common.dniCliente,
          numeroTelefono: this.$store.state.common.saveClient.numeroTelefono
        },
        informacionPago: {
          provider: this.$store.state.payment.provider,
          token: null
        },
      }
    }
  },
  
  created () {
    let self = this
    this.$nuxt.$on('show-payment', ({payment}) => {
      self.pay.informacionPago.provider = payment
      self.$store.commit('payment/setSessionKey', payment)
    })
    this.$nuxt.$on('card-message-error', (x) => {
      Swal.fire(
        'Oops...!',
        'Por favor, revisar correctamente los datos de tu tarjeta',
        'error'
      )
      this.tracking.errorType = 'FRONTEND'
      this.tracking.errorData = 'Por favor, revisar correctamente los datos de tu tarjeta'
      this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
        // console.log('Tracking pago', resTracking)
      })
      this.$amplitude.getInstance().logEvent(
      'Error Encontrado',
        {
          'Producto Consultado': 'VIDA',
          'Sub Producto Consultado': this.$store.state.common.channel,
          'Etapa de Funnel': this.$route.path,
          'Nombre Error': this.tracking.errorData
        }
      )
    })
    
  },
  mounted () {
    window.dataLayer = window.dataLayer || []
    this.primaRecurrenteAdicional = ((Object.keys(this.$store.state.common.cotizacionAdicional).length)) ? this.$store.state.common.cotizacionAdicional[1].primaRecurrente : 0
    var ref = this.$refs['pay'].offsetTop
    window.scrollTo(0, ref)
    this.$store.commit('payment/setBin', this.$route.query.bin)
    this.$store.commit('payment/setTransactionToken', this.$route.query.transactionToken)
    if (this.$store.state.common.channel === 'IBK') {
      this.$nuxt.$emit('show-payment',  { payment: 'CULQI' })
    } 
    this.$nuxt.$emit('show-loader', {
      text: 'Estamos obteniendo tus datos'
    })
    if (this.$route.query.transactionToken) {
      // Llamar a la api de generar poliza
      this.goGeneratePoliza(this.$store.state.payment.transactionToken)
      // this.$nuxt.$router.push({ path: pathFinish })
    } else {
      this.$store.commit('payment/setTransactionToken', null)
      this.$nuxt.$emit('show-loader', {
        text: 'Estamos procesando la información, solo tomará un momento'
      })
    }
  },
  methods: {
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
    transformarMes(mes){
      // console.log('transformar mes: ', mes)
      if (mes !== null && mes !== undefined) {

        if ("1" === mes || "01" === mes){
          return "01";
        } else if ("2" === mes || "02" === mes) {
          return "02";
        } else if ("3" === mes || "03" === mes) {
          return "03";
        } else if ("4" === mes || "04" === mes) {
          return "04";
        } else if ("5" === mes || "05" === mes) {
          return "05";
        } else if ("6" === mes || "06" === mes) {
          return "06";
        } else if ("7" === mes || "07" === mes) {
          return "07";
        } else if ("8" === mes || "08" === mes) {
          return "08";
        } else if ("9" === mes || "09" === mes) {
          return "09";
        } else if ("10" === mes) {
          return "10";
        } else if ("11" === mes) {
          return "11";
        } else if ("12" === mes) {
          return "12";
        } else {
          return null;
        }

      } else {

        return null

      }

    },
    transformarAnio(anio){
      // console.log('transformar anio: ', anio)
      if (anio !== null && anio !== undefined){
        let anioInt = parseInt(anio);

        if (anio.length === 2) {
          return "20" + anioInt;
        } else if(anio.length === 4){
          return anioInt;
        } else {
          return null;
        }
      } else {
        return null
      }
    },
    goGeneratePoliza (token) {
      let self = this
      self.pay.informacionPago.token = token
      // update email and phone
      self.pay.asegurado.email = (this.$store.state.common.saveClient.email).trim()
      self.pay.asegurado.numeroTelefono = this.$store.state.common.saveClient.numeroTelefono
      self.pay.idAgente = ''
      
      if (Object.keys(this.$store.state.common.cotizacionAdicional).length) {
        //- console.log('CON DATOS:', this.$store.state.common.cotizacionAdicional)
        self.pay.enfermedadesGraves = this.$store.state.payment.enfermedadesGraves
        self.pay.cotizacion = this.cotizacion
        self.pay.cotizacion.sexo = self.pay.asegurado.sexo
        self.pay.cotizacion.coberturas = this.$store.state.common.cotizacionAdicional
      } else {
        //- console.log('SIN DATOS: ', this.$store.state.common.cotizacionAdicional)
        //- console.log('pago:', this.$store.state.common.cotizacion)
        self.pay.porcentajeDevolucion = this.$store.state.common.cotizacion.porcentaje
        self.pay.sumaAsegurada = this.$store.state.common.cotizacion.sumaAsegurada
        self.pay.periodoVigencia = this.$store.state.common.cotizacion.periodoVigencia
        self.pay.periodoPago = this.$store.state.common.cotizacion.periodoPago
        self.pay.frecuenciaPago = (this.$store.state.common.cotizacion.frecuenciaPago).split('')[0]
        self.pay.codMoneda = this.$store.state.common.cotizacion.codMoneda
        self.pay.edadContratacion = this.$store.state.common.cotizacion.edadContratacion
      }
      
      // let makeSale = (this.$store.state.common.channel === 'IBK') ? 'payment/generatePolizaWithout' : 'payment/generatePoliza'
      let urlPoliza = (Object.keys(this.$store.state.common.cotizacionAdicional).length) ? 'payment/generatePolizaToCoverageAdicional' : 'payment/generatePolizaWithout'
      this.$store.dispatch(urlPoliza, self.pay)
      //- this.$store.dispatch('payment/generatePolizaWithout', self.pay) // SIN DESCUENTO
      // this.$store.dispatch('payment/generatePoliza', self.pay) // CON DESCUENTO
      // this.$store.dispatch(makeSale, self.pay)
      .then(res => {
        this.tracking.errorData = ''
        this.tracking.errorType = ''
        this.tracking.data.provider = self.pay.informacionPago.provider
        this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
          // console.log('tracking pago', resTracking)
        })
        
        this.$store.dispatch('common/getRemarketing', this.$store.state.common.dniCliente).then(getRemark => {
          if (getRemark.codigoRespuesta === '01') {
            this.$store.dispatch('common/cancelRemarketing', { codigoVenta: getRemark.detalle.codigoVenta, codigoProducto: '3' }).then(remarketing => {
              if ( remarketing.status === 500) {
                this.tracking.errorData = remarketing.error
                this.tracking.errorType = 'remarketing'
                this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => { })
              }
            }, res => {
              this.tracking.errorData = remarketing.error
              this.tracking.errorType = 'remarketing'
              this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => { })
            })
          }
        })
        let goPath = (this.$store.state.common.subchannel === 'ENDOSOS_MULTIBANCOS') ? '/endoso-con-devolucion/confirmar' : (this.$store.state.common.subchannel === 'ENDOSOS') ? '/endosos/confirmar' : (this.$store.state.common.channel === 'IBK') ? '/interbank/confirmar' : '/confirmar'
        this.$nuxt.$router.push({ path: goPath })
      }, res => {
        this.$store.commit('payment/setTransactionToken', '')
        window.dataLayer.push({
          'event': 'PPagoCTA error en servidor',
          'category': 'Paso Pago',
          'action': 'Error',
          'label': 'error al realizar el pago'
        })
        if ((res.response.data.code) === "86") {
          res.response.data.message = 'Ingrese una tarjeta crédito o débito INTERBANK'
        } 
        if ((res.response.data.code) === "83") {
          res.response.data.message = 'Se encuentra registrado en nuestra lista negra, no puedo realizar la compra'
        }else {
          res.response.data.message = (res.response) ? ((res.response.data.message).split(' ')[0] === 'Error') ? ((res.response.data.message).split('[')[1].split(']')[0]) : res.response.data.message : 'Estamos teniendo problemas para realizar la venta. Para mayor información puedes comunicarte al +51 933559693'
          if (this.pay.informacionPago.provider == 'NIUBIZ' && res.response.data.code === '87') {
            this.$nuxt.$emit('show-payment',  { payment: 'CULQI' })
          }
        }
        Swal.fire(
          'Oops...!',
          (res.response.data.message),
          'error'
        )
        this.tracking.errorType = 'BACKEND'
        this.tracking.errorData = res.response.data.message
        this.tracking.data.provider = self.pay.informacionPago.provider
        this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
          // console.log('ERROR tracking pago', resTracking)
        })
        this.$amplitude.getInstance().logEvent(
        'Error Encontrado',
          {
            'Producto Consultado': 'VIDA',
            'Sub Producto Consultado': this.$store.state.common.channel,
            'Etapa de Funnel': this.$route.path,
            'Nombre Error': this.tracking.errorData
          }
        )
        this.$nuxt.$emit('hide-loader')
      })
    },
    goConfirm () {
      let self = this
      // update email
      self.paymentForm.email = this.$store.state.common.saveClient.email
      this.$nuxt.$emit('show-loader', {
        text: 'Estamos procesando tu pago, solo tomará un momento'
      })
      // this.$nuxt.$router.push({ path: '/confirmar' })
      // Fix credit card number. Removing blank spaces
      this.paymentForm.card_number = this.paymentForm.card_number.replace(/ /g, '')
      this.paymentForm.expiration_month = this.paymentForm.expiration_month
      this.paymentForm.expiration_year = this.paymentForm.expiration_year

      this.$store.dispatch('payment/getTokenCulqi', this.paymentForm).then(res => {
        if (res.object === 'error') {
          // console.log('....error ', res)
          window.dataLayer.push({
            'event': 'PPagoCTA error en token',
            'category': 'Paso Pago',
            'action': 'Error',
            'label': 'error en token'
          })
          Swal({
            title: 'Oops...',
            text: res.user_message,
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#2177CC',
            confirmButtonText: 'OK'
          })
          this.tracking.errorType = 'CULQI'
          this.tracking.errorData = res.user_message
          this.tracking.data.tipoTarjeta = res.iin.card_type
          this.tracking.data.claseTarjeta = this.$store.state.common.cardClass
          this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
            // console.log('ERROR tracking pago', resTracking)
          })
          this.$amplitude.getInstance().logEvent(
          'Error Encontrado',
            {
              'Producto Consultado': 'VIDA',
              'Sub Producto Consultado': this.$store.state.common.channel,
              'Etapa de Funnel': this.$route.path,
              'Nombre Error': this.tracking.errorData
            }
          )
          this.$nuxt.$emit('hide-loader')
        } else {
          self.pay.informacionPago.token = res.id
          // update email and phone
          self.pay.asegurado.email = this.$store.state.common.saveClient.email
          self.pay.asegurado.numeroTelefono = this.$store.state.common.saveClient.numeroTelefono
          this.tracking.data.tipoTarjeta = res.iin.card_type
          this.goGeneratePoliza(res.id)
          
        }
      }, res => {
        // TRACKING ERROR: error en el token
        window.dataLayer.push({
          'event': 'PPagoCTA error en token',
          'category': 'Paso Pago',
          'action': 'Error',
          'label': 'error en token'
        })
        let respuesta=''
        respuesta = (res.response && res.response.data && res.response.data.user_message ) ? res.response.data.user_message : 'Pasarela de pagos no responde'
        Swal.fire(
          'Oops...!',
          respuesta,
          'error'
        )
        this.tracking.errorType = 'CULQI'
        this.tracking.errorData = respuesta
        this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
          // console.log('ERROR tracking pago', resTracking)
        })
        this.$amplitude.getInstance().logEvent(
        'Error Encontrado',
          {
            'Producto Consultado': 'VIDA',
            'Sub Producto Consultado': this.$store.state.common.channel,
            'Etapa de Funnel': this.$route.path,
            'Nombre Error': this.tracking.errorData
          }
        )
        this.$nuxt.$emit('hide-loader')
      })
    },
    hideModal () {
      this.$nuxt.$emit('bv::hide::modal', 'show-conditions')
    },
    modalConditions () {
      // datalayer
      window.dataLayer.push({
        'event': 'PPagoAceptar mostrar modal',
        'category': 'Paso Pago',
        'action': 'Click',
        'label': 'mostrar modal de condiciones y exclusiones de la poliza'
      })
    },
    getPagoEfectivo () {
      this.$nuxt.$emit('show-loader', {
        text: 'Estamos generando tu código con Pago Efectivo'
      })
      setTimeout(() => {
        this.$nuxt.$emit('hide-loader')
        Swal.fire(
          'Oops...!',
          'Estamos teniendo problemas con Pago Efectivo. Intente ingresar con su tarjeta de crédito o débito',
          'error'
        )
      }, 2500)
    }
  },
  destroyed () {
    this.$nuxt.$off('show-payment')
  },
  components: {
    PaymentCulqi,
    PaymentNiubiz,
    CondicionesExclusiones
  }
}
</script>
