<template lang="pug">
  div.questions
    b-row(v-for="(preguntaFrecuente, index) in preguntasFrecuentes" :key="index")
      b-col(cols="12")
        div.questions__acordeon(role='tablist')
          b-card.pregunta-1.texto(no-body='')
            b-card-header.p-0(header-tag='header' role='tab')
              b-button(block='' href='#' v-b-toggle="preguntaFrecuente.id") {{ preguntaFrecuente.preguntas }}
            b-collapse(accordion='my-accordion' role='tabpanel' :id="preguntaFrecuente.id")
              b-card-body.acordeon-boxLista
                b-card-text
                  div(v-for="(respuesta, index) in preguntaFrecuente.respuestas")
                    span(v-html="respuesta")
</template>

<script>
export default {
  props: ['preguntasFrecuentes']
}
</script>

<style lang="scss" scoped>




.consulta .questions {
  // padding-bottom: 85px;
  &__acordeon {
    .btn {
      border: 0 !important;
      border-radius: 0 !important;
      text-align: left;
      height: 55px;
      line-height: 55px;
    }
    .card {
      border: none!important;
      border-bottom: none;
      header a {
        border-top: .5px solid #D1D1D1!important;
      }
    }
    .card.pregunta-5.texto {
      border-bottom: .8px solid #D1D1D1!important;
    }
    .card-header {
      border: none!important;
      a:hover, a:active, a:focus, .btn:focus, a.btn:hover {
        color: #454A6C;
        box-shadow: none!important;
        outline: none!important;
      }
      a, a.btn-secondary[data-v-894ab222]:not(:disabled):not(.disabled):active,
      a.btn-secondary:not(:disabled):not(.disabled).active,
      a.show > .btn-secondary.dropdown-toggle {
        font-family: "Omnes Medium"!important;
        padding-top: 21px;
        padding-bottom: 21px;
        padding-left: 1rem;
        padding-right: 3.3rem;
        font-size: 18px;
        height: 5.2rem;
        line-height: 1.3;
        background-color: #fff!important;
        color: #0855c4!important;
        box-shadow: none!important;
        outline: none!important;
        background-image: url('./../static/media/seguro_vida/home/+.svg');
        background-repeat: no-repeat;
        background-size: 45px;
        background-position-x: right;
        background-position-y: center;
      }
      a.collapsed,  a.collapsed.btn-secondary[data-v-894ab222]:not(:disabled):not(.disabled):active,
      a.collapsed.btn-secondary:not(:disabled):not(.disabled).active,
      a.collapsed.show > .btn-secondary.dropdown-toggle {
        font-family: "Omnes Regular"!important;
        padding-top: 21px;
        padding-bottom: 21px;
        padding-left: 1rem;
        padding-right: 3.3rem;
        font-size: 18px;
        height: 5.2rem;
        line-height: 1.3;
        background-color: #fff!important;
        color: #454A6C!important;
        box-shadow: none!important;
        outline: none!important;
        background-image: url('./../static/media/seguro_vida/home/+.svg');
        background-size: 45px;
        background-position-x: right;
      }
    }
    .card-body {
      background-color: #fff;
      color: #454A6C;
    }
    .btn-secondary:not(:disabled):not(.disabled):active,
    .btn-secondary:not(:disabled):not(.disabled).active,
    .show > .btn-secondary.dropdown-toggle {
      color: #fff;
      background-color: transparent;
      border-color: #0754c4;
    }
    .btn-secondary {
      color: #fff;
      background-color: transparent;
      border-color: #0754c4;
    }
    .acordeon-boxLista {
      padding-top: 0;
      padding-left: 1rem;
      padding-right: 3rem;
      h3 {
        font-size: 17.5px;
      }

    }
  }
  .acordeonContacto {
    &__item {
      min-height: 50px;
      display: flex;
      align-items: center;
      padding: 12px 0;
      padding-left: 16px;
      span img {
        padding-right: 12px;
      }
      span {
        color: white;
      }
    }
    &__item.telefono {
      padding-top: 0;
    }
  }
  &__redesSociales {
    p {
      text-align: center;
      margin-bottom: 0;
      color: white;
    }
    .box-redes {
      display: flex;
      justify-content: center;
      padding-bottom: 12px;
      margin-bottom: 14px;
      margin-top: 7px;
      span {
        padding: 12px;
        padding-bottom: 0;
      }
    }
  }
  &__derechos {
    background: white;
    color: #5e5e5e;
    text-align: center;
    height: 35px;
    line-height: 35px;
  }
}
.ibk .consulta .questions__acordeon {
  a, a.btn-secondary[data-v-894ab222]:not(:disabled):not(.disabled):active,
  a.btn-secondary:not(:disabled):not(.disabled).active,
  a.show > .btn-secondary.dropdown-toggle
  .consulta .questions {
    color: #00BB31!important;
  }
}
</style>
