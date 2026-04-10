import { NextFunction, Request, Response } from "express";
import { AppSuccess } from "../helpers/base-class.js";
import { messages } from "../constant/messages.js";
import {
  createReviewService,
  getReviewList,
  updateReviewTextRating,
  approveReview,
  rejectReview,
  getListFlaggedReviews,
} from "../services/review-services.js";

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviewData = {
      productId: req.body.productId,
      author: req.body.author,
      rating: req.body.rating,
      text: req.body.text,
    };

    const review = await createReviewService(reviewData);

    return AppSuccess.success(
      res,
      { review },
      messages.REVIEW_CREATED_SUCCESSFULLY,
    );
  } catch (error) {
    next(error);
  }
};

export const editReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviewId = String(req.params.id);
    const review = await updateReviewTextRating(reviewId, {
      rating: req.body.rating,
      text: req.body.text,
    });

    return AppSuccess.success(
      res,
      { review },
      messages.REVIEW_UPDATED_SUCCESSFULLY,
    );
  } catch (error) {
    next(error);
  }
};

export const approveReviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviewId = String(req.params.id);
    const review = await approveReview(reviewId);

    return AppSuccess.success(
      res,
      { review },
      messages.REVIEW_APPROVED_SUCCESSFULLY,
    );
  } catch (error) {
    next(error);
  }
};

export const rejectReviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviewId = String(req.params.id);
    const review = await rejectReview(reviewId, req.body.reason || null);

    return AppSuccess.success(
      res,
      { review },
      messages.REVIEW_REJECTED_SUCCESSFULLY,
    );
  } catch (error) {
    next(error);
  }
};

export const listReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page = "1", perPage = "10" } = req.query as Record<string, string>;

    const reviewList = await getReviewList({
      page,
      perPage,
    });

    return AppSuccess.success(
      res,
      reviewList,
      messages.REVIEW_LIST_FETCHED_SUCCESSFULLY,
    );
  } catch (error) {
    next(error);
  }
};

export const listFlaggedReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { scoreGt } = req.query as Record<string, string>;

    const reviewList = await getListFlaggedReviews({
      scoreGt,
    });

    return AppSuccess.success(
      res,
      reviewList,
      messages.FLAGGED_REVIEWS_FETCHED_SUCCESSFULLY,
    );
  } catch (error) {
    next(error);
  }
};
