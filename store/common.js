/* ============
 * State of common module
 * ============
 *
 * The initial state of the suggestion module.
*/
const state = () => ({
  agencia: '1067',
  channelSellIs: 'FFVV',
  cardClass: '',
  channel: 'WEB',
  codeRemarketing: '',
  cotizacion: [],
  cotizacionAdicional: [],
  coverageAdicional: '',
  cumulo: 0,
  currentVoucher: 150,
  currentSection: '',
  dniCliente: '',
  hashPhone: false,
  hashEmail: false,
  ibkBins: {},
  identificador: null,
  leaveMessage: 0,
  nextDatePay: '',
  nombreCliente: '',
  numeroPoliza: '',
  pantalla: null,
  percentScroll: 0, 
  primaRecurrenteDescuento: 0,
  primaClienteAnual: '',
  inversa: false,
  saveClient: {
    numeroDocumento: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    sexo: '',
    numeroTelefono: '',
    email: ''
  },
  showModalOnce: 0,
  subchannel: 'WEB',
  trackingId: '',
  verifyDataClient: false
})

/* ============
 * Getters for the common module
 * ============
 *
 * The getters that are available on the
 * user module.
 */
const getters = {
  agencia: state => { return state.agencia },
  channelSellIs: state => { return state.channelSellIs },
  cardClass: state => { return state.cardClass },
  channel: state => { return state.channel },
  codeRemarketing: state => { return state.codeRemarketing },
  cotizacion: state => { return state.cotizacion },
  cotizacionAdicional: state => { return state.cotizacionAdicional },
  coverageAdicional: state => { return state.coverageAdicional },
  cumulo: state => { return state.cumulo },
  currentVoucher: state => { return state.currentVoucher },
  currentSection: state => { return state.currentSection },
  dniCliente: state => { return state.dniCliente },
  hashPhone: state => { return state.hashPhone },
  hashEmail: state => { return state.hashEmail },
  ibkBins: state => {  return state.ibkBins },
  identificador: state => { return state.identificador },
  leaveMessage: state => { return state.leaveMessage },
  nextDatePay: state => { return state.nextDatePay },
  nombreCliente: state => { return state.nombreCliente },
  numeroPoliza: state => { return state.numeroPoliza },
  pantalla: state => { return state.pantalla },
  percentScroll: state => { return state.percentScroll },
  primaRecurrenteDescuento: state => { return state.primaRecurrenteDescuento },
  primaClienteAnual: state => { return state.primaClienteAnual },
  saveClient: state => { return state.saveClient },
  showModalOnce: state => { return state.showModalOnce },
  subchannel: state => { return state.subchannel },
  trackingId: state => { return state.trackingId },
  verifyDataClient: state => { return state.verifyDataClient },
  inversa: state => { return state.inversa }
}

/* ============
 * Mutations for the common module
 * ============
 *
 * The mutations that are available on the
 * common module.
 */
const mutations = {
  setAgencia (state, payload) {
    state.agencia = payload
  },
  setChannelSellIs (state, payload) {
    state.channelSellIs = payload
  },
  setCardClass (state, payload) {
    state.cardClass = payload
  },
  setChannel (state, payload) {
    state.channel = payload
  },
  setCodeRemarketing (state, payload) {
    state.codeRemarketing = payload
  },
  setCotizacion (state, payload) {
    state.cotizacion = payload
  },
  setCotizacionAdicional (state, payload) {
    state.cotizacionAdicional = payload
  },
  setCoverageAdicional (state, payload) {
    state.coverageAdicional = payload
  },
  setCumulo (state, payload) {
    state.cumulo = payload
  },
  setCurrentVoucher (state, payload) {
    state.currentVoucher = payload
  },
  setCurrentSection (state, payload) {
    state.currentSection = payload
  },
  setDniCliente (state, payload) {
    state.dniCliente = payload
  },
  setHashPhone (state, payload) {
    state.hashPhone = payload
  },
  setHashEmail (state, payload) {
    state.hashEmail = payload
  },
  setIbkBins (state, payload) {
    state.ibkBins = payload
  },
  setIdentificador (state, payload) {
    state.identificador = payload
  }, 
  setLeaveMessage (state, payload) {
    state.leaveMessage = payload
  },
  
  setNextDatePay(state, payload) {
    state.nextDatePay = payload
  },
  setNombreCliente (state, payload) {
    state.nombreCliente = payload
  },
  setNumeroPoliza (state, payload) {
    state.numeroPoliza = payload
  },
  setPantalla (state, payload) {
    state.pantalla = payload
  },
  setPercentScroll (state, payload) {
    state.percentScroll = payload
  },
  setPrimaClienteAnual (state, payload) {
    state.primaClienteAnual = payload
  },
  setPrimaRecurrenteDescuento (state, payload) {
    state.primaRecurrenteDescuento = payload
  },
  setSaveClient (state, payload) {
    state.saveClient.numeroDocumento = payload.numeroDocumento
    state.saveClient.nombre = payload.nombre
    state.saveClient.apellidoPaterno = payload.apellidoPaterno
    state.saveClient.apellidoMaterno = payload.apellidoMaterno
    state.saveClient.fechaNacimiento = payload.fechaNacimiento
    state.saveClient.sexo = payload.sexo
    state.saveClient.numeroTelefono = payload.numeroTelefono
    state.saveClient.email = payload.email
  },
  setShowModalOnce (state, payload) {
    state.showModalOnce = payload
  }, 
  setSubchannel (state, payload) {
    state.subchannel = payload
  },
  setTrackingId (state, payload) {
    state.trackingId = payload
  },
  setVerifyDataClient (state, payload) {
    state.verifyDataClient = payload
  },
  setInversa (state, payload) {
    state.inversa = payload
  },
  clear (state) {
    state.nombreCliente = ''
    state.cotizacion = []
    state.cotizacionAdicional = []
    state.saveClient = {}
  }
}

