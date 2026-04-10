import { AppError } from "../helpers/base-class.js";
import { HttpStatus, ReviewStatus } from "../enums/enums.js";
import { messages } from "../constant/messages.js";
import { Product } from "../models/product-model.js";
import { Review } from "../models/review-model.js";
import { calculateReviewRisk } from "../helpers/review-risk.js";
export const createReviewService = async (reviewData) => {
    const productExists = await Product.exists({ _id: reviewData.productId });
    if (!productExists) {
        throw new AppError(HttpStatus.NOT_FOUND, messages.PRODUCT_NOT_FOUND);
    }
    const { riskScore, flags } = calculateReviewRisk({
        rating: reviewData.rating,
        text: reviewData.text,
    });
    const review = new Review({
        ...reviewData,
        riskScore,
        flags,
    });
    await review.save();
    return review;
};
export const updateReviewTextRating = async (reviewId, reviewData) => {
    const review = await Review.findById(reviewId);
    if (!review) {
        throw new AppError(HttpStatus.NOT_FOUND, messages.REVIEW_NOT_FOUND);
    }
    if (reviewData.text !== undefined) {
        review.text = reviewData.text;
    }
    if (reviewData.rating !== undefined) {
        review.rating = reviewData.rating;
    }
    const { riskScore, flags } = calculateReviewRisk({
        rating: review.rating,
        text: review.text,
    });
    review.riskScore = riskScore;
    review.flags = flags;
    await review.save();
    return review;
};
export const approveReview = async (reviewId) => {
    const review = await Review.findById(reviewId);
    if (!review) {
        throw new AppError(HttpStatus.NOT_FOUND, messages.REVIEW_NOT_FOUND);
    }
    review.status = ReviewStatus.APPROVED;
    await review.save();
    return review;
};
export const rejectReview = async (reviewId, moderatorReason) => {
    const review = await Review.findById(reviewId);
    if (!review) {
        throw new AppError(HttpStatus.NOT_FOUND, messages.REVIEW_NOT_FOUND);
    }
    review.status = ReviewStatus.REJECTED;
    review.moderatorReason = moderatorReason || review.moderatorReason || null;
    await review.save();
    return review;
};
export const getReviewList = async ({ page = "1", perPage = "10", productId, scoreGt, }) => {
    const limit = Math.max(parseInt(perPage, 10) || 10, 1);
    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const skip = (currentPage - 1) * limit;
    const filters = {};
    if (productId) {
        filters.productId = productId;
    }
    if (scoreGt !== undefined) {
        const scoreGtNum = parseInt(scoreGt, 10);
        if (!isNaN(scoreGtNum)) {
            filters.riskScore = { $gt: scoreGtNum };
        }
    }
    const [total, reviews] = await Promise.all([
        Review.countDocuments(filters),
        Review.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ]);
    return {
        reviews,
        pagination: {
            total,
            page: currentPage,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
export const getFlaggedReviews = async ({ page = "1", perPage = "10", productId, }) => {
    const limit = Math.max(parseInt(perPage, 10) || 10, 1);
    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const skip = (currentPage - 1) * limit;
    const filters = {
        riskScore: { $gt: 50 }, // Default threshold for flagged reviews
    };
    if (productId) {
        filters.productId = productId;
    }
    const [total, reviews] = await Promise.all([
        Review.countDocuments(filters),
        Review.find(filters).sort({ riskScore: -1 }).skip(skip).limit(limit).lean(),
    ]);
    return {
        reviews,
        pagination: {
            total,
            page: currentPage,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
