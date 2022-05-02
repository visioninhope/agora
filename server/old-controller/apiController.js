/**
 * Agora - Close the loop
 * © 2021-2022 Brian Gormanly
 * BSD 3-Clause License
 * see included LICENSE or https://opensource.org/licenses/BSD-3-Clause 
 */

var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: true
  }));
router.use(bodyParser.json());


/**
 * User APIs
 */
let user = require('./userController')
router.use('/user', user);

/**
 * Stripe APIs
 */
if(process.env.STRPIE_TOGGLE == "true") {
    let stripe = require('./stripeController')
    router.use('/stripe', stripe);
}

/**
 * Goal APIs
 */
let goalApi = require('./goalController');
router.use('/goal', goalApi);

/**
 * Topic APIs
 */
let topicApi = require('./topicController')
router.use('/topic', topicApi);

router.route('/')
module.exports = router;