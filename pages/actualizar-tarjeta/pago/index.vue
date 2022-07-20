<template lang="pug">
  .actualizarTarjeta#pago
    b-container(v-if="!pagado")
      b-row.justify-content-center
        b-col.mt-4(cols='6' sm="5" lg="3" xl="4")
          .text-center
            stepper.px-xl-3(:step="'pago'")
    b-container.mt-lg-5(v-if="!pagado")
      b-row.justify-content-center
        b-col(cols="12" md="8" lg="6" xl="6")
          b-row.align-items-center.title.my-2.justify-content-center
            b-col(cols="12")
              h3.omnes-medium Datos de tu póliza
          b-row.justify-content-center
            b-col(cols="12")
              div.box
                b-container
                  b-row
                    b-col.pt-1.pt-xl-0.pl-0(cols="6" lg="5")
                      h4 Contratante
                    b-col.pt-1.pt-xl-0.pl-0.pl-xl-2(cols="6" lg="7")
                      h4.omnes-medium {{ $store.state.payment.nombreCompleto }}
                  b-row
                    b-col.pt-1.pt-xl-0.pl-0(cols="6" lg="5")
                      h4 Número de póliza
                    b-col.pt-1.pt-xl-0.pl-0.pl-xl-2(cols="6" lg="7")
                      h4.omnes-medium {{ $store.state.payment.numeroPolizaUpdate }}
                  b-row
                    b-col.pt-1.pt-xl-0.pl-0(cols="6" lg="5")
                      h4 Monto de protección
                    b-col.pt-1.pt-xl-0.pl-0.pl-xl-2(cols="6" lg="7")
                      h4.omnes-medium S/ {{ $store.state.payment.sumaAsegurada.split(/(?=(?:\d{3})+$)/).join(',') }}
                  b-row
                    b-col.pt-1.pt-xl-0.pl-0(cols="6" lg="5")
                      h4 Monto de prima
                    b-col.pt-1.pt-xl-0.pl-0.pl-xl-2(cols="6" lg="7")
                      h4.omnes-medium S/ {{ parseDecimal($store.state.payment.primaRecurrente) }}
                  b-row
                    b-col.pt-1.pt-xl-0.pl-0(cols="6" lg="5")
                      h4 Frecuencia de Pago
                    b-col.pt-1.pt-xl-0.pl-0.pl-xl-2(cols="6" lg="7")
                      h4.omnes-medium(v-if="$store.state.payment.frecuenciaPago === 'M' || $store.state.common.cotizacion.frecuenciaPago === 'Mensual'") Mensual
                      h4.omnes-medium(v-if="$store.state.payment.frecuenciaPago === 'T' || $store.state.common.cotizacion.frecuenciaPago === 'Trimestral'") Trimestral
                      h4.omnes-medium(v-if="$store.state.payment.frecuenciaPago === 'S' || $store.state.common.cotizacion.frecuenciaPago === 'Semestral'") Semestral
                      h4.omnes-medium(v-if="$store.state.payment.frecuenciaPago === 'A' || $store.state.common.cotizacion.frecuenciaPago === 'Anual'") Anual
        hr.d-xl-none
        b-col.content(cols='12' md="8" lg="12" xl="6")
          b-row.mt-lg-2.mt-xl-0.justify-content-center
            b-col.text-center(cols="12" lg="6" xl="10")
              h3.d-block.omnes-medium.text-primary Ingresa los nuevos datos de la <br> tarjeta de crédito o débito <br> para los pagos
          b-row.justify-content-center.mt-4.mb-1
            b-col.text-center(xl="6")
              img.d-inline.mr-1(src="@/static/media/icons/protege-azul.svg" alt="protege tu tarjeta" style="width: .9rem;")
              h5.omnes-medium.text-primary.d-inline Pago online 100% seguro.  
          b-row.box-pago.justify-content-center
            b-col.content(cols="10" sm="9" lg="12" xl="12")
              form-payment.form-payment(:payment="paymentForm")
          b-row.mt-3.mb-4.mb-xl-5.justify-content-center
            b-col.text-center.mt-3(cols="10")
              b-button#btn-guardar.omnes-medium.lh-1(variant="dark" @click="pay") ACTUALIZAR TARJETA
          b-row.pt-lg-4.pt-xl-3.mb-5.justify-content-center
            b-col(align="center" cols="7" xl="7")
              img.logo_tarjeta.w-100(src="@/static/media/common/pago/tarjetas/logos_tarjetas.svg" alt='monto seguro de vida' style="cursor:pointer;position: absolute;right: 0;top: -10px;")
    b-container.confirmar(v-else)
      b-row.mt-5.mb-5.justify-content-center
        b-col.text-center(cols="10")
          img(src="@/static/media/icons/estrella_seguro_de_vida.svg" alt="estrella")
      b-row.mt-4.mb-3.justify-content-center
        b-col.text-center
          h3.d-block.omnes-medium Tu medio de pago se <br> ha actualizado con éxito
      b-row.mt-3.mb-5.justify-content-center
        b-col.text-center.mt-3(cols="10" lg="6")
          b-button#btn-guardar.omnes-medium.lh-1(variant="dark" @click="$nuxt.$router.push({ path: '/vida-con-devolucion'})") IR AL HOME
