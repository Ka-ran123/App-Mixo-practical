import React from "react";
import { Form, Input, InputNumber, Select } from "antd";
import { Field, useFormikContext } from "formik";

const { TextArea } = Input;

type FieldType = "text" | "textarea" | "number" | "select";

interface Option {
  label: string;
  value: string;
}

interface ReviewFormFieldProps {
  name: string;
  label: string;
  type?: FieldType;
  options?: Option[];
  rows?: number;
  min?: number;
  max?: number;
  placeholder?: string;
}

const ReviewFormField: React.FC<ReviewFormFieldProps> = ({
  name,
  label,
  type = "text",
  options = [],
  rows = 4,
  min,
  max,
  placeholder,
}) => {
  const { errors, touched, values, setFieldValue } = useFormikContext<Record<string, unknown>>();
  const hasError = !!(errors[name] && touched[name]);

  return (
    <Form.Item
      label={label}
      validateStatus={hasError ? "error" : ""}
      help={hasError ? (errors[name] as string) : ""}
    >
      {type === "textarea" && <Field name={name} as={TextArea} rows={rows} />}
      {type === "text" && <Field name={name} as={Input} placeholder={placeholder} />}
      {type === "number" && (
        <InputNumber
          min={min}
          max={max}
          value={values[name] as number}
          onChange={(value) => setFieldValue(name, value)}
          style={{ width: "100%" }}
        />
      )}
      {type === "select" && (
        <Select
          value={values[name] as string}
          onChange={(value) => setFieldValue(name, value)}
          options={options}
          placeholder={placeholder}
        />
      )}
    </Form.Item>
  );
};

export default ReviewFormField;
