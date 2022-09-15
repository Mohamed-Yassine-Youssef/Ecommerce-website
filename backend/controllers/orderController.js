import asyncHandler from "express-async-handler";
import order from "../models/orderModel.js";
import Order from "../models/orderModel.js";

//create New order
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.User._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//get order by Id
const getOrderById = asyncHandler(async (req, res) => {
  const Order = await order.findById(req.params.id).populate("user");
  if (Order) {
    res.json(Order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//update order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const Order = await order.findById(req.params.id);
  if (Order) {
    Order.isPaid = true;
    Order.paidAt = Date.now();
    Order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await Order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//get logged in user orders
const getMyOrders = asyncHandler(async (req, res) => {
  const Orders = await order.find({ user: req.User._id });
  res.json(Orders);
});

//get all orders
const getOrders = asyncHandler(async (req, res) => {
  const Orders = await order.find({}).populate("user", "id name");

  res.json(Orders);
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const Order = await order.findById(req.params.id);
  if (Order) {
    Order.isDelivered = true;
    Order.deliveredAt = Date.now();

    const updatedOrder = await Order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
