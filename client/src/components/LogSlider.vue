<template>
  <div class="logslider">
    text
  </div>
</template>

<script>
export default {
  name: 'LogSlider',
  data () {
    return {
      val: 10
    }
  }
}
function LogSliderClass (options) {
  options = options || {}
  this.minpos = options.minpos || 0
  this.maxpos = options.maxpos || 100
  this.minlval = Math.log(options.minval || 1)
  this.maxlval = Math.log(options.maxval || 100000)

  this.scale = (this.maxlval - this.minlval) / (this.maxpos - this.minpos)
}
LogSliderClass.prototype = {
  // Calculate value from a slider position
  value: function (position) {
    return Math.exp((position - this.minpos) * this.scale + this.minlval)
  },
  // Calculate slider position from a value
  position: function (value) {
    return this.minpos + (Math.log(value) - this.minlval) / this.scale
  }
}
// var logslDur = new LogSliderClass({maxpos: 100, minval: 0.01, maxval: 65.535})
// var logslRep = new LogSlider({maxpos: 100, minval: 0, maxval: 256})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
