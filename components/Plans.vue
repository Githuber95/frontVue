<template lang="pug">
  #plans.mt-2.mb-4
    b-row.my-4
      b-col.text-center
        h2.omnes-medium ¡{{ name }},
          span.omnes-medium  estas son tus cotizaciones!
        h3.mt-1 Selecciona la que más te convenga
    b-row.justify-content-center.mx-lg-0.mx-xl-5
      b-col(cols="12" lg="4" v-for="(plan, index) in plans" :key="plan.codigo")
        div.plan-info(:id="'card-'+plan.codigo" @click="selectPlan(plan.codigo)")
          svg(version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 25.1 22.7" style="enable-background:new 0 0 25.1 22.7;" xml:space="preserve")
            circle.st0(cx='12.6', cy='11.2', r='10.5' fill="#0855C4")
            g(fill="#FFFFFF")
              polygon.st1(points='11.2,16.1 6.9,12.2 8.4,10.5 11,12.9 16.6,6.6 18.3,8.1')
          b-row.px-2.mx-2.px-lg-0.px-xl-2.justify-content-lg-center
            b-col(cols="12" lg="11" xl="12")
              h5.text-center.lh-1.py-xl-1 Tus beneficiarios están protegidos en caso de tu fallecimiento por:
            b-col.px-lg-0(cols="12")
              div.price.text-center
                svg(version='1.1' xmlns='http://www.w3.org/2000/svg', xmlns:xlink='http://www.w3.org/1999/xlink' viewBox="0 0 30 28" style='enable-background:new 0 0 30 28;', xml:space='preserve')
                  path(d="M28.9,6.7l-9.7-6.3c-0.4-0.2-0.8-0.2-1.2,0l-17.2,11c-0.5,0.3-0.6,1-0.3,1.5\
                      c0.1,0.1,0.2,0.2,0.3,0.3l9.5,6.2c0.4,0.2,0.8,0.2,1.2,0l4.5-2.8l0,1.8L11,21.7l-8.8-5.5l-0.7,1.2l8.9,5.6c0.4,0.3,0.9,0.3,1.3,0\
                      l4.5-2.8l0,2.1l-5.1,3.2c0,0-0.1,0-0.2,0l-8.8-5.5L1.4,21l8.8,5.5c0.5,0.3,1.1,0.3,1.6,0L28.4,16l-0.7-1.1l-3.9,2.5v-2.1l4.6-2.9\
                      l-0.7-1.1l-3.9,2.5v-1.8l5.1-3.2c0.5-0.3,0.7-1,0.3-1.5C29.2,6.9,29.1,6.8,28.9,6.7L28.9,6.7z M11,18.2l-9-5.9l4.7-3.1l8.8,6.1\
                      L11,18.2z M17.5,21.3l-0.1-6.4L8,8.5l4.6-3l9.8,6v6.7L17.5,21.3z M23.4,10.4l-9.5-5.7l4.8-3.1l9.2,6L23.4,10.4z")
                p.omnes-semibold.d-inline {{ plan.precio }}
            b-col.plan-button(cols="12")
              b-row.lh-1
                b-col.r-border.px-1.pr-0(cols="6" lg="5" )
                  h6 Pagando:
                  p.omnes-semibold.py-xl-1 {{ plan.pagar }}
                  h6 Mensual
                b-col.pr-0(cols="6" lg="7" )
                  h6 Devolución de 100%:
                  p.omnes-semibold.py-xl-1 {{ plan.devolver }}
                  h6 Al finalizar el periodo
      b-button.btn-plans.mb-xl-3.omnes-medium(variant="dark" @click="goContact") Continuar
</template>

<script>

export default {
  data () {
    return {
      name: 'Carlos',
      plans: [
        {
          codigo: 'a',
          precio: 'S/ 50, 000',
          pagar: 'S/ 150.00',
          devolver: 'S/ 9,000'
        },
        {
          codigo: 'b',
          precio: 'S/ 45, 000',
          pagar: 'S/ 150.00',
          devolver: 'S/ 6,750'
        },
        {
          codigo: 'c',
          precio: 'S/ 40, 000',
          pagar: 'S/ 150.00',
          devolver: 'S/ 4,500'
        }
      ]
    }
  },
  methods: {
    selectPlan (codigo) {
      // let elementPlan = document.getElementById('card-'+codigo)
      this.plans.filter(des => { document.getElementById('card-' + des.codigo).classList.remove('valid') })
      document.getElementById('card-' + codigo).classList.add('valid')
      // console.log('resultado', codigo)
    },
    goContact () {
      // console.log('ir a la seccion contacto')
      this.$nuxt.$router.push({ path: '/paso/contacto' })
    }
  }
}
</script>
