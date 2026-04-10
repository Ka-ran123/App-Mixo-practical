import { Types } from "mongoose";
import { ReviewStatus } from "../enums/enums.js";

export interface IProduct {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  productId: Types.ObjectId;
  author: string;
  rating: number;
  text: string;
  status: ReviewStatus;
  riskScore: number;
  flags: string[];
  moderatorReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
