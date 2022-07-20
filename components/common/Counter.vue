<template lang="pug">
  .temporizador
    .bloque
      .dias {{dias}}
      p.label Días
    .bloque
      .horas {{horas}}
      p.label Horas
    .bloque
      .minutos {{minutos}}
      p.label Minutos
    .bloque
      .segundos {{segundos}}
      p.label Segundos
</template>
<script>
import { interval } from "rxjs";

export default {
  props: ["diaHasta", "mesHasta", "anio"],
  data() {
    return {
      countActive: true,
      dias: '',
      horas: '',
      minutos: '',
      segundos: ''
    }
  },
  mounted() {
    const loopReactivo = interval(1000);
    const promocionHasta = new Date(this.anio, this.mesHasta - 1, this.diaHasta, 23, 59);
    const parseZero = (valor) => { return (valor < 0) ?  `00` : (valor < 10) ?  `0${valor}` : `${valor}` }
    loopReactivo.subscribe((timer) => {
    const fechaActual = new Date();
    const diferenciaSegundos = Math.trunc((promocionHasta.getTime() - fechaActual.getTime()) / 1000);
    const dias = Math.trunc(diferenciaSegundos / (60 * 60 * 24));
    const horas = Math.trunc(diferenciaSegundos / (60 * 60)) - dias * 24;
    const minutos = Math.trunc(diferenciaSegundos / (60)) - (dias * 24 * 60 + horas * 60);
    const segundos = diferenciaSegundos - (dias * 24 * 60 * 60 + horas * 60 * 60 + minutos * 60);
    this.$data.segundos = parseZero(segundos)
    this.$data.minutos = parseZero(minutos)
    this.$data.horas = parseZero(horas)
    this.$data.dias = parseZero(dias);
    })
  }
}

</script>

<style>
  .temporizador {
    display: flex;
    position: absolute;
    bottom: 7.5rem;
    left: 1rem;
  }
  .temporizador .bloque {
    margin: 0 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
   .temporizador .bloque div{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      color: rgb(80,80,80);
      box-shadow: 0 0 6px 2px hsla(0,0%,87.5%,.43) inset;
      font-size: 1rem;
      font-weight: bold;
      width: 32px;
      height: 30px;
      border-radius: 5px;
   }
   .temporizador .bloque p.label {
      font-size: 7px;
      font-weight: bold;
      color: #fff;
      text-align: left;
      width: 100%;
   }

   @media (min-width: 992px) {
     .temporizador {
        right: 0;
        bottom: 2rem;
        left: 3rem;
     }
    .temporizador .bloque {
      margin: 0 5px;
    }
    .temporizador .bloque p.label {
      font-size: 12px;
    }
    .temporizador .bloque div {
      font-size: 2.3rem;
      width: 3.8rem;
      height: 2.8rem;
    }
   }
</style>