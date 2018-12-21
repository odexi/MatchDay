import Vue from 'vue'
import Vuex from 'vuex'
import Card from '@/models/card'
import guid from 'uuid/v4'

Vue.use(Vuex)

const state = {
    deck: []
}

const getters = {

}

const actions = {
    dealCards ({ commit }, payload) {
        commit ('dealCards', payload)
    },
    removeCardFromDeck ({ commit }, id) {
        commit ('removeCardFromDeck', id)
    }
}

const mutations = {
    dealCards (state, payload) {
        for (let suit of payload.suits) {
            for (let rank of payload.ranks) {
    
                let card = {
                    suit: suit,
                    rank: rank,
                    id: guid()
                }

                state.deck.push(card)
            }
        }
        console.log(payload)
    },

    removeCardFromDeck (state, id) {
        state.deck.splice(state.deck.indexOf(d => d.id === id), 1);
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