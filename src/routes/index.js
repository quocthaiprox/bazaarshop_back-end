const siteRouter = require("./siteRouter");
const { verifyToken, verifyAdmin } = require("../utils/verify");
const authRouter = require("./authRouter");
const productRouter = require("./productRouter");
const adminRouter = require("./adminRouter");
const cartRouter = require("./cartRouter");
const invoiceRouter = require("./invoiceRouter");
const blogRouter = require("./blogRouter");
const orderRouter = require("./orderRouter");
const messageRouter = require("./messageRouter");

function router(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/products", productRouter);
  app.use("/api/cart", verifyToken, cartRouter);
  app.use("/api/admin", verifyToken, verifyAdmin, adminRouter);
  app.use("/api", siteRouter);
  app.use("/api/invoices", verifyToken, invoiceRouter);
  app.use("/api/blogs", blogRouter);
  app.use("/api/messages", messageRouter);
  app.use("/api/orders", orderRouter);
}

module.exports = router;
