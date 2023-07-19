const Order = require("../models/Order");

class OrderController {
  // [GET] /orders

  async getSomeOrders(req, res) {
    const query = req.query;

    // get all query
    let page = (query._page && Number(query._page)) || 1;
    let limit = (query._limit && Number(query._limit)) || 4;
    let sort = query._sort;
    let order = query._order; // asc, desc

    const startIndex = Number((page - 1) * limit);
    const endIndex = Number(page * limit);

    let sortObj = {};
    let whereObj = {};

    //sort
    if (sort && order)
      sortObj = {
        [sort]: order,
      };

    try {
      let orders = [];

      // pagination
      let totalOrder = await Order.countDocuments(whereObj);
      let pagination = {
        current: page > Math.ceil(totalOrder / limit) ? 1 : page, // when current > total
        limit: limit,
        total: Math.ceil(totalOrder / limit),
      };

      orders = (
        await Order.find(whereObj).sort(sortObj).limit(endIndex).exec()
      ).slice(startIndex);
      return res.status(200).json({ success: true, orders, pagination });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // [PUT] /orders/:id
  async updateOrder(req, res) {
    const id = req.params.id;
    // const adminUser = await User.findOne({
    //   _id: req.body.userId,
    //   role: "admin",
    // });
    // const currentOrder = await Order.findById(id);

    // if (!adminUser && !(req.body.userId === currentOrder.authorId))
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "You are not admin or author" });

    try {
      const newOrder = await Order.findOneAndUpdate({ _id: id }, req.body, {
        returnDocument: "after",
      });

      if (!newOrder)
        return res
          .status(400)
          .json({ success: false, message: "Order not found" });

      //all good
      return res.status(200).json({
        success: true,
        message: "Update order successfully",
        newOrder,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // [POST] /orders/
  async createOrder(req, res) {
    const order = req.body;
    const { fullName, address, products, phone, totalPrice } = order;
    if (!fullName || !address || !phone || !totalPrice)
      return res
        .status(400)
        .json({ success: false, message: "Field is required" });

    if (!products || products.length === 0) {
      return res
        .status(300)
        .json({ success: false, message: "Products invalid" });
    }
    try {
      const newOrder = new Order(order);
      await newOrder.save();

      // all good
      return res.status(200).json({
        success: true,
        message: "Create order successfully",
        newOrder,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // [DELETE] /orders/:id
  async deleteOrder(req, res) {
    const id = req.params.id;
    // const adminUser = await User.findOne({
    //   _id: req.body.userId,
    //   role: "admin",
    // });
    // const currentOrder = await Order.findById(id);

    // if (!adminUser && !(req.body.userId === currentOrder.authorId))
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "You are not admin or author" });

    try {
      await Order.deleteOne({ _id: id });

      //all good
      return res
        .status(200)
        .json({ success: true, message: "Delete order successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new OrderController();
