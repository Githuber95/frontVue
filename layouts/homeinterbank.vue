<template lang="pug">
  section#home-box.ibk(ref="home-box")
    loader(v-if="showLoader" :info="textLoader")
    main
      // Component HEADER
      header
        div.box-banner.cyber(v-if="showBanner")
          b-row#banner-tv.justify-content-start
            b-col.imagen.text-right.text-lg-center.px-0(cols="2" md="1")
              //- img(src="@/static/media/seguro_vida/home/cyber_interseguro.svg" alt="cyber interseguro")
              img(src="@/static/media/seguro_vida/home/cyber_interbank.svg" alt="vale virtual")
              //- img(src="@/static/media/seguro_vida/home/pandemia.svg" alt="incluimos pandemia coronaviruss")
            // Desktop
            b-col.texto.text-left.pl-3.pr-sm-3.pl-lg-4.px-1.pl-sm-3.px-md-3.pr-xl-0(cols="9" md="10" lg="11" xl="11")
              //- p.omnes-medium No tenemos exclusiones a causa de pandemias, <br>a menos que se tenga previo diagnóstico y <br>conocimiento al momento de la contratación.
              //- p.omnes-medium ¡Gana sin sorteos un vale virtual de consumo de S/50 <br>por la compra de tu seguro de vida con devolución <br>con suma asegurada desde 100,000 con un porcentaje de 125% o 135% entre el <br>21 y 27 de septiembre!
                a(target="_blank" href="https://www.interseguro.pe/seguro-de-vida/tyc") Ver más info
              p.omnes-medium.text-white ¡Solo por pocos d&iacute;as! Hasta 15% de dscto. en <br> nuestro seguro de Vida con Devoluci&oacute;n hasta <br>el 27 de septiembre
            b-col.close.pr-1(cols="1" @click="showBanner = false")
              span X  
        b-container.logo-menu.py-0.py-sm-2.py-lg-0
          b-row#main-row-container
            b-col.text-lg-right.p-0(cols="12")
              b-navbar(toggleable="xl")
                b-navbar(toggleable='xl' type='dark')
                  b-navbar-brand(href='#' @click="goQuote")
                    img.logo(src="@/static/media/interbank/home/logo_interbank.png" alt='logo seguro de vida con devolución interbank' style="cursor:pointer;")
                  b-navbar-toggle(target='nav-collapse')
                  b-collapse#nav-collapse(is-nav='')
                    b-row.d-xl-none
                      div.text-right.w-100.pt-3
                        img.image-9.text-right(@click='deleteClass' src='https://uploads-ssl.webflow.com/5b29b333e01a7071fadb2f1c/5b5f46206abb673bc5374fdb_icon-close.svg' width='40' alt="icon close" style="cursor: pointer;width: 2.5rem;")
                      b-col(cols="11" sm="6" md="6" lg="4")
                        img.logo.mt-4.mb-5.w-100(src="@/static/media/images/logo_blanco_vida_devolucion.png" alt='logo interbank seguro de vida devolucion' @click="goQuote")
                    b-navbar-nav
                      b-nav-item.d-none.d-lg-flex(href='' @click="goScroll('concepto', '¿Cómo funciona?', 'desktop')") ¿Cómo funciona?
                      b-nav-item.d-lg-none(href='' @click="goScroll('concepto', '¿Cómo funciona?', 'mobile')") ¿Cómo funciona?
                      b-nav-item.d-none.d-lg-flex(href='' @click="goScroll('beneficios', 'Nuestros beneficios', 'desktop')") Nuestros beneficios
                      b-nav-item.d-lg-none(href='' @click="goScroll('beneficios', 'Nuestros beneficios', 'mobile')") Nuestros beneficios
                      b-nav-item.d-none.d-lg-flex(href='' @click="goScroll('testimonios', 'Testimonios', 'desktop')") Testimonios
                      b-nav-item.d-lg-none(href='' @click="goScroll('testimonios', 'Testimonios', 'mobile')") Testimonios
                      // b-nav-item.d-none.d-lg-flex(href='' @click="goScroll('consulta', 'Preguntas frecuentes', 'desktop')") PREGUNTAS FRECUENTES
                      b-nav-item.d-lg-none(href='' @click="goScroll('consulta', 'Preguntas frecuentes', 'mobile')") Preguntas frecuentes
                      b-nav-item.d-none.d-xl-block(:href="`https://api.whatsapp.com/send?phone=51933559693`" target="_blank")
                        b-row.call#call
                          b-col.px-0(cols="3")
                            h2(style="position: absolute; color: transparent;") IBK
                            img(src="@/static/media/seguro_vida/home/whatsapp.svg" alt="whatsapp seguro de vida interbank")
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
                              img(src="@/static/media/icons/footer/facebook.svg" alt='facebook')
                          span
                            a(href='https://www.linkedin.com/company/interseguro-aseguradora/')
                              img(src="@/static/media/icons/footer/linkedin.svg" alt='linkedin')
                          span
                            a(href='https://www.interseguro.pe/blog/')
                              img(src="@/static/media/icons/footer/blogger.svg" alt='blog')
                          span
                            a(href='https://www.instagram.com/interseguroperu/')
                              img(src="@/static/media/icons/footer/instagram.svg" alt='instagram')
      //- // BODY
      nuxt(:class="[showBanner ? 'pt-box-banner' : '']")
      // Component FOOTER
    div.writeme(v-if="$route.path == '/paso/pago'")
      a(target="_blank" :href="`https://api.whatsapp.com/send?phone=51933559693`" @click="writeChat" rel="noopener")
        img.call.d-lg-none(style="width:60px;" :class="[$route.path == '/paso/cotiza' || $route.path == '/paso/pago'  ? 'pasos' : '']" src="@/static/media/icons/whatsapp_icon.svg" alt="Escribir algún contacto")
        img.call.d-none.d-lg-block.pasos(src="@/static/media/common/home/whatsapp.svg"   alt="Escribir algún contacto")
    footer-is(steps="false")
