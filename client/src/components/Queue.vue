<template>
  <div class="queue">
    <h1>Queue here</h1>
    <h3>Mutliselection</h3>
    <div class="line">
        <div><v-switch v-model="selectMultiple"
        :label="`Enabled: ${selectMultiple.toString()}`" /></div>
        <div><v-btn @click="selectAll">Select all</v-btn></div>
    </div>
    <li v-for="(animationData, index) in animationDatas" :key="animationData.id">
      {{animationData.id}}
      {{index}}
      <Animation :index="index" :id="animationData.id" :showId="showId" :selectMultiple="selectMultiple" :animationData="animationData"
      @selected="select"
      @unselected="unselect"
      @add="add"
      @move="move"
      @remove="remove"
      @load="load"
      />
    </li>
    <h1>Settings</h1>
    <table><tr>
      <td>
        <h2>Color 1</h2>
      </td>
      <td>
        <h2>Color 2</h2>
      </td>
      </tr>
      <tr>
        <td>
    <sketch-picker v-model="cp1" /></td>
    <td>
    <sketch-picker v-model="cp2" /></td></tr></table>
    <h2>Mode</h2>
    <table class="settings">
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
    <h2>Configuration</h2>
    <table class="settings">
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
        <td>Repetitions</td>
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
import { Sketch } from 'vue-color'

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
      cp1: {r: 255, g: 0, b: 0},
      cp2: {r: 0, g: 255, b: 0},
      t: 9,
      p: 72,
      nr: 4,
      br: true
    }
  },
  components: {
    Animation,
    'sketch-picker': Sketch
  },
  methods: {
    select (value) {
      if (this.showId === -1) {
        this.showId = value
      }
    },
    unselect (value) {
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
    add (value) {
      this.animationDatas.splice(value[0], 0, JSON.parse(JSON.stringify(this.animationDatas[value[0]])))
      this.animationDatas[value[0] + 1].id = this.nextId++
    },
    move (value) {
      // check if element elements are out of bounds
      if (!(((value[0] + value[1]) < 0) || ((value[0] + value[1]) >= this.animationDatas.length))) {
        // switch elements
        let tempAnimationData = this.animationDatas[value[0]]
        this.animationDatas[value[0]] = this.animationDatas[value[0] + value[1]]
        this.animationDatas[value[0] + value[1]] = tempAnimationData
        this.$forceUpdate()
      }
    },
    remove (value) {
      if (this.animationDatas.length > 1) {
        this.animationDatas.splice(value, 1)
      }
    },
    load (animationData) {
      this.mode = animationData.mode
      this.c1 = animationData.c1
      this.c2 = animationData.c2
      this.cp1 = animationData.c1
      this.cp2 = animationData.c2
      this.t = animationData.t
      this.p = animationData.p
      this.nr = animationData.nr
      this.br = animationData.br
    },
    changeC1 () {
      for (let animationData of this.animationDatas) {
        if (animationData.selected) {
          if (this.cp1.rgba) {
            animationData.c1.r = this.cp1.rgba.r
            animationData.c1.g = this.cp1.rgba.g
            animationData.c1.b = this.cp1.rgba.b
          } else {
            // animationData.c1 = this.cp1
          }
        }
      }
      this.$forceUpdate()
    },
    changeC2 () {
      for (let animationData of this.animationDatas) {
        if (animationData.selected) {
          if (this.cp2.rgba) {
            animationData.c2.r = this.cp2.rgba.r
            animationData.c2.g = this.cp2.rgba.g
            animationData.c2.b = this.cp2.rgba.b
          } else {
            // animationData.c2 = this.cp2
          }
        }
      }
      this.$forceUpdate()
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
    },
    selectAll () {
      this.selectMultiple = true
      for (let animationData of this.animationDatas) {
        animationData.selected = true
      }
    },
    unselectAll () {
      if (!this.selectMultiple) {
        for (let animationData of this.animationDatas) {
          animationData.selected = false
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
  },
  watch: {
    cp1: function (val) {
      this.changeC1()
    },
    cp2: function (val) {
      this.changeC2()
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
.settings {
  width: 440px;
  padding: 10px 10px 0;
  box-sizing: initial;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);
}
.settings input[type="number"] {
  width: 60px;
}
.settings input[type="range"] {
  width: 240px;
}
.line {
  display: flex;
  flex-direction: row;
}
.line div {
  margin: 10px;
  text-align: center;
}
</style>
