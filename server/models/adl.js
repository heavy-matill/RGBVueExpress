const mongoose = require('mongoose')

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
  //c1: colorSchema, //nesting not available in mongoose ~4.0.0
  //c2: colorSchema,
  c1: {
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
  },
  c2: {
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
  },
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

const adlSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  animationDataList: {
    type: [animationDataSchema],
    require: true
  }
}, {
  timestamps: true
})

// Export AnimationDataList model
var AnimationDataList = module.exports = mongoose.model('adl', adlSchema)

module.exports.get = function (callback, limit) {
  AnimationDataList.find(callback).limit(limit)
}
