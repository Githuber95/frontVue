<template lang="pug">
  section#ibk.ibk.vida-con-devolucion-is
    loader(v-if="showLoader" :info="textLoader")
    main
      div.box-banner.vale(v-if="(showBanner || ($store.state.common.subchannel).split('_VALE_')[0] === 'IBK_PROMOCION' || $store.state.common.subchannel === 'IBK_CROSS') && $route.path === '/interbank/paso/cotiza'")
        b-row#banner-tv.justify-content-start.d-lg-none
          b-col.imagen.text-right.text-lg-center.px-0(cols="2" md="1")
            img(src="@/static/media/interbank/home/vale_40.svg" alt="vale 80 interbank" style="width: 3rem;")
          // Desktop
          b-col.texto.text-left.pl-3.pr-sm-3.pl-lg-4.px-1.pl-sm-3.px-md-3.py-1.pr-xl-0(cols="9" md="10" lg="11" xl="11")
            p.text-white ¡Gana vales o cuota gratis!. <br> Más info <a href="/seguro-de-vida/interbank/tyc" class="omnes-semibold d-inline">aquí.</a>
          b-col.close.pr-1(cols="1" @click="showBanner = false")
            span X  
      // Component HEADER
      header.py-0.py-sm-2
        b-container
          b-row
            b-col.text-left.my-2(cols="10" @click="goQuote")
              img.logo.cursor-pointer(v-if="$store.state.common.channel == 'ENDOSOS'" src="@/static/media/endosos/logo_endosos.svg" alt='desgravamen devolucion' style="width: 18rem"  )
              img.logo.cursor-pointer(v-else src="@/static/media/images/logo_interbank.svg" alt='logo seguro de vida')
            b-col.mt-2.text-lg-right(cols="2")
              span.text-primary.omnes-semibold.d-none.d-xl-inline.mr-2(@click="showContact = !showContact"   style="cursor: pointer;") Ayuda
              img.telefono(src="@/static/media/icons/telefono.svg" alt='llamara algún contacto' @click="showContact = !showContact"  style="cursor: pointer;")
      nuxt
      transition.gg(name="slide-fade")
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
      div.alerta.d-none.d-lg-block(v-if="(($store.state.common.subchannel).split('_VALE_')[0] === 'IBK_PROMOCION' || $store.state.common.subchannel === 'IBK_CROSS') && showAlert && $route.path === '/interbank/paso/cotiza'")
        b-row
          b-col(cols="10")
            a(href="/seguro-de-vida/interbank/tyc" target="_blank" v-if="($store.state.common.subchannel).split('_VALE_')[1] === '80'")
              img.call.pr-1.w-100(src="@/static/media/common/cotiza/mensaje_ibk_promocion_80.svg" alt="Mensaje de vale 80 interbank")
            a(href="/seguro-de-vida/interbank/cross/tyc" target="_blank" v-else)
              img.call.pr-1.w-100(src="@/static/media/common/cotiza/mensaje_ibk_promocion_100.svg" alt="Mensaje de vale 40 interbank")
          b-col.close.pr-1(cols="1" )
            span(@click="setAlert") X
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
      showAlert: true,
      count: 0,
      showBanner: true,
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
    this.$nuxt.$on('show-alert', () => {
      self.showAlert = true
    })
    this.$nuxt.$on('hide-alert', () => {
      self.showAlert = false
    })
  },
  methods: {
    leaving () {
      // this.verifyData = true
      if (this.$route.path === '/paso/cotiza' || this.$route.path === '/paso/pago') {
        return 'Estás seguro de abandonar el proceso de seguro de vida con devolución'
      }
    },
    setAlert() {
      this.showAlert = !this.showAlert
      this.count = 1
    },
    backPage () {
      this.$router.back()
    },
    goQuote () {
      if (this.$route.path === '/interbank/paso/cotiza') {
        let goPath = (this.$store.state.common.subchannel === 'ENDOSOS_MULTIBANCOS') ? '/endoso-con-devolucion' : (this.$store.state.common.subchannel == 'ENDOSOS') ? '/endosos' : ((this.$store.state.common.subchannel).split('_VALE_')[1] === '100') ? '/interbank/promocion' : (this.$store.state.common.subchannel === 'IBK_CROSS') ? '/interbank/cross'  : '/interbank'
        this.$nuxt.$router.push({ path: goPath })
      } else {
        let goPath = (this.$store.state.common.subchannel === 'ENDOSOS_MULTIBANCOS') ? '/endoso-con-devolucion/paso/cotiza' : (this.$store.state.common.subchannel == 'ENDOSOS') ? '/endosos/paso/cotiza' : '/interbank/paso/cotiza'
        this.$nuxt.$router.push({ path: goPath })
      }
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
