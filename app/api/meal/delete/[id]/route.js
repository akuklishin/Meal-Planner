import Meal from "@/models/meal";
import { connectToDB } from "@/utils/database";

export const DELETE = async (request, { params }) => {
  try {
      await connectToDB();

      // Find the prompt by ID and remove it
      await Meal.findByIdAndRemove(params.id);

      return new Response("Meal deleted successfully", { status: 200 });
  } catch (error) {
      return new Response("Error deleting meal", { status: 500 });
  }
}