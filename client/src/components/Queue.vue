<template>
  <div class="queue">
    <v-container class="configuration"
      fluid
      grid-list-lg>
      <h2>Quick actions</h2>
      <v-card>
        <v-layout row wrap>

          <v-flex>
            <h3>Quick-Mode</h3>
            <v-radio-group v-model="modeString" row @change="changeMode">
              <v-radio label="Jump" value="0"/>
              <v-radio label="Fade" value="1"/>
              <v-radio label="Strobe" value="2"/>
              <v-radio label="Pulse" value="3"/>
            </v-radio-group>
          </v-flex>

          <v-flex>
            <h3>Quick-Colors</h3>
            <v-radio-group v-model="quickColorString" row>
              <v-radio label="RGB" value="RGB"/>
              <v-radio label="Random" value="Random"/>
            </v-radio-group>
          </v-flex>

          <v-flex>
            <h3>Synchronization</h3>
            <v-layout align-left justify-left row fill-height>
              <v-btn @click="quickStartRandom"><v-icon left dark>mdi-shuffle-variant</v-icon>Random</v-btn>
              <v-btn @click="quickStartSynchronous"><v-icon left dark>mdi-shuffle-disabled</v-icon>Synced</v-btn>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-card>

      <h2>General settings</h2>
      <v-card>
        <v-layout row wrap>
          <v-flex>
            <div class="sliderRow">
              <v-slider
                v-model="brightness"
                label="Brightness"
                min=0
                max=100
                step=5
                prepend-icon="mdi-brightness-6"/>
              <v-text-field
                class="mt-0"
                v-model="brightness"
                hide-details
                single-line
                suffix="%"
                min=0
                max=100
                step=5
                type="number"/>
            </div>
          </v-flex>

          <v-flex>
            <div class="sliderRow">
              <v-slider
                v-model="speed"
                label="Speed"
                min=25
                max=250
                step=5
                prepend-icon="mdi-speedometer"/>
              <v-text-field
                class="mt-0"
                v-model="speed"
                hide-details
                single-line
                suffix="%"
                min=25
                max=250
                step=5
                type="number"/>
            </div>
          </v-flex>

          <v-flex>
            <h3>Controls</h3>
            <v-layout align-left justify-left row fill-height>
              <v-btn color="success" @click="playAnimation"><v-icon left dark>mdi-play</v-icon>Play</v-btn>
              <v-btn color="warning" @click="pauseAnimation"><v-icon left dark>mdi-pause</v-icon>Pause</v-btn>
              <v-btn color="error" @click="stopAnimation"><v-icon left dark>mdi-stop</v-icon>Stop</v-btn>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-card>

      <h2>Configuration</h2>
      <v-card>
        <v-layout row wrap>
          <v-flex>
            <h3>Save and load</h3>
            <v-layout row wrap>
              <v-flex>
                <v-autocomplete v-bind:items="adlNames" v-model="adlNameSelected"
                  label="Select"
                  hint="Select or create new item"
                  no-data-text="Confirm new with Enter"
                  @keyup.native.enter="addAdlName"
                  ></v-autocomplete>
              </v-flex>
              <v-flex>
                <v-layout>
                  <v-btn color="success" @click="saveAdl"><v-icon left>mdi-floppy</v-icon>Save</v-btn>
                  <v-btn color="warning" @click="loadAdl" :disabled="adlNameSelected === adlNameExtra"><v-icon left>mdi-cloud-download</v-icon>Load</v-btn>
                  <v-btn color="info" @click="appendAdl" :disabled="adlNameSelected === adlNameExtra"><v-icon left>mdi-library-plus</v-icon>Append</v-btn>
                  <v-btn color="error" @click="deleteAdl" :disabled="adlNameSelected === adlNameExtra"><v-icon left>mdi-delete</v-icon>Delete</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>

      <h2>Queue</h2>
      <v-card>
        <v-layout row wrap>
          <v-flex>
            <h3>Select</h3>
            <v-layout align-left justify-left row fill-height>
              <v-btn @click="selectAll"><v-icon left>mdi-checkbox-multiple-marked-outline</v-icon>All</v-btn>
              <v-btn @click="unselectAll"><v-icon left>mdi-checkbox-multiple-blank-outline</v-icon>None</v-btn>
            </v-layout>
          </v-flex>

          <v-flex>
            <h3>Queue commands</h3>
            <v-layout align-left justify-left row fill-height>
              <v-btn @click="sendQueue"><v-icon left dark>mdi-file-move</v-icon>Send</v-btn>
              <v-btn @click="appendQueue"><v-icon left dark>mdi-file-plus</v-icon>Append</v-btn>
              <v-btn @click="resetQueue"><v-icon left dark>mdi-file-outline</v-icon>Reset</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <li v-for="(animationData, index) in animationDataList" :key="animationData.id+
        animationData.c1+
        animationData.c2+
        animationData.t+
        animationData.selected+
        animationData.mode">
          <Animation :index="index" :id="animationData.id" :showId="showId" :animationData="animationData"
          @unselectAll="unselectAll"
          @add="add"
          @move="move"
          @remove="remove"
          @load="load"
          />
        </li>
      </v-card>
      <h2>Settings</h2>
      <v-card>
        <table class="color-settings"><tr>
          <td>
            <h3>Color 1</h3>
          </td>
          <td>
            <h3>Color 2</h3>
          </td>
          </tr>
          <tr>
            <td class="color-settings">
              <sketch-picker v-model="cp1"/>
            </td>
            <td>
              <sketch-picker v-model="cp2"/>
            </td>
          </tr>
        </table>
      </v-card>
      <v-card>
        <h3>Mode</h3>
        <v-radio-group v-model="modeString" row @change="changeMode">
          <v-radio label="Jump" value="0"/>
          <v-radio label="Fade" value="1"/>
          <v-radio label="Strobe" value="2"/>
          <v-radio label="Pulse" value="3"/>
        </v-radio-group>
      </v-card>
      <v-card>
        <h3>Configuration</h3>
        <div class="sliderRow">
          <v-slider
            v-model="t"
            label="Duration"
            prepend-icon="mdi-watch"
            @change="changeT"
            style="width: 300px;"/>
          <v-text-field
            class="mt-0"
            v-model="t"
            hide-details
            single-line
            @change="changeT"
            suffix="s"
            type="number"
            style="width: 100px;"/>
        </div>
        <div class="sliderRow">
          <v-slider
            v-model="p"
            label="On-Time"
            prepend-icon="mdi-percent"
            @change="changeP"/>
          <v-text-field
            class="mt-0"
            v-model="p"
            hide-details
            single-line
            @change="changeP"
            suffix="%"
            type="number"/>
        </div>
        <div class="sliderRow">
          <v-slider
            v-model="nr"
            label="Repetitions"
            prepend-icon="mdi-repeat"
            @change="changeNr"/>
          <v-text-field
            class="mt-0"
            v-model="nr"
            hide-details
            single-line
            @change="changeNr"
            type="number"/>
        </div>
        <div class="sliderRow">
          <v-switch
            v-model="br"
            prepend-icon="mdi-reload"
            :label="`Re-Queue: ${br.toString()}`"/>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Animation from './Animation'