/* ============
 * Actions for the common module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
const actions = {
  sendSMS({ commit }, client) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.apiSMS, client)
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  makeClient ({ state, commit }, client) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('clientes/', client, { headers: { 'X-TransactionID': state.trackingId } })
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getClients ({ state, commit }, numberDocument) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('clientes/' + (numberDocument + '?channel=' + state.channel), { headers: { 'X-TransactionID': state.trackingId } })
        .then(res => {
          if (res) {
            // commit('setSaveClient', res.data)
            commit('setDniCliente', numberDocument)
            if (res.data) {
              commit('setCumulo', res.data.cumuloValido)
            } else if (res.code == '01') {
              commit('setCumulo', true)
            } else {
              commit('setCumulo', false)
            }
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  
  // @DEPRECATED - CÚMULO VÁLIDO VIENE YA EN EL RESPONSE DE getClients()
  validateClient ({ commit }, numberDocument) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('clientes/validate/cumulo/' + numberDocument, { headers: { 'X-TransactionID': state.trackingId } })
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  parameterQuote ({ state, commit }, idVenta) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base + 'vida-api-cash-regular/v1/' +'parametros', idVenta, { headers: { 'X-TransactionID': state.trackingId } })
        .then(res => {
          if (res) {
            resolve(res)
            if (state.channel === 'IBK') {
              commit('setIbkBins', res.data.ibkBins)
            }
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  makeQuote ({ state, commit }, idVenta) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('cotizaciones/cotizar/vidacash', idVenta, { headers: { 'X-Token': 'WvaR32lbD6C8aegs0s8GEvYyZlIRdkFZu9IbPSdcePIXKGCcUSASC6biaJ/k/nb8FAA+j4NaYoz84eW5v9uq+fYyZlIRdkFZPepeqK8ZlAG4HCQ6W+mdrxjeugPDN+dguV0rizKFcFv4JiZkwjSD5/YyZlIRdkFZE4cOj4fZWft5QOAySgsN0uhi2bGsAhVFtMKk5T48WfkQQ6Y+cE4aOPYyZlIRdkFZbL1dZKRynohkKBPo7a/EbW65TPU1fcp+ZjYoP7rmFpCuXnIOfKrHf/YyZlIRdkFZ9jJmUhF2QVleIUCSBBRrld6riEmx3q5vcVRtwUeofwDYnE4EaLibwwfR7cCx2RHFDFB+yXDSZiL2MmZSEXZBWfFxMIC66on0IX1jHau7LBDDDA5Lx4YC0/oMa3KHTQjjgIPCNEtqAqj2MmZSEXZBWah4tgUzgy2ruESezD40oQCk6bygNTee3ZXKS40Ib9On9jJmUhF2QVnOY0DJilHS/Vw1u7IG4A+dBlNx0BVsNE+XQjP5yZrFMimAhWq7cP8vV679HKMxpw06mIGh/Lm90barKURf3d8V9jJmUhF2QVn40DoCwp5nglgLzEp0ITUPax0AsmHwSdsfXxcXNgHcOPjcMv+lRExdWvaR32lbD6D2MmZSEXZBWVIocTUzLMRRSOfumeMIlGn2MmZSEXZBWcqLj8JS7JzI4nuxpvMPJCcfnYVVImWxm/YyZlIRdkFZqHi2BTODLavum3ZzYNZxKGGHr+XxEIVVab2/yolGW9ua5J1hRR+2svQj11Y1lwxVlCV2NGwBXC2Txslp7fjYniSuK30ECcW19jJmUhF2QVkDlLUQpRvEPfTb1i02idvrjRYiClhZYtta9pHfaVsPoD1fC+mi75Hk', 'X-TransactionID': state.trackingId } })
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  makeQuoteWithout ({ state, commit }, idVenta) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base +  'vida-api-cash-regular/v1/cotizaciones/cotizar/vidacash', idVenta, { headers: { 'X-Token': 'WvaR32lbD6C8aegs0s8GEvYyZlIRdkFZu9IbPSdcePIXKGCcUSASC6biaJ/k/nb8FAA+j4NaYoz84eW5v9uq+fYyZlIRdkFZPepeqK8ZlAG4HCQ6W+mdrxjeugPDN+dguV0rizKFcFv4JiZkwjSD5/YyZlIRdkFZE4cOj4fZWft5QOAySgsN0uhi2bGsAhVFtMKk5T48WfkQQ6Y+cE4aOPYyZlIRdkFZbL1dZKRynohkKBPo7a/EbW65TPU1fcp+ZjYoP7rmFpCuXnIOfKrHf/YyZlIRdkFZ9jJmUhF2QVleIUCSBBRrld6riEmx3q5vcVRtwUeofwDYnE4EaLibwwfR7cCx2RHFDFB+yXDSZiL2MmZSEXZBWfFxMIC66on0IX1jHau7LBDDDA5Lx4YC0/oMa3KHTQjjgIPCNEtqAqj2MmZSEXZBWah4tgUzgy2ruESezD40oQCk6bygNTee3ZXKS40Ib9On9jJmUhF2QVnOY0DJilHS/Vw1u7IG4A+dBlNx0BVsNE+XQjP5yZrFMimAhWq7cP8vV679HKMxpw06mIGh/Lm90barKURf3d8V9jJmUhF2QVn40DoCwp5nglgLzEp0ITUPax0AsmHwSdsfXxcXNgHcOPjcMv+lRExdWvaR32lbD6D2MmZSEXZBWVIocTUzLMRRSOfumeMIlGn2MmZSEXZBWcqLj8JS7JzI4nuxpvMPJCcfnYVVImWxm/YyZlIRdkFZqHi2BTODLavum3ZzYNZxKGGHr+XxEIVVab2/yolGW9ua5J1hRR+2svQj11Y1lwxVlCV2NGwBXC2Txslp7fjYniSuK30ECcW19jJmUhF2QVkDlLUQpRvEPfTb1i02idvrjRYiClhZYtta9pHfaVsPoD1fC+mi75Hk', 'X-TransactionID': state.trackingId } })
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  makeQuoteReverse ({ state, commit }, obj) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('cotizaciones/precalculo/' + obj.edad + '/' + obj.sexo, { headers: { 'X-Token': 'WvaR32lbD6C8aegs0s8GEvYyZlIRdkFZu9IbPSdcePIXKGCcUSASC6biaJ/k/nb8FAA+j4NaYoz84eW5v9uq+fYyZlIRdkFZPepeqK8ZlAG4HCQ6W+mdrxjeugPDN+dguV0rizKFcFv4JiZkwjSD5/YyZlIRdkFZE4cOj4fZWft5QOAySgsN0uhi2bGsAhVFtMKk5T48WfkQQ6Y+cE4aOPYyZlIRdkFZbL1dZKRynohkKBPo7a/EbW65TPU1fcp+ZjYoP7rmFpCuXnIOfKrHf/YyZlIRdkFZ9jJmUhF2QVleIUCSBBRrld6riEmx3q5vcVRtwUeofwDYnE4EaLibwwfR7cCx2RHFDFB+yXDSZiL2MmZSEXZBWfFxMIC66on0IX1jHau7LBDDDA5Lx4YC0/oMa3KHTQjjgIPCNEtqAqj2MmZSEXZBWah4tgUzgy2ruESezD40oQCk6bygNTee3ZXKS40Ib9On9jJmUhF2QVnOY0DJilHS/Vw1u7IG4A+dBlNx0BVsNE+XQjP5yZrFMimAhWq7cP8vV679HKMxpw06mIGh/Lm90barKURf3d8V9jJmUhF2QVn40DoCwp5nglgLzEp0ITUPax0AsmHwSdsfXxcXNgHcOPjcMv+lRExdWvaR32lbD6D2MmZSEXZBWVIocTUzLMRRSOfumeMIlGn2MmZSEXZBWcqLj8JS7JzI4nuxpvMPJCcfnYVVImWxm/YyZlIRdkFZqHi2BTODLavum3ZzYNZxKGGHr+XxEIVVab2/yolGW9ua5J1hRR+2svQj11Y1lwxVlCV2NGwBXC2Txslp7fjYniSuK30ECcW19jJmUhF2QVkDlLUQpRvEPfTb1i02idvrjRYiClhZYtta9pHfaVsPoD1fC+mi75Hk', 'X-TransactionID': state.trackingId } })
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  makeTracking ({ state, commit }, tracking) {
    return new Promise((resolve, reject) => {
      // this.$axios.$post('https://cors-anywhere.herokuapp.com/' + process.env.base + 'tracking/', tracking)
      this.$axios.$post(process.env.base + 'tracking/', tracking, { headers: { 'X-TransactionID': tracking.trackingId } })
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // Remarketing
  makeRemarketing ({ state, commit }, remarketing) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base + 'digital-api/api/v2/sesiones/activaciones', remarketing, { headers: { 'X-TransactionID': state.trackingId } })
      // this.$axios.$post('https://cors-anywhere.herokuapp.com/' + process.env.base + 'digital-api/api/v2/sesiones/activaciones', remarketing)
        .then(res => {
          // commit('setCodeRemarketing', res.codigoRemarketing)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getRemarketing ({ state, commit }, idRemarketing) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(process.env.base + 'digital-api/api/v2/sesiones/' + idRemarketing, { headers: { 'X-TransactionID': state.trackingId } })
      // this.$axios.$get('https://cors-anywhere.herokuapp.com/' + process.env.base + 'digital-api/api/v2/sesiones/' + idRemarketing)
        .then(res => {
          if (res.codigoRespuesta === '01') {
            commit('setIdentificador', idRemarketing)
            commit('setCodeRemarketing', res.codigoRemarketing)
            commit('setPantalla', res.detalle.pantalla)  
          }
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  cancelRemarketing ({ state, commit }, idRemarketing) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base + 'digital-api/api/v2/sesiones/cancelaciones/ventas', idRemarketing, { headers: { 'X-TransactionID': state.trackingId } })
      // this.$axios.$post('https://test.interseguro.pe/digital-api/api/v2/sesiones/activaciones', idRemarketing)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  quotation ({ state, commit }, sendQuotation) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base + 'vida-api-cash/v1/cotizaciones/email', sendQuotation, { headers: { 'X-TransactionID': state.trackingId } }) // con descuento
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  quotationWithout ({ state, commit }, sendQuotation) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base + 'vida-api-cash-regular/v1/cotizaciones/email', sendQuotation, { headers: { 'X-TransactionID': state.trackingId } }) // sin descuento
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  saveClientFree ({ state, commit }, clientFree) {
    return new Promise((resolve, reject) => {
      // this.$axios.$post(process.env.base + 'vida-api-cash/v1/cotizaciones/forward/vidafree', clientFree)
      this.$axios.$post(process.env.base + 'vida-api-cash-regular/v1/cotizaciones/forward/vidafree', clientFree, { headers: { 'X-TransactionID': state.trackingId } })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  paymentFrequency ({ state, commit }, frecuenciaPago) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base + 'vida-api-cash/v1/polizas/fechapago', frecuenciaPago, { headers: { 'X-TransactionID': state.trackingId } })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  makeQuoteCoverages ({ state, commit }, form) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base +  'vida-api-cash-regular/v1/' + 'cotizaciones/cotizar/cotizarCoberturasAdicionales', form)
        .then(res => {
          if (res) {
            const cotizacionesObject = res.data;
            let cotizacionesArray = {};
            Object.keys(cotizacionesObject).map(codCobertura =>{
              const cotizacionesPorCobertura = [];
              const cotizacionesPorSumaAsegurada = Object.keys(cotizacionesObject[codCobertura]);
              cotizacionesPorSumaAsegurada.map(sumaAsegurada =>{
                const cotizacionesPorPorcentaje = Object.keys(cotizacionesObject[codCobertura][sumaAsegurada]);
                cotizacionesPorPorcentaje.map(porcentaje =>{
                  cotizacionesPorCobertura.push(cotizacionesObject[codCobertura][sumaAsegurada][porcentaje]);
                })                
              })
              cotizacionesArray[codCobertura] = cotizacionesPorCobertura;
            });
            commit('setCoverageAdicional', cotizacionesArray)
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          console.log('error MAIN COVERAGE ADICIONAL')
          reject(err)
        })
    })
  },
}

/* =============

 * Common Module
 * =============
 */
export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
