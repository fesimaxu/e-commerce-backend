const { Router } = require("express");
const { ENDPOINTS } = require("../utils/endpoints");
const { getUserOrderItemsController, deleteUserOrderItemByIdController, updateUserDetailsController } = require("../controller/order");
const isAuth = require("../middleware/validation/auth");


const router = Router();



router.get(ENDPOINTS.orderItems, isAuth,getUserOrderItemsController);

router.delete(ENDPOINTS.deleteOrderItemsById, isAuth, deleteUserOrderItemByIdController);

router.patch(ENDPOINTS.updateUserDetails, isAuth , updateUserDetailsController);



module.exports = router;