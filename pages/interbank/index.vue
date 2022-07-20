<template lang="pug">
  div
    section#home(ref="home")
      b-container
        div.box-cotiza
          b-row.cotiza.pt-5.promocion(ref="cotiza")
            b-col.title.left.mt-lg-0.promocion(cols="12" lg="6" xl="7" order="1" order-lg="2")
              h1(style="color:transparent; position: absolute;") Seguro de vida Interbank
              a.d-lg-none(href="/seguro-de-vida/interbank/tyc")
                | Términos y condiciones <span class="omnes-semibold">aquí</span>
              a(href="/seguro-de-vida/interbank/tyc" style="width: 100%; height: 80%;top:0;")
              //- b-row.principal.justify-content-center.justify-content-lg-left
                b-col.pl-2.pl-xl-0.px-0.px-lg-0(cols="11" lg="12")
                  h1.omnes-medium.text-primary.lh-1.d-xl-none Protege a los que más amas
                    p.omnes-medium.pt-0 &nbsp; y <span class="omnes-semibold">recupera todo tu dinero </span>
                  h1.omnes-medium.text-primary.lh-1.d-none.d-xl-block Protege a los que más <hr class="my-2"> amas <br> y <span class="omnes-semibold">recupera</span> <hr class="my-2"> <span class="omnes-semibold">todo tu dinero </span>
            b-col.content.right.pl-lg-0(cols="12" lg="6" xl="5" order="2" order-lg="1")
              section.box-quote
                b-container
                  div.pila.bg-primary
                    h2.text-white.omnes-medium Desde <span class="omnes-semibold">S/23 al mes</span>
                  b-row.h-100
                    b-col(cols="12")
                      b-row
                        b-col.text-center(cols="12")
                          h3.text-primary.omnes-medium Cotiza tu seguro de vida ahora
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
                    img(src="@/static/media/interbank/home/compra_digital_seguro_vida.svg" alt="compra de forma digital de seguro de vida")
                  b-col.pr-0.pl-0(cols="7" lg="8" xl="7")
                    h3.text-dark.omnes-medium 100% online
                    h4 Compra tu seguro 100% online <br>para que protejas a quienes<br>m&aacute;s amas por 15 años.
              b-col.px-xl-0(cols="12" md="10" xl="4")
                b-row.content__row
                  b-col.text-right.pr-3(cols="4" xl="4")
                    img(src="@/static/media/interbank/home/beneficio_seguro_vida.svg" alt="beneficio de seguro de vida")
                  b-col.pr-0.pl-0(cols="7" lg="8")
                    h3.text-dark.omnes-medium Déjalos protegidos
                    h4 Si falleces, las personas que <br>elegiste reciben el monto total <br>de la protecci&oacute;n contratada.
              b-col.px-xl-0(cols="12" md="10" xl="4")
                b-row.content__row
                  b-col.text-right.pr-3(cols="4" xl="4")
                    img(src="@/static/media/interbank/home/devolucion_seguro_vida.svg" alt="devolucion en tu seguro de vida")
                  b-col.pr-0.pl-0(cols="7" lg="8" xl="7")
                    h3.text-dark.omnes-medium Devolución total
                    h4 Te devolvemos todo lo pagado <br>durante la p&oacute;liza en caso de que <br>no te ocurra nada.
        b-row.beneficios(ref="beneficios" v-if="showSections")
          b-col.px-0
            b-row.px-0
              b-col.title.text-center(cols="12")
                b-row(align-h="center")
                  b-col.px-lg-2(cols="12" sm="7" md="6" lg="4" xl="6")
                    h2.omnes-medium.text-primary Tenemos los mejores <br class="d-none d-lg-inline"/> beneficios del mercado
              b-col.content(cols="12")
                b-row.text-center.px-xl-0
                  b-col.my-3.px-xl-1(cols="12" lg="3")
                    b-row.px-xl-0(align-h="center")
                      b-col.img-beneficio(cols="12")
                        img.mb-2(src="@/static/media/interbank/home/beneficio_protege_seguro_vida.svg" alt="beneficio online de seguro de vida")
                      b-col.px-4.mt-2.mb-xl-2.px-xl-1(cols="11" lg="10" xl="10")
                        h3.omnes-semibold Protege hasta por S/200,000
                      b-col.texto.px-4.px-lg-0(cols="11" md="8" lg="10" xl="11")
                        h4 Quiénes tú elijas estarán protegidos en caso <br>de tu fallecimiento por el monto contratado.
                  b-col.my-3.px-xl-1(cols="12" lg="3" order-xl="2")
                    b-row.px-xl-0(align-h="center")
                      b-col.img-beneficio(cols="12")
                        img.mb-2(src="@/static/media/interbank/home/beneficio_devolucion_seguro_vida.svg" alt="beneficio devolucion de seguro de vida")
                      b-col.px-2.mt-2.mb-xl-2.px-xl-1(cols="11" lg="10" xl="12")
                        h3.omnes-semibold Recupera hasta el 200% de tu dinero
                      b-col.texto.px-lg-0(cols="11" lg="12" xl="10")
                        h4 Elige el monto de devolución con el porcentaje <br>que más se ajuste a tus necesidades.
                  b-col.my-3.px-xl-1(cols="12" lg="3" order-xl="3")
                    b-row(align-h="center")
                      b-col.img-beneficio(cols="12")
                        img.mb-2.mb-xl-2(src="@/static/media/interbank/home/beneficio_contrato_largo_seguro_vida.svg" alt="beneficio en los contratos de tu seguro de vida")
                      b-col.px-4.px-xl-0.mt-2.mb-xl-2(cols="11" lg="10" xl="10")
                        h3.omnes-semibold Contrátalo desde 10 años
                      b-col.texto.px-lg-0(cols="11" lg="12" xl="11")
                        h4 Puedes elegir un fondo desde 10 hasta <br>20 años, el periodo que más te convenga.
                  b-col.my-3.px-xl-1(cols="12" lg="3" order-xl="1")
                    b-row(align-h="center")
                      b-col.img-beneficio(cols="12")
                        img.mb-2.mb-xl-2(src="@/static/media/interbank/home/beneficio_online_seguro_vida.svg" alt="beneficio online de seguro de vida")
                      b-col.px-4.mt-2.mb-xl-2.px-xl-2(cols="11" lg="10" xl="12")
                        h3.omnes-semibold 100% online, sin papeleos
                      b-col.texto.px-lg-0(cols="11" lg="12" xl="10")
                        h4 En solo 3 pasos protegerás a quienes <br> más amas.
        //- b-row.asistencia.bg-primary(ref="testimonios" v-if="showSections")
          b-col.title.text-center(cols="12")
            b-row.text-white(align-h="center")
              b-col.pt-2.pb-4.pb-xl-5(cols="12")
                h2.omnes-medium.d-lg-none Disfruta de las <br>asistencias que tenemos <br>para ti los <span class="omnes-semibold"> 365 días del año</span>
                h2.omnes-medium.d-none.d-lg-block Disfruta de las asistencias que tenemos<br> para ti los  <span class="omnes-semibold"> 365 días del año</span>
          b-col.content.text-center.px-4.px-lg-0(cols="12")
            b-row(align-h="center")
              b-col.o-hidden.px-xl-0(cols="12" lg="11" xl="12")
                b-row
                b-carousel.d-xl-none(:interval="3000" indicators='' label-indicators="Selecciona un slide para mostrar")
                  b-carousel-slide(img-blank  img-alt="comentarios seguro de vida con devolucion")
                    b-row
                      b-col.mb-2.text-center(cols="12")
                        img(src="@/static/media/interbank/home/asistencia_medica.svg" alt="asistencia medica de seguro de vida" style="height: 7rem;")
                    b-row
                      b-col.title.mb-2(cols="12")
                        h3.omnes-semibold.text-center Asistencia médica
                      b-col.content(cols="12")
                        h4.my-2 Asistencia médica ambulatoria
                        h4.my-2 Médico a domicilio
                        h4.my-2 Traslado en ambulancia por <br> urgencia
                        h4.my-2 Masajista a domicilio
                  b-carousel-slide(img-blank  img-alt="comentarios seguro de vida con devolucion")
                    b-row
                      b-col.mb-2.text-center(cols="12")
                        img(src="@/static/media/interbank/home/asistencia_hogar.svg" alt="asistencia de hogar de seguro de vida" style="height: 7rem;")
                    b-row
                      b-col.title.mb-2(cols="12")
                        h3.omnes-semibold.text-center Asistencia hogar
                      b-col.content.pr-0(cols="12")
                        h4.my-2 Servicio de gasfitero por emergencia
                        h4.my-2 Servicio de electricista por emergencia
                        h4.my-2 Servicio de cerrajero por emergencia
                        h4.my-2 Servicio de vidriero por emergencia
                  b-carousel-slide(img-blank  img-alt="comentarios seguro de vida con devolucion")
                    b-row
                      b-col.mt-3.mb-4.text-center(cols="12")
                        img(src="@/static/media/interbank/home/asistencia_vial.svg" alt="asistencia vial de seguro de vida"  style="height: 7rem;")
                    b-row
                      b-col.title.mb-2(cols="12")
                        h3.omnes-semibold.text-center Asistencia vial
                      b-col.content(cols="12")
                        h4.my-2 Traslado de vehículo en grúa
                        h4.my-2 Auxilio vial por emergencia
                        h4.my-2 Información y localización de <br> respuestos y accesorios vehiculares
                        h4.my-2 Referencia de talleres mecánicos <br>especializados
                  b-carousel-slide(img-blank  img-alt="comentarios seguro de vida con devolucion")
                    b-row
                      b-col.mb-2.text-center(cols="12")
                        img(src="@/static/media/interbank/home/asistencia_mascota.svg" alt="asistencia para tu mascota de seguro de vida" style="height: 7rem;")
                    b-row
                      b-col.title.mb-2(cols="12")
                        h3.omnes-semibold.text-center Asistencia mascota
                      b-col.content(cols="12")
                        h4.my-2 Consulta médica veterinaria
                        h4.my-2 Hospedaje para mascotas por <br>hospitalización del dueño o viaje
                        h4.my-2 Servicio de paseo de mascota<br>  por una hora
                        h4.my-2 Servicio de baño para mascotas
                b-row.box.d-none.d-xl-flex.px-xl-0
                  b-col(cols="3")
                    div.borde
                      b-row
                        b-col.mb-2.text-center(cols="12" style="height: 7rem;")
                          img(src="@/static/media/interbank/home/asistencia_medica.svg" alt="asistencia medica de seguro de vida" style="height: 7rem;")
                      b-row
                        b-col.title.mb-2(cols="12")
                          h3.omnes-semibold.text-center Asistencia médica
                        b-col.content(cols="12")
                          h4.my-2 Asistencia médica ambulatoria
                          h4.my-2 Médico a domicilio
                          h4.my-2 Traslado en ambulancia por <br> urgencia
                          h4.my-2 Masajista a domicilio
                  b-col(cols="3")
                    div.borde
                      b-row
                        b-carousel-slide(img-blank  img-alt="comentarios seguro de vida con devolucion")
                      b-row
                        b-col.mb-2.text-center(cols="12" style="height: 7rem;")
                          img(src="@/static/media/interbank/home/asistencia_hogar.svg" alt="asistencia de hogar de seguro de vida" style="height: 7rem;")
                      b-row
                        b-col.title.mb-2(cols="12")
                          h3.omnes-semibold.text-center Asistencia hogar
                        b-col.content.pr-0(cols="12")
                          h4.my-2 Servicio de gasfitero por emergencia
                          h4.my-2 Servicio de electricista por emergencia
                          h4.my-2 Servicio de cerrajero por emergencia
                          h4.my-2 Servicio de vidriero por emergencia
                  b-col(cols="3")
                    div.borde
                      b-row
                        b-col.text-center(cols="12" style="height: 120px;")
                          img(src="@/static/media/interbank/home/asistencia_vial.svg" alt="asistencia vial de seguro de vida"  style="height: 7rem;")
                      b-row
                        b-col.title(cols="12")
                          h3.omnes-semibold.text-center Asistencia vial
                        b-col.content(cols="12")
                          h4.my-2 Traslado de vehículo en grúa
                          h4.my-2 Auxilio vial por emergencia
                          h4.my-2 Información y localización de <br> respuestos y accesorios vehiculares
                          h4.my-2 Referencia de talleres mecánicos <br>especializados
                  b-col(cols="3")
                    div.borde
                      b-row
                        b-col.mb-2.text-center(cols="12" style="height: 7rem;")
                          img(src="@/static/media/interbank/home/asistencia_mascota.svg" alt="asistencia para tu mascota de seguro de vida" style="height: 7rem;")
                      b-row
                        b-col.title.mb-2(cols="12")
                          h3.omnes-semibold.text-center Asistencia mascota
                        b-col.content(cols="12")
                          h4.my-2 Consulta médica veterinaria
                          h4.my-2 Hospedaje para mascotas por <br>hospitalización del dueño o viaje
                          h4.my-2 Servicio de paseo de mascota<br>  por una hora
                          h4.my-2 Servicio de baño para mascotas
              b-col.mt-5.telefono(cols="12")
                h3.text-white.d-xl-none Para hacer uso de las asistencias, <br>llama al (01)  500-0000 opción 2.
                h3.text-white.d-none.d-xl-block Para hacer uso de las asistencias, llama al (01)  500-0000 opción 2.
        b-row.asistencia.bg-primary
          b-container
            b-row.pb-4.pb-xl-5
              b-col.text-center(cols="12")
                h2.omnes-medium.text-white Disfruta de nuestras asistencias <br>con coberturas gratuitas
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
          b-container
            b-row
              b-col.text-center(cols="12")
                h3.omnes-medium.text-white(style="font-size: 1.4rem;") Para más detalle de las asistencias <br class="d-xl-none"> y beneficios visita <a target="_blank" href="https://www.interseguro.pe/vivemas" rel="noopener" class="omnes-semibold text-white">VIVE +</a>
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
                  b-carousel-slide(img-blank  img-alt="comentarios seguro de vida con devolucion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro de vida")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/seguro_vida/home/testimonio_margarita-seguro_de_vida.png" alt="testimonio de seguro de vida")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 “Estoy protegiendo a mis padres <br>y hermanos,¡Tan solo pagando<br> <span class="text-primary omnes-semibold">S/ 61</span> al mes!Sé que todo saldrá bien,<br> al final obtendré <span class="text-primary omnes-semibold">S/ 14,600</span>.”
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Margarita S. Guzman, 28 años
                  b-carousel-slide(img-blank img-alt="comentarios seguro de vida con devolucion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro de vida")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/seguro_vida/home/testimonio_alberto-seguro_de_vida.png" alt="testimonio de seguro de vida")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 "Me siento tranquilo protegiendo <br> a mi familia pagando <span class="text-dark omnes-semibold">S/ 68 </span> al <br> mes. Terminando me devolverán <br> <span class="text-dark omnes-semibold">S/ 20,529</span>. ¡Es genial!"
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Alberto T. Campos, 36 años
                  b-carousel-slide(img-blank  img-alt="comentarios seguro de vida con devolucion")
                    img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro de vida")
                    b-row.d-flex.d-xl-none
                      b-col.text-center(cols="12" lg="4")
                        img.icono-testimonio(src="@/static/media/seguro_vida/home/testimonio_demesio-seguro_de_vida.png" alt="testimonio de seguro de vida")
                      b-col.text-center.px-0.mt-4(cols="12")
                        h4 "Protejo a mis amados esposa <br> y nietos por <span class="text-dark omnes-semibold">S/ 150,000</span>,  <br> pagando al mes <span class="text-dark omnes-semibold">S/ 72 </span>.<br> Ahora estoy tranquilo."
                        h3.omnes-medium.mt-2(style="color: #454A6C;") Demesio M. Paredes, 49 años
                b-row.box.justify-content-center.px-0.d-none.d-lg-flex
                  b-col(lg="4" xl="3")
                    div.borde
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro de vida")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(style="width: 80px;" src="@/static/media/seguro_vida/home/testimonio_margarita-seguro_de_vida.png" alt="testimonio de seguro de vida")
                        b-col.text-center.mt-4.mb-3(cols="12")
                          h4 “Estoy protegiendo a mis padres <br>y hermanos,¡Tan solo pagando<br> <span class="text-primary omnes-semibold">S/ 61</span> al mes!Sé que todo saldrá bien,<br> al final obtendré <span class="text-primary omnes-semibold">S/ 14,600</span>.”
                          h3.omnes-medium.mt-2(style="color: #454A6C;") Margarita S. Guzman, 28 años
                  b-col(lg="4" xl="3")
                    div.borde
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro de vida")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(src="@/static/media/seguro_vida/home/testimonio_alberto-seguro_de_vida.png" alt="testimonio de seguro de vida")
                        b-col.text-center.mt-4.mb-3(cols="12")
                          h4 "Me siento tranquilo protegiendo <br> a mi familia pagando <span class="text-dark omnes-semibold">S/ 68 </span> al <br> mes. Terminando me devolverán <br> <span class="text-dark omnes-semibold">S/ 20,529</span>. ¡Es genial!"
                          h3.omnes-medium.mt-2(style="color: #454A6C;") Alberto T. Campos, 36 años
                  b-col(lg="4" xl="3")
                    div.borde
                      img(src="@/static/media/seguro_vida/home/icono_protege.svg" alt="icono protege seguro de vida")
                      b-row.d-flex
                        b-col.text-center(cols="12")
                          img.icono-testimonio(src="@/static/media/seguro_vida/home/testimonio_demesio-seguro_de_vida.png" alt="testimonio de seguro de vida")
                        b-col.text-center.mt-4.mb-3(cols="12")
                          h4 "Protejo a mis amados esposa <br> y nietos por <span class="text-dark omnes-semibold">S/ 150,000</span>,  <br> pagando al mes <span class="text-dark omnes-semibold">S/ 72 </span>. <br>Ahora estoy tranquilo."
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
  layout: 'homeinterbank',
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
          preguntas: '¿Qué es un seguro de vida con devolución?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3>Es un seguro que te ofrece protección para los que más amas en caso de fallecimiento natural o por accidente. Además, funciona como ahorro porque te podemos devolver hasta el 200% de tu dinero al finalizar el periodo de la póliza si la cobertura de fallecimiento no se activa durante la vigencia de la misma.</h3>'
          ]
        },
        {
          id: 'pregunta2',
          preguntas: '¿Para qué sirve un seguro de vida con devolución?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3> Este seguro te permite vivir tranquilo ya que puedes proteger ante algún imprevisto hasta 4 personas de tu familia. En caso no suceda ningún imprevisto, te devolveremos todo el dinero pagado durante la vigencia del seguro para que puedas disponer de ese dinero para lo que necesites.</h3>'
          ]
        },
        {
          id: 'pregunta3',
          preguntas: '¿Cuánto cuesta tu seguro de vida con devolución?',
          styleCss: 'height: 7rem;',
          respuestas: [
              '<h3>El precio varía según la edad y la cantidad de años que contrates el seguro, tenemos planes desde S/23 mensuales.</h3>'
          ]
        },
        {
          id: 'pregunta4',
          preguntas: '¿Por qué es importante tener un seguro de vida con devolución?',
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
  components: {
    FormDni,
    AboutSeguroVida,
    Star
  },
  created () {
    this.$store.commit('common/setSubchannel', 'IBK_PROMOCION_VALE_150')
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
