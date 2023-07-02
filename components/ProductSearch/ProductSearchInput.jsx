"use client"

import { useState, useEffect, useRef } from 'react';
import { fetchData } from "@/utils/service";

const ProductSearchInput = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const debounceTimer = useRef(null);

    useEffect(() => {
        getAllProducts();
    }, []);

    // instant search
    useEffect(() => {
        // Clear any existing timers
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set a new timer
        debounceTimer.current = setTimeout(() => {
            if (query.length > 2) {
                handleSearch(query);
            }
        }, 500); // delay

        // Clear the timer when the component is unmounted
        return () => {
            clearTimeout(debounceTimer.current);
        };
    }, [query]);

    const getAllProducts = async () => {
        try {
            const response = await fetch(`/api/product`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`Network response was not ok, message: ${errorBody.message}, error: ${errorBody.error}`);
            }

            const allProducts = await response.json();
            console.log('Products from DB:', allProducts);

            const transformedProducts = allProducts.map(product => ({
                _id: product._id,
                name: product.name,
                calories: product.calories,
                proteins: product.proteins,
                carbs: product.carbs,
                fat: product.fat
            }));

            setProducts(transformedProducts);

        } catch (error) {
            console.log('Failed to fetch products: ', error);
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const fetchDataFromAPI = async (query) => {
        let filteredProducts = [];

        // Fetch data from API
        try {
            const response = await fetchData(query);
            if (response) {
                let productNames = new Set();
                for (let i = 0; i < response.hints.length; i++) {
                    let newProduct = {
                        name: response.hints[i].food.label,
                        calories: response.hints[i].food.nutrients.ENERC_KCAL,
                        proteins: response.hints[i].food.nutrients.PROCNT,
                        carbs: response.hints[i].food.nutrients.CHOCDF,
                        fat: response.hints[i].food.nutrients.FAT,
                    };
                    if (!productNames.has(newProduct.name)) {
                        productNames.add(newProduct.name);
                        const savedProduct = await saveProductToDB(newProduct);
                        if (savedProduct) {
                            filteredProducts.push(savedProduct);
                        }
                    }
                }
            }
        } catch (error) {
            console.log('Failed to fetch data from API: ', error);
        }

        return filteredProducts;
    };

    // save product to db
    const saveProductToDB = async (product) => {
        try {
            const response = await fetch('/api/product/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Add the newly saved product to the local state
            setProducts((prevProducts) => [...prevProducts, data]);

            // Return the saved product
            return data;

        } catch (error) {
            console.log('Failed to save product: ', error);
            return null;
        }
    };

    const handleSearch = async (query) => {
        // If there's no query, don't do anything
        if (query === '') {
            return;
        }

        // Check if the products are in the state
        const matchingProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        // If products are found in state, use them
        // if (matchingProducts.length > 0) {
        //     onSearch(matchingProducts);
        //     return;
        // }

        // Check if the product is already in the products state
        const isProductInState = products.some((product) => 
            product.name.toLowerCase() === query.toLowerCase()
        );

        if (isProductInState) {
            // If the product is already in the state, don't fetch data from API
            onSearch(matchingProducts);
            return;
        }

        // If no matching products in state, fetch from the API, save to DB and state
        const fetchedProducts = await fetchDataFromAPI(query);
        setProducts(prevProducts => [...prevProducts, ...fetchedProducts]);
        onSearch(fetchedProducts);
    };

    return (
        <div className="flex">
            <input
                type="text"
                className="w-full bg-gray-200 text-black rounded-xl px-4 pl-8 py-2"
                placeholder="Search for products..."
                value={query}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default ProductSearchInput;
