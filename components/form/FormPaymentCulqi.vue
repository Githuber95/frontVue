<template lang="pug">
  b-row.pt-1
    b-col
      b-row.box-card.pl-sm-1.py-0.justify-content-lg-center
        b-col.pl-md-3.pr-md-4.pl-lg-0.pr-lg-1.mx-lg-0.mx-xl-0.px-xl-0(lg="12" xl="12")
          b-row.py-0.px-0.justify-content-lg-center
            b-col.numero-tarjeta.px-xl-1(cols="12" lg="10")
              .input-field
                b-form-input#creditCardNumber(ref="creditCard" type='tel' aria-label="Número de tarjeta" placeholder="Número de Tarjeta" @blur.native="validateCreditCard, $v.payment.card_number.$touch(), validateBin()" @keyup.native="addingBlankSpaces($event)" @keypress.native="validateDigitsCreditCard($event)" :maxlength="maxLengthCredit" :state="$v.payment.card_number.$dirty ? !$v.payment.card_number.$error : null" aria-describedby="numberDocumentFeedback" v-model="payment.card_number")
                img#creditCardNumberType(v-if="creditCardImage!==''" :src="creditCardImage" alt="image-card" style="width:40px;")
                b-form-invalid-feedback#nameFeedback(v-if="!$v.payment.card_number.required && $v.payment.card_number.$error")
                  | Este campo es requerido
                b-form-invalid-feedback#nameFeedback(v-if="!$v.payment.card_number.mustBeCreditCard")
                  | Debe ser una tarjeta válida
            div.w-100
            b-col.mes-anio.pl-xl-1.pt-0.pr-0(cols="6" lg="5")
              .card-custom__date(:class="[blurInput ? 'active-input-img' : '']")
                .form-group-custom
                  #box-mes.input-group
                    svg#Capa_1(version='1.1', xmlns='http://www.w3.org/2000/svg', xmlns:xlink='http://www.w3.org/1999/xlink', x='0px', y='0px', viewBox='0 0 17 16', style='enable-background:new 0 0 17 16;', xml:space='preserve')
                      path#Trazado_3949(style='fill: #B2B4C7', d='M15.4,2.9H13V1.9c0-0.3-0.3-0.6-0.6-0.7c-0.3,0-0.6,0.3-0.7,0.6c0,0,0,0,0,0.1v1.1H6.3V1.9\
                      c0-0.3-0.3-0.6-0.6-0.7c-0.3,0-0.6,0.3-0.7,0.6c0,0,0,0,0,0.1v1.1H2.5C2,2.9,1.7,3.3,1.7,3.7V13c0,0.4,0.4,0.8,0.8,0.8h12.9\
                      c0.4,0,0.8-0.4,0.8-0.8V3.7C16.2,3.3,15.8,2.9,15.4,2.9z M5.1,3.9v0.5c0,0.3,0.3,0.6,0.6,0.7c0.3,0,0.6-0.3,0.7-0.6c0,0,0,0,0-0.1\
                      V3.9h5.4v0.5c0,0.3,0.3,0.6,0.6,0.7c0.3,0,0.6-0.3,0.7-0.6c0,0,0,0,0-0.1V3.9h2.2v2.6H2.7V3.9H5.1z M2.7,12.8V7.5h12.4v5.2H2.7z')
                      path#Trazado_3950(style='fill: #B2B4C7' d='M7.2,9.4H5c-0.3,0-0.6,0.2-0.6,0.6c0,0.3,0.2,0.6,0.6,0.6c0,0,0,0,0.1,0h2.2\
                      c0.3,0,0.6-0.2,0.6-0.6C7.9,9.7,7.6,9.5,7.2,9.4C7.3,9.4,7.3,9.4,7.2,9.4z')
                      path#Trazado_3951(style='fill: #B2B4C7' d='M12.8,9.4h-2.2C10.3,9.4,10,9.7,10,10c0,0.3,0.2,0.6,0.6,0.6c0,0,0,0,0.1,0h2.2\
                      c0.3,0,0.6-0.2,0.6-0.6C13.4,9.7,13.2,9.5,12.8,9.4C12.9,9.4,12.8,9.4,12.8,9.4z')
                    b-form-input#creditCardMonth.form-control(ref="month" @click="blurInput = true" @keydown.native="setMonth" @keyup.native="setMonth" @keypress.native="setMonth" @blur="validateMonthYear($event, 'month'), !$v.payment.expiration_month.$touch(), blurInput= false" placeholder="MM" autocomplete="off" maxlength='2' v-model='payment.expiration_month' type='tel' name='name' :state="$v.payment.expiration_month.$dirty ? !$v.payment.expiration_month.$error : null" aria-describedby="monthFeedback")
                    b-form-invalid-feedback#monthFeedback(v-if="!$v.payment.expiration_month.isValidMonth")
                      | Mes inválido
                .form-group-custom.text-right-custom
                  #box-anio.input-group
                    b-form-input.form-control#creditCardYear(ref="year" @click="blurInput = true" @keydown.native="setYear" @keyup.native="setYear" @keypress.native="setYear" @blur="validateMonthYear($event, 'year'), blurInput = false" placeholder='AA' autocomplete="off" maxlength='2' v-model='expirationYear' type='tel' name='name' :state="$v.expirationYear.$dirty ? !$v.expirationYear.$error : null" aria-describedby="yearFeedback")
                    b-form-invalid-feedback#yearFeedback(v-if="!$v.expirationYear.isValidYear")
                      | Año inválido
            b-col.cvv.pr-xl-1.pl-0.pt-0(cols="6" lg="5")
              .input-field
                b-form-input#cardCvv(type='tel' aria-label="código valor de verificación" ref="cvv" placeholder='CVV' autocomplete="off" @blur="$v.payment.cvv.$touch" @keypress.native="validarCvv" :state="$v.payment.cvv.$dirty ? !$v.payment.cvv.$error : null" :maxlength="maxLengthCvv" aria-describedby="numberDocumentFeedback" v-model="payment.cvv")
                b-form-invalid-feedback#numberFeedback(v-if="!$v.payment.cvv.required && $v.payment.cvv.$error")
                  | Este campo es requerido
                div#tool-cvv
                  b-tooltip(target="cardCvv" placement="top" triggers="focus" container="tool-cvv")
                    img(:src="baseUrlImage" alt="image-card-cvv")
    b-modal#without-visa(static title="Tarjetas permitidas" size="md" centered hide-footer hide-header no-close-on-esc no-close-on-backdrop title-tag="h4" header-class="omnes-semibold" header-text-variant="secondary")
      b-container
        b-row(align-center)
          img(@click='hideModal()' src="@/static/media/icons/cerrar.svg" alt='icon close' style="cursor: pointer;")
        b-row
          b-col
            h3 Por el momento solo podemos <hr> Aceptar las tarjetas Mastercards, American Express y Diners
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import Swal from 'sweetalert2'
import moment from 'moment'
import * as _ from 'lodash'

