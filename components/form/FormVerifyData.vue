<template lang="pug">
  div.mt-4
    b-row.justify-center
      b-col(sm="12")
        h3.omnes-medium.text-center.d-lg-none.mb-3.text-primary(v-if="dataVacia && (client.nombre || client.apellidoPaterno || client.apellidoMaterno || client.fechaNacimiento || client.sexo || client.numeroTelefono || client.email)") Verifica tus datos
        h3.omnes-medium.text-center.d-lg-none.mb-3.text-primary(v-if="dataVacia && (!client.nombre && !client.apellidoPaterno && !client.apellidoMaterno && !client.fechaNacimiento && !client.sexo && !client.numeroTelefono && !client.email)") Completa tus datos personales
        h3.omnes-medium.text-center.d-lg-none.mb-3.text-primary(v-if="!dataVacia && (client.nombre || client.apellidoPaterno || client.apellidoMaterno || client.fechaNacimiento || client.sexo || client.numeroTelefono || client.email)") Completa tus datos, <br> nos contactaremos contigo <br>por este medio
    b-row(v-if="dataVacia" :class="[!dataVacia ? 'mt-4' : '']")
      b-col.mt-1.mb-4(sm="12")
        h4.omnes-semibold Mis datos personales
      // Name
      b-col(sm="12")
        b-form-input#nombres.text-left(@change="" @blur="$v.client.nombre.$touch()" @keydown.native="onlyLetter($event)" @keyup.native="onlyLetter($event)" @keypress.native="onlyLetter($event)" autocomplete="off" v-model='client.nombre' type='text' placeholder='Nombres' :state="$v.client.nombre.$dirty ? !$v.client.nombre.$error : null" aria-describedby="nombresFeedback")
        b-form-invalid-feedback#nombresFeedback(v-if="!$v.client.nombre.required && $v.client.nombre.$error")
          | Este campo es requerido
      // Last First Name
      b-col.pt-4.pr-1(cols="6")
        b-form-input#apellidoPaterno.text-left(@change="" @blur="$v.client.apellidoPaterno.$touch()" @keydown.native="onlyLetter($event)" @keyup.native="onlyLetter($event)" @keypress.native="onlyLetter($event)" autocomplete="off" v-model='client.apellidoPaterno' type='text' placeholder='Apellido paterno' :state="$v.client.apellidoPaterno.$dirty ? !$v.client.apellidoPaterno.$error : null" aria-describedby="apellidoPaternoFeedback")
        b-form-invalid-feedback#apellidoPaternoFeedback(v-if="!$v.client.apellidoPaterno.required && $v.client.apellidoPaterno.$error")
          | Este campo es requerido
      // Last Second Name
      b-col.pt-4.pl-1(cols="6")
        b-form-input#apellidoMaterno.text-left(@change="" @blur="$v.client.apellidoMaterno.$touch()" @keydown.native="onlyLetter($event)" @keyup.native="onlyLetter($event)" @keypress.native="onlyLetter($event)" autocomplete="off" v-model='client.apellidoMaterno' type='text' placeholder='Apellido materno' :state="$v.client.apellidoMaterno.$dirty ? !$v.client.apellidoMaterno.$error : null" aria-describedby="apellidoMaternoFeedback")
        b-form-invalid-feedback#apellidoMaternoFeedback(v-if="!$v.client.apellidoMaterno.required && $v.client.apellidoMaterno.$error")
          | Este campo es requerido
      // Birthday
      b-col.pt-4.pr-1(cols="6")
        b-form-input#fechaNacimiento.text-left(@blur="$v.client.fechaNacimiento.$touch(), textDate = 'Fecha de nacimiento'" autocomplete="off" maxLength="10" v-model='client.fechaNacimiento' type='tel' :placeholder='textDate' @click="textDate = 'dd/mm/aaaa'" @keydown.native="addingBlankSpacesAndSlash" @keyup.native="addingBlankSpacesAndSlash" @keypress.native="addingBlankSpacesAndSlash" @change="validateAge($event)" :state="$v.client.fechaNacimiento.$dirty ? !$v.client.fechaNacimiento.$error : null" aria-describedby="fechaNacimientoFeedback")
        b-form-invalid-feedback#fechaNacimientoFeedback(v-if="(!$v.client.fechaNacimiento.required || client.fechaNacimiento.replace(/\\s/g, '').length !== 10)  && $v.client.fechaNacimiento.$error")
          | Este campo es requerido
        b-form-invalid-feedback#fechaNacimientoFeedback(v-if="$v.client.fechaNacimiento.required && edad < mayorEdad")
          | Edad mínima {{ mayorEdad }} años
        b-form-invalid-feedback#fechaNacimientoFeedback(v-if="$v.client.fechaNacimiento.required && edad > maxEdad")
          | Edad máxima {{ maxEdad }} años
      // Gemale
      b-col.pt-4.pl-1(cols="6")
        b-form-select#sexo.text-left(@blur="$v.client.sexo.$touch()" @change="" variant='success' :options="options" v-model="client.sexo" aria-describedby="sexoFeedback" :class="[!client.sexo ? 'text-info' : '']")
        b-form-invalid-feedback#sexoFeedback(v-if="!client.sexo && $v.client.sexo.$error")
          | Este campo es requerido
      b-col.mt-3(sm="12")
        h4.omnes-semibold Mis datos de contacto
      // Phone
      b-col.pt-4(cols="12")
        b-form-input#numeroTelefono.text-left(v-if="!$store.state.common.hashPhone" @blur="$v.client.numeroTelefono.$touch()" autocomplete="off" maxLength="9" v-model='client.numeroTelefono' type='tel' placeholder='Celular' @keydown.native="onlyNumber($event)" @keyup.native="onlyNumber($event)" @keypress.native="onlyNumber($event)" :state="$v.client.numeroTelefono.$dirty ? !$v.client.numeroTelefono.$error : null" aria-describedby="numeroTelefonoFeedback")
        b-form-input#numeroTelefono.text-left(v-else @click="cleanPhoneEmail('phoneClient', 'common/setHashPhone')" autocomplete="off" maxLength="9" v-model='clientPhone' type='tel' placeholder='Celular' :state="$v.client.numeroTelefono.$dirty ? !$v.client.numeroTelefono.$error : null" aria-describedby="numeroTelefonoFeedback")
        b-form-invalid-feedback#numeroTelefonoFeedback(v-if="$v.client.numeroTelefono.$error && !$v.client.numeroTelefono.numeric && $v.client.numeroTelefono.$error")
          | Este campo debe ser un número celular válido
      // Email
      b-col.pt-4.email(cols="12")
        b-form-input#email.text-left(v-if="!$store.state.common.hashEmail" @blur="$v.client.email.$touch()" autocomplete="off" v-model='client.email' type='text' placeholder='Escriba su correo' :state="$v.client.email.$dirty ? !$v.client.email.$error : null" aria-describedby="emailFeedback")
        b-form-input#email.text-left(v-else @click="cleanPhoneEmail('emailClient', 'common/setHashEmail')" autocomplete="off" v-model='clientEmail' type='text' placeholder='Escriba su correo' :state="$v.client.email.$dirty ? !$v.client.email.$error : null" aria-describedby="emailFeedback")
        b-form-invalid-feedback#emailFeedback(v-if="!$v.client.email.required && $v.client.email.$error")
          | Este campo es requerido
        b-form-invalid-feedback#emailFeedback(v-if="!$v.client.email.email")
          | Ingresa un correo válido
      b-col.text-center.px-0.mt-2(cols="12")
        span.d-inline(style="font-size: 12px;") Al continuar acepto las&nbsp;
          span.d-inline.omnes-medium(style="cursor:pointer;text-decoration: underline;font-size: 12px;" v-b-modal.show-conditions) Condiciones de Uso y Política de Privacidad  
      b-col.text-center.mt-4.mb-4(cols="12")
        //- b-button#btn-guardar.omnes-medium(variant="dark" @click="validarFormClient" :class="[(!this.$v.client.$error && this.$v.client.numeroTelefono.numeric && this.client.sexo && this.client.email && !(this.edad < this.mayorEdad) && !(this.edad > this.maxEdad)) ? '' : 'disabled']") Guardar1
        b-button#btn-guardar.omnes-medium(variant="dark" @click="validarFormClient") Continuar
    b-row(v-else)
      b-col(cols="12")
        b-row.justify-content-center
          // Last First Name
          b-col.pt-4.pr-1(cols="6"  v-if="!client.apellidoPaterno")
            b-form-input#apellidoPaterno.text-left(@change="" @blur="$v.mockClient.apellidoPaterno.$touch()" @keydown.native="onlyLetter($event)" @keyup.native="onlyLetter($event)" @keypress.native="onlyLetter($event)" autocomplete="off" v-model='mockClient.apellidoPaterno' type='text' placeholder='Apellido paterno' :state="$v.mockClient.apellidoPaterno.$dirty ? !$v.mockClient.apellidoPaterno.$error : null" aria-describedby="apellidoPaternoFeedback")
            b-form-invalid-feedback#apellidoPaternoFeedback(v-if="$v.mockClient.apellidoPaterno.$error && !$v.mockClient.apellidoPaterno.required")
              | Este campo es requerido
          // Last Second Name
          b-col.pt-4.pl-1(cols="6" v-if="!client.apellidoMaterno")
            b-form-input#apellidoMaterno.text-left(@change="" @blur="$v.mockClient.apellidoMaterno.$touch()" @keydown.native="onlyLetter($event)" @keyup.native="onlyLetter($event)" @keypress.native="onlyLetter($event)" autocomplete="off" v-model='mockClient.apellidoMaterno' type='text' placeholder='Apellido materno' :state="$v.mockClient.apellidoMaterno.$dirty ? !$v.mockClient.apellidoMaterno.$error : null" aria-describedby="apellidoMaternoFeedback")
            b-form-invalid-feedback#apellidoMaternoFeedback(v-if="$v.mockClient.apellidoMaterno.$error && !$v.mockClient.apellidoMaterno.required")
              | Este campo es requerido
          // Birthday
          b-col.pt-4(cols="12" v-if="!client.fechaNacimiento || (client.fechaNacimiento).length !== 10")
            b-form-input#fechaNacimiento.text-left(autocomplete="off" maxLength="10" v-model="mockClient.fechaNacimiento" type='tel' :placeholder='textDate' @click="textDate = 'dd/mm/aaaa'" @blur="textDate = 'Fecha de nacimiento', $v.mockClient.fechaNacimiento.$touch()" @keydown.native="addingBlankSpacesAndSlashMock" @keyup.native="addingBlankSpacesAndSlashMock" @keypress.native="addingBlankSpacesAndSlashMock" @change="validateAge($event), validarFormClient" :state="$v.mockClient.fechaNacimiento.$dirty ? !$v.mockClient.fechaNacimiento.$error : null" aria-describedby="fechaNacimientoFeedback")
            b-form-invalid-feedback#fechaNacimientoFeedback(v-if="$v.mockClient.fechaNacimiento.$error")
              | Este campo es requerido
            b-form-invalid-feedback#fechaNacimientoFeedback(v-else-if="$v.mockClient.fechaNacimiento.$dirty && mockClient.fechaNacimiento.replace(/\\s/g, '').length !== 10")
              | Coloca una fecha válida
            b-form-invalid-feedback#fechaNacimientoFeedback(v-if="$v.mockClient.fechaNacimiento.required && edad < mayorEdad")
              | Edad mínima {{ mayorEdad }} años
            b-form-invalid-feedback#fechaNacimientoFeedback(v-if="$v.mockClient.fechaNacimiento.required && edad > maxEdad")
              | Edad máxima {{ maxEdad }} años
          // Phone
          b-col.pt-4(v-if="!client.numeroTelefono")
            // b-form-group(label='Mi celular es', label-for='numeroTelefono')
            b-form-input#numeroTelefono.text-left(v-if="!$store.state.common.hashPhone" @blur="$v.mockClient.numeroTelefono.$touch()" autocomplete="off" maxLength="9" v-model='mockClient.numeroTelefono' type='tel' placeholder='Celular' @keydown.native="onlyNumber($event)" @keyup.native="onlyNumber($event)" @keypress.native="onlyNumber($event)" :state="$v.mockClient.numeroTelefono.$dirty ? !$v.mockClient.numeroTelefono.$error : null" aria-describedby="numeroTelefonoFeedback")
            b-form-input#numeroTelefono.text-left(v-else @click="cleanPhoneEmail('phoneMock', 'common/setHashPhone')" autocomplete="off" maxLength="9" v-model='mockClientPhone' type='tel' placeholder='Celular' @keydown.native="onlyNumber($event)" @keyup.native="onlyNumber($event)" @keypress.native="onlyNumber($event)" :state="$v.mockClient.numeroTelefono.$dirty ? !$v.mockClient.numeroTelefono.$error : null" aria-describedby="numeroTelefonoFeedback")
            b-form-invalid-feedback#numeroTelefonoFeedback(v-if="$v.mockClient.numeroTelefono.$error && !$v.mockClient.numeroTelefono.numericMock")
              | Este campo debe ser un número celular válido
          // Gemale
          b-col.pt-4(v-if="!client.sexo")
            b-form-select#sexo.text-left(@change="" variant='success' :options="options" v-model="mockClient.sexo" aria-describedby="sexoFeedback" :class="[!mockClient.sexo ? 'text-info' : '']")
            b-form-invalid-feedback#sexoFeedback(v-if="$v.mockClient.sexo.$error")
              | Este campo es requerido
          // Email
          b-col.pt-4.email(cols="12" v-if="!client.email")
            // b-form-group(label='Mi correo es', label-for='email')
            b-form-input#email.text-left(v-if="!$store.state.common.hashEmail"  @blur="$v.mockClient.email.$touch()" autocomplete="off" v-model='mockClient.email' type='text' placeholder='Escriba su correo' :state="$v.mockClient.email.$dirty ? !$v.mockClient.email.$error : null" aria-describedby="emailFeedback")
            b-form-input#email.text-left(v-else @click="cleanPhoneEmail('emailMock', 'common/setHashEmail')" autocomplete="off" v-model='mockClientEmail' type='text' placeholder='Escriba su correo' :state="$v.mockClient.email.$dirty ? !$v.mockClient.email.$error : null" aria-describedby="emailFeedback")
            b-form-invalid-feedback#emailFeedback(v-if="$v.mockClient.email.$error && !$v.mockClient.email.email")
              | Ingresa un correo válido
          b-col.text-center.px-0.mt-2(cols="12")
            span.d-inline(style="font-size: 12px;") Al continuar acepto las&nbsp;
              span.d-inline.omnes-medium(style="cursor:pointer;text-decoration: underline;font-size: 12px;" v-b-modal.show-conditions) Condiciones de Uso y Política de Privacidad 
      b-col.text-center.mt-4.mb-4(cols="12")
        b-button#btn-guardar.omnes-medium(variant="dark" @click="saveDataMockClient" :class="[(!this.$v.mockClient.$error && this.$v.mockClient.numeroTelefono.numericMock && this.mockClient.sexo && this.mockClient.email && !(this.edad < this.mayorEdad) && !(this.edad > this.maxEdad)) ? '' : 'disabled']") Continuar
    b-modal#show-conditions(static size="lg" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      condiciones-uso
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import moment from 'moment'
import * as _ from 'lodash'

