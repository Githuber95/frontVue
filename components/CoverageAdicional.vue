
<template lang="pug">
  //- div.coverage-adicional.my-2(ref="coverage-adicional"  )
  //-   
  div.coverage-adicional(ref="coverage-adicional")
    b-row(v-if="$store.state.common.channel === 'ENDOSOS'")
      b-col(cols="12")
        div.box-endosos.px-2.mb-3
          b-row(v-if="formAdicional.codCobertura == 4")
            b-col.pr-0(cols="10")
              h6(style="font-size: 11px;") Invalidez Total y Permanente por <br>Accidente y/o Enfermedad.
            b-col.text-center(cols="2")
              img(src="@/static/media/common/cotiza/check_green.svg" alt="listo")
    b-card.texto(v-else)
      b-card-header.p-0(header-tag='header' role='tab')
        b-button(block='' href='#' v-b-toggle.show-coverage-adicional aria-controls="show-coverage-adicional" @click.prevent="showCoveragesAdicional($event)")  Coberturas adicionales<br> <p class="text-black">Asegura aún más tu tranquilidad y a los que quieres con una de estas coberturas</p> <p class="text-black">Agrega coberturas a tu seguro de vida</p>
      b-card-body(style="background: #F2FCFF !important")
        // Resumen
        b-row(v-if="!visible && formAdicional.sumaAsegurada")
          b-col.py-2.text-right(cols="2")
            img(src="@/static/media/endosos/check_bg_white.svg" alt="listo")
          b-col.py-2.px-0(cols="7")
            h4(v-if="formAdicional.codCobertura === 4") Invalidez total y permanente {{ '(S/' +parseDecimal(parseFloat(formAdicional.sumaAsegurada)) + ')' }}
            h4(v-else) Invalidez Accidental {{(formAdicional.sumaAsegurada) ? '(S/' +parseDecimal(parseFloat(formAdicional.sumaAsegurada)) + ')' : 'Oops...Seguiremos mejorando, para darte las mejores opciones'}}
          b-col.py-2.pr-0(cols="3")
            h5.text-secondary.omnes-semibold +S/{{ formAdicional.primaRecurrente }}
      b-collapse(accordion='my-accordion' role='tabpanel' id="show-coverage-adicional" v-model="visible")
        b-card-body(style="background: #F2FCFF !important")
          b-card-text.px-3.px-md-1.px-lg-0
            b-row
              b-col.py-2(cols="12")
                h4.omnes-semibold.text-primary Coberturas adicionales por invalidez
                p.text-primary.lh-1.text-black Sólo podrás escoger una de las dos coberturas por invalidez
              b-col.my-2(cols="10")
                h4.omnes-medium Invalidez total y permanente por accidente o enfermedad como adelanto de capital
                p.lh-1 Lo que recibes de la cobertura es un adelanto de tu cobertura de fallecimiento. 
                p.omnes-semibold.lh-1 Recibirás un monto a partir de: S/{{ minCoverageAdicional }}
              b-col.px-0(cols="2")
                .switcher-box.mt-3
                  span.switcher.switcher-1
                    input#switcher_invalidez-total(type='checkbox' v-model="invalidezTotal" @change.prevent="activeInvalidezTotal($event.target.checked, toCalculate.coberturaInvalidezTotal.codCobertura)")
                    label(for='switcher_invalidez-total')
            b-row
              b-col.mt-2(cols="12" v-if="invalidezTotal")
                h5.my-2.omnes-medium(v-if="formAdicional.primaRecurrente") Adicional a pagar &nbsp;<h5 class="omnes-semibold text-primary selected px-2 py-1 d-inline">+ S/ {{ formAdicional.primaRecurrente }}</h5>
                b-row.justify-content-center(v-if="allSumaAseguradas.length > 0")
                  b-col.pl-md-0(cols="12")
                    h4.omnes-medium.mt-3 Monto de cobertura &nbsp;&nbsp;<h5 class="omnes-semibold text-primary selected px-2 py-1 d-inline">&nbsp;&nbsp;S/ {{ formAdicional.sumaAsegurada.split(/(?=(?:\d{3})+$)/).join(',') }}&nbsp;&nbsp;</h5>
                  //- b-col.px-1(cols="4" v-for="(respuesta, index) in allSumaAseguradas" :key="index" @click.prevent="setValuesFromSA({codCobertura: toCalculate.coberturaInvalidezTotal.codCobertura, sumaAsegurada: respuesta})")
                    h5.cursor-pointer(:class="[respuesta === formAdicional.sumaAsegurada ? 'selected' : 'no-selected']") S/&nbsp;{{respuesta.split(/(?=(?:\d{3})+$)/).join(',')}}
                b-row(v-else)
                  b-col(cols="12")
                    h5.omnes-medium.text-primary.pb-2 Oops...Seguiremos mejorando, para darte las mejores opciones
              b-col(cols="12")
                hr
              b-col(cols="10" )
                h4.omnes-medium Invalidez Accidental
                p.lh-1 Recibirás el monto de tu cobertura en caso de accidente (no se resta de tu c. de fallecimiento) 
                p.omnes-semibold.lh-1(v-if="!invalidezAccidental") Recibirás un monto a partir de: S/{{ minCoverageAdicional }}
              b-col.px-0(cols="2")
                .switcher-box.mt-3
                  span.switcher.switcher-1
                    input#switcher_invalidez-accident(type='checkbox' v-model="invalidezAccidental" @change.prevent='activeInvalidezAccidental($event.target.checked, toCalculate.coberturaInvalidezAccidental.codCobertura)')
                    label(for='switcher_invalidez-accident')
            b-row    
              b-col.mt-2(cols="12" v-if="invalidezAccidental")
                h5.my-2.omnes-medium(v-if="formAdicional.primaRecurrente") Adicional a pagar &nbsp;<h5 class="omnes-semibold text-primary selected px-2 py-1 d-inline">+ S/ {{formAdicional.primaRecurrente}}</h5>
                b-row.justify-content-center(v-if="allSumaAseguradas.length > 0")
                  b-col.pl-md-0.mt-2(cols="12")
                    h4.omnes-medium.mt-3 Monto de cobertura &nbsp;&nbsp;<h5 class="omnes-semibold text-primary selected px-2 py-1 d-inline">&nbsp;&nbsp;S/ {{ formAdicional.sumaAsegurada.split(/(?=(?:\d{3})+$)/).join(',') }}&nbsp;&nbsp;</h5>
                  //- b-col.px-1(cols="4" v-for="(respuesta, index) in allSumaAseguradas" :key="index" @click.prevent="setValuesFromSA( { codCobertura: toCalculate.coberturaInvalidezAccidental.codCobertura, sumaAsegurada: respuesta })")
                    h5.cursor-pointer(:class="[respuesta === formAdicional.sumaAsegurada ? 'selected' : 'no-selected']") S/&nbsp;{{respuesta.split(/(?=(?:\d{3})+$)/).join(',')}}
                b-row(v-else)
                  b-col(cols="12")
                    h5.omnes-medium.text-primary.pb-2 Oops...Seguiremos mejorando, para darte las mejores opciones
          hr(style="width: 105%;margin-left: -2.5%;")
          b-card-text.px-3.px-md-1.px-lg-0
            b-row
              b-col.pb-2(cols="12")
                h5.omnes-medium.text-primary.cursor-pointer Te explicamos como funcionan las coberturas adicionales <span @click="$nuxt.$emit('bv::show::modal', 'coberturas-adicionales')" style="text-decoration:underline"> aquí.</span>
    b-modal#coberturas-adicionales.pt-0(title="Probando" size="md" centered hide-footer hide-header static no-close-on-esc no-close-on-backdrop)
      div.text-right
        img.cursor-pointer(@click="hideModal('coberturas-adicionales')" src="https://uploads-ssl.webflow.com/5b29b333e01a7071fadb2f1c/5b5f46206abb673bc5374fdb_icon-close.svg" width="40" alt="icon close" )
      b-container
        b-row.align-items-center
          b-col.px-0(cols="2")
            img(src="@/static/media/common/cotiza/concepto_cobertura-adicional.png" alt="")
          b-col.px-1.mb-2(cols="10")
            h4.text-primary.omnes-medium Como funcionan las coberturas adicionales por invalidez
            div.pila.bg-secondary.text-white.py-1.w-fit
              h5 Con estos montos de coberturas de ejemplo
        b-row
          b-col.my-2.pl-0(cols="12")
            h5.text-primary.omnes-medium Invalidez total y permanente por accidente o enfermedad como adelanto de capital
          b-col.px-0.mb-2(cols="1")
            img(src="@/static/media/common/cotiza/one.svg" alt="")
          b-col.px-1.mb-2(cols="11")
            p Recibirás el monto que seleccionaste de cobertura adicional por invalidez. Ejem:
            img(src="@/static/media/common/cotiza/one_invalidez-total.svg" alt="")
          b-col.px-0(cols="1")
            img(src="@/static/media/common/cotiza/two.svg" alt="")
          b-col.px-1.mb-2(cols="11")
            p Este monto, al ser un adelanto, se resta de tu cobertura de fallecimiento principal. Ejem:
            img(src="@/static/media/common/cotiza/two_invalidez-total.svg" alt="")
          b-col.px-0(cols="1")
            img(src="@/static/media/common/cotiza/three.svg" alt="")
          b-col.px-1.mb-2(cols="11")
            p.omnes-medium A partir de ese momento solo pagaras por tu cobertura por fallecimiento.
        b-row
          b-col.my-2.pl-0(cols="12")
            h5.text-primary.omnes-medium Invalidez Accidental
          b-col.px-0(cols="1")
            img(src="@/static/media/common/cotiza/one.svg" alt="")
          b-col.px-1.mb-2(cols="11")
            p Recibirás el monto que seleccionaste de cobertura adicional por invalidez. Ejem:
            img(src="@/static/media/common/cotiza/one_invalidez-accidental.svg" alt="")
          b-col.px-0(cols="1")
            img(src="@/static/media/common/cotiza/two.svg" alt="")
          b-col.px-1.mb-2(cols="11")
            p Esta cobertura <span class="omnes-medium">no se resta del monto de tu cobertura de fallecimiento principal.</span>
          b-col.px-0(cols="1")
            img(src="@/static/media/common/cotiza/three.svg" alt="")
          b-col.px-1.mb-2(cols="11")
            p A partir de ese momento solo pagaras por tu cobertura por fallecimiento.
          p.my-2 Las coberturas aplican si la invalidez es a consecuencia directa de un accidente o 
            | una enfermedad ocurridos durante la vigencia de la póliza, si el asegurvado quedara 
            | total y permanentemente Inválido. El monto de devolución que acumulas cómo ahorro
            | no se ve afectado en la aplicación de la cobertura adicional.
    b-modal#invalidez-total(title="Probando" size="md" centered hide-footer hide-header static no-close-on-esc no-close-on-backdrop)
      div.text-right
        img.cursor-pointer(@click="hideModal('invalidez-total')" src="https://uploads-ssl.webflow.com/5b29b333e01a7071fadb2f1c/5b5f46206abb673bc5374fdb_icon-close.svg" width="40" alt="icon close" )
      b-container
        b-row.justify-content-center
          b-col.px-0.text-center(cols="12")
            img(src="@/static/media/common/cotiza/invalidez_total_accidental.png" alt="Invalidez total")
          b-col.px-1.mb-3.text-center(cols="12")
            h3.text-primary.omnes-medium Invalidez total y permanente por accidente o enfermedad como adelanto de capital
        b-row.justify-content-center(v-if="step === 1")
          b-col(cols="11")
            img(src="@/static/media/common/cotiza/one.svg" alt="")           
          b-col.mt-1(cols="11")
            h5 Durante la contratación de tu seguro seleccionas la cobertura adicional.
            h5.mt-2
              span.bg-primary.text-white Ejemplo: 
              span.text-primary &nbsp;Seleccionas el monto de la cobertura, en este caso seleccionamos S/50,000
          b-col.my-3.text-center(cols="12")
            img.w-75(src="@/static/media/common/cotiza/first_invalidez-total.svg" alt="")
        b-row.justify-content-center(v-if="step === 2")
          b-col(cols="11")
            img(src="@/static/media/common/cotiza/two.svg" alt="")           
          b-col.mt-1(cols="11")
            h5 Al ser un adelanto de capital, el monto que recibirás, se restará de la cobertura por fallecimiento.
            h5.mt-2
              span.bg-primary.text-white Ejemplo: 
              span.text-primary &nbsp;Si seleccionaste S/100,000 de cobertura de fallecimiento, se restara el monto que seleccionaste de tu cobertura adicional
          b-col.my-3.text-center(cols="12")
            img.w-75(src="@/static/media/common/cotiza/second_invalidez-total.svg" alt="")
        b-row.justify-content-center(v-if="step === 3")
          b-col(cols="11")
            img(src="@/static/media/common/cotiza/three.svg" alt="")           
          b-col.mt-1(cols="11")
            h5 A partir de ese momento solo pagarás por tu cobertura por fallecimiento.
            h5.mt-2
              span.bg-primary.text-white Ejemplo: 
              span.text-primary &nbsp;Si pagabas S/420 por tu seguro incluido tus coberturas adicionales, después de haber recibido el adelanto de capital; pagarás S/350 hasta que acabe la contratación
          b-col.my-3.align-items-center.text-center(cols="12")
            img.w-50(src="@/static/media/common/cotiza/third_invalidez-total.svg" alt="")
        b-row.my-2
          b-col.text-left(cols="2")
            img(src="@/static/media/common/cotiza/before.svg" alt="" @click="step=step-1" style="cursor:pointer;" v-if="step==2 || step==3")
          b-col.d-flex.justify-content-center.pt-2(cols="8" v-if="step === 1")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=1")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #D5E5FD 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=2")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #D5E5FD 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=3")
          b-col.d-flex.justify-content-center.pt-2(cols="8" v-if="step === 2")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=1")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=2")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #D5E5FD 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=3")
          b-col.d-flex.justify-content-center.pt-2(cols="8" v-if="step === 3")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=1")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=2")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=3")
          b-col.text-right(cols="2")
            img(src="@/static/media/common/cotiza/next.svg" alt="" @click="step=step+1" style="cursor:pointer;" v-if="step==1 || step==2")
    b-modal#invalidez-accidental(title="Probando" size="md" centered hide-footer hide-header static no-close-on-esc no-close-on-backdrop)
      div.text-right
        img.cursor-pointer(@click="hideModal('invalidez-accidental')" src="https://uploads-ssl.webflow.com/5b29b333e01a7071fadb2f1c/5b5f46206abb673bc5374fdb_icon-close.svg" width="40" alt="icon close" )
      b-container
        b-row.justify-content-center
          b-col.px-0.text-center(cols="12")
            img(src="@/static/media/common/cotiza/invalidez_total_accidental.png" alt="Invalidez total")
          b-col.px-1.mb-3.text-center(cols="12")
            h3.text-primary.omnes-medium Invalidez Accidental
        b-row.justify-content-center(v-if="step === 1")
          b-col(cols="11")
            img(src="@/static/media/common/cotiza/one.svg" alt="")           
          b-col.mt-1(cols="11")
            h5 Durante la contratación de tu seguro seleccionas la cobertura adicional.
            h5.mt-2
              span.bg-primary.text-white Ejemplo: 
              span.text-primary &nbsp;Seleccionas el monto de la cobertura, en este caso seleccionamos S/75,000
          b-col.my-3.text-center(cols="12")
            img.w-75(src="@/static/media/common/cotiza/first_invalidez-accidental.svg" alt="")
        b-row.justify-content-center.mb-3(v-if="step === 2")
          b-col(cols="11")
            img(src="@/static/media/common/cotiza/two.svg" alt="")           
          b-col.mt-1(cols="11")
            h5 Esta cobertura no se resta del monto de tu cobertura de fallecimiento principal.
            h5.mt-2
              span.bg-primary.text-white Ejemplo: 
              span.text-primary &nbsp;Si seleccionaste S/75,000 de cobertura adicional y seleccionaste S/100,000 de cobertura de fallecimiento; se te dará el mismo monto de S/100,000 si falleces así hayas aplicado la cobertura adicional de Invalidez accidental.
        b-row.justify-content-center(v-if="step === 3")
          b-col(cols="11")
            img(src="@/static/media/common/cotiza/three.svg" alt="")           
          b-col.mt-1(cols="11")
            h5 A partir de ese momento solo pagarás por tu cobertura por fallecimiento.
            h5.mt-2
              span.bg-primary.text-white Ejemplo: 
              span.text-primary &nbsp;Si pagabas S/350 por tu seguro incluido tu cobertura adicional, después de haber recibido el adelanto de capital; pagarás S/290 hasta que acabe la contratación
          b-col.my-3.align-items-center.text-center(cols="12")
            img.w-50(src="@/static/media/common/cotiza/third_invalidez-accidental.svg" alt="")
        b-row.my-2
          b-col(cols="2")
            img.cursor-pointer(src="@/static/media/common/cotiza/before.svg" alt="" @click="step=step-1" v-if="step==2 || step==3")
          b-col.d-flex.justify-content-center.pt-2(cols="8" v-if="step === 1")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=1")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #D5E5FD 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=2")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #D5E5FD 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=3")
          b-col.d-flex.justify-content-center.pt-2(cols="8" v-if="step === 2")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=1")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=2")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #D5E5FD 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=3")
          b-col.d-flex.justify-content-center.pt-2(cols="8" v-if="step === 3")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=1")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=2")
            div.mx-1.cursor-pointer(style="    top: 747px; left: 932px; width: 10px; height: 10px;background: #0855C4 0% 0% no-repeat padding-box; border-radius: 50%;" @click="step=3")
          b-col(cols="2")
            img.cursor-pointer(src="@/static/media/common/cotiza/next.svg" alt="" @click="step=step+1" v-if="step==1 || step==2")
