<template lang="pug">
  section#is.vida-con-devolucion-is
    loader(v-if="showLoader" :info="textLoader")
    main
      div.box-banner.vale.d-lg-none(v-if="showBanner || ((($store.state.common.subchannel).split('_')[0] === 'PROMOCION') )")
        b-row#banner-tv.justify-content-start
          b-col.imagen.text-center.text-lg-center.px-0(cols="4" md="1")
            img.w-100(src="@/static/media/common/cotiza/banner_cotiza-campania.svg" alt="vale 1ra cuota gratis seguro de vida")
          // Desktop
          b-col.texto.text-left(cols="7" md="10" lg="11" xl="11")
            p.omnes-medium.mb-0.text-white ¡Sólo por pocos días!
            Counter(diaHasta="24" :mesHasta="4" :anio="2022" style="position:initial")
            //- p.omnes-medium(v-if="canal == 'WEB'") ¡Volvimos con el Cyber! Aprovecha hasta 15% de dscto. durante toda la vigencia de tu Seguro de  <br>Vida con Devolución
            //- p.omnes-medium(v-if="canal == 'SEGURO_UNIVERSITARIO'") ¡Volvimos con el Cyber! Aprovecha hasta 15% de dscto. durante toda la vigencia de tu Seguro<br> Universitario
            //- p.omnes-medium(v-if="canal == 'AHORRO_JUBILACION'") ¡Volvimos con el Cyber! Aprovecha hasta 15% de dscto. durante toda la vigencia de tu Ahorro Jubilaci&oacute;n<br>
            //- p.omnes-medium(v-if="canal == 'PROTECCION_SEGURA'") ¡Volvimos con el Cyber! Aprovecha hasta 15% de dscto. durante toda la vigencia de tu <br>Protecci&oacute;n Segura
            //- p.omnes-medium(v-if="canal == 'AHORRO_SEGURO'") ¡Volvimos con el Cyber! Aprovecha hasta 15% de dscto. durante toda la vigencia de tu Ahorro Seguro <br>
          b-col.close.pr-1(cols="1" @click="showBanner = false")
            span X  
        b-row#banner-tv.justify-content-start.py-0
          //- b-col.imagen.px-0.text-center(cols="4" md="4" lg="2" xl="1")
          //-   img.pl-2.pl-md-0.py-md-3(src="@/static/media/seguro_vida/home/cintillo_hotsale.png" alt="hot sale interseguro")
          //- // Desktop
          //- b-col.texto.px-0.pl-xl-5.d-lg-block.d-xl-flex.align-items-center(cols="7" lg="10" xl="10")
          //-   p.omnes-medium.px-0.d-lg-none 70% de Devolucion en el 1er pago y <br>participa del sorteo de 1 PS4+1 silla gamer
          //-   p.omnes-medium.pl-xl-5.pr-xl-3.d-none.d-lg-block 70% de Devolucion en el primer pago y participa del sorteo de 1 PS4 + 1 silla gamer
          //-   // Counter(diahasta="10" :mesHasta="4" :anio="2022")
          //- b-col.close.pr-1(cols="1" @click="showBanner = false")
          //-   span X 
          b-col.imagen.text-center.text-sm-center.px-0(cols="2" md="2" lg="1")
            img(v-if="event === 'pandemia'" src="@/static/media/seguro_vida/home/pandemia.svg" alt="incluimos pandemia coronaviruss")
          b-col.texto.text-left.pr-sm-3.px-1.py-1.pl-sm-3.px-md-3.pl-lg-4(v-if="event === 'pandemia'" cols="9" md="10" lg="11")
            p.mb-0 <span class="omnes-semibold">¡GRATIS! </span> Prueba r&aacute;pida a domicilio <br>
            p.mt-0.align-items-center.d-flex
              img.pr-1(src="@/static/media/seguro_vida/home/cronometro_blanco.svg" alt="contador" style="width: 1.2rem")
              | ¡Quedan pocas horas! Más info&nbsp;<a href="/seguro-de-vida/vida-con-devolucion/promocion/tyc" class="omnes-semibold d-inline">aquí.</a>
          b-col.close.pr-1(cols="1" @click="$parent.showBanner = !$parent.showBanner")
            span X  
      // Component HEADER
      header.py-0.py-sm-2
        b-container
          b-row
            b-col.text-left.pl-3.pr-0.pr-sm-3.pl-lg-5.py-2.py-lg-0(cols="10" @click="goQuote()")
              //- img.logo(v-if=  "canal === 'WEB'" src="@/static/media/images/logo_seguro_de_vida.svg" alt="logo seguro de vida con devolución" style="cursor:pointer;")
              img.logo(v-if="canal === 'SEGURO_UNIVERSITARIO'" src="@/static/media/images/logo_seguro_universitario.svg" alt="logo seguro universitario" style="cursor:pointer;")
              img.logo(v-else-if="canal === 'AHORRO_JUBILACION'" src="@/static/media/images/logo_jubilacion.svg" alt="logo seguro ahorro jubilacion" style="cursor:pointer;")
              img.logo(v-else-if="canal === 'PROTECCION_SEGURA'" src="@/static/media/images/logo_proteccion_segura.svg" alt="logo seguro de proteccion segura" style="cursor:pointer;")
              img.logo(v-else-if="canal === 'AHORRO_SEGURO'" src="@/static/media/images/logo_ahorro_seguro.svg" alt="logo seguro de ahorro seguro" style="cursor:pointer;")
              img.logo(v-else-if="canal === 'ENDOSOS'" src="@/static/media/images/logo_endoso_con_devolucion.svg" alt="logo endoso con devolucion" style="cursor:pointer;")
              img.logo(v-else src="@/static/media/images/logo_seguro_de_vida.svg" alt="logo seguro de vida con devolución y otros" style="cursor:pointer;")
            b-col.mt-2.mt-lg-0.text-lg-right(cols="2")
              span.text-primary.omnes-semibold.d-none.d-xl-inline.mr-2(@click="showContact = !showContact"   style="cursor: pointer;") Ayuda
              img.telefono(src="@/static/media/icons/telefono.svg" alt="llamara algún contacto" @click="showContact = !showContact"  style="cursor: pointer;")
      nuxt
      transition(name="slide-fade")
        div.white-transparent(:class="[showContact ? 'bg-white' : '']" v-if="showContact")
          div.top
          b-container.pr-0
            b-row.mt-5(align-center)
              b-col(cols="3" sm="6" md="7")
              b-col(cols="9" sm="6" md="5")
                b-row
                  b-col.text-right.pr-0(cols="7" md="6" offset-lg="0" lg="9" offset-xl="1" xl="5" style="margin-top: 15px!important;")
                    div.border_text
                      a(target="_blank" href="tel:01500-0000" style="cursor: pointer; text-decoration: none;" @click="call")
                        h3.mt-1.d-lg-none Llámanos
                        h3.mt-1.d-none.d-lg-block &nbsp;(01)&nbsp;500-0000&nbsp;&nbsp;Opción&nbsp;3
                  b-col.text-xs-left(cols="4" md="6" lg="3" xl="4")
                    a(target="_blank" href="tel:01500-0000" @click="call")
                      img.call(src="@/static/media/icons/llamada.svg" alt="Llamar algún contacto" @click="showContact = !showContact"  style="cursor: pointer")
            b-row.mt-4(align-center)
              b-col(cols="3" sm="6" md="7")
              b-col(cols="9" sm="6" md="5")
                b-row
                  b-col.text-right.pr-0(cols="7" md="6" offset-lg="0" lg="9" offset-xl="1" xl="5" @click="write" style="margin-top: 15px!important;")
                    div.border_text
                      a(target="_blank" :href="`https://api.whatsapp.com/send?phone=51933559693`" style="cursor: pointer; text-decoration: none;" @click="write")
                        h3.mt-1.d-lg-none Escríbenos
                        h3.mt-1.d-none.d-lg-block +51 933559693
                  b-col.text-xs-left(cols="4" md="6" lg="3" xl="6")
                    a(target="_blank" :href="`https://api.whatsapp.com/send?phone=51933559693`" @click="write")
                      img.call(src="@/static/media/icons/whatsapp.svg" alt="Escribir algún contacto" @click="showContact = !showContact"  style="cursor: pointer")
      // Component FOOTER
      //- div.alerta.d-none.d-lg-block(v-if="(($store.state.common.subchannel).split('_')[0] === 'PROMOCION') && showAlert && !count && $route.path === '/paso/cotiza'")
      div.alerta.d-none.d-lg-block(v-if="(($store.state.common.subchannel).split('_')[0] === 'PROMOCION')  && showAlert && !count && $route.path === '/paso/cotiza'")
        b-row.justify-content-center
          b-col.text-center(cols="10")
            a(href="/seguro-de-vida/tyc" target="_blank")
              img.call.pr-1.w-75(src="@/static/media/common/cotiza/mensaje_descuento.svg" alt="primera cuota gratis seguro de vida")
          b-col.close.pr-1(cols="1" )
            span(@click="setAlert") X
      div.writeme(v-if="$route.path == '/paso/pago' || $route.path == '/paso/cotiza'")
        div
          div#idCalMov
            img.call.d-lg-none(src="@/static/media/icons/llamada-circle.svg" :class="[$route.path == '/paso/cotiza' || $route.path == '/paso/pago'  ? 'pasos-call' : '']" alt="Llamar algún contacto" style="width: 48px !important;" @click="setSrcContactOption3")
          div#idCalOp3Mov(style="display: none")
            a(target="_blank" href="tel:01500-0000" @click="call")
              img.call.d-lg-none(src="@/static/media/icons/llamanos-opcion3-movil.svg" :class="[$route.path == '/paso/cotiza' || $route.path == '/paso/pago'  ? 'pasos-call' : '']" alt="Llamar algún contacto" style="width: 285px !important;' }" @click="setSrcContactOption3")
          div.call.d-none.d-lg-block
            a(target='_blank' title='Llamar algún contacto' href='tel:01500-0000' @click='call')
              div#idCalDstpk
          //div
          //  img.call.d-none.d-lg-block(src="@/static/media/icons/llamada-desktop.svg" alt="Llamar algún contacto" style="width: 12.7rem; bottom: 10.6rem; right: 1.35rem; height: 5rem;")
        a(target="_blank" :href="`https://api.whatsapp.com/send?phone=51933559693`" @click="writeChat")
          img.call.d-lg-none(style="width:48px;" :class="[$route.path == '/paso/cotiza' || $route.path == '/paso/pago'  ? 'pasos' : '']" src="@/static/media/icons/whatsapp_icon.svg" alt="Escribir algún contacto")
          img.call.d-none.d-lg-block.pasos(src="@/static/media/common/home/whatsapp.svg" alt="Escribir algún contacto")
    footer-is(steps="false")
