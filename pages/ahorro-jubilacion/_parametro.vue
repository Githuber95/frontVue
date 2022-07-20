<template lang="pug">
  div.jubilacion#home(ref="home")
    section
      b-container
        div.box-cotiza
          b-row.cotiza.pt-5.vale_descuento(ref="cotiza")
            b-col.title.left.mt-lg-0.vale_descuento(cols="12" lg="6" xl="7" order="1" order-lg="2" lazy-background="~/static/media/common/home/banner_descuento-responsive.svg")
              h1(style="color:transparent; position: absolute;") Ahorro Jubilación
              a.d-xl-none(href='/seguro-de-vida/tyc' style="color: #fff!important") *T&eacute;rminos y condiciones  
                span.omnes-semibold aqu&iacute;
              a.d-none.d-xl-block(href='/seguro-de-vida/tyc' style="color: #fff!important") *T&eacute;rminos y condiciones de campaña 
              Counter(diaHasta="24" :mesHasta="4" :anio="2022")
              div.stock
                h3.omnes-semibold.text-white ¡Solo por 2 días! 
                //- h3.omnes-semibold.text-white ¡Stock limitado!
                //- h4.omnes-semibold.text-white Solo quedan {{ stock }}  
              
              // b-row.principal.justify-content-center.justify-content-lg-left
                // b-col.d-lg-none(cols="12" sm="9" md="8")
                  img.w-100.mt-sm-4(src="@/static/media/seguro_vida/home/banner_hotsale-completo.png" alt="hot sale descuento")
                // b-col.d-none.d-lg-block.pl-xl-5(cols="12")
                  img.w-100.mt-1.mt-sm-3(src="@/static/media/seguro_vida/home/banner_hotsale-desktop.png" alt="hot sale descuento")
                // Counter(diahasta="10" :mesHasta="4" :anio="2022")
                // p.tyc.text-white.d-none.d-lg-block.pl-5 *Ver términos y condiciones sobre la promoción y devoluciones <a href="/seguro-de-vida/tyc" class="text-white omnes-semibold">  aquí </a>
                b-col.px-0.px-lg-0(cols="12")
                  h1.omnes-semibold.text-primary.lh-1.d-xl-none Protege tu futuro <span class="omnes-medium">ahorrando <br>para tu fondo de jubilaci&oacute;n </span>
                  h1.omnes-medium.text-primary.lh-1.d-none.d-xl-block <span class="omnes-semibold">Protege tu futuro </span><hr class="my-2"> <br> ahorrando para tu  <hr class="my-2">fondo de jubilación
            b-col.content.right.pl-lg-0(cols="12" lg="6" xl="5" order="2" order-lg="1")
              section.box-quote
                b-container
                  div.pila.bg-primary
                    h2.text-white.omnes-medium Desde <span class="omnes-semibold">S/38 al mes</span>
                    //- h2.text-white.omnes-medium Hasta <span class="omnes-semibold">15% dscto.</span>
                  b-row.h-100
                    b-col(cols="12")
                      b-row
                        b-col.text-center(cols="12")
                          h3.text-primary.omnes-medium Cotiza tu ahorro jubilación ahora
                      b-row.justify-content-center.px-0
                        b-col.px-0(cols="12")
                          form-dni.mt-2
                      //- b-row.justify-content-center.mt-2.mt-lg-3
                        b-col(cols="11" lg="10")
                          div.asegurados
                            img(src="@/static/media/seguro_vida/home/asegurados.svg" alt="asegurados")
                            h4.pl-2.text-primary M&aacute;s de <span class="omnes-semibold">{{numeroAsegurados}} </span>de asegurados
                      b-row.mt-2.mt-lg-3.mb-4.mb-lg-5
                        b-col.text-center
                          p.d-inline Con el respaldo del grupo:
                          img.d-inline.text-center.mt-lg-0.ml-2(style="width: 6.5rem;" src="@/static/media/seguro_vida/home/grupo_intercorp.svg" alt="respaldo de intercorp" stlye="width:104px;height:22px;")        
        div.concepto.como-funciona_seguro-vida.py-1.py-xl-3(ref="concepto")
          b-container
            b-row
              b-col.text-center.mt-4.mb-3.my-md-4
                h2.text-primary.omnes-medium Jorge tendrá una <br class="d-lg-none"><span class="omnes-semibold">jubilaci&oacute;n tranquila </span>  y<br class="d-lg-none"> <span class="omnes-semibold">sin apuro <br class="d-none d-lg-block"> econ&oacute;micos</span>, conoce c&oacute;mo:
            b-row.justify-content-center.d-lg-none
              b-col.mt-3.mb-5(cols="11" sm="9" md="7")
                img.w-100(src="@/static/media/ahorro_jubilacion/home/linea_tiempo-ahorro_jubilacion_mobile.png" alt="linea de tiempo ahorro jubilacion")
            b-row.justify-content-center.d-none.d-lg-flex
              b-col.mt-3.mb-5(cols="12")
                img.w-100(src="@/static/media/ahorro_jubilacion/home/linea_tiempo-ahorro_jubilacion.png" alt="linea de tiempo ahorro jubilacion")
        b-row.beneficios(ref="beneficios" v-if="showSections")
          b-col.px-0
            b-row.px-0
              b-col.title.text-center(cols="12")
                b-row(align-h="center")
                  b-col.px-1.px-lg-2(cols="12" lg="4" xl="6")
                    h2.omnes-medium.text-primary Protege a quienes más amas <br />y ahorra en solo 3 pasos
              b-col.content(cols="12")
                b-row.mb-lg-4.align-items-center 
                  b-col.d-none.d-lg-block(cols="12" lg="6")
                    img.w-100.h-auto(src="@/static/media/seguro_vida/home/paso_1_y_paso_2.svg" alt="paso 1 y paso 2")
                  b-col.px-1(cols="12" lg="6")
                    b-row
                      b-col.my-3.pr-0(cols="12" lg="12")
                        b-row.align-items-center.justify-content-center.justify-content-lg-end
                          b-col.text-right.pr-0.px-xl-0(cols="3")
                            img(src="@/static/media/seguro_vida/home/paso_1.svg" alt="paso 1 mantenernos en contacto")
                          b-col.pr-0.pl-3(cols="8" xl="9")
                            p.text-secondary.omnes-medium Paso 1
                            h3.omnes-semibold Mantenernos en contacto
                            h4 Ingresa tus datos personales <br>y los de contacto para poder elaborar <br>tu cotización.
                      b-col.my-3.pr-0(cols="12" lg="12")
                        b-row.align-items-centr.justify-content-center.justify-content-lg-end
                          b-col.text-right.pr-0.px-xl-0(cols="3")
                            img(src="@/static/media/seguro_vida/home/paso_2.svg" alt="paso 2 cotiza un seguro a tu medida")
                          b-col.pr-0.pl-3(cols="8" xl="9")
                            p.text-secondary.omnes-medium Paso 2
                            h3.omnes-semibold Cotiza un seguro a tu medida
                            h4 Elige un monto hasta S/ 200,000 <br>con el que proteger&aacute;s <br>a los que más amas.
                b-row.align-items-center 
                  b-col.px-1(cols="12" lg="6")
                    b-row
                      // b-col.my-3.pr-0(cols="12" lg="12")
                        b-row.align-items-center.justify-content-center.justify-content-lg-start
                          b-col.text-right.text-lg-left.pr-0.px-xl-0(cols="3")
                            img(src="@/static/media/seguro_vida/home/paso_3.svg" alt="paso 3 elige a quienes proteger")
                          b-col.pr-0.pl-3.pl-lg-0(cols="8" xl="9")
                            p.text-secondary.omnes-medium Paso 3
                            h3.omnes-semibold Elige a quienes proteger
                            h4 Ingresa los datos de las personas <br>que recibirán el monto de la <br>protección contratada en caso <br>un día no estés.
                      b-col.my-3.pr-0(cols="12" lg="12")
                        b-row.align-items-center.justify-content-center.justify-content-lg-start
                          b-col.text-right.text-lg-left.pr-0.px-xl-0(cols="3")
                            img(src="@/static/media/seguro_vida/home/paso_4.svg" alt="paso 4 paga y listo")
                          b-col.pr-0.pl-3.pl-lg-0(cols="8" xl="9")
                            p.text-secondary.omnes-medium Paso 3
                            h3.omnes-semibold Finaliza la compra
                            h4 Ingresa los datos de tu tarjeta de <br>crédito o débito para el pago de tu <br>seguro.<span class="d-none d-xl-inline"> Los próximos pagos se <br>realizarán de manera automática en <br>la tarjeta afiliada.</span>
                  b-col.d-none.d-lg-block(cols="12" lg="6")
                    img.w-100.h-auto(src="@/static/media/seguro_vida/home/paso_3_y_paso_4.svg" alt="paso 3 y paso 4")
        b-row.beneficios_mercado(ref="beneficios_mercado" v-if="showSections")
          b-col.title.text-center(cols="12")
            b-row(align-h="center")
              b-col.px-lg-2(cols="12" sm="7" md="6" lg="10" xl="10")
                h2.omnes-medium.text-primary Tenemos los mejores beneficios del mercado
          b-col.content(cols="12")
            b-row.text-center.px-xl-0
              b-col.my-3.px-xl-1(cols="12" lg="3")
                b-row.px-xl-0(align-h="center")
                  b-col.img-beneficio(cols="12")
                    img.mb-2(src="@/static/media/seguro_vida/home/beneficio_devolucion_seguro_vida.svg" alt="beneficio devolucion de ahorro de jubilacion")
                  b-col.px-2.mt-2.mb-xl-2.px-xl-1(cols="11" lg="10" xl="12")
                    h3.omnes-medium.text-secondary Ahorra y te devolvemos hasta 200%
                  b-col.texto.px-lg-0(cols="11" lg="12" xl="10")
                    h4 Elige el porcentaje de ahorro que<br> necesites para invertir en tu <br>fondo de jubilaci&oacute;n.
              b-col.my-3.px-xl-1(cols="12" lg="3")
                b-row(align-h="center")
                  b-col.img-beneficio(cols="12")
                    img.mb-2.mb-xl-2(src="@/static/media/seguro_vida/home/beneficio_contrato_largo_seguro_vida.svg" alt="beneficio en los contratos de tu seguro ahorro jubilacion")
                  b-col.px-4.px-xl-0.mt-2.mb-xl-2(cols="11" lg="10" xl="10")
                    h3.omnes-medium.text-secondary Contrátalo hasta por 25 años
                  b-col.texto.px-lg-0(cols="11" lg="12" xl="11")
                    h4 Puedes elegir un fondo desde 10 <br>hasta 25 años, el periodo que<br> más te convenga.
              b-col.my-3.px-xl-1(cols="12" lg="3")
                b-row.px-xl-0(align-h="center")
                  b-col.img-beneficio(cols="12")
                    img.mb-2(src="@/static/media/seguro_vida/home/beneficio_protege_seguro_vida.svg" alt="beneficio online de ahorro de jubilacion")
                  b-col.px-4.mt-2.mb-xl-2.px-xl-1(cols="11" lg="10" xl="10")
                    h3.omnes-medium.text-secondary Protege hasta por S/200,000
                  b-col.texto.px-4.px-lg-0(cols="11" md="8" lg="10" xl="11")
                    h4 En caso de fallecimiento, los que más <br>amas estarán protegidos con este <br>respaldo económico.
              b-col.my-3.px-xl-1(cols="12" lg="3")
                b-row(align-h="center")
                  b-col.img-beneficio(cols="12")
                    img.mb-2.mb-xl-2(src="@/static/media/seguro_vida/home/beneficio_online_seguro_vida.svg" alt="beneficio online de ahorro de jubilacion")
                  b-col.px-4.mt-2.mb-xl-2.px-xl-2(cols="11" lg="10" xl="12")
                    h3.omnes-medium.text-secondary 100% online, sin papeleos
                  b-col.texto.px-lg-0(cols="11" lg="12" xl="10")
                    h4 Contrátalo sin necesidad <br>de evaluaciones médicas <br>ni papeleos.
        //- b-row.asistencia.bg-primary(ref="testimonios" v-if="showSections")
          b-col.title.text-center(cols="12")
            b-row.text-white(align-h="center")
              b-col.pt-2.pb-4.pb-xl-5(cols="12")
                h2.omnes-medium.d-lg-none Disfruta de nuestras asistencias gratuitas <br>de hasta por <span class="omnes-semibold"> S/ 300</span>
                h2.omnes-medium.d-none.d-lg-block Disfruta de nuestras asistencias <br>gratuitas de hasta por <span class="omnes-semibold"> S/ 300</span>
          AssistanceHome(:textos="textos")
        b-row.asistencia(ref="asistencia" style="background-color: rgba(241,244,249,0.50196)")
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
        b-row.testimonios.px-lg-0(ref="testimonios" v-if="showSections")
          b-col.title.text-center(cols="12")
            b-row.text-white(align-h="center")
              b-col.pt-2.pb-3(cols="12")
                h2.omnes-medium.text-primary ¡Ellos ya protegen <br> a quienes más aman!
          b-col.content.text-center.px-4.px-lg-0(cols="12")
            b-row(align-h="center")
              b-col.o-hidden.px-lg-0(cols="12" lg="11" xl="12")
                b-row
                b-carousel.d-lg-none(:interval="93000" indicators='' label-indicators="Selecciona un slide para mostrar")
                  b-carousel-slide(img-blank  img-alt="comentarios seguro de ahorro de jubilacion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege ahorro de jubilacion")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/ahorro_jubilacion/home/testimonio_vanesa-ahorro_jubilacion.png" alt="testimonio de ahorro de jubilacion")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 “Soy independiente y quiero tener un <br>fondo de ahorro para mi jubilación.<br> Ahora pago <span class="text-primary omnes-semibold">S/ 250</span> al mes y tendré este <br>fondo para cuando ya deje de trabajar.”
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Vanesa Parodi <span class="d-block omnes-medium lh-1"> 31 años</span>
                  b-carousel-slide(img-blank img-alt="comentarios seguro de ahorro de jubilacion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege ahorro de jubilacion")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/ahorro_jubilacion/home/testimonio_carlos-ahorro_jubilacion.png" alt="testimonio de ahorro de jubilacion")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 “Estoy tranquilo porque si un día no estoy <br>para mi familia ellos podrán recibir <br><span class="text-primary omnes-semibold">S/ 150,000</span>. Si nada me pasa en esos <br>años, tendré un fondo de <span class="text-primary omnes-semibold">S/ 45,000</span><br> para mi jubilación.”
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Carlos Montero <span class="d-block omnes-medium lh-1"> 38 años</span>
                  b-carousel-slide(img-blank  img-alt="comentarios seguro de ahorro de jubilacion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege ahorro de jubilacion")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/ahorro_jubilacion/home/testimonio_jose-ahorro_jubilacion.png" alt="testimonio de ahorro de jubilacion")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 “Este seguro me ayudará a tener un <br>fondo adicional para mi jubilación de <br><span class="text-primary omnes-semibold">S/ 45,000</span>. Además me gusta porque <br>protege si un día no estoy para ellos.”
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Jose Avila <span class="d-block omnes-medium lh-1"> 42 años</span>
                b-row.box.justify-content-center.px-0.d-none.d-lg-flex
                  b-col(lg="4" xl="3")
                    div.borde
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege ahorro de jubilacion")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(style="width: 80px;" src="@/static/media/ahorro_jubilacion/home/testimonio_vanesa-ahorro_jubilacion.png" alt="testimonio de ahorro de jubilacion")
                        b-col.text-center.mt-4.mb-3.px-0(cols="12")
                          h4 “Soy independiente y quiero tener un <br>fondo de ahorro para mi jubilación.<br> Ahora pago <span class="text-primary omnes-semibold">S/ 250</span> al mes y tendré este <br>fondo para cuando ya deje de trabajar.”
                          h3.omnes-medium.mt-2(style="color: #454A6C;") Vanesa Parodi <span class="d-block omnes-medium lh-1"> 31 años</span>
                  b-col(lg="4" xl="3")
                    div.borde
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege ahorro de jubilacion")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(style="width: 80px;" src="@/static/media/ahorro_jubilacion/home/testimonio_carlos-ahorro_jubilacion.png" alt="testimonio de ahorro de jubilacion")
                        b-col.text-center.mt-4.mb-3.px-0(cols="12")
                          h4 “Estoy tranquilo porque si un día no estoy <br>para mi familia ellos podrán recibir <br><span class="text-primary omnes-semibold">S/ 150,000</span>. Si nada me pasa en esos <br>años, tendré un fondo de <span class="text-primary omnes-semibold">S/ 45,000</span><br> para mi jubilación.”
                          h3.omnes-medium.mt-2(style="color: #454A6C;") Carlos Montero <span class="d-block omnes-medium lh-1"> 38 años</span>
                  b-col(lg="4" xl="3")
                    div.borde
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege ahorro de jubilacion")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(style="width: 80px;" src="@/static/media/ahorro_jubilacion/home/testimonio_jose-ahorro_jubilacion.png" alt="testimonio de ahorro de jubilacion")
                        b-col.text-center.mt-4.mb-3.px-0(cols="12")
                          h4 “Este seguro me ayudará a tener un <br>fondo adicional para mi jubilación de <br><span class="text-primary omnes-semibold">S/ 45,000</span>. Además me gusta porque <br>protege si un día no estoy para ellos.”
                          h3.omnes-medium.mt-2(style="color: #454A6C;") Jose Avila <span class="d-block omnes-medium lh-1"> 42 años</span>
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
      numeroAsegurados: '200,000',
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
          id: '2',
          titulo: 'Asistencia vial',
          imagen: require("@/static/media/seguro_vida/home/asistencia_vial.svg"),
          styleCss: 'height: 5rem;margin-bottom: 2rem;margin-top:0rem;',
          descripcion: [
              '<h4 class="my-2" style="color: #212529;"> Traslado de vehículo en grúa</h4>',
              '<h4 class="my-2" style="color: #212529;"> Auxilio vial por emergencia</h4>',
              '<h4 class="my-2" style="color: #212529;"> Información y localización de <br> respuestos y accesorios vehiculares</h4>',
              '<h4 class="my-2" style="color: #212529;"> Referencia de talleres mecánicos <br>especializados</h4>'
          ]
        },
        {
          id: '3',
          titulo: 'Asistencia mascota',
          imagen: require("@/static/media/seguro_vida/home/asistencia_mascota.svg"),
          styleCss: 'height: 7rem;',
          descripcion: [
              '<h4 class="my-2" style="color: #212529;"> Consulta médica veterinaria</h4>',
              '<h4 class="my-2" style="color: #212529;"> Hospedaje para mascotas por <br>hospitalización del dueño o viaje</h4>',
              '<h4 class="my-2" style="color: #212529;"> Servicio de paseo de mascota<br>  por una hora</h4>',
              '<h4 class="my-2" style="color: #212529;">Servicio de baño para mascotas</h4>'
          ]
        },
        {
          id: '4',
          titulo: 'Asistencia médica',
          imagen: require("@/static/media/seguro_vida/home/asistencia_medica.svg"),
          styleCss: 'height: 7rem;',
          descripcion: [
              '<h4 class="my-2" style="color: #212529;"> Asistencia médica ambulatoria</h4>',
              '<h4 class="my-2" style="color: #212529;"> Médico a domicilio</h4>',
              '<h4 class="my-2" style="color: #212529;"> Traslado en ambulancia por <br> urgencia</h4>',
              '<h4 class="my-2" style="color: #212529;"> Masajista a domicilio</h4>'
          ]
        }
      ],
      preguntasFrecuentes: [
        {
          id: 'pregunta1',
          preguntas: '¿Qué es un seguro de ahorro jubilación?',
          // imagen: require("@/static/media/seguro_vida/home/asistencia_academica.svg"),
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3>Es un seguro que te ofrece protección para los que más amas en caso de fallecimiento natural o por accidente. Además, funciona como ahorro para un fondo de tu jubilación porque te podemos devolver hasta el 200% de tu dinero al finalizar el periodo de la póliza si la cobertura de fallecimiento no se activa durante la vigencia de la misma.</h3>'
          ]
        },
        {
          id: 'pregunta2',
          preguntas: '¿Para qué sirve un seguro de ahorro jubilación?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3> Este seguro te permite vivir tranquilo ya que puedes proteger ante algún imprevisto hasta 4 personas de tu familia. En caso no suceda ningún imprevisto, te devolveremos todo el dinero pagado durante la vigencia del seguro para que puedas disponer de ese dinero que puedes usar como fondo para tu jubilacion.</h3>'
          ]
        },
        {
          id: 'pregunta3',
          preguntas: '¿Cuánto cuesta tu seguro de ahorro jubilación?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3>El precio varía según la edad y la cantidad de años que contrates el seguro, tenemos planes desde S/38 mensuales.</h3>'
          ]
        },
        {
          id: 'pregunta4',
          preguntas: '¿Por qué es importante tener un seguro de ahorro jubilación?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3> - Te permite proteger el estilo de vida de tu familia</h3>',
              '<h3> - Aseguras un fondo para tu jubilación.</h3>',
              '<h3> - Sirve como un ahorro adicional.</h3>',
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
    title: 'Protege tu futuro ahorrando para tu fondo - Ahorro jubilación',
    meta: [
      { hid: 'description', name: 'description', content: 'Ahorro jubilación, protege tu futuro ahorrando para tu fondo de jubilación. Fácil, rápido y lo mejor de todo, 100% digital desde S/ 1.3 al día.' },
      { hid: 'keywords', name: 'keywords', content: 'seguros, ahorro jubilación, ahorro jubilación, seguro de ahorro jubilacion, cubrimos coronavirus, coronavirus, ahorro jubilación nacional, ahorro jubilación internacional' },
      { hid: 'author', name: 'author', content: 'Interseguro | Ahorro Jubilación' },
      { hid: 'copyright', name: 'copyright', content: 'Interseguro Ahorro Jubilación' },
      // Facebook
      { hid: 'fb:og:title', property: 'og:title', content: 'Protege tu futuro ahorrando para tu fondo de jubilación' },
      { hid: 'fb:og:image', property: 'og:image', content: process.env.base + 'seguro-de-vida/media/images/share/card_facebook_ahorro_jubilacion.png' },
      { hid: 'fb:og:url', property: 'og:url', content: process.env.base + 'seguro-de-vida/ahorro-jubilacion' },
      { hid: 'fb:og:description', property: 'og:description', content: 'Fácil, rápido y lo mejor de todo, 100% digital desde S/ 1.3 al día.' },
      { hid: 'fb:og:site_name', property: 'og:site_name', content: 'Ahorro Jubilación Interseguro' },
      { hid: 'fb:og:image:alt', property: 'og:image:alt', content: 'Interseguro, Ahorro Jubilación' },
      // whatsapp
      { hid: 'wsp:image', property: 'og:image', itemprop: 'image', content: process.env.base + 'seguro-de-vida/media/images/share/card_whatsapp_ahorro_jubilacion.png' },
      // // Twitter
      { hid: 'twitter:title', property: 'twitter:title', content: 'Protege tu futuro ahorrando para tu fondo de jubilación' },
      { hid: 'twitter:image', property: 'twitter:image', content: process.env.base + 'seguro-de-vida/media/images/share/card_facebook_ahorro_jubilacion.png' },
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
    this.$store.commit('common/setSubchannel', 'PROMOCION_JUBILACION')
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
      else if (varMercado <= valAct && valAct < varTestimonios) {
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
