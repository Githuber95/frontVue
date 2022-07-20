export default {
    data () {
        return {
          dateStart:  (new Date('Aug 02 2021, 10:40:59')).getTime(),
          dateFinish: (new Date('Aug 06 2021, 23:59:59')).getTime(),
          dateCurrent: (new Date()).getTime(),
          stock: 150
        }
    },
    created () {
      this.$nuxt.$on('show-voucher', () => {
        this.dateCurrent = (new Date()).getTime()
        let stepsStock = this.stock / (this.dateFinish - this.dateStart)
        let remaining = Math.floor((this.dateCurrent - this.dateStart) * stepsStock)

        this.$store.commit('common/setCurrentVoucher', (this.stock - remaining))
      })
      this.$nuxt.$emit('show-voucher')
      

    },
    mounted () {
      this.$store.commit('common/setChannel', process.env.subChannel[this.$store.state.common.subchannel])
      const envAmplitude = (window.location.host == 'www.interseguro.pe') ? '655d0bb10609b35862d6c132759ab296' : '186abbcd3874155cb9ef8962496cc78c'
      
      this.$amplitude.getInstance().init(envAmplitude, null, {
        saveParamsReferrerOncePerSession: false,
        includeFbclid: true,
        includeGclid: true,
        includeUtm: true,
        includeReferrer: true,
        batchEvents: false,
        saveEvents: true,
        unsetParamsReferrerOnNewSession: true
      });
      let identify = new this.$amplitude.Identify()
      this.$amplitude.getInstance().identify(identify)

      // Amplitude Visita
      this.$amplitude.getInstance().logEvent(
        'Landing Vista',
        {
          'Producto Consultado': 'VIDA',
          'Sub Producto Consultado': this.$store.state.common.channel,
          'Estado de la Landing': this.$store.state.common.subchannel,
        }
      )

      // no usaremos userId, que se encargue Amplitude de autogenerr
      //this.$amplitude.getInstance().init("API_KEY", userId)
      //this.$amplitude.getInstance().init("API_KEY", this.$store.,this.$amplitude.getInstance().options.deviceId
      // this.$store.commit('payment/setBin', this.$route.query.bin)
      // this.$store.commit('payment/setTransactionToken', this.$route.query.transactionToken)
      // if (this.$route.query.transactionToken) {
      //   console.log('TENEMOS TOKEN NIUBIZ', this.$route.path)
      //   let pathFinish = (this.$route.path === '/interbank/') ? '/interbank/paso/pago' : '/paso/pago'
      //   this.$nuxt.$emit('show-loader-is', {
      //     text: 'Estamos procesando la información, solo tomará un momento'
      //   })
      //   this.$nuxt.$router.push({ path: pathFinish })
      // }
    },
    methods: {
      getParams () {
        // console.log('parametro', this.$route)
        // console.log('parametro', this.$route.params)
      }
    }
}