import React from "react";
import { Modal, Button, Form } from "antd";
import { Formik, Form as FormikForm } from "formik";
import { rejectSchema } from "../../validation/validation";
import ReviewFormField from "./ReviewFormField";

interface RejectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { reason: string }) => Promise<void>;
}

const RejectModal: React.FC<RejectModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => (
  <Modal title="Reject Review" open={open} onCancel={onClose} footer={null} destroyOnClose>
    <Formik
      initialValues={{ reason: "" }}
      validationSchema={rejectSchema}
      onSubmit={onSubmit}
    >
      <FormikForm>
        <ReviewFormField
          name="reason"
          label="Rejection Reason"
          type="textarea"
        />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </FormikForm>
    </Formik>
  </Modal>
);

export default RejectModal;
