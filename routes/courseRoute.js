const express = require("express");
const { createCourse, getAllCourse, getaCourse, updateCourse, deleteCourse, rating } = require("../controller/courseCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();



router.post("/", authMiddleware, isAdmin,  createCourse);
router.get("/:id",  getaCourse);
// router.put("/wishlist",  authMiddleware, addToWishlist);
router.put("/rating",  authMiddleware, rating);
router.put("/:id", authMiddleware,  isAdmin, updateCourse);
router.delete("/:id", authMiddleware, isAdmin, deleteCourse );
router.get("/", getAllCourse );


module.exports = router;