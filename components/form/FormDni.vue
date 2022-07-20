<template lang="pug">
  #form-dni
    b-row.justify-content-center
      b-col(cols="12")
        div.text-center
          //- Number of document
          b-form-input#numeroDocumento.text-center(:class="[mostrarDNI ? '' : 'events_none']" autocomplete="off" @keyup.enter="makeQuote" ref="numeroDocumento" type='tel' aria-label="Número de documento" placeholder="Ingresa tu DNI/CE" :maxLength="11" :state="$v.client.numeroDocumento.$dirty ? !$v.client.numeroDocumento.$error : null" aria-describedby="numeroDocumentoFeedback" v-model="client.numeroDocumento")
          b-form-invalid-feedback#numeroDocumentoFeedback(v-if="!$v.client.numeroDocumento.lengthDni")
            | N° documento inválido
    b-row.justify-content-center.mt-2.mt-lg-3
      b-col.text-center(cols="12")
        b-button.omnes-medium.d-lg-none(type="submit" variant="dark" @click="makeQuote") CONTINUAR
        b-button.omnes-medium.d-none.d-lg-block(type="submit" variant="dark" @click="makeQuote") COTIZAR
    //- b-row.mt-2.mb-2.mt-lg-3
    //-   b-col.text-center.px-0(cols="12")
    //-     span.d-inline Al continuar acepto las&nbsp;
    //-       span.d-inline.omnes-medium(style="cursor:pointer;text-decoration: underline;" v-b-modal.show-conditions) Condiciones de Uso y Política de Privacidad
    //- b-modal#show-conditions(static size="lg" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
    //-   condiciones-uso
    b-modal#cliente-seguro-vida(static size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div.text-right
        img.image-9(@click="hideModal('cliente-seguro-vida')" src='@/static/media/common/close-modal.svg', width='35', alt='icon close' style="cursor: pointer;top:0;")
      b-container.mb-4
        b-row.justify-content-center
          b-col.text-center
            img.text-center(src="@/static/media/seguro_vida/home/cliente_seguro_vida.svg" alt="Ya cuentas un seguro de vida con devolución")
          b-col.text-center.mt-2(cols="12")
            h3.omnes-medium ¡Ya cuentas con un seguro de <br>vida con devolución!
          b-col.text-center.mb-2(cols="12")
            p Para más información sobre seguro puedes <br>ingresar a la zona segura de clientes.
          b-col.text-center.mt-3(cols="8" xl="6")
            a(href='https://www.interseguro.pe/zonaprivada/')
              b-button.w-100(variant="dark") Ingresar a Zona Segura
    b-modal#seleccionar-pais(static size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div(style="position:relative;")
        img.image-9(@click="hideModal('seleccionar-pais')" src='https://uploads-ssl.webflow.com/5b29b333e01a7071fadb2f1c/5b5f46206abb673bc5374fdb_icon-close.svg', width='40', alt="icon close" style="cursor: pointer;")
      b-container.mt-5
        b-row
          b-col.text-center(cols="12")
            img(v-lazy-load data-src="@/static/media/seguro_vida/home/pais_origen.svg" alt="pais origen" style="position: relative")
        b-row
          b-col.text-center(cols="12")
            h3.omnes-medium Para continuar, selecciona de <br class="d-xl-none">tu país de origen
          b-col.text-center.mt-2(cols="12")
            b-form-select.w-75.text-center.py-0.mx-0#extranjero(:options="paises" aria-label="Seleccionar un país" value-field="trid" text-field="trdisplay" v-model="selected" :state="$v.selected.$dirty ? !$v.selected.$error : null" aria-describedby="extranjeroFeedback")
            //- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
            //- b-form-invalid-feedback(id="extranjeroFeedback" v-if="!$v.selected.required && $v.selected.$error")
            //-   | Este campo es requerido
          b-col.text-center.mt-4.mb-2(cols="12")
            b-button.w-50(variant="dark" @click="validateCountry(selected)") Continuar
    b-modal#asesorar(static size="md" ok-variant="dark" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop header-class="omnes-semibold" header-text-variant="secondary")
      div(style="position:relative;")
        img.image-9(@click="hideModal('asesorar')" src='https://uploads-ssl.webflow.com/5b29b333e01a7071fadb2f1c/5b5f46206abb673bc5374fdb_icon-close.svg', width='40', alt="icon close" style="cursor: pointer;")
      b-container.mt-5
        b-row
          b-col.text-center(cols="12")
            img(v-lazy-load data-src="@/static/media/seguro_vida/home/comunicate.svg" alt="comunicate con nosotros" style="position: relative")
        b-row.mt-2
          b-col.text-center(cols="12")
            h3 Para continuar con la compra de tu <br class="d-xl-none"> seguro de Vida <br class="d-none d-xl-block">con Devolución <br class="d-xl-none">comunícate al <span class="omnes-medium">(01) 50 0000</span> para <br class="d-none d-xl-block">que <br class="d-xl-none">podamos asesorarte.
          b-col.text-center.mt-4.mb-4.mb-xl-2(cols="12")
            b-button.w-50(variant="dark" @click="hideModal('asesorar')") Entendido
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'

