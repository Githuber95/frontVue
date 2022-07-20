import getData from './common.js'
/* ============
 * State of common module
 * ============
 *
 * The initial state of the suggestion module.
 */
const state = () => ({
  bin: '',
  transactionToken: '',
  token: null,
  sessionKey: '',
  numeroPoliza: '',
  numeroPolizaUpdate: '',
  nombre: '',
  nombreCompleto: '',
  correo: '',
  subscriptionId: '',
  sumaAsegurada: '',
  primaRecurrente: '',
  frecuenciaPago: '',
  provider: 'NIUBIZ',
  transactionId2: '',
  enfermedadesGraves: false
})
/* ============
 * Getters for the common module
 * ============
 *
 * The getters that are available on the
 * user module.
 */
const getters = {
  bin: state => { return state.bin },
  transactionToken: state => { return state.transactionToken },
  token: state => { return state.token },
  sessionKey: state => { return state.sessionKey },
  numeroPoliza: state => { return state.numeroPoliza },
  numeroPolizaUpdate: state => { return state.numeroPolizaUpdate },
  nombre: state => { return state.nombre },
  nombreCompleto: state => { return state.nombreCompleto },
  correo: state => { return state.correo },
  subscriptionId: state => { return state.subscriptionId },
  sumaAsegurada: state => { return state.sumaAsegurada },
  primaRecurrente: state => { return state.primaRecurrente },
  frecuenciaPago: state => { return state.frecuenciaPago },
  provider: state => { return state.provider },
  enfermedadesGraves: state => { return state.enfermedadesGraves }
}

/* ============
 * Mutations for the common module
 * ============
 *
 * The mutations that are available on the
 * common module.
 */
const mutations = {
  setBin (state, payload) {
    state.bin = payload
  },
  setTransactionToken (state, payload) {
    state.transactionToken = payload
  },
  setToken (state, payload) {
    state.token = payload
  },
  setSessionKey (state, payload) {
    state.sessionKey = payload
  },
  setNumeroPoliza (state, payload) {
    state.numeroPoliza = payload
  },
  setNumeroPolizaUpdate (state, payload) {
    state.numeroPolizaUpdate = payload
  },
  setNombre (state, payload) {
    state.nombre = payload
  },
  setNombreCompleto (state, payload) {
    state.nombreCompleto = payload
  },
  setCorreo (state, payload) {
    state.correo = payload
  },
  setSubscriptionId (state, payload) {
    state.subscriptionId = payload
  },
  setSumaAsegurada (state, payload) {
    state.sumaAsegurada = payload
  },
  setPrimaRecurrente (state, payload) {
    state.primaRecurrente = payload
  },
  setFrecuenciaPago (state, payload) {
    state.frecuenciaPago = payload
  },
  setProvider (state, payload) {
    state.provider = payload
  },
  setEnfermedadesGraves (state, payload) {
    state.enfermedadesGraves = payload
  }
}

