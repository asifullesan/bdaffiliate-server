const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
 

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    price: {
      type: Number,
      require: true,
    },
    images: {
      type: String,
    },
    title: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Cart", cartSchema);
