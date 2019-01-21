<template>
  <div class="animation">
    <h1 v-once>ID: {{id}}</h1>
    <div class="random"
      :style="{backgroundImage: backgroundImage,
      borderStyle: borderStyle,
      display: 'inline-block',
      borderWidth: 'medium'}"
    >
    <div v-on:click="select">
      <input type="checkbox" v-model="selected">
    </div>
      <table>
        <tr>
          <td>
            <button class="delButton" onclick="removeAnimation(1)">+</button>
          </td>
          <td>
            <button class="delButton" onclick="removeAnimation(1)">&#8592;</button>
          </td>
          <td>
            <button class="delButton" onclick="removeAnimation(1)">X</button>
          </td>
          <td>
            <button class="delButton" onclick="removeAnimation(1)">&#8594;</button>
          </td>
          <td>
            <button class="delButton" onclick="removeAnimation(1)">+</button>
          </td>
        </tr>
      </table>
    <!--class="animationElement animationElementMarked"
      onclick="loadAnimation(1)"
      style="background-image: linear-gradient(to right, rgb(255, 0, 0) 20%, rgb(0, 0, 255) 80%)"
      id="animationElement1" -->
    </div>
    <section id="settings" :style="{display: displaySettings}">
      <table>
        <tr>
          <td>
            <input type="radio" v-model="mode" value="0">
            Jump
          </td>
          <td>
            <input type="radio" v-model="mode" value="1">
            Fade
          </td>
        </tr>
        <tr>
          <td>
            <input type="radio" v-model="mode" value="2">
            Strobe
          </td>
          <td>
            <input type="radio" v-model="mode" value="3">
            Pulse
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td>Duration</td>
          <td>
            <input type="range" v-model="posT">
          </td>
          <td>
            <input type="number" v-model="t" @change="updatePosT">
          </td>
          <td>s</td>
        </tr>
        <tr>
          <td>On-Time</td>
          <td>
            <input type="range" v-model="p">
          </td>
          <td>
            <input type="number" v-model="p">
          </td>
          <td>%</td>
        </tr>
        <tr>
          <td>Repititions</td>
          <td>
            <input type="range" v-model="nr">
          </td>
          <td>
            <input type="number" v-model="nr">
          </td>
        </tr>
        <tr>
          <td>Re-Queue</td>
          <td>
            <input type="checkbox" v-model="br">
          </td>
          <td></td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Animation',
  data () {
    return {
      mode: '0',
      c1: {
        r: 255,
        g: 129,
        b: 0
      },
      c2: {
        r: 0,
        g: 0,
        b: 255
      },
      c3: {
        r: 0,
        g: 0,
        b: 0
      },
      t: 1025,
      p: 40,
      nr: 0,
      br: false,

      posT: 10,
      pGradient: 0,
      pGradient2: 0,
      selected: false
    }
  },
  props: {
    id: Number
  },
  computed: {
    backgroundImage: function () {
      switch (parseInt(this.mode) % 2) {
        case 0:
          return 'linear-gradient(to right, #' + this.c1String + ' ' + this.p + '%, #' + this.c2String + ' 0)'
        case 1:
          return 'linear-gradient(to right, #' + this.c1String + ' 20%, #' + this.c2String + ' 80%)'
      }
    },
    c1String: function () {
      return this.c1.r.toString(16).padStart(2, '0') + this.c1.g.toString(16).padStart(2, '0') + this.c1.b.toString(16).padStart(2, '0')
    },
    c2String: function () {
      return this.c2.r.toString(16).padStart(2, '0') + this.c2.g.toString(16).padStart(2, '0') + this.c2.b.toString(16).padStart(2, '0')
    },
    modeChange: function () {
      return this.mode > 1
    },
    borderStyle: function () {
      switch (this.selected) {
        case true:
          return 'solid;'
        case false:
          return 'hidden;'
      }
    },
    displaySettings: function () {
      switch (this.selected) {
        case true:
          return 'block'
        case false:
          return 'none'
      }
    }
  },
  mounted: function () {
    this.updatePosT()
  },
  watch: {
    posT: function () {
      this.updateT()
    },
    modeChange: function () {
      let ctemp = this.c2
      this.c2 = this.c3
      this.c3 = ctemp
    }
  },
  methods: {
    updatePosT () {
      this.posT = logslDur.position(this.t)
    },
    updateT () {
      this.t = logslDur.value(this.posT).toFixed(2)
    },
    select () {
      this.selected = !this.selected
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
// var logslRep = new LogSlider({maxpos: 100, minval: 0, maxval: 256})
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
