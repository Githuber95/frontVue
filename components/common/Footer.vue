<template lang="pug">
  footer
    section(v-if="steps==='false'")
      div.footerv2.d-block.d-md-none
        .footerv2__acordeon
          div(role='tablist')
            b-card(no-body='')
              b-card-header.p-0(header-tag='header' role='tab')
                b-button(v-if="$store.state.common.channel == 'IBK'"  block='' href='#' v-b-toggle.accordion-1='') VIDA CON DEVOLUCIÓN IBK
                b-button(v-else-if="$store.state.common.channel == 'WEB'" block='' href='#' v-b-toggle.accordion-1='') VIDA CON DEVOLUCIÓN
                b-button(v-else-if="$store.state.common.channel == 'SEGURO_UNIVERSITARIO'" block='' href='#' v-b-toggle.accordion-1='') SEGURO UNIVERSITARIO
                b-button(v-else-if="$store.state.common.channel == 'AHORRO_JUBILACION'" block='' href='#' v-b-toggle.accordion-1='') AHORRO JUBILACIÓN
                b-button(v-else-if="$store.state.common.channel == 'PROTECCION_SEGURA'" block='' href='#' v-b-toggle.accordion-1='') PROTECCIÓN SEGURA
                b-button(v-else-if="$store.state.common.channel == 'AHORRO_SEGURO'" block='' href='#' v-b-toggle.accordion-1='') AHORRO SEGURO
                b-button(v-else-if="$store.state.common.channel == 'ENDOSOS'" block='' href='#' v-b-toggle.accordion-1='') SEGURO VIDA CASH
              b-collapse#accordion-1(accordion='my-accordion' role='tabpanel')
                b-card-body.acordeon-boxLista
                  b-card-text
                    ul.acordeon-ul
                      li.acordeon-lista
                        a(v-bind:href="urlCondicionadoGeneral" target="_blank" @click="visitAmplitude('footer', $store.state.common.channel, 'Condicionado General')" ) Condicionado General
                      // li.acordeon-lista
                        router-link(:to="'/preguntas-frecuentes/que-es-viaje-seguro'" target="_self") Preguntas frecuentes
                      li.acordeon-lista
                        a(v-bind:href="urlCondicionadoParticular" @click="visitAmplitude('footer', $store.state.common.channel, 'Condicionado Particular')") Condicionado Particular
                      //- li.acordeon-lista
                      //-   a(v-bind:href="urlClausulaAdicional") Cláusulas Adicionales
                      li.acordeon-lista
                        // router-link(:to="'/informacion-importante/tarifario'" target="_self") Información importante
                        a(v-bind:href="urlResumen" @click="visitAmplitude('footer', $store.state.common.channel, 'Resumen')") Resumen
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/seguro-de-vida/tyc/' @click="visitAmplitude('footer', $store.state.common.channel, 'Promociones')") Promociones
                  b-card-text
            b-card(no-body='')
              b-card-header.p-0(header-tag='header' role='tab')
                b-button(block='' href='#' v-b-toggle.accordion-2='') NOSOTROS
              b-collapse#accordion-2(accordion='my-accordion' role='tabpanel')
                b-card-body.acordeon-boxLista
                  b-card-text
                    ul.acordeon-ul
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/informacion-financiera' @click="visitAmplitude('footer', 'Nosotros', 'Clasificación de Riesgos')") Clasificaci&oacute;n de Riesgos
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/comprobantes-electronicos' @click="visitAmplitude('footer', 'Nosotros', 'Comprobantes Electrónicos')") Comprobantes Electr&oacute;nicos
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/gobierno-corporativo' @click="visitAmplitude('footer', 'Nosotros', 'Gobierno Corporativo')") Gobierno Corporativo
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/memoria-anual' @click="visitAmplitude('footer', 'Nosotros', 'Memoria Anual')") Memoria Anual
            b-card(no-body='')
              b-card-header.p-0(header-tag='header' role='tab')
                b-button(block='' href='#' v-b-toggle.accordion-3='') SEGUROS
              b-collapse#accordion-3(accordion='my-accordion' role='tabpanel')
                b-card-body.acordeon-boxLista
                  b-card-text
                    ul.acordeon-ul
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/otros-rentas' @click="visitAmplitude('footer', 'Seguros', 'Rentas y Pensiones')") Rentas y Pensiones
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/otros-vida' @click="visitAmplitude('footer', 'Seguros', 'Seguros de Vida')") Seguros de Vida
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/soat/' @click="visitAmplitude('footer', 'Seguros', 'SOAT')") SOAT
                      li.acordeon-lista
                        b-link.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/viajes' @click="visitAmplitude('footer', 'Seguros', 'Seguro de viajes')") Seguro de viajes
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/vehicular/' @click="visitAmplitude('footer', 'Seguros', 'Seguro vehicular')") Seguro vehicular
            b-card(no-body='')
              b-card-header.p-0(header-tag='header' role='tab')
                b-button(block='' href='#' v-b-toggle.accordion-4='') INFORMACI&Oacute;N DE INTER&Eacute;S
              b-collapse#accordion-4(accordion='my-accordion' role='tabpanel')
                b-card-body.acordeon-boxLista
                  b-card-text
                    ul.acordeon-ul
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/asesorate/servicio-cliente' @click="visitAmplitude('footer', 'Información de Interés', 'Servicio al Cliente')") Servicio al Cliente
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.sbs.gob.pe/usuarios/' @click="visitAmplitude('footer', 'Información de Interés', 'Portal del Usuario SBS')") Portal del Usuario SBS
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/informacion-de-siniestros' @click="visitAmplitude('footer', 'Información de Interés', 'Siniestros Rechazados')") Siniestros Rechazados
                      li.acordeon-lista
                        a.acordeon-enlace(target='_blank' rel='noopener' href='https://app.interseguro.com.pe/LibroReclamaciones/' @click="visitAmplitude('footer', 'Información de Interés', 'Libro de Reclamaciones')") Libro de Reclamaciones
        .footerv2__acordeonContacto.acordeonContacto
          .acordeonContacto__item.telefono
            span
              img(v-lazy-load data-src="@/static/media/icons/footer/telefono.svg" alt="telefono" style="width: 23px; height: 20px;")
            span &nbsp;&nbsp;(01) 500 0000
              // span
                | &nbsp;&nbsp;Ll&aacute;manos
                br.omnes-semibold
                | &nbsp;&nbsp;(01) 500 0000
        .footerv2__redesSociales.bg-primary.pt-3.pb-4
          p.text-left.pl-4 S&iacute;guenos en:
          .box-redes
            span
              a(href='https://www.facebook.com/interseguro/' @click="visitAmplitude('footer', 'Siguenos', 'Facebook')")
                img(v-lazy-load data-src="@/static/media/icons/footer/facebook.svg" alt="facebook" style="width: 52px; height: 52px;")
            span
              a(href='https://www.linkedin.com/company/interseguro-aseguradora/' @click="visitAmplitude('footer', 'Siguenos', 'Linkedin')")
                img(v-lazy-load data-src="@/static/media/icons/footer/linkedin.svg" alt="linkedin" style="width: 52px; height: 52px;")
            span
              a(href='https://www.interseguro.pe/blog/' @click="visitAmplitude('footer', 'Siguenos', 'Blog')")
                img(v-lazy-load data-src="@/static/media/icons/footer/blogger.svg" alt="blog" style="width: 52px; height: 52px;")
            span
              a(href='https://www.instagram.com/interseguroperu/')
                img(v-lazy-load data-src="@/static/media/icons/footer/instagram.svg" alt="instagram icono seguro de vida" style="width: 52px; height: 52px;")
        .footerv2__derechos.py-3
          p.text-center.lh-1(style="font-size: 11px;") Copyright &copy; {{ dateTime }} Interseguro. Todos los derechos reservados.
      div.footerv2-desktop.d-none.d-md-block
        .footerv2-d
          .superior(style="border-bottom: 1px solid #fff;")
            .superior__email
              span
                 
              span &nbsp;&nbsp;
            .superior__logo
              div(style="display:flex; justify-content: flex-end; align-items: center;")
                img.mb-3(src="@/static/media/icons/footer/logo_interseguro_blanco.png" alt="logo_blanco")
              .box-tarjetas
                img(v-lazy-load data-src="@/static/media/icons/footer/tarjetas.svg" alt="visamastercard amex dinners")
          .medio.d-flex.d-lg-none
            .medio__contacto
              .llamanos
                img(v-lazy-load data-src="@/static/media/icons/footer/telefono.svg" alt="telefono")
                span
                  | &nbsp;&nbsp;Ll&aacute;manos
                  br
                  span.omnes-semibold &nbsp;&nbsp;(01) 500 0000
            .medio__redes.d-block
              p.text-right S&iacute;guenos en:
              .box-redes
                span
                  a(href='https://www.instagram.com/interseguroperu/' @click="visitAmplitude('footer', 'Siguenos', 'Instagram')")
                    img(v-lazy-load data-src="@/static/media/icons/footer/instagram.svg" alt="instagram")
                span
                  a(href='https://www.facebook.com/interseguro/' @click="visitAmplitude('footer', 'Siguenos', 'Facebook')")
                    img(v-lazy-load data-src="@/static/media/icons/footer/facebook.svg" alt="facebook")
                span
                  a(href='https://www.interseguro.pe/blog/' @click="visitAmplitude('footer', 'Siguenos', 'Blog')")
                    img(v-lazy-load data-src="@/static/media/icons/footer/blogger.svg" alt="blog")
                span
                  a(href='https://www.linkedin.com/company/interseguro-aseguradora/' @click="visitAmplitude('footer', 'Siguenos', 'Linkedin')")
                    img(v-lazy-load data-src="@/static/media/icons/footer/linkedin.svg" alt="linkedin")
          .inferior
            .inferior__item
              p.mb-md-3(v-if="$store.state.common.channel === 'IBK'"  ) VIDA CON DEVOLUCIÓN IBK
              p.mb-md-3(v-else-if="$store.state.common.channel === 'WEB'" ) VIDA CON DEVOLUCIÓN
              p.mb-md-3(v-else-if="$store.state.common.channel === 'SEGURO_UNIVERSITARIO'" ) SEGURO UNIVERSITARIO
              p.mb-md-3(v-else-if="$store.state.common.channel === 'AHORRO_JUBILACION'" ) AHORRO JUBILACIÓN
              p.mb-md-3(v-else-if="$store.state.common.channel === 'PROTECCION_SEGURA'" ) PROTECCIÓN SEGURA
              p.mb-md-3(v-else-if="$store.state.common.channel === 'AHORRO_SEGURO'" ) AHORRO SEGURO
              p.mb-md-3(v-else-if="$store.state.common.channel === 'ENDOSOS'" ) SEGURO VIDA CASH
              ul
                li.acordeon-lista
                  a(v-bind:href="urlCondicionadoGeneral" target="_blank" @click="visitAmplitude('footer', $store.state.common.channel, 'Condicionado General')") Condicionado General
                // li.acordeon-lista
                  router-link(:to="'/preguntas-frecuentes/que-es-viaje-seguro'" target="_self") Preguntas frecuentes
                li.acordeon-lista
                  a(v-bind:href="urlCondicionadoParticular" @click="visitAmplitude('footer', $store.state.common.channel, 'Condicionado Particular')") Condicionado Particular
                //- li.acordeon-lista
                //-   a(v-bind:href="urlClausulaAdicional") Cláusulas Adicionales
                li.acordeon-lista
                  // router-link(:to="'/informacion-importante/tarifario'" target="_self") Información importante
                  a(v-bind:href="urlResumen" @click="visitAmplitude('footer', $store.state.common.channel, 'Resumen')") Resumen
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://interseguro.pe/seguro-de-vida/tyc/' @click="visitAmplitude('footer', $store.state.common.channel, 'Promociones')") Promociones
            .inferior__item
              p.mb-md-3 NOSOTROS
              ul
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/informacion-financiera' @click="visitAmplitude('footer', 'Nosotros', 'Clasificación de Riesgos')") Clasificaci&oacute;n de Riesgos
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/comprobantes-electronicos' @click="visitAmplitude('footer', 'Nosotros', 'Comprobantes Electrónicos')") Comprobantes Electr&oacute;nicos
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/gobierno-corporativo' @click="visitAmplitude('footer', 'Nosotros', 'Gobierno Corporativo')") Gobierno Corporativo
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/memoria-anual' @click="visitAmplitude('footer', 'Nosotros', 'Memoria Anual')") Memoria Anual
            .inferior__item
              p.mb-md-3 SEGUROS
              ul
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/otros-rentas' @click="visitAmplitude('footer', 'Seguros', 'Rentas y Pensiones')") Rentas y Pensiones
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/otros-vida' @click="visitAmplitude('footer', 'Seguros', 'Seguros de Vida')") Seguros de Vida
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/soat/' @click="visitAmplitude('footer', 'Seguros', 'SOAT')") SOAT
                li.acordeon-lista
                  b-link.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/viajes/' @click="visitAmplitude('footer', 'Seguros', 'Seguro de viajes')") Seguro de viajes
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/vehicular/' @click="visitAmplitude('footer', 'Seguros', 'Seguro vehicular')") Seguro vehicular
            .inferior__item
              p.mb-md-3 INFORMACI&Oacute;N DE INTER&Eacute;S
              ul
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/asesorate/servicio-cliente' @click="visitAmplitude('footer', 'Información de Interés', 'Servicio al Cliente')") Servicio al Cliente
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.sbs.gob.pe/usuarios/' @click="visitAmplitude('footer', 'Información de Interés', 'Portal del Usuario SBS')") Portal del Usuario SBS
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://www.interseguro.pe/informacion-de-siniestros' @click="visitAmplitude('footer', 'Información de Interés', 'Siniestros Rechazados')") Siniestros Rechazados
                li.acordeon-lista
                  a.acordeon-enlace(target='_blank' rel='noopener' href='https://app.interseguro.com.pe/LibroReclamaciones/' @click="visitAmplitude('footer', 'Información de Interés', 'Libro de Reclamaciones')") Libro de Reclamaciones
            .inferior__item.d-none.d-lg-block(style='width: 26%;')
              .medio.d-block
                .medio__redes
                  p.text-right S&iacute;guenos en:
                  .box-redes.mb-5.mt-lg-2
                    span
                      a(href='https://www.instagram.com/interseguroperu/' @click="visitAmplitude('footer', 'Siguenos', 'Instagram')")
                        img(v-lazy-load data-src="@/static/media/icons/footer/instagram.svg" alt="instagram")
                    span
                      a(href='https://www.facebook.com/interseguro/' @click="visitAmplitude('footer', 'Siguenos', 'Facebook')")
                        img(v-lazy-load data-src="@/static/media/icons/footer/facebook.svg" alt="facebook")
                    span
                      a(href='https://www.interseguro.pe/blog/' @click="visitAmplitude('footer', 'Siguenos', 'Blog')")
                        img(v-lazy-load data-src="@/static/media/icons/footer/blogger.svg" alt="blog")
                    span
                      a(href='https://www.linkedin.com/company/interseguro-aseguradora/' @click="visitAmplitude('footer', 'Siguenos', 'Linkedin')")
                        img(v-lazy-load data-src="@/static/media/icons/footer/linkedin.svg" alt="linkedin")
                .medio__contacto
                  .llamanos.pr-0
                    span
                      | Ll&aacute;manos&nbsp;&nbsp;
                      br
                      | (01) 500 0000&nbsp;&nbsp;
                    img(v-lazy-load data-src="@/static/media/icons/footer/telefono.svg" alt="telefono")
        .derechos
          p.text-center.lh-1.py-2 Copyright &copy; {{ dateTime }} Interseguro. Todos los derechos reservados.
    section.steps(v-else :class="[absolute ? 'abs' : '']")
      b-container
        b-row.justify-content-center.align-items-center.px-xl-0
          b-col.d-none.d-xl-block.px-0(cols="2" xl="3")
            span
               
            h6.d-inline &nbsp;&nbsp;
          b-col.px-xl-2(cols="12" xl="5")
            b-row.justify-content-center.links.align-items-center.px-xl-0
              b-col.text-xl-center(cols="12" xl="3")
                p(v-b-modal.modalCubre :class="[(modalName === 'modalCubre' || modalName === '') ? '' : 'text-light']" @click="showModal('modalCubre')") ¿Qué cubre?
              b-col.text-xl-center.px-xl-0(cols="12" xl="4")
                p(v-b-modal.modalPreguntasFrecuentes :class="[(modalName === 'modalPreguntasFrecuentes' || modalName === '') ? '' : 'text-light']" @click="showModal('modalPreguntasFrecuentes')") Preguntas frecuentes
              b-col.text-xl-center(cols="12" xl="3")
                p(v-b-modal.modalBeneficios :class="[(modalName === 'modalBeneficios' || modalName === '') ? '' : 'text-light']" @click="showModal('modalBeneficios')") Beneficios
          b-col.d-none.d-xl-block(cols="2"  offset-xl="1" xl="2")
            img(v-lazy-load data-src="@/static/media/icons/footer/logo_interseguro_blanco.png" alt="logo_blanco")
    b-modal#modalCubre(static centered hide-footer hide-header no-close-on-esc no-close-on-backdrop size="xl")
      b-container.mt-1.mt-xl-4
        b-row.d-none.d-xl-block(align-center)
          img.close(@click="hideModal('modalCubre')" src="@/static/media/icons/cerrar-magenta.svg" alt="icon close" style="cursor: pointer;")
        div.cubre
          b-row
            b-col.px-0.mt-xl-4.mb-3.mt-xl-0.mb-xl-5.text-center
              h3.omnes-medium.text-primary ¿Qué me cubre el seguro?
          b-row.justify-content-center
            b-col.px-0(cols="9" xl="3" order-xl="2")
              div
                b-row.align-items-center
                  b-col.pr-0.text-center(cols="3" xl="12")
                    img(v-lazy-load data-src="@/static/media/icons/footer/fallecimiento.svg" alt="cubre fallecimiento")
                  b-col.text-xl-center(cols="9" xl="12")
                    h6.w-100 Al terminar tu póliza si todo sale bien puedes recuperar hasta el <span class="omnes-medium"> 100% de tu dinero </span>
            b-col.px-0(cols="9" xl="3")
              div
                b-row.align-items-center
                  b-col.pr-0.text-center(cols="3" xl="12")
                    img(v-lazy-load data-src="@/static/media/icons/footer/fallecimiento.svg" alt="cubre fallecimiento")
                  b-col.text-xl-center(cols="9" xl="12")
                    h6.w-100 Fallecimiento
        div.no-cubre.mt-xl-3
          b-row
            b-col.mt-2.mt-xl-4.mb-3.mt-xl-0.mb-xl-5.text-center
              h3.omnes-medium.text-primary ¿Qué no me cubre el seguro?
          b-row.justify-content-center
            b-col.px-0(cols="9" xl="3")
              div
                b-row.align-items-center
                  b-col.pr-0.text-center(cols="3" xl="12")
                    img(v-lazy-load data-src="@/static/media/icons/footer/enfermedades_preexistentes.svg" alt="cubre fallecimiento")
                  b-col.text-xl-center(cols="9" xl="12")
                    h6.w-100 Muerte a causa de <br> enfermedades prexistente
            b-col.px-0(cols="9" xl="3")
              div
                b-row.align-items-center
                  b-col.pr-0.text-center(cols="3" xl="12")
                    img(v-lazy-load data-src="@/static/media/icons/footer/muerte.svg" alt="cubre fallecimiento")
                  b-col.text-xl-center(cols="9" xl="12")
                    h6.w-100 Muerte a causa de efectos de drogas
            b-col.d-none.d-xl-block(cols="12" xl="3")
              div
                b-row
                  b-col.pr-0.text-center(cols="3" xl="12")
                    img(v-lazy-load data-src="@/static/media/icons/footer/deportes_extremos.svg" alt="cubre fallecimiento")
                  b-col.text-xl-center(cols="10" xl="12")
                    h6.w-100 Muerte por práctica <br> de deportes extremos
            b-col.d-none.d-xl-block(cols="12" xl="3")
              div
                b-row
                  b-col.pr-0.text-center(cols="3" xl="12")
                    img(v-lazy-load data-src="@/static/media/icons/footer/hechos_delictivos.svg" alt="cubre fallecimiento")
                  b-col.text-xl-center(cols="9" xl="12")
                    h6.w-100 Muerte a causa de cometer <br> hechos delictivos
        div.button.text-center.mt-3.d-xl-none
          b-button(variant="dark" @click="hideModal('modalCubre')") ENTENDIDO
    b-modal#modalPreguntasFrecuentes(static centered hide-footer hide-header no-close-on-esc no-close-on-backdrop size="xl")
      b-container.mt-1.mt-xl-4
        b-row.d-none.d-xl-block(align-center)
          img.close(@click="hideModal('modalPreguntasFrecuentes')" src="@/static/media/icons/cerrar-magenta.svg" alt="icon close" style="cursor: pointer;")
        b-row.mb-3
          b-col(offset-xl="3" xl="9")
            h3.ml-xl-3.text-primary.text-center.text-xl-left.omnes-medium Preguntas frecuentes
        b-row
          b-col(cols="12" xl="3")
            div.dropdown-box.d-xl-none
              b-dropdown#dropdown-1.w-100(:text='text')
                b-dropdown-item(:class="[text=== 'Sobre el producto' ? 'bg-light' : '']" @click="text='Sobre el producto'") Sobre el producto
                b-dropdown-item(:class="[text=== 'Sobre los beneficiarios' ? 'bg-light' : '']" @click="text='Sobre los beneficiarios'") Sobre los beneficiarios
                b-dropdown-item(:class="[text=== 'Sobre los pagos' ? 'bg-light' : '']" @click="text='Sobre los pagos'") Sobre los pagos
                b-dropdown-item(:class="[text=== 'Sobre el COVID-19' ? 'bg-light' : '']" @click="text='Sobre el COVID-19'") Sobre el COVID-19
            div.w-100.d-none.d-xl-block.mb-5
              b-row.mb-3.mt-xl-3
                b-col
                  h3.d-inline-block.d-xl-none(:class="[text=== 'Sobre el producto' ? 'text-primary' : '']" @click="text='Sobre el producto'") Sobre el producto
                  h4.d-inline-block.d-none.d-xl-inline-block(style="cursor: pointer;" :class="[text=== 'Sobre el producto' ? 'text-primary' : '']" @click="text='Sobre el producto'") Sobre el producto
                    hr(v-if="text === 'Sobre el producto'")
              b-row.mt-3
                b-col
                  h3.d-inline-block.d-xl-none(:class="[text=== 'Sobre los beneficiarios' ? 'text-primary' : '']" @click="text='Sobre los beneficiarios'") Sobre los beneficiarios
                  h4.d-inline-block.d-none.d-xl-inline-block(style="cursor: pointer;" :class="[text=== 'Sobre los beneficiarios' ? 'text-primary' : '']" @click="text='Sobre los beneficiarios'") Sobre los beneficiarios
                    hr(v-if="text === 'Sobre los beneficiarios'")
              b-row.mt-3
                b-col
                  h3.d-inline-block.d-xl-none(:class="[text=== 'Sobre los pagos' ? 'text-primary' : '']" @click="text='Sobre los pagos'") Sobre los pagos
                  h4.d-inline-block.d-none.d-xl-inline-block(style="cursor: pointer;" :class="[text=== 'Sobre los pagos' ? 'text-primary' : '']" @click="text='Sobre los pagos'") Sobre los pagos
                    hr(v-if="text === 'Sobre los pagos'")
              b-row.mt-3
                b-col
                  h3.d-inline-block.d-xl-none(:class="[text=== 'Sobre el COVID-19' ? 'text-primary' : '']" @click="text='Sobre el COVID-19'") Sobre el COVID-19
                  h4.d-inline-block.d-none.d-xl-inline-block(style="cursor: pointer;" :class="[text=== 'Sobre el COVID-19' ? 'text-primary' : '']" @click="text='Sobre el COVID-19'") Sobre el COVID-19
                    hr(v-if="text === 'Sobre el COVID-19'")
          b-col(cols="12" xl="9")
            div(v-if="text === 'Sobre el producto'")
              questions-answer(:preguntas="preguntasProducto")
            div(v-if="text === 'Sobre los beneficiarios'")
              questions-answer(:preguntas="preguntasBeneficiario")
            div(v-if="text === 'Sobre los pagos'")
              questions-answer(:preguntas="preguntasPago")
            div(v-if="text === 'Sobre el COVID-19'")  
              questions-answer(:preguntas="preguntasCovid")
        //- preguntas-frecuentes
        div.button.text-center.mt-3.d-xl-none
          b-button(variant="dark" @click="hideModal('modalPreguntasFrecuentes')") ENTENDIDO
    b-modal#modalBeneficios(static centered hide-footer hide-header no-close-on-esc no-close-on-backdrop size="xl")
      b-container.mt-1.mt-xl-4
        b-row(align-center)
          b-col(cols="12").d-none.d-xl-block
            img.close._2(@click="hideModal('modalBeneficios')" src="@/static/media/icons/cerrar-magenta.svg" alt="icon close" style="cursor: pointer;z-index: 99")
        modal-beneficios
        div.button.text-center.mt-3.d-xl-none
          b-button(variant="dark" @click="hideModal('modalBeneficios')") ENTENDIDO