const actions = {
  getTokenNiubiz ({ commit }, item) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('https://test.interseguro.pe' + '/payment-api/api/v2/session', item, { headers: { 'X-Apikey': '4e657008-bb87-4e89-81bc-0fb62879b497', 'X-Provider': 'NIUBIZ', 'Content-Type': 'application/json'} }).then(res => {
        // this.$axios.$post(process.env.base + 'payment-api/api/v2/tokenize', item, { headers: { 'X-Apikey': '4e657008-bb87-4e89-81bc-0fb62879b497', 'X-Provider': 'NIUBIZ'} }).then(res => {
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
  getSessionKey ({ commit, state }, item) {
    return new Promise((resolve, reject) => {
      // test
      // this.$axios.$post('https://test.interseguro.pe' + '/payment-api/api/v2/session', item, { headers: { 'X-Apikey': 'd717ebcf-d7d9-4173-82e7-2955040df1b7', 'X-Provider': 'NIUBIZ', 'Content-Type': 'application/json'} }).then(res => {
      // te
      this.$axios.$post(process.env.base + 'payment-api/api/v2/session', item, { headers: { 'X-Apikey': process.env.configNiubiz.apiKey, 'X-Provider': 'NIUBIZ', 'Content-Type': 'application/json'} }).then(res => {
        if (res) {
          commit('setSessionKey', res.data.sessionKey)
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
  getTokenCulqi ({ commit }, item) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('https://secure.culqi.com/v2/tokens', item, { headers: { 'Authorization': 'bearer ' + process.env.culqiPK } }).then(res => {
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
  // getTokenNiubiz ({ commit }, item) {
  //   return new Promise((resolve, reject) => {
  //     this.$axios.$post('https://secure.culqi.com/v2/tokens', item, { headers: { 'Authorization': 'bearer ' + process.env.culqiPK } }).then(res => {
  //       if (res) {
  //         resolve(res)
  //       } else {
  //         reject(res)
  //       }
  //     })
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // },
  generatePolizaToCoverageAdicional  ({ state, commit, rootState }, item) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base +  'vida-api-cash-regular/v1/' + 'polizas/generar', item,{ headers: { 'X-TransactionID': rootState.common.trackingId } } ).then(res => {
        if (res) {
          commit('setNumeroPoliza', res.data.numeroPoliza)
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
  generatePoliza ({ state, commit, rootState }, item) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('polizas/', item,{ headers: { 'X-TransactionID': rootState.common.trackingId } } ).then(res => {
        if (res) {
          commit('setNumeroPoliza', res.data.numeroPoliza)
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
  generatePolizaWithout ({ state, commit, rootState  }, item) { // no tiene descuentooooo
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base +  'vida-api-cash-regular/v1/' + 'polizas/', item,{ headers: { 'X-TransactionID': rootState.common.trackingId } } ).then(res => {
        if (res) {
          commit('setNumeroPoliza', res.data.numeroPoliza)
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
  updateCard ({ commit }, item) {
    return new Promise((resolve, reject) => {
      // dev
      // this.$axios.$put(process.env.base + 'payment-cash/api/v1/subscriptions/card', item, { headers: { 'X-ApiKey': '4e657008-bb87-4e89-81bc-0fb62879b497', 'X-TimeZone': 'America/Lima' } }).then(res => {
      // prod
      this.$axios.$put(process.env.base + 'payment-cash/api/v1/subscriptions/card', item, { headers: { 'X-ApiKey': 'f5436030-21c4-40b3-8778-36091b86350f', 'X-TimeZone': 'America/Lima' } }).then(res => {
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
  getPoliza ({ commit }, idPoliza) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(process.env.base + 'vida-api-cash/v1/polizas/' + idPoliza)
        .then(res => {
          if (res.data) {
            commit('setNumeroPolizaUpdate', res.data.numeroPoliza)
            commit('setNombre', res.data.asegurado.nombre)
            commit('setSubscriptionId', res.data.idSubscripcion)
            commit('setNombreCompleto', res.data.asegurado.nombre + ' ' + res.data.asegurado.apellidoPaterno + ' ' + res.data.asegurado.apellidoMaterno)
            commit('setCorreo', res.data.asegurado.email)
            commit('setSumaAsegurada', res.data.detalles[0].sumaAsegurada.toString())
            commit('setPrimaRecurrente', res.data.detalles[0].primaRecurrente)
            commit('setFrecuenciaPago', res.data.frecuenciaPago)
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
  getPolizaWithout ({ commit }, idPoliza) {
    return new Promise((resolve, reject) => {
      this.$axios.$get(process.env.base + 'vida-api-cash-regular/v1/polizas/' + idPoliza)
        .then(res => {
          if (res.data) {
            commit('setNumeroPolizaUpdate', res.data.numeroPoliza)
            commit('setNombre', res.data.asegurado.nombre)
            commit('setSubscriptionId', res.data.idSubscripcion)
            commit('setNombreCompleto', res.data.asegurado.nombre + ' ' + res.data.asegurado.apellidoPaterno + ' ' + res.data.asegurado.apellidoMaterno)
            commit('setCorreo', res.data.asegurado.email)
            commit('setSumaAsegurada', res.data.detalles[0].sumaAsegurada.toString())
            commit('setPrimaRecurrente', res.data.detalles[0].primaRecurrente)
            commit('setFrecuenciaPago', res.data.frecuenciaPago)
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
  updatePoliza ({ state, commit, rootState }, client) {
    return new Promise((resolve, reject) => { // asegurado: { apellidoMaterno, apellidoPaterno, email, nombre, numeroDocumento, numeroTelefono
      this.$axios.$put('polizas', client, { headers: { 'X-TransactionID': rootState.common.trackingId } }) // beneficiarios: [{apellidoMaterno, apellidoPaterno, idParentesco, nombre, numeroDocumento, parentesco, participacion}]
        .then(res => { // numeroPoliza
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
  updatePolizaWithout ({ state, commit, rootState }, client) {
    return new Promise((resolve, reject) => { // asegurado: { apellidoMaterno, apellidoPaterno, email, nombre, numeroDocumento, numeroTelefono
      this.$axios.$put(process.env.base + 'vida-api-cash-regular/v1/' + 'polizas', client, { headers: { 'X-TransactionID': rootState.common.trackingId } }) // beneficiarios: [{apellidoMaterno, apellidoPaterno, idParentesco, nombre, numeroDocumento, parentesco, participacion}]
        .then(res => { // numeroPoliza
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
  sendPoliza ({ state, commit, rootState }, client) { // email, numeroPoliza
    return new Promise((resolve, reject) => {
      this.$axios.$post('polizas/sme/forward', client, { headers: { 'X-TransactionID': rootState.common.trackingId } })
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
  sendPolizaWithout ({ state, commit, rootState }, client) { // email, numeroPoliza
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base + 'vida-api-cash-regular/v1/' + 'polizas/sme/forward', client, { headers: { 'X-TransactionID': rootState.common.trackingId } })
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
  saveClientPlaft ({ commit }, client) { // email, numeroPoliza
    return new Promise((resolve, reject) => {
      this.$axios.$post(process.env.base + 'vida-api-cash-regular/v1/' + 'clientes/plaft', client)
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
  /*********************************************************
                * Servicios consentimiento
    *********************************************************/
   consultaUniversal ({ commit, state }, item) {
    return new Promise((resolve, reject) => {
        this.$axios.$post(process.env.consentimientoGetExt,item)
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
  consentimientoPublico ({ commit, state }, item) {
      return new Promise((resolve, reject) => {
          this.$axios.$post(process.env.consentimientoPostExt, item)
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
