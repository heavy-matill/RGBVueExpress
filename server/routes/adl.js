// Initialize express router
var router = require('express').Router()

// Import AnimationDataList controller
var adlController = require('../controllers/adl')
// AnimationDataList routes
router.route('/')
    .get(adlController.index)
    .post(adlController.new)
router.route('/:id')
    .get(adlController.view)
    .patch(adlController.update)
    .put(adlController.update)
    .delete(adlController.delete)
// Export API routes
module.exports = router