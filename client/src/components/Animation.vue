<template>
  <div class="animation" v-on:click="clickAnimation"
    :style="{backgroundImage: backgroundImage,
    borderStyle: borderStyle,
    display: 'inline-block',
    borderWidth: 'medium'}">
    <div class="upperAnimation">
      <table class="floatLeft">
        <tr>
          <td>
            <v-icon small>mdi-watch</v-icon>{{animationData.t}}
          </td>
          <td>
            <v-icon small>mdi-percent</v-icon>{{animationData.p}}
          </td>
        </tr>
        <tr>
          <td>
            <v-icon small>mdi-repeat</v-icon>{{animationData.nr}}
          </td>
          <td v-if="this.animationData.br" >
            <v-icon small>mdi-reload</v-icon>
          </td>
        </tr>
      </table>
       <table class="floatRight">
        <tr>
          <td>
            <v-icon v-if="!this.animationData.selected" @click="clickSelect">mdi-checkbox-blank-outline</v-icon>
            <v-icon v-if="this.animationData.selected" @click="clickSelect">mdi-checkbox-marked-outline</v-icon>
          </td>
        </tr>
        <tr>
          <td>
            <v-icon @click="clickLoad">mdi-download</v-icon>
          </td>
        </tr>
      </table>
    </div>
    <div class="lowerAnimation">
      <table class="distributeEvenly">
        <tr>
          <td>
            <v-icon @click="addAnimation(0)">mdi-plus</v-icon>
          </td>
          <td>
            <v-icon @click="moveAnimation(-1)">mdi-arrow-left</v-icon>
          </td>
          <td>
            <v-icon @click="removeAnimation()">mdi-delete</v-icon>
          </td>
          <td>
            <v-icon @click="moveAnimation(1)">mdi-arrow-right</v-icon>
          </td>
          <td>
            <v-icon @click="addAnimation(1)">mdi-plus</v-icon>
          </td>
        </tr>
      </table>
    </div>
    <!--class="animationElement animationElementMarked"
      onclick="loadAnimation(1)"
      style="background-image: linear-gradient(to right, rgb(255, 0, 0) 20%, rgb(0, 0, 255) 80%)"
      id="animationElement1" -->
  </div>
</template>

<script>
export default {
  name: 'Animation',
  data () {
    return {
      // posT: 10,
      pGradient: 0,
      pGradient2: 0
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
      t: Number,
      p: Number,
      nr: Number,
      br: Boolean,
      selected: Boolean
    }
  },
  computed: {
    backgroundImage: function () {
      let tempC2String
      if (this.animationData.mode >= 2) {
        tempC2String = '000000'
      } else {
        tempC2String = this.c2String
      }
      switch (parseInt(this.animationData.mode) % 2) {
        case 0:
          return 'linear-gradient(to right, #' + this.c1String + ' ' + this.animationData.p + '%, #' + tempC2String + ' 0)'
        case 1:
          return 'linear-gradient(to right, #' + this.c1String + ' ' + this.animationData.p + '%, #' + tempC2String + ' 100%)'
      }
    },
    c1String: function () {
      return this.animationData.c1.r.toString(16).padStart(2, '0') + this.animationData.c1.g.toString(16).padStart(2, '0') + this.animationData.c1.b.toString(16).padStart(2, '0')
    },
    c2String: function () {
      return this.animationData.c2.r.toString(16).padStart(2, '0') + this.animationData.c2.g.toString(16).padStart(2, '0') + this.animationData.c2.b.toString(16).padStart(2, '0')
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
    selected: function () {
      if (this.animationData.selected) {
        this.$emit('selected', this.id)
      } else {
        this.$emit('unselected', this.id)
      }
    }
  },
  methods: {
    clickAnimation () {
      this.unselectAll()
      this.animationData.selected = true
      this.load()
    },
    load (e) {
      this.$emit('load', this.animationData)
    },
    addAnimation (position, e) {
      this.$emit('add', [this.index, position])
      // eslint-disable-next-line
      if (!e) var e = window.event
      e.cancelBubble = true
      if (e.stopPropagation) e.stopPropagation()
    },
    moveAnimation (position, e) {
      this.$emit('move', [this.index, position])
      // eslint-disable-next-line
      if (!e) var e = window.event
      e.cancelBubble = true
      if (e.stopPropagation) e.stopPropagation()
    },
    removeAnimation (position, e) {
      this.$emit('remove', this.index)
      // eslint-disable-next-line
      if (!e) var e = window.event
      e.cancelBubble = true
      if (e.stopPropagation) e.stopPropagation()
    },
    changeC1 () {
      if (this.selectMultiple) {
        this.$emit('changeMode', this.animationData.c1, this.id)
      }
    },
    changeC2 () {
      if (this.selectMultiple) {
        this.$emit('changeMode', this.animationData.c2, this.id)
      }
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
    },
    unselectAll () {
      this.$emit('unselectAll')
    },
    clickLoad (e) {
      this.load()
      // eslint-disable-next-line
      if (!e) var e = window.event
      e.cancelBubble = true
      if (e.stopPropagation) e.stopPropagation()
    },
    clickSelect (e) {
      this.animationData.selected = !this.animationData.selected
      // eslint-disable-next-line
      if (!e) var e = window.event
      e.cancelBubble = true
      if (e.stopPropagation) e.stopPropagation()
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
.animation td {
  border-radius: 5px;
  background: white;
  opacity: 0.8;
  padding: 3px;
}
.animation td * {
  vertical-align: middle;
}
.animation table {
  border-collapse: separate; /* Or do nothing, this is default */
  border-spacing: 5px; /* Only works if border-collapse is separate */
}
.floatLeft {
  float: left
}
.floatRight {
  float: right
}

</style>
