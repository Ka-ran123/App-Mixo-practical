import { Router } from "express";
import {
  commonReviewIdValidation,
  validateReviewCreation,
  validateReviewReject,
  validateReviewUpdate,
} from "../validator/validation.js";
import { validateRequest } from "../middleware/validate-middleware.js";
import rateLimiter from "../middleware/rate-limit.js";
import {
  createReview,
  listReviews,
  editReview,
  approveReviewHandler,
  rejectReviewHandler,
  listFlaggedReviews,
} from "../controllers/review-controller.js";

const router = Router();

router.use(rateLimiter);

router.post("/", validateReviewCreation, validateRequest, createReview);

router.get("/", listReviews);

router.patch(
  "/:id",
  commonReviewIdValidation,
  validateReviewUpdate,
  validateRequest,
  editReview,
);

router.patch(
  "/:id/approve",
  commonReviewIdValidation,
  validateRequest,
  approveReviewHandler,
);

router.patch(
  "/:id/reject",
  commonReviewIdValidation,
  validateReviewReject,
  validateRequest,
  rejectReviewHandler,
);

router.get("/flagged", listFlaggedReviews);

export default router;
