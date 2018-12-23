import Vue from 'vue'
import Vuex from 'vuex'
import Card from '@/models/card'
import guid from 'uuid/v4'

Vue.use(Vuex)

const state = {
    deck: [],
    hand: [],
    choices: {
        visible: [],
        hidden: []
    },
}

const actions = {
    firstDraw ({ commit }, payload) {
        commit ('firstDraw', payload)
    },
    lastDraw ({ commit }, value) {
        commit ('lastDraw', value)
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
    },
    lastDraw (state, value) {
        let lastCards = [];
        if (value === 0) {
            
            lastCards.push(state.choices.visible[0]);
            lastCards.push(state.choices.hidden[0]);
            lastCards.push(state.choices.hidden[1]);
        }
        else {
            lastCards.push(state.choices.visible[1]);
            lastCards.push(state.choices.hidden[2]);
            lastCards.push(state.choices.hidden[3]);
        }
        state.hand = state.hand.concat(lastCards)
        state.choices = {};
    },
    resetDeck (state, payload) {
        state.deck = [];
        state.hand = [];
        state.choices = {};
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
    },
    removeCardFromDeck (state, id) {
        state.deck.splice(state.deck.indexOf(state.deck.find(d => d.id === id)), 1);
    }
}

const store = new Vuex.Store({
    state,
    actions,
    mutations,
  })
  
  export default store