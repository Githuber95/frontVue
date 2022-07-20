<template lang="pug">
  div#appointmentComponent
    .fab(@click="open")
      img.d-lg-none(src="@/static/media/icons/floating-button.svg" alt="boton flotante seguro de vida")
      img.d-none.d-lg-block(src="@/static/media/icons/floating-button-desktop.svg" alt="boton flotante seguro de vida")
      //- h6.text-float Agenda tu asesoría <br> con un agente
    .box
      #contact-top.div
        .row.valign-wrapper-end
          .col.s5.right-align
            img.mt-3(src="@/static/media/icons/agent.svg" alt="agente seguro de vida")
          .col.s7.left-align
            h5.title.mb-5 Agenda tu asesoría <br>con un agente
      #optionsAgent.div
        .content-top
          .options-appointment(v-if="!showConfirm")
            a(href="javascript:void(0);" class="btn-link" @click="callMe" )
              .button(:class="[showCallMe ? 'active' : '']")
                img(src ="@/static/media/icons/phone-call.png" alt="llamada seguro de vida" )
                span Llámame lo <br>antes posible 
            a(href="javascript:void(0);" class="btn-link" @click="bookAppointment")
              .button(:class="[showBookAppointment ? 'active' : '']")
                  img(v-if="showCallMe" src ="@/static/media/icons/appointment.svg" alt="agendamiento seguro de vida")
                  img(v-else src ="@/static/media/icons/appointment-white.svg" alt="agendamiento seguro de vida")
                  span Quiero reservar <br>una cita
          call-me(v-if="showCallMe && !showConfirm" v-on:event_child="eventSendData")
          book-appointment(v-else-if="showBookAppointment && !showConfirm" v-on:event_child="eventSendData")
          div.showConfirm(v-else-if="showConfirm")
            div(v-if="showCallMe")
              .row.center-align.mt-4
                img(src="@/static/media/icons/confirm-callme.svg" alt="llamame seguro de vida")
                h5.text-blue Gracias por comunicarte <br>con nosotros
              .row
                div.center-align(v-html="textInfo")
              .row
                .col.s12.center-align
                  a(@click="showConfirm= false" class="waves-effect waves-light btn-large") Genial
            div(v-else)
              .row.center-align.mt-4
                img(src="@/static/media/icons/confirm-calendar.svg" alt="calendar")
                h5.text-blue ¡Felicidades! Tu cita ha <br>sido reservada
              .row.mt-2
                div.center-align(v-html="textInfo")
              .row
                .col.s12.center-align
                  a(@click="showConfirm= false" class="waves-effect waves-light btn-large") Genial
      div#close.div(@click="closeBox")
        img(src="@/static/media/icons/close.png" alt="cierre seguro de vida" class="imgClose")
</template>
<script>

import CallMe from '@/components/common/CallMe'
import BookAppointment from '@/components/common/BookAppointment'
import M from 'materialize-css'
// import "materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize.js";

import AppointmentService from "@/services/AppointmentService"
import AuthService from '@/services/AuthService'

export default {
  name: 'IsAppointment',
  props: {
    documentNumber: {
      type: String,
      required: true
    },
    nameProduct: {
      type: String,
      required: true
    },
    nameClient: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    whatsapp: {
      type: Boolean,
      required: true
    },
    llamada: {
      type: Boolean,
      required: true
    },
    videollamada: {
      type: Boolean,
      required: true
    },
    sms: {
      type: Boolean,
      required: true
    }
  },
  head: {
    script: [
      { src: 'materialize-css/dist/js/materialize.js'} // test
    ],
     link: [
      // { rel: 'icon', type: 'image/x-icon', href: 'materialize-css/dist/css/materialize.css' },
     ]
  },
  data () {
    return {
      showCallMe: true,
      showBookAppointment: false,
      showConfirm: false,
      textInfo: '',
      email: 'miriam.mendoza@interseguro.com.pe',
      password: 'granmiriam2019'
    }
  },
  mounted () {
    M.AutoInit()
    AuthService.signInWithEmailAndPassword(this.email, this.password)
    .then((result) => {
      if(result.user.emailVerified){
      }
    })
    .catch((error) => {
    });
  },
  methods: {
    eventSendData (text, formData) {
      let self = this
      AppointmentService.create(formData).then(refDoc => {
        // console.log(`Id del post => ${refDoc.id}`)
        self.textInfo = text
        self.showConfirm = true
      }).catch(error => {
        self.textInfo = 'Estamos teniendo problemas...'
        self.showConfirm = true
        // console.log(`Error creando el post => ${error}}`)
      })
    },
    sendData (text, boolean) {
      this.textInfo = text
      this.showConfirm = boolean
    },
    open() {
      window.dataLayer.push({
        'event': 'Agendar asesoria',
        'category': 'Agendamiento',
        'action': 'Click',
        'label': 'agendar asesoria con agente'
      })
      document.querySelector('.box').classList.toggle('box-active');
      document.querySelector('.fab').classList.toggle('fab-active');
    },
    closeBox() {
      document.querySelector('.box').classList.toggle('box-active');
      document.querySelector('.fab').classList.toggle('fab-active');
      this.showConfirm = false
    },
    bookAppointment () {
      this.showCallMe = false
      this.showBookAppointment = true
      this.showConfirm = false
    },
    callMe () {
      this.showCallMe = true
      this.showBookAppointment = false
      this.showConfirm = false
    }
  },
  components: {
    CallMe,
    BookAppointment
  }
}
</script>
 
