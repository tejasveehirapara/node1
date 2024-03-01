import mongoose from "mongoose";
import { ProductSchema } from "../controller/ProductController.mjs";

const ProductModal = new mongoose.model('productDetails', ProductSchema)

export { ProductModal }