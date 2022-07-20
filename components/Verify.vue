<template lang="pug">
  b-col.verify(ref="verify" cols="12")
    b-row.px-xl-0.border-poliza.justify-content-center
      // Datos de la póliza
      b-col.datosPoliza.mt-4.mb-1.mt-xl-0(cols="12")
        b-row
          b-col(cols="12")
            h4.omnes-medium Datos de la póliza
          b-col(cols="12")
            b-row.pt-3
              b-col.px-xl-0(cols="7" sm="6" lg="7")
                h5.lh-1 Cobertura por fallecimiento
              b-col.pl-0.px-xl-0(cols="5" sm="6" lg="5")
                h5.omnes-medium.lh-1 S/ {{ parseDecimal($store.state.common.cotizacion.sumaAsegurada) }}
              hr.d-none.d-xl-block
          b-col(cols="12" v-if="Object.keys($store.state.common.cotizacionAdicional).length && $store.state.common.channel == 'ENDOSOS'")
            b-row.pt-3
              b-col.px-xl-0(cols="7" sm="6" lg="7")
                h5.lh-1 Cobertura por invalidez total<br> y permanente
              b-col.pl-0.px-xl-0(cols="5" sm="6" lg="5")
                h5.omnes-medium.lh-1 S/ {{ parseDecimal($store.state.common.cotizacionAdicional[1].sumaAsegurada) }}
              hr.d-none.d-xl-block
          b-col(cols="12")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" lg="7")
                h5.lh-1 Monto
              b-col.pl-0.px-xl-0(cols="5" sm="6" lg="5")
                h5.omnes-medium.lh-1(v-if="$store.state.common.channel == 'ENDOSOS'") S/ {{ parseDecimal(parseFloat($store.state.common.cotizacion.primaRecurrente) + parseFloat($store.state.common.cotizacionAdicional[1].primaRecurrente))}}
                h5.omnes-medium.lh-1(v-else) S/ {{ parseDecimal(parseFloat($store.state.common.cotizacion.primaRecurrente)) }}
              hr.d-none.d-xl-block
          b-col(cols="12")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" lg="7")
                h5.lh-1 Frecuencia
              b-col.pl-0.px-xl-0(cols="5" sm="6" lg="5")
                h5.lh-1.omnes-medium(v-if="$store.state.common.cotizacion.frecuenciaPago === 'M' || $store.state.common.cotizacion.frecuenciaPago === 'Mensual'") Mensual
                h5.lh-1.omnes-medium(v-if="$store.state.common.cotizacion.frecuenciaPago === 'T' || $store.state.common.cotizacion.frecuenciaPago === 'Trimestral'") Trimestral
                h5.lh-1.omnes-medium(v-if="$store.state.common.cotizacion.frecuenciaPago === 'S' || $store.state.common.cotizacion.frecuenciaPago === 'Semestral'") Semestral
                h5.lh-1.omnes-medium(v-if="$store.state.common.cotizacion.frecuenciaPago === 'A' || $store.state.common.cotizacion.frecuenciaPago === 'Anual'") Anual
              hr.d-none.d-xl-block
          b-col(cols="12")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" lg="7")
                h5.lh-1 Periodo
              b-col.pl-0.px-xl-0(cols="5" sm="6" lg="5")
                h5.omnes-medium.lh-1 {{ $store.state.common.cotizacion.periodoPago }} años
              hr.d-none.d-xl-block
          b-col(cols="12" v-if="$store.state.common.channel !== 'PROTECCION_SEGURA'")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" lg="7")
                h5.lh-1 Porcentaje de devolución
              b-col.pl-0.px-xl-0(cols="5" sm="6" lg="5")
                h5.omnes-medium.lh-1 {{ $store.state.common.cotizacion.porcentaje }}%
              hr.d-none.d-xl-block  
          b-col(cols="12" v-if="$store.state.common.channel !== 'PROTECCION_SEGURA'")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" lg="7")
                h5.lh-1 Monto final a devolver
              b-col.pl-0.px-xl-0(cols="5" sm="6" lg="5")
                h5.omnes-medium.lh-1(v-if="$store.state.common.channel == 'ENDOSOS'") S/ {{ parseDecimal(parseFloat($store.state.common.cotizacion.montoDevolucion) + parseFloat($store.state.common.cotizacionAdicional[1].montoDevolucion)) }}
                h5.omnes-medium.lh-1(v-else) S/ {{ parseDecimal(parseFloat($store.state.common.cotizacion.montoDevolucion)) }}
              hr.d-none.d-xl-block
          b-col(cols="12" v-if="$store.state.common.nextDatePay")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" lg="7")
                h5.lh-1 Fecha próximo pago
              b-col.pl-0.px-xl-0(cols="5" sm="6" lg="5")
                h5.omnes-medium.lh-1 {{ $store.state.common.nextDatePay }}
              hr.d-none.d-xl-block
    // Datos de cobertura adicional
    b-row.px-xl-0.border-asegurado.justify-content-center(v-if="Object.keys($store.state.common.cotizacionAdicional).length && $store.state.common.channel !== 'ENDOSOS'")
      b-col.datosAsegurado.mt-2(cols="12")
        b-row
          b-col.mt-3.mb-2(cols="12")
            h4.omnes-medium.d-xl-none Coberturas adicionales
            h4.omnes-medium.d-none.d-xl-block Coberturas adicionales agregadas
          b-col.mt-2(cols="12")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" xl="7")
                h5.lh-1 {{ $store.state.common.cotizacionAdicional[1].description }}
              b-col.pl-0.pl-xl-0(cols="5" sm="6" xl="5")
                h5.omnes-medium S/ {{ parseDecimal($store.state.common.cotizacionAdicional[1].sumaAsegurada) }}
          b-col.mt-2(cols="12")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" xl="7")
                h5.lh-1 Monto
              b-col.pl-0.pl-xl-0(cols="5" sm="6" xl="5")
                h5.omnes-medium S/ {{ $store.state.common.cotizacionAdicional[1].primaRecurrente }}
          b-col.mt-2(cols="12")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" xl="7")
                h5.lh-1 Frecuencia
              b-col.pl-0.pl-xl-0(cols="5" sm="6" xl="5")
                h5.lh-1.omnes-medium(v-if="$store.state.common.cotizacion.frecuenciaPago === 'M' || $store.state.common.cotizacion.frecuenciaPago === 'Mensual'") Mensual
                h5.lh-1.omnes-medium(v-if="$store.state.common.cotizacion.frecuenciaPago === 'T' || $store.state.common.cotizacion.frecuenciaPago === 'Trimestral'") Trimestral
                h5.lh-1.omnes-medium(v-if="$store.state.common.cotizacion.frecuenciaPago === 'S' || $store.state.common.cotizacion.frecuenciaPago === 'Semestral'") Semestral
                h5.lh-1.omnes-medium(v-if="$store.state.common.cotizacion.frecuenciaPago === 'A' || $store.state.common.cotizacion.frecuenciaPago === 'Anual'") Anual
      // Datos del asegurado
    b-row.px-xl-0.border-asegurado.justify-content-center
      b-col.datosAsegurado.mt-2(cols="12")
        b-row
          b-col.mt-3.mb-2(cols="7" sm="6" lg="7")
            h4.omnes-medium Datos del asegurado
          b-col.mt-3.text-right(cols="5" sm="6" lg="5")
            b-button.py-1.w-auto.h-auto.editar.px-xl-2.text-white(variant="primary" @click="editPhoneMail('editar')" style="font-size: 14px;" v-if="edit") Editar
            b-button.py-1.w-auto.h-auto.editar.px-xl-2(variant="white" @click="editPhoneMail('guardar')" style="font-size: 14px;" v-else :class="[$v.client.$invalid ? 'disabled' : '']") Guardar
          b-col.mt-2(cols="12")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" xl="5")
                h5.lh-1 DNI/CE
              b-col.pl-0.pl-xl-0(cols="5" sm="6" xl="7")
                h5.omnes-medium {{ $store.state.common.dniCliente }}
              hr.d-none.d-xl-block
          b-col.mt-2(cols="12")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" xl="5")
                h5.lh-1 Nombre
              b-col.pl-0.pl-xl-0(cols="5" sm="6" xl="7")
                h5.omnes-medium {{ capitalize($store.state.common.saveClient.nombre + " "+ $store.state.common.saveClient.apellidoPaterno + " " + $store.state.common.saveClient.apellidoMaterno ) }}
              hr.d-none.d-xl-block
          b-col(cols="12")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" xl="5")
                h5.lh-1 Fecha de nacimiento
              b-col.pl-0.pl-xl-0(cols="5" sm="6" xl="7")
                h5.omnes-medium.lh-1 {{ $store.state.common.saveClient.fechaNacimiento }}
              hr.d-none.d-xl-block  
          b-col(cols="12")
            b-row.pt-2
              b-col.px-xl-0(cols="7" sm="6" xl="5")
                h5.lh-1 Celular
              b-col.pl-0.pl-xl-0(cols="5" sm="6" xl="7")
                h5.omnes-medium.lh-1(v-if="edit && !$store.state.common.hashPhone") {{ $store.state.common.saveClient.numeroTelefono }}
                h5.omnes-medium.lh-1(v-else-if="edit && $store.state.common.hashPhone") {{ hashText($store.state.common.saveClient.numeroTelefono, 0.35) }}
                b-form-input.py-0.h-auto#numeroTelefono(v-else-if="!edit && !$store.state.common.hashPhone" autocomplete="off" maxLength="9" type='tel' placeholder='Celular' v-model="client.numeroTelefono" @keydown.native="onlyNumber($event)" @keyup.native="onlyNumber($event)" @keypress.native="onlyNumber($event)" :state="$v.client.numeroTelefono.$dirty ? !$v.client.numeroTelefono.$error : null" aria-describedby="numeroTelefonoFeedback")
                b-form-input.py-0.h-auto#numeroTelefono(v-else-if="!edit && $store.state.common.hashPhone" @click="cleanPhoneEmail('phoneClient', 'common/setHashPhone')" autocomplete="off" maxLength="9" type='tel' placeholder='Celular' v-model="clientPhone" @keydown.native="onlyNumber($event)" @keyup.native="onlyNumber($event)" @keypress.native="onlyNumber($event)" :state="$v.client.numeroTelefono.$dirty ? !$v.client.numeroTelefono.$error : null" aria-describedby="numeroTelefonoFeedback")
                b-form-invalid-feedback#numeroTelefonoFeedback(v-if="!$v.client.numeroTelefono.required")
                  | Este campo es requerido
                b-form-invalid-feedback#numeroTelefonoFeedback(v-if="!$v.client.numeroTelefono.numeric")
                  | Este campo debe contener 9 dígitos
              hr.d-none.d-xl-block    
          b-col(cols="12")
            b-row.pt-2.pb-xl-1
              b-col.px-xl-0(cols="7" sm="6" xl="5")
                h5.lh-1 Email
              b-col.pl-0.pl-xl-0(cols="5" sm="6" xl="7")
                h5.omnes-medium.lh-1(v-if="edit && !$store.state.common.hashEmail" style="overflow: hidden;text-overflow: ellipsis;") {{ $store.state.common.saveClient.email }}
                h5.omnes-medium.lh-1(v-else-if="edit && $store.state.common.hashEmail" style="overflow: hidden;text-overflow: ellipsis;") {{ hashText($store.state.common.saveClient.email, 0.4) }}
                b-form-input.py-0.h-auto#email(v-else-if="!edit && !$store.state.common.hashEmail" autocomplete="off"  type='text' placeholder='Correo electrónico' v-model="client.correo" :state="$v.client.correo.$dirty ? !$v.client.correo.$error : null" aria-describedby="emailFeedback")
                b-form-input.py-0.h-auto#email(v-else-if="!edit && $store.state.common.hashEmail" @click="cleanPhoneEmail('emailClient', 'common/setHashEmail')" autocomplete="off"  type='text' placeholder='Correo electrónico' v-model="clientEmail" :state="$v.client.correo.$dirty ? !$v.client.correo.$error : null" aria-describedby="emailFeedback")
                b-form-invalid-feedback#emailFeedback(v-if="!$v.client.correo.required")
                  | Este campo es requerido
                b-form-invalid-feedback#emailFeedback(v-if="!$v.client.correo.email")
                  | Ingresa un correo válido
              hr.d-none.d-xl-block    
    b-row.px-xl-0.pt-2.border-eclusiones.justify-content-center
      b-col.mt-xl-2.mb-xl-1(cols="12")
        b-row
          b-col.mt-3.mb-2(cols="7" sm="6" lg="7")
            h4.omnes-medium Exclusiones
          b-col.pb-2(cols="12")
            h5.nombre Tus exclusiones se encuentran detalladas 
              | <a class="text-primary omnes-medium" @click="$parent.$nuxt.$emit('bv::show::modal', 'modalInfo')" style="cursor:pointer">aquí</a>
      // Mis beneficiarios
    b-row.px-xl-0.border-beneficiario.justify-content-center
      b-col.mt-xl-2.mb-xl-1(cols="12")
        b-row(v-if="$store.state.common.channel !== 'ENDOSOS'")
          b-col.mt-3.mb-2(cols="7" sm="6" lg="7")
            h4.omnes-medium Mis beneficiarios
          b-col.pb-3(cols="12")
            h5.nombre Tus beneficiarios serán tus herederos legales. Si deseas escoger a 
              | tus beneficiarios, comunícate después de la compra con nuestra central 
              | de <span class="omnes-medium">Servicio de Atención al Cliente</span> 
              | al <span class="tewxt-primary omnes-medium">(01)500-0000.</span>
        b-row(v-else)
          b-col.mt-3.mb-2(cols="7" sm="6" lg="7")
            h4.omnes-medium Beneficiario
          b-col.pb-3(cols="12")
            h5.nombre El Banco Internacional del Perú – Interbank , al cual endosarás tu póliza para la cobertura de tu crédito.
    b-modal#modalInfo(static title="Probando" size="md" centered hide-footer hide-header )
      div.my-2
        h4.text-center.omnes-medium {{ $store.state.common.saveClient.nombre }}, mira esto antes de seguir
      div.mt-5.border.px-3.px-lg-0
        b-container
          div.text-center
            img(src="@/static/media/common/cotiza/interbank/beneficio_cubre-nocubre.svg", alt='Cubre seguro de vida con devolución')
          div.cobertura.mt-2
            h4.omnes-medium Lo que cubrimos:
            ul.mt-2
              li Muerte natural o por accidente
              li.lh-1(v-if="$store.state.common.channel == 'ENDOSOS'") Invalidez Total y Permanente por Accidente y/o Enfermedad.
          div.sin-cobertura
            h4.omnes-medium Lo que no cubrimos:
            ul.mt-2
              li Muerte a consecuencia de hechos delictivos
              li Muerte a causa de enfermedades preexistentes
              li Muerte por práctica de deportes extremos
              li Muerte a causa de efectos de drogas
              li Muerte a causa de cometer hechos delictivos
          div.mb-3
            h5 *Para conocer más sobre cada una de las exclusiones ingresa&nbsp;
              a(v-bind:href="urlExclusiones" target="_blank") aquí.
      div.mt-4
        p.text-primary.text-center Al dar clic al botón siguiente, acepto que he <br>leído las exclusiones        
      div.mt-4.mb-3.text-center
        b-button(type="submit" variant="dark" style="font-size: 16px;" @click="hideModal") Siguiente
