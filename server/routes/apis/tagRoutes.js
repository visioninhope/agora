/**
 * Agora - Close the loop
 * © 2021-2022 Brian Gormanly
 * BSD 3-Clause License
 * see included LICENSE or https://opensource.org/licenses/BSD-3-Clause 
 */

 const express = require( 'express' );
 const router = express.Router( );

 // import controllers
 const tagController = require( '../../controller/apis/tagController' );

// tags /api/v1/auth/tags

/**
 * @swagger
 * components:
 *  schemas:
 *      Tag:
 *          type: object
 *          required:
 *              - tag
 *          properties:
 *              id:
 *                  type: integer
 *                  description: autogenerated for new tags, provide to update existing tag
 *              tag:
 *                  type: string
 *                  description: The tag itself
 *              ownedBy:
 *                  type integer
 *                  description: The userId for the owner of the tag
 *          example:
 *              id: 1
 *              tag: Python Programming
 *              ownedBy: 1
 */

/**
 * @swagger
 * /api/v1/open/tags
 *  get:
 *      summary: Returs a list of all the available tags
 *      responses:
 *          200:
 *              description: The list of tags
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Tag
 */
router.route( '/' )
    .get(async function (req, res) {
        tagController.getAllTags( req, res );
    })    
    .post( ( req, res ) => { 
        tagController.saveTag( req, res, false );
    }
)




module.exports = router;