</template>

<script>
import moment from 'moment'
import QuestionsAnswer from '@/components/common/QuestionsAnswer'
import ModalBeneficios from '@/components/modals/Beneficios'

export default {
  props: ['steps'],
  data () {
    return {
      modalName: '',
      text: 'Sobre el producto',
      producto: false,
      beneficiario: false,
      pago: false,
      covid: false,
      dateTime: moment().format('YYYY'),
      absolute: false,
      zIndex: false,
      urlCondicionadoGeneral: '',
      urlCondicionadoParticular: '',
      urlClausulaAdicional: '',
      urlResumen: '',
      preguntasProducto:[
          {
              id: 'pr1',
              title: '¿El monto de pago varía con el tiempo?',
              identificador: 'producto-1',
              // respuesta: [ 
              //   '<p class="parrafo">Es la central encargada de atender cualquier consulta que puedas tener respecto a tu seguro viaje, así como una respuesta ante accidentes o emergencias.</p>',
              //   '<img src="https://miro.medium.com/max/576/1*mh8il3s3hB0Xdpx6ffQLTw.png">'
              // ]
              respuesta: [ 
                '<p class="parrafo">No, los valores son garantizados</p>'
              ],
          },
          {
              id: 'pr2',
              title: '¿La devolución al finalizar el periodo tiene algún descuento?',
              identificador: 'producto-2',
              respuesta: [ 
                '<p class="parrafo">No, se entrega en su totalidad el monto a los clientes que su póliza haya culminado y no se activó la cobertura de fallecimiento.</p>',
                 ],
          },
          {
              id: 'pr3',
              title: '¿Puedo retirarme del seguro antes de cumplir la totalidad del periodo?',
              identificador: 'producto-3',
              respuesta: [ 
                '<p class="parrafo">Sí, puede acceder a una devolución anticipada a partir del segundo año de la póliza. Se le devuelve un % de todos los aportes que realizó hasta el momento de la solicitud. Con esto, el contrato queda finalizado.</p>',
                 ],
          },
          {
              id: 'pr4',
              title: '¿Necesito realizarme una evaluación médica?',
              identificador: 'producto-4',
              respuesta: [ 
                '<p class="parrafo">No, no es necesario. El contratante tiene que tener claro al momento de la contratación del seguro sus enfermedades previamente diagnosticadas al momento de la contratación. En caso, contraiga alguna enfermedad posterior a la contratación del seguro y fallezca a causa de esta, queda totalmente cubierto.</p>'
                 ],
          },
          {
              id: 'pr5',
              title: '¿Qué pasa si fallezco en un territorio extranjero?',
              identificador: 'producto-5',
              respuesta: [ 
                '<p class="parrafo">El seguro cubre el fallecimiento del contratante, no importa en qué territorio se encuentre.</p>'
                 ],
          },
          {
            id: 'pr6',
            title: '¿A partir de cuándo puedo usar los beneficios del programa Vive más?',
            identificador: 'producto-6',
            respuesta: [ 
              '<p class="parrafo">Puedes acceder a los beneficios, luego de 30 días útiles de la emisión de la póliza.</p>'
            ]
          },
          {
            id: 'pr7',
            title: '¿En qué momento se activan las coberturas de mi seguro?',
            identificador: 'producto-7',
            respuesta: [ 
              '<p class="parrafo">No tenemos periodo de carencia, el seguro se encuentra activo culmina la compra cuando se le envía la póliza de manera inmediata al correo del cliente.</p>'
            ]
          }
          
      ],
      preguntasBeneficiario: [
        {
              id: 'b1',
              title: '¿Puedo cambiar luego a mis beneficiarios?',
              identificador: 'beneficiario-1',
              respuesta: [ 
                '<p class="parrafo">Sí, puede cambiarlos en cualquier momento enviando un correo a <a href="*" rel="noopener">solicitudes@interseguro.com.pe</a> con los datos de los beneficiarios  (DNI/CE, Nombre completo, parentesco y porcentaje del beneficio).</p>'
              ],
          },
          {
              id: 'b2',
              title: '¿Mis beneficiarios pueden ser menores de edad?',
              identificador: 'beneficiario-2',
              respuesta: [ 
                '<p class="parrafo">Sí, en caso ocurra el fallecimiento del contratante el monto del beneficio se le daría al cumplir los 18 años de edad.</p>',
                 ],
          },
          {
              id: 'b3',
              title: '¿Quiénes son mis herederos legales?',
              identificador: 'beneficiario-3',
              respuesta: [ 
                '<p class="parrafo">Son herederos legales los cónyugues, hijos, padres entre otros. Para mayor información se puede revisar  el artículo 82 del código civil peruano.</p>',
              ],
          },
          {
              id: 'b4',
              title: '¿Qué pasa si uno de mis beneficiarios fallece?',
              identificador: 'beneficiario-4',
              respuesta: [ 
                '<p class="parrafo">El porcentaje que le correspondía al beneficiario se divide entre los restantes.</p>'
                 ],
          },
          {
              id: 'b5',
              title: '¿Qué pasa si todos mis beneficiarios fallecen al mismo tiempo?',
              identificador: 'beneficiario-5',
              respuesta: [ 
                '<p class="parrafo">El beneficio les corresponde a los herederos legales de cada beneficiario./p>'
                 ],
          },
          {
              id: 'b6',
              title: '¿Puedo incluir como beneficiario a alguien que no sea familiar mío?',
              identificador: 'beneficiario-6',
              respuesta: [ 
                '<p class="parrafo">Sí, en parentesco tenemos la opción “otros”.</p>'
                 ],
          }
      ],
      preguntasPago: [
        {
          id: 'p1',
          title: '¿Cuáles son los medios de pago?',
          identificador: 'pago-1',
          respuesta: [ 
            '<p class="parrafo">Se puede hacer el pago con cualquier tarjeta de crédito o débito de cualquier banco.</p>'
          ]
        },
        {
          id: 'p2',
          title: '¿Cómo se harán los siguientes pagos?',
          identificador: 'pago-2',
          respuesta: [ 
            '<p class="parrafo">Se harán por medio de débito automático con la tarjeta afiliada según la frecuencia de pago.</p>',
          ]
        },
        {
          id: 'p3',
          title: '¿Qué pasa si dejo de pagar mi seguro?',
          identificador: 'pago-3',
          respuesta: [ 
            '<p class="parrafo">El seguro de vida se anulará recién a los 90 días  de no pago.</p>'
          ]
        },
        {
          id: 'p4',
          title: '¿Qué pasa si mi tarjeta no tiene saldo al momento del cobro? ¿Se cobra penalidad?',
          identificador: 'pago-4',
          respuesta: [ 
            '<p class="parrafo">Si la tarjeta no cuenta con saldo al momento que se necesita hacer el cobro, se volverá a intentar los días posteriores hasta que se pueda encontrar el saldo suficiente para realizar el pago de la cuota. No hay penalidades ni intereses por atraso en pagos.</p>'
          ]
        },
        {
          id: 'p5',
          title: '¿Puedo cambiar mi medio de pago si llegara bloquear o extraviar mi tarjeta?',
          identificador: 'pago-5',
          respuesta: [ 
            '<p class="parrafo">Sí, solo tienes que llamarnos al teléfono <a href="*" rel="noopener">(01) 500 000</a> para poder enviarte el detalle del proceso para estos casos.</p>'
          ]
        }
      ],
      preguntasCovid: [
        {
          id: 'c1',
          title: '¿Cuáles son las exclusiones?',
          identificador: 'covid-1',
          respuesta: [ 
            '<p class="parrafo">No tenemos exclusiones a causa de pandemias, a menos que se tenga previo diagnóstico y conocimiento al momento de la contratación.</p>'
          ]
        }
      ]
    }
  },
  mounted () {
    this.urlCondicionadoGeneral = require('./../../static/docs/Condicionado_General-VidaConDevolucion.pdf')
    this.urlCondicionadoParticular = require('./../../static/docs/Condicionado_Particular-VidaConDevolucion.pdf')
    this.urlClausulaAdicional = require('./../../static/docs/Clausulas_Adicionales-VidaConDevolucion.pdf')
    this.urlResumen = require('./../../static/docs/Resumen-VidaConDevolucion.pdf')
  },
  methods: {
    showModal (modalId) {
      this.modalName = modalId
      this.absolute = true
      let modal = (modalId === 'modalCubre') ? 'modalCubre' : (modalId === 'modalCubre') ? 'modalCubre' : 'modalPreguntasFrecuentes'
      if (modalId === 'modalCubre') {
        this.$nuxt.$emit('bv::hide::modal', 'modalPreguntasFrecuentes')
        this.$nuxt.$emit('bv::hide::modal', 'modalBeneficios')
      } else if (modalId === 'modalPreguntasFrecuentes') {
        this.$nuxt.$emit('bv::hide::modal', 'modalCubre')
        this.$nuxt.$emit('bv::hide::modal', 'modalBeneficios')
      } else {
        this.$nuxt.$emit('bv::hide::modal', 'modalPreguntasFrecuentes')
        this.$nuxt.$emit('bv::hide::modal', 'modalCubre')
      }
    },
    hideModal (modalId) {
      this.modalName = ''
      this.$nuxt.$emit('bv::hide::modal', modalId)
      this.absolute = false
    },
    visitAmplitude (tipoBoton, nombreSeccion, nombreBoton) {
      this.$amplitude.getInstance().logEvent(
      'Click en Botones',
        {
          'Tipo de Boton': tipoBoton,
          'Nombre de la Seccion Vista': nombreSeccion,
          'Nombre del Boton': nombreBoton,
          'Producto Consultado': 'VIDA',
          'Sub Producto Consultado': this.$store.state.common.channel,
          'Etapa de Funnel': this.$route.path,
        }
      )
    }
  },
  components: {
    QuestionsAnswer,
    ModalBeneficios
  }
}
</script>

