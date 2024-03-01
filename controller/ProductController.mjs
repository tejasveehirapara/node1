import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    product_name: { type: String, require: true, unique: true },
    date: { type: Date, require: true, unique: false },
    product_image: {
        type: String, require: false,
    }
})

export { ProductSchema };