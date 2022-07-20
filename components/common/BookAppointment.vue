<template lang="pug">
  .row.bookappointment
    .col.s12.contact
      .row
        .col.s12
          h5.mt-0 Mi reserva:
    .col.s12.options-book
      .row
        .col.s6(style="padding-right: 2px")
          .box-input
            // Input del calendario
            img(src ="@/static/media/icons/calendar.svg" alt="fecha seguro de vida" style="padding-right: 7px;")
            input(type="text" class="datepicker" :value="form.dateAppointment" @change="getValue($event)" autocomplete="off")
        .col.s6.hour(style="padding-left: 2px")
          .box-input
            img(src ="@/static/media/icons/book-hour.svg" alt="horario seguro de vida" style="padding-right: 7px;")
            .input-field
              select.hour(v-model="form.hourAppointment")
                option(v-for="hour in arrayHours" :value="hour.value") {{ hour.value }}
    .col.s12
      optionsContact
    .col.s12.div-action-button.center-align
      //- a(class="waves-effect waves-light btn-large" @click="appointment()") Reservar
      a(class="waves-effect waves-light btn-large" v-on:click="emitConfirm") Reservar
</template>

<script>
import OptionsContact from '@/components/common/OptionsContact'

// import Swal from 'sweetalert2'
import moment from 'moment'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
// this.hashText(this.$store.state.common.saveClient.numeroTelefono, 0.35)
import "materialize-css/dist/js/materialize.js";
import M from 'materialize-css'

export default {
  data () {
    return {
      arrayHours: [
        {
          key: '9:00',
          value: '9:00 a.m.'
        },
        {
          key: '10:00',
          value: '10:00 a.m.'
        },
        {
          key: '11:00',
          value: '11:00 a.m.'
        },
        {
          key: '12:00',
          value: '12:00 p.m.'
        },
        {
          key: '1:00',
          value: '13:00 p.m.'
        },
        {
          key: '2:00',
          value: '14:00 p.m.'
        },
        {
          key: '3:00',
          value: '15:00 p.m.'
        },
        {
          key: '4:00',
          value: '16:00 p.m.'
        },
        {
          key: '5:00',
          value: '17:00 p.m.'
        },
        {
          key: '6:00',
          value: '18:00 p.m.'
        }
      ],
      cellphoneSupervisora: process.env.supervisorNumber,
      form: {
        documentNumber: this.$parent.documentNumber,
        typePolicy: this.$parent.nameProduct,
        nameClient: this.$parent.nameClient,
        cellphone: this.$parent.phone,
        dateAppointment: moment().format('DD/MM/YYYY'),
        hourAppointment: '9:00 a.m.',
        momentContact: 'Schedule', //schedule
        typeContact: 'llamada', // llamada, whatsapp, videollamada
        // dateOfDay: '',
        // timeOfDay: '',
        status: 'Pendiente'
      }
      
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    form: {
      fechaPartida: {
        required
      }
    }
  },
  head: {
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css' }
    ],
    // script: [{ src:"./../assets/js/bin/materialize.min.js"}]
  },
  mounted() {
    M.AutoInit()
    const elems = window.document.querySelectorAll('.datepicker')
    M.FormSelect.init(window.document.querySelectorAll('select.hour'), {});
    M.Datepicker.init(elems, {
      format: 'dd/mm/yyyy',
      defaultDate: moment().subtract(2, 'days').calendar(),
      setDefaultDate: true,
      disableWeekends: true,
      firstDay: 1,
      yearRange: 1,
      minDate: new Date(moment().format('LL')),
      maxDate: new Date(moment().add(14, 'days').format('LL')),
      i18n: {
        cancel: 'Volver',
        done: 'Aceptar',
        months: [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 
          'Junio', 'Julio', 'Agosto', 'Setiembre', 
          'Octubre', 'Noviembre', 'Diciembre'
        ],
        monthsShort: [
          'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ],
        weekdaysShort: [  'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        weekdaysAbbrev: [  'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
      }
    })
  },
  methods: {
    emitConfirm() {
      let type = (this.form.typeContact ==='llamada') ? 'llamada' : (this.form.typeContact ==='whatsapp') ? 'whatsapp' : 'videollamada'
      let self = this
      this.$store.dispatch('common/sendSMS', { 
        "from": "INTERSEGURO",
        "messageType": "normal", 
        "text": "Interseguro: Solicitud de agendamiento de asesoría para el "+this.form.dateAppointment+" a las "+this.form.hourAppointment+" del numero de documento "+ this.form.documentNumber, 
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
        "text": "Interseguro: Hola "+this.form.nameClient+", gracias por reservar tu asesoría. Nos comunicaremos contigo el "+this.form.dateAppointment+" a las "+this.form.hourAppointment+" a través de "+type, 
        "to": self.form.cellphone
      })
      .then(res => {
        // console.log('RESPUESTA SMS: ', res)
      }).catch(res => {
        // console.log('catch SMS: ', res)
      })
      this.$children[0].validate = true
      this.$children[0].$v.$touch(false)
      // this.form.dateOfDay = moment().format('DD/MM/YYYY')
      // this.form.timeOfDay = moment().format('LTS')
      // hourAppointment: '9:00 a.m.',
      let dateAppointment = this.form.dateAppointment.split('/').reverse().join('-')
      this.form.dateHourAppointment = new Date(dateAppointment + ' ' + this.form.hourAppointment.split(' ')[0])
      this.form.dateHourOfDay = new Date()
      if (this.$children[0].$v.$parent.form.cellphone.required && this.$children[0].$v.$parent.form.cellphone.numeric) {
        this.$emit('event_child', '<h6>Un agente se comunicará contigo el <span> '+ this.form.dateAppointment +'</span> a las '+this.form.hourAppointment+'<br> a través de una '+type+'</h6>', this.form)			
      }
    },
    getValue (valor) {
      this.form.dateAppointment = valor.target.value
    },
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
    }
  },
  components: {
    OptionsContact
  }
}
</script>
<!--<style lang="scss" scoped>@import 'materialize-css/dist/css/materialize.css';</style>-->