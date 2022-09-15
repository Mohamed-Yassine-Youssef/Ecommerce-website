import asyncHandler from "express-async-handler";
import product from "../models/productModel.js";

// @desc fetch all products
//@route GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await product.find({ ...keyword });

  res.json(products);
});
// @desc fetch single product
//@route GET /api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
  const Product = await product.findById(req.params.id);
  if (Product) {
    res.json(Product);
  } else {
    console.log("not found");
    res.status(404);
    throw new Error("Product not found");
  }
});
//delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const Product = await product.findById(req.params.id);
  if (Product) {
    await Product.remove();

    res.json({ message: "product removed" });
  } else {
    console.log("not found");
    res.status(404);
    throw new Error("Product not found");
  }
});

//createproduct
const createProduct = asyncHandler(async (req, res) => {
  const Product = new product({
    name: "Sample name",
    price: 0,
    user: req.User._id,
    image: "/images/sample.jpg",
    brand: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
    category: "all",
  });
  const createdProduct = await Product.save();
  res.status(201).json(createdProduct);
});
//update product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const Product = await product.findById(req.params.id);
  if (Product) {
    Product.name = name;
    Product.price = price;
    Product.description = description;
    Product.image = image;
    Product.brand = brand;
    Product.category = category;
    Product.countInStock = countInStock;
    const updatedProduct = await Product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//create new review
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const Product = await product.findById(req.params.id);

  if (Product) {
    const alreadyReviewed = Product.reviews.find(
      (r) => r.user.toString() === req.User._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.User.name,
      rating: Number(rating),
      comment,
      user: req.User._id,
    };

    Product.reviews.push(review);

    Product.numReviews = Product.reviews.length;

    Product.rating =
      Product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      Product.reviews.length;

    await Product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//get top rated products
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
