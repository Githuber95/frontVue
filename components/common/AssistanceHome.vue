<template lang="pug">
  b-col.content.text-center.px-4.px-lg-0(cols="12")
    b-row(align-h="center")
      b-col.o-hidden.px-xl-0(cols="12" lg="11" xl="12")
        // mobile
        b-carousel.d-xl-none(:interval="90000" indicators='' label-indicators="Selecciona un slide para mostrar")
          b-carousel-slide(v-for="(texto, index) in textos" :key="index" img-blank img-alt="comentarios seguro de vida con devolucion")
            b-row
              b-col.mb-2.text-center(cols="12")
                img(:src="texto.imagen" :alt="texto.titulo" :style="texto.styleCss")
            b-row
              b-col.title.mb-2(cols="12")
                h3.omnes-semibold.text-center {{ texto.title }}
              b-col.content.pr-0(cols="12" )
                div(v-for="(subdescripcion, index) in texto.descripcion")
                  span(v-html="subdescripcion")
        // desktop
        b-row.box.d-none.d-xl-flex.px-xl-0
          b-col(cols="3" v-for="(texto, index) in textos" :key="index")
            div.borde
              b-row
                b-col.mb-2.text-center(cols="12")
                  img(:src="texto.imagen" :alt="texto.titulo" :style="texto.styleCss")
              b-row
                b-col.title.mb-2(cols="12")
                  h3.omnes-semibold.text-center {{ texto.titulo }}
                b-col.content(cols="12" )
                  div(v-for="(subdescripcion, index) in texto.descripcion")
                    span(v-html="subdescripcion")
      b-col.mt-5.telefono(cols="12")
        h3.text-white.d-xl-none Para hacer uso de las asistencias, <br>llama al (01)  500-0000 opción 2.
        h3.text-white.d-none.d-xl-block Para hacer uso de las asistencias, llama al (01)  500-0000 opción 2.

</template>

<script>

export default {
  props: ['textos'],
    data() {
      return {}
    }
}
</script>