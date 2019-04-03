// import model
AnimationDataList = require('../models/adl')

// Handle index actions
exports.index = async function (req, res) {
    await AnimationDataList.get(async function (err, adls) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            })
        }
        res.json({
            status: "success",
            message: "AnimationDataLists retrieved successfully",
            data: adls
        })
    })
}
// Handle create AnimationDataList actions
exports.new = async function (req, res) { 
    let adl = new AnimationDataList();
    adl.name = req.body.name ? req.body.name : adl.name
    adl.animationDataList = req.body.animationDataList
// save the AnimationDataList and check for errors
    try{    
        let newAdl = await adl.save()
        res.json({
            message: 'New AnimationDataList created!' + err,
            data: newAdl})
    } catch (err) {
        res.json(err)
    }
}
// Handle view AnimationDataList info
exports.view = async function (req, res) {
    await AnimationDataList.findById(req.params.id, async function (err, adl) {
        if (err) {
            res.send(err)
        }
        res.json({
            message: 'AnimationDataList details loading..',
            data: adl
        })
    })
}
// Handle update AnimationDataList info
exports.update = async function (req, res) {
    await AnimationDataList.findById(req.params.id, async function (err, adl) {
        if (err){
            res.send(err)
        }
        adl.name = req.body.name ? req.body.name : adl.name
        adl.animationDataList = req.body.animationDataList ? req.body.animationDataList : adl.animationDataList
// save the AnimationDataList and check for errors
        adl.save(async function (err) {
            if (err) {
                res.json(err)
            }
            res.json({
                message: 'AnimationDataList Info updated',
                data: adl
            })
        })
    })
}
// Handle delete AnimationDataList
exports.delete = async function (req, res) {
    await AnimationDataList.remove({
        _id: req.params.id
    }, async function (err, adl) {
        if (err) {
            res.send(err)
        }
        res.json({
            status: "success",
            message: 'AnimationDataList deleted'
        })
    })
}