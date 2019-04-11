var mqtt = require('mqtt')
var rgb = require('./rgb')
//var client  = mqtt.connect('tcp://192.168.178.116:1883')
var client  = mqtt.connect('tcp://localhost:1883')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
      client.publish('outTopic', 'Hello mqtt')
    }else{
      console.log(err)
    }
  });
});
 
client.on('message', function (topic, message) {
  console.log(message.toString())
});

exports.publish = function(topic, message){
	client.publish(topic, message);
};

client.publish("presence", "hi")

exports.startAnimation = async function (req, res) {
    await client.publish("rgb", rgb.startAnimation)
    res.send("started")
}

exports.pauseAnimation = async function (req, res) {
    await client.publish("rgb", rgb.pauseAnimation) 
    res.send("paused")  
}

exports.stopAnimation = async function (req, res) {
    await client.publish("rgb", rgb.stopAnimation) 
    res.send("stopped")  
}

exports.setBrightness = async function (req, res) {
    // Brightness propotional to Energy^0.33
    await client.publish("rgb", rgb.setBrightness(req.body.brightness))
    res.send("set brightness to " + req.body.brightness)  
}

exports.setSpeed = async function (req, res) {
  await client.publish("rgb", rgb.setSpeed(req.body.speed))
    res.send("set brightness to " + req.body.speed)  
}

exports.appendADL = async function (req, res) {  
  await client.publish("rgb", rgb.adl2str(req.body.adl)) 
  res.send("appended ADL: " + req.body.adl) 
}

exports.startADL = async function (req, res) {
  await client.publish("rgb", rgb.stopAnimation + rgb.adl2str(req.body.adl) + rgb.startAnimation) 
  res.send("started ADL: " + req.body.adl) 
}