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
      TextoTab: "Sobre los beneficiarios",
      imagenMenu: require("@/static/media/icons/advertencia.svg"),
      regresarPrincipal: '/preguntas-frecuentes/',
      preguntas:[
          {
              id: '1',
              title: '¿Puedo cambiar luego a mis beneficiarios?',
              identificador: 'collapse-1',
              respuesta: [ 
                '<p class="parrafo omnes-medium">Sí, puede cambiarlos en cualquier momento enviando un correo a <a href="*" rel="noopener">&nbsp;solicitudes@interseguro.com.pe</a> con los datos de los beneficiarios  (DNI/CE, Nombre completo, parentesco y porcentaje del beneficio).</p>'
              ],
          },
          {
              id: '2',
              title: '¿Mis beneficiarios pueden ser menores de edad?',
              identificador: 'collapse-2',
              respuesta: [ 
                '<p class="parrafo omnes-medium">Sí, en caso ocurra el fallecimiento del contratante el monto del beneficio se le daría al cumplir los 18 años de edad.</p>',
                 ],
          },
          {
              id: '3',
              title: '¿Quiénes son mis herederos legales?',
              identificador: 'collapse-3',
              respuesta: [ 
                '<p class="parrafo omnes-medium">Son herederos legales los cónyugues, hijos, padres entre otros. Para mayor información se puede revisar  el artículo 82 del código civil peruano.</p>',
              ],
          },
          {
              id: '4',
              title: '¿Qué pasa si uno de mis beneficiarios fallece?',
              identificador: 'collapse-4',
              respuesta: [ 
                '<p class="parrafo omnes-medium">El porcentaje que le correspondía al beneficiario se divide entre los restantes.</p>'
                 ],
          },
          {
              id: '5',
              title: '¿Qué pasa si todos mis beneficiarios fallecen al mismo tiempo?',
              identificador: 'collapse-5',
              respuesta: [ 
                '<p class="parrafo omnes-medium">El beneficio les corresponde a los herederos legales de cada beneficiario./p>'
                 ],
          },
          {
              id: '6',
              title: '¿Puedo incluir como beneficiario a alguien que no sea familiar mío?',
              identificador: 'collapse-6',
              respuesta: [ 
                '<p class="parrafo omnes-medium">Sí, en parentesco tenemos la opción “otros”.</p>'
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
