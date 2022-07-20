<template lang="pug">
  .row.llamadame
    .col.s12
      optionsContact
    .col.s12.center-align
      a(v-on:click="emitConfirm" class="waves-effect waves-light btn-large") ¡Cont&aacute;ctame!
</template>

<script>
import moment from 'moment'
import OptionsContact from '@/components/common/OptionsContact'

export default {
  data () {
    return {
      cellphoneSupervisora: process.env.supervisorNumber,
      form: {
        documentNumber: this.$parent.documentNumber,
        typePolicy: this.$parent.nameProduct,
        nameClient: this.$parent.nameClient,
        cellphone: this.$parent.phone,
        // dateAppointment: '',
        // hourAppointment: '',
        momentContact: 'Rightnow',
        typeContact: 'llamada', // llamada, whatsapp, videollamada
        // dateOfDay: '',
        // timeOfDay: '',
        status: 'Pendiente'
      }
    }
  },
  methods: {
    emitConfirm() {
      let self = this
      this.$store.dispatch('common/sendSMS', { 
        "from": "INTERSEGURO",
        "messageType": "normal", 
        "text": "Interseguro: Solicitud de asesoría inmediata del número de documento "+ this.form.documentNumber, 
        "to": self.cellphoneSupervisora
      })
      .then(res => {
        // console.log('RESPUESTA SMS: ', res)
      }).catch(res => {
        // console.log('catch SMS: ', res)
      })
      this.$store.dispatch('common/sendSMS', { 
        "from": "INTERSEGURO",
        "messageType": "normal", 
        "text": "Interseguro: Hola "+this.form.nameClient+", gracias por reservar tu asesoría. En breve nos comunicaremos contigo.", 
        "to": self.form.cellphone
      })
      .then(res => {
        // console.log('RESPUESTA SMS: ', res)
      }).catch(res => {
        // console.log('catch SMS: ', res)
      })
      this.$children[0].validate = true
      this.$children[0].$v.$touch(false)
      this.form.dateHourOfDay = new Date()
			if (this.$children[0].$v.$parent.form.cellphone.required && this.$children[0].$v.$parent.form.cellphone.numeric) {
        this.$emit('event_child', '<h6>En seguida un agente <br>te llamará al <span>'+ this.form.cellphone +'</span></h6>', this.form)
      }
		}
  },
  components: {
    OptionsContact
  }
}
</script>

<!--<style lang="scss" scoped>@import 'materialize-css/dist/css/materialize.css';</style>-->