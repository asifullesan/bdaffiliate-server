const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize, blogImgResize,  } = require("../middlewares/uploadImages");
const router = express.Router();

router.post(
  "/",
  productImgResize,
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  
  uploadImages
);





router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;