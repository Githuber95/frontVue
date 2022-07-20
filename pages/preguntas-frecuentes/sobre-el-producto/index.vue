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
              :regresarPrincipal="regresarPrincipal"
              :imagenMenu="imagenMenu"
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
      TextoTab: "Sobre el producto",
      imagenMenu: require("@/static/media/icons/advertencia.svg"),
      regresarPrincipal: '/preguntas-frecuentes/',
      preguntas:[
          {
              id: '1',
              title: '¿El monto de pago varía con el tiempo?',
              identificador: 'collapse-1',
              // respuesta: [ 
              //   '<p class="parrafo omnes-medium">Es la central encargada de atender cualquier consulta que puedas tener respecto a tu seguro viaje, así como una respuesta ante accidentes o emergencias.</p>',
              //   '<img src="https://miro.medium.com/max/576/1*mh8il3s3hB0Xdpx6ffQLTw.png">'
              // ]
              respuesta: [ 
                '<p class="parrafo omnes-medium">No, los valores son garantizados</p>'
              ],
          },
          {
              id: '2',
              title: '¿La devolución al finalizar el periodo tiene algún descuento?',
              identificador: 'collapse-2',
              respuesta: [ 
                '<p class="parrafo omnes-medium">No, se entrega en su totalidad el monto a los clientes que su póliza haya culminado y no se activó la cobertura de fallecimiento.</p>',
                 ],
          },
          {
              id: '3',
              title: '¿Puedo retirarme del seguro antes de cumplir la totalidad del periodo?',
              identificador: 'collapse-3',
              respuesta: [ 
                '<p class="parrafo omnes-medium">Sí, puede acceder a una devolución anticipada a partir del segundo año de la póliza.</p>',
                '<p class="parrafo omnes-medium">Se le devuelve un % de todos los aportes que realizó hasta el momento de la solicitud. Con esto, el contrato queda finalizado.</p>',
                 ],
          },
          {
              id: '4',
              title: '¿Necesito realizarme una evaluación médica?',
              identificador: 'collapse-4',
              respuesta: [ 
                '<p class="parrafo omnes-medium">No, no es necesario. El contratante tiene que tener claro al momento de la contratación del seguro sus enfermedades previamente diagnosticadas al momento de la contratación. En caso, contraiga alguna enfermedad posterior a la contratación del seguro y fallezca a causa de esta, queda totalmente cubierto.</p>'
                 ],
          },
          {
              id: '5',
              title: '¿Qué pasa si fallezco en un territorio extranjero?',
              identificador: 'collapse-4',
              respuesta: [ 
                '<p class="parrafo omnes-medium">El seguro cubre el fallecimiento del contratante, no importa en qué territorio se encuentre.</p>'
                 ],
          },
          {
              id: '6',
              title: '¿A partir de cuándo puedo usar los beneficios del programa Vive más?',
              identificador: 'collapse-4',
              respuesta: [ 
                '<p class="parrafo omnes-medium">Puedes acceder a los beneficios, luego de 30 días útiles de la emisión de la póliza.</p>'
                 ],
          },
          
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
