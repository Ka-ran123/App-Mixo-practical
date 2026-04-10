import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Space,
  Tag,
} from "antd";
import { Formik, Form as FormikForm, Field } from "formik";
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
import {
  createSchema,
  editSchema,
  rejectSchema,
} from "../validation/validation";

const { TextArea } = Input;

const ReviewList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews, loading, products, pagination } = useSelector(
    (state: RootState) => state.reviews,
  );

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    dispatch(fetchReviews({}));
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleView = (review: Review) => {
    setSelectedReview(review);
    setViewModalVisible(true);
  };

  const handleEdit = (review: Review) => {
    setSelectedReview(review);
    setEditModalVisible(true);
  };

  const handleOpenCreate = () => {
    setSelectedReview(null);
    setCreateModalVisible(true);
  };

  const handleApprove = async (id: string) => {
    try {
      await dispatch(approveReview(id)).unwrap();
      message.success("Review approved successfully");
    } catch (error) {
      message.error(`Failed to approve review ${error}`);
    }
  };

  const handleReject = (review: Review) => {
    setSelectedReview(review);
    setRejectModalVisible(true);
  };

  const handleRejectSubmit = async (values: { reason: string }) => {
    if (selectedReview) {
      try {
        await dispatch(
          rejectReview({ id: selectedReview._id, reason: values.reason }),
        ).unwrap();
        message.success("Review rejected successfully");
        setRejectModalVisible(false);
      } catch {
        message.error("Failed to reject review");
      }
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
        createReview({
          productId: values.productId,
          author: values.author,
          rating: values.rating,
          text: values.text,
        }),
      ).unwrap();
      message.success("Review created successfully");
      setCreateModalVisible(false);
    } catch {
      message.error("Failed to create review");
    }
  };

  const handleEditSubmit = async (values: { text: string; rating: number }) => {
    if (selectedReview) {
      try {
        await dispatch(
          editReview({
            id: selectedReview._id,
            text: values.text,
            rating: values.rating,
          }),
        ).unwrap();
        message.success("Review updated successfully");
        setEditModalVisible(false);
      } catch {
        message.error("Failed to update review");
      }
    }
  };

  const columns = [
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Approved"
              ? "green"
              : status === "Rejected"
                ? "red"
                : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Review) => (
        <Space wrap size="small">
          <Button
            type="default"
            size="small"
            shape="round"
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Button
            type="default"
            size="small"
            shape="round"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            size="small"
            shape="round"
            onClick={() => handleApprove(record._id)}
            disabled={record.status !== "Pending"}
          >
            Approve
          </Button>
          <Button
            danger
            size="small"
            shape="round"
            onClick={() => handleReject(record)}
            disabled={record.status !== "Pending"}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const totalReviews = pagination.total;
  const pendingReviews = reviews.filter(
    (review) => review.status === "Pending",
  ).length;
  const approvedReviews = reviews.filter(
    (review) => review.status === "Approved",
  ).length;

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
            <Button type="primary" onClick={handleOpenCreate}>
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
              onChange: (page, pageSize) => {
                dispatch(fetchReviews({ page, perPage: pageSize }));
              },
            }}
            className="rounded-3xl"
          />
        </div>
      </div>

      {/* View Modal */}
      <Modal
        title="Review Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
      >
        {selectedReview && (
          <div>
            <p>
              <strong>Author:</strong> {selectedReview.author}
            </p>
            <p>
              <strong>Rating:</strong> {selectedReview.rating}
            </p>
            <p>
              <strong>Text:</strong> {selectedReview.text}
            </p>
            <p>
              <strong>Status:</strong> {selectedReview.status}
            </p>
            <p>
              <strong>Risk Score:</strong> {selectedReview.riskScore}
            </p>
            <p>
              <strong>Flags:</strong> {selectedReview.flags.join(", ")}
            </p>
            {selectedReview.moderatorReason && (
              <p>
                <strong>Moderator Reason:</strong>{" "}
                {selectedReview.moderatorReason}
              </p>
            )}
          </div>
        )}
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Create Review"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
      >
        <Formik
          initialValues={{
            productId: "",
            author: "",
            rating: 3,
            text: "",
          }}
          validationSchema={createSchema}
          onSubmit={handleCreateSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <FormikForm className="space-y-5">
              <Form.Item
                label="Product"
                validateStatus={
                  errors.productId && touched.productId ? "error" : ""
                }
                help={
                  errors.productId && touched.productId ? errors.productId : ""
                }
              >
                <Select
                  value={values.productId}
                  onChange={(value) => setFieldValue("productId", value)}
                  options={products.map((product) => ({
                    label: product.name,
                    value: product.id,
                  }))}
                  placeholder="Select product"
                />
              </Form.Item>

              <Form.Item
                label="Author"
                validateStatus={errors.author && touched.author ? "error" : ""}
                help={errors.author && touched.author ? errors.author : ""}
              >
                <Field name="author" as={Input} />
              </Form.Item>

              <Form.Item
                label="Rating"
                validateStatus={errors.rating && touched.rating ? "error" : ""}
                help={errors.rating && touched.rating ? errors.rating : ""}
              >
                <InputNumber
                  min={1}
                  max={5}
                  value={values.rating}
                  onChange={(value) => setFieldValue("rating", value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Review text"
                validateStatus={errors.text && touched.text ? "error" : ""}
                help={errors.text && touched.text ? errors.text : ""}
              >
                <Field name="text" as={TextArea} rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Create review
                </Button>
              </Form.Item>
            </FormikForm>
          )}
        </Formik>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Review"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        {selectedReview && (
          <Formik
            enableReinitialize
            initialValues={{
              text: selectedReview.text,
              rating: selectedReview.rating,
            }}
            validationSchema={editSchema}
            onSubmit={handleEditSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <FormikForm className="space-y-5">
                <Form.Item
                  label="Review text"
                  validateStatus={errors.text && touched.text ? "error" : ""}
                  help={errors.text && touched.text ? errors.text : ""}
                >
                  <Field name="text" as={TextArea} rows={5} />
                </Form.Item>

                <Form.Item
                  label="Rating"
                  validateStatus={
                    errors.rating && touched.rating ? "error" : ""
                  }
                  help={errors.rating && touched.rating ? errors.rating : ""}
                >
                  <InputNumber
                    min={1}
                    max={5}
                    value={values.rating}
                    onChange={(value) => setFieldValue("rating", value)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Save changes
                  </Button>
                </Form.Item>
              </FormikForm>
            )}
          </Formik>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        title="Reject Review"
        open={rejectModalVisible}
        onCancel={() => setRejectModalVisible(false)}
        footer={null}
      >
        <Formik
          initialValues={{ reason: "" }}
          validationSchema={rejectSchema}
          onSubmit={handleRejectSubmit}
        >
          {({ errors, touched }) => (
            <FormikForm>
              <Form.Item
                label="Rejection Reason"
                validateStatus={errors.reason && touched.reason ? "error" : ""}
                help={errors.reason && touched.reason ? errors.reason : ""}
              >
                <Field name="reason" as={TextArea} rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ReviewList;
