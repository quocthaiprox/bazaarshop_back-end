const express = require("express");
const { verifyToken, verifyAdmin } = require("../utils/verify");
const ordersRouter = express.Router();
const orderController = require("../app/controllers/orderController");

ordersRouter.get("/", orderController.getSomeOrders);
ordersRouter.post("/", verifyToken, orderController.createOrder);
ordersRouter.put("/:id", verifyToken,verifyAdmin, orderController.updateOrder);
ordersRouter.delete("/:id", verifyToken, verifyAdmin, orderController.deleteOrder);

module.exports = ordersRouter;
