const Product = require("../models/product");

// Function to search and filter products
async function searchAndFilterProducts(filters) {
  try {
    let query = {};

    // Apply filters based on provided criteria
    if (filters.name) {
      query.name = { $regex: new RegExp(filters.name, "i") }; // Case-insensitive search for product name
    }
    if (filters.brand) {
      query.brand = { $regex: new RegExp(filters.brand, "i") }; // Case-insensitive search for brand
    }
    if (filters.minPrice) {
      query["price.amount"] = { $gte: filters.minPrice }; // Filter products with price greater than or equal to minPrice
    }
    if (filters.maxPrice) {
      query["price.amount"] = {
        ...query["price.amount"],
        $lte: filters.maxPrice,
      }; // Filter products with price less than or equal to maxPrice
    }
    if (filters.minRating) {
      query["feedback.rate"] = { $gte: filters.minRating };
    }
    if (filters.minLikes) {
      query["feedback.like"] = { $gte: filters.minLikes };
    }
    if (filters.status) {
      query.status = filters.status;
    }
    // Add more filters as needed

    const products = await Product.find(query);
    return products;
  } catch (error) {
    console.error("Error searching and filtering products:", error);
    throw error;
  }
}

module.exports = {
  searchAndFilterProducts,
};
