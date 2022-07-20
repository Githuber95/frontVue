/* eslint-disable */

import createPersistedState from 'vuex-persistedstate'

export default function ({ store }) {
  createPersistedState({
    key: 'jwt',
    paths: []
  })(store)
}
