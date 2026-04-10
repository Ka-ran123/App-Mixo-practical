import { BLOCK_DURATION } from "./constant.js";

export const messages = {
  UNKNOWN_ERROR: "Unknown error",
  SUCCESS: "Success",
  INVALID_FILE_TYPE: "Invalid file type. Only JPEG, PNG, and JPG are allowed.",
  TOO_MANY_ATTEMPTS: `Too many attempts. Please try again after ${BLOCK_DURATION / (60 * 1000)} minutes.`,
  PRODUCT_ALREADY_EXISTS: "Product with this name already exists",
  PRODUCT_CREATED_SUCCESSFULLY: "Product created successfully",
  PRODUCT_LIST_NOT_FOUND: "Product list not found",
  PRODUCT_FETCHED_SUCCESSFULLY: "Product list fetched successfully",
  PRODUCT_NOT_FOUND: "Product not found",
  REVIEW_NOT_FOUND: "Review not found",
  REVIEW_CREATED_SUCCESSFULLY: "Review created successfully",
  REVIEW_UPDATED_SUCCESSFULLY: "Review updated successfully",
  REVIEW_APPROVED_SUCCESSFULLY: "Review approved successfully",
  REVIEW_REJECTED_SUCCESSFULLY: "Review rejected successfully",
  REVIEW_LIST_FETCHED_SUCCESSFULLY: "Reviews fetched successfully",
  FLAGGED_REVIEWS_FETCHED_SUCCESSFULLY: "Flagged reviews fetched successfully",
};
