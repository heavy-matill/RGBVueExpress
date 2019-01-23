<template>
  <div class="queue">
    <h1>Queue here</h1>
    <li v-for="animationData in animationDatas" :key="animationData.id">
      {{ animationData.id}}
      <Animation :id="animationData.id" :showId="showId" :animationData="animationData" @selected="onSelected"/>
    </li>
  </div>
</template>

<script>
import Animation from './Animation'

export default {
  name: 'Queue',
  data () {
    return {
      ids: [0, 1],
      animationDatas: [{id: 0, mode: 0, c1: {r: 255, g: 0, b: 0}, c2: {r: 0, g: 255, b: 0}, c3: {r: 0, g: 0, b: 0}, t: 900, p: 70, nr: 4, br: true}, {id: 1, mode: 0, c1: {r: 0, g: 255, b: 0}, c2: {r: 0, g: 0, b: 255}, c3: {r: 0, g: 0, b: 0}, t: 900, p: 70, nr: 4, br: true}],
      showId: 2,
      lid: 9
    }
  },
  components: {
    Animation
  },
  methods: {
    onSelected (value) {
      this.showId = value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
