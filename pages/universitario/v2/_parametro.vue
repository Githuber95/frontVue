<template lang="pug">
  div.segurouniversitario.challenger#home(ref="home")
    section
      b-container
        div.box-cotiza
          b-row.cotiza.pt-5(ref="cotiza")
            b-col.title.challenger.left.d-none.d-xl-block.px-lg-0( cols="12" lg="12" order-lg="2")
              b-carousel#carousel-1(:interval='10000' controls='' indicators='' img-width='1024' img-height='480')
                b-carousel-slide.text-left(img-src='@/static/media/universitario/home/banner_carrousel-1-desktop.jpg' background="#F1F4F9")
                  b-row.align-items-center.h-100
                    b-container
                      b-row 
                        b-col(cols="12")
                          h1.text-primary.lh-1.d-none.d-xl-block.omnes-medium Prepárate para los gastos <br> de la universidad de tus<br> hijos y cuídalos siempre
                        b-col(cols="2")
                          hr(style="border-top: 3px solid #0855c4;box-shadow: 0px 3px 6px #00000029;")
                        b-col(cols="12")
                          h3.text-primary.omnes-medium Un seguro a tu medida con una devolución <br>de hasta <span class="omnes-medium"> 200% del monto ahorrado</span>
                b-carousel-slide(img-src='@/static/media/universitario/home/banner_carrousel-2-desktop.jpg')
                  b-row.align-items-center.h-100
                    b-container
                      b-row 
                        b-col(cols="12")
                          h1.text-white.lh-1.d-none.d-xl-block El futuro de tus hijos<br> estará asegurado<br> con nosotros
                        b-col(cols="2")
                          hr(style="border-top: 3px solid #fff;box-shadow: 0px 3px 6px #00000029;")
                        b-col(cols="12")
                          h3.text-white Un seguro con devolución con<br> Beneficios exclusivos
                b-carousel-slide(img-src='@/static/media/universitario/home/banner_carrousel-3-desktop.jpg')
                  b-row.align-items-center.h-100
                    b-container
                      b-row 
                        b-col(cols="12")
                          h1.text-primary.lh-1.d-none.d-xl-block.omnes-medium(style="font-size: 2.5rem!important;") Somos parte del <br>grupo Intercorp
                        b-col(cols="2")
                          hr(style="border-top: 3px solid #0855c4;box-shadow: 0px 3px 6px #00000029;")
                        b-col(cols="12")
                          h3.text-primary.omnes-medium Interseguro, empresa 100% peruana <br>con 19 años en el mercado.
            b-col.title.challenger.left.mt-lg-0.d-lg-none(cols="12" lg="6" xl="7" order="1" order-lg="2")
              b-row.principal.justify-content-center.justify-content-lg-left
                b-col.px-0.px-lg-0.mt-2(cols="12")
                  h1.omnes-medium.text-primary.lh-1.d-xl-none.text-left Prepárate para los gastos <br>de la universidad de tus<br> hijos y cuídalos siempre </span>
                  h1.omnes-medium.text-primary.lh-1.d-none.d-xl-block Prepárate para los gastos de la universidad <hr class="my-2"> <br> de tus hijos y cuídalos siempre </span>
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
                      b-row.mt-2.mt-lg-3.justify-content-center
                        b-col.text-center(cols="11")
                          p.d-inline.ml-2 Con el respaldo del grupo:
                          img.d-inline.mt-lg-0.ml-2(src="@/static/media/seguro_vida/home/grupo_intercorp.svg" alt="respaldo de intercorp")        
                      b-row.mt-2.mb-4.mb-lg-5.justify-content-center
                        b-col.text-center(cols="11")
                          p.d-inline.ml-2 Regulado por la
                          img.d-inline.mt-lg-0.ml-2(style="width: 3.5rem;" src="@/static/media/common/sbs.svg" alt="Superintendencia de Banca y Seguros del Perú")
        
        b-row.datos-estadisticos.justify-content-center(ref="beneficios" v-if="showSections")
          b-col.content(cols="12" lg="10" xl="11")
            b-row.pt-3.pt-lg-5.mb-lg-4
              b-col.pr-xl-0(cols="12" lg="4")
                b-row.pr-xl-0
                  b-col.px-lg-0.text-center.text-lg-left(cols="12")
                    h2.omnes-medium.text-primary El seguro creado para la<br class="d-none d-xl-block"> familia emprendedora
                  b-col.description.px-lg-0.py-3.text-center.text-lg-left(cols="12")
                    h3.d-block.d-xl-none Más de <span class="omnes-semibold text-primary">60,000</span> familias emprendedoras aseguradas confían en nosotros
                    h3.d-none.d-xl-block Más de <span class="omnes-semibold text-primary">60,000 familias </span><br >emprendedoras aseguradas <br >confían en nosotros
              b-col.px-xl-0(cols="12" lg="8")
                b-row
                  b-col.text-xl-center(cols="12" lg="4")
                    div.d-flex.d-lg-block.border
                      img.mb-2.d-xl-none(src="@/static/media/universitario/home/emprendedoras_ahorro.svg" alt="emprendedoras ahorro"  style="width: 4rem;")
                      img.mb-2.d-none.d-xl-inline(src="@/static/media/universitario/home/emprendedoras_ahorro.svg" alt="emprendedoras ahorro"  style="width: 5.5rem;")
                      h4.mt-2.mt-lg-0.pl-3.pl-lg-0 de nuestros clientes escogen <br class="d-none d-xl-block"> un plan de ahorro mayor a los<br class="d-none d-xl-block"> <span class="omnes-semibold text-primary">S/100</span> mensuales
                  b-col.text-xl-center(cols="12" lg="4")
                    div.d-flex.d-lg-block.border
                      img.mb-2.d-xl-none(src="@/static/media/universitario/home/emprendedoras_vigencia.svg" alt="emprendedoras vigencia"  style="width: 4rem;")
                      img.mb-2.d-none.d-xl-inline(src="@/static/media/universitario/home/emprendedoras_vigencia.svg" alt="emprendedoras vigencia"  style="width: 5.5rem;")
                      h4.mt-3.mt-lg-0.pl-3.pl-lg-0 de nuestros clientes han <br class="d-none d-xl-block">elegido planes de ahorro<br class="d-none d-xl-block"> sobre los 10 años
                  b-col.text-xl-center(cols="12" lg="4")
                    div.d-flex.d-lg-block.border
                      img.mb-2.d-xl-none(src="@/static/media/universitario/home/emprendedoras_devolucion.svg" alt="emprendedoras devolucion"  style="width: 4rem;")
                      img.mb-2.d-none.d-xl-inline(src="@/static/media/universitario/home/emprendedoras_devolucion.svg" alt="emprendedoras devolucion"  style="width: 5.5rem;")
                      h4.mt-3.mt-lg-0.pl-3.pl-lg-0 de nuestros clientes escogen<br class="d-none d-xl-block"> planes con 125% de <br class="d-none d-xl-block">devolución de su ahorro
        b-row.beneficios.justify-content-center(ref="asistencia" style="background-color: rgba(241,244,249,0.50196)")
          b-container
            b-row.pb-3
              b-col.text-center(cols="12")
                h2.omnes-medium.text-primary Esto es lo que te ofrecemos
          b-container
            b-row(align-h="center")
              b-col.o-hidden.px-xl-0(cols="12")
                b-carousel#asistenciaSeguro(:interval="3000" indicators label-indicators="Selecciona un slide para mostrar")
                  b-carousel-slide(img-blank img-alt="comentarios seguro de vida con devolucion")
                    b-row.borde.align-items-center
                      b-col.my-2.px-0(cols="12" lg="4")
                        img.mb-2(src="@/static/media/universitario/home/flexibilidad_pago.svg" alt="flexibilidad en los pagos" )
                        h4.pb-2.text-primary.omnes-semibold Flexibilidad en los pagos
                        p.text-black Puedes congelar tu pago <br class="d-none d-lg-block">hasta 3 meses.<br class="d-block">&nbsp;&nbsp;&nbsp;
                      b-col.my-2.px-0(cols="12" lg="4")
                        img.mb-2(src="@/static/media/universitario/home/rentabilidad.svg" alt="mejor rentabilidad" )
                        h4.pb-2.text-primary.omnes-semibold La mejor rentabilidad
                        p.text-black Puedes escoger hasta el 200% <br class="d-none d-lg-block">de devolución,<br class="d-lg-none"> es 100% garantizado y <br class="d-none d-lg-block">supervisado por la SBS
                      b-col.my-2.px-0(cols="12" lg="4")
                        img.mb-2(src="@/static/media/universitario/home/dinero_beneficiario.svg" alt="dinero para beneficiario" )
                        h4.pb-2.text-primary.omnes-semibold Este es TU DINERO
                        p.text-black En caso de fallecimiento <br class="d-none d-lg-block">tu dinero coberturado <br>ES PARA TU BENEFICIARIO.
                  b-carousel-slide(img-blank img-alt="comentarios seguro de vida con devolucion")
                    b-row.borde
                      b-col.my-2.px-0(cols="12" lg="4")
                        img.mb-2(src="@/static/media/universitario/home/intercorp.svg" alt="intercorp")
                        h4.pb-2.text-primary.omnes-semibold Somos INTERCORP
                        p.text-black Tenemos el respaldo del grupo <br class="d-none d-lg-block">económico <br class="d-lg-none">más importante <br class="d-none d-lg-block">del Perú
                      b-col.my-2.px-0(cols="12" lg="4")
                        img.mb-2(src="@/static/media/universitario/home/muchos_descuentos.svg" alt="programa de descuentos")
                        h4.pb-2.text-primary.omnes-semibold Programa de descuentos
                        p.text-black Descuentos y promociones <br class="d-none d-lg-block">en <br class="d-lg-none">tus marcas favoritas<br> &nbsp;
                      b-col.my-2.px-0(cols="12" md="4")
                        img.mb-2(src="@/static/media/universitario/home/asistencia_medica.svg" alt="asistencia medica")
                        h4.pb-2.text-primary.omnes-semibold Programas de asistencia médica
                        p.text-black Envío de médico a domicilio, consulta <br class="d-none d-lg-block">médica<br class="d-lg-none"> general, ambulancia <br class="d-none d-lg-block">y urgencias médicas.
          b-col.frase
            div.pila.bg-primary.text-center
              h2.text-white ¡La mejor <span class="omnes-semibold">herencia</span> que le dejas <br>a tus hijos <span class="omnes-semibold">es su educaci&oacute;n!</span>
        div.concepto.como-funciona_seguro-vida.py-1.py-xl-3.pt-4.pt-xl-5(ref="concepto")
          b-container
            b-row
              b-col.text-center.mt-4.mb-3.my-md-4
                h2.text-primary.omnes-medium.d-xl-none Jorge <span class="omnes-semibold">ahorra y protege</span> a<br class="d-lg-none"> quienes m&aacute;s ama, <br class="d-lg-none">conoce c&oacute;mo
                h2.text-primary.omnes-medium.d-none.d-xl-block Jorge esta <span class="omnes-semibold">asegurando el futuro</span> de<br> sus hijos, conoce cómo
            b-row.justify-content-center.d-lg-none
              b-col.mt-3.mb-5(cols="11" sm="9" md="7")
                img.w-100(src="@/static/media/universitario/home/como_funciona-seguro_universitario_mobile.png" alt="linea de tiempo")
            b-row.justify-content-center.d-none.d-lg-flex
              b-col.mt-3.mb-5(cols="12")
                img.w-100(src="@/static/media/universitario/home/como_funciona-seguro_universitario.png" alt="linea de tiempo")
        b-row.asistencia(ref="asistencia")
          b-container
            b-row.pb-4.pb-xl-5
              b-col.text-center(cols="12")
                h2.omnes-medium.text-primary.d-xl-none Disfruta de nuestras asistencias <br>con coberturas gratuitas
                h2.omnes-medium.text-primary.d-none.d-xl-block Disfruta de nuestras asistencias
          b-container.pb-5
            b-row(align-h="center")
              b-col.o-hidden.px-xl-0(cols="10" sm="8" md="7" lg="5" xl="12")
                b-carousel#asistenciaSeguro.d-xl-none(:interval="10000" indicators label-indicators="Selecciona un slide para mostrar")
                  b-carousel-slide(img-src="@/static/media/ahorro_seguro/home/asistencia_academica-ahorro_seguro.png" img-alt="comentarios seguro de vida con devolucion")
                    b-row.align-items-center.borde
                      b-col(cols="12")
                        h4.pb-2.omnes-semibold Asistencia Acad&eacute;mica
                        p Orientaci&oacute;n psicológica telef&oacute;nica, 2 <br> veces por año.
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
                    div.asistencia-academica
                      b-row.justify-content-center
                        b-col.borde(cols="10")
                          h4.pt-3.omnes-semibold Asistencia Acad&eacute;mica
                          p Orientaci&oacute;n psicológica telef&oacute;nica, 2 <br> veces por año.
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
          b-container
            b-row
              b-col.text-center(cols="12")
                h3.omnes-medium.text-primary(style="font-size: 1.4rem;") Para más detalle de las asistencias <br class="d-xl-none"> y beneficios visita <a target="_blank" href="https://www.interseguro.pe/vivemas" rel="noopener" class="omnes-semibold" style="color: #007bff;">VIVE +</a>
        b-row.testimonios.px-lg-0(ref="testimonios" v-if="showSections"  style="background-color: rgba(241,244,249,0.50196)")
          b-col.title.text-center(cols="12")
            b-row.text-white(align-h="center")
              b-col.pt-2.pb-3(cols="12")
                h2.omnes-medium.text-primary ¡Ellos ya protegen <br class="d-xl-none"> a quienes más aman!
          b-col.content.text-center.px-4.px-lg-0(cols="12")
            b-row(align-h="center")
              b-col.o-hidden.px-lg-0(cols="12" lg="11" xl="12")
                b-row
                b-carousel.d-lg-none(:interval="93000" indicators='' label-indicators="Selecciona un slide para mostrar")
                  b-carousel-slide(img-blank  img-alt="comentarios seguro universitario con devolucion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro universitario")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/universitario/home/testimonio_veronica-seguro_estudiantil.png" alt="testimonio de seguro universitario")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 “Pagaré <span class="text-primary omnes-semibold">S/ 207</span> mensual y si todo <br>sale bien recibiré <span class="text-primary omnes-semibold">S/ 33,500</span> para <br>la educación de mi hija”
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Veronica Chavez <span class="d-block omnes-medium lh-1"> 30 años</span>
                  b-carousel-slide(img-blank img-alt="comentarios seguro universitario con devolucion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro universitario")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/universitario/home/testimonio_carlos-seguro_estudiantil.png" alt="testimonio de seguro universitario")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 “Protejo la educación de mi hija <br>pagando <span class="text-primary omnes-semibold">S/ 244</span> al mes.<br> Al final me devolverán<br> <span class="text-primary omnes-semibold">S/ 40,000</span>. ¡Una gran inversión!”
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Carlos L. Gonzales <span class="d-block omnes-medium lh-1"> 35 años</span>
                  b-carousel-slide(img-blank  img-alt="comentarios seguro universitario con devolucion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro universitario")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/universitario/home/testimonio_ignacio-seguro_estudiantil.png" alt="testimonio de seguro universitario")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 “Protejo a mis pequeños con <br><span class="text-primary omnes-semibold">S/ 200,000</span> en caso un día no esté <br>para ellos pagando <span class="text-primary omnes-semibold">S/ 135</span> al mes.<br> Me siento más tranquilo.”
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Ignacio A. Martinez <span class="d-block omnes-medium lh-1"> 45 años</span>
                b-row.box.justify-content-center.px-0.d-none.d-lg-flex
                  b-col(lg="4" xl="3")
                    div.borde.bg-white
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro universitario")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(style="width: 80px;" src="@/static/media/universitario/home/testimonio_veronica-seguro_estudiantil.png" alt="testimonio de seguro universitario")
                        b-col.text-center.mt-4.mb-3.px-0(cols="12")
                          h4 “Pagaré <span class="text-primary omnes-semibold">S/ 207</span> mensual y si todo <br>sale bien recibiré <span class="text-primary omnes-semibold">S/ 33,500</span> para <br>la educación de mi hija”
                          h3.omnes-medium.mt-2(style="color: #454A6C;") Veronica Chavez <span class="d-block omnes-medium lh-1"> 30 años</span>
                  b-col(lg="4" xl="3")
                    div.borde.bg-white
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro universitario")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(style="width: 80px;" src="@/static/media/universitario/home/testimonio_carlos-seguro_estudiantil.png" alt="testimonio de seguro universitario")
                        b-col.text-center.mt-4.mb-3.px-0(cols="12")
                          h4 “Protejo la educación de mi hija <br>pagando <span class="text-primary omnes-semibold">S/ 244</span> al mes.<br> Al final me devolverán<br> <span class="text-primary omnes-semibold">S/ 40,000</span>. ¡Una gran inversión!”
                          h3.omnes-medium.mt-2(style="color: #454A6C;") Carlos L. Gonzales <span class="d-block omnes-medium lh-1"> 35 años</span>
                  b-col(lg="4" xl="3")
                    div.borde.bg-white
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro universitario")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(style="width: 80px;" src="@/static/media/universitario/home/testimonio_ignacio-seguro_estudiantil.png" alt="testimonio de seguro universitario")
                        b-col.text-center.mt-4.mb-3.px-0(cols="12")
                          h4 “Protejo a mis pequeños con <br><span class="text-primary omnes-semibold">S/ 200,000</span> en caso un día no esté <br>para ellos pagando <span class="text-primary omnes-semibold">S/ 135</span> al mes.<br> Me siento más tranquilo.”
                          h3.omnes-medium.mt-2(style="color: #454A6C;") Ignacio A. Martinez <span class="d-block omnes-medium lh-1"> 45 años</span>
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
import AssistanceHome from '@/components/common/AssistanceHome'
import Counter from '@/components/common/Counter'

