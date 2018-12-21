<template>
<div style="width: 100%; height: 80%">
  <h2>Cards here:</h2>
  <div 
    class="card-area" 
    style="background-color: green; width: 100%; height: 20%;"
    >
    <div>
      <div v-if="hand[0]">
        <p class="card">{{ hand[0].suit }} {{ hand[0].rank }}</p>
      </div>
      <div v-if="hand[1]">
        <p class="card">{{ hand[1].suit }} {{ hand[1].rank }}</p>
      </div>
      <div v-if="hand[2]">
        <p class="card">{{ hand[2].suit }} {{ hand[2].rank }}</p>
      </div>
      <div v-else-if="!hand[2] && choices[0]">
        <v-btn @click="drawOptionOne()">{{ choices[0].suit }} {{ choices[0].rank }}</v-btn>
      </div>
      <div v-if="hand[3]">
        <p class="card">{{ hand[3].suit }} {{ hand[3].rank }}</p>
      </div>
      <div v-else-if="!hand[3] && choices[1]">
        <v-btn @click="drawOptionTwo()">{{ choices[1].suit }} {{ choices[1].rank }}</v-btn>
      </div>
      <div v-if="hand[4]">
        <p class="card">{{ hand[4].suit }} {{ hand[4].rank }}</p>
      </div>
    </div>
  </div>
  <div>
    <v-btn @click="onDealCardsClick()" :disabled="choices.length > 0">Deal</v-btn>
    <v-btn @click="onResetDeckClick()">Reset</v-btn>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
  
export default {
  computed: {
    ...mapState([
      // 'hand'
    ]),
    deck: {
      get () {
        return this.$store.state.deck;
      }
    },
    hand: {
      get () {
        return this.$store.state.hand;
      }
    },
    choices: {
      get () {
        return this.$store.state.choices;
      }
    },
  },
  data () {
    return {
      ranks: [
        1,2,3,4,5,6,7,8,9,10,11,12,13
      ],
      suits: [
        'S',
        'C',
        'H',
        'D'
      ],
    }
  },
  methods: {
    onDealCardsClick () {
      let drewCards = [];
      let drewChoices = [];

      this.resetDeck();

      for (let i = 0; i < 2; i++) {
        let randomCard = this.getRandomCard();
        drewCards.push(randomCard)
        this.removeCardFromDeck(randomCard.id)

        let randomOptionCard = this.getRandomCard();
        drewChoices.push(randomOptionCard)
        this.removeCardFromDeck(randomOptionCard.id)
      }
      this.$store.dispatch('firstDraw', {hand: drewCards, choices: drewChoices})
    },
    drawOptionOne () {
      let lastThreeCards = []
      lastThreeCards.push(this.choices[0])

      for (let i = 0; i < 2; i++) {
        let randomCard = this.getRandomCard();
        lastThreeCards.push(randomCard)
        this.removeCardFromDeck(randomCard.id)
      }
      this.$store.dispatch('lastDraw', lastThreeCards)
    },
    drawOptionTwo () {
      let lastThreeCards = []
      lastThreeCards.push(this.choices[1])

      for (let i = 0; i < 2; i++) {
        let randomCard = this.getRandomCard();
        lastThreeCards.push(randomCard)
        this.removeCardFromDeck(randomCard.id)
      }
      this.$store.dispatch('lastDraw', lastThreeCards)
    },
    removeCardFromDeck (id) {
      this.$store.dispatch('removeCardFromDeck', id)
    },
    onResetDeckClick () {
      this.resetDeck();
    },
    resetDeck () {
      this.$store.dispatch('resetDeck', {ranks: this.ranks, suits: this.suits})
    },
    getRandomCard () {
      return this.deck[Math.floor(Math.random() * Math.floor(this.deck.length))];
    }
  },
  mounted () {
    this.$store.dispatch('resetDeck', {ranks: this.ranks, suits: this.suits})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
   color: #f9d6d6; 
  }
</style>
