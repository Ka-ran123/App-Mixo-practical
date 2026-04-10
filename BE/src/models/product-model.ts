import { model, Schema } from "mongoose";
import { IProduct } from "../types/types.js";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
  },
);

export const Product = model<IProduct>("Product", productSchema);
