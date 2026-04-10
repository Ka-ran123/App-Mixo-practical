import { messages } from "../constant/messages.js";
import { HttpStatus } from "../enums/enums.js";
import { AppError } from "../helpers/base-class.js";
import { capitalize } from "../helpers/utils.js";
import { Product } from "../models/product-model.js";
export const checkProductExistsOrNot = async (name) => {
    const product = await Product.findOne({
        name: name.toLowerCase(),
    });
    if (product) {
        throw new AppError(HttpStatus.FORBIDDEN, messages.PRODUCT_ALREADY_EXISTS);
    }
};
export const createProductService = async (productData) => {
    const product = new Product(productData);
    await product.save();
    return product;
};
export const getProductList = async () => {
    const products = await Product.find();
    if (!products) {
        throw new AppError(HttpStatus.NOT_FOUND, messages.PRODUCT_LIST_NOT_FOUND);
    }
    const formattedProducts = products.map((product) => ({
        id: product._id,
        name: capitalize(product.name),
    }));
    return formattedProducts;
};
