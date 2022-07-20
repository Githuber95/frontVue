<template lang="pug">
  b-col
    <!-- Tiene dos opciones: Cuando tiene data completa y la que existe una parte de la info -->
    div.resumen(:class="[showQuote ? 'd-lg-none' : 'd-none']")
      b-row.pt-2
        b-col.pt-1.pr-0(cols="5")
          h5 Mi DNI/CE es
        b-col.pt-1.pt-xl-3(cols="7")
          h5.omnes-medium {{ $store.state.common.dniCliente }}
      b-row.pt-2
        b-col.pt-1.pr-0(cols="5")
          h5 Mi nombre es
        b-col.pt-1.pt-xl-3(cols="7")
          h5.omnes-medium {{ capitalize($store.state.common.saveClient.nombre + " "+ $store.state.common.saveClient.apellidoPaterno + " " + $store.state.common.saveClient.apellidoMaterno ) }}
      b-row.pt-2
        b-col.pr-0(cols="5")
          h5 Nací el
        b-col(cols="7")
          h5.omnes-medium {{ $store.state.common.saveClient.fechaNacimiento }}
      b-row.pt-2
        b-col.pr-0(cols="5")
          h5 Mi género es
        b-col(cols="7" v-if="$store.state.common.saveClient.sexo === 'M'")
          h5.omnes-medium Masculino
        b-col.pt-1(cols="7" v-else)
          h5.omnes-medium Femenino
    div.para-completar.mt-2.mt-xl-3.pb-2(:class="[!showQuote ? 'd-lg-block' : 'd-none d-lg-block']")
      b-row.pt-1(v-if="$store.state.common.saveClient.nombre")
        b-col.pr-0(cols="6" xl="5")
          h5 DNI/CE
        b-col.pl-0(cols="6" xl="7")
          h5.omnes-medium {{ $store.state.common.dniCliente }}
      b-row.pt-1(v-if="$store.state.common.saveClient.nombre")
        b-col.pr-0(cols="6" xl="5")
          h5 Nombre
        b-col.pl-0(cols="6" xl="7")
          h5.omnes-medium {{ capitalize($store.state.common.saveClient.nombre + " "+ $store.state.common.saveClient.apellidoPaterno + " "+ $store.state.common.saveClient.apellidoMaterno) }}
      b-row.pt-1(v-if="$store.state.common.saveClient.fechaNacimiento && $store.state.common.saveClient.fechaNacimiento.length === 10")
        b-col.pr-0(cols="6"  xl="5")
          h5 Fecha de nacimiento
        b-col.pl-0(cols="6"  xl="7")
          h5.omnes-medium {{ $store.state.common.saveClient.fechaNacimiento }}
      b-row.pt-1(v-if="$store.state.common.saveClient.sexo")
        b-col.pr-0(cols="6"  xl="5")
          h5 Género
        b-col.pl-0(cols="6" v-if="$store.state.common.saveClient.sexo === 'M'"  xl="7")
          h5.omnes-medium Masculino
        b-col.pt-1.pl-0(cols="6" v-else  xl="7")
          h5.omnes-medium Femenino
      b-row
        b-col.mt-4.mb-3.pl-0(sm="12" v-if="showQuote")
          h4.omnes-medium Mis datos de contacto
      b-row.pt-1(v-if="$store.state.common.saveClient.numeroTelefono")
        b-col.pr-0(cols="6" xl="5")
          h5 Celular
        b-col.pl-0(cols="6" xl="7")
          h5.omnes-medium(v-if="$store.state.common.hashPhone") {{ hashText($store.state.common.saveClient.numeroTelefono, 0.35) }}
          h5.omnes-medium(v-else) {{ $store.state.common.saveClient.numeroTelefono }}
      b-row.pt-1(v-if="$store.state.common.saveClient.email")
        b-col.pr-0(cols="6" xl="5")
          h5 Correo
        b-col.pl-0(cols="6" xl="7")
          h5.omnes-medium(style="overflow-wrap: break-word;" v-if="$store.state.common.hashEmail") {{ hashText($store.state.common.saveClient.email, 0.4) }}
          h5.omnes-medium(style="overflow-wrap: break-word;" v-else) {{ $store.state.common.saveClient.email }}
</template>

<script>
export default {
  props: ['clientData', 'showQuote'],
  data () {
    return {
    }
  },
  methods: {
    capitalize (nombreCompleto) {
      nombreCompleto = nombreCompleto.toLowerCase()
      return nombreCompleto.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
    },
    hashText(text,percentToHash){

      const emailIdentifier='@'

      let textHashed=""

      let isEmail=text.indexOf(emailIdentifier)>=0;
      let textTohash=isEmail?text.split(emailIdentifier)[0]:text;
      let indexOffset=textTohash.length-Math.round(textTohash.length*percentToHash)

      for(let i=0;i<textTohash.length;i++){
        if  (i>=indexOffset){
            textHashed+="*"
        } else{
          textHashed+=textTohash[i]
        }
      }


      if (isEmail) {
        return textHashed+text.substring(text.indexOf(emailIdentifier))
      }


      return textHashed
    }
  }
}
</script>
