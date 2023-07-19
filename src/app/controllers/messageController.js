const Message = require("../models/Message");

class MessageController {
  async getMessages(req, res) {
    const query = req.query;

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
      let messages = [];
      // pagination
      let totalProduct = await Message.countDocuments(whereObj);
      let pagination = {
        current: page > Math.ceil(totalProduct / limit) ? 1 : page, // when current > total
        limit: limit,
        total: Math.ceil(totalProduct / limit),
      };

      messages = (
        await Message.find(whereObj).sort(sortObj).limit(endIndex).exec()
      ).slice(startIndex);

      return res.status(200).json({ success: true, messages, pagination });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async createMessage(req, res) {
    const messages = req.body;
    const { name, phoneNumber, email, message } = messages;
    if (!name || !phoneNumber || !email || !message)
      return res
        .status(400)
        .json({ success: false, message: "Field is required" });

    try {
      const newMessage = new Message(messages);
      await newMessage.save();

      // all good
      return res.status(200).json({
        success: true,
        message: "Create message successfully",
        newMessage,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteMessage(req, res) {
    const id = req.params.id;
    try {
      await Message.deleteOne({ _id: id });

      //all good
      return res
        .status(200)
        .json({ success: true, message: "Delete message successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new MessageController();