export default {
  props: ['payment'],
  data () {
    return {
      tracking: {
        channel: this.$store.state.common.channel,
        trackingId : this.$store.state.common.trackingId,
        screen: 'pago',
        document: this.$store.state.common.dniCliente,
        name: this.$store.state.common.saveClient.nombre + ' ' + this.$store.state.common.saveClient.apellidoPaterno + ' ' + this.$store.state.common.saveClient.apellidoMaterno,
        dob: this.$store.state.common.saveClient.fechaNacimiento,
        email: this.$store.state.common.saveClient.email,
        phone: this.$store.state.common.saveClient.numeroTelefono,
        data: this.$store.state.common.cotizacion
      },
      blurInput: false,
      costo: '',
      descripcion: '',
      baseUrlImage: require('@/static/media/common/pago/tarjetas/cvv_img.png'),
      creditCardImage: '',
      expirationYear: '',
      maxLengthCredit: '',
      maxLengthCvv: '',
      booleanPay: true,
      last: 99,
      maxYear: (+(moment().format('YYYY')) + 6).toString(),
      minYear: (+(moment().format('YYYY'))).toString(),
      window: {
        width: 0
      }
    }
  },
  validations: {
    expirationYear: {
      required,
      isValidYear(value) {
          // standalone validator ideally should not assume a field is required
          if (value === '') return true

          let anioInt = 0
          let flag = true;
          // let array =[]

          if (value !== null){

            // array = value.split(" / ")
            // console.log(array)
            // let anio = array[1]
            let anio = value
            anioInt =  parseInt(anio);

            if (anio !== null && anio !== undefined){

              if (anio.length === 2) {

                if ( 20 <= anioInt && anioInt <= parseInt(this.maxYear.slice(2,4)) && anioInt >= parseInt(this.minYear.slice(2,4))){
                  flag = true;
                } else {
                  flag = false;
                }

              } else if(anio.length === 4){

                if ( 2020 <= anioInt && anioInt <= parseInt(this.maxYear) && anioInt >= parseInt(this.minYear)){
                  flag = true;
                } else {
                  flag = false;
                }

              } else {
                flag = false;
              }

            } else {
              flag = false;
            }

          }
          return flag;

        }
    },
    payment: {
      card_number: {
        required,
        mustBeCreditCard: cardNumber => {
          let valid = require('card-validator')
          let numberValidation = valid.number(cardNumber.replace(/ /g, ''))
          if (numberValidation.isPotentiallyValid && numberValidation.isValid) {
            return true
          } else {
            return false
          }
        }
      },
      cvv: {
        required
      },
      expiration_year: {
        required
      },
      expiration_month: {
        required,
        isValidMonth (value) {
          if (value === '') return true
          // let array =[]
          let flag = true;
          if (value !== null){

            // array = value.split(" / ")
            // console.log(array)
            // let mes = array[0]
            let mes = value

            if ("1" === mes || "01" === mes){
              flag = true;
            } else if ("2" === mes || "02" === mes) {
              flag = true;
            } else if ("3" === mes || "03" === mes) {
              flag = true;
            } else if ("4" === mes || "04" === mes) {
              flag = true;
            } else if ("5" === mes || "05" === mes) {
              flag = true;
            } else if ("6" === mes || "06" === mes) {
              flag = true;
            } else if ("7" === mes || "07" === mes) {
              flag = true;
            } else if ("8" === mes || "08" === mes) {
              flag = true;
            } else if ("9" === mes || "09" === mes) {
              flag = true;
            } else if ("10" === mes) {
              flag = true;
            } else if ("11" === mes) {
              flag = true;
            } else if ("12" === mes) {
              flag = true;
            } else {
              flag = false;
            }

          }

          return flag;

        }
      }

    }
  },
  created () {
    window.addEventListener('resize', this.handleResize, { passive: true })
    this.handleResize()
  },
  mounted () {
    // this.$refs['creditCard'].focus()
    this.$nuxt.$emit('hide-loader')
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth
    },
    hideModal () {
      this.$nuxt.$emit('bv::hide::modal', 'without-visa')
    },
    validarCvv (e) {
      if (e.which === 13) {
        this.$nuxt.$emit('bv::hide::tooltip', 'cardCvv')
      }
    },
    validateBin () {
      let i = 0
      if ((this.$store.state.common.channel === 'IBK') && ((this.payment.card_number).length >= 4 )) {
        let jsonBins = this.$store.state.common.ibkBins
        jsonBins.filter((x,y) => {
          let valor = this.payment.card_number.replace(/\W/gi, '')
          if (x.key === valor.substring(0,6) || x.key === valor.substring(0,4)) {
            i = i + 1
          }
        })
        if (!i) {
          Swal.fire(
            'Oops...!',
            'Por favor, ingresar una tarjeta crédito o débito INTERBANK',
            'error'
          )
        }
      }
    },
    validateCreditCard () {
      let valid = require('card-validator')
      let numberValidation = valid.number(this.payment.card_number.replace(/ /g, ''))
      if (numberValidation.isPotentiallyValid && numberValidation.isValid) {
        if (numberValidation.card.niceType === 'American Express') {
          this.baseUrlImage = require('@/static/media/common/pago/tarjetas/cvv_img_amex.png')
        } else {
          this.baseUrlImage = require('@/static/media/common/pago/tarjetas/cvv_img.png')
        }
      } else {
        this.baseUrlImage = require('@/static/media/common/pago/tarjetas/cvv_img.png')
      }
      this.tracking.errorType = ''
      this.tracking.errorData = ''
      this.tracking.data.tipoTarjeta = ''
      this.tracking.data.claseTarjeta = numberValidation.card.type
      this.$store.commit('common/setCardClass', numberValidation.card.type)
      this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
        // console.log('Tracking pago', resTracking)
      })
    },
    setExpirationDate (evt) {
      // console.log('setExpirationDate')
      let valExpiration = evt.target.value
      if (valExpiration.length === 7) {
        let arrayExpiry = valExpiration.split(' / ')
        if (arrayExpiry.length !== 2) {
          this.payment.expiration_date = ''
          this.$swal({
            title: 'Oops...',
            text: 'La fecha de vencimiento debe ser:  MM / AA',
            type: 'info',
            showCancelButton: false,
            confirmButtonColor: '#2177CC',
            confirmButtonText: 'OK'
          })
          this.tracking.errorType = 'FRONTEND'
          this.tracking.errorData = 'La fecha de vencimiento debe ser:  MM / AA'
          this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
            // console.log('Tracking pago', resTracking)
          })
        } else {
          this.payment.expiration_month = arrayExpiry[0]
          this.payment.expiration_year = '20' + (arrayExpiry[1])
        }
      } else if (valExpiration.length === 0) {

      } else {
        this.payment.expiration_month = ''
        this.payment.expiration_year = ''
        this.payment.expiration_date = ''
        this.$swal({
          title: 'Oops...',
          text: 'La fecha de vencimiento debe ser: MM / AA',
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#2177CC',
          confirmButtonText: 'OK'
        })
        this.tracking.errorType = 'FRONTEND'
        this.tracking.errorData = 'La fecha de vencimiento debe ser: MM / AA'
        this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
          // console.log('Tracking pago', resTracking)
        })
      }
    },
    setMonth (evt) {
      let valExpiration = evt.target.value
      let charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46 && (charCode < 96 || charCode > 105)) {
        evt.preventDefault()
      } else {
        if (valExpiration.length === 1) {
          if (valExpiration !== '1' && valExpiration !== '0' && evt.keyCode !== 8) {
            this.payment.expiration_month = '0' + valExpiration
            // this.$refs.year.focus()
          }
        } else if (valExpiration.length === 2 && evt.keyCode !== 8) {
          this.$refs.year.focus()
        }
      }
    },
    setYear (evt) {
      let valExpiration = evt.target.value
      let charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46 && (charCode < 96 || charCode > 105)) {
        evt.preventDefault()
      } else {
         if (valExpiration.length === 2 && charCode !== 8) {
          this.$refs.cvv.focus()
        }
      }
    },
    validateMonthYear (event, text) {
      // console.log('validateMonthYear')
      if ((event.target.value).length === 1) {
        if (text === 'month') {
          this.$swal({
            title: 'Oops...',
            text: 'El mes de vencimiento debe ser:  MM',
            type: 'info',
            showCancelButton: false,
            confirmButtonColor: '#2177CC',
            confirmButtonText: 'OK'
          })
          this.tracking.errorType = 'FRONTEND'
          this.tracking.errorData = 'El mes de vencimiento debe ser:  MM'
          this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
            // console.log('Tracking pago', resTracking)
          })
        } else {
          this.$swal({
            title: 'Oops...',
            text: 'El año de vencimiento debe ser:  AA',
            type: 'info',
            showCancelButton: false,
            confirmButtonColor: '#2177CC',
            confirmButtonText: 'OK'
          })
          this.tracking.errorType = 'FRONTEND'
          this.tracking.errorData = 'El año de vencimiento debe ser:  AA'
          this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
            // console.log('Tracking pago', resTracking)
          })
        }
      } else {
        if (text === 'year') {
          this.payment.expiration_year = '20' + _.cloneDeep(this.expirationYear)
          this.$v.expirationYear.$touch()
        }
      }
    },
    validateDigitsCreditCard (ev) {
      let valid = require('card-validator')
      let cardNumber = ev.target.value
      let numberValidation = valid.number(cardNumber.replace(/ /g, ''))
      // For prevent the user put more chars in the input when credit card number is valid.
      if (numberValidation.isPotentiallyValid && numberValidation.isValid) {
        this.last = numberValidation.card.lengths[0]
        if (+cardNumber.replace(/ /g, '').length >= this.last) {
          ev.preventDefault()
        }
      } else {
        if (+cardNumber.replace(/ /g, '').length > this.last) {
          ev.preventDefault()
        }
      }
    },
    addingBlankSpaces (ev) {
      let valid = require('card-validator')
      let cardNumber = ev.target.value
      let numberValidation = valid.number(cardNumber.replace(/ /g, ''))
      // For image of type credit card.
      if (numberValidation.card !== null) {
        this.maxLengthCredit = numberValidation.card.type !== 'american-express' ? 19 : 18
        this.maxLengthCvv = numberValidation.card.type !== 'american-express' ? 3 : 4
        let cardType = numberValidation.card.type !== 'american-express' ? numberValidation.card.type : 'amex'
        this.creditCardImage = require('@/static/media/common/pago/tarjetas/' + cardType + '.png')
      } else {
        this.creditCardImage = ''
      }
      // Avoid bug with backspace
      if (ev.keyCode !== 8) {
        this.payment.card_number = this.payment.card_number.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')
      }
    }
  },
  mixins: [
    validationMixin
  ],
  destroyed () {
    window.removeEventListener('resize', this.handleResize, { passive: true })
  },
  components: {
    // TermsAndConditions,
    // ProtectionData
  }
}
</script>