</template>


<script>
import { validationMixin } from 'vuelidate'

import Stepper from '@/components/common/StepperUpdatePay.vue'
import FormPayment from '@/components/form/FormPaymentCulqi'
import Swal from 'sweetalert2'

export default {
    layout: 'updateCard',
    data () {
      return {
        pagado: false,
        formCard: {
          email: this.$store.state.payment.correo,
          subscriptionId: this.$store.state.payment.subscriptionId,
          provider: 'CULQI',
          token: 'XYZ_123'
        },
        paymentForm: {
          email: this.$store.state.payment.correo,
          card_number: '',
          public_key: process.env.culqiPK,
          url: process.env.culqiURL,
          cvv: '',
          expiration_date: null,
          expiration_year: null,
          expiration_month: null
        }
      }
    },
    mounted () {
      this.$nuxt.$emit('hide-loader')
    },
    methods: {
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
      pay () {
        this.$nuxt.$emit('show-loader', {
          text: 'Estamos procesando tu pago, solo tomará un momento'
        })
        let self = this
        self.paymentForm.card_number = self.paymentForm.card_number.replace(/ /g, '')
        this.$store.dispatch('payment/getTokenCulqi', this.paymentForm)
        .then(res => {
          if (res.object === 'error') {
            Swal({
              title: 'Oops...',
              text: res.user_message,
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#2177CC',
              confirmButtonText: 'OK'
            })
            this.$nuxt.$emit('hide-loader')
          } else {
            self.formCard.token = res.id
            

            this.$store.dispatch('payment/updateCard', self.formCard)
            .then(resformCard => {
              self.pagado = true
              this.$store.commit('payment/setNumeroPolizaUpdate', '')
              this.$store.commit('payment/setToken', '')
              this.$store.commit('payment/setNombreCompleto', '')
              this.$store.commit('payment/setCorreo', '')
              this.$store.commit('payment/setSumaAsegurada', '')
              this.$store.commit('payment/setPrimaRecurrente', '')
              this.$nuxt.$emit('hide-loader')
            }, res => {
              let respuesta = ''
              respuesta = (res.response.data.code) ? (res.response.data.message).split('[')[1].split(']')[0] : 'Estamos teniendo problemas para realizar la venta. Para mayor información puedes comunicarte al +51 933559693'
              Swal.fire(
                'Oops...!',
                respuesta,
                'error'
              )
              this.$nuxt.$emit('hide-loader')
            })
            .catch(respuesta => {
              Swal.fire(
                'Oops...!',
                'Estamos teniendo problemas para realizar la venta. Para mayor información puedes comunicarte al +51 933559693',
                'error'
              )
              this.$nuxt.$emit('hide-loader')
            })          
          }
        }, res => {
          let respuesta = ''
          respuesta = (res.response.data.code) ? (res.response.data.user_message) : 'Estamos teniendo problemas para realizar la venta. Para mayor información puedes comunicarte al +51 933559693'
          Swal.fire(
            'Oops...!',
            respuesta,
            'error'
          )
          this.$nuxt.$emit('hide-loader')
        })
        .catch(respuesta => {
          Swal.fire(
            'Oops...!',
            'Estamos teniendo problemas para realizar la venta. Para mayor información puedes comunicarte al +51 933559693',
            'error'
          )
          this.$nuxt.$emit('hide-loader')
        })
      }
    },
    beforeDestroy () {
      this.$store.commit('payment/setNumeroPolizaUpdate', '')
      this.$store.commit('payment/setToken', '')
      this.$store.commit('payment/setNombr', '')
      this.$store.commit('payment/setNombreCompleto', '')
      this.$store.commit('payment/setCorreo', '')
    },
    mixins: [
      validationMixin
    ],
    components: {
      FormPayment,
      Stepper
    },
    middleware: 'is-update-card'
}
</script>