</template>
<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Loader from '@/components/common/Loader'
import Counter from '@/components/common/Counter'
// import global from '~/mixins/global.js'

export default {
  // mixins: [global],
  data: function () {
    return {
      canal: this.$store.state.common.channel,
      event: '',
      count: 0,
      showAlert: false,
      showBanner: false,
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
  mounted () {
  },
  methods: {
    leaving () {
      // this.verifyData = true
      if (this.$route.path === '/paso/cotiza' || this.$route.path === '/paso/pago') {
        return 'Estás seguro de abandonar el proceso de seguro de vida con devolución'
      }
    },
    backPage () {
      this.$router.back()
    },
    setAlert() {
      this.showAlert = !this.showAlert
      this.count = 1
    },
    goQuote () {
      let canal = this.canal
      if (this.$route.path === '/paso/cotiza') {
        let makePath = (canal === 'SEGURO_UNIVERSITARIO') ? '/universitario' : (canal === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion' : (canal === 'PROTECCION_SEGURA') ? '/proteccion-segura' : (this.$store.state.common.subchannel === 'SIN_BENEFICIARIOS') ? '/ahorro-seguro/v2' : (canal === 'AHORRO_SEGURO') ? '/ahorro-seguro' : (($store.state.common.subchannel).split('_')[0] === 'PROMOCION') ? '/vida-con-devolucion/promocion' : '/vida-con-devolucion'
        this.$nuxt.$router.push({ path: makePath })
      } else {
        this.$nuxt.$router.push({ path: '/paso/cotiza' })
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
    },
    setSrcContactOption3 (){
      /*let idCalDstpk = document.getElementById("idCalDstpk");
      let idCalOp3Dstpk = document.getElementById("idCalOp3Dstpk");
      if (idCalDstpk.style.display === "none") {
          idCalDstpk.style.display = "block";
          idCalOp3Dstpk.style.display = "none";
      } else {
          idCalDstpk.style.display = "none";
          idCalOp3Dstpk.style.display = "block";
      }*/

      let idCalMov = document.getElementById("idCalMov");
      let idCalOp3Mov = document.getElementById("idCalOp3Mov");

      if (idCalMov.style.display === "none") {
          idCalMov.style.display = "block";
          idCalOp3Mov.style.display = "none";
      } else {
          idCalMov.style.display = "none";
          idCalOp3Mov.style.display = "block";
      }
    }
  },
  destroyed () {
    this.$nuxt.$off('show-loader')
    this.$nuxt.$off('hide-loader')
  },
  components: {
    'header-is': Header,
    'footer-is': Footer,
    Loader,
    Counter
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
#idCalDstpk { 
  cursor: pointer;
  width: 12.7rem; 
  height: 5rem;
  bottom: 10.25rem; 
  right: 1.45rem !important;
  background: url('../static/media/icons/llamada-desktop.svg');
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
  position: fixed;
}
#idCalDstpk:hover {
  width: 20rem; 
  height: 5rem;
  right: 1.4rem !important;
  bottom: 10.25rem; 
  background: url('../static/media/icons/llamanos-opcion3-desktop.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>


