import Vue from 'vue'
import Vuex from 'vuex'
import Card from '@/models/card'

Vue.use(Vuex)

const state = {
    deck: [
        {
            suit: '',
            rank: ''
        }
    ]
}

const getters = {

}

const actions = {
    dealCards ({ commit }, payload) {
        commit ('dealCards', payload)
    }
}

const mutations = {
    dealCards (state, payload) {
        for (let suit of payload.suits) {
            for (let rank of payload.ranks) {
    
                let card = {
                    suit: suit,
                    rank: rank
                }

                state.deck.push(card)
            }
        }
        console.log(payload)
    }
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    // modules: { course, user, modal, essay, records }
  })
  
  export default store