import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: [true, "product name already exists"],
    required: [true, "product name is required"]
  },
  calories: {
    type: Number,
    required: [true, "calories amount is required"]
  },
  proteins: {
    type: Number,
    required: [true, "proteins amount is required"]
  },
  carbs: {
    type: Number,
    required: [true, "carbs amount is required"]
  },
  fat: {
    type: Number,
    required: [true, "fat amount is required"]
  },
})

const Product = models.Product || model("Product", ProductSchema);


export default Product;