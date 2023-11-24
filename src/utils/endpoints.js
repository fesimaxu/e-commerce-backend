const BaseRoute = "/api/v1";


// APP API ROUTES
const ENDPOINTS = {
    userLogIn : "/auth/login",
    orderItems: "/order_items",
    deleteOrderItemsById: "/order_items/:id",
    updateUserDetails: "/account"
}






module.exports = {
    BaseRoute,
    ENDPOINTS,
}