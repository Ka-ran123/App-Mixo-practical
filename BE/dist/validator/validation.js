import { body, param } from "express-validator";
export const validateProductCreation = [
    body("name").notEmpty().withMessage("Product name is required."),
    body("price")
        .notEmpty()
        .withMessage("Price is required.")
        .isFloat({ gt: 0 })
        .withMessage("Price must be a positive number."),
    body("stock")
        .notEmpty()
        .withMessage("Stock is required.")
        .isInt({ gt: 0 })
        .withMessage("Stock must be a positive integer."),
    body("category").notEmpty().withMessage("Category is required."),
];
export const validateReviewCreation = [
    body("productId")
        .notEmpty()
        .withMessage("Product ID is required.")
        .isMongoId()
        .withMessage("Product ID must be a valid Mongo ID."),
    body("author").notEmpty().withMessage("Author is required."),
    body("rating")
        .notEmpty()
        .withMessage("Rating is required.")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be an integer between 1 and 5.")
        .toInt(),
    body("text").notEmpty().withMessage("Review text is required."),
];
export const commonReviewIdValidation = [
    param("id")
        .notEmpty()
        .withMessage("Review ID is required.")
        .isMongoId()
        .withMessage("Review ID must be a valid Mongo ID."),
];
export const validateReviewUpdate = [
    body("rating")
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be an integer between 1 and 5.")
        .toInt(),
    body("text")
        .optional()
        .notEmpty()
        .withMessage("Review text cannot be empty."),
    body().custom((_, { req }) => {
        if (req.body.rating === undefined && req.body.text === undefined) {
            throw new Error("At least one of rating or text is required.");
        }
        return true;
    }),
];
export const validateReviewReject = [
    body("reason").isString().withMessage("Reason must be a string."),
];
