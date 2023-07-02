import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async(req) => {
    const { name, calories, proteins, carbs, fat } = await req.json();

    try {
        await connectToDB();

        // Check if product already exists
        const existingProduct = await Product.findOne({ name });

        if(existingProduct) {
            return new Response(JSON.stringify(existingProduct), { status: 200 });
        }

        const newProduct = new Product({
            name,
            calories,
            proteins,
            carbs,
            fat
        })

        await newProduct.save();

        return new Response(JSON.stringify(newProduct), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response('Failed to create new product', { status: 500})
    }
}