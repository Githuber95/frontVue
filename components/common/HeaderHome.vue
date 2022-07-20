<template lang="pug">
  header(ref="home-box")
    div.box-banner(v-if="showBanner" :class="[(event === 'cyber') ? 'cyber' : (event === 'promocion' || event === 'vale' || event === 'pandemia') ? 'vale' : (event === 'blackweek') ? 'navidad' : '' ]")
      b-row#banner-tv.justify-content-start.align-items-lg-center
        b-col.imagen.text-center.text-sm-center.px-0(cols="2" md="2" lg="1")
          img.mt-3.mt-lg-2(v-if="event === 'vale'"  src="@/static/media/seguro_vida/home/vale_virtual.png" alt="vale virtual")
          //- img.w-100(v-if="event === 'promocion'" src="@/static/media/seguro_vida/home/cyber_interseguro.svg" alt="promocion flash seguro de vida")
          img.w-100(v-if="event === 'promocion'" src="@/static/media/seguro_vida/home/vale_virtual.png" alt="promocion flash seguro de vida")
          //- img(v-if="event === 'pandemia'" src="@/static/media/seguro_vida/home/pandemia.svg" alt="incluimos pandemia coronaviruss")
          img.mt-3.mt-lg-4(v-if="event === 'cyber'" src="@/static/media/seguro_vida/home/cyber_interseguro.svg" alt="cyber interseguro")
          //- img.mt-3.mt-lg-2(v-if="event === 'blackweek'" src="@/static/media/seguro_vida/home/cintillo_navidad.png" alt="navidad interseguro")
        b-col.texto.text-left.pr-sm-3.pl-4.pr-0.pl-sm-3.px-md-3.pl-lg-5.pr-lg-0(v-if="event === 'promocion'" cols="9" md="10" lg="10")
          //- p.omnes-medium.text-white ¡Promoción Flash! <br>Hasta 15% de dscto + Vale virtual de S/80, <br>exclusivo para compras en canal WEB.&nbsp;&nbsp;
          p.omnes-semibold.text-white <br>Vale virtual de S/100 + Hasta 15% de dscto.<br><span class="omnes-medium"> en todos nuestros planes y durante toda la vigencia de tu seguro solo canal WEB.&nbsp;&nbsp;</span>
            a(target="_blank" href="/seguro-de-vida/tyc" style="cursor: pointer;") Términos y condiciones aquí
          //- Counter(diahasta="10" :mesHasta="4" :anio="2022")
        //- b-col.texto.text-left.pl-3.pr-0.pr-sm-3.pl-lg-5(v-if="event === 'cyber'" cols="9" md="10" lg="11")
          p.omnes-medium.mb-1.mb-lg-3(v-if="canal == 'WEB'") ¡Volvimos con el Cyber! Aprovecha hasta <br>15% de dscto. durante toda la vigencia de <br> tu Seguro de Vida con Devolución
          p.omnes-medium.mb-1.mb-lg-3(v-if="canal == 'SEGURO_UNIVERSITARIO'") ¡Volvimos con el Cyber! Aprovecha hasta <br>15% de dscto. durante toda la vigencia de <br> tu  Seguro Universitario
          p.omnes-medium.mb-1.mb-lg-3(v-if="canal == 'AHORRO_JUBILACION'") ¡Volvimos con el Cyber! Aprovecha hasta <br>15% de dscto. durante toda la vigencia de <br> tu  Ahorro Jubilaci&oacute;n
          p.omnes-medium.mb-1.mb-lg-3(v-if="canal == 'PROTECCION_SEGURA'") ¡Volvimos con el Cyber! Aprovecha hasta <br>15% de dscto. durante toda la vigencia de <br> tu Protecci&oacute;n Segura
          p.omnes-medium.mb-1.mb-lg-3(v-if="canal == 'AHORRO_SEGURO'") ¡Volvimos con el Cyber! Aprovecha hasta <br>15% de dscto. durante toda la vigencia de <br> tu Ahorro Seguro
        // NAVIDAD
        //- b-col.texto.text-left.pl-3.pr-0.pr-sm-3.pl-lg-2(v-if="event === 'blackweek'" cols="7" md="9" lg="9")
          p.omnes-medium.mb-1.mb-lg-3(v-if="canal == 'WEB'") ¡Extendimos el dscto. de hasta 15% por pocos días! <br> <span class="d-none d-lg-block my-0"> y participa del sorteo de 2 Smart TV 50’’ y 3 Nintendo Switch</span>
          p.omnes-medium.mb-1.mb-lg-3(v-if="canal == 'SEGURO_UNIVERSITARIO'") ¡Extendimos el dscto. de hasta 15% por pocos días! <br> <span class="d-none d-lg-block my-0"> y participa del sorteo de 2 Smart TV 50’’ y 3 Nintendo Switch</span>
          p.omnes-medium.mb-1.mb-lg-3(v-if="canal == 'AHORRO_JUBILACION'") ¡Extendimos el dscto. de hasta 15% por pocos días! <br> <span class="d-none d-lg-block my-0"> y participa del sorteo de 2 Smart TV 50’’ y 3 Nintendo Switch</span>
          p.omnes-medium.mb-1.mb-lg-3(v-if="canal == 'PROTECCION_SEGURA'") ¡Extendimos el dscto. de hasta 15% por pocos días! <br> <span class="d-none d-lg-block my-0"> y participa del sorteo de 2 Smart TV 50’’ y 3 Nintendo Switch</span>
          p.omnes-medium.mb-1.mb-lg-3(v-if="canal == 'AHORRO_SEGURO'") ¡Extendimos el dscto. de hasta 15% por pocos días! <br> <span class="d-none d-lg-block my-0"> y participa del sorteo de 2 Smart TV 50’’ y 3 Nintendo Switch</span>
          Counter(diaHasta="24" :mesHasta="4" :anio="2022")
        //- b-col.texto.text-left.pr-sm-3.px-1.pl-sm-3.px-md-3.pl-lg-4(v-if="event === 'vale'" cols="9" md="10" lg="11")
          p.omnes-medium(v-if="canal == 'WEB'") ¡Promoción Flash! Gana un vale virtual de S/ 70 <br>por la compra de tu Seguro de Vida con Devoluci&oacute;n <br> entre el 20 y 21 de noviembre
            a(target="_blank" href="https://www.interseguro.pe/seguro-de-vida/tyc") Ver más info
          p.omnes-medium(v-else-if="canal == 'SEGURO_UNIVERSITARIO'") ¡Gana sin sorteos un vale virtual de consumo de S/70 <br>por la compra de tu Seguro Universitario <br>entre el 20 y 21 de noviembre!
            a(target="_blank" href="https://www.interseguro.pe/seguro-de-vida/tyc") Ver más info
          p.omnes-medium(v-else-if="canal == 'AHORRO_JUBILACION'") ¡Gana sin sorteos un vale virtual de consumo de S/70 <br>por la compra de tu Ahorro Jubilación <br>entre el 20 y 21 de noviembre!
            a(target="_blank" href="https://www.interseguro.pe/seguro-de-vida/tyc") Ver más info
          p.omnes-medium(v-else-if="canal == 'PROTECCION_SEGURA'") ¡Gana sin sorteos un vale virtual de consumo de S/70 <br>por la compra de tu Protección Segura <br>entre el 20 y 21 de noviembre!
            a(target="_blank" href="https://www.interseguro.pe/seguro-de-vida/tyc") Ver más info
          p.omnes-medium(v-else-if="canal == 'AHORRO_SEGURO'") ¡Gana sin sorteos un vale virtual de consumo de S/70 <br>por la compra de tu Ahorro Seguro <br>entre el 20 y 21 de noviembre!
            a(target="_blank" href="https://www.interseguro.pe/seguro-de-vida/tyc") Ver más info
          Counter(diaHasta="24" :mesHasta="4" :anio="2022")
        //- b-col.texto.text-left.pr-sm-3.px-1.py-1.pl-sm-3.px-md-3.pl-lg-4(v-if="event === 'pandemia'" cols="9" md="10" lg="11")
          p.mb-0 <span class="omnes-semibold">¡GRATIS! </span> Prueba r&aacute;pida a domicilio <br>
          p.mt-0.align-items-center.d-flex
            img.pr-1(src="@/static/media/seguro_vida/home/cronometro_blanco.svg" alt="contador" style="width: 1.2rem")
            | ¡Quedan pocas horas! Más info&nbsp;<a href="/seguro-de-vida/vida-con-devolucion/promocion/tyc" class="omnes-semibold d-inline">aquí.</a>
        b-col.close.pr-1(cols="1" @click="$parent.showBanner = !$parent.showBanner")
          span X  
    b-container.logo-menu.py-0.py-sm-2.py-lg-0
      b-row#main-row-container
        b-col.text-lg-right.p-0(cols="12")
          b-navbar(toggleable="xl")
            b-navbar(toggleable='xl' type='dark')
              b-navbar-brand(href='#' @click="goQuote($route.path)")
                img.logo(v-if="canal === 'SEGURO_UNIVERSITARIO'" v-lazy-load data-src="@/static/media/images/logo_seguro_universitario.svg" alt="logo seguro universitario" )
                img.logo(v-else-if="canal === 'AHORRO_JUBILACION'" v-lazy-load data-src="@/static/media/images/logo_jubilacion.svg" alt="logo seguro ahorro jubilacion" style="cursor:pointer;width:272px;height:20px;")
                img.logo(v-else-if="canal === 'PROTECCION_SEGURA'" v-lazy-load data-src="@/static/media/images/logo_proteccion_segura.svg" alt="logo seguro de proteccion segura" style="cursor:pointer;width:272px;height:20px;")
                img.logo(v-else-if="canal === 'AHORRO_SEGURO'" v-lazy-load data-src="@/static/media/images/logo_ahorro_seguro.svg" alt="logo seguro de ahorro seguro" style="cursor:pointer;width:272px;height:20px;")
                img.logo(v-else-if="canal === 'ENDOSOS'" v-lazy-load data-src="@/static/media/images/logo_endoso_con_devolucion.svg" alt="logo endoso con devolucion")
                img.logo(v-else v-lazy-load data-src="@/static/media/images/logo_seguro_de_vida.svg" alt="logo seguro de vida" style="cursor:pointer;width:272px;height:20px")
              b-navbar-toggle(target='nav-collapse')
              b-collapse#nav-collapse(is-nav='')
                b-row.d-xl-none
                  div.text-right.w-100.pt-3
                    img.image-9.text-right(@click="deleteClass" src='https://uploads-ssl.webflow.com/5b29b333e01a7071fadb2f1c/5b5f46206abb673bc5374fdb_icon-close.svg', width='40', alt="icon close" style="cursor: pointer;width: 2.5rem;")
                  b-col(cols="11" sm="6" md="6" lg="4")
                    img.logo.mt-4.mb-5.w-100(src="@/static/media/images/logo_blanco_seguro_de_vida.svg" alt="logo interseguro seguro de vida con devolucion" @click="goQuote($route.path)")
                b-navbar-nav
                  b-nav-item.d-none.d-lg-flex(href='' @click="goScroll('concepto', '¿Cómo funciona?', 'desktop')") ¿Cómo funciona?
                  b-nav-item.d-lg-none(href='' @click="goScroll('concepto', '¿Cómo funciona?', 'mobile')") ¿Cómo funciona?
                  b-nav-item.d-none.d-lg-flex(href='' @click="goScroll('beneficios', 'Nuestros beneficios', 'desktop')") Nuestros beneficios
                  b-nav-item.d-lg-none(href='' @click="goScroll('beneficios', 'Nuestros beneficios', 'mobile')") Nuestros beneficios
                  b-nav-item.d-none.d-lg-flex(href='' @click="goScroll('testimonios', 'Testimonios', 'desktop')") Testimonios
                  b-nav-item.d-lg-none(href='' @click="goScroll('testimonios', 'Testimonios', 'mobile')") Testimonios
                  b-nav-item.d-lg-none(href='' @click="goScroll('consulta', 'Preguntas frecuentes', 'mobile')") Preguntas frecuentes
                  b-nav-item.d-none.d-xl-block(:href="`https://api.whatsapp.com/send?phone=51933559693`" target="_blank" @click="goAmplitudeWsp()")
                    b-row.call#call
                      b-col.px-0(cols="3")
                        img(v-lazy-load data-src="@/static/media/seguro_vida/home/whatsapp.svg" alt="contacto whatsapp seguro de vida")
                      b-col.pl-2(cols="9")
                        p.mb-0.text-primary.lh-1 Escríbenos
                        p.mb-0.text-primary.lh-1.omnes-medium 933559693
                  b-nav-item.d-none.d-xl-block(href='' @click="goScroll('cotiza', 'mobile')")
                    b-button#cta_cotizar.d-none.omnes-regular(variant="dark") COTIZAR      
                hr.d-xl-none
                b-row.mt-4.mb-2.d-xl-none
                  b-col(cols="12")
                    h3.text-light.pl-0 S&iacute;guenos en:
                  b-col.my-3(cols="8" sm="4" lg="3")
                    .box-redes
                      span
                        a(href='https://www.facebook.com/interseguro/')
                          img(v-lazy-load data-src="@/static/media/icons/footer/facebook.svg" alt="facebook")
                      span
                        a(href='https://www.linkedin.com/company/interseguro-aseguradora/')
                          img(v-lazy-load data-src="@/static/media/icons/footer/linkedin.svg" alt="linkedin")
                      span
                        a(href='https://www.interseguro.pe/blog/')
                          img(v-lazy-load data-src="@/static/media/icons/footer/blogger.svg" alt="blog")
                      span
                        a(href='https://www.instagram.com/interseguroperu/')
                          img(v-lazy-load data-src="@/static/media/icons/footer/instagram.svg" alt="instagram")
    b-modal#modalBeneficiosPromocion(static centered hide-footer hide-header no-close-on-esc no-close-on-backdrop size="xl")
      b-container.mt-1.mt-xl-4
        b-row(align-center)
          b-col(cols="12").d-none.d-xl-block
            img.close._2(@click="hideModal('modalBeneficiosPromocion')" src="@/static/media/icons/cerrar-magenta.svg" alt="icon close" style="cursor: pointer;z-index: 99")
        modal-beneficio
        div.button.text-center.mt-3.d-xl-none
          b-button(variant="dark" @click="hideModal('modalBeneficiosPromocion')") ENTENDIDO                    
