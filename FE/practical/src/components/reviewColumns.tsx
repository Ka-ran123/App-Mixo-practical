import React from "react";
import { Button, Space, Tag } from "antd";
import type { Review } from "../store/slices/reviewSlice";

interface ReviewColumnHandlers {
  onView: (review: Review) => void;
  onEdit: (review: Review) => void;
  onApprove: (id: string) => void;
  onReject: (review: Review) => void;
}

export const getReviewColumns = ({ onView, onEdit, onApprove, onReject }: ReviewColumnHandlers) => [
  { title: "Author", dataIndex: "author", key: "author" },
  { title: "Rating", dataIndex: "rating", key: "rating" },
  { title: "Text", dataIndex: "text", key: "text", ellipsis: true },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "Approved" ? "green" : status === "Rejected" ? "red" : "orange"}>
        {status}
      </Tag>
    ),
  },
  { title: "Risk Score", dataIndex: "riskScore", key: "riskScore" },
  {
    title: "Actions",
    key: "actions",
    render: (_: unknown, record: Review) => (
      <Space wrap size="small">
        <Button type="default" size="small" shape="round" onClick={() => onView(record)}>View</Button>
        <Button type="default" size="small" shape="round" onClick={() => onEdit(record)}>Edit</Button>
        <Button type="primary" size="small" shape="round" onClick={() => onApprove(record._id)} disabled={record.status !== "Pending"}>Approve</Button>
        <Button danger size="small" shape="round" onClick={() => onReject(record)} disabled={record.status !== "Pending"}>Reject</Button>
      </Space>
    ),
  },
];
