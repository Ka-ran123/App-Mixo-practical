import { model, Schema } from "mongoose";
import { ReviewStatus } from "../enums/enums.js";
const reviewSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    text: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(ReviewStatus),
        default: ReviewStatus.PENDING,
    },
    riskScore: {
        type: Number,
        //   required: true,
        min: 0,
        max: 100,
    },
    flags: {
        type: [String],
        default: [],
    },
    moderatorReason: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
    strict: true,
    versionKey: false,
});
export const Review = model("Review", reviewSchema);