</template>

<script>
import Swal from 'sweetalert2'

import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  props: ['remarketing', 'remarketingLast'],
  data () {
    return {
      urlExclusiones: '',
      editPhone: false,
      editMail: false,
      edit: true,
      client: {
        numeroTelefono: this.$store.state.common.saveClient.numeroTelefono,
        correo: this.$store.state.common.saveClient.email
      },
      clientLast: {
        numeroTelefono: this.$store.state.common.saveClient.numeroTelefono,
        correo: this.$store.state.common.saveClient.email
      },
      clientPhone: this.hashText(this.$store.state.common.saveClient.numeroTelefono, 0.35),
      clientEmail: this.hashText(this.$store.state.common.saveClient.email, 0.4)
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    client: {
      numeroTelefono: {
        required,
        numeric: phone => {
          let pattern = /^[9]\d{8}/
          return pattern.test(phone)
        }
      },
      correo: {
        required,
        email
      }
    }
  },
  created () {
    this.urlExclusiones = require('./../static/docs/Exclusiones-VidaConDevolucion.pdf')
    let frequencyPay = ((this.$store.state.common.cotizacion.frecuenciaPago).length > 1) ? (this.$store.state.common.cotizacion.frecuenciaPago).split("")[0] : this.$store.state.common.cotizacion.frecuenciaPago
    this.$store.dispatch('common/paymentFrequency', {"frecuenciaPago": frequencyPay}).then(respuesta => {
      this.$store.commit('common/setNextDatePay', respuesta.fechaSiguientePago)
    })
  },
  mounted () {
    var ref = this.$refs['verify'].offsetTop
    window.scrollTo(0, ref)
    
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
      // console.log('cleanPhoneEmail: ', value, setValue)
      this.$store.commit(setValue, false)
      if (value === 'phoneClient') {
        this.client.numeroTelefono = ''
      } else if (value === 'emailClient') {
        this.client.correo = ''
      }
    },
    capitalize (nombreCompleto) {
      nombreCompleto = nombreCompleto.toLowerCase()
      return nombreCompleto.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
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
    editPhoneMail (modify) {
      this.editPhone = !this.editPhone
      this.editMail = !this.editMail
      this.edit = !this.edit
      if (modify === 'editar') {
        window.dataLayer.push({
          'event': 'PPagoEditar asegurado',
          'category': 'Paso Pago',
          'action': 'Click',
          'label': 'editar asegurado'
        })
        this.$store.commit('common/setSaveClient', { numeroDocumento: this.$store.state.common.dniCliente, nombre: this.$store.state.common.saveClient.nombre, apellidoPaterno: this.$store.state.common.saveClient.apellidoPaterno, apellidoMaterno: this.$store.state.common.saveClient.apellidoMaterno, fechaNacimiento: this.$store.state.common.saveClient.fechaNacimiento, sexo: this.$store.state.common.saveClient.sexo, numeroTelefono: this.client.numeroTelefono, email: this.client.correo })
        this.remarketing.detalle.datosProducto.datosTitular = this.$store.state.common.saveClient
      } else {
        // llamar api makeClient para actualizar los datos
        this.$store.dispatch('common/makeClient', { numeroDocumento: this.$store.state.common.dniCliente, nombre: this.$store.state.common.saveClient.nombre, apellidoPaterno: this.$store.state.common.saveClient.apellidoPaterno, apellidoMaterno: this.$store.state.common.saveClient.apellidoMaterno, fechaNacimiento: this.$store.state.common.saveClient.fechaNacimiento, sexo: this.$store.state.common.saveClient.sexo, numeroTelefono: this.client.numeroTelefono, email: (this.client.correo).trim() })
        .then(res => {
          this.$store.commit('common/setSaveClient', { numeroDocumento: this.$store.state.common.dniCliente, nombre: this.$store.state.common.saveClient.nombre, apellidoPaterno: this.$store.state.common.saveClient.apellidoPaterno, apellidoMaterno: this.$store.state.common.saveClient.apellidoMaterno, fechaNacimiento: this.$store.state.common.saveClient.fechaNacimiento, sexo: this.$store.state.common.saveClient.sexo, numeroTelefono: this.client.numeroTelefono, email: (this.client.correo).trim() })
        }, response => {
          this.$store.dispatch('common/getClients', this.$store.state.common.saveClient.numeroDocumento).then(resp => {
            this.$store.commit('common/setSaveClient', {
              numeroDocumento: resp.data.numeroDocumento,
              nombre: resp.data.nombre,
              apellidoPaterno: resp.data.apellidoPaterno,
              apellidoMaterno: resp.data.apellidoMaterno,
              fechaNacimiento: resp.data.fechaNacimiento,
              sexo: resp.data.sexo,
              numeroTelefono: resp.data.numeroTelefono,
              email: (resp.data.email).trim(),
              numeroDocumento: resp.data.numeroDocumento
            })
          })
          if (response.response.data.code) {
            Swal.fire(
              'Oops...!',
              'No es posible modificar los datos porque el cliente ya tiene una poliza',
              'error'
            )
            this.tracking.errorType = 'FRONTEND'
            this.tracking.errorData = 'No es posible modificar los datos porque el cliente ya tiene una poliza'
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
          } else {
            Swal.fire(
              'Oops...!',
              'Estamos teniendo problemas para guardar los datos. Para mayor información puedes comunicarte al +51 933559693',
              'error'
            )
            this.tracking.errorType = 'FRONTEND'
            this.tracking.errorData = 'Estamos teniendo problemas para guardar los datos. Para mayor información puedes comunicarte al +51 933559693'
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
          }
        })
      }
      
    },
    savePhoneMail () {
      this.editPhone = true
      this.editMail = true
      this.edit = false
    },
    onlyNumber (evt) {
      let charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 37 && charCode !== 38 && charCode !== 39 && charCode !== 40 && charCode !== 46 && (charCode < 96 || charCode > 105)) {
        evt.preventDefault()
      }
    },
    hideModal () {
      this.$nuxt.$emit('bv::hide::modal', 'modalInfo')
    }
  }
}
</script>