<style lang="scss">

  #appointmentComponent svg { fill: initial; width: initial; height: initial; }
  #appointmentComponent .datepicker-modal .datepicker-date-display { background-color: #0855c4; }
  #appointmentComponent .datepicker-modal { background-color: #0855c4; }
  #appointmentComponent .datepicker-modal 
  .datepicker-table td.is-selected { background-color: #EA0C90; }
  #appointmentComponent .datepicker-modal .datepicker-cancel, 
  #appointmentComponent .datepicker-modal .datepicker-clear, 
  #appointmentComponent .datepicker-modal .datepicker-today, 
  #appointmentComponent .datepicker-modal .datepicker-done {
    color: #EA0C90;
  }
  #appointmentComponent .datepicker-modal abbr { text-decoration: none; }
  #appointmentComponent .datepicker-modal input { height: auto!important }
  #appointmentComponent .datepicker-modal  input.select-dropdown { width: 70px!important; padding: 0!important; }
  #appointmentComponent .datepicker-footer
  .confirmation-btns {
    display: flex;
  }
  #appointmentComponent .datepicker-modal {
    height: auto;
  }
   #appointmentComponent .datepicker-modal .datepicker-footer button {
    width: auto;
  }
    #appointmentComponent .datepicker-date-display .year-text { font-size: 1.5rem; }
    #appointmentComponent .datepicker-date-display .date-text { font-size: 2.8rem; }
    #appointmentComponent .showConfirm h5 { font-size: 1.4rem!important;  }
    #appointmentComponent .showConfirm h6, #appointmentComponent .showConfirm h6 span { font-size: .9rem!important; margin-top: 1rem; }
  #appointmentComponent h6, 
  #appointmentComponent h6 span
   { font-size: 1rem!important;  }
  #appointmentComponent .text-blue { color: #0855c4;  }
  #appointmentComponent .text-dark { color: #EA0C90; }
  #appointmentComponent .text-red { color: red; }
  #appointmentComponent span { font-size: 11px; }
  #appointmentComponent .row { display: block;     width: 100%; margin: 0 auto; }
  #appointmentComponent li:focus { outline: none; }
  #appointmentComponent li span { 
    font-size: .9rem;
    color: #000;
    }
  #appointmentComponent .dropdown-content li > a, .dropdown-content li > span { 
    font-size: 16px;
    color: #26a69a;
    display: block;
    line-height: 22px;
    padding: 14px 16px;
  }
  #appointmentComponent .dropdown-content { 
  background-color: #fff;
  margin: 0;
  display: none;
  min-width: 100px;
  overflow-y: auto;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
  transform-origin: 0 0;
}
  #appointmentComponent .select-wrapper input.select-dropdown  {
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    outline: none;
    height: 3rem;
    line-height: 3rem;
    width: 100%;
    font-size: 16px;
    margin: 0 0 8px 0;
    padding: 0;
    display: block;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 1;
  }
  #appointmentComponent .select-wrapper .caret {
    width: initial;
    height: initial;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    z-index: 0;
    fill: rgba(0, 0, 0, 0.87);
  }
  #appointmentComponent .mt-0 {
    margin-top: 0!important;
  }
  #appointmentComponent .mt-1 {
    margin-top: .5rem!important;
  }
  #appointmentComponent .mt-2 {
    margin-top: 1rem!important;
  }
  #appointmentComponent .mt-3 {
    margin-top: 1.5rem!important;
  }
  #appointmentComponent .mt-4 {
    margin-top: 2.5rem!important;
  }
  #appointmentComponent .mt-5 {
    margin-top: 3rem!important;
  }
  #appointmentComponent .mb-0 {
    margin-bottom: 0!important;  
  }
  #appointmentComponent .mb-1 {
    margin-bottom: .5rem!important;  
  }
  #appointmentComponent .mb-2 {
    margin-bottom: 1rem!important;  
  }
  #appointmentComponent .mb-3 {
    margin-bottom: 1.5rem!important;  
  }
  #appointmentComponent .mb-4 {
    margin-bottom: 2.5rem!important;  
  }
  #appointmentComponent .mb-5 {
    margin-bottom: 3rem!important;  
  }
  .valign-wrapper-end {
      display: flex!important;
      align-items: flex-end!important;
  }
  #appointmentComponent .btn, 
  #appointmentComponent .btn-large,
  #appointmentComponent  .btn-small {
    background-color: #EA0C90!important;
    width: 12rem!important;
    color: #fff;
    margin-top: 2rem;
    border-radius: 7px!important;
    text-transform: initial!important;
    &:hover {
      color: #fff;
    }
  }
  #appointmentComponent .box {
    z-index: 99!important;
  }
  #appointmentComponent .box-input {
    margin: 0!important;
    border: 1px solid #D1D1D1!important;
    padding: 0 7px!important;

  }
  #appointmentComponent .box {
    background-color: #F4F5FA!important;
    height: 0px!important;
    bottom: 0px!important;
    right: 0!important;
    position: fixed!important;
    transition-delay: 0.3s!important;
    transition: 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95)!important;
    display: flex!important;
    flex-direction: column!important;
  }
  #appointmentComponent .box-active {
    min-height: 100vh!important;
    width: 100vw!important;
  }
  #appointmentComponent .fab {
      position: fixed!important;
      bottom: 5.5rem!important;
      // bottom: 32px!important;
      right: 1rem!important;
      border-radius: 50%!important;
      width: 60px!important;
      height: 60px!important;
      background: #0855C4!important;
      box-shadow: 1px 2px 4px grey!important;
      z-index: 3!important;
      display: flex!important;
      flex-direction: column!important;
      align-items: center!important;
      justify-content: center!important;
  }

  #appointmentComponent .fab:hover {
      cursor: pointer!important;
  }
  #appointmentComponent .fab .text-float {
    display: none!important;
    background-color: #0855C4!important;
    color: #0855c4!important;
  }
  #appointmentComponent .fab img {
    width: 60px;
    transition: 0.4s!important;
    object-fit: cover!important;
  }

  #appointmentComponent .fab-active {
      visibility: hidden!important;
  }

  #appointmentComponent .fab-active img {
      transform: rotate(270deg)!important;
      width: 0%!important;
  }

  #appointmentComponent #contact-top {
    top: 0!important;
    left: 0!important;
    height: 158px !important;
    background-color: #0855C4!important;
    text-align: center!important;
  }

  #appointmentComponent #contact-top h5 {
    color: #0855c4!important;
    font-weight: 700!important;
    font-size: 1.2rem!important;
    margin-top: 7px!important;
  }
  #appointmentComponent .div {
    position: absolute!important;
    width: 100%!important;
    height: 50%!important;
  }

  #appointmentComponent button:focus {outline:0!important;}
  #appointmentComponent #close {
    top: 20px!important;
    right: 20px!important;
    width: 30px!important;
    height: 30px!important;
    cursor: pointer!important;
  }
  #appointmentComponent #close .imgClose {
    width: 14px!important;
    height: 14px!important;
    object-fit: cover!important;
  }

  #appointmentComponent #optionsAgent {
    top: 135px!important;
    left: 5%!important;
    width: 90%!important;
    height: 100%!important;
    background-color: #ffffff!important;
    border-radius: 12px 12px 0px 0px!important;
    padding-bottom: 3rem!important;
  }

  #appointmentComponent #optionsAgent .content-top {
    width: 100%!important;
    height: 100%!important;
    display: flex!important;
    flex-direction: column!important;
    justify-content: flex-start!important;
    align-items: center!important;
  }
  #appointmentComponent #optionsAgent .options-appointment {
    display: flex!important;
    flex-direction: row!important;
    justify-content: space-between!important;
    align-items: flex-start!important;
    padding-top: 14px!important;
  }
  #appointmentComponent #optionsAgent .button {
    border: none!important;
    height: 56px!important;
    margin: 0 7px!important;
    background: #F4F5FA!important;
    font-size: 8.5pt!important;
    color: #454A6C!important;
    border-radius: 3px!important;
    padding: 10px 10px!important;
    box-sizing: border-box!important;
    display: flex!important;
    flex-direction: row!important;
    align-items: center!important;
    justify-items: center!important;
  }
  #appointmentComponent #optionsAgent .button.active {
    background: #0855C4!important;
    color: #ffffff!important;
  }
  #appointmentComponent #optionsAgent  .button img {
    width: 28px!important;
    height: 28px!important;
    object-fit: cover!important;
    border-radius: 100%!important;
    display: block!important;
    margin-right: 10px!important;
    filter: brightness(0.5)!important;
  }


  #appointmentComponent #optionsAgent .button.active img {
    width: 28px!important;
    height: 28px!important;
    object-fit: cover!important;
    border-radius: 100%!important;
    display: block!important;
    margin-right: 10px!important;
    filter: initial!important;
  }
  #appointmentComponent #optionsAgent a.btn-link {
    color: #0855C4!important;
    font-weight: 200!important;
    text-align: left!important;
    text-decoration: none!important;
  }

  /*
    Options contact
  */
    #appointmentComponent #optionsAgent input.datepicker {
      padding:0!important;
    }
  #appointmentComponent #optionsAgent input,
  #appointmentComponent .optionsContact input,
  #appointmentComponent .optionsContact input:focus {
    border-bottom: none!important;
    box-shadow: none!important;
    cursor: pointer!important;
    margin: 0 0 3px 0;
    height: 2.2rem;
    font-size: .85rem!important;
    border: none!important;
  }
  #appointmentComponent .optionsContact input::placeholder {
    color: #000!important;
  }
  #appointmentComponent .optionsContact .active h6 {
    color: #EA0C90!important;
  }
  #appointmentComponent .optionsContact .active .br-options {
    background-color: #EA0C90!important;
  }
  #appointmentComponent .optionsContact .active .br-options img {
    filter: contrast(6)!important;
  }
  #appointmentComponent .optionsContact .types h6 {
    font-size: .6rem!important;
  }
  #appointmentComponent .optionsContact .br-options {
    border-radius: 50%!important;
    background: #F4F5FA!important;
    width: 3rem!important;
    height: 3rem!important;
    margin: 0 auto!important;
    display: flex!important;
    justify-content: center!important;
    align-items: center!important;
    cursor: pointer!important;
  }
  #appointmentComponent .optionsContact .br-options img {
    width: 1.7rem!important;
  }

  /*
    CALL ME
  */
  #appointmentComponent .callme,
  #appointmentComponent .bookappointment {
    padding: 14px 0!important;
  }
  #appointmentComponent .callme h5,
  #appointmentComponent .bookappointment h5 {
    font-size: 1.05rem!important;
    font-weight: 500!important;
  }
  /*
    BOOK APPOINTMENTE
  */
  #appointmentComponent .bookappointment .options-book .hour .input-field { margin: 0!important; }
  #appointmentComponent .bookappointment .options-book .hour select {
      border-radius: 0!important;
      outline: none!important;
      height: 3rem!important;
      width: 100%!important;
      font-size: 16px!important;
      margin: 0 0 8px 0!important;
      padding: 0!important;
      box-shadow: none!important;
      border: none!important;
    }

  #appointmentComponent .bookappointment .options-book .box-input {
    display: flex!important;
    justify-content: space-around!important;
    align-content: center!important;
    margin: 0!important;
    cursor: pointer!important;
  }
  /* SHOW CONFIRM */
  #appointmentComponent .showConfirm h6 span {
    font-weight: 600!important;
  }
  @media (min-width: 575px) {
    
    
    #appointmentComponent .fab h6 { font-size: .85rem!important }
    // #appointmentComponent .fab img {
    //   width: 5rem!important;
    //   height: 5rem!important;
    // }
    #appointmentComponent .fab .text-float {
      display: block!important;
      padding-top: .5rem!important;
      padding-bottom: .5rem!important;
      padding-right: .5rem!important;
      padding-left: 1.5rem!important;
      border-top-right-radius: 2rem!important;
      border-bottom-right-radius: 2rem!important;
      margin-left: -1rem!important;
      z-index: -1!important;
    }
    #appointmentComponent .box {
      right: 5px!important;
          border-radius: 12px 12px 2px 2px!important;
    }
    #appointmentComponent .box-active {
      width: 375px!important;
      height: 625px!important;
      min-height: 625px!important;
    }
    #appointmentComponent #contact-top {
      border-radius: 12px  12px  0px 0px!important;
    }
  }
  @media (min-width: 992px) {
    #appointmentComponent .fab {
      bottom: 6.5rem !important;
      right: -1rem!important;
      flex-direction: row!important;
      width: 17rem!important;
      background: transparent!important;
      box-shadow: none!important;
    }
    #appointmentComponent .fab img {
      width: 13rem!important;
    }
  }
</style>