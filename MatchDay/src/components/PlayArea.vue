<template>
<div style="width: 100%; height: 80%">
  <h2>Cards here:</h2>
  <div 
    class="card-area" 
    style="background-color: green; width: 100%; height: 20%;"
    >
    <div>
        <!-- <img src="../assets/card-images/4H.png" /> -->
        <!-- <img 
        style="width: 25px; height: 36px;"
        :src="'../assets/card-images/' + fileName"
        />
      <v-card
        v-if="hand[0]"
        :style="{ 
          'height': '50px',
          'width': '50px',
          'background-image': 'url(../assets/card-images/11H.png' + ')', 
          'background-color': 'transparent', 'box-shadow':'none' 
          }">
      </v-card> -->
        <!-- <p class="card">{{ hand[0].suit }} {{ hand[0].rank }}</p> -->
        <div v-if="hand[0]">
        <p class="card">{{ hand[0].suit }} {{ hand[0].rank }}</p>
      </div>
      <div v-if="hand[1]">
        <p class="card">{{ hand[1].suit }} {{ hand[1].rank }}</p>
      </div>
      <div v-if="hand[2]">
        <p class="card">{{ hand[2].suit }} {{ hand[2].rank }}</p>
      </div>
      <div v-else-if="!hand[2] && visible.length > 0">
        <v-btn @click="onChoiceClick(0)">{{ visible[0].suit }} {{ visible[0].rank }}</v-btn>
      </div>
      <div v-if="hand[3]">
        <p class="card">{{ hand[3].suit }} {{ hand[3].rank }}</p>
      </div>
      <div v-else-if="!hand[3] && visible.length > 0">
        <v-btn @click="onChoiceClick(1)">{{ visible[1].suit }} {{ visible[1].rank }}</v-btn>
      </div>
      <div v-if="hand[4]">
        <p class="card">{{ hand[4].suit }} {{ hand[4].rank }}</p>
      </div>
    </div>
  </div>
  <div>
    <v-btn @click="onDealCardsClick()" :disabled="choices.length > 0">Deal</v-btn>
    <v-btn @click="onResetDeckClick()">Reset</v-btn><br>
    <v-btn @click="royalFlush()">Royal flush</v-btn><br>
    <v-btn @click="straightFlush()">Straight flush</v-btn><br>
    <v-btn @click="fourOfAKind()">Four of a kind</v-btn><br>
    <v-btn @click="fullHouse()">Fullhouse</v-btn><br>
    <v-btn @click="flush()">Flush</v-btn><br>
    <v-btn @click="straight()">Straight</v-btn><br>
    <v-btn @click="threeOfAKind()">Three of a kind</v-btn><br>
    <v-btn @click="twoPairs()">Two pairs</v-btn><br>
    <v-btn @click="pair10A()">pair10-A</v-btn><br>
  </div>
  <div v-if="resultReady">

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
    visible: {
      get () {
        return this.choices.visible ? this.choices.visible : []
      }
    },
    hidden: {
      get () {
        return this.choices.hidden ? this.choices.hidden : []
      }
    },
  },
  data () {
    return {
      imagePath: '../assets/card-images/',
      resultReady: false,
      fileName: '5H',
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
    getImage () {
        return this.imagePath + '4H.png'
    },
    onDealCardsClick () {
      let drewCards = [];
      let choices = {
        hidden: [],
        visible: []
      }

      this.resetDeck();

      for (let i = 0; i < 2; i++) {
        let randomCard = this.getRandomCard();
        drewCards.push(randomCard)
        this.removeCardFromDeck(randomCard.id)
      }

      for (let i = 0; i < 2; i++) {
        for (let k = 0; k < 2; k++) {
          let randomOptionCard = this.getRandomCard();
          choices.hidden.push(randomOptionCard)
          this.removeCardFromDeck(randomOptionCard.id)
        }

        let randomOptionCard = this.getRandomCard();
        choices.visible.push(randomOptionCard)
        this.removeCardFromDeck(randomOptionCard.id)
      }
      
      this.$store.dispatch('firstDraw', {hand: drewCards, choices: choices})
    },
    onChoiceClick (value) {
      this.$store.dispatch('lastDraw', value)
      console.log("Hand: ", this.hand)
      this.handleResult();
    },
    handleResult () {
      const allEqual = arr => arr.every( v => v === arr[0] )
      let orderedRanks = []
      let finalSuits = []
      for (let card of this.hand) {
        orderedRanks.push(parseInt(card.rank))
        finalSuits.push(card.suit)
      }
      orderedRanks.sort(function(a, b)
      {return a-b});

      let card1 = this.hand[0]
      let card2 = this.hand[1]
      let card3 = this.hand[2]
      let card4 = this.hand[3]
      let card5 = this.hand[4]
      console.log(orderedRanks)
      console.log(allEqual(finalSuits))
      console.log(orderedRanks[1] + 3)

      let ranksFor4ofaKind = []
      //Royal flush
      if (orderedRanks[0] === 1 && 
          orderedRanks[1] === 10 && 
          orderedRanks[4] === 13 &&
          allEqual(finalSuits)) {
        console.log("You got royal flush!")
      }
      //Straight flush
      if (orderedRanks[4] === orderedRanks[0] + 4 &&
          allEqual(finalSuits)) {
        console.log("You got straight flush!")
      }
      //4 of a kind
      if (allEqual(orderedRanks.slice(0,4)) || 
          allEqual(orderedRanks.slice(1,5))) {
        console.log("You got neloset!")
      }
      //Fullhouse
      if ((allEqual(orderedRanks.slice(0,3)) && 
          allEqual(orderedRanks.slice(3,5))) || (allEqual(orderedRanks.slice(0,2)) && 
          allEqual(orderedRanks.slice(2,5)))) {
        console.log("You got fullhouse!")
      }
      //Flush
      if (allEqual(finalSuits)) {
        console.log("You got flush!")
      }
      //Straight
      if ((orderedRanks[4] === orderedRanks[0] + 4) ||
          (orderedRanks[0] === 1 && 
          orderedRanks[1] === 10 && 
          orderedRanks[4] === 13)) {
        console.log("You got straight!")
      }
      //3 of a kind
      if (allEqual(orderedRanks.slice(0,3)) || 
          allEqual(orderedRanks.slice(1,4)) ||
          allEqual(orderedRanks.slice(2,5))) {
        console.log("You got kolmoset!")
      }
      //Two pairs
      if ((allEqual(orderedRanks.slice(0,2)) &&
          allEqual(orderedRanks.slice(1,3))) || 
          (allEqual(orderedRanks.slice(0,2)) &&
          allEqual(orderedRanks.slice(2,4))) ||
          (allEqual(orderedRanks.slice(0,2)) &&
          allEqual(orderedRanks.slice(3,5))) ||
          (allEqual(orderedRanks.slice(1,3)) &&
          allEqual(orderedRanks.slice(2,4))) ||
          (allEqual(orderedRanks.slice(1,3)) &&
          allEqual(orderedRanks.slice(3,5))) ||
          (allEqual(orderedRanks.slice(2,4)) &&
          allEqual(orderedRanks.slice(3,5)))) {
        console.log("You got two pairs!")
      }



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
    },
    royalFlush () {
      this.$store.state.hand = [{
        rank: '10',
        suit: 'H'
      },
      {
        rank: '11',
        suit: 'H'
      },
      {
        rank: '12',
        suit: 'H'
      },
      {
        rank: '13',
        suit: 'H'
      },
      {
        rank: '1',
        suit: 'H'
      }]

      this.handleResult();
    },
    straightFlush () {
      this.$store.state.hand = [{
        rank: '10',
        suit: 'H'
      },
      {
        rank: '11',
        suit: 'H'
      },
      {
        rank: '8',
        suit: 'H'
      },
      {
        rank: '7',
        suit: 'H'
      },
      {
        rank: '9',
        suit: 'H'
      }]
      this.handleResult();
    },
    fourOfAKind () {
      this.$store.state.hand = [{
        rank: '10',
        suit: 'C'
      },
      {
        rank: '13',
        suit: 'H'
      },
      {
        rank: '10',
        suit: 'S'
      },
      {
        rank: '10',
        suit: 'D'
      },
      {
        rank: '10',
        suit: 'H'
      }]

      this.handleResult();
    },
    fullHouse () {
      this.$store.state.hand = [{
        rank: '10',
        suit: 'C'
      },
      {
        rank: '13',
        suit: 'H'
      },
      {
        rank: '10',
        suit: 'S'
      },
      {
        rank: '10',
        suit: 'D'
      },
      {
        rank: '13',
        suit: 'D'
      }]

      this.handleResult();
    },
    flush () {
      this.$store.state.hand = [{
        rank: '10',
        suit: 'C'
      },
      {
        rank: '9',
        suit: 'C'
      },
      {
        rank: '3',
        suit: 'C'
      },
      {
        rank: '2',
        suit: 'C'
      },
      {
        rank: '13',
        suit: 'C'
      }]

      this.handleResult();
    },
    straight () {
      this.$store.state.hand = [{
        rank: '10',
        suit: 'H'
      },
      {
        rank: '9',
        suit: 'C'
      },
      {
        rank: '11',
        suit: 'S'
      },
      {
        rank: '7',
        suit: 'C'
      },
      {
        rank: '8',
        suit: 'C'
      }]

      this.handleResult();
    },
    threeOfAKind () {
      this.$store.state.hand = [{
        rank: '10',
        suit: 'C'
      },
      {
        rank: '3',
        suit: 'H'
      },
      {
        rank: '10',
        suit: 'S'
      },
      {
        rank: '10',
        suit: 'D'
      },
      {
        rank: '2',
        suit: 'D'
      }]

      this.handleResult();
    },
    twoPairs () {
      this.$store.state.hand = [{
        rank: '10',
        suit: 'C'
      },
      {
        rank: '3',
        suit: 'H'
      },
      {
        rank: '10',
        suit: 'S'
      },
      {
        rank: '3',
        suit: 'D'
      },
      {
        rank: '2',
        suit: 'D'
      }]

      this.handleResult();
    },
    pair10A () {
      
    },
  },
  mounted () {
    this.$store.dispatch('resetDeck', {ranks: this.ranks, suits: this.suits})
  }
}
// <v-card v-else-if="component.componentType ==='imageBox'"
//               class="containerImage"
//               position="relative"
//               v-bind:style="{ 'background-image': 'url(' + apiUploadPath + component.imagePath + ')', 'background-color': 'transparent', 'box-shadow':'none' }">
//             </v-card>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
   color: #f9d6d6; 
  }
</style>