</template>
<script>
import Header from '@/components/common/interbank/Header'
import Footer from '@/components/common/Footer'
import Loader from '@/components/common/Loader'
import global from '~/mixins/global.js'

export default {
  mixins: [global],
  data: function () {
    return {
      showContact: false,
      showLoader: false,
      showBanner: false,
      textLoader: '',
      flagImg: 1
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
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    deleteClass () {
      this.$root.$emit('bv::toggle::collapse', 'nav-collapse')
      var ref = this.$refs['home-box'].offsetTop
      window.scrollTo(0, ref)
    },
    handleScroll (event) {
      // console.log(this)
      // console.log(this.$children[1])
      if (event.target.scrollingElement.scrollTop > 50) {
        if (event.target.scrollingElement.scrollTop > (this.$children[1].$children[0].$refs['cotiza'].offsetHeight - 100)) {
          // mostrar CTA
          document.querySelectorAll('button[id=cta_cotizar]')[0].classList.remove('d-none')
          document.querySelectorAll('div[id=call]')[0].classList.add('d-none')
        } else {
          // ocultar CTA
          document.querySelectorAll('button[id=cta_cotizar]')[0].classList.add('d-none')
          document.querySelectorAll('div[id=call]')[0].classList.remove('d-none')
        }
      } else {
        // ocultar CTA
        document.querySelectorAll('button[id=cta_cotizar]')[0].classList.add('d-none')
        document.querySelectorAll('div[id=call]')[0].classList.remove('d-none')
      }
    },
    backPage () {
      this.$router.back()
    },
    goQuote () {
      // console.log('this.$route', this.$route)
      if (this.$route.path === '/vida-con-devolucion') {
        this.$nuxt.$router.push({ path: '/interbank' })
      } else {
        this.$nuxt.$router.push({ path: '/interbank/paso/cotiza' })
      }
    },
    goScroll (goSection, texto, toDevice) {
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
    window.removeEventListener('scroll', this.handleScroll, { passive: true })
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
