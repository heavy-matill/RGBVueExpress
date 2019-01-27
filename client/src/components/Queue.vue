<template>
  <div class="queue">
    <h1>Queue here</h1>
    <input type="checkbox" v-model="selectMultiple">Select multiple items
    <li v-for="(animationData, index) in animationDatas" :key="animationData.id">
      {{animationData.id}}
      {{index}}
      <Animation :index="index" :id="animationData.id" :showId="showId" :selectMultiple="selectMultiple" :animationData="animationData"
      @selected="onSelected"
      @unselected="onUnSelected"
      @add="onAdd"
      @move="onMove"
      @remove="onRemove"
      @changeMode="onChangeMode"
      @changeT="onChangeT"
      @changeP="onChangeP"
      @changeNr="onChangeNr"
      @changeBr="onChangeBr"
      />
    </li>
  </div>
</template>

<script>
import Animation from './Animation'

export default {
  name: 'Queue',
  data () {
    return {
      animationDatas: [
        {id: 0, mode: 0, c1: {r: 255, g: 0, b: 0}, c2: {r: 0, g: 255, b: 0}, t: 9, p: 70, nr: 4, br: true, selected: false},
        {id: 1, mode: 1, c1: {r: 0, g: 255, b: 0}, c2: {r: 0, g: 0, b: 255}, t: 50, p: 20, nr: 1, br: true, selected: true}],
      showId: 1,
      selectMultiple: false,
      nextId: 2
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
      if (value === this.showId) {
        for (let animationData of this.animationDatas) {
          if (animationData.selected) {
            this.showId = animationData.id
            return
          }
        }
        this.showId = -1
      }
    },
    onAdd (value) {
      this.animationDatas.splice(value[0], 0, JSON.parse(JSON.stringify(this.animationDatas[value[0]])))
      this.animationDatas[value[0] + 1].id = this.nextId++
    },
    onMove (value) {
      // check if element elements are out of bounds
      if (!(((value[0] + value[1]) < 0) || ((value[0] + value[1]) >= this.animationDatas.length))) {
        // switch elements
        let tempAnimationData = this.animationDatas[value[0]]
        this.animationDatas[value[0]] = this.animationDatas[value[0] + value[1]]
        this.animationDatas[value[0] + value[1]] = tempAnimationData
        this.$forceUpdate()
      }
    },
    onRemove (value) {
      this.animationDatas.splice(value, 1)
    },
    onChangeMode (setMode, id) {
      for (let animationData of this.animationDatas) {
        if (animationData.selected && (animationData.id !== id)) {
          animationData.mode = setMode
        }
      }
      this.$forceUpdate()
    },
    onChangeT (setT, id) {
      for (let animationData of this.animationDatas) {
        if (animationData.selected && (animationData.id !== id)) {
          animationData.t = setT
        }
      }
      this.$forceUpdate()
    },
    onChangeP (setP, id) {
      for (let animationData of this.animationDatas) {
        if (animationData.selected && (animationData.id !== id)) {
          animationData.p = setP
        }
      }
    },
    onChangeNr (setNr, id) {
      for (let animationData of this.animationDatas) {
        if (animationData.selected && (animationData.id !== id)) {
          animationData.nr = setNr
        }
      }
    },
    onChangeBr (setBr, id) {
      for (let animationData of this.animationDatas) {
        if (animationData.selected && (animationData.id !== id)) {
          animationData.br = setBr
        }
      }
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
