const { Router } = require("express");
const { loginUserController } = require("../controller/auth");
const { ENDPOINTS } = require("../utils/endpoints");


const router = Router();


// user routes
router.post(ENDPOINTS.userLogIn ,loginUserController );




module.exports = router;