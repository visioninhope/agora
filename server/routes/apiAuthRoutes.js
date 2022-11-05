/**
 * Agora - Close the loop
 * © 2021-2022 Brian Gormanly
 * BSD 3-Clause License
 * see included LICENSE or https://opensource.org/licenses/BSD-3-Clause 
 */

var express = require( 'express' );
var router = express.Router();

// import util Models
const ApiMessage = require( '../model/util/ApiMessage' );

// import controllers
const authController = require( '../controller/authController' );

// check that the user is logged in!
// Currently by being here all APIs should require an authenicated user to work
router.use( function ( req, res, next ) {
    // This is the case if using UI.
    console.log( "Calling API..." );
    const authTest = req.session.isAuth;
    if( authTest ){
        middlewareRevison( req );
        next();
        return;
    }

    const authHeader = req.headers.authorization;
    if( !authHeader ){
        // authentication token missing

        res.set( "x-agora-message-title", "Unauthorized" );
        res.set( "x-agora-message-detail", "API requires authentication" );
        res.status( 401 );
        next( 'Authentication not provided!' );

    }
    else {
        // we have a auth token, get the username and password from it.
        const auth = new Buffer.from( req.headers.authorization.split( " " )[1], 'base64' ).toString().split( ':' );
        const userEmail = auth[0];
        const password = auth[1];

        // verify the credentials are valid
        authController.basicAuth( userEmail, password, req ).then( ( user ) => {
            if ( user ) {
                // user is authorized!
                console.log( "API call" );
                req.user = user;

                // TODO future role specific verification can go here.

                // Middleware complete back to called route.
                middlewareRevison( req );
                next( );

            }
            else {
                res.set( "x-agora-message-title", "Unauthorized" );
                res.set( "x-agora-message-detail", "API requires authentication" );
                res.status( 401 );
                next( 'Authentication Failed!' );
            }
        } );
    }



    /**
     * Old auth mechanism that relied on server session (stateful)
     * Keeping around until Basic auth mechanism is inplace and tested
     * with browser and other clients
     
    if(!req.session.authUser) {
        // create the ApiMessage
        const apiRes = ApiMessage.createApiMessage( 401, "Unauthorized", "API requires authentication");
        
        res.set("x-agora-message-title", "Unauthorized");
        res.set("x-agora-message-detail", "API requires authentication");
        res.status(401).json(apiRes);
        //res.send();
    }
    else {
        next();
    }
    */

} );

/**
 * Middleware to update the session and user objects
 * this allows us to use either req.user or req.session.authUser
 */
function middlewareRevison( req ) {
    if( req.user ) {
        req.session.authUser = req.user;
    }
    else if( req.session.authUser ) {
        req.user = req.session.authUser;
    }
    console.log( "req.user.id: " + req.user.id );
    console.log( "req.session.authUser.id: " + req.session.authUser.id );
}


/**
 * Tag APIs
 */
const tagRoutes = require( './apis/tagRoutes' );
router.use( '/tags', tagRoutes );

/**
 * Goal APIs
 */
const goalRoutes = require( './apis/goalRoutes' );
router.use( '/goals', goalRoutes );

/**
 * Topic APIs
 */
const topicRoutes = require( './apis/topicRoutes' );
router.use( '/topics', topicRoutes );

/**
 * Resource APIs
 */
const resourceRoutes = require( './apis/resourceRoutes' );
router.use( '/resources', resourceRoutes );

/**
 * User APIs
 */
const userRoutes = require( './apis/userRoutes' );
router.use( '/user', userRoutes );

/**
 * Discussion APIs
 */
const discussionRoutes = require( './apis/discussionRoutes' );
router.use( '/discussions', discussionRoutes );


/**
 * Stripe APIs
 */
const stripeRoutes = require( './apis/stripeRoutes' );
router.use( '/stripe', stripeRoutes );

module.exports = router;