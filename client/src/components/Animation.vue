<template>
  <div class="animation">
    <h1 v-once>ID: {{id}}</h1>
    <div class="random"
      :style="{backgroundImage: backgroundImage,
      borderStyle: borderStyle,
      display: 'inline-block',
      borderWidth: 'medium'}"
    >
    <div v-on:click="load">
      <input type="checkbox" v-model="animationData.selected">
    </div>
      <table>
        <tr>
          <td>
            <button @click="addAnimation(0)">+</button>
          </td>
          <td>
            <button @click="moveAnimation(-1)">&#8592;</button>
          </td>
          <td>
            <button @click="removeAnimation()">X</button>
          </td>
          <td>
            <button @click="moveAnimation(1)">&#8594;</button>
          </td>
          <td>
            <button @click="addAnimation(1)">+</button>
          </td>
        </tr>
      </table>
    <!--class="animationElement animationElementMarked"
      onclick="loadAnimation(1)"
      style="background-image: linear-gradient(to right, rgb(255, 0, 0) 20%, rgb(0, 0, 255) 80%)"
      id="animationElement1" -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Animation',
  data () {
    return {
      // posT: 10,
      pGradient: 0,
      pGradient2: 0,
      c3: {
        r: 0,
        g: 0,
        b: 0
      }
    }
  },
  props: {
    index: Number,
    id: Number,
    showId: Number,
    selectMultiple: Boolean,
    animationData: {
      mode: Number,
      c1: {
        r: Number,
        g: Number,
        b: Number
      },
      c2: {
        r: Number,
        g: Number,
        b: Number
      },
      c3: {
        r: Number,
        g: Number,
        b: Number
      },
      t: Number,
      p: Number,
      nr: Number,
      br: Boolean,
      selected: Boolean
    }
  },
  computed: {
    backgroundImage: function () {
      switch (parseInt(this.animationData.mode) % 2) {
        case 0:
          return 'linear-gradient(to right, #' + this.c1String + ' ' + this.animationData.p + '%, #' + this.c2String + ' 0)'
        case 1:
          return 'linear-gradient(to right, #' + this.c1String + ' 20%, #' + this.c2String + ' 80%)'
      }
    },
    c1String: function () {
      return this.animationData.c1.r.toString(16).padStart(2, '0') + this.animationData.c1.g.toString(16).padStart(2, '0') + this.animationData.c1.b.toString(16).padStart(2, '0')
    },
    c2String: function () {
      return this.animationData.c2.r.toString(16).padStart(2, '0') + this.animationData.c2.g.toString(16).padStart(2, '0') + this.animationData.c2.b.toString(16).padStart(2, '0')
    },
    modeChange: function () {
      return this.animationData.mode > 1
    },
    borderStyle: function () {
      switch (this.animationData.selected) {
        case true:
          return 'solid;'
        case false:
          return 'hidden;'
      }
    },
    displaySettings: function () {
      switch (this.showId === this.animationData.id) {
        case true:
          return 'block'
        case false:
          return 'none'
      }
    },
    posT: {
      get: function () {
        return logslDur.position(this.animationData.t)
      },
      set: function (newPosT) {
        this.animationData.t = Math.round(logslDur.value(newPosT) * 100) / 100
      }
    }
  },
  watch: {
    modeChange: function () {
      let ctemp = this.animationData.c2
      this.animationData.c2 = this.c3
      this.c3 = ctemp
    }
  },
  methods: {
    load () {
      this.$emit('load', this.animationData)
    },
    addAnimation (position) {
      this.$emit('add', [this.index, position])
    },
    moveAnimation (position) {
      this.$emit('move', [this.index, position])
    },
    removeAnimation (position) {
      this.$emit('remove', this.index)
    },
    changeMode () {
      if (this.selectMultiple) {
        this.$emit('changeMode', this.animationData.mode, this.id)
      }
    },
    changeT () {
      if (this.selectMultiple) {
        this.$emit('changeT', this.animationData.t, this.id)
      }
    },
    changeP () {
      if (this.selectMultiple) {
        this.$emit('changeP', this.animationData.p, this.id)
      }
    },
    changeNr () {
      if (this.selectMultiple) {
        this.$emit('changeNr', this.animationData.nr, this.id)
      }
    },
    changeBr () {
      if (this.selectMultiple) {
        this.$emit('changeBr', this.animationData.br, this.id)
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
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

</style>
