<template lang="pug">
  #custom-loader
    b-container
      b-row(align-center)
        b-col(cols="1" sm="3" md="3" lg="2")
        b-col(cols="10" sm="6" md="6" lg="8")
          img(v-if="info=='Estamos obteniendo tus datos...'" src="@/static/media/images/recibiendodatos.gif" alt="recibiendo datos")
          img(v-else src="@/static/media/images/calculando.gif" alt="calculando")
          h1.mt-5.mt-xl-4.omnes-regular.text-center(style="color:#0855c4") {{ info }}
        b-col(cols="1" sm="3" md="3" lg="2")          
</template>

<script>
export default {
  props: ['info'],
  data () {
    return {
      size: '190px',
      color: '#fff'
    }
  },
  methods: {
    calcWidth (outerWidth) {
      let r = 45 * Math.PI / 180
      let s = Math.abs(Math.cos(r))
      let c = Math.abs(Math.sin(r))
      return (outerWidth * c - outerWidth * s) / (Math.pow(c, 2) - Math.pow(s, 2))
    }
  }
}
</script>

<style>
  #custom-loader {
    position: fixed;
    z-index: 99;
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    opacity: 0.95;
  }
  #custom-loader img {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>