import { Sketch } from 'vue-color'
import axios from 'axios'

export default {
  name: 'Queue',
  data () {
    return {
      animationDataList: [
        {id: 0, mode: 0, c1: {r: 255, g: 0, b: 0}, c2: {r: 0, g: 255, b: 255}, t: 9, p: 70, nr: 4, br: true, selected: false},
        {id: 1, mode: 1, c1: {r: 0, g: 255, b: 0}, c2: {r: 0, g: 0, b: 255}, t: 50, p: 20, nr: 1, br: true, selected: true}],
      showId: 1,
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
      br: true,
      adlNameExtra: '',
      adlNameSelected: '',
      adlIds: {},
      quickColorString: 'RGB',
      brightness: 100,
      speed: 100
    }
  },
  components: {
    Animation,
    'sketch-picker': Sketch
  },
  methods: {
    add (value) {
      this.animationDataList.splice(value[0], 0, JSON.parse(JSON.stringify(this.animationDataList[value[0]])))
      this.animationDataList[value[0] + 1].id = this.nextId++
    },
    move (value) {
      // check if element elements are out of bounds
      if (!(((value[0] + value[1]) < 0) || ((value[0] + value[1]) >= this.animationDataList.length))) {
        // switch elements
        let tempAnimationData = this.animationDataList[value[0]]
        this.animationDataList[value[0]] = this.animationDataList[value[0] + value[1]]
        this.animationDataList[value[0] + value[1]] = tempAnimationData
        this.$forceUpdate()
      }
    },
    remove (value) {
      if (this.animationDataList.length > 1) {
        this.animationDataList.splice(value, 1)
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
      for (let animationData of this.animationDataList) {
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
      // this.$forceUpdate()
    },
    changeC2 () {
      for (let animationData of this.animationDataList) {
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
      // this.$forceUpdate() unneccessary because colors are key: in v-for
    },
    changeMode () {
      for (let animationData of this.animationDataList) {
        if (animationData.selected) {
          animationData.mode = this.mode
        }
      }
      // this.$forceUpdate() unneccessary because mode is key: in v-for
    },
    changeT () {
      for (let animationData of this.animationDataList) {
        if (animationData.selected) {
          animationData.t = this.t
        }
      }
      // this.$forceUpdate() unneccessary because t is key: in v-for
    },
    changeP () {
      for (let animationData of this.animationDataList) {
        if (animationData.selected) {
          animationData.p = this.p
        }
      }
    },
    changeNr () {
      for (let animationData of this.animationDataList) {
        if (animationData.selected) {
          animationData.nr = this.nr
        }
      }
    },
    changeBr () {
      for (let animationData of this.animationDataList) {
        if (animationData.selected) {
          animationData.br = this.br
        }
      }
    },
    selectAll () {
      for (let animationData of this.animationDataList) {
        animationData.selected = true
      }
    },
    unselectAll () {
      for (let animationData of this.animationDataList) {
        animationData.selected = false
      }
    },
    printAll () {
    },
    getAdls () {
      axios
        .get('http://localhost:3000/adl')
        .then(res => {
          this.adlIds = {}
          for (let obj of res.data.data) {
            this.adlIds[obj.name] = obj._id
          }
        })
    },
    saveAdl () {
      if (Object.keys(this.adlIds).indexOf(this.adlNameSelected) >= 0) {
        axios
          .put('http://localhost:3000/adl/' + this.adlIds[this.adlNameSelected], {
            animationDataList: this.animationDataList
          })
      } else {
        axios
          .post('http://localhost:3000/adl', {
            name: this.adlNameSelected,
            animationDataList: this.animationDataList
          })
          .then(res => {
            this.adlNameExtra = ''
            this.getAdls()
          })
      }
    },
    loadAdl () {
      axios
        .get('http://localhost:3000/adl/' + this.adlIds[this.adlNameSelected])
        .then(res => {
          for (let animationData of res.data.data.animationDataList) {
            animationData.id = this.nextId++
          }
          this.animationDataList = res.data.data.animationDataList
        })
    },
    appendAdl () {
      axios
        .get('http://localhost:3000/adl/' + this.adlIds[this.adlNameSelected])
        .then(res => {
          for (let animationData of res.data.data.animationDataList) {
            animationData.id = this.nextId++
            this.animationDataList.push(animationData)
          }
        })
    },
    deleteAdl () {
      axios
        .delete('http://localhost:3000/adl/' + this.adlIds[this.adlNameSelected])
        .then(res => {
          this.getAdls()
        })
    },
    addAdlName (e) {
      // if the element does not exists in adldls keys
      if (Object.keys(this.adlIds).indexOf(e.target.value) < 0) {
        // set it as adlNameExtra
        this.adlNameExtra = e.target.value
        this.adlNameSelected = e.target.value
      } else {
        this.adlNameExtra = ''
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
    },
    adlNames: {
      get: function () {
        let adlNamesTemp = Object.keys(this.adlIds)
        if (this.adlNameExtra !== '') {
          adlNamesTemp.push(this.adlNameExtra)
        }
        return adlNamesTemp
      }
    },
    modeString: {
      get: function () {
        return String(this.mode)
      },
      set: function () {
        this.mode = Number(this.modeString)
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
  },
  mounted () {
    this.getAdls()
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
  padding: 10px 10px 0;
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

.configuration .v-btn {
  min-width: 0;
}
.configuration .btn__content  {
  padding: 0;
}
.configuration .v-card  {
  padding: 5px;
}
.settings .color-settings .vc-sketch-saturation-wrap {
  padding-bottom: 35%;
  /* TODO: Check if you can change css of color picker or how it is declared so you can overwrite */
}
.vc-sketch {
  border-radius: None;
  box-shadow: None;
  width: 90%;
  background-color: None;
}
.sliderRow {
  display: inline-block;
  width:100%;
}
.sliderRow .v-input--slider{
  float: left;
  width: 300px;
  margin-right: 20px;
}
.sliderRow .v-text-field{
  float: left;
  width: 80px;
}
/*
.vc-sketch-alpha-wrap {
  visibility: hidden !important;
}
.vc-sketch-alpha-wrap * {
  visibility: hidden !important;
}
.vc-sketch-hue-wrap {
    position: relative;
    height: 16px;
}
.vc-sketch-color-wrap {
    width: 24px;
    height: 24px;
    position: relative;
    margin-top: 4px;
    margin-left: 4px;
    border-radius: 3px;
}*/
</style>
