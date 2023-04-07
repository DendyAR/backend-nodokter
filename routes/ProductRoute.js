import express from "express";
import { getProducts , getProductsById , createProducts , updateProducts, deleteProducts} from "../controller/ProductsController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js"

const router = express.Router();

router.get('/products',verifyUser,  getProducts);
router.get('/products/:id', verifyUser,getProductsById);
router.post('/products', adminOnly, createProducts);
router.patch('/products/:id', adminOnly, updateProducts);
router.delete('/products/:id', adminOnly, deleteProducts);

export default router;