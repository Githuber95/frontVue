<template lang="pug">
  #preguntas-frecuentes
    section.banner.bg-primary
      b-container.d-xl-none
        b-row
          b-col.text-center
            h1.text-white.omnes-semibold Estamos listos para ayudarte
            p.text-white.mt-1 ¿Tienes duda sobre Seguro de Vida con devolución? Encuentra toda la información aquí.
      b-container.d-none.d-xl-block
        b-row
          b-col
            h1.text-white.omnes-semibold Estamos listos para ayudarte
            h3.text-white.mt-1 ¿Tienes duda sobre Seguro de Vida con devolución? Encuentra toda la información aquí.      
    section.preguntas-genericas
      b-container.mt-2.mt-xl-5.mb-4
        b-row.centrar
          b-col(sm="12" md="4" style="padding-bottom: 30px").ocultar-div
            nuevoTextLinks
          b-col.lineas100(sm="12" md="8")   
            preguntasFrecuentesGenerico(  
              :preguntas="preguntas"
              :itemsMenu="itemsMenu"
              :imagenMenu="imagenMenu"
              :regresarPrincipal="regresarPrincipal"
              :nombrepagina="TextoTab")
  </div>
</template>

<script>
import nuevoTextLinks from "@/components/common/MenuPF";
import { preguntasFrecuentesGenerico } from 'preguntas-frecuentes-viajes'

export default {
  layout: "interseguro",
   data() {
    return {
      TextoTab: "Sobre los pagos",
      imagenMenu: require("@/static/media/icons/advertencia.svg"),
      regresarPrincipal: '/preguntas-frecuentes/',
      preguntas:[
          {
              id: '1',
              title: '¿Cuáles son los medios de pago?',
              identificador: 'collapse-1',
              respuesta: [ 
                '<p class="parrafo omnes-medium">Se puede hacer el pago con cualquier tarjeta de crédito o débito de cualquier banco.</p>'
              ],
          },
          {
              id: '2',
              title: '¿Cómo se harán los siguientes pagos?',
              identificador: 'collapse-2',
              respuesta: [ 
                '<p class="parrafo omnes-medium">Se harán por medio de débito automático con la tarjeta afiliada según la frecuencia de pago.</p>',
                 ],
          },
          {
              id: '3',
              title: '¿Qué pasa si dejo de pagar mi seguro?',
              identificador: 'collapse-3',
              respuesta: [ 
                '<p class="parrafo omnes-medium">El seguro de vida se anulará recién a los 90 días  de no pago.</p>'
                 ],
          },
          {
              id: '4',
              title: '¿Qué pasa si mi tarjeta no tiene saldo al momento del cobro?¿Se cobra penalidad?',
              identificador: 'collapse-4',
              respuesta: [ 
                '<p class="parrafo omnes-medium">Si la tarjeta no cuenta con saldo al momento que se necesita hacer el cobro, se volverá a intentar los días posteriores hasta que se pueda encontrar el saldo suficiente para realizar el pago de la cuota. No hay penalidades ni intereses por atraso en pagos.</p>'
                 ],
          },
          {
              id: '5',
              title: '¿Puedo cambiar mi medio de pago si llegara bloquear o extraviar mi tarjeta?',
              identificador: 'collapse-5',
              respuesta: [ 
                '<p class="parrafo omnes-medium">Sí, solo tienes que llamarnos al teléfono: (01) 500 0000 para explicarte el proceso para estos casos.</p>'
                 ],
          }
          
      ],
      itemsMenu: [
        {
          id: "1",
          title: "Sobre el producto",
          to: "/preguntas-frecuentes/sobre-el-producto"
        },
        {
          id: "2",
          title: "Sobre los beneficiarios",
          to: "/preguntas-frecuentes/sobre-los-beneficiarios"
        },
        {
          id: "3",
          title: "Sobre los pagos",
          to: "/preguntas-frecuentes/sobre-los-pagos"
        }
      ]
    };
  },
  created() {
    this.$nuxt.$emit("nro-cotizaciones-flag", { flag: true });
  },
  mounted() {
  },
  components: {
    preguntasFrecuentesGenerico,
    nuevoTextLinks
  },
  methods: {
    
  }
};
</script>

<style scoped>
    @media screen and (max-width: 540px) {
    .reducirespaciadosection {
      margin-top: 18px;
    }

    }
</style>
