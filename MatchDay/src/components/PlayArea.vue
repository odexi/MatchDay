<template>
<div style="width: 100%; height: 80%">
  <h2>Cards here:</h2>
  <div 
    class="card-area" 
    style="background-color: green; width: 100%; height: 20%;"
    >
    <div>

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
      ]
    }
  },
  methods: {
    onDealCardsClick () {
      this.$store.dispatch('dealCards', {ranks: this.ranks, suits: this.suits})
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
      return Math.floor(Math.random() * Math.floor(this.deck.length - 1));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
