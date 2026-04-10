import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export interface Review {
  _id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  status: "Pending" | "Approved" | "Rejected";
  riskScore: number;
  flags: string[];
  moderatorReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ReviewState {
  reviews: Review[];
  products: Product[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  products: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

// Async thunks
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (params: { page?: number; perPage?: number } = {}) => {
    const { page = 1, perPage = 10 } = params;
    const response = await api.get("/reviews", {
      params: {
        page,
        perPage,
      },
    });
    return {
      reviews: response.data.data.reviews,
      pagination: response.data.data.pagination,
    };
  },
);

export const approveReview = createAsyncThunk(
  "reviews/approveReview",
  async (id: string) => {
    const response = await api.patch(`/reviews/${id}/approve`);
    return response.data.data.review;
  },
);

export const rejectReview = createAsyncThunk(
  "reviews/rejectReview",
  async ({ id, reason }: { id: string; reason: string }) => {
    const response = await api.patch(`/reviews/${id}/reject`, { reason });
    return response.data.data.review;
  },
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({
    productId,
    author,
    rating,
    text,
  }: {
    productId: string;
    author: string;
    rating: number;
    text: string;
  }) => {
    const response = await api.post("/reviews", {
      productId,
      author,
      rating,
      text,
    });
    return response.data.data.review;
  },
);

export const fetchProducts = createAsyncThunk(
  "reviews/fetchProducts",
  async () => {
    const response = await api.get("/products");
    return response.data.data.list;
  },
);

export const editReview = createAsyncThunk(
  "reviews/editReview",
  async ({
    id,
    text,
    rating,
  }: {
    id: string;
    text: string;
    rating: number;
  }) => {
    const response = await api.patch(`/reviews/${id}`, { text, rating });
    return response.data.data.review;
  },
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch reviews";
      })
      .addCase(approveReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (r) => r._id === action.payload._id,
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(rejectReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (r) => r._id === action.payload._id,
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(editReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (r) => r._id === action.payload._id,
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export default reviewSlice.reducer;
