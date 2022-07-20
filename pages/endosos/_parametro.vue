<template lang="pug">
  div
    section#home(ref="home")
      b-container
        div.box-cotiza
          b-row.cotiza.pt-5(ref="cotiza")
            b-col.title.left.mt-lg-0(cols="12" lg="6" xl="7" order="1" order-lg="2")
              b-row.principal.justify-content-center.justify-content-lg-left
                b-col.pl-2.pl-xl-0.px-0.px-lg-0(cols="11" lg="12")
                  h1.omnes-medium.text-primary.lh-1.d-xl-none Obtén tu seguro <br> Vida Cash con devolución<br>  de <span class="omnes-semibold">hasta 150%</span> 
                  h1.omnes-medium.text-primary.lh-1.d-none.d-xl-block Obtén tu seguro <br> Vida Cash con <br>devolución de <span class="omnes-semibold">hasta 150%</span> 
            b-col.content.right.pl-lg-0(cols="12" lg="6" xl="5" order="2" order-lg="1")
              section.box-quote
                b-container
                  div.pila.bg-primary.animation-div
                    //- h2.text-white.omnes-medium Desde <span class="omnes-semibold">S/23 al mes</span>
                    h2.text-white.omnes-semibold Desde <span class="omnes-medium">S/23 al mes</span>
                  b-row.h-100
                    b-col(cols="12")
                      b-row
                        b-col.text-center(cols="12")
                          h3.text-primary.omnes-medium ¡Cotiza en solo 2 pasos!
                      b-row.justify-content-center.px-0
                        b-col.px-0(cols="12")
                          form-dni.mt-2
                      b-row.mt-2.mt-lg-3.mb-4.mb-lg-5
                        b-col.text-center
                          p.d-inline Con el respaldo del grupo:
                          img.d-inline.text-center.mt-lg-0.ml-2(style="width: 6.5rem;" src="@/static/media/seguro_vida/home/grupo_intercorp.svg" alt="respaldo de intercorp" stlye="width:104px;height:22px;")        
        b-row.concepto.d-flex.justify-content-center(ref="concepto")
          b-col.title.text-center(cols="12")
            b-row(align-h="center")
              b-col.px-md-3.px-lg-2(cols="12")
                h2.omnes-medium.text-primary  ¿Cómo funciona?
          b-col.content(cols="12")
            b-row.justify-content-center
              b-col.px-xl-0(cols="12" md="10" xl="4")
                b-row.content__row
                  b-col.text-right.pr-3(cols="4" xl="4")
                    img(src="@/static/media/interbank/home/compra_digital_seguro_vida.svg" alt="compra de forma digital de seguro desgravamen devolucion")
                  b-col.pr-0.pl-0(cols="7" lg="8" xl="7")
                    h3.text-black.omnes-medium 100% online
                    h4 Compra tu seguro <br> Vida Cash 100% online,<br> sin tramites ni papeleos
              b-col.px-xl-0(cols="12" md="10" xl="4")
                b-row.content__row
                  b-col.text-right.pr-3(cols="4" xl="4")
                    img(src="@/static/media/endosos/funciona-ahorro_seguro.svg" alt="beneficio ahorro asegurado")
                  b-col.pr-0.pl-0(cols="7" lg="8")
                    h3.text-black.omnes-medium Ahorro asegurado
                    h4 Al finalizar el pago de tu crédito <br>y el pago de tu seguro de vida cash <br>te devolveremos el monto de tu prima acumulada.
              b-col.px-xl-0(cols="12" md="10" xl="4")
                b-row.content__row
                  b-col.text-right.pr-3(cols="4" xl="4")
                    img(src="@/static/media/interbank/home/devolucion_seguro_vida.svg" alt="devolucion en tu seguro desgravamen devolucion")
                  b-col.pr-0.pl-0(cols="7" lg="8" xl="7")
                    h3.text-black.omnes-medium Devolución de hasta 150%
                    h4 Te devolvemos hasta el 150%  <br>de lo que pagaste de tu <br> seguro de Vida Cash <br><span>(ver términos y condiciones)</span>
        b-row.asistencia.bg-primary.py-lg-5(ref="beneficios")
          b-container
            b-row.pb-4.pb-xl-5
              b-col.text-center(cols="12")
                h2.omnes-medium.text-white Disfruta de nuestras Asistencias <br>gratuitas de hasta por S/300
          b-container.pb-5.pb-lg-3
            b-row(align-h="center")
              b-col.o-hidden.px-xl-0(cols="10" sm="8" md="7" lg="5" xl="12")
                b-carousel#asistenciaSeguro.d-xl-none(:interval="10000" indicators label-indicators="Selecciona un slide para mostrar")
                  b-carousel-slide(img-src="@/static/media/ahorro_seguro/home/asistencia_medica-ahorro_seguro.png" img-alt="comentarios seguro de vida con devolucion")
                    b-row.align-items-center.borde
                      b-col(cols="12")
                        h4.pb-2.omnes-semibold Asistencia Médica
                        p Envío de médico a domicilio <br>(Medicina general) por <span class="omnes-semibold">S/35</span>
                  b-carousel-slide(img-src="@/static/media/ahorro_seguro/home/asistencia_hogar-ahorro_seguro.png" img-alt="comentarios seguro de vida con devolucion")
                    b-row.align-items-center.borde
                      b-col(cols="12")
                        h4.pb-2.omnes-semibold Asistencia Hogar
                        p Envío de gasfitero, electricista, vidriero y cerrajero a domicilio por emergencia con cobertura hasta <span class="omnes-semibold">S/150</span>
                  b-carousel-slide(img-src="@/static/media/ahorro_seguro/home/asistencia_vial-ahorro_seguro.png" img-alt="comentarios seguro de vida con devolucion")
                    b-row.align-items-center.borde
                      b-col(cols="12")
                        h4.pb-2.omnes-semibold Asistencia Vial
                        p Traslado de vehículo en grúa por<br>  emergencia con cobertura hasta <br> <span class="omnes-semibold">S/300</span>
                  b-carousel-slide(img-src="@/static/media/ahorro_seguro/home/asistencia_mascota-ahorro_seguro.png" img-alt="comentarios seguro de vida con devolucion")
                    b-row.align-items-center.borde
                      b-col(cols="12")
                        h4.pb-2.omnes-semibold Asistencia Mascota
                        p Servicio de baño para mascota <br> por <span class="omnes-semibold">S/15</span>
                b-row#asistenciaSeguro.d-none.d-xl-flex
                  b-col(cols="3")
                    div.asistencia-medica
                      b-row.justify-content-center
                        b-col.borde(cols="10")
                          h4.pt-3.omnes-semibold Asistencia Médica
                          p Envío de médico a domicilio <br>(Medicina general) por <span class="omnes-semibold">S/35</span>
                  b-col(cols="3")
                    div.asistencia-hogar
                      b-row.justify-content-center
                        b-col.borde(cols="10")
                          h4.pt-3.omnes-semibold Asistencia Hogar
                          p Envío de gasfitero, electricista, vidriero y cerrajero a domicilio por emergencia con cobertura hasta <span class="omnes-semibold">S/150</span>
                  b-col(cols="3")
                    div.asistencia-vial
                      b-row.justify-content-center
                        b-col.borde(cols="10")
                          h4.pt-3.omnes-semibold Asistencia Vial
                          p Traslado de vehículo en grúa por<br>  emergencia con cobertura hasta <br> <span class="omnes-semibold">S/300</span>
                  b-col(cols="3")
                    div.asistencia-mascota
                      b-row.justify-content-center
                        b-col.borde(cols="10")
                          h4.pt-3.omnes-semibold Asistencia Mascota
                          p Servicio de baño para mascota <br> por <span class="omnes-semibold">S/15</span>
        b-row.testimonios.px-lg-0(ref="testimonios" v-if="showSections")
          b-col.title.text-center(cols="12")
            b-row.text-white(align-h="center")
              b-col.pt-2.pb-3(cols="12")
                h2.omnes-medium.text-primary ¡Ellos ya protegen <br> a quienes más aman!
          b-col.content.text-center.px-4.px-lg-0(cols="12")
            b-row(align-h="center")
              b-col.o-hidden.px-lg-0(cols="12" lg="11" xl="12")
                b-row
                b-carousel.d-lg-none(:interval="3000" indicators='' label-indicators="Selecciona un slide para mostrar")
                  b-carousel-slide(img-blank  img-alt="comentarios seguro desgravamen devolucion con devolucion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro desgravamen devolucion")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/seguro_vida/home/testimonio_sandra-seguro_de_vida.png" alt="testimonio de seguro desgravamen devolucion")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 “Estoy protegiendo a mis padres <br>y hermanos,¡Tan solo pagando<br> <span class="text-primary omnes-semibold">S/ 35</span> al mes!Sé que todo saldrá bien,<br> al final obtendré <span class="text-primary omnes-semibold">S/ 23,000</span>.”
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Sandra V. Lombardi, 27 años
                  b-carousel-slide(img-blank img-alt="comentarios seguro desgravamen devolucion con devolucion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro desgravamen devolucion")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/seguro_vida/home/testimonio_alberto-seguro_de_vida.png" alt="testimonio de seguro desgravamen devolucion")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 "Me siento tranquilo protegiendo <br> a mi familia pagando <span class="text-primary omnes-semibold">S/ 68 </span> al <br> mes. Terminando me devolverán <br> <span class="text-primary omnes-semibold">S/ 20,529</span>. ¡Es genial!"
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Alberto T. Campos, 36 años
                  b-carousel-slide(img-blank  img-alt="comentarios seguro desgravamen devolucion con devolucion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro desgravamen devolucion")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/seguro_vida/home/testimonio_demesio-seguro_de_vida.png" alt="testimonio de seguro desgravamen devolucion")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 "Protejo a mis amados esposa <br> y nietos por <span class="text-primary omnes-semibold">S/ 150,000</span>,  <br> pagando al mes <span class="text-primary omnes-semibold">S/ 72 </span>.<br> Ahora estoy tranquilo."
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Demesio M. Paredes, 49 años
                b-row.box.justify-content-center.px-0.d-none.d-lg-flex
                  b-col(lg="4" xl="3")
                    div.borde
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro desgravamen devolucion")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(style="width: 80px;" src="@/static/media/seguro_vida/home/testimonio_margarita-seguro_de_vida.png" alt="testimonio de seguro desgravamen devolucion")
                        b-col.text-center.mt-4.mb-3(cols="12")
                          h4 “Estoy protegiendo a mis padres <br>y hermanos,¡Tan solo pagando<br> <span class="text-primary omnes-semibold">S/ 61</span> al mes!Sé que todo saldrá bien,<br> al final obtendré <span class="text-primary omnes-semibold">S/ 14,600</span>.”
                          h3.omnes-medium.mt-2(style="color: #454A6C;") Margarita S. Guzman, 28 años
                  b-col(lg="4" xl="3")
                    div.borde
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro desgravamen devolucion")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(src="@/static/media/seguro_vida/home/testimonio_alberto-seguro_de_vida.png" alt="testimonio de seguro desgravamen devolucion")
                        b-col.text-center.mt-4.mb-3(cols="12")
                          h4 "Me siento tranquilo protegiendo <br> a mi familia pagando <span class="text-primary omnes-semibold">S/ 68 </span> al <br> mes. Terminando me devolverán <br> <span class="text-primary omnes-semibold">S/ 20,529</span>. ¡Es genial!"
                          h3.omnes-medium.mt-2(style="color: #454A6C;") Alberto T. Campos, 36 años
                  b-col(lg="4" xl="3")
                    div.borde
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro desgravamen devolucion")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(src="@/static/media/seguro_vida/home/testimonio_demesio-seguro_de_vida.png" alt="testimonio de seguro desgravamen devolucion")
                        b-col.text-center.mt-4.mb-3(cols="12")
                          h4 "Protejo a mis amados esposa <br> y nietos por <span class="text-primary omnes-semibold">S/ 150,000</span>,  <br> pagando al mes <span class="text-primary omnes-semibold">S/ 72 </span>. <br>Ahora estoy tranquilo."
                          h3.omnes-medium.mt-2(style="color: #454A6C;") Demesio M. Paredes, 49 años
        b-row.consulta(ref="consulta" align-h="center" v-if="showSections")
          b-col.title.text-center.text-lg-left.mb-4.d-lg-none(cols="12")
              b-row
                b-col.my-2(cols="12")
                  h2.omnes-medium.text-primary ¿Tienes dudas sobre <br> nuestro seguro?
          b-col.content.mt-3.pl-xl-0(cols="12" sm="9" md="8" lg="12")
            b-row.pl-xl-0
              b-col.my-2.pr-0.d-none.d-lg-block(cols="4")
                h2.omnes-medium.text-primary.lh-1 ¿Tienes dudas sobre <br> nuestro seguro?
              b-col(cols="12" lg="8")
                about-seguro-vida(:preguntasFrecuentes="preguntasFrecuentes")
      div.d-lg-none.button-flotante(v-if="showCTA")
        div
        b-button(@click="goQuote" variant="dark") COTIZA AHORA
