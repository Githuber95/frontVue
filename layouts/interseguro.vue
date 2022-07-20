<template lang="pug">
  section#is.vida-con-devolucion-is
    loader(v-if="showLoader" :info="textLoader")
    main
      // Component HEADER
      header.py-0.py-sm-2
        b-container
          b-row
            b-col.text-left.my-2(cols="10" @click="goQuote($store.state.common.channel)")
              img.logo(v-if="$store.state.common.channel === 'WEB'" v-lazy-load data-src="@/static/media/images/logo_seguro_de_vida.svg" alt="logo seguro de vida con devolución" style="cursor:pointer;")
              img.logo(v-else-if="$store.state.common.channel === 'SEGURO_UNIVERSITARIO'" src="@/static/media/images/logo_seguro_universitario.svg" alt="logo seguro universitario" style="cursor:pointer;")
              img.logo(v-else-if="$store.state.common.channel === 'AHORRO_JUBILACION'" src="@/static/media/images/logo_jubilacion.svg" alt="logo seguro ahorro jubilacion" style="cursor:pointer;")
              img.logo(v-else-if="$store.state.common.channel === 'PROTECCION_SEGURA'" src="@/static/media/images/logo_proteccion_segura.svg" alt="logo seguro de proteccion segura" style="cursor:pointer;")
              img.logo(v-else-if="$store.state.common.channel === 'AHORRO_SEGURO'" src="@/static/media/images/logo_ahorro_seguro.svg" alt="logo seguro de ahorro seguro" style="cursor:pointer;")
              img.logo(v-else-if="$store.state.common.channel === 'ENDOSOS'" src="@/static/media/images/logo_endoso_con_devolucion.svg" alt="logo endoso con devolucion" style="cursor:pointer;")
            b-col.mt-2.text-lg-right(cols="2")
              span.text-primary.omnes-semibold.d-none.d-xl-inline.mr-2(@click="showContact = !showContact"   style="cursor: pointer;") Ayuda
              img.telefono(src="@/static/media/icons/telefono.svg" alt="llamara algún contacto" @click="showContact = !showContact"  style="cursor: pointer;")
      nuxt
      transition(name="slide-fade")
        div.white-transparent(:class="[showContact ? 'bg-white' : '']" v-if="showContact")
          div.top
          b-container.pr-0
            b-row.mt-5(align-center)
              b-col(cols="3" sm="6" md="8")
              b-col(cols="9" sm="6" md="4")
                b-row
                  b-col.text-right.pr-0(cols="7" md="6" offset-lg="2" lg="6" offset-xl="1" xl="5")
                    div.border_text
                      a(target="_blank" href="tel:1500-0000" style="cursor: pointer; text-decoration: none;" @click="call")
                        h3.mt-1.d-lg-none Llámanos
                        h3.mt-1.d-none.d-lg-block &nbsp;(01) 500-0000
                  b-col.text-xs-left(cols="4" md="6" lg="4" xl="6")
                    a(target="_blank" href="tel:1500-0000" @click="call")
                      img.call(src="@/static/media/icons/llamada.svg" alt="Llamar algún contacto" @click="showContact = !showContact"  style="cursor: pointer")
            b-row.mt-4(align-center)
              b-col(cols="3" sm="6" md="8")
              b-col(cols="9" sm="6" md="4")
                b-row
                  b-col.text-right.pr-0(cols="7" md="6" offset-lg="2" lg="6" offset-xl="1" xl="5" @click="write")
                    div.border_text
                      a(target="_blank" :href="`https://api.whatsapp.com/send?phone=51933559693`" style="cursor: pointer; text-decoration: none;" @click="write")
                        h3.mt-1.d-lg-none Escríbenos
                        h3.mt-1.d-none.d-lg-block +51 933559693
                  b-col.text-xs-left(cols="4" md="6" lg="4" xl="6")
                    a(target="_blank" :href="`https://api.whatsapp.com/send?phone=51933559693`" @click="write")
                      img.call(src="@/static/media/icons/whatsapp.svg" alt="Escribir algún contacto" @click="showContact = !showContact"  style="cursor: pointer")
      // Component FOOTER
      div.writeme(v-if="$route.path == '/paso/pago'")
        a(target="_blank" :href="`https://api.whatsapp.com/send?phone=51933559693`" @click="writeChat")
          img.call.d-lg-none(style="width:60px;" :class="[$route.path == '/paso/cotiza' || $route.path == '/paso/pago'  ? 'pasos' : '']" src="@/static/media/icons/whatsapp_icon.svg" alt="Escribir algún contacto")
          img.call.d-none.d-lg-block.pasos(src="@/static/media/common/home/whatsapp.svg"   alt="Escribir algún contacto")
    footer-is(steps="false")
</template>
<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Loader from '@/components/common/Loader'
import global from '~/mixins/global.js'

