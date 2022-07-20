<template lang="pug">
    .unsubscribe
        no-ssr
            // h3.omnes-medium Cancelación de suscripción listo
            b-container
                b-row.justify-content-center.align-items-center
                    b-col.text-center(cols="12" sm="4" md="3" xl="3")
                        img(src="@/static/media/images/unsubscribe.svg" alt="desuscripción")
                    b-col.text-center.pb-3(cols="12" sm="8" md="6" xl="4")
                        h2.omnes-semibold.my-3.text-primary Te vamos a extrañar
                        h3.omnes-regular.my-2 La cancelación de tu suscripción fue exitosa.
                        h5.text-info Recuerda que siempre estamos constantemente informando sobre novedades, ofertas, descuentos y nuevos beneficios para nuestros clientes.
</template>

<script>
export default {
    layout: 'interseguro',
    data () {
        return {
        }
    },
    mounted () {
        // console.log('CODE REMARKETING', this.$route.params.codeRemarketing)
        if (this.$route.params.codeRemarketing){
            this.codigoRemarketing = this.$route.params.codeRemarketing
            this.remarketingv2()
        } else {
            this.$nuxt.$router.push("/");
        }
    },
    methods: {
        remarketingv2(){
            // console.log('process env', process.env.base)
            return new Promise((resolve, reject) => {
                this.$axios.get(process.env.base + 'digital-api/api/v2/sesiones/cancelaciones/' + this.codigoRemarketing)
                .then(function(response) {
                    resolve(response)
                })
                .catch(function(error) {})
            })
        },
    }
}
</script>

<style>
#is {
    min-height: 100vh;
}
</style>