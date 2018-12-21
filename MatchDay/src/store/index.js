import Vue from 'vue'
import Vuex from 'vuex'
import Card from '@/models/card'
import guid from 'uuid/v4'

Vue.use(Vuex)

const state = {
    deck: [],
    hand: [],
    choices: [],
}

const getters = {

}

const actions = {
    firstDraw ({ commit }, payload) {
        commit ('firstDraw', payload)
    },
    lastDraw ({ commit }, lastCards) {
        commit ('lastDraw', lastCards)
    },
    resetDeck ({ commit }, payload) {
        commit ('resetDeck', payload)
    },
    removeCardFromDeck ({ commit }, id) {
        commit ('removeCardFromDeck', id)
    },
}

const mutations = {
    firstDraw (state, payload) {
        state.hand = payload.hand;
        state.choices = payload.choices;

        console.log("First draw:")
        for (let card of state.deck) {
            console.log(card.suit, card.rank)
        }
    },
    lastDraw (state, lastCards) {
        state.hand = state.hand.concat(lastCards)
        state.choices = [];

        console.log("Last draw:")
        for (let card of state.deck) {
            console.log(card.suit, card.rank)
        }
    },
    resetDeck (state, payload) {
        state.deck = [];
        state.hand = [];
        state.choices = [];
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
        for (let card of state.deck) {
            console.log(card.suit, card.rank)
        }
        
    },

    removeCardFromDeck (state, id) {
        state.deck.splice(state.deck.indexOf(state.deck.find(d => d.id === id)), 1);
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