const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {

    order:{
      firstName: {
            type: String,
            required:true
          },
          lastName: {
            type: String,
            required:true
          },
          country: {
            type: String,
            required:true
          },
          mobile: {
            type: String,
            required:true
          },
          address: {
            type: String,
            required:true
          },
          city: {
            type: String,
            required:true
          },
          state: {
            type: String,
            required:true
          },
          zipCode: {
            type: String,
            required:true
          },
          email: {
            type: String,
            required:true
          },
          itemId: {
            type: String,
            required:true
          },
          itemName: {
            type: String,
            required:true
          },
        

    }, 
    totalPrice: {
      type: Number,
      required:true
    },
    paidStatus:{
      type: Boolean,
      
    },
    transId:{
      type: String,
      
    },
    month:{
      type: String,
      default: new Date().getMonth()
    }







    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },

    // shippingInfo: {
    //   firstName: {
    //     type: String,
    //     required:true
    //   },
    //   lastName: {
    //     type: String,
    //     required:true
    //   },
    //   country: {
    //     type: String,
    //     required:true
    //   },
    //   phone: {
    //     type: String,
    //     required:true
    //   },
    //   address: {
    //     type: String,
    //     required:true
    //   },
    //   city: {
    //     type: String,
    //     required:true
    //   },
    //   state: {
    //     type: String,
    //     required:true
    //   },
    //   zipCode: {
    //     type: String,
    //     required:true
    //   },
    // },
    // paymentInfo: {
    //   SSLcommerseOrderId:{
    //     type:String,
    //   }
    // },
    // orderItems: [
    //   {
    //     items: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Cart",
    //       required: true,
    //     },
    //     price: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
    // ],

    // paidAt: {
    //   type: Date,
    //   default: Date.now()
    // },
    // totalPrice: {
    //   type: Number,
    //   required:true
    // },
    // orderStatus: {
    //   type: String,
    //   default:"Ordered"
    // }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
