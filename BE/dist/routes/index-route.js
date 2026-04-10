import { Router } from "express";
import productRoute from "./product-route.js";
import reviewRoute from "./review-route.js";
const router = Router();
router.use("/products", productRoute);
router.use("/reviews", reviewRoute);
export default router;
