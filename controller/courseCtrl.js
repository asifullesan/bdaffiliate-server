const Course = require("../models/courseModal");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
// const cloudinaryUploadImg = require("../utils/cloudinary");

const { validateMongoId } = require("../utils/validateMongoId");





const createCourse = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newCourse = await Course.create(req.body);
    res.json(newCourse);
  } catch (error) {
    throw new Error(error);
  }
});






const updateCourse = asyncHandler(async (req, res) => {
  const id = req.params;
  validateMongoId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateCourse = await Course.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    res.json(updateCourse);
  } catch (error) {
    throw new Error(error);
  }
});






const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCourse = await Course.findByIdAndDelete(id);
    res.json(deleteCourse);
  } catch (error) {
    throw new Error(error);
  }
});






const getaCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findCourse = await Course.findById(id);
    res.json(findCourse);
  } catch (error) {
    throw new Error(error);
  }
});






const getAllCourse = asyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Course.find(JSON.parse(queryStr));

    // sorting

    if (req.query.sort) { 
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const courseCount = await Course.countDocuments();
      if (skip >= courseCount) throw new Error("This page does not exists");
    }
   

    const course = await query;
    res.json(course);
  } catch (error) {
    throw new Error(error);
  }
});



// const addToWishlist = asyncHandler(async(req, res) => {
//   const {_id} = req.user;
//   const{productId} = req.body;

//   try{
//     const user = await User.findById(_id);
//     const alreadyAdded = user.wishlist.find((id) => id.toString() === productId);

//     if(alreadyAdded) {

//       let user = await User.findByIdAndUpdate(_id, {
//         $pull: { wishlist: productId}
//       },
//       {
//         new: true,
//       });
//       res.json(user)
//     }else {

//       let user = await User.findByIdAndUpdate(_id, {
//         $push: { wishlist: productId}
//       },
//       {
//         new: true,
//       });
//       res.json(user)
//     }

//   }catch(error) {
//     throw new Error(error)
//   }

// });



const rating = asyncHandler(async(req, res) => {
  const {_id} = req.user;
  const {star, productId, comment} = req.body;

  console.log(req.body);

  try{
    const product = await Course.findById(productId);
    let alreadyRated = product.ratings.find((userId) => userId.postedby.toString() === _id.toString());

    if(alreadyRated) {

      const updateRating = await Course.updateOne({
        ratings: { $elemMatch: alreadyRated},
      },{
        $set: {"ratings.$.star": star, "ratings.$.comment": comment},
      },{
        new: true,
      });
      // res.json(updateRating);



    } else {
      const rateProduct = await Course.findByIdAndUpdate(productId, {
        $push: {
          ratings: {
            star: star,
            comment: comment,
            postedby: _id,
          }
        }
      }, {
        new: true,
      });
      // res.json(rateProduct);
    }
    const getallratings = await Course.findById(productId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalRating = await Course.findByIdAndUpdate(
      productId,
      {
        totalrating: actualRating,
      },
      {
        new: true,
      }
    );
    res.json(finalRating)
  }catch (error) {
    throw new Error(error);
  }
});




// const uploadImages =  asyncHandler(async(req, res) => {
//   try{
//     const uploader = (path) => cloudinaryUploadImg(path, "images");
//     const urls = [];
//     const files = req.files;
//     for (const file of files ) {
//       const {path} = file;
//       const newpath = await uploader(path);
//       urls.push(newpath);
//     }
//     const images = await urls.map((file) => {
//       return file
//     });
//     res.json(images)
//   } catch(error){
//     throw new Error(error);
//   }
// });




module.exports = {
  createCourse,
  getAllCourse,
  getaCourse,
  deleteCourse,
  updateCourse,
  rating,
 
};
