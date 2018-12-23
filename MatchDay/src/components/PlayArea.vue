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
    <v-btn @click="onResetDeckClick()">Reset</v-btn>
    <v-btn @click="royalFlush()">Royal flush</v-btn>
    <v-btn @click="fourOfAKind()">Four of a kind</v-btn>
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
        orderedRanks.push(card.rank)
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
      if (orderedRanks[0] === '1' && 
          orderedRanks[1] === '10' && 
          orderedRanks[2] === '11' &&
          orderedRanks[3] === '12' &&
          orderedRanks[4] === '13' &&
          allEqual(finalSuits)) {
        console.log("You got royal flush!")
      }
      //4 of a kind
      ranksFor4ofaKind = orderedRanks
      // ranksFor4ofaKind.splice(0,1)
      if (allEqual(ranksFor4ofaKind.slice(0,3)) || 
          allEqual(ranksFor4ofaKind.slice(1,4))) {
        console.log("You got neloset!")
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
      
    },
    flush () {
      
    },
    straight () {
      
    },
    ThreeOfAKind () {
      
    },
    twoPairs () {
      
    },
    pair10A () {
      
    }
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


