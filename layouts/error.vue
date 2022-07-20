<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404" class="mt-4">Esta página no existe</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/vida-con-devolucion" class="mt-4">Seguro de Vida - Vida con Devolución</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'interseguro', // you can set a custom layout for the error page
  mounted () {
  }
}
</script>
