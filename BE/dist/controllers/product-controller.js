import { AppSuccess } from "../helpers/base-class.js";
import { messages } from "../constant/messages.js";
import { checkProductExistsOrNot, createProductService, getProductList, } from "../services/product-services.js";
export const createProduct = async (req, res, next) => {
    try {
        const { name } = req.body;
        await checkProductExistsOrNot(name);
        const productData = {
            name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            imageUrl: req.body.imageUrl,
        };
        const product = await createProductService(productData);
        return AppSuccess.success(res, {
            product,
        }, messages.PRODUCT_CREATED_SUCCESSFULLY);
    }
    catch (err) {
        next(err);
    }
};
export const getProducts = async (req, res, next) => {
    try {
        const list = await getProductList();
        return AppSuccess.success(res, { list }, messages.PRODUCT_FETCHED_SUCCESSFULLY);
    }
    catch (error) {
        next(error);
    }
};
