const { Router } = require("express");
const {
  loginUserController,
  updateUserDetailsController,
} = require("../controller/auth");
const { ENDPOINTS } = require("../utils/endpoints");
const { validateLogIn, validate } = require("../middleware/validation");
const isAuth = require("../middleware/validation/auth");

const router = Router();

// user routes

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: sign in with username - seller_id and password - seller_zip_code_prefix
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: signin successfully
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
router.post(ENDPOINTS.userLogIn, validateLogIn, validate, loginUserController);

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

router.patch(ENDPOINTS.updateUserDetails, isAuth, updateUserDetailsController);

module.exports = router;
