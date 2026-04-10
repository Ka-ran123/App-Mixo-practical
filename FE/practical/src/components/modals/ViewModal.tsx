import React from "react";
import { Modal } from "antd";
import type { Review } from "../../store/slices/reviewSlice";

interface ViewModalProps {
  open: boolean;
  review: Review | null;
  onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ open, review, onClose }) => (
  <Modal title="Review Details" open={open} onCancel={onClose} footer={null}>
    {review && (
      <div>
        <p><strong>Author:</strong> {review.author}</p>
        <p><strong>Rating:</strong> {review.rating}</p>
        <p><strong>Text:</strong> {review.text}</p>
        <p><strong>Status:</strong> {review.status}</p>
        <p><strong>Risk Score:</strong> {review.riskScore}</p>
        <p><strong>Flags:</strong> {review.flags.join(", ")}</p>
        {review.moderatorReason && (
          <p><strong>Moderator Reason:</strong> {review.moderatorReason}</p>
        )}
      </div>
    )}
  </Modal>
);

export default ViewModal;
