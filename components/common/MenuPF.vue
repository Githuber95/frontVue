<template lang="pug">
  #text-links
    div
      router-link.omnes-medium(to="/preguntas-frecuentes/" target="_self" class="links-text")
        div.centrarLink(style="height:44px;")
          img(src="@/static/media/icons/preguntas-frecuentes/preguntas_frecuentes.svg" alt='Viaje Seguro y sin preocupaciones')
          span.dudas-frecuentes Preguntas más frecuentes
    div
      router-link.omnes-medium(to="/preguntas-frecuentes/sobre-el-producto" target="_self" class="links-text")
        div.centrarLink(style="height:44px;")
          img(src="@/static/media/icons/preguntas-frecuentes/producto.svg" alt='Viaje Seguro y sin preocupaciones')
          span.dudas-frecuentes Sobre el producto
    div
      router-link.omnes-medium(to="/preguntas-frecuentes/sobre-los-beneficiarios" target="_self" class="links-text")
        div.centrarLink(style="height:44px;")
          img(src="@/static/media/icons/preguntas-frecuentes/beneficios.svg" alt='Viaje Seguro y sin preocupaciones')
          span.dudas-frecuentes Sobre los beneficiarios
    div
      router-link.omnes-medium(to="/preguntas-frecuentes/sobre-los-pagos" target="_self" class="links-text")
        div.centrarLink(style="height:44px;")
          img(src="@/static/media/icons/preguntas-frecuentes/tarjeta.svg" alt='Viaje Seguro y sin preocupaciones')
          span.dudas-frecuentes Sobre los pagos
    div
      router-link.omnes-medium(to="/preguntas-frecuentes/sobre-covid-19" target="_self" class="links-text")
        div.centrarLink(style="height:44px;")
          img(src="@/static/media/icons/preguntas-frecuentes/virus.svg" alt='Viaje Seguro y sin preocupaciones')
          span.dudas-frecuentes Sobre el COVID-19
</template>

<script>
export default {
  data () {
    return { }
  }
}
</script>

<style >
  #text-links div {
    margin-bottom: 20px;
  }
  #text-links img, #text-links span {
    filter: contrast(0%)
  }
  #text-links img {
    width: 2.8rem;
    padding-right: 14px;
  }
  #text-links a:hover {
    text-decoration: none;
  }
  #text-links .nuxt-link-exact-active span,
  #text-links .nuxt-link-exact-active img {
    color: #0754C4 !important;
    font-family: 'Omnes Semibold';
    filter: contrast(100%)
  }

  .dudas-frecuentes {
    color: #6F6F6F;
    font-size: 18px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
  }

  .centrarLink {
       display: flex;
       justify-content: flex-start;
       align-items: center;
  }
</style>
