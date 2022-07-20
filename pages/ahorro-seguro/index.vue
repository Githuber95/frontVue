<template lang="pug">
  div.ahorroseguro.experimento_web#home(ref="home")
    section
      b-container
        div.box-cotiza
          b-row.cotiza.pt-5.vale_descuento.px-lg-0(ref="cotiza")
            b-col.title.left.d-none.d-xl-block.px-lg-0( cols="12" lg="12" order-lg="2")
              b-carousel#carousel-1(v-model='slide' :interval='10000' controls='' indicators='' img-width='1024' img-height='480' style='text-shadow: 1px 1px 2px #333;' @sliding-start='onSlideStart' @sliding-end='onSlideEnd')
                //- b-carousel-slide.text-left(img-src='@/static/media/ahorro_seguro/home/banner_carrousel-1.png' background="#F1F4F9")
                b-carousel-slide.text-left(img-src='@/static/media/ahorro_seguro/home/banner_campania-desktop.png' background="#F1F4F9")
                  a(href='/seguro-de-vida/tyc' style="color: #fff !important;") *Ver T&eacute;rminos y condiciones
                  Counter(diaHasta="24" :mesHasta="4" :anio="2022").pt-3
                  //- b-row.align-items-center.h-100
                    b-col(cols="6")
                      div
                        h1.text-left Haz crecer todo tu <br>dinero invertido <span class="omnes-semibold"> hasta <br>en 200%</span>
                        img.text-left.mt-3(v-lazy-load data-src="@/static/media/ahorro_seguro/home/mensaje-responsive.svg" alt="mensaje ahorro seguro de vida" style="width: 19rem;")
                b-carousel-slide(img-src='@/static/media/ahorro_seguro/home/banner_carrousel-3-desktop.png')
                b-carousel-slide(img-src='@/static/media/ahorro_seguro/home/banner_carrousel-2-desktop.png')
                  b-row.align-items-center.h-100
                    b-col(cols="5")
                      div
                        h1.text-left.text-primary.omnes-semibold Somos parte de Intercorp
                        h2.text-black.omnes-regular Interseguro, empresa 100% peruana <br>con 19 años en el mercado.
            b-col.title.left.mt-lg-0.d-lg-none(cols="12" lg="6" xl="7" order="1" order-lg="2" lazy-background="~/static/media/common/home/banner_descuento-responsive.svg")
              //- b-row.principal.justify-content-center.justify-content-lg-left
                b-col.px-0.px-lg-0.mt-2(cols="12")
                  img.pl-4(v-lazy-load data-src="@/static/media/ahorro_seguro/home/mensaje-responsive.svg" alt="mensaje ahorro seguro de vida")
                  h1.text-white.omnes-semibold.lh-1.pt-1 Haz crecer todo tu dinero invertido<br> hasta en 200%
              a.d-xl-none(href='/seguro-de-vida/tyc' style="color: #fff!important") *T&eacute;rminos y condiciones 
                span.omnes-semibold aqu&iacute;
              a.d-none.d-xl-block(href='/seguro-de-vida/tyc' style="color: #fff !important;") *Ver T&eacute;rminos y condiciones
              Counter(diaHasta="24" :mesHasta="4" :anio="2022")
            b-col.content.right.pl-lg-0.ml-lg-5(cols="12" lg="6" xl="5" order="2" order-lg="1")
              section.box-quote
                b-container 
                  div.pila.bg-primary.animation-div
                    h2.text-white.omnes-semibold Devolución de hasta <span class="omnes-medium">200%</span> 
                  b-row.h-100
                    b-col(cols="12")
                      b-row
                        b-col.text-center(cols="12")
                          h3.text-primary.omnes-medium Cotiza tu ahorro seguro ahora
                      b-row.justify-content-center.px-0
                        b-col.px-0(cols="12")
                          form-dni.mt-2
                      //- b-row.justify-content-center.mt-2.mt-lg-3
                        b-col(cols="11" lg="10")
                          div.asegurados
                            img(v-lazy-load data-src="@/static/media/seguro_vida/home/asegurados.svg" alt="asegurados")
                            h4.pl-2.text-primary M&aacute;s de <span class="omnes-semibold">{{numeroAsegurados}} </span>de asegurados
                      b-row.mt-2.mt-lg-3.mb-4.mb-lg-5
                        b-col.text-center
                          p.d-inline Con el respaldo del grupo:
                          img.d-inline.text-center.mt-lg-0.ml-2(style="width: 6.5rem;" src="@/static/media/seguro_vida/home/grupo_intercorp.svg" alt="respaldo de intercorp" stlye="width:104px;height:22px;")        
        div.elegir.como-funciona_seguro-vida.py-1.pt-xl-3.pb-xl-0(ref="concepto")
          b-container
            b-row.d-lg-none
              b-col.text-center.mt-4.mb-3.my-md-4
                h2.text-primary.omnes-medium ¿Por qué elegir<br> Ahorro Seguro?
                h3 Tenemos la mejor rentabilidad para tu dinero
            b-row.d-none.d-lg-flex
              b-col.pl-5.mt-4.mb-3.my-md-4.text-center(lg="12")
                h2.text-primary.omnes-medium ¿Por qué elegir Ahorro Seguro?
                h3 Tenemos la mejor rentabilidad para tu dinero
            b-row.justify-content-center.d-lg-none
              b-col.mt-3(cols="12" sm="9" md="7")
                img.w-100(v-lazy-load data-src="@/static/media/ahorro_seguro/home/elegir-ahorro_seguro_mobile.svg" alt="por que elegir ahorro seguro")
              b-col.mt-3(cols="12" sm="9" md="7")
                b-row
                  b-col.px-1(cols="2")
                    img.w-100(v-lazy-load data-src="@/static/media/ahorro_seguro/home/protege.svg" alt="protege ahorro seguro")
                  b-col(cols="10")
                    h4.lh-1 Te ofrecemos una cobertura por fallecimiento para que quienes más amas estén protegidos.
                  b-col.text-right(cols="12")
                    img(v-lazy-load data-src="@/static/media/ahorro_seguro/home/chanchito-ahorrador.svg" alt="protege ahorro seguro" style="margin-top: -1rem;")
            b-row.justify-content-center.d-none.d-lg-flex
              b-col.mt-3(cols="12")
                b-row
                  b-col.px-1(cols="3")
                    img.w-100(v-lazy-load data-src="@/static/media/ahorro_seguro/home/hombre_ahorro_seguro_desktop.svg" alt="porq que elegir ahorro seguro")
                  b-col.pl-5.mt-5(cols="9")
                    img.w-75(v-lazy-load data-src="@/static/media/ahorro_seguro/home/elegir_ahorro_seguro_desktop.svg" alt="porq que elegir ahorro seguro")
                    b-row.align-items-center.mt-5
                      b-col.px-0.text-center(cols="1")
                        img.w-50(v-lazy-load data-src="@/static/media/ahorro_seguro/home/protege.svg" alt="protege ahorro seguro")
                      b-col.pl-0(cols="10")
                        h4.lh-1 Te ofrecemos una cobertura por fallecimiento para que quienes <br>más amas estén protegidos.
      b-row.elegir.py-5(ref="beneficios" v-if="showSections" style="background: #F1F4F980")
        b-col.px-0
          b-row.px-0.justify-content-center
            b-col.title.text-center(cols="12")
              b-row(align-h="center")
                b-col.px-lg-2(cols="12" sm="7" md="6" lg="4" xl="6")
                  img.mb-2.d-lg-none(v-lazy-load data-src="@/static/media/ahorro_seguro/home/check_green.svg" alt="beneficios" style="width: 2rem")
                  h2.omnes-medium.text-primary.d-xl-inline Mira todo lo que <br class="d-lg-none">te ofrecemos
                  img.mb-2.d-none.d-xl-inline.ml-xl-3(v-lazy-load data-src="@/static/media/ahorro_seguro/home/check_green.svg" alt="beneficios" style="width: 2rem")
            b-col.content(cols="12" lg="9")
              b-row.text-center.px-xl-0
                b-col.my-3.px-xl-1(cols="12" lg="4")
                  b-row.px-xl-0(align-h="center")
                    b-col.img-beneficio(cols="12")
                      img.mb-2(v-lazy-load data-src="@/static/media/ahorro_seguro/home/beneficio_sin_cobros_extras.svg" alt="beneficio sin cobros extras")
                    b-col.px-4.mt-2.mb-xl-2.px-xl-1(cols="11" lg="10" xl="10")
                      h3.omnes-semibold No hay cobro extra
                    b-col.texto.px-4.px-lg-0(cols="11" md="8" lg="10" xl="11")
                      h4 No cobramos moras, penalidades, <br>comisiones o mantenimientos..
                b-col.my-3.px-xl-1(cols="12" lg="4" order-xl="2")
                  b-row.px-xl-0(align-h="center")
                    b-col.img-beneficio(cols="12")
                      img.mb-2(v-lazy-load data-src="@/static/media/ahorro_seguro/home/beneficio_cobro_automatico.svg" alt="beneficio devolucion de seguro de vida")
                    b-col.px-2.mt-2.mb-xl-2.px-xl-1(cols="11" lg="10" xl="12")
                      h3.omnes-semibold Cobro fácil y automatico
                    b-col.texto.px-lg-0(cols="11" lg="12" xl="10")
                      h4 Haremos débito automático de la tarjeta <br>afiliada en el banco que tú elijas.
                b-col.mt-3.px-xl-1(cols="12" lg="4" order-xl="3")
                  b-row(align-h="center")
                    b-col.img-beneficio(cols="12")
                      img.mb-2.mb-xl-2(v-lazy-load data-src="@/static/media/ahorro_seguro/home/beneficio_asistencias.svg" alt="beneficio en los contratos de tu seguro de vida")
                    b-col.px-4.px-xl-0.mt-2.mb-xl-2(cols="11" lg="10" xl="10")
                      h3.omnes-semibold Asistencias 24/7
                    b-col.texto.px-lg-0(cols="11" lg="12" xl="11")
                      h4 Disfruta de un programa de asistencias con <br>coberturas gratuitas los 365 días del año, las <br>24 horas del día.
      b-row.asistencia
          b-container
            b-row.pb-4.pb-xl-5
              b-col.text-center(cols="12")
                h2.omnes-medium.text-primary Disfruta de nuestras asistencias <br>con coberturas gratuitas
          b-container.pb-5
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
                        p Envío de gasfitero, electricista, vidriero <br> y cerrajero a domicilio por emergencia <br> con cobertura hasta <span class="omnes-semibold">S/150</span>
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
                          p Envío de gasfitero, electricista, vidriero <br> y cerrajero a domicilio por emergencia <br> con cobertura hasta <span class="omnes-semibold">S/150</span>
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
          b-container
            b-row
              b-col.text-center(cols="12")
                h3.omnes-medium.text-primary(style="font-size: 1.4rem;") Para más detalle de las asistencias <br class="d-xl-none"> y beneficios visita <a target="_blank" href="https://www.interseguro.pe/vivemas" rel="noopener" class="omnes-semibold" style="color: #007bff;">VIVE +</a>
      .testimonio.pt-4.pb-5(ref="testimonios")
        b-row.mb-4
          b-col.text-center
            h2.omnes-medium.text-primary Ellos ya están ahorrando
        b-container.mb-3
          b-row(align-h="center")
            b-col.o-hidden.px-xl-0(cols="12" sm="9" md="6" lg="5" xl="12")
              b-carousel#testimonioSeguro.d-xl-none(:interval="10000" indicators label-indicators="Selecciona un slide para mostrar")
                b-carousel-slide( img-blank img-alt="comentarios seguro de vida con devolucion")
                  b-card.mb-2(img-src='@/static/media/ahorro_seguro/home/testimonio_luis-ahorro_seguro.png' img-alt='Image' img-top='' tag='article')
                    b-card-text
                      p.description “Estoy ahorrando <span class="text-primary omnes-semibold">218 soles <br>mensuales</span> para poder comprar un <br>auto, en 10 años recibiré<span class="omnes-semibold text-primary">&nbsp;S/ 35,390</span> y <br> cumpliré mis sueños.”
                      p.text-primary.omnes-medium Luis S. Ramírez, 32 años
                      div.borde
                        p Ganará 35% adicional
                b-carousel-slide( img-blank img-alt="comentarios seguro de vida con devolucion")
                  b-card.mb-2(img-src='@/static/media/ahorro_seguro/home/testimonio_jose-ahorro_seguro.png' img-alt='Image' img-top='' tag='article')
                    b-card-text
                      p.description “En 10 años quiero comprarme un <br>departamento, estoy ahorrando <span class="omnes-semibold text-primary">S/ 256 <br>mensual </span>y con eso recibiré <span class="omnes-semibold text-primary">S/ 44,6991 </span><br>para la inicial de mi departamento.”
                      p.text-primary.omnes-medium Jose V. Cáceres, 26 años
                      div.borde
                        p Ganará 50% adicional
                b-carousel-slide( img-blank img-alt="comentarios seguro de vida con devolucion")
                  b-card.mb-2(img-src='@/static/media/ahorro_seguro/home/testimonio_diana-ahorro_seguro.png' img-alt='Image' img-top='' tag='article')
                    b-card-text
                      p.description “Pagaré <span class="text-primary omnes-semibold">S/ 178 mensual </span>por 12 años y al <br>final recibiré casi <span class="omnes-semibold text-primary">S/ 40,000</span>. Estoy<br> ganando de rentabilidad <span class="omnes-semibold text-primary">S/ 14,000</span>, <br>una gran alternativa para ahorrar y <br>hacer crecer tu dinero.”
                      p.text-primary.omnes-medium Diana G. Castillo, 40 años
                      div.borde
                        p Ganará 40% adicional
              b-row#testimonioSeguro.box.d-none.d-xl-flex.px-xl-5.justify-content-center
                b-col(cols="4")
                  b-card.mb-2(img-src='@/static/media/ahorro_seguro/home/testimonio_luis-ahorro_seguro.png' img-alt='Image' img-top='' tag='article')
                    b-card-text
                      p.description “Estoy ahorrando <span class="text-primary omnes-semibold">218 soles <br>mensuales</span> para poder comprar un <br>auto, en 10 años recibiré<span class="omnes-semibold text-primary">&nbsp;S/ 35,390</span> y <br> cumpliré mis sueños.”
                      p.text-primary.omnes-medium Luis S. Ramírez, 32 años
                      div.borde
                        p Ganará 35% adicional
                b-col(cols="4")
                  b-card.mb-2(img-src='@/static/media/ahorro_seguro/home/testimonio_jose-ahorro_seguro.png' img-alt='Image' img-top='' tag='article')
                    b-card-text
                      p.description “En 10 años quiero comprarme un <br>departamento, estoy ahorrando <span class="omnes-semibold text-primary">S/ 256 <br>mensual </span>y con eso recibiré <span class="omnes-semibold text-primary">S/ 44,6991 </span><br>para la inicial de mi departamento.”
                      p.text-primary.omnes-medium Jose V. Cáceres, 26 años
                      div.borde
                        p Ganará 50% adicional
                b-col(cols="4")
                  b-card.mb-2(img-src='@/static/media/ahorro_seguro/home/testimonio_diana-ahorro_seguro.png' img-alt='Image' img-top='' tag='article')
                    b-card-text
                      p.description “Pagaré <span class="text-primary omnes-semibold">S/ 178 mensual </span>por 12 años y al <br>final recibiré casi <span class="omnes-semibold text-primary">S/ 40,000</span>. Estoy<br> ganando de rentabilidad <span class="omnes-semibold text-primary">S/ 14,000</span>, <br>una gran alternativa para ahorrar y <br>hacer crecer tu dinero.”
                      p.text-primary.omnes-medium Diana G. Castillo, 40 años
                      div.borde
                        p Ganará 40% adicional
      .consulta(ref="consulta" align-h="center" v-if="showSections")
        b-row
          b-col.title.text-center.text-lg-left.mb-4.d-lg-none(cols="12")
              b-row
                b-col.my-2(cols="12")
                  h2.omnes-medium.text-primary ¿Tienes dudas sobre <br> Ahorro Seguro?
          b-col.content.mt-3.pl-xl-0(cols="12" sm="9" md="8" lg="12")
            b-row.pl-xl-0
              b-col.my-2.pr-0.d-none.d-lg-block(cols="4")
                h2.omnes-medium.text-primary.lh-1 ¿Tienes dudas sobre <br> Ahorro Seguro?
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
import AssistanceHome from '@/components/common/AssistanceHome'
import Counter from '@/components/common/Counter'
import * as _ from 'lodash'
export default {
  layout: 'home',
  data () {
    return {
      slide: 0,
      sliding: null,
      numeroAsegurados: '200,000',
      name: 'Carlos',
      stock: this.$store.state.common.currentVoucher,
      showSections: false,
      showCTA: false,
      interval: null,
      lastSection: null,
      currentSection: null,
      preguntasFrecuentes: [
        {
          id: 'pregunta1',
          preguntas: '¿Qué es un seguro de ahorro seguro?',
          // imagen: require("@/static/media/seguro_vida/home/asistencia_academica.svg"),
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3>Es una forma de ahorrar tu dinero y rentabilizarlo hasta en un 100% adicional. Además, si un día no estés para quienes más amas puedes protegerlos hasta por S/ 200,000.</h3>'
          ]
        },
        {
          id: 'pregunta2',
          preguntas: '¿Para qué sirve un seguro de ahorro seguro?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3> Te permite vivir tranquilo y sin preocupaciones gracias a que este ahorro garantizado te ayudará a cumplir tus metas a largo plazo. Puedes armar un seguro a tu medida escogiendo el plazo, monto a ahorrar y el periodo de tiempo en el que lo deseas.</h3>'
          ]
        },
        {
          id: 'pregunta3',
          preguntas: '¿Cuánto cuesta tu seguro de ahorro seguro?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3>El precio depende de cuánto quieres ahorrar y el tiempo que desees hacerlo.</h3>'
          ]
        },
        {
          id: 'pregunta4',
          preguntas: '¿Por qué es importante tener un seguro de ahorro seguro?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3> - Te permite ahorrar para tus proyectos futuros o los que desees.</h3>',
              '<h3> - Puedes rentabilizar tu dinero hasta en un 200%.</h3>',
              '<h3> - Proteges a quiénes más amás si te ocurre algo.</h3>',
              '<h3> - Accedes al programa de beneficios de clientes <a target="_blank" href="https://www.interseguro.pe/vivemas" rel="noopener"> &nbsp;Vive +</a></h3>'
          ]
        },
        {
          id: 'pregunta5',
          preguntas: '¿Qué pasa si quiero anular mi póliza?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3> Llámanos al teléfono: (01) 500 0000</h3>',
              '<h3> Recuerda que, bajo la cláusula de derecho de arrepentimiento, si decides anular tu póliza luego de los primeros 15 días calendario de haber hecho la compra, tienes derecho a la devolución del total de la prima pagada.</h3>',
              '<h3> En caso la anulación se de después de dicho tiempo, la devolución de prima será únicamente sobre los días de seguro contratados pero no gozados.</h3>',
              '<h3> La devolución se realizará como máximo en 30 días calendario desde la solicitud.</h3>'
          ]
        }
      ]
    }
  },
  head: {
    title: 'Haz crecer tu dinero con rentabilidad - Ahorro seguro',
    meta: [
      { hid: 'description', name: 'description', content: 'Ahorro seguro, haz crecer tu  dinero con la mejor rentabilidad y beneficios. Fácil, rápido y lo mejor de todo, 100% digital desde S/ 1.3 al día.' },
      { hid: 'keywords', name: 'keywords', content: 'seguros, ahorro seguro, ahorro seguro, seguro de ahorro seguro, cubrimos coronavirus, coronavirus, ahorro seguro nacional, ahorro seguro internacional' },
      { hid: 'author', name: 'author', content: 'Interseguro | Ahorro Seguro' },
      { hid: 'copyright', name: 'copyright', content: 'Interseguro Ahorro Seguro' },
      // Facebook
      { hid: 'fb:og:title', property: 'og:title', content: 'Haz crecer tu dinero con la mejor rentabilidad y beneficios' },
      { hid: 'fb:og:image', property: 'og:image', content: process.env.base + 'seguro-de-vida/media/images/share/card_facebook_ahorro_seguro.png' },
      { hid: 'fb:og:url', property: 'og:url', content: process.env.base + 'seguro-de-vida/ahorro-seguro' },
      { hid: 'fb:og:description', property: 'og:description', content: 'Fácil, rápido y lo mejor de todo, 100% digital desde S/ 1.3 al día.' },
      { hid: 'fb:og:site_name', property: 'og:site_name', content: 'Ahorro Seguro Interseguro' },
      { hid: 'fb:og:image:alt', property: 'og:image:alt', content: 'Interseguro, Ahorro Seguro' },
      // whatsapp
      { hid: 'wsp:image', property: 'og:image', itemprop: 'image', content: process.env.base + 'seguro-de-vida/media/images/share/card_whatsapp_ahorro_seguro.png' },
      // // Twitter
      { hid: 'twitter:title', property: 'twitter:title', content: 'Haz crecer tu dinero con la mejor rentabilidad y beneficios' },
      { hid: 'twitter:image', property: 'twitter:image', content: process.env.base + 'seguro-de-vida/media/images/share/card_facebook_ahorro_seguro.png' },
      { hid: 'twitter:description', property: 'twitter:description', content: 'Fácil, rápido y lo mejor de todo, 100% digital desde S/ 1.3 al día. ' }
    ]
  },
  components: {
    FormDni,
    AboutSeguroVida,
    AssistanceHome,
    Star,
    Counter
  },
  created () {
    this.$store.commit('common/setSubchannel', 'PROMOCION_SEGURO')
    this.$store.commit('common/setInversa', false)
    this.$nuxt.$on('scroll-me-to', ({ section, device }) => {
      let element = this.$refs[section]
      let size = (device === 'mobile') ? 100 : 50
      let top = element.offsetTop - size
      window.scrollTo(0, top)
    })
  },
  mounted () {
    window.addEventListener('scroll', this.handleScrolling, { passive: true })
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'event': 'virtualPageView',
      'pageTitle': 'Inicio | ' + process.env.channel[process.env.subChannel[this.$store.state.common.subchannel]].PAGE_TITLE,
      'pageUrl': process.env.channel[process.env.subChannel[this.$store.state.common.subchannel]].URL_BASE
    })
    clearInterval(this.interval)
    this.interval = setInterval(this.goAmplitude, 3000)
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    goAmplitude () {
      let seccionVista = ''
      let valAct = window.scrollY
      let varCotiza = this.$refs['cotiza']?.offsetTop
      let varConcepto = this.$refs['concepto']?.offsetTop - 100
      let varTestimonios = (valAct > 300) ? (this.$refs['testimonios']?.offsetTop - 100) : 0
      let varConsulta = (valAct > 300) ? (this.$refs['consulta']?.offsetTop - 100) : 0
      if (varCotiza <= valAct && valAct < varConcepto) {
        this.currentSection = 'Concepto'
      }
      else if (varConcepto <= valAct && valAct < varTestimonios) {
        this.currentSection = 'Testimonios'
      }
      else if (varTestimonios <= valAct && valAct < varConsulta) {
        this.currentSection = 'Preguntas Frecuentes'
      } else {
        this.currentSection = 'Pie de página'
      }
      let bool = _.isEqual(this.lastSection, this.currentSection)
      // Amplitude Vista 
      if (!bool) {
        this.lastSection = _.cloneDeep(this.currentSection)
        this.$store.commit('common/setCurrentSection', this.currentSection)
        this.$amplitude.getInstance().logEvent(
          'Seccion Vista',
          {
            'Pagina de Seccion Vista': this.currentSection,
            '% de Scroll':this.$store.state.common.percentScroll,
            'Producto Consultado': 'VIDA',
            'Sub Producto Consultado': this.$store.state.common.channel,
          }
        ) 
      }
    },
    handleScrolling (event) {
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
  beforeDestroy() {
    clearInterval(this.interval)
    this.interval = null
  },
  destroyed () {
    clearInterval(this.interval)
    this.interval = null
    this.$nuxt.$off('scroll-me-to')
    window.removeEventListener('scroll', this.handleScrolling, { passive: true })
  },
}
</script>
