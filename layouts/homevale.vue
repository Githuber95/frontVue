<template lang="pug">
  section#home-box
    loader(v-if="showLoader" :info="textLoader")
    main
      // Component HEADE
      header-is(:showBanner="showBanner" :event="'vale'")
      nuxt(:class="[showBanner ? 'pt-box-banner' : '']")
      // Component FOOTER
    div.writeme(v-if="$route.path == '/paso/pago'").d-none.d-xl-block
      a(target="_blank" :href="`https://api.whatsapp.com/send?phone=51933559693`" @click="writeChat" rel="noopener")
        img.call.d-lg-none(style="width:60px;" :class="[$route.path == '/paso/cotiza' || $route.path == '/paso/pago'  ? 'pasos' : '']" src="@/static/media/icons/whatsapp_icon.svg" alt="Escribir algún contacto")
        img.call.d-none.d-lg-block.pasos(src="@/static/media/common/home/whatsapp.svg"   alt="Escribir algún contacto")
    footer-is(steps="false")
</template>
<script>
import Header from '@/components/common/HeaderHome'
import Footer from '@/components/common/Footer'
import Loader from '@/components/common/Loader'
export default {
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
    handleScroll (event) {
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
    this.$nuxt.$off('-is')
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
    #nav-collapse {
      /*ul {*/
      /*  right: 10px;*/
      /*  align-items: center;*/
      /*}*/
    }
  }
</style>
