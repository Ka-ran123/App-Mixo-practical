import React from "react";
import { Modal, Button, Form } from "antd";
import { Formik, Form as FormikForm } from "formik";
import { editSchema } from "../../validation/validation";
import ReviewFormField from "./ReviewFormField";
import type { Review } from "../../store/slices/reviewSlice";

interface EditModalProps {
  open: boolean;
  review: Review | null;
  onClose: () => void;
  onSubmit: (values: { text: string; rating: number }) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({ open, review, onClose, onSubmit }) => (
  <Modal title="Edit Review" open={open} onCancel={onClose} footer={null} destroyOnClose>
    {review && (
      <Formik
        initialValues={{ text: review.text, rating: review.rating }}
        validationSchema={editSchema}
        onSubmit={onSubmit}
      >
        <FormikForm className="space-y-5">
          <ReviewFormField name="text" label="Review text" type="textarea" rows={5} />
          <ReviewFormField
            name="rating"
            label="Rating"
            type="select"
            options={[1, 2, 3, 4, 5].map((n) => ({ label: `${n} Star${n > 1 ? "s" : ""}`, value: String(n) }))}
            placeholder="Select rating"
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save changes
            </Button>
          </Form.Item>
        </FormikForm>
      </Formik>
    )}
  </Modal>
);

export default EditModal;
