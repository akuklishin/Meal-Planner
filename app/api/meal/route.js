import Meal from "@/models/meal";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();
        const allMeals = await Meal.find({});
        return new Response(JSON.stringify(allMeals), {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        console.error(error);
        return {status: 500, body: JSON.stringify({message: "Server error", error: error.message})};
    }
};