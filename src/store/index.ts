import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/api'
import { AppState, PackageList } from '@/interfaces'

Vue.use(Vuex)

const state: AppState = {
  packages: null
}

export default new Vuex.Store({
  state,
  mutations: {
    setPackages: (state, payload: PackageList) => {
      state.packages = payload
    }
  },
  actions: {
    getPackages: ({ commit }, text: string) => {
      return Api.getPackages(text).then((res) => {
        commit('setPackages', res.data)
        return res.data
      })
    }
  }
})
