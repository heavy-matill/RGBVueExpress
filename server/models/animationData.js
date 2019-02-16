const mongoose = require('mongoose')
// {id: 0, mode: 0, c1: {r: 255, g: 0, b: 0}, c2: {r: 0, g: 255, b: 255}, t: 9, p: 70, nr: 4, br: true, selected: false},
      
const colorSchema = mongoose.Schema({
  r: {
    type: Number,
    default: 127,
    min: 0,
    max: 255
  },
  g: {
    type: Number,
    default: 127,
    min: 0,
    max: 255
  },
  b: {
    type: Number,
    default: 127,
    min: 0,
    max: 255
  }  
})
const animationDataSchema = mongoose.Schema({
  id: { 
    type: Number,
    min: 0
  },
  mode: { 
    type: Number,
    default: 1,
    min: 0,
    max: 3
  },
  c1: colorSchema,
  c2: colorSchema,
  t: {
    type: Number,
    default: 1,
    min: 0,
    max: 65.535
  },
  p: {
    type: Number,
    default: 50,
    min: 0,
    max: 100
  },
  nr: {
    type: Number,
    default: 4,
    min: 0,
    max: 255
  },
  br: {
    type: Boolean,
    default: true
  }
})

// Export animationData model
var AnimationData = module.exports = mongoose.model('animationData', animationDataSchema)
