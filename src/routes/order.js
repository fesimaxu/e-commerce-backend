const { Router } = require("express");
const { ENDPOINTS } = require("../utils/endpoints");
const { getUserOrderItemsController, deleteUserOrderItemByIdController, updateUserDetailsController } = require("../controller/order");
const isAuth = require("../middleware/validation/auth");


const router = Router();


/**
 * @swagger
 * /api/v1/order_items:
 *   get:
 *     summary: Get the order items data.
 *     description: Get the order items data of a logged in user
 *     tags:
 *      - Order
 *     responses:
 *       200:
 *         description: Successful response of all order items data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.get(ENDPOINTS.orderItems, isAuth,getUserOrderItemsController);


/**
 * @swagger
 * /api/v1/order_items/{id}:
 *   delete:
 *     summary: Delete order item data.
 *     description: Delete order item data
 *     tags:
 *      - Order
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: The order_id of order needed to be deleted
 *     responses:
 *       200:
 *         description: Successful response of delete order item data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.delete(ENDPOINTS.deleteOrderItemsById, isAuth, deleteUserOrderItemByIdController);

/**
 * @swagger
 * /api/v1/account:
 *   patch:
 *     summary: Update user Info
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: string
 *                 default: "aba"
 *               city:
 *                 type: string
 *                 default: "abia state"
 *     responses:
 *       200:
 *         description: user profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: interna server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.patch(ENDPOINTS.updateUserDetails, isAuth , updateUserDetailsController);



module.exports = router;