</template>

<script>
export default {
  props: ['form', 'toCalculate', 'formAdicional'],
  data () {
    return {
      minCoverageAdicional: 0,
      textToLoad: '... Cargando coberturas adicionales ...',
      visible: true,
      arrayCoverageAdicional: this.$store.state.common.coverageAdicional,
      invalidezTotal: false,
      invalidezAccidental: false,
      allCodCobertura: [],
      allSumaAseguradas: [],
      step: 1
    }
  },
  
  created () {
  },
  mounted () {
    //- this.invalidezTotal = (this.$store.state.common.channel == 'ENDOSOS') ? true : false
    // 1. ARRAY OF ID_COBERTURA
    this.allCodCobertura.push(this.toCalculate.coberturaInvalidezTotal.codCobertura)
    this.allCodCobertura.push(this.toCalculate.coberturaInvalidezAccidental.codCobertura)
    this.$nuxt.$on('reset-coverage-adicional', () => {
      this.invalidezAccidental = this.invalidezTotal = this.visible = false
      this.setValueAdicional('', 0,0,0)
    })
    this.$nuxt.$on('show-coverage-adicional', () => {
      console.log('EMITIENDO EVENTO show-coverage-adicional')
      this.invalidezTotal = (this.$store.state.common.channel == 'ENDOSOS') ? true : false
      this.textToLoad = '... Cargando coberturas adicionales ...'
      //- console.log('EVENTO COVERAGE ADICIONAL')
      let formCoverageAdicional = _.cloneDeep(this.form)
      // Limpiando corbeturas pre seleccionadas
      formCoverageAdicional.coberturas = []
      // 2. ARRAY OF 'SUMA ASEGURADA'
      let requestSA = []
      this.minCoverageAdicional = (this.$store.state.common.channel== 'ENDOSOS') ? formCoverageAdicional.sumaAsegurada : ((formCoverageAdicional.sumaAsegurada/2) < 25000) ? 25000 : Math.ceil((formCoverageAdicional.sumaAsegurada/2)/25000)*25000;
       
      // ALL OPTIONS QUOTES
      //- for (let i = this.minCoverageAdicional; i <= formCoverageAdicional.sumaAsegurada; i+=25000) {
      //-   requestSA.push(i)
      //- }
      requestSA.push(this.minCoverageAdicional)
      // All options of 'Suma Asegurada'
      //- console.log('Todas las opciones de Suma asegurada', requestSA)
      this.allCodCobertura.forEach( (id) => {
        //- console.log('idCodCobertura: ', id)
        requestSA.map(sumaAsegurada => {
          //- console.log('suma aseguradas: ', sumaAsegurada)
          formCoverageAdicional.coberturas.push({
            "codCobertura": id,
            "sumaAsegurada": sumaAsegurada,
            "periodoVigencia": formCoverageAdicional.periodoPago,
            "periodoPago": formCoverageAdicional.periodoPago
          })
        })
      })
      this.$store.commit('common/setCoverageAdicional', '')
      console.log('dispatch')
      this.$store.dispatch('common/makeQuoteCoverages', formCoverageAdicional).then(resAdicional => {
        console.log('Respondiendo')

        this.$nuxt.$emit('hide-loader');
        if (this.invalidezTotal) { 
          //- console.log('ACTIVO invalidezTotal: ', this.invalidezTotal)
          this.activeInvalidezTotal(true, this.toCalculate.coberturaInvalidezTotal.codCobertura) 
        }
        if (this.invalidezAccidental) { 
          //- console.log('ACTIVO invalidezAccidental: ', this.invalidezAccidental)
          this.activeInvalidezAccidental(true, this.toCalculate.coberturaInvalidezAccidental.codCobertura) 
        }
      }, response => {
        this.$nuxt.$emit('hide-loader');
        //- console.log('error COVERAGE ADICIONAL: ',response)
        this.textToLoad = 'Oops...Seguiremos mejorando, para darte las mejores opciones'
      })
    })
    this.$nuxt.$on('set-value-to-adicional', (adicional) => {
      this.textToLoad = '... Cargando coberturas adicionales ...'
      this.arrayCoverageAdicional = this.$store.state.common.coverageAdicional
      //- console.log('--------set-value-to-adicional--------------')
      //- console.log('suma asegurada: inicio', this.allSumaAseguradas)
      //- console.log(adicional.codCobertura, ' - ', adicional.sumaAsegurada, ' - ', adicional)
      //- console.log(this.arrayCoverageAdicional)
      //- if (!adicional.sumaAsegurada) {
      // SHOW ALL POSIBILITIES OPTIONS TO SUMA ASEGURADAS FOR TO COVERAGE ADICIONAL
      this.allSumaAseguradas = [...new Set(this.arrayCoverageAdicional[(adicional.codCobertura)].map(item => item.sumaAsegurada))].sort((a, b) => a - b)
      //- console.log('suma asegurada: final', this.allSumaAseguradas)
      adicional.sumaAsegurada = this.allSumaAseguradas[this.allSumaAseguradas.length - 1]
      //- }
      this.setValuesFromSA(adicional)
      //- console.log('--------set-value-to-adicional--------------')
    })
  },
  beforeDestroy () {
    this.$nuxt.$off('reset-coverage-adicional')
    this.$nuxt.$off('show-coverage-adicional')
    this.$nuxt.$off('set-value-to-adicional')
  },
  methods: {
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
    hideModal (id) {
      this.$nuxt.$emit('bv::hide::modal', id)
      this.step = 1
    },
    showCoveragesAdicional (event) {
      //- console.log('---- coberturas adicionales activando ---- ', event.target)
      //- console.log(this.visible)
      //- console.log(event.target.value)
      if (!this.visible && !this.invalidezAccidental && !this.invalidezTotal) {
        //- console.log('llamar a la api, colapse open')
        console.log('Cargando tu cotizacion adicional')
        this.$nuxt.$emit('show-loader', { text: 'Estamos cargando cotizaciones adicionales...' })
        this.$nuxt.$emit('show-coverage-adicional')
       
      }
    },
    setValuesFromSA (adicional) {
      //- console.log('valor: ', this.arrayCoverageAdicional)
      //- console.log('valor: ', adicional)
      try {
        let valorFinal1 = {}
        valorFinal1 = this.arrayCoverageAdicional[(adicional.codCobertura)].filter( x => (x.sumaAsegurada == adicional.sumaAsegurada))
                                                                .filter( x => (x.porcentajeDevolucion == this.form.porcentaje))
        this.setValueAdicional(adicional.codCobertura, valorFinal1[0].sumaAsegurada, valorFinal1[0].montoDevolucion, valorFinal1[0].primaRecurrente)
        //- return Object.keys(valorFinal1).length
      } catch (err) {
        this.textToLoad = 'Oops...Seguiremos mejorando, para darte las mejores opciones'
        //- console.log('error', err)
        
        this.setValueAdicional(adicional.codCobertura, 0,0,0)
        //- return false
      }
    },
    setValueAdicional (codCobertura, sumaAsegurada, montoDevolucion, primaRecurrente) {
      let form = {}
      form.codCobertura = codCobertura
      form.sumaAsegurada = sumaAsegurada
      form.montoDevolucion = montoDevolucion
      form.primaRecurrente = primaRecurrente
      form.periodoPago = form.periodoVigencia = this.form.periodoPago
      //- console.log('percent: ',  this.form.porcentaje)
      this.$emit('setMainValue', form)
    },
    activeInvalidezTotal (event, codCobertura) {
      this.invalidezTotal = event
      if (this.$store.state.common.channel !== 'ENDOSOS') { document.getElementById("switcher_invalidez-accident").checked = this.invalidezAccidental = false; }
      if (event) { 
        this.$nuxt.$emit('set-value-to-adicional', { codCobertura: codCobertura }) 
        if (this.$store.state.common.channel !== 'ENDOSOS') { this.$nuxt.$emit('bv::show::modal', 'invalidez-total') }
      }
      else { this.setValueAdicional('', 0,0,0) }
    },
    activeInvalidezAccidental (event, codCobertura) {
      this.invalidezAccidental = event
      document.getElementById("switcher_invalidez-total").checked = this.invalidezTotal = false;
      if (event) { 
        this.$nuxt.$emit('set-value-to-adicional', { codCobertura: codCobertura }) 
        this.$nuxt.$emit('bv::show::modal', 'invalidez-accidental')
      }
      else { this.setValueAdicional('', 0,0,0) }
    }
  },
  destroyed () {
  },
  components: {
  }
}
</script>
<style lang="scss" >
  .coverage-adicional .no-selected {
    border: 1px solid #0855c4;
    color: #0855c4;
    font-family: 'Omnes Medium';
    border-radius: 7px;
    text-align: center;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .coverage-adicional .selected {
    border: 1px solid #0855c4;
    background: #0855c4;
    color: #fff!important;
    font-family: 'Omnes Medium';
    border-radius: 7px;
    text-align: center;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .switcher-box {
    font-family: "Omnes Medium";
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    span.switcher {
      position: relative;
      width: 56px;
      height: 28px;
      border-radius: 60px !important;
      margin-top: 7px;
      margin-right: 21px;
      input {
        font-family: "Omnes Medium";
        appearance: none;
        position: relative;
        width: 109px;
        height: 28px;
        margin-left: 0;
        border-radius:60px;
        outline:none;
         &:before, &:after {
            z-index:2;
            position: absolute;
            top:50%;
            transform:translateY(-50%);
            color:#717285;
         }
         &:before {
            content: 'SI';
            left: 20px;
            font-family: "Omnes Medium";
         }
         &:after {
            content: 'NO';
            right: 17px;
            font-family: "Omnes Medium";
         }
      }
      label {
         z-index:1;
         position: absolute;
         top:10px;
         bottom:10px;
         border-radius:20px;
      }
      &.switcher-1 {
        border: 1px solid #D8D8E5;
        input {
          transition:.25s -.1s;
          &:not(:checked) {
            background-color: #F2F2F4!important; //gris
            border-radius: 60px!important;
            &:before {
              color: #fff;
              transition: color .5s .2s;
            }
            &:after {
              color:#717285; //
              transition: color .5s;
            }
            &+label {
              top: 2px;
              bottom: 2px;
              left: 5px;
              right: 27px;
              height: 22px;
              background: #D8D8E5;
              transition: left .5s, right .4s .2s;
            }
          }
          &:checked {
            background: #F2F2F4!important;
            transition: background .5s -.1s;
            border-radius: 50%!important;
            &:before {
              color: #717285;
              transition: color .5s;
            }
            &:after {
              color: #fff;
              transition: color .5s .2s;
            }
            &+label {
              left: 27px;
              right: 5px;
              height: 22px;
              top: 2px;
              color: #6adb0a;
              background:#6adb0a;
              transition: left .4s .2s, right .5s, background .35s -.1s;
            }
          }
        }
      }
   }
  }
  
</style>
