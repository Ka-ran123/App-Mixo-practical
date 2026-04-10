import React from "react";
import { Modal, Button, Form } from "antd";
import { Formik, Form as FormikForm } from "formik";
import { createSchema } from "../../validation/validation";
import ReviewFormField from "./ReviewFormField";
import type { Product } from "../../store/slices/reviewSlice";

interface CreateModalProps {
  open: boolean;
  products: Product[];
  onClose: () => void;
  onSubmit: (values: {
    productId: string;
    author: string;
    rating: number;
    text: string;
  }) => Promise<void>;
}

const CreateModal: React.FC<CreateModalProps> = ({
  open,
  products,
  onClose,
  onSubmit,
}) => (
  <Modal
    title="Create Review"
    open={open}
    onCancel={onClose}
    footer={null}
    destroyOnClose
  >
    <Formik
      initialValues={{ productId: "", author: "", rating: 1, text: "" }}
      validationSchema={createSchema}
      onSubmit={onSubmit}
    >
      <FormikForm className="space-y-5">
        <ReviewFormField
          name="productId"
          label="Product"
          type="select"
          options={products.map((p) => ({ label: p.name, value: p.id }))}
          placeholder="Select product"
        />
        <ReviewFormField
          name="author"
          label="Author"
          placeholder="Enter author"
        />
        <ReviewFormField
          name="rating"
          label="Rating"
          type="select"
          options={[1, 2, 3, 4, 5].map((n) => ({ label: `${n} Star${n > 1 ? "s" : ""}`, value: String(n) }))}
          placeholder="Select rating"
        />
        <ReviewFormField name="text" label="Review text" type="textarea" />
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create review
          </Button>
        </Form.Item>
      </FormikForm>
    </Formik>
  </Modal>
);

export default CreateModal;
