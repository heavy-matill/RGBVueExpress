// Initialize express router
var router = require('express').Router()

// Import AnimationDataList controller
var mqttController = require('../controllers/mqtt');
// AnimationDataList routes
router.route('/start').get(mqttController.startAnimation)
router.route('/pause').get(mqttController.pauseAnimation)
router.route('/stop').get(mqttController.stopAnimation)
router.route('/brightness').post(mqttController.setBrightness)
router.route('/speed').post(mqttController.setSpeed)
// Export API routes
module.exports = router;