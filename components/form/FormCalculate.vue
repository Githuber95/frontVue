<template lang="pug">
  b-row#form-calculate.justify-content-center
    h3.text-primary.omnes-medium.text-center.mt-5.mt-lg-0 ¡Cotiza y proteges!
    h4.text-primary.omnes-medium.text-center.mt-5.mt-lg-0(v-if="$store.state.common.channel != 'PROTECCION_SEGURA'") ¡Devolución de hasta 200%! Desde 16 años de periodo
    //- .text-primary.omnes-medium.text-center.mt-5.mt-lg-0 Desde 16 años de periodo
    b-col(cols="12" sm="10" md="12" lg="12" xl="11")
      b-form
        b-row.mt-4.p-relative
          // sumaAsegurada
          b-col.mb-xl-3(cols="12")
            b-form-select.browser-default.mb-2.valid(id="sumaAsegurada" variant='success' @change="makeQuote('periodo', 'sumaAsegurada', $event)" :options="toCalculate.rangoSumaAseguradaSoles" v-model="formQuote.sumaAsegurada" value-field="key" text-field="value")
            label(for="sumaAsegurada" placeholder="Quiero proteger a quienes más amo por" :style="[$store.state.common.subchannel == 'ENDOSOS_MULTIBANCO' ? 'height: 2.5rem;' : 'color: red;']")
        b-row
          // Periodo
          b-col.mb-xl-3(cols="12")
            b-form-select.browser-default.mb-2(id="periodo" ref="periodo" variant='success' :class="[formQuote.periodoPago ? 'valid' : '']" @change="makeQuote('frecuencia', 'periodo', $event)" :options="toCalculate.periodosCobertura" v-model="formQuote.periodoPago" value-field="key" text-field="value")
            label(for="periodo" placeholder="Por un período de" :style="[$store.state.common.subchannel == 'ENDOSOS_MULTIBANCO' ? 'height: 2.5rem;' : 'color: red;']")
          // Frecuencia
          b-col.mb-xl-3(cols="12")
            b-form-select.browser-default.mb-2#depositare.ml-0(ref="frecuencia" :class="[formQuote.frecuenciaPago ? 'valid' : '']" @change="makeQuote('', 'depositare', $event)" v-model="formQuote.frecuenciaPago" :options="toCalculate.frecuenciaPago" value-field="key" text-field="value")
            label(for="depositare" placeholder="Frecuencia de Pago" :style="[$store.state.common.subchannel == 'ENDOSOS_MULTIBANCO' ? 'height: 2.5rem;' : 'color: red;']")
        section(v-if="showPercent && formQuote.periodoPago && formQuote.frecuenciaPago")
          // COVERAGE ADICIONAL
          //- coverage-adicional(@setMainValue="setCoverageAdicional($event)" :form="formQuote" :toCalculate="toCalculate" :formAdicional="formAdicional" v-if="$store.state.common.channel === 'WEB'")
          b-row(:class="[formQuote.periodoPago < 16 ? 'pb-2' : 'pb-4' ]" v-if="$store.state.common.channel != 'PROTECCION_SEGURA'")
            b-col.text-center(cols="12")
              span.py-2 Elige tu porcentaje de devoluci&oacute;n
            b-col
              div.text-center.primaInterval.omnes-medium(style="padding-bottom: 0px; height: 100%;background: #F6F6F8;")
                | {{ objCalculo.porcentajeMin }}%
                div
                  span.primaIntervalText M&iacute;nimo
            b-col(cols="7" style="padding: 2px;border: 1px solid #D1D1D1;border-radius: 4px;").box.col-border
              .box.d-flex.justify-content-between.align-items-center
                img.back-prima-recurrente#btn-minus(src="@/static/media/icons/pasos/cotiza/-.svg" alt="disminuir periodo de pago prima recurrente" @click="goBack(formQuote.porcentaje)")
                div(style="position: relative")
                  input#pagoPrima(type="text" :value="formQuote.porcentaje" disabled)
                  h5.omnes-medium {{ formQuote.porcentaje }}%
                img.next-prima-recurrente#btn-add(src="@/static/media/icons/pasos/cotiza/+.svg" alt="aumentar periodo de pago prima recurrente" @click="goNext(formQuote.porcentaje)")
            b-col
              div.text-center.primaInterval.omnes-medium(style="padding-bottom: 0px; height: 100%;background: #F6F6F8;")
                | {{ objCalculo.porcentajeMax }}%
                div
                  span.primaIntervalText M&aacute;ximo
          b-row.pb-4(v-if="formQuote.periodoPago < 16 && $store.state.common.channel != 'PROTECCION_SEGURA'")
            b-col
              h6.omnes-semibold.text-center(style="color: #0855c3; font-size: .8rem;") Para m&aacute;s de 150%, elige el periodo a partir de 16 años
          section.py-3.py-lg-4.resumen-cotizacion(style="background:#F6F6F8; border-radius: 12px;" v-if="channelDiscount")
            b-row(v-if="$store.state.common.channel=='WEB'")
              // Monto de prima
              b-col.mb-xl-1.text-center(cols="12")
                span Pagarás de manera <span style='text-transform: lowercase; display: inline-block;'> {{ getTextFrecuenciaPago() }}: </span>
              div.box-promocion.mt-2
                p.omnes-semibold.py-1.text-center(style="font-size: .9rem;") Precio Promo Flash {{ parseOneDecimal(parseFloat(((toCalculateSinDescuento.primaRecurrente - toCalculate.primaRecurrente) / toCalculateSinDescuento.primaRecurrente) * 100)) }}% dscto.</span>
              b-col.mt-1.mb-xl-1.text-center(cols="12")
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: 1.1rem;") S/ {{ parseDecimal(parseFloat(toCalculate.primaRecurrente)) }}
                h5.spacing-transition.d-block(style="font-size: .9rem;color: #6E7288; text-decoration: line-through;") Antes S/{{ parseDecimal(parseFloat(toCalculateSinDescuento.primaRecurrente)) }}
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: .9rem;" v-if="formQuote.frecuenciaPago === 'M'") Ahorrarás en {{ formQuote.periodoPago }} años un total de S/ {{ parseOneDecimal((parseFloat(toCalculateSinDescuento.primaRecurrente) - parseFloat(toCalculate.primaRecurrente)) * 12 * formQuote.periodoPago) }}
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: .9rem;" v-else-if="formQuote.frecuenciaPago === 'T'") Ahorrarás en {{ formQuote.periodoPago }} años un total de S/ {{ parseOneDecimal((parseFloat(toCalculateSinDescuento.primaRecurrente) - parseFloat(toCalculate.primaRecurrente)) * 4 * formQuote.periodoPago) }}
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: .9rem;" v-else-if="formQuote.frecuenciaPago === 'S'") Ahorrarás en {{ formQuote.periodoPago }} años un total de S/ {{ parseOneDecimal((parseFloat(toCalculateSinDescuento.primaRecurrente) - parseFloat(toCalculate.primaRecurrente)) * 2 * formQuote.periodoPago) }}
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: .9rem;" v-else-if="formQuote.frecuenciaPago === 'A'") Ahorrarás en {{ formQuote.periodoPago }} años un total de S/ {{ parseOneDecimal((parseFloat(toCalculateSinDescuento.primaRecurrente) - parseFloat(toCalculate.primaRecurrente)) * formQuote.periodoPago) }}
            b-row(v-else)
              // Monto de prima
              b-col.mb-xl-1.text-center(cols="12")
                span Pagarás de manera <span style='text-transform: lowercase; display: inline-block;'> {{ getTextFrecuenciaPago() }}: </span>
              div.box-promocion.mt-2
                p.omnes-semibold.py-1.text-center(style="font-size: .9rem;") Precio Promo Flash {{ parseOneDecimal(parseFloat(((toCalculateSinDescuento.primaRecurrente - toCalculate.primaRecurrente) / toCalculateSinDescuento.primaRecurrente) * 100)) }}% dscto.</span>
              b-col.mt-1.mb-xl-1.text-center(cols="12")
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: 1.1rem;") S/ {{ parseDecimal(parseFloat(toCalculate.primaRecurrente)) }}
                h5.spacing-transition.d-block(style="font-size: .9rem;color: #6E7288; text-decoration: line-through;") Antes S/{{ parseDecimal(parseFloat(toCalculateSinDescuento.primaRecurrente)) }}
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: .9rem;" v-if="formQuote.frecuenciaPago === 'M'") Ahorrarás en {{ formQuote.periodoPago }} años un total de S/ {{ parseOneDecimal((parseFloat(toCalculateSinDescuento.primaRecurrente) - parseFloat(toCalculate.primaRecurrente)) * 12 * formQuote.periodoPago) }}
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: .9rem;" v-else-if="formQuote.frecuenciaPago === 'T'") Ahorrarás en {{ formQuote.periodoPago }} años un total de S/ {{ parseOneDecimal((parseFloat(toCalculateSinDescuento.primaRecurrente) - parseFloat(toCalculate.primaRecurrente)) * 4 * formQuote.periodoPago) }}
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: .9rem;" v-else-if="formQuote.frecuenciaPago === 'S'") Ahorrarás en {{ formQuote.periodoPago }} años un total de S/ {{ parseOneDecimal((parseFloat(toCalculateSinDescuento.primaRecurrente) - parseFloat(toCalculate.primaRecurrente)) * 2 * formQuote.periodoPago) }}
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: .9rem;" v-else-if="formQuote.frecuenciaPago === 'A'") Ahorrarás en {{ formQuote.periodoPago }} años un total de S/ {{ parseOneDecimal((parseFloat(toCalculateSinDescuento.primaRecurrente) - parseFloat(toCalculate.primaRecurrente)) * formQuote.periodoPago) }}
            b-row.mt-3#devolucion(v-if="$store.state.common.channel !== 'PROTECCION_SEGURA'")
              b-col(cols="12")
                span.d-block.text-center Al finalizar la póliza recibirás {{ formQuote.porcentaje }}%:
              b-col.text-center.mt-1(cols="12")
                h4#devolucionMoney.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: 1.1rem;") S/ {{ parseDecimal(parseFloat(toCalculate.montoDevolucion)) }}
          section.resumen-cotizacion(style="background:#F6F6F8; border-radius: 12px;" :class="[ ($store.state.common.subchannel === 'PROMOCION_UNIVERSITARIO') ? 'pt-3 pb-3 pb-lg-4' : 'py-3 py-lg-4' ]" v-else)
            b-container(v-if="$store.state.common.channel=='WEB'")
              b-row
                // Monto de prima
                b-col.mb-xl-1(cols="2" md="2")
                  img(src="@/static/media/common/cotiza/tu_pagaras.svg" alt="pagaras seguro de vida")
                b-col.mb-xl-1.pl-0(cols="10" md="10")
                  span.omnes-medium Pagarás de manera <span style='text-transform: lowercase; display: inline-block;' class="omnes-medium"> {{ getTextFrecuenciaPago() }}: </span>
                  P#primaRecurrente.spacing-transitio.omnes-semibold(style="font-size: 1.1rem;" v-if="!formAdicional.montoDevolucion") S/ {{ parseFloat(toCalculate.primaRecurrente) }}
                  P#primaRecurrente.spacing-transitio.omnes-semibold(style="font-size: 1.1rem;" v-else) S/ {{ parseDecimal(parseFloat(toCalculate.primaRecurrente) + parseFloat(formAdicional.primaRecurrente)) }}
                b-col.mb-xl-1(cols="2" md="2")
                  img(src="@/static/media/common/cotiza/tu_devolucion.svg" alt="te devolveremos seguro de vida")
                b-col.mt-1.mb-xl-1.px-xl-1.pl-0(cols="10" md="10")
                  span.omnes-medium Tu devolución será 
                  p.text-primary.omnes-semibold( v-if="!formAdicional.montoDevolucion") S/ {{ parseDecimal(parseFloat(toCalculate.montoDevolucion)) }}
                  p.text-primary.omnes-semibold( v-else) S/ {{ parseDecimal(parseFloat(toCalculate.montoDevolucion) + parseFloat(formAdicional.montoDevolucion)) }}
                b-col.mb-xl-1(cols="2" md="2")
                  img(src="@/static/media/common/cotiza/tu_proteccion.svg" alt="te devolveremos seguro de vida")
                b-col.mt-1.mb-xl-1.px-xl-1.pl-0(cols="10" md="10")
                  span.omnes-medium Tu protecci&oacute;n
                  p#devolucionMoney.text-primary.omnes-semibold S/ {{ parseDecimal(parseFloat(formQuote.sumaAsegurada)) }} 
                  div( v-if="formAdicional.sumaAsegurada")
                    h6(v-if="formAdicional.codCobertura === 4") Protección por invalidez total y permanente <h6 class="text-black omnes-semibold d-inline"> (S/ {{ parseDecimal(parseFloat(formAdicional.sumaAsegurada)) }}) </h6>
                    h6(v-else) Protección por invalidez accidental <h6 class="text-black omnes-semibold d-inline"> (S/ {{ parseDecimal(parseFloat(formAdicional.sumaAsegurada)) }}) </h6>
            b-row(v-else)
              // Monto de prima
              b-col.mb-xl-1.text-center(cols="12")
                span Pagarás de manera <span style='text-transform: lowercase; display: inline-block;'> {{ getTextFrecuenciaPago() }}: </span>
              b-col.mt-1.mb-xl-1.text-center.px-xl-1(cols="12")
                h4#primaRecurrente.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: 1.1rem;") S/ {{ parseDecimal(parseFloat(toCalculate.primaRecurrente)) }}
            b-row.mt-3#devolucion(v-if="$store.state.common.channel !== 'PROTECCION_SEGURA' && $store.state.common.channel !== 'WEB'")
              b-col(cols="12")
                span.d-block.text-center Al finalizar la póliza recibirás {{ formQuote.porcentaje }}%:
              b-col.text-center.mt-1(cols="12")
                h4#devolucionMoney.spacing-transition.d-inline.omnes-semibold.text-primary(style="font-size: 1.1rem;") S/ {{ parseDecimal(parseFloat(toCalculate.montoDevolucion)) }}
              b-col.text-center.mt-2.mb-2(cols="12" v-if="$store.state.common.subchannel === 'V2_SEGURO'")
                b-button.w-auto.h-auto(variant="primary" @click="setResumen" style="font-size: .8rem;") Detalle de Monto de Devolución
      section.mt-4.mt-xl-3
        b-row
          b-col.text-center.px-0.mt-2(cols="12" v-if="flagShowCondicion")
            div.flex.justify-content-center(style="display: flex !important;") 
              b-form-checkbox.style-checkbox(
                :unchecked-value="false"
                @change="selectAllComunicaciones"
                v-model="flagComunicaciones"
                id="checkbox-1") 
              h6.subtitle(style="font-size: 12px;color: #454A6C !important;margin-top: 3px;") Acepto la
                span.ml-1.mr-1
                  a.d-inline.omnes-medium(role="button" style="cursor:pointer; font-size: 12px;" v-b-modal.show-terms) Política de Comunicaciones
          b-col.text-center(cols="12")
            b-button.py-2.mt-3.mb-4#btn-cotizar(variant="dark" @click="goPagePay($event)" :class="[showPercent && formQuote.periodoPago && formQuote.sumaAsegurada && formQuote.frecuenciaPago ? '' : 'd-none']") Continuar
      section.mb-3(v-if="showPercent && formQuote.periodoPago && formQuote.frecuenciaPago")
        b-container
          b-row.mb-5
            b-col.text-center(cols="12")
              div(style="cursor:pointer outline:none;" v-b-modal.sendQuote)
                img(src="@/static/media/icons/envio_cotizacion-seguro_vida.svg" alt="envio de cotizacion de seguro de vida")
    b-modal#sendQuote(static v-if="$store.state.common.saveClient.email" size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.text-right
        img.cursor-pointer.image-9(@click='hideModal("sendQuote")' src='@/static/media/common/close-modal.svg' width='35' alt='icon close')
      b-container
        b-row.text-center
          b-col
            img(v-if="$store.state.common.channel === 'IBK'" src='@/static/media/common/email-interbank.svg' alt="icono de envio de correo" width='85')
            img(v-else src='@/static/media/common/email.svg' alt="icono de envio de correo" width='85')
        b-row.text-center
          b-col
            h3.text-center.omnes-medium Ingresa tu correo para<br> enviarte la cotización
            b-form-input#email.d-block(autocomplete="off" type='text' @blur="$v.sendQuotation.email.$touch()" v-model="sendQuotation.email" aria-label="Ingrese su correo" placeholder="ejem.lperez@gmail.com" :state="$v.sendQuotation.email.$dirty ? !$v.sendQuotation.email.$error : null" aria-describedby="emailFeedback")
          b-col(cols="12").mb-4  
            b-form-invalid-feedback#emailFeedback(v-if="$v.sendQuotation.email.$error && !$v.sendQuotation.email.email")
              | Ingresa un correo válido
        b-row.mb-4.text-center
          b-col(cols="12")
            b-button.w-75(variant="dark" @click='confirmQuotation' :class="[$v.sendQuotation.$invalid ? 'disabled' : '']") ENVIAR
    b-modal#confirmSendQuote(static size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.text-right
        img.cursor-pointer.image-9(src='@/static/media/common/close-modal.svg' width='35', alt='icon close' @click="hideModal('confirmSendQuote')")
      b-container
        b-row
          b-col.text-center
            img(v-if="$store.state.common.channel === 'IBK'" src='@/static/media/common/confirm-quotation-interbank.svg' alt="icono de estrella confirmar" width='70')
            img(v-else  src='@/static/media/common/confirm-quotation.svg' alt="icono de estrella confirmar" width='70')
        b-row.text-center
          b-col.text-center
            h3.omnes-medium ¡Tu cotización ha<br> sido enviada!
    b-modal#optionVidaFree(static size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.text-right
        img.cursor-pointer.image-9(@click="hideModalVidafree('optionVidaFree')" src='@/static/media/common/close-modal.svg', width='35', alt='icon close')
      b-container.mt-2
        b-row
          b-col.text-center.px-0
            h3.text-primary(v-if="!maxSuma") Las coberturas mayores a <br> S/200, 000 requieren de una <br>asesoría personalizada. <br><span class="omnes-medium"> ¿Deseas ser contactado por <br>uno de nuestros agentes <br>de venta?</span>
            h3.text-primary(v-else) Las coberturas mayores a <br> S/{{(toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.max).toString().split(/(?=(?:\d{3})+$)/).join(',')}} requieren de una <br>asesoría personalizada. <br><span class="omnes-medium"> ¿Deseas ser contactado por <br>uno de nuestros agentes <br>de venta?</span>
        b-row.my-4
          b-col
            h3.text-center.omnes-medium.mb-2 Mi número de celular es:
            b-form-input(autocomplete="off" type='tel' v-model="clientFree.telefono" aria-label="Ingresa tu N° de celular" placeholder="Ingresa tu N° de celular" :maxLength="9")
        b-row.mb-4
          b-col(cols="12")
            b-button.w-100(variant="dark" @click="saveClientData") SÍ, QUIERO QUE ME CONTACTEN
    b-modal#confirmVF(static v-if="$store.state.common.saveClient.nombre" size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.text-right
        img.cursor-pointer.image-9(@click="hideModalVidafree('confirmVF')" src='@/static/media/common/close-modal.svg', width='35', alt='icon close')
      b-container.mt-2
        b-row
          b-col.text-center
            img(v-if="$store.state.common.channel === 'IBK'" src='@/static/media/common/star-interbank.svg' alt="icono de estrella confirmar" width='85')
            img(v-else src='@/static/media/common/star.svg' alt="icono de estrella confirmar" width='85')
        b-row.my-2
          b-col.text-center.my-3
            h3.text-primary.omnes-medium ¡{{ capitalize( $store.state.common.saveClient.nombre) }}, <span class="omnes-regular">nos contactaremos <br> contigo lo más pronto <br> posible!</span>
        b-row.mb-4.text-center
          b-col(cols="12")
            b-button.w-50(variant="dark" @click="hideModalVidafree('confirmVF')") ENTENDIDO
    b-modal#resumenQuote(static size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.mt-2.px-md-3
        b-row
          b-col.text-center(cols="12")
            img(src='@/static/media/icons/pasos/cotiza/ahorro.svg' alt="icono de ahorro" style="width: 3rem;")
          b-col.text-center(cols="12")
            b-row.mt-2
              b-col.text-center.text-primary.omnes-medium(cols="12")
                | Obtendr&aacute;s una devoluci&oacute;n
              b-col(cols="12")
                h3.text-center.text-primary.omnes-medium S/ {{ parseDecimal(parseFloat(toCalculate.montoDevolucion)) }}  
        b-row.mt-4(v-if="formQuote.porcentaje > 100")
          b-col.px-0(cols="12")
            h5.text-primary.omnes-medium Detalle de monto de devolución
          b-col#chart.px-0.mt-2(cols="12")
            div#ahorro.pl-2.py-2
              h5.omnes-medium S/ {{ parseDecimal(parseFloat(resumen.ahorroTotal)) }}
              h6.omnes-medium Ahorro
            div#ganancia.pl-2.py-2
              h5.omnes-medium S/ {{ parseDecimal(parseFloat(resumen.ganancia)) }}
              h6.omnes-medium Ganancia
        b-row.mt-4
          div.bg-primary.label-resumen
            | Ahorro anual
          b-col.pt-3.pb-2.pr-0(v-if="formQuote.frecuenciaPago === 'M'" style="background:#F2FCFF; width: 100%;")
            h4.text-primary.omnes-medium S/ {{ formQuote.primaRecurrente }} &nbsp;x&nbsp; 12 meses
            span.primaIntervalText.text-left Pago mensual
          b-col.pt-3.pb-2(v-if="formQuote.frecuenciaPago === 'T'" style="background:#F2FCFF; width: 100%;")
            h4.text-primary.omnes-medium S/ {{ formQuote.primaRecurrente }} &nbsp;x&nbsp; 4 trimestres
            span.primaIntervalText.text-left Pago trimestral
          b-col.pt-3.pb-2(v-if="formQuote.frecuenciaPago === 'S'" style="background:#F2FCFF; width: 100%;")
            h4.text-primary.omnes-medium S/ {{ formQuote.primaRecurrente }} &nbsp;x&nbsp;  2 semestres
            span.primaIntervalText.text-left Pago semestral
          b-col.pt-3.pb-2(v-if="formQuote.frecuenciaPago === 'A'" style="background:#F2FCFF; width: 100%;")
            h4.text-primary.omnes-medium S/ {{ formQuote.primaRecurrente }} &nbsp;x&nbsp;  1 año
            span.primaIntervalText.text-left Pago anual
          b-col.pt-3.pb-2.pl-0(cols="5" style="background:#F2FCFF; width: 100%;")
            h4.text-primary.omnes-medium =&nbsp;&nbsp; S/ {{ parseDecimal(parseFloat(resumen.ahorroAnual)) }}
        b-row.mt-4
          div.bg-primary.label-resumen
            | Ahorro total
          b-col.pt-3.pb-2.pr-0(style="background:#F2FCFF; width: 100%;")
            h4.text-primary.omnes-medium  S/ {{ parseDecimal(parseFloat(resumen.ahorroAnual)) }} &nbsp;x&nbsp; {{ formQuote.periodoPago }} &nbsp;a&ntilde;os 
            span.primaIntervalText.text-left Pago anual
          b-col.pt-3.pb-2.pl-0.pr-0(cols="5" style="background:#F2FCFF; width: 100%;")
            h4.text-primary.omnes-medium =&nbsp;&nbsp; S/ {{ parseDecimal(parseFloat(resumen.ahorroTotal)) }}
        b-row.mt-4.text-center
          b-col(cols="12")
            b-button.w-50(variant="dark" @click="$bvModal.hide('resumenQuote')") ENTENDIDO
        b-row.mt-4
          b-col(cols="1")
            img(src='@/static/media/icons/pasos/cotiza/info.svg' alt="icono de informacion")
          b-col
            span.primaIntervalText.text-primary.lh-1.d-flex &nbsp;El monto de devoluci&oacute;n resultante mostrado solo se aplica terminando el tiempo de contrataci&oacute;n
    b-modal#show-terms(static size="lg" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div
        img.image-9(@click='hideModal("show-terms")' src='https://uploads-ssl.webflow.com/5b29b333e01a7071fadb2f1c/5b5f46206abb673bc5374fdb_icon-close.svg', width='40', alt="icon close" style="cursor: pointer;")
      h3.omnes-medium.text-center Política de Comunicaciones
      div.my-3.px-2
        p Usted puede brindar su consentimiento para que INTERSEGURO, las <a href="https://www.interseguro.pe/soat/archivo/Pol%C3%ADtica_de_Privacidad_de_Interseguro-Anexo_1.pdf" target="_blank" style="color: #454A6C !important">empresas del Grupo Intercorp y/o sus socios comerciales:</a>
        div(style="margin-top: 20px;") 
          b-form-checkbox(@change="selectEstudios" v-model="flagEstudios" id="checkFlagEstudios")
            span(style="font-size:14px;display:block;padding-left:22px;margin-left:0px; color: #454A6C !important") Realicen estudios de mercado y perfiles de compra.
          b-form-checkbox(@change="selectPromociones" v-model="flagPromociones" id="checkFlagPromociones")
            span(style="font-size:14px;display:block;padding-left:22px;margin-left:0px; color: #454A6C !important") Envíen publicidad, promociones y ofertas de los productos y/o servicios.
          b-form-checkbox(@change="selectAll" v-model="flagComunicaciones" id="checkFlagComunicaciones")
            span(style="font-size:14px;display:block;padding-left:22px;margin-left:0px; color: #454A6C !important") Sí a todo.
