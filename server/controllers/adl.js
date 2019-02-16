// import model
AnimationDataList = require('../models/adl')

// Handle index actions
exports.index = function (req, res) {
    AnimationDataList.get(function (err, adls) {
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
exports.new = function (req, res) { 
    var adl = new AnimationDataList();
    adl.name = req.body.name ? req.body.name : adl.name
    adl.animationDataList = req.body.animationDataList
// save the AnimationDataList and check for errors
    adl.save(function (err) {
        if (err) {
            res.json(err)
        }
        res.json({
            message: 'New AnimationDataList created!',
            data: adl
        });
    });
};
// Handle view AnimationDataList info
exports.view = function (req, res) {
    AnimationDataList.findById(req.params.id, function (err, adl) {
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
exports.update = function (req, res) {
    AnimationDataList.findById(req.params.id, function (err, adl) {
        if (err){
            res.send(err)
        }
        adl.name = req.body.name ? req.body.name : adl.name
        adl.animationDataList = req.body.animationDataList ? req.body.animationDataList : adl.animationDataList
// save the AnimationDataList and check for errors
        adl.save(function (err) {
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
exports.delete = function (req, res) {
    AnimationDataList.remove({
        _id: req.params.id
    }, function (err, adl) {
        if (err) {
            res.send(err)
        }
        res.json({
            status: "success",
            message: 'AnimationDataList deleted'
        })
    })
}