<style lang="scss" scoped>
.acordeon-boxLista {
  margin: 0;
  padding: 0;
  .card-text {
    margin-bottom: 0;
  }
  .acordeon-ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      height: 45px;
      line-height: 45px;
      border-bottom: .2px solid #f3f3f3;
      padding-left: 24px;
      a {
        color: #707070;
      }
    }
  }
  .acordeon-enlace {
  }
}
footer .btn-secondary {
  background-color: #0754C4!important;;
}

.footerv2 {
  img { width: 2.2rem; }
}

/* Desktop */
.footerv2-desktop {
  background: #0754C4;
  .derechos {
    background-color: #F3F5F7;
    // height: 42px;
    line-height: 42px;
    background: white;
    p {
      margin-bottom: 0;
    }
  }
  .box-redes img {
    width: 31px;
    margin: 0 4px;
  }
}
#ibk .footerv2-d {
  background: #2f4a9f;
}
.footerv2-d {
  background: #0754C4;
  .superior {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 24px 24px;
    color: white;
    // border-bottom: 1px solid #d5d5d5;
    .box-tarjetas {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img {
        margin-right: 8px;
      }
    }
    &__logo {
      padding-right: 12px;
    }
  }
  .medio {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    padding: 24px 24px 24px 24px;
    color: white;

    &__contacto {
      display: flex;
      flex-direction: row;
      .whatsapp,
      .llamanos {
        display: flex;
        padding-right: 24px;
        a{
          color: white;
        }
        img {
          padding-right: 8px;
        }
      }
    }
  }
  .inferior {
    display: flex;
    padding: 0 24px;
    .medio {
      &__contacto {
        flex-direction: column;
        .whatsapp {
          margin-top: 24px;
          margin-bottom: 24px;
        }
      }
    }
    &__item {
      width: 25%;
      p {
        color: white;
        font-weight: 600;
      }
      ul {
        padding: 0;
        margin: 0;
        li {
          list-style: none;
          padding-bottom: 16px;
          a {
            color: white!important;
            font-weight: 400;
          }
        }
      }
    }
  }
}
.footerv2 {
  background: #0754c4;
  // padding-bottom: 85px;
  .text-black {
    color: #535D66;
  }
  &__acordeon {
    background: #0754c4;
    .card {
      border-radius: 0;
      border-bottom: 1px solid #6496DD!important;
    }
    .btn {
      // color: #535D66;
      border: 0 !important;
      border-radius: 0 !important;
      text-align: left;
      height: 55px;
      line-height: 55px;
      // background-color: #fff;
    }
    .card-header {
      border: 0 !important;
      // border-bottom: 1px solid #D1D1D1!important;
      a {
        padding-top: 0;
        background-image: url('./../../static/media/icons/footer/flecha_maximizado.svg');
        background-repeat: no-repeat;
        background-size: 21px;
        background-position-x: 90.5vw;
        background-position-y: center;
      }
      a.collapsed {
        padding-top: 0;
        background-image: url('./../../static/media/icons/footer/flecha_minimizado.svg');
        background-size: 14px;
        background-position-x: 91vw;
      }
    }
    .card {
      // border-bottom: .5px solid white !important;
    }
    .btn-secondary:not(:disabled):not(.disabled):active,
    .btn-secondary:not(:disabled):not(.disabled).active,
    .show > .btn-secondary.dropdown-toggle {
      color: #fff;
      background-color: #0754c4;
      border-color: #0754c4;
    }
    .btn-secondary {
      color: #fff;
      background-color: #0754c4;
      border-color: #0754c4;
    }
  }
  .acordeonContacto {
    &__item {
      min-height: 50px;
      display: flex;
      align-items: center;
      padding: 12px 0;
      padding-left: 16px;
      span img {
        padding-right: 12px;
      }
      span {
        color: white;
      }
    }
    &__item.telefono {
      padding-top: 0;
    }
    .ubicacion {
      padding-top: 1.7rem;
      padding-bottom: 1.7rem;
    }
  }
  &__redesSociales {
    p {
      text-align: center;
      margin-bottom: 0;
      color: #fff;
      font-size: 16px
    }
    .box-redes {
      display: flex;
      justify-content: left;
      padding-bottom: 0;
      padding-left: 14px;
      margin-bottom: 0;
      margin-top: 7px;
      span {
        padding: 7px;
        padding-bottom: 0;
        padding-top: 0;
      }
    }
  }
  &__derechos {
    background: #F3F5F7;
    color: #5e5e5e;
    text-align: center;
  }
}

