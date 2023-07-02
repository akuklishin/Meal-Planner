import Meal from "@/models/meal";
import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  const { user, productsList, date, note } = await req.json();

  try {
    await connectToDB();

    // const populatedProductsList = [];
    // for (const item of productsList) {
    //   const product = await Product.findById(item.product);
    //   if (product) {
    //     populatedProductsList.push({
    //       name: product.name,
    //       calories: product.calories,
    //       proteins: product.proteins,
    //       carbs: product.carbs,
    //       fat: product.fat,
    //       quantity: item.quantity
    //     });
    //   }
    // }

    const newMeal = new Meal({
      user,
      productsList,
      date,
      note
    });

    await newMeal.save();

    return new Response(JSON.stringify(newMeal), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to create new Meal', error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
