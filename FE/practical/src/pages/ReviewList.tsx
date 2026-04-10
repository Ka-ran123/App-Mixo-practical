import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, message } from "antd";
import type { RootState, AppDispatch } from "../store/store";
import {
  fetchReviews,
  approveReview,
  rejectReview,
  editReview,
  createReview,
  fetchProducts,
  type Review,
} from "../store/slices/reviewSlice";
import ReviewHeader from "../components/ReviewHeader";
import { getReviewColumns } from "../components/reviewColumns";
import ViewModal from "../components/modals/ViewModal";
import CreateModal from "../components/modals/CreateModal";
import EditModal from "../components/modals/EditModal";
import RejectModal from "../components/modals/RejectModal";

const ReviewList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews, loading, products, pagination } = useSelector(
    (state: RootState) => state.reviews,
  );

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    dispatch(fetchReviews({}));
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleView = (review: Review) => {
    setSelectedReview(review);
    setViewOpen(true);
  };
  const handleEdit = (review: Review) => {
    setSelectedReview(review);
    setEditOpen(true);
  };
  const handleReject = (review: Review) => {
    setSelectedReview(review);
    setRejectOpen(true);
  };

  const handleApprove = async (id: string) => {
    try {
      await dispatch(approveReview(id)).unwrap();
      message.success("Review approved successfully");
    } catch (error) {
      message.error(`Failed to approve review ${error}`);
    }
  };

  const handleRejectSubmit = async (values: { reason: string }) => {
    if (!selectedReview) return;
    try {
      await dispatch(
        rejectReview({ id: selectedReview._id, reason: values.reason }),
      ).unwrap();
      message.success("Review rejected successfully");
      setRejectOpen(false);
    } catch {
      message.error("Failed to reject review");
    }
  };

  const handleCreateSubmit = async (values: {
    productId: string;
    author: string;
    rating: number;
    text: string;
  }) => {
    try {
      await dispatch(
        createReview({ ...values, rating: Number(values.rating) }),
      ).unwrap();
      message.success("Review created successfully");
      setCreateOpen(false);
    } catch {
      message.error("Failed to create review");
    }
  };

  const handleEditSubmit = async (values: { text: string; rating: number }) => {
    if (!selectedReview) return;
    try {
      await dispatch(
        editReview({
          id: selectedReview._id,
          text: values.text,
          rating: Number(values.rating),
        }),
      ).unwrap();
      message.success("Review updated successfully");
      setEditOpen(false);
    } catch {
      message.error("Failed to update review");
    }
  };

  const columns = getReviewColumns({
    onView: handleView,
    onEdit: handleEdit,
    onApprove: handleApprove,
    onReject: handleReject,
  });

  const totalReviews = pagination.total;
  const pendingReviews = reviews.filter((r) => r.status === "Pending").length;
  const approvedReviews = reviews.filter((r) => r.status === "Approved").length;

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ReviewHeader
          totalReviews={totalReviews}
          pendingReviews={pendingReviews}
          approvedReviews={approvedReviews}
        />

        <div className="overflow-hidden rounded-[28px] bg-white p-6 shadow-2xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Review list
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Browse the latest reviews and take action on each submission.
              </p>
            </div>
            <Button type="primary" onClick={() => setCreateOpen(true)}>
              Add Review
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={reviews}
            rowKey="_id"
            loading={loading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: pagination.total,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
              onChange: (page, pageSize) =>
                dispatch(fetchReviews({ page, perPage: pageSize })),
            }}
            className="rounded-3xl"
          />
        </div>
      </div>

      <ViewModal
        open={viewOpen}
        review={selectedReview}
        onClose={() => setViewOpen(false)}
      />
      <CreateModal
        open={createOpen}
        products={products}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateSubmit}
      />
      <EditModal
        open={editOpen}
        review={selectedReview}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
      />
      <RejectModal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onSubmit={handleRejectSubmit}
      />
    </div>
  );
};

export default ReviewList;
