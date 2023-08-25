const Course = require("../models/courseModal");
const Order = require("../models/orderModel");
const shortid = require("shortid");
const express = require("express");
var ObjectId = require('mongodb').ObjectId;
const SSLCommerzPayment = require("sslcommerz-lts");

const store_id = "mycom64bf351b1530b";
const store_passwd = "mycom64bf351b1530b@ssl";
const is_live = false; //true for live, false for sandbox

const app = express();

const createOrders = async (req, res) => {
  const order = req.body;


console.log(order.itemId);

  const itemName = await Course.findOne({_id: new ObjectId(order?.itemId)})
  console.log(itemName);

  const tran_id = shortid.generate();

  const data = {
    total_amount: order?.totalPrice,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/user/payment/success/${tran_id}`,
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: itemName.title,
    product_category: "Electronic",
    product_profile: "general",
    cus_name: order?.firstName + "" + order?.lastName,
    cus_email: order?.email,
    cus_add1: order?.address,
    cus_add2: "Dhaka",
    cus_city: order?.city,
    cus_state: order?.state,
    cus_postcode: order?.zipCode,
    cus_country: order?.country,
    cus_phone: order.mobile,
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

 
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });

    const finalOrder = {
      order:{
        firstName: order.firstName,
        lastName: order.lastName,
        country: order.country,
        mobile: order.mobile,
        address: order.address,
        city: order.city,
        state: order.state,
        zipCode: order.zipCode,
        email: order.email,
        itemId: order.itemId,
        itemName:  itemName.title,
       
      },
      totalPrice: order.totalPrice,
      paidStatus: false,
      transId: tran_id,
    };
    const result = Order.create(finalOrder);
    return result
   

    console.log("Redirecting to: ", GatewayPageURL);
  });
};



const success = async (req, res) => {
  // const transId = req.body;

   // const findItem = await Order.findOne({transId: req.body.tran_id})
   // console.log(findItem);


    try {
      const updateOrder = await Order.updateOne(
         {transId: req.body.tran_id},
       { $set:{
         paidStatus: true,
         
        }
       
      },
      {new:true}
      );

      if(updateOrder.modifiedCount>0) {
         res.redirect(
            `http://localhost:3000/payment/success/${req.body.tran_id}`
         )
      }
      console.log(updateOrder);
    } catch (error) {
      console.log(error);
    }

};




const getalOrder = async (req, res) => {
  try {
    const getOrders = await Order.find();
    res.json(getOrders);
  } catch (error) {
    throw new Error(error);
  }
};


const getaOrder =async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const getOrder = await Order.findById(id);
    res.json({
      getOrder,
    });
  } catch (error) {
    throw new Error(error);
  }
};





module.exports = {
  createOrders,
  success,
  getalOrder,
  getaOrder
};