@media (min-width: 768px) {
  .footerv2-desktop {
    .medio {
      margin-bottom: 12px;
    }
  }
}

@media (min-width: 1024px) {
  .footerv2-d {
    .superior {
      .box-tarjetas {
      }
      &__logo {
        padding-right: 32px;
      }
    }
  }
  .footerv2-desktop {
    .superior {
      padding-left: 8%;
      padding-right: 8%;
      .superior__logo {
        padding-right: 0;
      }
    }
    .inferior {
      display: flex;
      padding-top: 34px;
      padding-bottom: 34px;
      padding-left: 8%;
      padding-right: 8%;
      &__item {
        width: 20%;
      }
      .medio {
        flex-direction: column;
        padding-right: 0;
      }
      .medio__contacto {
        .whatsapp {
          justify-content: flex-end;
          text-align: right;
          padding-right: 0;
          img {
            margin-left: 12px;
          }
        }
        .llamanos {
          justify-content: flex-end;
          text-align: right;
          padding-right: 0;
          img {
            margin-left: 12px;
          }
        }
      }
      .medio__redes {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        p {
          text-align: right;
        }
      }
    }
  }
}
@media (min-width: 1330px) {
  .footerv2-d {
    .superior {
      // padding-left: 10%;
      // padding-right: 10%;
    }
    .inferior {

    }
    .medio {
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>