import * as _ from 'lodash'
export default {
  layout: 'home',
  data () {
    return {
      numeroAsegurados: '2,000,000',
      name: 'Carlos',
      stock: this.$store.state.common.currentVoucher,
      showSections: false,
      showCTA: false,
      interval: null,
      lastSection: null,
      currentSection: null,
      textos: [
        {
          id: '1',
          titulo: 'Asistencia académicas',
          imagen: require("@/static/media/seguro_vida/home/asistencia_academica.svg"),
          styleCss: 'height: 7rem;',
          descripcion: [
              '<h4 class="my-2" style="color: #212529;"> Servicio de tutor a domicilio <br>para el repaso de RM, RV e inglés</h4>',
              '<h4 class="my-2" style="color: #212529;"> Orientación vocacional telefónica</h4>',
              '<h4 class="my-2" style="color: #212529;"> Asesoría telefónica para prácticas <br>pre profesionales (armar CV, primer empleo, tips para entrevistas)</h4>',
              '<h4 class="my-2" style="color: #212529;"> Evaluación psicológica telefónica</h4>'
          ]
        },
        {
          id: '2',
          titulo: 'Asistencia médica',
          imagen: require("@/static/media/seguro_vida/home/asistencia_medica.svg"),
          styleCss: 'height: 7rem;',
          descripcion: [
              '<h4 class="my-2" style="color: #212529;"> Asistencia médica ambulatoria</h4>',
              '<h4 class="my-2" style="color: #212529;"> Médico a domicilio</h4>',
              '<h4 class="my-2" style="color: #212529;"> Traslado en ambulancia por <br> urgencia</h4>',
              '<h4 class="my-2" style="color: #212529;"> Masajista a domicilio</h4>'
          ]
        },
        {
          id: '3',
          titulo: 'Asistencia hogar',
          imagen: require("@/static/media/seguro_vida/home/asistencia_hogar.png"),
          styleCss: 'height: 7rem;',
          descripcion: [
              '<h4 class="my-2" style="color: #212529;"> Servicio de gasfitero por emergencia</h4>',
              '<h4 class="my-2" style="color: #212529;"> Servicio de electricista por emergencia</h4>',
              '<h4 class="my-2" style="color: #212529;"> Servicio de cerrajero por emergencia</h4>',
              '<h4 class="my-2" style="color: #212529;"> Servicio de vidriero por emergencia</h4>'
          ]
        },
        {
          id: '4',
          titulo: 'Asistencia vial',
          imagen: require("@/static/media/seguro_vida/home/asistencia_vial.svg"),
          styleCss: 'height: 5rem;margin-bottom: 1rem;margin-top:1rem;',
          descripcion: [
              '<h4 class="my-2" style="color: #212529;"> Traslado de vehículo en grúa</h4>',
              '<h4 class="my-2" style="color: #212529;"> Auxilio vial por emergencia</h4>',
              '<h4 class="my-2" style="color: #212529;"> Información y localización de <br> respuestos y accesorios vehiculares</h4>',
              '<h4 class="my-2" style="color: #212529;"> Referencia de talleres mecánicos <br>especializados</h4>'
          ]
        }
        
      ],
      preguntasFrecuentes: [
        {
          id: 'pregunta1',
          preguntas: '¿Qué es un seguro universitario?',
          // imagen: require("@/static/media/seguro_vida/home/asistencia_academica.svg"),
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3> Es un seguro que te ofrece protección para el futuro de tus hijos. Además, funciona como ahorro porque te podemos devolver hasta el 200% de tu dinero al finalizar el periodo de la póliza si la cobertura de fallecimiento no se activa durante la vigencia de la misma.</h3>'
          ]
        },
        {
          id: 'pregunta2',
          preguntas: '¿Para qué sirve un seguro universitario?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3> Este seguro te permite vivir tranquilo ya que puedes proteger ante algún imprevisto hasta 4 personas de tu familia. En caso no suceda ningún imprevisto, te devolveremos todo el dinero pagado durante la vigencia del seguro para que puedas disponer de ese dinero el futuro academico de tus hijos.</h3>'
          ]
        },
        {
          id: 'pregunta3',
          preguntas: '¿Cuánto cuesta tu seguro universitario?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3>El precio varía según la edad y la cantidad de años que contrates el seguro, tenemos planes desde S/38 mensuales.</h3>'
          ]
        },
        {
          id: 'pregunta4',
          preguntas: '¿Por qué es importante tener un seguro universitario?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3> - Te permite proteger el estilo de vida de tu familia</h3>',
              '<h3> - Aseguras el futuro de tus hijos</h3>',
              '<h3> - Sirve como un ahorro adicional</h3>',
              '<h3> - Accedes al programa de beneficios de clientes <a target="_blank" href="https://www.interseguro.pe/vivemas" rel="noopener"> &nbsp;Vive +</a></h3>'
          ]
        }
      ]
    }
  },
  head: {
    title: 'Asegura el futuro de tus hijos - Seguro universitario',
    meta: [
      { hid: 'description', name: 'description', content: 'Seguro universitario, el fondo de ahorro para asegurar el futuro de tus hijos. Fácil, rápido y lo mejor de todo, 100% digital desde S/ 1.3 al día.' },
      { hid: 'keywords', name: 'keywords', content: 'seguros, universitario, universitario, seguro universitario, cubrimos coronavirus, coronavirus, universitario nacional, universitario internacional' },
      { hid: 'author', name: 'author', content: 'Interseguro | Seguro universitario' },
      { hid: 'copyright', name: 'copyright', content: 'Interseguro Seguro universitario' },
      // Facebook
      { hid: 'fb:og:title', property: 'og:title', content: 'El fondo de ahorro para asegurar el futuro de tus hijos' },
      { hid: 'fb:og:image', property: 'og:image', content: process.env.base + 'seguro-de-vida/media/images/share/card_facebook_seguro_universitario.png' },
      { hid: 'fb:og:url', property: 'og:url', content: process.env.base + 'seguro-de-vida/universitario' },
      { hid: 'fb:og:description', property: 'og:description', content: 'Fácil, rápido y lo mejor de todo, 100% digital desde S/ 1.3 al día.' },
      { hid: 'fb:og:site_name', property: 'og:site_name', content: 'Seguro universitario Interseguro' },
      { hid: 'fb:og:image:alt', property: 'og:image:alt', content: 'Interseguro, Seguro universitario' },
      // whatsapp
      { hid: 'wsp:image', property: 'og:image', itemprop: 'image', content: process.env.base + 'seguro-de-vida/media/images/share/card_whatsapp_seguro_universitario.png' },
      // // Twitter
      { hid: 'twitter:title', property: 'twitter:title', content: 'El fondo de ahorro para asegurar el futuro de tus hijos' },
      { hid: 'twitter:image', property: 'twitter:image', content: process.env.base + 'seguro-de-vida/media/images/share/card_facebook_seguro_universitario.png' },
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
    this.$store.commit('common/setSubchannel', 'V2_UNIVERSITARIO')
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
    goAmplitude () {
      let seccionVista = ''
      let valAct = window.scrollY
      let varCotiza = this.$refs['cotiza']?.offsetTop
      let varConcepto = this.$refs['concepto']?.offsetTop - 100
      let varBeneficios = (valAct > 300) ? (this.$refs['beneficios']?.offsetTop - 100) : 0
      let varMercado = (valAct > 300) ? (this.$refs['beneficios_mercado']?.offsetTop - 100) : 0
      let varAsistencia = (valAct > 300) ? (this.$refs['asistencia']?.offsetTop - 100) : 0
      let varTestimonios = (valAct > 300) ? (this.$refs['testimonios']?.offsetTop - 100) : 0
      let varConsulta = (valAct > 300) ? (this.$refs['consulta']?.offsetTop - 100) : 0
      if (varCotiza <= valAct && valAct < varConcepto) {
        this.currentSection = 'Concepto'
      }
      else if (varConcepto <= valAct && valAct < varBeneficios) {
        this.currentSection = '3 Pasos'
      }
      else if (varBeneficios <= valAct && valAct < varMercado) {
        this.currentSection = 'Beneficios'
      }
      else if (varMercado <= valAct && valAct < varAsistencia) {
        this.currentSection = 'Asistencias'
      }
      else if (varAsistencia <= valAct && valAct < varTestimonios) {
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
