<template>
  <div class="queue">
    <h1>Queue here</h1>
    <li v-for="animationData in animationDatas" :key="animationData.id">
      {{animationData.id}}
      <Animation :id="animationData.id" :showId="showId" :animationData="animationData" @selected="onSelected" @unselected="onUnSelected"/>
    </li>
  </div>
</template>

<script>
import Animation from './Animation'

export default {
  name: 'Queue',
  data () {
    return {
      animationDatas: [{id: 0, mode: 0, c1: {r: 255, g: 0, b: 0}, c2: {r: 0, g: 255, b: 0}, t: 9, p: 70, nr: 4, br: true, selected: false}, {id: 1, mode: 1, c1: {r: 0, g: 255, b: 0}, c2: {r: 0, g: 0, b: 255}, t: 50, p: 20, nr: 1, br: true, selected: true}],
      showId: 1
    }
  },
  components: {
    Animation
  },
  methods: {
    onSelected (value) {
      this.showId = value
    },
    onUnSelected (value) {
      for (let animationData in this.animationDatas) {
        if (animationData.selected) {
          this.showId = animationData.id
          return
        }
      }
      this.showId = -1
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