import CondicionesUso from '@/components/modals/CondicionesUsoPoliticaPrivacidad'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      selected: null,
      setCot: 0,
      mostrarDNI: false,
      dataR: {},
      tracking: {
        channel: this.$store.state.common.channel,
        trackingId : '',
        screen: 'datos_cliente',
        document: '',
        name: '',
        dob: '',
        email: '',
        phone: ''
      },
      timeout: null,
      client: {
        numeroDocumento: '',
        typeofDocument: ''
      },
      mayorEdad: 18,
      maxEdad: 60,
      fechaPasar: '1920-01-01',
      window: {
        width: 0
      },
      textDropdown: 'DNI',
      maxLengthDoc: 11,
      options: [
        {
          value: 1,
          text: 'DNI',
          max: 8,
          writable: true
        },
        {
          value: 2,
          text: 'C.E.',
          max: 9,
          writable: true
        },
        {
          value: 4,
          text: 'PAS',
          max: 11,
          writable: true
        }
      ],
      paises: [
        {
            "tr_val": null,
            "simbolo": "Nacionalidad",
            "trid": null,
            "trdisplay": "Selecciona un país",
            "disabled": true
        },
        {
            "tr_val": "1",
            "simbolo": "Nacionalidad",
            "trid": "2956387",
            "trdisplay": "Afgano"
        },
        {
            "tr_val": "114",
            "simbolo": "Nacionalidad",
            "trid": "3172912",
            "trdisplay": "Albanés"
        },
        {
            "tr_val": "2",
            "simbolo": "Nacionalidad",
            "trid": "2956388",
            "trdisplay": "Alemán"
        },
        {
            "tr_val": "96",
            "simbolo": "Nacionalidad",
            "trid": "3172894",
            "trdisplay": "Andorrana"
        },
        {
            "tr_val": "73",
            "simbolo": "Nacionalidad",
            "trid": "3172871",
            "trdisplay": "Anguilense"
        },
        {
            "tr_val": "74",
            "simbolo": "Nacionalidad",
            "trid": "3172872",
            "trdisplay": "Antiguana"
        },
        {
            "tr_val": "3",
            "simbolo": "Nacionalidad",
            "trid": "2956457",
            "trdisplay": "Árabe"
        },
        {
            "tr_val": "4",
            "simbolo": "Nacionalidad",
            "trid": "2956389",
            "trdisplay": "Argentino"
        },
        {
            "tr_val": "75",
            "simbolo": "Nacionalidad",
            "trid": "3172873",
            "trdisplay": "Arubana"
        },
        {
            "tr_val": "5",
            "simbolo": "Nacionalidad",
            "trid": "2956390",
            "trdisplay": "Australiano"
        },
        {
            "tr_val": "94",
            "simbolo": "Nacionalidad",
            "trid": "3172892",
            "trdisplay": "Bahameña"
        },
        {
            "tr_val": "77",
            "simbolo": "Nacionalidad",
            "trid": "3172875",
            "trdisplay": "Barbadense"
        },
        {
            "tr_val": "6",
            "simbolo": "Nacionalidad",
            "trid": "2956391",
            "trdisplay": "Belga"
        },
        {
            "tr_val": "78",
            "simbolo": "Nacionalidad",
            "trid": "3172876",
            "trdisplay": "Beliceña"
        },
        {
            "tr_val": "79",
            "simbolo": "Nacionalidad",
            "trid": "3172877",
            "trdisplay": "Bermudeña"
        },
        {
            "tr_val": "115",
            "simbolo": "Nacionalidad",
            "trid": "3172913",
            "trdisplay": "Bielorrusa"
        },
        {
            "tr_val": "7",
            "simbolo": "Nacionalidad",
            "trid": "2956392",
            "trdisplay": "Boliviano"
        },
        {
            "tr_val": "8",
            "simbolo": "Nacionalidad",
            "trid": "2956393",
            "trdisplay": "Brasilero"
        },
        {
            "tr_val": "116",
            "simbolo": "Nacionalidad",
            "trid": "3172914",
            "trdisplay": "Burundesa"
        },
        {
            "tr_val": "87",
            "simbolo": "Nacionalidad",
            "trid": "3172885",
            "trdisplay": "Caimanesa"
        },
        {
            "tr_val": "9",
            "simbolo": "Nacionalidad",
            "trid": "2956394",
            "trdisplay": "Camboyano"
        },
        {
            "tr_val": "10",
            "simbolo": "Nacionalidad",
            "trid": "2956395",
            "trdisplay": "Canadiense"
        },
        {
            "tr_val": "117",
            "simbolo": "Nacionalidad",
            "trid": "3172915",
            "trdisplay": "Centroafricana"
        },
        {
            "tr_val": "11",
            "simbolo": "Nacionalidad",
            "trid": "2956396",
            "trdisplay": "Chileno"
        },
        {
            "tr_val": "12",
            "simbolo": "Nacionalidad",
            "trid": "2956397",
            "trdisplay": "Chino"
        },
        {
            "tr_val": "102",
            "simbolo": "Nacionalidad",
            "trid": "3172900",
            "trdisplay": "Chipriota"
        },
        {
            "tr_val": "13",
            "simbolo": "Nacionalidad",
            "trid": "2956398",
            "trdisplay": "Colombiano"
        },
        {
            "tr_val": "119",
            "simbolo": "Nacionalidad",
            "trid": "3172917",
            "trdisplay": "Congoleña"
        },
        {
            "tr_val": "88",
            "simbolo": "Nacionalidad",
            "trid": "3172886",
            "trdisplay": "Cookiana"
        },
        {
            "tr_val": "125",
            "simbolo": "Nacionalidad",
            "trid": "3172923",
            "trdisplay": "Coreana"
        },
        {
            "tr_val": "14",
            "simbolo": "Nacionalidad",
            "trid": "2956399",
            "trdisplay": "Coreano"
        },
        {
            "tr_val": "15",
            "simbolo": "Nacionalidad",
            "trid": "2956400",
            "trdisplay": "Costarricense"
        },
        {
            "tr_val": "118",
            "simbolo": "Nacionalidad",
            "trid": "3172916",
            "trdisplay": "Cubana"
        },
        {
            "tr_val": "16",
            "simbolo": "Nacionalidad",
            "trid": "2956401",
            "trdisplay": "Cubano"
        },
        {
            "tr_val": "80",
            "simbolo": "Nacionalidad",
            "trid": "3172878",
            "trdisplay": "Curazoleña"
        },
        {
            "tr_val": "17",
            "simbolo": "Nacionalidad",
            "trid": "2956402",
            "trdisplay": "Danés"
        },
        {
            "tr_val": "59",
            "simbolo": "Nacionalidad",
            "trid": "2956403",
            "trdisplay": "Dominicano"
        },
        {
            "tr_val": "93",
            "simbolo": "Nacionalidad",
            "trid": "3172891",
            "trdisplay": "Dominiquesa"
        },
        {
            "tr_val": "18",
            "simbolo": "Nacionalidad",
            "trid": "2956404",
            "trdisplay": "Ecuatoriano"
        },
        {
            "tr_val": "19",
            "simbolo": "Nacionalidad",
            "trid": "2956405",
            "trdisplay": "Egipcio"
        },
        {
            "tr_val": "21",
            "simbolo": "Nacionalidad",
            "trid": "2956406",
            "trdisplay": "Español"
        },
        {
            "tr_val": "22",
            "simbolo": "Nacionalidad",
            "trid": "2956407",
            "trdisplay": "Estadounidense"
        },
        {
            "tr_val": "23",
            "simbolo": "Nacionalidad",
            "trid": "2956408",
            "trdisplay": "Estonio"
        },
        {
            "tr_val": "24",
            "simbolo": "Nacionalidad",
            "trid": "2956409",
            "trdisplay": "Etiope"
        },
        {
            "tr_val": "25",
            "simbolo": "Nacionalidad",
            "trid": "2956410",
            "trdisplay": "Filipino"
        },
        {
            "tr_val": "26",
            "simbolo": "Nacionalidad",
            "trid": "2956411",
            "trdisplay": "Finlandés"
        },
        {
            "tr_val": "27",
            "simbolo": "Nacionalidad",
            "trid": "2956412",
            "trdisplay": "Francés"
        },
        {
            "tr_val": "28",
            "simbolo": "Nacionalidad",
            "trid": "2956413",
            "trdisplay": "Galés"
        },
        {
            "tr_val": "83",
            "simbolo": "Nacionalidad",
            "trid": "3172881",
            "trdisplay": "Gibraltareña"
        },
        {
            "tr_val": "84",
            "simbolo": "Nacionalidad",
            "trid": "3172882",
            "trdisplay": "Granadina"
        },
        {
            "tr_val": "29",
            "simbolo": "Nacionalidad",
            "trid": "2956414",
            "trdisplay": "Griego"
        },
        {
            "tr_val": "85",
            "simbolo": "Nacionalidad",
            "trid": "3172883",
            "trdisplay": "Guameña"
        },
        {
            "tr_val": "30",
            "simbolo": "Nacionalidad",
            "trid": "2956415",
            "trdisplay": "Guatemalteco"
        },
        {
            "tr_val": "134",
            "simbolo": "Nacionalidad",
            "trid": "3172932",
            "trdisplay": "Guermesiana"
        },
        {
            "tr_val": "31",
            "simbolo": "Nacionalidad",
            "trid": "2956416",
            "trdisplay": "Haitiano"
        },
        {
            "tr_val": "33",
            "simbolo": "Nacionalidad",
            "trid": "2956417",
            "trdisplay": "Holandés"
        },
        {
            "tr_val": "34",
            "simbolo": "Nacionalidad",
            "trid": "2956418",
            "trdisplay": "Hondureño"
        },
        {
            "tr_val": "99",
            "simbolo": "Nacionalidad",
            "trid": "3172897",
            "trdisplay": "Hongkonesa"
        },
        {
            "tr_val": "32",
            "simbolo": "Nacionalidad",
            "trid": "2956419",
            "trdisplay": "Hungaro"
        },
        {
            "tr_val": "35",
            "simbolo": "Nacionalidad",
            "trid": "2956420",
            "trdisplay": "Indonés"
        },
        {
            "tr_val": "36",
            "simbolo": "Nacionalidad",
            "trid": "2956421",
            "trdisplay": "Inglés"
        },
        {
            "tr_val": "38",
            "simbolo": "Nacionalidad",
            "trid": "2956422",
            "trdisplay": "Iraní"
        },
        {
            "tr_val": "37",
            "simbolo": "Nacionalidad",
            "trid": "2956423",
            "trdisplay": "Iraquí"
        },
        {
            "tr_val": "39",
            "simbolo": "Nacionalidad",
            "trid": "2956424",
            "trdisplay": "Irlandés"
        },
        {
            "tr_val": "40",
            "simbolo": "Nacionalidad",
            "trid": "2956425",
            "trdisplay": "Israelí"
        },
        {
            "tr_val": "41",
            "simbolo": "Nacionalidad",
            "trid": "2956426",
            "trdisplay": "Italiano"
        },
        {
            "tr_val": "42",
            "simbolo": "Nacionalidad",
            "trid": "2956427",
            "trdisplay": "Japonés"
        },
        {
            "tr_val": "43",
            "simbolo": "Nacionalidad",
            "trid": "2956428",
            "trdisplay": "Jordano"
        },
        {
            "tr_val": "44",
            "simbolo": "Nacionalidad",
            "trid": "2956429",
            "trdisplay": "Laosiano"
        },
        {
            "tr_val": "92",
            "simbolo": "Nacionalidad",
            "trid": "3172890",
            "trdisplay": "Lapon"
        },
        {
            "tr_val": "45",
            "simbolo": "Nacionalidad",
            "trid": "2956431",
            "trdisplay": "Letón"
        },
        {
            "tr_val": "46",
            "simbolo": "Nacionalidad",
            "trid": "2956430",
            "trdisplay": "Letonés"
        },
        {
            "tr_val": "122",
            "simbolo": "Nacionalidad",
            "trid": "3172920",
            "trdisplay": "Libanesa"
        },
        {
            "tr_val": "104",
            "simbolo": "Nacionalidad",
            "trid": "3172902",
            "trdisplay": "Liberiana"
        },
        {
            "tr_val": "123",
            "simbolo": "Nacionalidad",
            "trid": "3172921",
            "trdisplay": "Libia"
        },
        {
            "tr_val": "97",
            "simbolo": "Nacionalidad",
            "trid": "3172895",
            "trdisplay": "Liechtensteiniana"
        },
        {
            "tr_val": "47",
            "simbolo": "Nacionalidad",
            "trid": "2956432",
            "trdisplay": "Malayo"
        },
        {
            "tr_val": "105",
            "simbolo": "Nacionalidad",
            "trid": "3172903",
            "trdisplay": "Maldiva"
        },
        {
            "tr_val": "86",
            "simbolo": "Nacionalidad",
            "trid": "3172884",
            "trdisplay": "Manesa"
        },
        {
            "tr_val": "48",
            "simbolo": "Nacionalidad",
            "trid": "2956433",
            "trdisplay": "Marroquí"
        },
        {
            "tr_val": "103",
            "simbolo": "Nacionalidad",
            "trid": "3172901",
            "trdisplay": "Marshalesa"
        },
        {
            "tr_val": "49",
            "simbolo": "Nacionalidad",
            "trid": "2956434",
            "trdisplay": "Mexicano"
        },
        {
            "tr_val": "98",
            "simbolo": "Nacionalidad",
            "trid": "3172896",
            "trdisplay": "Monegasca"
        },
        {
            "tr_val": "89",
            "simbolo": "Nacionalidad",
            "trid": "3172887",
            "trdisplay": "Montserratense"
        },
        {
            "tr_val": "106",
            "simbolo": "Nacionalidad",
            "trid": "3172904",
            "trdisplay": "Nauruano"
        },
        {
            "tr_val": "52",
            "simbolo": "Nacionalidad",
            "trid": "2956435",
            "trdisplay": "Neocelandés"
        },
        {
            "tr_val": "50",
            "simbolo": "Nacionalidad",
            "trid": "2956436",
            "trdisplay": "Nicaragüense"
        },
        {
            "tr_val": "95",
            "simbolo": "Nacionalidad",
            "trid": "3172893",
            "trdisplay": "Ninhuana"
        },
        {
            "tr_val": "71",
            "simbolo": "Nacionalidad",
            "trid": "2956437",
            "trdisplay": "No identificada"
        },
        {
            "tr_val": "51",
            "simbolo": "Nacionalidad",
            "trid": "2956438",
            "trdisplay": "Noruego"
        },
        {
            "tr_val": "53",
            "simbolo": "Nacionalidad",
            "trid": "2956439",
            "trdisplay": "Panameño"
        },
        {
            "tr_val": "54",
            "simbolo": "Nacionalidad",
            "trid": "2956440",
            "trdisplay": "Paraguayo"
        },
        {
            "tr_val": "55",
            "simbolo": "Nacionalidad",
            "trid": "2956441",
            "trdisplay": "Peruano"
        },
        {
            "tr_val": "56",
            "simbolo": "Nacionalidad",
            "trid": "2956442",
            "trdisplay": "Polaco"
        },
        {
            "tr_val": "57",
            "simbolo": "Nacionalidad",
            "trid": "2956443",
            "trdisplay": "Portugués"
        },
        {
            "tr_val": "58",
            "simbolo": "Nacionalidad",
            "trid": "2956444",
            "trdisplay": "Puertorriqueño"
        },
        {
            "tr_val": "60",
            "simbolo": "Nacionalidad",
            "trid": "2956445",
            "trdisplay": "Rumano"
        },
        {
            "tr_val": "130",
            "simbolo": "Nacionalidad",
            "trid": "3172928",
            "trdisplay": "Rusa"
        },
        {
            "tr_val": "61",
            "simbolo": "Nacionalidad",
            "trid": "2956446",
            "trdisplay": "Ruso"
        },
        {
            "tr_val": "20",
            "simbolo": "Nacionalidad",
            "trid": "2956447",
            "trdisplay": "Salvadoreño"
        },
        {
            "tr_val": "81",
            "simbolo": "Nacionalidad",
            "trid": "3172879",
            "trdisplay": "Samboana"
        },
        {
            "tr_val": "112",
            "simbolo": "Nacionalidad",
            "trid": "3172910",
            "trdisplay": "Samoana Estadounidense"
        },
        {
            "tr_val": "82",
            "simbolo": "Nacionalidad",
            "trid": "3172880",
            "trdisplay": "Sancristobaleña"
        },
        {
            "tr_val": "110",
            "simbolo": "Nacionalidad",
            "trid": "3172908",
            "trdisplay": "Sanmartinensa"
        },
        {
            "tr_val": "113",
            "simbolo": "Nacionalidad",
            "trid": "3172911",
            "trdisplay": "Santalucense"
        },
        {
            "tr_val": "111",
            "simbolo": "Nacionalidad",
            "trid": "3172909",
            "trdisplay": "Sanvicentino"
        },
        {
            "tr_val": "72",
            "simbolo": "Nacionalidad",
            "trid": "2956458",
            "trdisplay": "Serbia"
        },
        {
            "tr_val": "107",
            "simbolo": "Nacionalidad",
            "trid": "3172905",
            "trdisplay": "Seychellense"
        },
        {
            "tr_val": "129",
            "simbolo": "Nacionalidad",
            "trid": "3172927",
            "trdisplay": "Siria"
        },
        {
            "tr_val": "126",
            "simbolo": "Nacionalidad",
            "trid": "3172924",
            "trdisplay": "Somali"
        },
        {
            "tr_val": "127",
            "simbolo": "Nacionalidad",
            "trid": "3172925",
            "trdisplay": "Sudanes"
        },
        {
            "tr_val": "62",
            "simbolo": "Nacionalidad",
            "trid": "2956448",
            "trdisplay": "Sueco"
        },
        {
            "tr_val": "63",
            "simbolo": "Nacionalidad",
            "trid": "2956449",
            "trdisplay": "Suizo"
        },
        {
            "tr_val": "128",
            "simbolo": "Nacionalidad",
            "trid": "3172926",
            "trdisplay": "Sursudanes"
        },
        {
            "tr_val": "64",
            "simbolo": "Nacionalidad",
            "trid": "2956450",
            "trdisplay": "Tailandés"
        },
        {
            "tr_val": "65",
            "simbolo": "Nacionalidad",
            "trid": "2956451",
            "trdisplay": "Taiwanes"
        },
        {
            "tr_val": "101",
            "simbolo": "Nacionalidad",
            "trid": "3172899",
            "trdisplay": "Tongana"
        },
        {
            "tr_val": "108",
            "simbolo": "Nacionalidad",
            "trid": "3172906",
            "trdisplay": "Trinitense"
        },
        {
            "tr_val": "66",
            "simbolo": "Nacionalidad",
            "trid": "2956452",
            "trdisplay": "Turco"
        },
        {
            "tr_val": "90",
            "simbolo": "Nacionalidad",
            "trid": "3172888",
            "trdisplay": "Turcocaiqueño"
        },
        {
            "tr_val": "131",
            "simbolo": "Nacionalidad",
            "trid": "3172929",
            "trdisplay": "Ucraniana"
        },
        {
            "tr_val": "67",
            "simbolo": "Nacionalidad",
            "trid": "2956453",
            "trdisplay": "Ucraniano"
        },
        {
            "tr_val": "68",
            "simbolo": "Nacionalidad",
            "trid": "2956454",
            "trdisplay": "Uruguayo"
        },
        {
            "tr_val": "109",
            "simbolo": "Nacionalidad",
            "trid": "3172907",
            "trdisplay": "Vanuatuense"
        },
        {
            "tr_val": "69",
            "simbolo": "Nacionalidad",
            "trid": "2956455",
            "trdisplay": "Venezolano"
        },
        {
            "tr_val": "70",
            "simbolo": "Nacionalidad",
            "trid": "2956456",
            "trdisplay": "Vietnamita"
        },
        {
            "tr_val": "91",
            "simbolo": "Nacionalidad",
            "trid": "3172889",
            "trdisplay": "Virgenense Britanica"
        },
        {
            "tr_val": "132",
            "simbolo": "Nacionalidad",
            "trid": "3172930",
            "trdisplay": "Yemenita"
        },
        {
            "tr_val": "133",
            "simbolo": "Nacionalidad",
            "trid": "3172931",
            "trdisplay": "Zimbabuense"
        }
      ]
    }
  },
  watch: {
    'client.numeroDocumento': function (val) {
      let self = this
      if (val.length == 8 || val.length == 9 || val.length == 11) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          if (self.setCot) { // ingresando por remarketing
            self.$store.commit('common/setShowModalOnce', 0)
            self.verifyDataClient(self.dataR)
          } else {
            if (Object.keys(self.dataR).length) {
              if (self.dataR.detalle.datosProducto.datosTitular.email) { self.verifyDataClient(self.dataR) }
            } else {
              self.verifyDataClient()
            }
          }
        }, 1300);
      }
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    selected: {
      required
    },
    client: {
      typeofDoc: {
        required
      },
      numeroDocumento: {
        required,
        lengthDni: dni => {
          let pattern = /^[0-9]{8,11}$/
          return pattern.test(dni)
        }
      }
    }
  },
  created () {
    this.$store.commit('common/setTrackingId', null)
  },
  mounted () {
    this.$store.commit('common/setIdentificador', null)
    this.$store.commit('common/setPantalla', null)
    window.dataLayer = window.dataLayer || []
    
    this.$store.commit('common/setTrackingId', uuidv4())
    this.textDropdown = 'DNI'
    this.$nuxt.$on('hide-modal-conditions-use-pp', () => {
      this.$nuxt.$emit('bv::hide::modal', 'show-conditions')
    })
    this.$nuxt.$on('focus-numeroDocumento', () => {
      if(this.$refs.numeroDocumento) {
        this.$refs.numeroDocumento.focus()
      }
    })
    this.$amplitude.getInstance().setUserId(null);
    
    // Obteniendo el id
    // console.log('form dni PARAMETRO', this.$route.params.parametro)
    if (this.$route.params.parametro) {
      this.$nuxt.$emit('show-loader', {
        text: 'Estamos obteniendo tus datos...'
      })
      if ((this.$route.params.parametro).length == 8 || (this.$route.params.parametro).length == 9 || (this.$route.params.parametro).length == 11) {
        this.$store.dispatch('common/getRemarketing', this.$route.params.parametro).then(dataRemarketing => {
          if (dataRemarketing.codigoRespuesta === '01') {
            this.mostrarDNI = false
            this.client.numeroDocumento = this.$route.params.parametro
            this.dataR = dataRemarketing
            if (dataRemarketing.detalle.datosProducto.sumaAsegurada &&
            dataRemarketing.detalle.datosProducto.periodoVigencia &&
            dataRemarketing.detalle.datosProducto.periodoPago &&
            dataRemarketing.detalle.datosProducto.frecuenciaPago &&
            dataRemarketing.detalle.datosProducto.codMoneda &&
            dataRemarketing.detalle.datosProducto.edadContratacion &&
            dataRemarketing.detalle.datosProducto.porcentaje &&
            dataRemarketing.detalle.datosProducto.primaRecurrente &&
            dataRemarketing.detalle.datosProducto.montoDevolucion &&
            dataRemarketing.detalle.datosProducto.datosTitular.sexo &&
            dataRemarketing.detalle.datosProducto.datosTitular.fechaNacimiento) {
              this.setCot = 1
            } else {
              this.setCot = 0
            }
          } else {
            this.mostrarDNI = true
            this.$nuxt.$emit('hide-loader')
            this.$nuxt.$emit('focus-numeroDocumento')
            Swal.fire(
              'Oops...!',
              'No tenemos información con este DNI',
              'error'
            )
            this.tracking.errorType = 'FRONTEND'
            this.tracking.errorData = 'No tenemos información con este DNI'
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
        }, resp => { // no responde servidor
          this.mostrarDNI = true
          this.$nuxt.$emit('hide-loader')
          this.$nuxt.$emit('focus-numeroDocumento')
        })
      } else {
        this.mostrarDNI = true
        this.$nuxt.$emit('hide-loader')
        this.$nuxt.$emit('focus-numeroDocumento')
      }
    } else {
      this.mostrarDNI = true
      this.$store.commit('common/setCodeRemarketing', '')
      this.$nuxt.$emit('focus-numeroDocumento')
    }
  },
  methods: {
    hideModal (id) {
      this.$nuxt.$emit('bv::hide::modal', id)
      this.$nuxt.$emit('hide-loader')
      this.selected = null
    },
    makeQuote () {
      clearTimeout(this.timeout)
      this.verifyDataClient()
    },
    setTypeDocument (option) {
      this.textDropdown = option.text
      this.client.typeofDoc = option.value
      this.maxLengthDoc = option.max
    },
    showDataPassenger (dni) {
      if ((this.textDropdown === 'DNI' && dni.length === 8) || (this.textDropdown === 'C.E.' && dni.length === 9) || (this.textDropdown === 'PAS' && dni.length === 12)) {
        this.$v.client.numeroDocumento.$touch()
      }
    },
    validaClient () {
      this.$store.dispatch('common/validateClient', this.client.numeroDocumento).then(res => {
        if (res.data) {
          
          // this.$store.commit('common/setTrackingId', uuidv4())
          this.verifyGoQuote(this.client.numeroDocumento.length)
        } else {
          Swal.fire(
            '',
            '¡Hola! En estos momentos no contamos con una plan que se adecúe a tus necesidades. Para mayor información puedes comunicarte al (01) 500-0000',
            'info'
          )
          this.$nuxt.$emit('hide-loader')
        }
      })
    },
    setRemarketingOrResponse (remarketing, dataResponse) {
      let self = this
      if (!remarketing.nombre || !remarketing.apellidoPaterno || 
      !remarketing.apellidoMaterno ||
      !remarketing.fechaNacimiento || 
      !remarketing.numeroTelefono || 
      !remarketing.sexo || 
      !remarketing.email) {
        this.$store.commit('common/setSaveClient', {
          numeroDocumento: remarketing.numeroDocumento || '',
          nombre: remarketing.nombre || '',
          apellidoPaterno: remarketing.apellidoPaterno || '',
          apellidoMaterno: remarketing.apellidoMaterno || '',
          fechaNacimiento: remarketing.fechaNacimiento || '',
          sexo: remarketing.sexo || '',
          numeroTelefono: remarketing.numeroTelefono || '',
          email: remarketing.email || '',
          numeroDocumento: remarketing.numeroDocumento || ''
        })
      } else {
        this.$store.commit('common/setSaveClient', {
          numeroDocumento: dataResponse.numeroDocumento || '',
          nombre: dataResponse.nombre,
          apellidoPaterno: dataResponse.apellidoPaterno,
          apellidoMaterno: dataResponse.apellidoMaterno,
          fechaNacimiento: dataResponse.fechaNacimiento,
          sexo: dataResponse.sexo,
          numeroTelefono: dataResponse.numeroTelefono,
          email: dataResponse.email,
          numeroDocumento: self.client.numeroDocumento
        })
      }
    },
    validarCumulo (booleanCumulo, nacimiento) {
      if (booleanCumulo) {
        window.dataLayer.push({
          'event': 'VC PP correcto',
          'category': 'UI :: Home',
          'action': 'Acceder',
          'label': 'Acceso correcto'
        })
        
        if (!nacimiento) {
          // this.$store.commit('common/setTrackingId', uuidv4())
          this.tracking.trackingId = this.$store.state.common.trackingId
        }
        this.verifyGoQuote(this.client.numeroDocumento.length)
      } else {
        Swal.fire(
          '',
          '¡Hola! En estos momentos no contamos con una plan que se adecúe a tus necesidades. Para mayor información puedes comunicarte al (01) 500-0000',
          'info'
        )
        this.$nuxt.$emit('hide-loader')
      }
    },
    verifyGoQuote (dniLength) {
      if (dniLength === 8) {
        this.goQuote()
      } else {
        this.$nuxt.$emit('hide-loader')
        this.$nuxt.$emit('bv::show::modal', 'seleccionar-pais')
      }
    },
    goQuote () {
      window.dataLayer.push({
        'event': 'virtualPageView',
        'pageTitle': 'Verificacion | ' + process.env.channel[this.$store.state.common.channel].PAGE_TITLE,
        'pageUrl': process.env.channel[this.$store.state.common.channel].URL_BASE + 'paso/verificacion/'
      })
      //console.log('GOQUOUTE: ', this.$store.state.common.channel)
      //console.log('INVERSA: ', this.$store.state.common.inversa)
      let goPath = (this.$store.state.common.subchannel === 'ENDOSOS') ? '/endosos/paso/cotiza' : (this.$store.state.common.subchannel === 'ENDOSOS_MULTIBANCOS') ? '/endoso-con-devolucion/paso/cotiza' : (this.$store.state.common.channel === 'IBK') ? '/interbank/paso/cotiza' : '/paso/cotiza'
      goPath = (this.$store.state.common.channel === 'AHORRO_SEGURO' && this.$store.state.common.inversa === true) ? '/paso/cotiza/inversa' : goPath
      // console.log(goPath)
      this.$nuxt.$router.push({ path: goPath })
    },
    validateCountry (country) {
      this.$v.selected.$touch(false)
      if (country) {
        if (country ===  '2956407') { // estados unidos
          this.$nuxt.$emit('bv::hide::modal', 'seleccionar-pais')
          this.selected = null
          this.$nuxt.$emit('bv::show::modal', 'asesorar')
        } else {
          this.$nuxt.$emit('bv::hide::modal', 'seleccionar-pais')
          this.selected = null
          this.goQuote()
        }
      }
    },
    verifyDataClient (dataRemarketing) {
      this.$store.commit('common/setLeaveMessage', 0)
      this.$store.commit('common/setVerifyDataClient', false)
      let self = this
      
      this.$store.commit('common/setShowModalOnce', 0)
      let hashNumeroTelefono = false
      let hashCorreoElectronico = false
      if (self.client.numeroDocumento.length === 8 || self.client.numeroDocumento.length === 9 || self.client.numeroDocumento.length === 11) {
        this.$nuxt.$emit('show-loader', {
          text: 'Estamos obteniendo tus datos...'
        })
        
        this.$store.dispatch('common/getClients', self.client.numeroDocumento).then(res => {
          if (res.data) {
            let pattern = /^[9]\d{8}/
            res.data.numeroTelefono = (!(pattern.test(res.data.numeroTelefono))) ? '' : res.data.numeroTelefono
            if (res.data.fechaNacimiento) {
              if (res.data.clienteVidaCash) {
                this.$nuxt.$emit('hide-loader')
                // Mostrar modal
                 this.$nuxt.$emit('bv::show::modal', 'cliente-seguro-vida')
              } else {
                let fecha = (res.data.fechaNacimiento).replace(/\s/g, '').split('/').reverse().join('-')
                let edadDeContratacion = (moment().diff(fecha, 'years'))
                let edadPasar = (moment().diff(this.fechaPasar, 'years'))
                if (edadDeContratacion >= this.mayorEdad && ((edadDeContratacion <= this.maxEdad || edadDeContratacion >= edadPasar))) {
                  if (edadDeContratacion >= edadPasar) { res.data.fechaNacimiento = '' }
                  if (res.data.numeroTelefono.length < 9) { res.data.numeroTelefono = '' }
                  if (dataRemarketing !== null && dataRemarketing !== undefined) {
                    hashNumeroTelefono = (dataRemarketing.detalle.datosProducto.datosTitular.numeroTelefono) ? true : false
                    hashCorreoElectronico = (dataRemarketing.detalle.datosProducto.datosTitular.email) ? true : false
                    this.$store.commit('common/setVerifyDataClient', true)
                    let fecha2 = (dataRemarketing.detalle.datosProducto.datosTitular.fechaNacimiento).replace(/\s/g, '').split('/').reverse().join('-')
                    let edadDeContratacion2 = (moment().diff(fecha2, 'years'))
                    let parseSA = (dataRemarketing.detalle.datosProducto.sumaAsegurada).replace(/ /g, '')
                    if (parseSA.split('.').length === 1) {
                      parseSA = parseSA + '.00'
                    }
                    this.$store.commit('common/setCotizacion', {
                      sumaAsegurada: parseSA,
                      periodoVigencia: dataRemarketing.detalle.datosProducto.periodoVigencia,
                      periodoPago: dataRemarketing.detalle.datosProducto.periodoPago,
                      frecuenciaPago: dataRemarketing.detalle.datosProducto.frecuenciaPago,
                      codMoneda: dataRemarketing.detalle.datosProducto.codMoneda,
                      sexo: dataRemarketing.detalle.datosProducto.datosTitular.sexo,
                      fechaNacimiento: dataRemarketing.detalle.datosProducto.datosTitular.fechaNacimiento,
                      edadContratacion: edadDeContratacion2 || '',
                      porcentaje: dataRemarketing.detalle.datosProducto.porcentaje,
                      primaRecurrente: dataRemarketing.detalle.datosProducto.primaRecurrente,
                      montoDevolucion: dataRemarketing.detalle.datosProducto.montoDevolucion
                    })
                    this.setRemarketingOrResponse (dataRemarketing.detalle.datosProducto.datosTitular, res.data)
                  } else {
                    // console.log('NO existe dataRemarketing')
                    hashNumeroTelefono = (res.data.numeroTelefono) ? true : false
                    hashCorreoElectronico = (res.data.email) ? true : false
                    this.$store.commit('common/setCotizacion', { edadContratacion: edadDeContratacion })
                    this.$store.commit('common/setSaveClient', {
                      numeroDocumento: res.data.numeroDocumento,
                      nombre: res.data.nombre,
                      apellidoPaterno: res.data.apellidoPaterno,
                      apellidoMaterno: res.data.apellidoMaterno,
                      fechaNacimiento: res.data.fechaNacimiento,
                      sexo: res.data.sexo,
                      numeroTelefono: res.data.numeroTelefono,
                      email: res.data.email,
                      numeroDocumento: self.client.numeroDocumento
                    })
                    let nombre1 = ""
                    if(res.data.nombre != null && res.data.nombre != undefined){
                      nombre1 = res.data.nombre.indexOf(' ')> -1 ? res.data.nombre.substr(0, res.data.nombre.indexOf(' ')) : res.data.nombre;
                    }
                    this.$amplitude.getInstance().setUserId(res.data.numeroDocumento);
                    var userProperties = {
                        Edad: edadDeContratacion,
                        Genero: (res.data.sexo === 'F' || res.data.sexo == 'femenino') ? 'F' : 'M',
                        Email: res.data.email,
                        Telefono: res.data.numeroTelefono,
                        Nombre: nombre1,
                        Apellido: res.data.apellidoMaterno
                        //"Número de Documento": res.data.numeroDocumento
                    };
                    this.$amplitude.getInstance().setUserProperties(userProperties);
                    this.$amplitude.getInstance().setUserId(self.client.numeroDocumento)
                    this.$amplitude.getInstance().logEvent(
                    'Vida - DNI Ingresado',
                      {
                        'Producto Consultado': 'VIDA',
                        'Sub Producto Consultado': this.$store.state.common.channel,
                        'Etapa de Funnel': this.$route.path,
                        'Número de Documento' : self.client.numeroDocumento,
                      }
                    )
                  }
                  self.tracking.document = res.data.numeroDocumento
                  self.tracking.name = res.data.nombre + ' ' + res.data.apellidoPaterno + ' ' + res.data.apellidoMaterno
                  self.tracking.email = res.data.email
                  self.tracking.dob = res.data.fechaNacimiento
                  self.tracking.phone = res.data.numeroTelefono
                  self.tracking.errorData = ''
                  self.tracking.errorType = ''
                  // Datos completos
                  self.tracking.trackingId = this.$store.state.common.trackingId
                  if (res.data.email && res.data.numeroTelefono) { this.$store.dispatch('common/makeTracking', self.tracking).then(resTracking => {}) }
                  this.quoting = false
                  // VALIDAR CÚMULO
                  this.validarCumulo (res.data.cumuloValido, res.data.fechaNacimiento)
                } else {
                  // CUMULO NOOO ACEPTABLE PARA PASAR
                  Swal.fire(
                    '',
                    '¡Hola! En estos momentos no contamos con una plan que se adecúe a tus necesidades. Para mayor información puedes comunicarte al (01) 500-0000',
                    'info'
                  )
                  this.$nuxt.$emit('hide-loader')
                }
              }
            } else { // sin data
              this.$amplitude.getInstance().logEvent(
              'Vida - DNI Ingresado',
                {
                  'Producto Consultado': 'VIDA',
                  'Sub Producto Consultado': this.$store.state.common.channel,
                  'Etapa de Funnel': this.$route.path,
                  'Número de Documento' : self.client.numeroDocumento,
                }
              )
              this.$store.commit('common/setHashPhone', false)
              this.$store.commit('common/setHashEmail', false)
              if (dataRemarketing !== null && dataRemarketing !== undefined) { this.setRemarketingOrResponse (dataRemarketing.detalle.datosProducto.datosTitular, res.data) }
              else {
                this.$store.commit('common/setSaveClient', {
                  numeroDocumento: '',
                  nombre: '',
                  apellidoPaterno: '',
                  apellidoMaterno: '',
                  fechaNacimiento: '',
                  sexo: '',
                  numeroTelefono: '',
                  email: '',
                  numeroDocumento: ''
                })
              }
              self.tracking.document = res.data.numeroDocumento
              self.tracking.name = res.data.nombre + ' ' + res.data.apellidoPaterno + ' ' + res.data.apellidoMaterno
              self.tracking.email = res.data.email
              self.tracking.errorType = ''
              self.tracking.errorData = ''
              self.tracking.phone = res.data.numeroTelefono
              self.tracking.dob = res.data.fechaNacimiento
              if (res.data.nombre) {
                // Datos semicompletos
                self.tracking.trackingId = self.$store.state.common.trackingId
                this.$store.dispatch('common/makeTracking', self.tracking).then(resTracking => {
                })
              }
              // VALIDAR CÚMULO
              this.validarCumulo (res.data.cumuloValido, res.data.fechaNacimiento)
            }
            
            this.$store.commit('common/setHashPhone', hashNumeroTelefono)
            this.$store.commit('common/setHashEmail', hashCorreoElectronico)
          } else { // Información del cliente vacío
            this.$amplitude.getInstance().logEvent(
            'Vida - DNI Ingresado',
              {
                'Producto Consultado': 'VIDA',
                'Sub Producto Consultado': this.$store.state.common.channel,
                'Etapa de Funnel': this.$route.path,
                'Número de Documento' : self.client.numeroDocumento,
              }
            )
            this.$store.commit('common/setHashPhone', false)
            this.$store.commit('common/setHashEmail', false)
            this.$store.commit('common/setSaveClient', { numeroDocumento: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', fechaNacimiento: '', sexo: '', numeroTelefono: '', email: '', numeroDocumento: self.client.numeroDocumento })
            window.dataLayer.push({
              'event': 'VC PP correcto',
              'category': 'UI :: Home',
              'action': 'Acceder',
              'label': 'Acceso correcto'
            })
            
            // this.$store.commit('common/setTrackingId', uuidv4())
            this.verifyGoQuote(self.client.numeroDocumento.length)
          }
        }, res => { // Información del cliente vacío
          this.$store.commit('common/setHashPhone', false)
          this.$store.commit('common/setHashEmail', false)
          if (res.response && res.response.data.code === '89' && self.$v.client.numeroDocumento.lengthDni) {
            this.$amplitude.getInstance().logEvent(
            'Vida - DNI Ingresado',
              {
                'Producto Consultado': 'VIDA',
                'Sub Producto Consultado': this.$store.state.common.channel,
                'Etapa de Funnel': this.$route.path,
                'Número de Documento' : self.client.numeroDocumento,
              }
            )
            this.$store.commit('common/setSaveClient', { numeroDocumento: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', fechaNacimiento: '', sexo: '', numeroTelefono: '', email: '', numeroDocumento: self.client.numeroDocumento })
            this.validaClient()
          } else if (!self.$v.client.numeroDocumento.lengthDni) {
            window.dataLayer.push({
              'event': 'VC PP dni incorrecto',
              'category': 'UI :: Home',
              'action': 'Error',
              'label': 'DNI incorrecto'
            })
            Swal.fire(
              'Oops...!',
              'Ingrese un número de documento correcto',
              'error'
            )
            this.tracking.errorType = 'FRONTEND'
            this.tracking.errorData = 'No tenemos información con este DNI'
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
            this.$nuxt.$emit('hide-loader')
          } else {
            window.dataLayer.push({
              'event': 'VC PP error servidor',
              'category': 'UI :: Home',
              'action': 'Error',
              'label': 'Error en el servidor al obtener los datos'
            })
            Swal.fire(
              'Oops...!',
              'Estamos teniendo problemas para obtener tus datos',
              'error'
            )
            this.tracking.errorType = 'FRONTEND'
            this.tracking.errorData = 'Estamos teniendo problemas para obtener tus datos'
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
          this.$nuxt.$emit('hide-loader')
        })
      } else { // no length === 8 || 9 || 11
        window.dataLayer.push({
          'event': 'VC PP dni incorrecto',
          'category': 'UI :: Home',
          'action': 'Error',
          'label': 'DNI incorrecto'
        })
        Swal.fire(
          'Oops...!',
          'Ingrese un número de documento correcto',
          'error'
        )
        self.tracking.errorType = 'FRONTEND'
        self.tracking.errorData = 'Ingrese un número de documento correcto'
        this.$store.dispatch('common/makeTracking', self.tracking).then(resTracking => {
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
        // this.$nuxt.$emit('hide-loader')
      }
    }
  },
  destroyed () {
    this.$nuxt.$off('hide-modal-conditions-use-pp')
    this.$nuxt.$off('focus-numeroDocumento')
  },
  components: {
    CondicionesUso
  }
}
</script>
