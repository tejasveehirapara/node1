import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    product_name: { type: String, require: true },
    date: { type: String, require: true, unique: false },
    product_image: {
        type: String
    }
})

export { ProductSchema };