</template>

<script>
import * as _ from 'lodash'
import Swal from 'sweetalert2'
import moment from 'moment'

import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

//- import CoverageAdicional from '@/components/CoverageAdicional'

export default {
  props: ['tracking', 'formQuote', 'showPercent', 'toCalculate', 'toCalculateSinDescuento', 'remarketing', 'formQuoteLast'],
  data () {
    return {
      formAdicional: {
        codCobertura: '',
        sumaAsegurada: '',
        montoDevolucion: '',
        primaRecurrente: '',
        periodoVigencia: ''
      },
      preloadCombos: {
        sumaAsegurada: 100000,
        periodoPago: 12,
        frecuenciaPago: 'M', //Mensual
        porcentajeDevolucion: 125
      },
      modalSA: false,
      modalPD: false,
      channelDiscount: false, // condicional con channel
      maxPD: 50,
      minPD: 0,
      maxSuma: 0,
      sendQuotation: {
        numeroDocumento: this.$store.state.common.saveClient.dniCliente,
        urlRemarketing: '',
        urlCancelacion: '', // enviar la url generada de makeRemarketing
        email: '',
        cotizacion: {
        }
      },
      clientFree: {
        numeroDocumento: this.$store.state.common.saveClient.numeroDocumento,
        telefono: ''
      },
      idProducto: 2,
      edad: 0,
      idSelected: 0,
      objCalculo: {
        porcentajeSelec: 100,
        porcentajeMin: 0,
        porcentajeMax: 200
      },
      resumen: {
        ahorroAnual: 0,
        ahorroTotal: 0,
        ganancia: 0
      },
      flagEstudios: false,
      flagPromociones: false,
      flagComunicaciones: false,
      flagOkConsentimiento: false,
      flagShowCondicion: true,
      objConsultaGlobalConsentimiento: {},
      objConsultaGlobalConsentimientoRegistro: {},
    }
  },
   mixins: [
    validationMixin
  ],
  validations: {
    sendQuotation: {
      email: {
        required,
        email
      }
    }
  },
  created () {
    this.showPercent = false
    // console.log('.................created FC.................')
  },
  updated () {
    // console.log('updated')
  },
  destroyed () {
    this.$nuxt.$off('generate-parametter-to-calculate')
    this.$nuxt.$off('show-range')
  },
  mounted () {

    this.objConsultaGlobalConsentimiento = {
      id_configuracion: 3,
      cod_tipo_identificacion: "D",
      gls_num_identificacion: this.$store.state.common.saveClient.numeroDocumento,
      aud_usr_ingreso: "vida-backend"
    } 

    this.$store.dispatch('payment/consultaUniversal', this.objConsultaGlobalConsentimiento)
      .then((res) =>{
        if(res.gls_num_identificacion) {
          this.flagShowCondicion = false
          return
        }
        this.flagShowCondicion = true;
        return
      })
      .catch((e) =>{
        this.flagShowCondicion = true;
      })

    window.dataLayer = window.dataLayer || [ ]
    this.$nuxt.$on('generate-parametter-to-calculate', ({saveClient}) => {
      this.generateParametter(saveClient)
    })
    this.$nuxt.$on('show-range', ({ respuesta, sinDescuento }) => {
      this.sendQuotation.email = this.$store.state.common.saveClient.email
      this.objCalculo.porcentajeMin = (this.formQuote.periodoPago > 15 && this.$store.state.common.channel !== 'PROTECCION_SEGURA') ? 100 : 0 
      this.objCalculo.porcentajeMax = (this.formQuote.periodoPago > 15 && this.$store.state.common.channel !== 'PROTECCION_SEGURA') ? this.toCalculate.porcentajeDevolucion[this.toCalculate.porcentajeDevolucion.length -1].key : 150
      this.formQuote.porcentaje = (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 0 : (this.objCalculo.porcentajeMin <= this.formQuote.porcentaje && this.objCalculo.porcentajeMax >= this.formQuote.porcentaje) ? this.formQuote.porcentaje : 100
      this.toCalculate.porcentajeDevolucion.filter((f, index) => {
        if ( index < (Object.keys(respuesta).length)) {
          if ((f.key).toString() === respuesta[(f.key).toString()].porcentajeDevolucion) {
            f.montoDevolucion = respuesta[(f.key).toString()].montoDevolucion
            f.primaRecurrente = respuesta[(f.key).toString()].primaRecurrente
            f.primaClienteAnual = respuesta[(f.key).toString()].primaClienteAnual
          }
        } else {
          this.toCalculate.porcentajeDevolucion[index].montoDevolucion = null
          this.toCalculate.porcentajeDevolucion[index].primaClienteAnual = null
          this.toCalculate.porcentajeDevolucion[index].primaRecurrente = null
          // delete this.toCalculate.porcentajeDevolucion[index]
        }
      })
      let porcentajeD = (this.formQuote.porcentaje).toString()
      if (!respuesta[porcentajeD]) {
        this.formQuote.porcentaje = 100
        porcentajeD = (this.formQuote.porcentaje).toString()
      } 
      this.toCalculate.primaRecurrente = respuesta[porcentajeD].primaRecurrente
      this.toCalculate.montoDevolucion = respuesta[porcentajeD].montoDevolucion
      if (this.channelDiscount) {
        this.toCalculateSinDescuento.porcentajeDevolucion.filter((x, i) => {
          if ((x.key).toString() === sinDescuento[(x.key).toString()].porcentajeDevolucion) {
            x.montoDevolucion = sinDescuento[(x.key).toString()].montoDevolucion
            x.primaRecurrente = sinDescuento[(x.key).toString()].primaRecurrente
            x.primaClienteAnual = sinDescuento[(x.key).toString()].primaClienteAnual
            // input range
            // x.sizeRange = sizeRange[i]
          }
        })
        this.toCalculateSinDescuento.primaRecurrente = sinDescuento[porcentajeD].primaRecurrente
        this.toCalculateSinDescuento.montoDevolucion = sinDescuento[porcentajeD].montoDevolucion
        this.$store.commit('common/setPrimaRecurrenteDescuento', this.toCalculateSinDescuento.primaRecurrente)
      }
      this.toCalculate.primaClienteAnual = respuesta[porcentajeD].primaClienteAnual
      document.getElementById('btn-cotizar').removeAttribute('disabled')
      if (this.$refs['devolucion']) {
        var refX = (this.$refs['devolucion']).offsetTop
        window.scrollTo(0, refX - 20)
      }
      this.tracking.data = this.formQuote
      this.tracking.screen = 'cotizador'
      this.tracking.errorType = ''
      this.tracking.errorData = ''
      this.tracking.trackingId = this.$store.state.common.trackingId
      this.tracking.data.primaRecurrente = this.toCalculate.primaRecurrente
      //- if ((this.formQuote.frecuenciaPago === 'M' || this.formQuote.frecuenciaPago === 'Mensual' ) && (this.$store.state.common.subchannel).split('_')[0] === 'PROMOCION' && parseInt(this.formQuote.porcentaje) >= 100 && parseInt(this.formQuote.sumaAsegurada) >= 100000) {
      //-   this.$nuxt.$emit('show-alert')
      //- } else {
      //-   this.$nuxt.$emit('hide-alert')
      //- }
      this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
      })
      //- this.$nuxt.$emit('hide-loader');

      
    })
  },
  methods: {
    alertGoHome () {
      Swal.fire(
        '',
        '¡Hola! En estos momentos no contamos con una plan que se adecúe a tus necesidades. Para mayor información puedes comunicarte al (01) 500-0000',
        'info'
      )
      setTimeout(() => {
        let goPath = (this.$store.state.common.channel === 'IBK') ? '/interbank' : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? '/universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? '/proteccion-segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? '/ahorro-seguro' : '/vida-con-devolucion'
        this.$nuxt.$router.push({ path: goPath })
      }, 1500)
    },
    capitalize (nombreCompleto) {
      nombreCompleto = nombreCompleto.toLowerCase()
      return nombreCompleto.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
    },
    calculateChart () {
      let sizeWidth = document.getElementById('chart').offsetWidth
      //- console.log(document.getElementById('chart'))
      //- console.log('sizeWidth: ', sizeWidth)
      //- console.log('this.objCalculo.porcentajeMax: ', this.objCalculo.porcentajeMax)
      let calculateWidthByPixel = sizeWidth / this.objCalculo.porcentajeMax
      //- console.log('calculateWidthByPixel: ', calculateWidthByPixel)
      let porcentajeAhorro = 100
      let porcentajeGanancia = this.formQuote.porcentaje - 100
      //- console.log(porcentajeAhorro, ' - ', porcentajeGanancia)
      document.getElementById('ahorro').style.width= (porcentajeAhorro * calculateWidthByPixel) + 'px'
      document.getElementById('ganancia').style.width= ((porcentajeGanancia * calculateWidthByPixel) < 100 ) ? 100 + 'px' : (porcentajeGanancia * calculateWidthByPixel) + 'px'
      //- console.log('ahorro: ', document.getElementById('ahorro').offsetWidth)
      //- console.log('ganancia: ', document.getElementById('ganancia').offsetWidth)
    },
    setResumen() {
      this.$nuxt.$emit('bv::show::modal', 'resumenQuote')
      this.resumen.ahorroAnual = (this.formQuote.frecuenciaPago === 'M') ? parseFloat(this.formQuote.primaRecurrente) * 12 : (this.formQuote.frecuenciaPago === 'T') ? parseFloat(this.formQuote.primaRecurrente) * 4 : (this.formQuote.frecuenciaPago === 'S') ? parseFloat(this.formQuote.primaRecurrente) * 2 : parseFloat(this.formQuote.primaRecurrente)
      this.resumen.ahorroTotal = this.resumen.ahorroAnual * parseFloat(this.formQuote.periodoPago)
      this.resumen.ganancia = this.toCalculate.montoDevolucion - this.resumen.ahorroTotal
      setTimeout( () => { this.calculateChart() },500)
    },
    setCoverageAdicional (form) {
      //- console.log('update setCoverageAdicional: ', form)
      this.$set(this.formAdicional, 'codCobertura', form.codCobertura)
      this.$set(this.formAdicional, 'sumaAsegurada', form.sumaAsegurada)
      this.$set(this.formAdicional, 'montoDevolucion', form.montoDevolucion)
      this.$set(this.formAdicional, 'primaRecurrente', form.primaRecurrente)
      this.$set(this.formAdicional, 'periodoVigencia', form.periodoPago)
      this.$set(this.formAdicional, 'periodoPago', form.periodoPago)
      return this.formAdicional
    },
    parameterQuote (fecha) {
      // this.$nuxt.$emit('show-loader', {
      //   text: 'Estamos cargando tu cotización parameterQuote...'
      // })
      this.$store.dispatch('common/parameterQuote', {
        numeroDocumento: this.$store.state.common.dniCliente,
        idProducto: this.idProducto,
        edad: (moment().diff(fecha, 'years'))
      }).then(res => {
        if (res.code === '01') {
          window.dataLayer.push({
            'event': 'PCotizarGuardar parámetros para cotizar',
            'category': 'Paso Cotizar',
            'action': 'Cargar parámetros',
            'label': 'parametros para cotizar'
          })
          // Validar por edad maxima ingreso
          // Suma asegurada --------------------------------------
          let coberturaFallecimiento = (res.data.producto.planes[0].coberturas).filter(f => { return (f.nombre === 'Fallecimiento') })[0]
          let coberturaInvalidezTotal = (res.data.producto.planes[0].coberturas).filter(f => { return (f.nombre === 'Invalidez total por Accidente o Enfermedad como adelanto de capital') })[0]
          let coberturaInvalidezAccidental = (res.data.producto.planes[0].coberturas).filter(f => { return (f.nombre === 'Invalidez Accidental') })[0]
          if (coberturaFallecimiento.edadMaximaIngreso >= (moment().diff(fecha, 'years'))) {
            this.toCalculate.coberturaFallecimiento = coberturaFallecimiento
            this.toCalculate.coberturaInvalidezTotal = coberturaInvalidezTotal
            this.toCalculate.coberturaInvalidezTotal.codCobertura = coberturaInvalidezTotal.idCobertura
            this.toCalculate.coberturaInvalidezAccidental = coberturaInvalidezAccidental
            this.toCalculate.coberturaInvalidezAccidental.codCobertura = coberturaInvalidezAccidental.idCobertura
            this.toCalculate.rangoSumaAseguradaSoles = []
            if (this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.max < 0 || this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.min < 0) {
              this.$nuxt.$emit('hide-loader')
              this.alertGoHome()
            }
            this.toCalculate.rangoSumaAseguradaSoles.min = this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.min
            this.toCalculate.rangoSumaAseguradaSoles.max = this.toCalculate.coberturaFallecimiento.rangoSumaAseguradaSoles.max
            if (this.toCalculate.rangoSumaAseguradaSoles.min > this.toCalculate.rangoSumaAseguradaSoles.max) {
              Swal.fire(
                'Oops...!',
                '¡Lo sentimos! Por el momento no contamos con una cotización que se ajuste a tus necesidades',
                'error'
              )
              this.tracking.errorType = 'FRONTEND'
              this.tracking.errorData = '¡Lo sentimos! Por el momento no contamos con una cotización que se ajuste a tus necesidades'
              this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
                //- console.log('Tracking pago', resTracking)
              })
              this.$amplitude.getInstance().logEvent(
              'Error Encontrado',
                {
                  'Producto Consultado': 'VIDA',
                  'Sub Producto Consultado': this.$store.state.common.channel,
                  'Etapa de Funnel': this.$route.path,
                  'Nombre Error': this.tracking.errorData
                }
              )
              setTimeout(() => {
                this.$nuxt.$emit('hide-loader')
                let goPath = (this.$store.state.common.channel === 'IBK') ? '/interbank' : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? '/universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? '/proteccion-segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? '/ahorro-seguro' : '/vida-con-devolucion'
                this.$nuxt.$router.push({ path: goPath })
              }, 2500)
            } else {
              // SET para el mínimo de suma asegurada por landing escogida
              //- console.log('SET VALOR rangoSumaAseguradaSoles')
              //- console.log(this.toCalculate.rangoSumaAseguradaSoles)
              //- console.log(this.toCalculate.rangoSumaAseguradaSoles.min)
              let makeMinSA = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO' || this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 100000 : this.toCalculate.rangoSumaAseguradaSoles.min
              //- console.log(makeMinSA)
              for (let i = makeMinSA; i <= this.toCalculate.rangoSumaAseguradaSoles.max; i+=25000) {
                (this.toCalculate.rangoSumaAseguradaSoles).push({
                  key: i,
                  value: 'S/ ' + i.toString().split(/(?=(?:\d{3})+$)/).join(',')
                })
              }
            }
            // Agregar el maximo de rangosuma asegurado siempre y cuando sea diferente del último valor del objeto
            if (this.toCalculate.rangoSumaAseguradaSoles.max !== this.toCalculate.rangoSumaAseguradaSoles[this.toCalculate.rangoSumaAseguradaSoles.length - 1].key) {
              this.toCalculate.rangoSumaAseguradaSoles.push({
                key: this.toCalculate.rangoSumaAseguradaSoles.max,
                value: 'S/ ' + (this.toCalculate.rangoSumaAseguradaSoles.max).toString().split(/(?=(?:\d{3})+$)/).join(',')
              })
            }
            // console.log(this.$store.state.common.channel)
            this.maxSuma = (this.toCalculate.rangoSumaAseguradaSoles.max)
            //////////////////////////////////////////////////////////////////////////////
            this.formQuote.sumaAsegurada = this.valorProximoMasCercano(this.toCalculate.rangoSumaAseguradaSoles, this.preloadCombos.sumaAsegurada)
            this.toCalculate.rangoSumaAseguradaSoles.push({ 
              key: this.toCalculate.rangoSumaAseguradaSoles.max + 1, 
              value: 'Más de S/ ' + (this.toCalculate.rangoSumaAseguradaSoles.max).toString().split(/(?=(?:\d{3})+$)/).join(',')
            })
            //////////////////////////////////////////////////////////////////////////////

            // -----------------------------------------------------
            
            // Periodo: X años -----------------------------------
            let objPeriodoCobertura = res.data.producto.planes[0].periodosCobertura
            let makeMaxPC = (this.$store.state.common.channel === 'WEB' || this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO' || this.$store.state.common.channel === 'AHORRO_SEGURO') ? 20 : 24
            this.toCalculate.periodosCobertura = (objPeriodoCobertura).filter(pC => {
              if (pC.value % 2 === 0 && pC.value <= makeMaxPC) {
                pC.value = pC.value + ' ' + 'años'
                return pC.value
              }
            })
            if (this.toCalculate.periodosCobertura[this.toCalculate.periodosCobertura.length - 1].key !== objPeriodoCobertura[objPeriodoCobertura.length - 1].key && objPeriodoCobertura[objPeriodoCobertura.length - 1].key <= makeMaxPC) {
              (this.toCalculate.periodosCobertura).push({
                key: objPeriodoCobertura[objPeriodoCobertura.length - 1].key,
                value: (objPeriodoCobertura[objPeriodoCobertura.length - 1].value) + ' años'
              })
            }
            //////////////////////////////////////////////////////////////////////////////
            this.formQuote.periodoPago = this.valorProximoMasCercano(this.toCalculate.periodosCobertura, this.preloadCombos.periodoPago)
            this.formQuote.periodoVigencia = this.formQuote.periodoPago
            //////////////////////////////////////////////////////////////////////////////

            // Deposito: Mensual, trimestral, semestral o anual
            this.toCalculate.frecuenciaPago = res.data.mesesFrecuenciaPago
            this.toCalculate.periodosCobertura.unshift({ key: null, value: '', disabled: true })
            this.toCalculate.frecuenciaPago.unshift({ key: null, value: '', disabled: true })
            //////////////////////////////////////////////////////////////////////////////
            this.formQuote.frecuenciaPago = (this.toCalculate.frecuenciaPago.some( item => item['key'] === this.preloadCombos.frecuenciaPago)) ? this.preloadCombos.frecuenciaPago : null
            //////////////////////////////////////////////////////////////////////////////
            
            


            // % Devolucion -----------------------------------------
            this.toCalculate.porcentajeDevolucion = (res.data.producto.planes[0].porcentajeDevolucionPrima).filter(pD => {
              // Limitando el Maximo porcentaje de devolucion
              this.maxPD = (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 0 : 200
              this.formQuote.porcentaje = (this.$store.state.common.channel === 'WEB') ? 100 : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 125 : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 100 : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 125 : 0
              if (pD.value <= this.maxPD && pD.value >= this.minPD) {
                pD.value = pD.value + '%'
                return pD.value
              }
            })
            if (this.channelDiscount) {
              this.toCalculateSinDescuento.porcentajeDevolucion = _.cloneDeep(this.toCalculate.porcentajeDevolucion)
            }
            ///////////////////////////////////////////////////////////////////////////
              this.formQuote.porcentaje = this.preloadCombos.porcentajeDevolucion;
              this.$nuxt.$emit('make-quote');
            ///////////////////////////////////////////////////////////////////////////
            // -----------------------------------------------------
          } else {
            Swal.fire(
              'Oops...!',
              '¡Lo sentimos! Por el momento no contamos con una cotización que se ajuste a tus necesidades',
              'error'
            )
            this.tracking.errorType = 'FRONTEND'
            this.tracking.errorData = '¡Lo sentimos! Por el momento no contamos con una cotización que se ajuste a tus necesidades'
            this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
              // console.log('Tracking pago', resTracking)
            })
            this.$amplitude.getInstance().logEvent(
            'Error Encontrado',
              {
                'Producto Consultado': 'VIDA',
                'Sub Producto Consultado': this.$store.state.common.channel,
                'Etapa de Funnel': this.$route.path,
                'Nombre Error': this.tracking.errorData
              }
            )
            setTimeout(() => {
              this.$nuxt.$emit('hide-loader')
              let goPath = (this.$store.state.common.channel === 'IBK') ? '/interbank' : (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? '/universitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? '/proteccion-segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? '/ahorro-seguro' : '/vida-con-devolucion'
              this.$nuxt.$router.push({ path: goPath })
            }, 2500)
          }
        } else {
          // console.log('respuesta diferente de 01', res.code)z
          Swal.fire(
            'Oops...!',
            res.response.data.message + ' Para mayor información puedes comunicarte al +51 933559693',
            'error'
          )
          this.tracking.errorType = 'BACKEND'
          this.tracking.errorData = 'Error'
          this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
            // console.log('Tracking pago', resTracking)
          })
        }
        //- this.$nuxt.$emit('hide-loader');
      }, res => {
        try {
          if (res.response.data.message) {
          Swal.fire(
            'Oops...!',
            res.response.data.message + ' Para mayor información puedes comunicarte al +51 933559693',
            'error'
          )
          this.tracking.errorType = 'FRONTEND'
          this.tracking.errorData = res.response.data.message + 'XXXXX'
          this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
            // console.log('Tracking pago', resTracking)
          })
          this.$amplitude.getInstance().logEvent(
          'Error Encontrado',
            {
              'Producto Consultado': 'VIDA',
              'Sub Producto Consultado': this.$store.state.common.channel,
              'Etapa de Funnel': this.$route.path,
              'Nombre Error': this.tracking.errorData
            }
          )
        } 
        } catch (e) {
          Swal.fire(
            'Oops...!',
            'Estamos teniendo problemas para generar los mejores planes para ti',
            'error'
          )
          this.tracking.errorType = 'FRONTEND'
          this.tracking.errorData = 'Estamos teniendo problemas para generar los mejores planes para ti'
          this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
            // console.log('Tracking pago', resTracking)
          })
          this.$amplitude.getInstance().logEvent(
          'Error Encontrado',
            {
              'Producto Consultado': 'VIDA',
              'Sub Producto Consultado': this.$store.state.common.channel,
              'Etapa de Funnel': this.$route.path,
              'Nombre Error': this.tracking.errorData
            }
          )
        }
      })
    },
    generateParametter (saveClient) {
      this.showPercent = false
      this.formQuote.periodoPago = null
      this.formQuote.frecuenciaPago = null
      this.formQuote.sumaAsegurada = null
      let fecha = (saveClient) ? (saveClient.fechaNacimiento).replace(/\s/g, '').split('/').reverse().join('-') : (this.$store.state.common.saveClient.fechaNacimiento).replace(/\s/g, '').split('/').reverse().join('-')
      let formMakeClient = (saveClient) ? _.cloneDeep(saveClient) : _.cloneDeep(this.$store.state.common.saveClient)
      formMakeClient.channel = this.$store.state.common.channel
      formMakeClient.numeroDocumento = this.$store.state.common.dniCliente
      this.$store.dispatch('common/makeClient', formMakeClient)
      .then(res => {
        if (saveClient) {
          this.$store.commit('common/setSaveClient', saveClient)
        }
        this.parameterQuote(fecha)
      }, response => {
        //- this.$nuxt.$emit('hide-loader');
        this.$parent.showQuote = true
        this.$store.dispatch('common/getClients', formMakeClient.numeroDocumento).then(res => {
          this.$store.commit('common/setSaveClient', {
            numeroDocumento: res.data.numeroDocumento,
            nombre: res.data.nombre,
            apellidoPaterno: res.data.apellidoPaterno,
            apellidoMaterno: res.data.apellidoMaterno,
            fechaNacimiento: res.data.fechaNacimiento,
            sexo: res.data.sexo,
            numeroTelefono: res.data.numeroTelefono,
            email: res.data.email,
            numeroDocumento: res.data.numeroDocumento
          })
        })
        if (response.response.data.code) {
          Swal.fire(
            'Oops...!',
            'No es posible modificar los datos porque el cliente ya tiene una poliza',
            'error'
          )
          this.tracking.errorType = 'FRONTEND'
          this.tracking.errorData = 'No es posible modificar los datos porque el cliente ya tiene una poliza'
          this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
            // console.log('Tracking pago', resTracking)
          })
          this.$amplitude.getInstance().logEvent(
          'Error Encontrado',
            {
              'Producto Consultado': 'VIDA',
              'Sub Producto Consultado': this.$store.state.common.channel,
              'Etapa de Funnel': this.$route.path,
              'Nombre Error': this.tracking.errorData
            }
          )
        } else {
          Swal.fire(
            'Oops...!',
            'Estamos teniendo problemas para realizar la venta. Para mayor información puedes comunicarte al +51 933559693',
            'error'
          )
          this.tracking.errorType = 'FRONTEND'
          this.tracking.errorData = 'Estamos teniendo problemas para realizar la venta. Para mayor información puedes comunicarte al +51 933559693'
          this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
            // console.log('Tracking pago', resTracking)
          })
          this.$amplitude.getInstance().logEvent(
          'Error Encontrado',
            {
              'Producto Consultado': 'VIDA',
              'Sub Producto Consultado': this.$store.state.common.channel,
              'Etapa de Funnel': this.$route.path,
              'Nombre Error': this.tracking.errorData
            }
          )
        }
        this.parameterQuote(fecha)
        // console.log('response makeCLIENT', res.response.data.message)
      })
    },
    getValorButton (valor) {
      let index = this.toCalculate.porcentajeDevolucion.findIndex(i => i.key === valor)
      this.toCalculate.primaRecurrente = this.toCalculate.porcentajeDevolucion[index].primaRecurrente
      this.toCalculate.montoDevolucion = this.toCalculate.porcentajeDevolucion[index].montoDevolucion
      this.toCalculate.primaClienteAnual = this.toCalculate.porcentajeDevolucion[index].primaClienteAnual
      let frecuenciaPagoAmplitude = (this.formQuote.frecuenciaPago === 'M') ? 'Mensual' : (this.formQuote.frecuenciaPago === 'T') ? 'Trimestral' : (this.formQuote.frecuenciaPago === 'S') ? 'Semestral' : (this.formQuote.frecuenciaPago === 'A') ? 'Anual' : this.formQuote.frecuenciaPago
      this.$amplitude.getInstance()
      .logEvent(
        'Vida - Poliza Cotizada',
        {
          'Producto Consultado': 'VIDA',
          'Sub Producto Consultado': this.$store.state.common.channel,
          'Cantidad Asegurada': this.formQuote.sumaAsegurada,
          'Periodo': this.formQuote.periodoPago,
          'Frecuencia de Pago': frecuenciaPagoAmplitude,
          'Monto a Pagar': this.toCalculate.primaRecurrente,
          '% de Devolucion': this.formQuote.porcentaje,
        }
      )
      if (this.channelDiscount) {
        this.toCalculateSinDescuento.primaRecurrente = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaRecurrente
        this.toCalculateSinDescuento.montoDevolucion = this.toCalculateSinDescuento.porcentajeDevolucion[index].montoDevolucion
        this.toCalculateSinDescuento.primaClienteAnual = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaClienteAnual
        this.$store.commit('common/setPrimaRecurrenteDescuento', this.toCalculateSinDescuento.primaRecurrente)
      }
      if ((this.formQuote.frecuenciaPago === 'M' || this.formQuote.frecuenciaPago === 'Mensual' ) && (this.$store.state.common.subchannel).split('_')[0] === 'PROMOCION' && parseInt(this.formQuote.porcentaje) >= 100 && parseInt(this.formQuote.sumaAsegurada) >= 100000) {
        this.$nuxt.$emit('show-alert')
      } else {
        this.$nuxt.$emit('hide-alert')
      }
      setTimeout(() => {
        if (document.getElementById('primaRecurrente')) {
          document.getElementById('primaRecurrente').classList.add('spacing-transition')
          document.getElementById('devolucionMoney').classList.add('spacing-transition')
        }
      }, 500)
      this.tracking.data = this.formQuote
      this.tracking.screen = 'cotizador'
      this.tracking.errorType = ''
      this.tracking.errorData = ''
      this.tracking.trackingId = this.$store.state.common.trackingId
      this.tracking.data.primaRecurrente = this.toCalculate.primaRecurrente
      this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
      })
      //- console.log('codCobertura: ', this.formAdicional.codCobertura)
      //- console.log('arrayCoverageADICIONAL: ', this.$store.state.common.coverageAdicional)
      // set when change return percent
      if(this.formAdicional.sumaAsegurada) {
        let valorFinal1 = {}
        //- console.log( this.$store.state.common.coverageAdicional[(this.formAdicional.codCobertura)])
        //- console.log(this.formAdicional.sumaAsegurada)
        //- console.log(this.formQuote.porcentaje)
        valorFinal1 = this.$store.state.common.coverageAdicional[(this.formAdicional.codCobertura)].filter( x => (x.sumaAsegurada == this.formAdicional.sumaAsegurada))
                                                                .filter( sum => (sum.porcentajeDevolucion == this.formQuote.porcentaje))
        //- console.log('filtro1 : ', this.$store.state.common.coverageAdicional[(this.formAdicional.codCobertura)].filter( x => (x.sumaAsegurada == this.formAdicional.sumaAsegurada)))
        //- console.log('final: ', valorFinal1)
        let form = {}
        form.codCobertura = valorFinal1[0].codCobertura
        form.sumaAsegurada = valorFinal1[0].sumaAsegurada
        form.montoDevolucion = valorFinal1[0].montoDevolucion
        form.primaRecurrente = valorFinal1[0].primaRecurrente
        form.periodoPago = form.periodoVigencia = this.formQuote.periodoVigencia = this.formQuote.periodoPago
        //- console.log('when change return percent', form)
        this.setCoverageAdicional( form)                                                        
      }
    },
    getValor (event) {
      document.getElementById('primaRecurrente').classList.remove('spacing-transition')
      document.getElementById('devolucionMoney').classList.remove('spacing-transition')
      if (event === '25') {
        event = '0'
        document.getElementById('range-tooltip').style.left = '0px'
        document.getElementById('range-porcentaje').value = '0'
        let index = 0
        this.toCalculate.primaRecurrente = this.toCalculate.porcentajeDevolucion[index].primaRecurrente
        this.toCalculate.montoDevolucion = this.toCalculate.porcentajeDevolucion[index].montoDevolucion
        this.toCalculate.primaClienteAnual = this.toCalculate.porcentajeDevolucion[index].primaClienteAnual
        if (this.channelDiscount) {
          this.toCalculateSinDescuento.primaRecurrente = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaRecurrente
          this.toCalculateSinDescuento.montoDevolucion = this.toCalculateSinDescuento.porcentajeDevolucion[index].montoDevolucion
          this.toCalculateSinDescuento.primaClienteAnual = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaClienteAnual
          this.$store.commit('common/setPrimaRecurrenteDescuento', this.toCalculateSinDescuento.primaRecurrente)
        }
        document.getElementById('range-porcentaje').value = '0'
        this.formQuote.porcentaje = '0'
        setTimeout(() => {
          document.getElementById('range-porcentaje').value = '0'
          document.getElementById('primaRecurrente').classList.add('spacing-transition')
          document.getElementById('devolucionMoney').classList.add('spacing-transition')
        }, 500)
      } else {
        let index = this.toCalculate.porcentajeDevolucion.findIndex(i => i.key === parseInt(event))
        document.getElementById('range-tooltip').style.left = this.toCalculate.porcentajeDevolucion[index].sizeRange + 'px'
        this.sizeRangeFinal = this.toCalculate.porcentajeDevolucion[index].sizeRange
        this.toCalculate.primaRecurrente = this.toCalculate.porcentajeDevolucion[index].primaRecurrente
        this.toCalculate.montoDevolucion = this.toCalculate.porcentajeDevolucion[index].montoDevolucion
        this.toCalculate.primaClienteAnual = this.toCalculate.porcentajeDevolucion[index].primaClienteAnual
        if (this.channelDiscount) {
          this.toCalculateSinDescuento.primaRecurrente = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaRecurrente
          this.toCalculateSinDescuento.montoDevolucion = this.toCalculateSinDescuento.porcentajeDevolucion[index].montoDevolucion
          this.toCalculateSinDescuento.primaClienteAnual = this.toCalculateSinDescuento.porcentajeDevolucion[index].primaClienteAnual
          this.$store.commit('common/setPrimaRecurrenteDescuento', this.toCalculateSinDescuento.primaRecurrente)
        }
        setTimeout(() => {
          document.getElementById('primaRecurrente').classList.add('spacing-transition')
          document.getElementById('devolucionMoney').classList.add('spacing-transition')
        }, 500)
      }
      this.tracking.data = this.formQuote
      this.tracking.screen = 'cotizador'
      this.tracking.errorType = ''
      this.tracking.errorData = ''
      this.tracking.trackingId = this.$store.state.common.trackingId
      this.tracking.data.primaRecurrente = this.toCalculate.primaRecurrente
      this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
      })
    },
    parseOneDecimal (valor) {
      if (parseFloat(valor) > 999) {
        let nuevoValor = valor.toFixed('1').split('.')
        nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(',') + '.' + nuevoValor[1]
        return nuevoValor
      } else if (!parseFloat(valor)) {
        return '0'
      } else {
        return valor.toFixed('1')
      }
    },
    parseDecimal (valor) {
      if (parseFloat(valor) > 999) {
        let nuevoValor = valor.toFixed('2').split('.')
        nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join(',') + '.' + nuevoValor[1]
        return nuevoValor
      } else if (!parseFloat(valor)) {
        return '0'
      } else {
        return valor.toFixed('2')
      }
    },
    parseDecimalWhithoutComma (valor) {
      if (parseFloat(valor) > 999) {
        let nuevoValor = valor.toFixed('2').split('.')
        nuevoValor = nuevoValor[0].split(/(?=(?:\d{3})+$)/).join('') + '.' + nuevoValor[1]
        return nuevoValor
      } else if (!parseFloat(valor)) {
        return '0'
      } else {
        return valor.toFixed('2')
      }
    },
    goPagePay (evt) {

      if(this.flagPromociones || this.flagComunicaciones || this.flagEstudios) {
        console.log("Entro al flag de consentimiento")
        this.objConsultaGlobalConsentimiento = {
              id_configuracion: 3,
              cod_tipo_identificacion: "D",
              gls_num_identificacion: this.$store.state.common.saveClient.numeroDocumento,
              aud_usr_ingreso: "vida-backend"
          } 

          this.$store.dispatch('payment/consultaUniversal', this.objConsultaGlobalConsentimiento)
            .then((res) =>{
               
            })
            .catch((e) => {
              console.log("Entro catch", this.$store.state.common)
              this.objConsultaGlobalConsentimientoRegistro = {
                    id_configuracion: 3,
                    cod_tipo_identificacion: "D",
                    gls_num_identificacion: this.$store.state.common.saveClient.numeroDocumento,
                    gls_nombres: this.$store.state.common.saveClient.nombre,
                    gls_apellido_paterno: this.$store.state.common.saveClient.apellidoPaterno,
                    gls_apellido_materno: this.$store.state.common.saveClient.apellidoMaterno,
                    gls_sexo: this.$store.state.common.saveClient.sexo,
                    fec_nacimiento: this.$store.state.common.saveClient.fechaNacimiento,
                    gls_mail: this.$store.state.common.saveClient.email,
                    gls_celular: this.$store.state.common.saveClient.numeroTelefono,
                    aud_usr_ingreso: "vida-backend",
                    ind_consentimiento_producto: true,
                    ind_consentimiento_universal: true
                };
              
                this.$store.dispatch('payment/consentimientoPublico', this.objConsultaGlobalConsentimientoRegistro)
                .then((res) =>{
                  
                })
                .catch((e) => {
                  
                })
            })
      }

      evt.preventDefault()
      let coverages = []
      if (this.$store.state.common.saveClient.nombre && this.$store.state.common.saveClient.fechaNacimiento && this.$store.state.common.saveClient.sexo && this.$store.state.common.saveClient.numeroTelefono && this.$store.state.common.saveClient.email) {
        let newQuote = this.formQuote
        newQuote.sumaAsegurada = (document.getElementById('sumaAsegurada').value)
        // newQuote.frecuenciaPago = (document.getElementById('depositare')).options[document.getElementById('depositare').selectedIndex].text
        newQuote.montoDevolucion = this.toCalculate.montoDevolucion
        newQuote.primaRecurrente = this.toCalculate.primaRecurrente
        // newQuote.sizeRangeFinal = this.sizeRangeFinal
        // document.getElementById('range-tooltip').style.left = self.sizeRangeFinal + 'px'
        let index = this.toCalculate.rangoSumaAseguradaSoles.findIndex(i => i.key === parseInt(this.formQuote.sumaAsegurada))
        let productNamePixel = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'segurouniversitario' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'ahorrojubilacion' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'proteccionsegura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'ahorroseguro' : 'segurodevida'
        let frecuenciaPagoAmplitude = (this.formQuote.frecuenciaPago === 'M') ? 'Mensual' : (this.formQuote.frecuenciaPago === 'T') ? 'Trimestral' : (this.formQuote.frecuenciaPago === 'S') ? 'Semestral' : (this.formQuote.frecuenciaPago === 'A') ? 'Anual' : this.formQuote.frecuenciaPago
        // amplitude
        this.$amplitude.getInstance().identify(new this.$amplitude.Identify().add('Cantidad de Polizas Vida Cotizada', 1))
        this.$amplitude.getInstance().logEvent(
          'Vida - Vida - Inicio de Compra',
          {
            'Cantidad Asegurada': this.formQuote.sumaAsegurada,
            'Periodo': this.formQuote.periodoPago,
            'Frecuencia de Pago': frecuenciaPagoAmplitude,
            '% de Devolucion': this.formQuote.porcentaje,
            'Monto a Pagar': this.formQuote.primaRecurrente,
          }
        )
        window.dataLayer.push({
          'event': 'PCotizar CTA',
          'category': 'Paso Cotizar',
          'action': 'Click',
          'label': 'CTA lo quiero',
          'product': productNamePixel,
          'content_ids': 'sku00' + (index + 1),
          'content_category': 'Cobertura'+this.formQuote.sumaAsegurada,
          'porcentaje': this.formQuote.porcentaje,
          'sumaAsegurada': this.formQuote.sumaAsegurada,
          'periodo vigencia': this.formQuote.periodoVigencia,
          'frecuencia pago': this.formQuote.frecuenciaPago
        })
        let productName = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'Vida con devolución Univ' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'Vida con devolución Jub' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'Vida con devolución Segura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'Vida con devolución Seguro' : 'Vida con devolución'
        let productId = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? 'VidaUniv' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? 'VidaJub' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? 'VidaSegura' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? 'VidaSeguro' :  'VidaCash'
        window.dataLayer.push({
          'event': 'EECaddToCart',
          'ecommerce': {
            'currencyCode': 'PEN',
            'add': {                    
              'products': [{
                'name': productName,
                'id': productId,
                'price': (this.toCalculate.primaClienteAnual).toString(),
                'quantity': '1',
                'category': 'Póliza'        
                }]
            }
          }
        })
        window.dataLayer.push({
          'event': 'userData',
          'firstname': this.$store.state.common.saveClient.nombre,
          'lastname': this.$store.state.common.saveClient.apellidoPaterno + ' '+ this.$store.state.common.saveClient.apellidoMaterno,
          'email': this.$store.state.common.saveClient.email,
          'phone': this.$store.state.common.saveClient.numeroTelefono,
          'monto': (this.toCalculate.primaClienteAnual).toString()
        });
        this.$store.commit('common/setPrimaClienteAnual', (this.toCalculate.primaClienteAnual).toString())
        this.$store.commit('common/setCotizacion', this.formQuote)
        if (this.formAdicional.sumaAsegurada) {
          this.formAdicional.description = (this.toCalculate.coberturaInvalidezTotal.codCobertura === this.formAdicional.codCobertura) ? 'Fallecimiento  invalidez total' : 'Fallecimiento accidental'
          //- console.log('COBERTURA ELEGIDA', this.formAdicional)
          coverages.push({
            "codCobertura": this.toCalculate.coberturaFallecimiento.idCobertura,
            "sumaAsegurada": this.formQuote.sumaAsegurada,
            "periodoVigencia": this.formQuote.periodoVigencia,
            "periodoPago": this.formQuote.periodoPago
          })
          
          coverages.push(this.formAdicional)
          //- console.log('COVERAGE FINAL CON ADICIONAL: ', coverages)
          
          //- console.log('COTIZACION ADICIONAL GUARDANDO: ', this.formAdicional)
        }
        this.$store.commit('common/setCotizacionAdicional', coverages) 
        let goPath = (this.$store.state.common.channel === 'IBK') ? '/interbank/paso/pago' : '/paso/pago'
        this.$nuxt.$router.push({ path: goPath })
      } else {
        Swal.fire(
          'Oops...!',
          'Por favor, verifica tus datos',
          'error'
        )
        this.tracking.errorType = 'FRONTEND'
        this.tracking.errorData = 'Por favor, verifica tus datos'
        this.$store.dispatch('common/makeTracking', this.tracking).then(resTracking => {
          // console.log('Tracking pago', resTracking)
        })
        this.$amplitude.getInstance().logEvent(
        'Error Encontrado',
          {
            'Producto Consultado': 'VIDA',
            'Sub Producto Consultado': this.$store.state.common.channel,
            'Etapa de Funnel': this.$route.path,
            'Nombre Error': this.tracking.errorData
          }
        )
      }
    },
    makeQuote (reference, addValid, event) {
      if ('sumaAsegurada' === addValid && event > this.maxSuma) {
        this.clientFree.telefono = this.$store.state.common.saveClient.numeroTelefono
        this.formQuote.sumaAsegurada = this.maxSuma
        // emit modal for VIDA  fFREE
        this.$nuxt.$emit('bv::show::modal', 'optionVidaFree')
      } else {
        this.getValorButton(this.formQuote.porcentaje)
      }
      this.$nuxt.$emit('make-quote')
    },
    confirmQuotation () {
      let self = this
      // amplitude
      let frecuenciaPagoAmplitude = (this.formQuote.frecuenciaPago === 'M') ? 'Mensual' : (this.formQuote.frecuenciaPago === 'T') ? 'Trimestral' : (this.formQuote.frecuenciaPago === 'S') ? 'Semestral' : (this.formQuote.frecuenciaPago === 'A') ? 'Anual' : this.formQuote.frecuenciaPago
      this.$amplitude.getInstance().logEvent(
        'Vida - Cotizacion Enviada',
        {
          'Cantidad Asegurada': this.formQuote.sumaAsegurada,
          'Periodo': this.formQuote.periodoPago,
          'Frecuencia de Pago': frecuenciaPagoAmplitude,
          'Autoenvio Email': (this.sendQuotation.email == this.$store.state.common.saveClient.email) ? true : false,
          'Email Envio': this.sendQuotation.email,
          'Monto a Pagar': this.formQuote.primaRecurrente,
          '% de Devolucion': this.formQuote.porcentaje,
        }
      )
      // sendApiQuotation ...
      this.sendQuotation.numeroDocumento = this.$store.state.common.saveClient.numeroDocumento
      this.sendQuotation.urlCancelacion = process.env.base + 'seguro-de-vida/' + 'unsubscribe/' + this.$store.state.common.codeRemarketing
      // channel
      let makeUrlRMKT = (this.$store.state.common.channel === 'SEGURO_UNIVERSITARIO') ? '/universitario/' : (this.$store.state.common.channel === 'AHORRO_JUBILACION') ? '/ahorro-jubilacion/' : (this.$store.state.common.channel === 'PROTECCION_SEGURA') ? '/proteccion-segura/' : (this.$store.state.common.channel === 'AHORRO_SEGURO') ? '/ahorro-seguro/' : '/vida-con-devolucion/'
      this.sendQuotation.urlRemarketing = process.env.base + 'seguro-de-vida' + makeUrlRMKT + this.$store.state.common.saveClient.numeroDocumento + '?utm_campaign=cotizacion'

      this.sendQuotation.cotizacion = this.formQuote
      this.sendQuotation.cotizacion.porcentajeDevolucion = this.formQuote.porcentaje
      this.$nuxt.$emit('save-data-remarketing', {
        envioCotizacion: true,
        sendQuotation: self.sendQuotation
      })
      this.$nuxt.$emit('bv::hide::modal', 'sendQuote')
    },
    hideModal (idModal) {
      this.$nuxt.$emit('bv::hide::modal', idModal)
    },
    saveClientData () {
      // sendApi and save Data TO VIDAFREE
      this.$store.dispatch('common/saveClientFree', this.clientFree).then(respuesta => {
        if (respuesta) {
          this.$nuxt.$emit('bv::hide::modal', 'optionVidaFree')
          this.$nuxt.$emit('bv::show::modal', 'confirmVF')
        }
      }, res => {
        // go home
        this.alertGoHome()
      })
      
    },
    resetSumaAsegurada () {
      this.formQuote.sumaAsegurada = (this.toCalculate.rangoSumaAseguradaSoles[this.toCalculate.rangoSumaAseguradaSoles.length - 2].key)
    },
    hideModalVidafree (modal) {
      this.hideModal(modal)
      this.resetSumaAsegurada()
    },
    goBack (percent) {
      const len = this.toCalculate.porcentajeDevolucion.length
      let idx = this.toCalculate.porcentajeDevolucion.findIndex(p => p.key === percent)
      if (idx >= 1 && this.toCalculate.porcentajeDevolucion[idx - 1].key >= this.objCalculo.porcentajeMin) {
        this.formQuote.porcentaje = this.toCalculate.porcentajeDevolucion[idx - 1]?.key
        //- console.log('Valor del porcentajeDevolucion back: ')
        //- console.log('%: ', this.formQuote.porcentaje)
        this.getValorButton(this.formQuote.porcentaje)
      } else {
        this.formQuote.porcentaje = percent
      }
    },
    goNext (percent) {
      const len = this.toCalculate.porcentajeDevolucion.length
      //- console.log('findindex.', this.toCalculate.porcentajeDevolucion)
      let idx = this.toCalculate.porcentajeDevolucion.findIndex(p => p.key === percent)
      if (idx <= len - 2 && this.toCalculate.porcentajeDevolucion[idx + 1].key <= this.objCalculo.porcentajeMax) {
        this.formQuote.porcentaje = (this.toCalculate.porcentajeDevolucion[idx + 1])?.key
        //- console.log('Valor del porcentajeDevolucion next: ')
        //- console.log('%: ', this.formQuote.porcentaje)
        this.getValorButton(this.formQuote.porcentaje)
      } else {
        this.formQuote.porcentaje = percent
      }
    },
    valorProximoMasCercano(arreglo, valorComparar){
      let resultado = arreglo
          .filter(item => item.key <= valorComparar)
          .reduce(function (acum, item) {
              if (acum === null) {
                  return item;
              } else if (item.key > acum.key) {
              return item;
            }
            return acum;
          }, null);
      //console.log("VER 2: " + resultado.key);
      return resultado.key; //this.formQuote.sumaAsegurada = resultado.key;
    },
    getTextFrecuenciaPago () {
      let indexFrecuencia = this.toCalculate.frecuenciaPago.findIndex(i => i.key === this.formQuote.frecuenciaPago)
      return this.toCalculate.frecuenciaPago[indexFrecuencia].value
    },
    selectAllComunicaciones(evt){
      if (evt === true) {
        this.flagPromociones = true
        this.flagEstudios = true
      } else {
        this.flagPromociones = false
        this.flagEstudios = false
      }
    },
    selectAll(evt) {

      if (evt === true) {
        this.flagPromociones = true
        this.flagEstudios = true
      } else {
        this.flagPromociones = false
        this.flagEstudios = false
      }
    },
    selectPromociones(evt) {

      if (evt === true && this.flagEstudios === true) {
        this.flagComunicaciones = true
      } else {
        this.flagComunicaciones = false
      }
    },
    selectEstudios(evt) {

      if (evt === true && this.flagPromociones === true) {
        this.flagComunicaciones = true
      } else {
        this.flagComunicaciones = false
      }
    },
  },
  components: {
    //- CoverageAdicional
  },
  beforeDestroy () {
    // console.log('destruyendo form-calculate')
  }
}
</script>

