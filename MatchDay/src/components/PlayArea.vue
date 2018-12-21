<template>
<div style="width: 100%; height: 80%">
  <h2>Cards here:</h2>
  <div 
    class="card-area" 
    style="background-color: green; width: 100%; height: 20%;"
    >
    <div>
      <div v-if="hand[0]">
        <p>{{ hand[0].suit }} {{ hand[0].rank }}</p>
      </div>
      <div v-if="hand[1]">
        <p>{{ hand[1].suit }} {{ hand[1].rank }}</p>
      </div>
      <div v-if="hand[2]">
        <p>{{ hand[2].suit }} {{ hand[2].rank }}</p>
      </div>
      <div v-else-if="!hand[2] && drawOptions[0]">
        <v-btn @click="drawOptionOne()">{{ drawOptions[0].suit }} {{ drawOptions[0].rank }}</v-btn>
      </div>
      <div v-if="hand[3]">
        <p>{{ hand[3].suit }} {{ hand[3].rank }}</p>
      </div>
      <div v-else-if="!hand[3] && drawOptions[1]">
        <v-btn @click="drawOptionTwo()">{{ drawOptions[1].suit }} {{ drawOptions[1].rank }}</v-btn>
      </div>
      <div v-if="hand[4]">
        <p>{{ hand[4].suit }} {{ hand[4].rank }}</p>
      </div>
      <!-- <div 
      class="locked-cards" 
      v-for="(card) in hand.lockedCards" 
      :key="card.id"
      >
        <p>{{ card.suit }} {{ card.rank }}</p>
      </div>
      <div class="optional-cards"></div>
      
    <v-btn></v-btn> -->
    </div>
    
    <div style="background-color: white; width: 20%; height: 80%;">

    </div>
  </div>
  <div>
    <v-btn @click="onDealCardsClick()">Deal</v-btn>
    <v-btn @click="onRandomCardClick()">Random Card</v-btn>
  </div>
</div>
</template>

<script>

export default {
  computed: {
    deck: {
      get () {
        return this.$store.state.deck;
      }
    },
    randomCard: {
      get () {
        
      }
    },

  },
  data () {
    return {
      ranks: [
        1,2,3,4,5,6,7,8,9,10,11,12,13
      ],
      suits: [
        's',
        'c',
        'h',
        'd'
      ],
      hand: [],
      drawOptions: []
    }
  },
  methods: {
    onDealCardsClick () {
      let drewCards = [];
      let drewOptions = [];

      for (let i = 0; i < 2; i++) {
        let randomCard = this.getRandomCard();
        drewCards.push(randomCard)
        this.removeCardFromDeck(randomCard.id)

        let randomOptionCard = this.getRandomCard();
        drewOptions.push(randomOptionCard)
        this.removeCardFromDeck(randomOptionCard.id)
      }

      this.hand = drewCards;
      this.drawOptions = drewOptions;

      console.log("Hand: ", this.hand)
      console.log("Options: ", this.drawOptions)
    },
    drawOptionOne () {
      let lastThreeCards = []
      lastThreeCards.push(this.drawOptions[0])
    },
    drawOptionTwo () {
      let lastThreeCards = []
      lastThreeCards.push(this.drawOptions[1])
    },
    onRandomCardClick () {
      let randomCard = this.getRandomCard();
      this.removeCardFromDeck(randomCard.id)
      console.log(this.getRandomCard())
    },
    removeCardFromDeck (id) {
      this.$store.dispatch('removeCardFromDeck', id)
    },
    getRandomCard () {
      return this.deck[Math.floor(Math.random() * Math.floor(this.deck.length))];
    }
  },
  mounted () {
    this.$store.dispatch('dealCards', {ranks: this.ranks, suits: this.suits})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
