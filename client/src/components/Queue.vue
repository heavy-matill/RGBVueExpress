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
      />
    </li>
    <h1>Settings</h1>
<table>
      <tr>
        <td>
          <input type="radio" v-model="mode" value="0" @change="changeMode">
          Jump
        </td>
        <td>
          <input type="radio" v-model="mode" value="1" @change="changeMode">
          Fade
        </td>
      </tr>
      <tr>
        <td>
          <input type="radio" v-model="mode" value="2" @change="changeMode">
          Strobe
        </td>
        <td>
          <input type="radio" v-model="mode" value="3" @change="changeMode">
          Pulse
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <td>Duration</td>
        <td>
          <input type="range" v-model="posT" @change="changeT">
        </td>
        <td>
          <input type="number" v-model="t" @change="changeT">
        </td>
        <td>s</td>
      </tr>
      <tr>
        <td>On-Time</td>
        <td>
          <input type="range" v-model="p" @change="changeP">
        </td>
        <td>
          <input type="number" v-model="p" @change="changeP">
        </td>
        <td>%</td>
      </tr>
      <tr>
        <td>Repititions</td>
        <td>
          <input type="range" v-model="nr" @change="changeNr">
        </td>
        <td>
          <input type="number" v-model="nr" @change="changeNr">
        </td>
      </tr>
      <tr>
        <td>Re-Queue</td>
        <td>
          <input type="checkbox" v-model="br"  @change="changeBr">
        </td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Animation from './Animation'
import Settings from './Settings'

export default {
  name: 'Queue',
  data () {
    return {
      animationDatas: [
        {id: 0, mode: 0, c1: {r: 255, g: 0, b: 0}, c2: {r: 0, g: 255, b: 255}, t: 9, p: 70, nr: 4, br: true, selected: false},
        {id: 1, mode: 1, c1: {r: 0, g: 255, b: 0}, c2: {r: 0, g: 0, b: 255}, t: 50, p: 20, nr: 1, br: true, selected: true}],
      showId: 1,
      selectMultiple: false,
      nextId: 2,
      selectedId: 0,
      mode: 0,
      c1: {r: 255, g: 0, b: 0},
      c2: {r: 0, g: 255, b: 0},
      t: 9,
      p: 72,
      nr: 4,
      br: true
    }
  },
  components: {
    Animation,
    Settings
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
    changeMode () {
      for (let animationData of this.animationDatas) {
        if (animationData.selected) {
          animationData.mode = this.mode
        }
      }
      this.$forceUpdate()
    },
    changeT () {
      for (let animationData of this.animationDatas) {
        if (animationData.selected) {
          animationData.t = this.t
        }
      }
      this.$forceUpdate()
    },
    changeP () {
      for (let animationData of this.animationDatas) {
        if (animationData.selected) {
          animationData.p = this.p
        }
      }
    },
    changeNr () {
      for (let animationData of this.animationDatas) {
        if (animationData.selected) {
          animationData.nr = this.nr
        }
      }
    },
    changeBr () {
      for (let animationData of this.animationDatas) {
        if (animationData.selected) {
          animationData.br = this.br
        }
      }
    }
  },
  computed: {
    posT: {
      get: function () {
        return logslDur.position(this.t)
      },
      set: function (newPosT) {
        this.t = Math.round(logslDur.value(newPosT) * 100) / 100
      }
    }
  }
}
function LogSlider (options) {
  options = options || {}
  this.minpos = options.minpos || 0
  this.maxpos = options.maxpos || 100
  this.minlval = Math.log(options.minval || 1)
  this.maxlval = Math.log(options.maxval || 100000)

  this.scale = (this.maxlval - this.minlval) / (this.maxpos - this.minpos)
}
LogSlider.prototype = {
  // Calculate value from a slider position
  value: function (position) {
    return Math.exp((position - this.minpos) * this.scale + this.minlval)
  },
  // Calculate slider position from a value
  position: function (value) {
    return this.minpos + (Math.log(value) - this.minlval) / this.scale
  }
}
var logslDur = new LogSlider({maxpos: 100, minval: 0.01, maxval: 65.535})
// var logslRep = new LogSlider({maxpos: 100, minval: 0, maxval: 256}) */
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