</template>
<script>
import modalBeneficio from '@/components/modals/Beneficios'
import Counter from '@/components/common/Counter'

export default {
    props: ['showBanner', 'event'],
  data: function () {
    return {
      canal: ''
    }
  },
  mounted() {
    this.canal = process.env.subChannel[this.$store.state.common.subchannel]
  },
  methods: {
    showModal (modalId) {
      this.$nuxt.$emit('bv::show::modal', modalId)
    },
    hideModal (modalId) {
      this.$nuxt.$emit('bv::hide::modal', modalId)
    },
    deleteClass () {
      this.$root.$emit('bv::toggle::collapse', 'nav-collapse')
      var ref = this.$refs['home-box'].offsetTop
      window.scrollTo(0, ref)
    },
    backPage () {
      this.$router.back()
    },
    goQuote (url) {
      if (url === '/paso/pago') {
        this.$nuxt.$router.push({ path: '/paso/cotiza' })
      } else {
        let canal = this.canal
        let pathFinal = (canal === 'IBK') ? '/interbank' :  (canal === 'AHORRO_JUBILACION') ? '/ahorrojubilacion' : (canal === 'AHORRO_SEGURO') ? '/ahorro-seguro' : (canal === 'PROTECCION_SEGURA') ? '/proteccionsegura' : (canal === 'SEGURO_UNIVERSITARIO') ? '/universitario' : '/vida-con-devolucion'
        this.$nuxt.$router.push({ path: pathFinal })
      }
    },
    goScroll (goSection, texto, toDevice) {
      this.$amplitude.getInstance().logEvent(
        'Click en Botones',
        {
          'Tipo de Boton': 'Direccionamiento',
          'Nombre de la Seccion Vista': goSection,
          'Nombre del Boton': texto,
          'Producto Consultado': 'VIDA',
          'Sub Producto Consultado': this.$store.state.common.channel,
        }
      )
      this.$nuxt.$emit('scroll-me-to', { section: goSection, device: toDevice })
      if (goSection === 'cotiza') {
        window.dataLayer.push({
          'event': 'PP cotizar home desktop',
          'category': 'UI :: Home',
          'action': 'Header Button',
          'label': 'Sección de cotizar'
        })
      } else {
        window.dataLayer.push({
          'event': 'VC PP informacion del producto',
          'category': 'UI :: Home',
          'action': 'Header Click',
          'label': texto
        })
      }
    },
    goAmplitudeWsp () {
      this.$amplitude.getInstance().logEvent(
      'WSP Consultado',
        {
          'Producto Consultado': 'VIDA',
          'Sub Producto Consultado': this.$store.state.common.channel,
          'Etapa de Funnel': this.$route.path,
        }
      )
    }
  },
  components: {
    modalBeneficio
  }
}
</script>

<style lang="scss" scoped>
  .navbar-light { width: 100%; padding: 0; }
  .navbar-dark {
    padding: 7px 14px; width: 100%;
    .navbar-toggler-icon {
      outline: none;
    }
  }
  .navbar-toggler {
    background: #0855c4;
    border: none;
    padding: 0;
    width: 36px;
    height: 32px;
    &:focus {
      outline: none;
    }
  }
  .navbar-dark .navbar-nav .nav-link {
    color: #454A6C;
    text-align: center;
  }
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

  @media (min-width: 992px) {
    header {
      img {  margin-left: 0; }
    }
    .navbar-light {
      width: 100%;
      position: relative;
    }
  }


</style>
