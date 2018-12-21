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
    <button type="button" @click="onDealCardsClick()">Deal</button>
  </div>
</div>
</template>

<script>
export default {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
