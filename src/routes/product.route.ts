import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const router = Router();

router.get("/fetch-products", productController.populateProduct);

export default router;
