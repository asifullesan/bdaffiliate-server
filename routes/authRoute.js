const express = require("express");
const { createUser, loginUser, getallUsers, getaUser, deleteUser, updateUser, blockUser, unBlockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, loginUserCtrl, deleteaUser, updatedUser, unblockUser, getallUser, userCart, applyCoupon, createOrder, getOrders, getAllOrders, getWishlist, getUserCart, emptyCart, updateOrderStatus, saveAddress, removeProductFromCart, updateQuantityFromCart, emailVarification, removeItemFromCart, getMonthWiseOrderIncome, getMonthWiseOrderCount, getYearlyTotalOrders } = require("../controller/userCtrl");
const { success, successT, getalOrder, getaOrder } = require("../controller/paymentCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { checkout, paymentVerification, createOrders } = require("../controller/paymentCtrl");
const router = express.Router();





router.post("/payment/success/:tranId", success);

router.get("/cart", authMiddleware, getUserCart);
router.post("/cart", authMiddleware, userCart);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getYearlyTotalOrder", authMiddleware, getYearlyTotalOrders);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeItemFromCart);
router.post("/register",  createUser);
router.post("/login",  loginUserCtrl);
router.post("/verification",  emailVarification);
router.post("/cart/create-order", authMiddleware, createOrder);
router.post("/order", authMiddleware, createOrders);
router.get("/order/:id", authMiddleware, getaOrder);
// router.post("/order/paymentVerification", paymentVerification);
router.post("/admin", loginAdmin);
router.get("/all-users",  getallUser);
router.get("/get-orders", authMiddleware, getalOrder);

router.get("/:id", authMiddleware, isAdmin, getaUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.get("/refresh", handleRefreshToken);
router.post("/forgot-password",  forgotPasswordToken);

router.put("/reset-password/:token",  resetPassword);
router.put("/password", authMiddleware,  updatePassword);


module.exports = router;