import CondicionesUso from '@/components/modals/CondicionesUsoPoliticaPrivacidad'
import Swal from 'sweetalert2'

export default {
  props: ['tracking', 'client', 'dataVacia', 'remarketing'],
  data () {
    return {
      textDate: 'Fecha de nacimiento',
      mockClient: {},
      titularLast: {},
      booleanClient: true,
      edad: (moment().diff(((this.client.fechaNacimiento).replace(/\s/g, '').split('/').reverse().join('-')), 'years')),
      mayorEdad: 18,
      maxEdad: 60,
      textDropdown: '   ',
      options: [
        { value: null, text: 'Género' },
        {
          value: 'M',
          text: 'Masculino'
        },
        {
          value: 'F',
          text: 'Femenino'
        }
      ],
      interval: null,
      clientPhone: this.hashText(this.client.numeroTelefono, 0.35),
      clientEmail: this.hashText(this.client.email, 0.4),
      mockClientPhone: '',
      mockClientEmail: ''
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    client: {
      nombre: {
        required
      },
      apellidoPaterno: {
        required
      },
      apellidoMaterno: {
        required
      },
      fechaNacimiento: {
        required
      },
      numeroTelefono: {
        // required,
        numeric: phone => {
          let pattern = /^[9]\d{8}/
          return pattern.test(phone)
        }
        // minLength: minLength(9)
      },
      sexo: {
        required
      },
      email: {
        required,
        email
      }
    },
    mockClient: {
      nombre: {
        required
      },
      apellidoPaterno: {
        required
      },
      apellidoMaterno: {
        required
      },
      fechaNacimiento: {
        required
      },
      numeroTelefono: {
        // required,
        numericMock: phoneMock => {
          let pattern = /^[9]\d{8}/
          return pattern.test(phoneMock)
        }
        // minLength: minLength(9)
      },
      email: {
        required,
        email
      },
      sexo: {
        required
      }
    }
  },
  created () {
  },
  mounted  () {
    this.$nuxt.$on('hide-modal-conditions-use-pp', () => {
      this.$nuxt.$emit('bv::hide::modal', 'show-conditions')
    })
    clearInterval(this.interval)
    this.interval = setInterval(this.startSessionSave, 5000)
    if (!this.dataVacia) {
      this.mockClient = _.cloneDeep(this.client)
      this.mockClientPhone = this.hashText(this.mockClient.numeroTelefono, 0.35)
      this.mockClientEmail = this.hashText(this.mockClient.email, 0.4)
    } else {
      this.client = _.cloneDeep(this.$store.state.common.saveClient)
      // this.clientPhone = this.hashText(this.client.numeroTelefono, 0.7)
      // this.clientEmail = this.hashText(this.client.email, 0.7)
    }
  },
  methods: {
    hashText(text,percentToHash) {
      const emailIdentifier='@'
      let textHashed=""
      let isEmail=text.indexOf(emailIdentifier)>=0;
      let textTohash=isEmail?text.split(emailIdentifier)[0]:text;
      let indexOffset=textTohash.length-Math.round(textTohash.length*percentToHash)
      for(let i=0;i<textTohash.length;i++){
        if  (i>=indexOffset){
            textHashed+="*"
        } else{
          textHashed+=textTohash[i]
        }
      }


      if (isEmail) {
        return textHashed+text.substring(text.indexOf(emailIdentifier))
      }


      return textHashed
    },
    cleanPhoneEmail (value, setValue) {
      this.$store.commit(setValue, false)
      if (value === 'phoneClient') {
        this.client.numeroTelefono = ''
      } else if (value === 'phoneMock') {
        this.mockClient.numeroTelefono = ''
      } else if (value === 'emailClient') {
        this.client.email = ''
      } else if (value === 'emailMock') {
        this.mockClient.numeroTelefono = ''
      }
    },
    startSessionSave () {
      let bool = _.isEqual(this.titularLast, this.mockClient)
      if (!bool) {
        let reEmail =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (reEmail.test(String(this.mockClient.email).toLowerCase())) {
          this.titularLast = _.cloneDeep(this.mockClient)
          this.remarketing.identificador = this.$store.state.common.dniCliente
          this.remarketing.detalle.codigoVenta = this.$store.state.common.trackingId
          this.remarketing.detalle.correo = this.titularLast.email
          this.remarketing.detalle.celular = this.titularLast.numeroTelefono
          this.remarketing.detalle.datosTitular = this.titularLast
          this.remarketing.detalle.datosProducto.datosTitular = this.titularLast
          let firstName = (this.titularLast.nombre.split(" ").length === 1 ) ? this.titularLast.nombre : this.titularLast.nombre.split(" ")[0]
          this.$store.commit('common/setNombreCliente', firstName)
          this.remarketing.detalle.datosProducto.asunto1 = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO' || this.$store.state.common.channel === 'AHORRO_JUBILACION') ? (firstName).toUpperCase() + ', ¿Sabías que puedes ahorrar todo tu dinero y ganar hasta 100% adicional?'  : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? (firstName).toUpperCase() + ', ¿Sabías que puedes proteger a los que más amas desde S/23 al mes?' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? (firstName).toUpperCase() + ', ¿Sabías que puedes recuperar todo tu dinero y ganar hasta 100% más?' : (firstName).toUpperCase() + ', ¿Quién necesita un seguro de Vida con Devolución? Probablemente tú'
          this.remarketing.detalle.datosProducto.asunto2 = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? (firstName).toUpperCase() + ', ¿Buscando asegurar el futuro de tus pequeños? ¡Hoy es un buen momento para hacerlo!' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? (firstName).toUpperCase() + ', ¿Buscando ahorrar para tu futuro? ¡Hoy es un buen momento para hacerlo!' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? (firstName).toUpperCase() + ', ¿Buscando proteger a los que más amas por si un día no estás para ellos? Esto es para ti' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? (firstName).toUpperCase() + ', ¿Sabías que puedes rentabilizar tu dinero hasta en 100% adicional?' : (firstName).toUpperCase() + ', ¿Qué pasa si un día no estás? Déjalos protegidos desde hoy'
          this.remarketing.detalle.datosProducto.asunto3 = ''
          this.remarketing.detalle.datosCorreo.plantilla[1] = (this.$store.state.common.channel === 'IBK') ? 'interbank-verificacion-01.html' : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'verificacion_universitario-01-02.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'verificacion_jubilacion-01-02.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'verificacion_proteccion-01-02.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'verificacion_ahorroseguro-01.html' : 'verificacion-01.html'
          this.remarketing.detalle.datosCorreo.plantilla[2] = (this.$store.state.common.channel === 'IBK') ? 'interbank-verificacion-02.html' : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'verificacion_universitario-01-02.html' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'verificacion_jubilacion-01-02.html' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'verificacion_proteccion-01-02.html' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'verificacion_ahorroseguro-02.html' : 'verificacion-02.html'
          this.remarketing.detalle.datosCorreo.plantilla[3] = ""
          this.remarketing.detalle.datosCorreo.utm[3] = ""
          this.$store.dispatch('common/makeRemarketing', this.remarketing).then(rem => {
            this.$store.commit('common/setCodeRemarketing', rem.codigoRemarketing)
            this.remarketing.codigoRemarketing = rem.codigoRemarketing
          }, res => {
            this.tracking.errorType = 'Front-end'
            this.tracking.errorData = 'Envió de data'
            this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
            })
          })
        }
      }
    },
    saveDataClient () {
      if ((this.client.fechaNacimiento).length === 10 &&  (this.client.fechaNacimiento).split("/").length === 3) {
        if (!this.edad) {
          let fecha = (this.client.fechaNacimiento).split('/').reverse().join('-')
          this.edad = (moment().diff(fecha, 'years'))
        }
        let newClient = {
          numeroDocumento: this.client.numeroDocumento,
          nombre: this.client.nombre,
          apellidoPaterno: this.client.apellidoPaterno,
          apellidoMaterno: this.client.apellidoMaterno,
          fechaNacimiento: this.client.fechaNacimiento,
          sexo: this.client.sexo,
          numeroTelefono: this.client.numeroTelefono,
          email: this.client.email
        }
        let nombre1 = ""
        if(this.client.nombre != null && this.client.nombre != undefined){
          nombre1 = this.client.nombre.indexOf(' ')> -1 ? this.client.nombre.substr(0, this.client.nombre.indexOf(' ')) : this.client.nombre;
        }
        this.$amplitude.getInstance().setUserId(this.$store.state.common.dniCliente)
        this.$amplitude.getInstance().setUserProperties({
          Edad: this.edad,
          Genero: (this.client.sexo === 'F' || this.client.sexo == 'femenino') ? 'F' : 'M',
          Email: this.client.email,
          Telefono: this.client.numeroTelefono,
          Nombre: nombre1,
          Apellido: this.client.apellidoPaterno
        });
        this.$amplitude.getInstance()
        .logEvent(
          'Vida - Datos Verificados',
          {
            'Producto Consultado': 'VIDA',
            'Sub Producto Consultado': this.$store.state.common.channel,
            'Edad': this.edad,
            'Genero': (this.client.sexo === 'F' || this.client.sexo == 'femenino') ? 'F' : 'M',
            'Email': this.client.email,
            'DNI': this.$store.state.common.dniCliente,
            'Telefono': this.client.numeroTelefono,
            'Nombre' : nombre1,
            'Apellido' : this.client.apellidoPaterno,
            //'Nombre': this.client.nombre + ' ' + this.client.apellidoPaterno + ' ' + this.client.apellidoMaterno
          }
        )
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          'event': 'virtualPageView',
          'pageTitle': 'Verificacion | ' + process.env.channel[this.$store.state.common.channel].PAGE_TITLE,
          'pageUrl': process.env.channel[this.$store.state.common.channel].URL_BASE + 'paso/verificacion/'
        })
        window.scrollTo(0, 0)
        this.$store.commit('common/setSaveClient', newClient)
        this.$nuxt.$emit('show-loader', {
          text: 'Estamos procesando la información, solo tomará un momento'
        })
        this.$parent.dataVacia = false
        this.$parent.showQuote = true
        this.$parent.showPercent = false
        this.tracking.errorData = ''
        this.tracking.errorType = ''
        this.tracking.screen = 'datos_cliente'
        this.tracking.document = this.$store.state.common.dniCliente
        this.tracking.name = this.client.nombre + ' ' + this.client.apellidoPaterno + ' ' + this.client.apellidoMaterno
        this.tracking.dob = this.client.fechaNacimiento
        this.tracking.email = this.client.email
        this.tracking.phone = this.client.numeroTelefono
        this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
        })
        this.$store.commit('common/setVerifyDataClient', true)
        // Llamar a la API para generar los parametros
        this.$nuxt.$emit('generate-parametter-to-calculate', { saveClient: newClient })
      } else {
        this.tracking.errorType = 'FRONTEND'
        this.tracking.errorData = 'El atributo fecha de nacimiento debe tener una fecha valida con formato dd/mm/aaaa'
        this.tracking.screen = 'datos_cliente'
        this.tracking.document = this.$store.state.common.dniCliente
        this.tracking.name = this.client.nombre + ' ' + this.client.apellidoPaterno + ' ' + this.client.apellidoMaterno
        this.tracking.dob = this.client.fechaNacimiento
        this.tracking.email = this.client.email
        this.tracking.phone = this.client.numeroTelefono
        this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
        })
        Swal.fire(
          'Oops...!',
          'El atributo fecha de nacimiento debe tener una fecha valida con formato dd/mm/aaaa',
          'error'
        )
        this.$amplitude.getInstance().logEvent(
        'Error Encontrado',
          {
            'Producto Consultado': 'VIDA',
            'Sub Producto Consultado': this.$store.state.common.channel,
            'Etapa de Funnel': this.$route.path,
            'Nombre Error': this.tracking.errorData
          }
        )
      }
    },
    saveDataMockClient () {
      if ((this.mockClient.fechaNacimiento).length === 10 &&  (this.mockClient.fechaNacimiento).split("/").length === 3) {
        let fecha = (this.mockClient.fechaNacimiento).split('/').reverse().join('-')
        var userProperties = {
          Edad: (moment().diff(fecha, 'years')),
          Genero: (this.mockClient.sexo === 'F' || this.mockClient.sexo == 'femenino') ? 'F' : 'M',
          Email: this.mockClient.email,
          Telefono: this.mockClient.numeroTelefono,
          Nombres: this.mockClient.nombre,
          Apellidos: this.mockClient.apellidoPaterno + ' ' + this.mockClient.apellidoMaterno,
          "Número de Documento": this.mockClient.numeroDocumento
        };
        this.$amplitude.getInstance().setUserProperties(userProperties);
        let nombre1 = ""
        if(this.client.nombre != null && this.client.nombre != undefined){
          nombre1 = this.mockClient.nombre.indexOf(' ')> -1 ? this.mockClient.nombre.substr(0, this.mockClient.nombre.indexOf(' ')) : this.mockClient.nombre;
        }
        this.$amplitude.getInstance().setUserId(this.mockClient.numeroDocumento)
        this.$amplitude.getInstance()
        .logEvent(
          'Vida - Datos Verificados',
          {
            'Producto Consultado': 'VIDA',
            'Sub Producto Consultado': this.$store.state.common.channel,
            'Edad': (moment().diff(fecha, 'years')),
            'Genero': (this.mockClient.sexo === 'F' || this.mockClient.sexo == 'femenino') ? 'F' : 'M',
            'Email': this.mockClient.email,
            'DNI': this.mockClient.numeroDocumento,
            'Telefono': this.mockClient.numeroTelefono,
            'Nombre' : nombre1,
            'Apellido' : this.mockClient.apellidoPaterno
            //'Nombre': this.mockClient.nombre + ' ' + this.mockClient.apellidoPaterno + ' ' + this.mockClient.apellidoMaterno
          }
        )
        if (!this.edad) {
          let fecha = (this.mockClient.fechaNacimiento).split('/').reverse().join('-')
          this.edad = (moment().diff(fecha, 'years'))
        }
        let newClient2 = {
          numeroDocumento: this.mockClient.numeroDocumento,
          nombre: this.mockClient.nombre,
          apellidoPaterno: this.mockClient.apellidoPaterno,
          apellidoMaterno: this.mockClient.apellidoMaterno,
          fechaNacimiento: this.mockClient.fechaNacimiento,
          sexo: this.mockClient.sexo,
          numeroTelefono: this.mockClient.numeroTelefono,
          email: this.mockClient.email
        }
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          'event': 'virtualPageView',
          'pageTitle': 'Cotiza | ' + process.env.channel[this.$store.state.common.channel].PAGE_TITLE,
          'pageUrl': process.env.channel[this.$store.state.common.channel].URL_BASE + 'paso/cotiza/'
        })
        
        window.scrollTo(0, 0)
        this.$nuxt.$emit('update-mock-client')
        this.$nuxt.$emit('show-loader', {
          text: 'Estamos procesando la información, solo tomará un momento'
        })
        this.$parent.dataVacia = false
        this.$parent.showQuote = true
        this.$parent.showPercent = false
        this.tracking.errorData = ''
        this.tracking.errorType = ''
        this.tracking.screen = 'datos_cliente'
        this.tracking.document = this.$store.state.common.dniCliente
        this.tracking.name = this.mockClient.nombre + ' ' + this.mockClient.apellidoPaterno + ' ' + this.mockClient.apellidoMaterno
        this.tracking.dob = this.mockClient.fechaNacimiento
        this.tracking.email = this.mockClient.email
        this.tracking.phone = this.mockClient.numeroTelefono
        this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
        })
        // Llamar a la API para generar los parametros
        this.$nuxt.$emit('generate-parametter-to-calculate', { saveClient: newClient2 })
        this.client = _.cloneDeep(this.mockClient)
      } else {
        this.tracking.errorType = 'FRONTEND'
        this.tracking.errorData = 'El atributo fecha de nacimiento debe tener una fecha valida con formato dd/mm/aaaa'
        this.tracking.screen = 'datos_cliente'
        this.tracking.document = this.$store.state.common.dniCliente
        this.tracking.name = this.mockClient.nombre + ' ' + this.mockClient.apellidoPaterno + ' ' + this.mockClient.apellidoMaterno
        this.tracking.dob = this.mockClient.fechaNacimiento
        this.tracking.email = this.mockClient.email
        this.tracking.phone = this.mockClient.numeroTelefono
        this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
        })
        Swal.fire(
          'Oops...!',
          'El atributo fecha de nacimiento debe tener una fecha valida con formato dd/mm/aaaa',
          'error'
        )
        this.$amplitude.getInstance().logEvent(
        'Error Encontrado',
          {
            'Producto Consultado': 'VIDA',
            'Sub Producto Consultado': this.$store.state.common.channel,
            'Etapa de Funnel': this.$route.path,
            'Nombre Error': this.tracking.errorData
          }
        )
      }
    },
    validarFormClient () {
      this.$v.$touch(false)
      this.booleanClient = this.$v.client.$error
      if (!this.$v.client.$error && this.client.sexo && !(this.edad < this.mayorEdad) && !(this.edad > this.maxEdad)) {
        this.booleanClient = true // no existe error
        this.saveDataClient()
        // document.getElementById('btn-guardar').classList.remove('disabled')
      } else {
        this.booleanClient = false
      }
      // this.$v.$touch()(false)
    },
    onlyNumber (evt) {
      let charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 37 && charCode !== 38 && charCode !== 39 && charCode !== 40 && charCode !== 46 && (charCode < 96 || charCode > 105)) {
        evt.preventDefault()
      }
    },
    onlyLetter (evt) {
      let charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode >= 48 && charCode <= 57) || (charCode >= 186 && charCode <= 222)) {
        evt.preventDefault()
      }
    },
    validateAge (evt) {
      let edadActual = (evt).replace(/\s/g, '').split('/').reverse().join('-')
      this.edad = moment().diff(edadActual, 'years')
      // this.validarFormClient()
    },
    addingBlankSpacesAndSlash (evt) {
      let valExpiration = evt.target.value
      let charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 37 && charCode !== 38 && charCode !== 39 && charCode !== 40 && charCode !== 46 && (charCode < 96 || charCode > 105)) {
        evt.preventDefault()
      } else {
        if (valExpiration.length === 1) {
          if (valExpiration !== '0' && valExpiration !== '1' && valExpiration !== '2' && valExpiration !== '3' && evt.keyCode !== 8) {
            this.client.fechaNacimiento = '0' + valExpiration + '/'
          }
        } else if (valExpiration.length === 2) {
          if (evt.keyCode !== 8) {
            this.client.fechaNacimiento = valExpiration + '/'
          }
        } else if ((valExpiration.length === 4 || valExpiration.length === 5) && evt.keyCode !== 8) {
          if (valExpiration.length === 4) {
            // this.client.birthday = valExpiration + '/'
            let arrayMonth = valExpiration.split('/')
            if (arrayMonth[1] !== '0' && arrayMonth[1] !== '1') {
              this.client.fechaNacimiento = arrayMonth[0] + '/' + '0' + arrayMonth[1] + '/'
            }
          } else {
            this.client.fechaNacimiento = valExpiration + '/'
          }
        } else if (valExpiration.length === 14 && charCode !== 8) {
        }
      }
    },
    addingBlankSpacesAndSlashMock (evt) {
      let valExpiration = evt.target.value
      let charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 37 && charCode !== 38 && charCode !== 39 && charCode !== 40 && charCode !== 46 && (charCode < 96 || charCode > 105)) {
        evt.preventDefault()
      } else {
        if (valExpiration.length === 1) {
          if (valExpiration !== '0' && valExpiration !== '1' && valExpiration !== '2' && valExpiration !== '3' && evt.keyCode !== 8) {
            this.mockClient.fechaNacimiento = '0' + valExpiration + '/'
          }
        } else if (valExpiration.length === 2) {
          if (evt.keyCode !== 8) {
            this.mockClient.fechaNacimiento = valExpiration + '/'
          }
        } else if ((valExpiration.length === 4 || valExpiration.length === 5) && evt.keyCode !== 8) {
          if (valExpiration.length === 4) {
            // this.mockClient.birthday = valExpiration + '/'
            let arrayMonth = valExpiration.split('/')
            if (arrayMonth[1] !== '0' && arrayMonth[1] !== '1') {
              this.mockClient.fechaNacimiento = arrayMonth[0] + '/' + '0' + arrayMonth[1] + '/'
            }
          } else {
            this.mockClient.fechaNacimiento = valExpiration + '/'
          }
        }
      }

    }
  },
  components: {
    CondicionesUso
  },
  beforeDestroy () {
    this.$nuxt.$off('hide-modal-conditions-use-pp')
    clearInterval(this.interval)
    this.interval = null
  }
}
</script>
