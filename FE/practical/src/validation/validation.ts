import * as Yup from "yup";

const createSchema = Yup.object().shape({
  productId: Yup.string().required("Product is required"),
  author: Yup.string().required("Author is required"),
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating can be at most 5")
    .required("Rating is required"),
  text: Yup.string().required("Review text is required"),
});

const editSchema = Yup.object().shape({
  text: Yup.string().required("Review text is required"),
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating can be at most 5")
    .required("Rating is required"),
});

const rejectSchema = Yup.object().shape({
  reason: Yup.string().required("Reason is required"),
});

export { createSchema, editSchema, rejectSchema };
