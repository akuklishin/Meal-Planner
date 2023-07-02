import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();
        const allProducts = await Product.find({});
        return new Response(JSON.stringify(allProducts), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return { status: 500, body: JSON.stringify({ message: "Server error", error: error.message }) };
    }
};