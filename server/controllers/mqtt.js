var mqtt = require('mqtt')
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
    await client.publish("rgb", "00")
    res.send("started")
}

exports.pauseAnimation = async function (req, res) {
    await client.publish("rgb", "02") 
    res.send("paused")  
}

exports.stopAnimation = async function (req, res) {
    await client.publish("rgb", "01") 
    res.send("stopped")  
}

exports.setBrightness = async function (req, res) {
    // Brightness propotional to Energy^0.33
    await client.publish("rgb", "08" + d2h(Math.round(0.49 + Math.pow(req.body.brightness,3) / 1000000 * 127.5))) 
    res.send("set brightness to " + req.body.brightness)  
}

exports.setSpeed = async function (req, res) {
    await client.publish("rgb", "09" + d2h(Math.round(req.body.speed * 0.16))) 
    res.send("set brightness to " + req.body.speed)  
}
function d2h(d) { 
    let str_temp = (+d).toString(16).toUpperCase()
    if (str_temp.length % 2) {
        // uneven number of characters in string thus append leading "0"
        str_temp = "0" + str_temp
    }
    return str_temp
}