<template lang="pug">
  div.questions-answer
    div.d-xl-none(v-for="(item, index) in preguntas" :key="item.id")             
      div.text-center.change(v-b-toggle="item.identificador") 
        div.lista2.omnes-medium.when-opened.acomodarlista {{item.title}} 
        div.lista.omnes-medium.when-closed.acomodarlista {{item.title}} 
      b-collapse.my-1(:id="item.identificador" accordion="accordion")
        span(v-for="(subrespuesta, index) in item.respuesta" :key="item.id+'col'")
          span(v-html="subrespuesta")
    div.d-none.d-xl-block.mb-xl-3(v-for="(item, index) in preguntas" :key="item.id+'pre'")
      b-row
        b-col(cols="12")
          h4.omnes-medium {{ item.title }}
        b-col.mt-xl-2(cols="12" v-for="(subrespuesta, index) in item.respuesta" :key="item.id+'sub'")
          p.mb-0(v-html="subrespuesta")
</template>

<script>
export default {
  props: {
    preguntas: {
      type: Array,
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
   
  }
};
</script>