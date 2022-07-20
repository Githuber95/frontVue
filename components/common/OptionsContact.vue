<template lang="pug">
  .row.optionsContact
    .col.s12.contact.mt-2
      h5 Mi contacto:
    .col.s12
      .box-input.input-field.col.s12
        input#celphone.validate(type="tel" name="celphone" placeholder="Celular" :state="$v.$parent.form.cellphone.$dirty ? !$v.$parent.form.cellphone.$error : null" v-model="$parent.form.cellphone" maxlength="9" autocomplete="off" aria-describedby="celFeedback")
      .error.text-red#celFeedback(v-if="validate && (!$v.$parent.form.cellphone.required || !$v.$parent.form.cellphone.numeric)")
        span Por favor, digita tu número de celular
    .col.s12.mt-2
      h6 ¿Cómo deseas que te contactemos?
    .col.s12.mt-2.types
      .row.mb-0
        .col.s4.center-align(v-if="$parent.$parent.whatsapp" :class="[($parent.form.typeContact === 'whatsapp' ) ? 'active' : '']" @click="optionsContact('whatsapp')")
          .br-options
            img(src ="@/static/media/icons/whatsapp-gray.png" class="img-opt" alt="img")
          h6.opt-text Whatsapp
        .col.s4.center-align(v-if="$parent.$parent.llamada" :class="[($parent.form.typeContact === 'llamada' ) ? 'active' : '']" @click="optionsContact('llamada')")
          .br-options
            img(src ="@/static/media/icons/call-gray.png" class="img-opt" alt="img")
          h6(class="opt-text") Llamada
        .col.s4.center-align(v-if="$parent.$parent.videollamada" :class="[($parent.form.typeContact === 'videollamada' ) ? 'active' : '']" @click="optionsContact('videollamada')")
          .br-options
            img(src ="@/static/media/icons/video-call-gray.png" class="img-opt" alt="img")
          h6.opt-text Videollamada
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      validate: false
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    $parent: {
      form: {
        cellphone: {
          required,
          numeric: phone => {
            let pattern = /^[9]\d{8}/
            return pattern.test(phone)
          }
        }
      }
    }
  },
  methods: {
    emitValidatoion () {

    },
    optionsContact (option) {
      this.$parent.form.typeContact = option
    }
  },
  destroyed () {
    this.validate = false
  }
}
</script>
<!--<style lang="scss" scoped>@import 'materialize-css/dist/css/materialize.css';</style>-->