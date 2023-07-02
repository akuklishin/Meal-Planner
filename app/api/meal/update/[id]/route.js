import Meal from "@/models/meal";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
  const { user, productsList, date, note } = await req.json();

  try {
      await connectToDB();

      // Find the existing prompt by ID
      const existingMeal = await Prompt.findById(params.id);

      if (!existingMeal) {
          return new Response("Meal not found", { status: 404 });
      }

      // Update the prompt with new data
      existingMeal.user = user;
      existingMeal.productsList = productsList;
      existingMeal.date = date;
      existingMeal.note = note;

      await existingMeal.save();

      return new Response("Successfully updated the Meal", { status: 200 });
  } catch (error) {
      return new Response("Error Updating Meal", { status: 500 });
  }
};