const Blog = require("../models/Blog");
const User = require("../models/User");

class BlogController {
  // [GET] /blogs
  async getSomeBlog(req, res) {
    const query = req.query;

    let page = (query._page && Number(query._page)) || 1;
    let limit = (query._limit && Number(query._limit)) || 9;
    let sort = query._sort;
    let order = query._order; // asc, desc

    // oparater.$eq = query._eq; // ==
    // oparater.$gt = query._gt; // >
    // oparater.$gte = query._gte; // >=
    // oparater.$lt = query._lt; // <
    // oparater.$lte = query._lte; // <=
    // oparater.$ne = query._ne; // != ||

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
      let blogs = [];
      // pagination
      let totalProduct = await Blog.countDocuments(whereObj);
      let pagination = {
        current: page > Math.ceil(totalProduct / limit) ? 1 : page, // when current > total
        limit: limit,
        total: Math.ceil(totalProduct / limit),
      };

      blogs = (
        await Blog.find(whereObj)
          .populate({ path: "authorId", model: User })
          .sort(sortObj)
          .limit(endIndex)
          .exec()
      ).slice(startIndex);

      return res.status(200).json({ success: true, blogs, pagination });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // [POST] /blogs/
  async updateBlog(req, res) {
    const id = req.params.id;
    const adminUser = await User.findOne({
      _id: req.body.userId,
      role: "admin",
    });
    const currentBlog = await Blog.findById(id);

    if (!adminUser && !(req.body.userId === currentBlog.authorId))
      return res
        .status(400)
        .json({ success: false, message: "You are not admin or author" });

    try {
      const newBlog = await Blog.findOneAndUpdate({ _id: id }, req.body, {
        returnDocument: "after",
      });

      if (!newBlog)
        return res
          .status(400)
          .json({ success: false, message: "Blog not found" });

      //all good
      return res.status(200).json({
        success: true,
        message: "Update blog successfully",
        newBlog,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // [POST] /blogs/
  async createBlog(req, res) {
    const blog = req.body;
    const { authorId, title, image, content } = blog;
    if (!title || !authorId || !image || !content)
      return res
        .status(400)
        .json({ success: false, message: "Field is required" });

    try {
      const newBlog = new Blog(blog);
      await newBlog.save();

      // all good
      return res.status(200).json({
        success: true,
        message: "Create blog successfully",
        newBlog,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // [DELETE] /blogs/:id
  async deleteBlog(req, res) {
    const id = req.params.id;
    const adminUser = await User.findOne({
      _id: req.body.userId,
      role: "admin",
    });
    const currentBlog = await Blog.findById(id);

    if (!adminUser && !(req.body.userId === currentBlog.authorId))
      return res
        .status(400)
        .json({ success: false, message: "You are not admin or author" });

    try {
      await Blog.deleteOne({ _id: id });

      //all good
      return res
        .status(200)
        .json({ success: true, message: "Delete blog successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new BlogController();
