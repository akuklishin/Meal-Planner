"use client"

import {useEffect, useState} from "react";
import ProductSearchContainer from "@/components/ProductSearch/ProductSearchContainer";
import MealCard from "@/components/Meal/MealCard";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session, status } = useSession();
    const [savedMeals, setSavedMeals] = useState([]);
    const [loading, setLoading] = useState(true); //?
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     fetch('/api/products', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => setProducts(data))
    //         .catch(err => console.error("Error loading products: ", err));
    // }, []);

    useEffect(() => {

        // display loading state
        setLoading(true);

        if (status !== 'loading' && session) {
        fetch(`/api/meal`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then((mealsData) => {

                // filter the meals in descending order for logged user
                const userMeals = mealsData
                    .filter((meal) => meal.user === session.user._id)
                    .sort((a, b) => new Date(b.date) - new Date(a.date));

                // set the state with complete meals data
                setSavedMeals(userMeals);
            })
            .catch(err => console.error("Error loading meals: ", err))
            .finally(() => setLoading(false));  // set loading to false after fetching data
         }
    }, [status, session]);

    // display loading state
    if (status === 'loading') {
        return <div>Loading...</div>
    }

    // just for testing
    // display message if user is not logged in
    // if (!session) {
    //     return <div>Please log in to view this page.</div>
    // }

    const handleSaveMeal = ({ id, isExistingMeal, date, note, products }) => {
        // Prepare the meal data
        const mealData = {
            user: session.user._id,
            date,
            note,
            productsList: products.map((product) => ({
                name: product.name,
                calories: product.calories,
                proteins: product.proteins,
                carbs: product.carbs,
                fat: product.fat,
                quantity: product.quantity
            }))
        };

        console.log('handleSaveMeal called', { id, isExistingMeal, mealData });

        if (isExistingMeal) {

            console.log('Updating existing meal', { id, mealData });

            // DB update existing meal
            fetch(`/api/meal/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mealData),
            })
                .then(response => response.json())
                .then(updatedMeal => {
                    console.log('Updated meal received', updatedMeal);

                    // find the updated meal in savedMeals and replace it
                    const updatedMeals = savedMeals.map(meal =>
                        meal._id === updatedMeal._id ? updatedMeal : meal
                    );
                    setSavedMeals(updatedMeals);
                })
                .catch(error => {
                    console.error('Error updating meal:', error);
                });

        } else {

            console.log('Creating new meal', mealData);

            // DB create new meal
            fetch('/api/meal/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mealData),
            })
                .then(response => response.json())
                .then(newMeal => {
                    console.log('New meal created', newMeal);

                    // Add the new meal and sort the array by date descending
                    setSavedMeals(prevMeals => {
                        const updatedMeals = [...prevMeals, newMeal];
                        return updatedMeals.sort((a, b) => new Date(b.date) - new Date(a.date));
                    });
                })
                .catch(error => {
                    console.error('Error creating meal:', error);
                });
        }
    };

    const handleDeleteMeal = (id) => {

        console.log(`Deleting meal with id: ${id}`);

        // DB delete meal
        fetch(`/api/meal/delete/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                // remove the deleted meal from the state
                setSavedMeals(prevMeals => prevMeals.filter(meal => meal._id !== id));
            })
            .catch(error => console.error('Error deleting meal:', error));
    };

    return (
        <>
            {/* <h1>Hello, {session.user.email}</h1> */}
            {/* title */}
            <h1 className="text-4xl mt-8 mb-4 font-light uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
                Plan your meals:
            </h1>

            {/* how-to */}
            <p className="text-xl mt-4 mb-8">
                <span className="font-bold">Search</span> for products then <span className="font-bold">drag & drop</span> them to your chosen meal below.
            </p>

            {/* search input and results */}
            <ProductSearchContainer />

            {/* how-to */}
            <p className="text-xl mt-8 mb-4">
                You can <span className="font-bold">pick any date</span> or <span className="font-bold">annotate</span> your meal before saving it.
            </p>

            {/* meals row */}
            <div className="custom-scrollbar mb-16 py-4 flex overflow-x-scroll space-x-4">

                {/* empty meal card */}
                <MealCard
                    mealId={false}
                    defaultDate={null}
                    note={''}
                    products={[]}
                    onSaveMeal={handleSaveMeal}
                />

                {/* saved meals cards */}
                {savedMeals.map((meal, index) => (

                    <MealCard
                        isExistingMeal={true}
                        mealId={meal._id}
                        key={meal._id} // IMPORTANT for rendering
                        defaultDate={meal.date}
                        note={meal.note}
                        products={meal.productsList}
                        onSaveMeal={handleSaveMeal}
                        onDeleteMeal={handleDeleteMeal}
                    />
                ))}
  
            </div>
        </>
    )
}