</template>

<script>
// @ is an alias to /src
import FormDni from '@/components/form/FormDni'
import Star from '@/components/common/Star'
import AboutSeguroVida from '@/components/AboutSeguroVida'

export default {
  layout: 'homeendosos',
  data () {
    return {
      // step: this.$store.state.common.step,
      name: 'Carlos',
      showBanner: false,
      showSections: false,
      showCTA: false,
      preguntasFrecuentes: [
        {
          id: 'pregunta1',
          preguntas: '¿Qué es un seguro de Seguro Vida Cash?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3>El seguro de Vida Cash es un tipo de seguro financiero que sirve para pagar tus deudas en el caso de fallecimiento, invalidez total y permanente por algún accidente o una enfermedad.  Significa que tus familiares ya no estarán atados a la deuda de préstamos personales, tarjetas de crédito o créditos hipotecarios. El monto invertido durante el tiempo de contratación, si nada te ocurre, se te dará devuelto al final de la contratación con la opción de un porcentaje mayor a lo invertido.</h3>'
          ]
        },
        {
          id: 'pregunta2',
          preguntas: '¿Para qué sirve un seguro de Seguro Vida Cash?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3> Sirve para cubrir una deuda en caso de:</h3><ul><li>Cubre la deuda por muerte natural</li><li>Cubre la deuda por invalidez permanente por un accidente o enfermedad</li><li>Cubre la deuda por fallecimiento por una enfermedad</li><h3>También sirve como método de ahorro y de devolución del monto invertido si así lo desea</h3></ul>'
          ]
        },
        {
          id: 'pregunta3',
          preguntas: '¿Cuánto cuesta tu seguro de Seguro Vida Cash?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3>El costo de tu seguro Desgravamen Devolución depende del costo de la prima que resulta de la cobertura de tu crédito a endosar. Solo podemos endosar créditos de hasta S/500,000</h3>'
          ]
        },
        {
          id: 'pregunta4',
          preguntas: '¿Por qué es importante tener un seguro de Seguro Vida Cash?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3>Es importante ya que tus familiares ya no estarán atados a la deuda de préstamos personales, tarjetas de crédito o créditos hipotecarios; en el caso de que fallecieras o estuvieses en estado de invalidez.</h3>',
          ]
        }
      ]
    }
  },
  components: {
    FormDni,
    AboutSeguroVida,
    Star
  },
  created () {
    this.$store.commit('common/setSubchannel', 'ENDOSOS')
    this.$nuxt.$on('scroll-me-to', ({ section, device }) => {
      let element = this.$refs[section]
      let size = (device === 'mobile') ? 100 : 50
      let top = element.offsetTop - size
      window.scrollTo(0, top)
    })
  },
  mounted () {
    window.addEventListener('scroll', this.handleScrollingIBK, { passive: true })
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'event': 'virtualPageView',
      'pageTitle': 'Inicio | ' + process.env.channel[process.env.subChannel[this.$store.state.common.subchannel]].PAGE_TITLE,
      'pageUrl': process.env.channel[process.env.subChannel[this.$store.state.common.subchannel]].URL_BASE
    })
  },
  methods: {
    handleScrollingIBK (event) {
      if (event.target.scrollingElement.scrollTop > 50) {
        this.showSections = true
        if (event.target.scrollingElement.scrollTop > (this.$refs['cotiza'].offsetHeight - 100)) {
          this.showCTA = true
        } else {
          this.showCTA = false
        }
      } else {
        this.showCTA = false
      }
    },
    capitalize (nombreCompleto) {
      nombreCompleto = nombreCompleto.toLowerCase()
      return nombreCompleto.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
    },
    goQuote () {
      this.showCTA = false
      this.$nuxt.$emit('scroll-me-to', { section: 'cotiza', device: 'desktop' })
      this.$nuxt.$emit('focus-numeroDocumento')
    }
  },
  destroyed () {
    this.$nuxt.$off('scroll-me-to')
    window.removeEventListener('scroll', this.handleScrollingIBK, { passive: true })
  },
}
</script>
