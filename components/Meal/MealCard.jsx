import {useState} from 'react';

const MealCard = ({
                      isExistingMeal,
                      mealId,
                      defaultDate,
                      note: initialNote = '',
                      products: initialProducts = [],
                      onSaveMeal,
                      onDeleteMeal
                  }) => {

    const [products, setProducts] = useState(initialProducts);
    const [note, setNote] = useState(initialNote);

    const formatDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const [selectedDate, setSelectedDate] = useState(formatDate(defaultDate) || '');

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const droppedProduct = JSON.parse(e.dataTransfer.getData('product'));
        droppedProduct.uniqueKey = new Date().getTime(); // unique key for React rendering

        setProducts(prevProducts => [...prevProducts, droppedProduct]);
    };

    const handleRemoveProduct = (uniqueKey) => {
        setProducts(products.filter(product => product.uniqueKey !== uniqueKey));
    };

    const handleNoteEdit = (e) => {
        setNote(e.target.value);
    };

    // gather MealCard data to pass to parent for DB update
    const handleSaveClick = () => {
        onSaveMeal({
            id: mealId,
            isExistingMeal,
            date: formatDate(selectedDate),
            note,
            products
        });

        // Reset the state
        setProducts([]);
        setNote('');
        setSelectedDate('');

    };

    const handleDeleteClick = () => {
        onDeleteMeal && onDeleteMeal(mealId);
    };

    const totalNutrition = products.reduce(
        (total, product) => ({
            calories: total.calories + (product.calories * (product.quantity || 1)),
            proteins: total.proteins + (product.proteins * (product.quantity || 1)),
            carbs: total.carbs + (product.carbs * (product.quantity || 1)),
            fat: total.fat + (product.fat * (product.quantity || 1)),
        }),
        {calories: 0, proteins: 0, carbs: 0, fat: 0}
    );

    return (
        <div
            className={`rounded p-4 border-2 ${products.length > 0 ? '' : 'border-dashed'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{minWidth: '300px'}}
        >

            {/* date / save / del */}
            <div className="flex items-center mb-2 text-sm">

                {/* date picker */}
                <input
                    className={`flex-grow mr-2 ${selectedDate ? 'bg-gray-200' : 'bg-red-100'} text-black rounded-md px-2 py-1 ${
                        selectedDate ? '' : 'outline-red'
                    }`}
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />

                {/* save button */}
                {!mealId && (
                <button
                    className={`text-white py-1 px-2 rounded ${products.length === 0 || !selectedDate ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                    onClick={handleSaveClick}
                    disabled={products.length === 0 || !selectedDate}
                >
                    Save
                </button>
                )}

                {/* delete button */}
                {mealId && (
                    <button
                        className="text-white py-1 px-2 rounded bg-red-600 hover:bg-red-700 ml-2"
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </button>
                )}

            </div>

            {/* note */}
            <input
                className="custom-placeholder w-full bg-gray-100 text-black text-sm rounded-md px-2 py-1 my-2 font-bold"
                type="text"
                placeholder="Note ..."
                value={note}
                onChange={handleNoteEdit}
            />

            {/* drop area */}
            {products.length === 0 && (
                <div className="border-2 border-dashed border-red-100 py-24 rounded text-center text-red-300 mt-4">
                    Drop product here
                </div>
            )}

            {/* products list */}
            <ul className="text-sm">
                {products.map((product, index) => (
                    <li key={product.name + index}
                        className="flex justify-between items-center my-3 p-2 bg-gray-50 rounded border border-blue-300">
                        {/* product name and quantity */}
                        <p>
                            {product.name ? (
                                <span className="text-blue-500 font-semibold mr-2">
                                    {product.name.length <= 16 ? product.name : product.name.slice(0, 16) + ' ...'}
                                </span>
                            ) : (
                                <span className="text-blue-500 font-semibold mr-2">No Name</span>
                            )}
                            <span className="text-gray-400">
                                {product.quantity ? `~ ${product.quantity * 100}g` : "~ 0g"}
                            </span>
                        </p>

                        {/* remove product button */}
                        {!mealId && (
                        <button className="font-mono text-red-500"
                                onClick={() => handleRemoveProduct(product.uniqueKey)}>
                            x
                        </button>
                        )}
                    </li>
                ))}
            </ul>

            {/* total nutritional info */}
            {products.length > 0 && (
                <ul className="text-sm mt-4 divide-y">
                    <li className="flex justify-between py-1 font-semibold"><span>TOTAL</span> <span
                        className="font-semibold">{totalNutrition.calories.toFixed(0)} cal</span></li>
                    <li className="flex justify-between py-1"><span>Proteins</span> <span
                        className="font-semibold">{totalNutrition.proteins.toFixed(2)} g</span></li>
                    <li className="flex justify-between py-1"><span>Carbs</span> <span
                        className="font-semibold">{totalNutrition.carbs.toFixed(2)} g</span></li>
                    <li className="flex justify-between py-1"><span>Fat</span> <span
                        className="font-semibold">{totalNutrition.fat.toFixed(2)} g</span></li>
                </ul>
            )}

        </div>
    );
};

export default MealCard;
