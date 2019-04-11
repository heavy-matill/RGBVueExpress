exports.anim2str = function(animationData) {
    let str_temp
    // add jump or fade
    let animationString = this.num2hex(animationData.mode + 0x14)
    // colors
    for (c of [animationData.c1, animationData.c2]) {
        animationString += this.num2hex(c.r)
        animationString += this.num2hex(c.g)
        animationString += this.num2hex(c.b)
    }
    // time1 and time2
    for (p of [animationData.p, 100-animationData.p]) {
        str_temp = this.num2hex(Math.round(animationData.t*p/100*256))
        while (str_temp.length <4) {
            str_temp = "0" + str_temp
        }
        animationString += str_temp
    }
    // repetitions
    animationString += this.num2hex(animationData.nr)
    // repeat
    animationString += this.num2hex(animationData.br)

    // return
    return animationString
}

exports.adl2str = function(animationDataList) {
    console.log(animationDataList)
    let animationListString = ""
    // iterate over list
    for (animationData of animationDataList) {
        animationListString += this.anim2str(animationData)
    }
    return animationListString
}

exports.startAnimation = "00"
exports.stopAnimation = "01"
exports.pauseAnimation = "02"
exports.setBrightness = function(brightness) {
    return "08" + this.num2hex(Math.round(0.49 + Math.pow(brightness,3) / 1000000 * 127.5))
}
exports.setSpeed = async function (speed) {
    return this.num2hex(Math.round(speed * 0.16))
}

exports.num2hex = function(num) {
    let str_temp = (+num).toString(16).toUpperCase()
    if (str_temp.length % 2) {
        // uneven number of characters in string thus append leading "0"
        str_temp = "0" + str_temp
    }
    return str_temp
}