export default {
  mixins: [global],
  data: function () {
    return {
      showContact: false,
      showLoader: false,
      textLoader: 'Estamos cargando tu cotizacion'
    }
  },
  created () {
    let self = this
    // listen to show-loader event
    this.$nuxt.$on('show-loader', ({ text }) => {
      // console.log('HOME....')
      self.textLoader = text 
      self.showLoader = true
    })
    this.$nuxt.$on('hide-loader', () => { self.showLoader = false })
  },
  mounted () {
    // window.onbeforeunload = this.leaving
    //   /* eslint-disable */
    //   window.onbeforeunload = function (event) {
    //     var message = 'Important: Please click on \'Save\' button to leave this page.';
    //     if (typeof event == 'undefined') {
    //       event = window.event;
    //     }
    //     if (event) {
    //       event.returnValue = message;
    //       localStorage.removeItem('jwt')
    //       this.$store.commit('common/setStep', '1')
    //       this.$store.commit('common/setGoQuote', false)
    //     }
    //     return message;
    //   }
    //   if (window.ActiveXObject !== undefined) {
    //     this.isIE = true
    //   }
    //   if (!String.prototype.includes) {
    //     String.prototype.includes = function (search, start) {
    //       if (typeof start !== 'number') {
    //         start = 0
    //       }
    //
    //       if (start + search.length > this.length) {
    //         return false
    //       } else {
    //         return this.indexOf(search, start) !== -1
    //       }
    //     }
    //   }
    //   if (!Array.prototype.includes) {
    //     Object.defineProperty(Array.prototype, 'includes', {
    //       value: function (searchElement, fromIndex) {
    //         if (this == null) {
    //           throw new TypeError('"this" is null or not defined')
    //         }
    //         // 1. Let O be ? ToObject(this value).
    //         var o = Object(this)
    //         // 2. Let len be ? ToLength(? Get(O, "length")).
    //         var len = o.length >>> 0
    //
    //         // 3. If len is 0, return false.
    //         if (len === 0) {
    //           return false
    //         }
    //
    //         // 4. Let n be ? ToInteger(fromIndex).
    //         //    (If fromIndex is undefined, this step produces the value 0.)
    //         var n = fromIndex | 0
    //
    //         // 5. If n ≥ 0, then
    //         //  a. Let k be n.
    //         // 6. Else n < 0,
    //         //  a. Let k be len + n.
    //         //  b. If k < 0, let k be 0.
    //         var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)
    //
    //         function sameValueZero (x, y) {
    //           return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y))
    //         }
    //         // 7. Repeat, while k < len
    //         while (k < len) {
    //           // a. Let elementK be the result of ? Get(O, ! ToString(k)).
    //           // b. If SameValueZero(searchElement, elementK) is true, return true.
    //           if (sameValueZero(o[k], searchElement)) {
    //             return true
    //           }
    //           // c. Increase k by 1.
    //           k++
    //         }
    //         // 8. Return false
    //         return false
    //       }
    //     })
    //  
  },
  methods: {
    // leaving () {
      // this.verifyData = true
    //   if (this.$route.path === '/paso/cotiza' || this.$route.path === '/paso/pago') {
    //     return 'Estás seguro de abandonar el proceso de seguro de vida con devolución'
    //   }
    // },
    backPage () {
      this.$router.back()
    },
    goQuote (canal) {
      let makePath = (canal === 'SEGURO_UNIVERSITARIO') ? '/universitario' : (canal === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion' : (canal === 'PROTECCION_SEGURA') ? '/proteccion-segura' : (canal === 'AHORRO_SEGURO') ? '/ahorro-seguro' : '/vida-con-devolucion'
      this.$nuxt.$router.push({ path: makePath })
    },
    call () {
      window.dataLayer.push({
        'event': 'HS llamar',
        'category': 'UI :: Header',
        'action': 'Click',
        'label': 'Llamar'
      })
    },
    write () {
      window.dataLayer.push({
        'event': 'HS escribir',
        'category': 'UI :: Header',
        'action': 'Click',
        'label': 'Escribir'
      })
    },
    writeChat () {
      this.$amplitude.getInstance().logEvent(
      'WSP Consultado',
        {
          'Producto Consultado': 'VIDA',
          'Sub Producto Consultado': this.$store.state.common.channel,
          'Etapa de Funnel': this.$route.path,
        }
      )
     window.dataLayer.push({
        'event': 'Chat WhatsApp',
        'category': 'UI :: Footer',
        'action': 'Click',
        'label': 'redirigiendo al whatsApp'
      })
    }
  },
  destroyed () {
    this.$nuxt.$off('show-loader')
    this.$nuxt.$off('hide-loader')
  },
  components: {
    'header-is': Header,
    'footer-is': Footer,
    Loader
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(21px);
  opacity: 0;
}
</style>
