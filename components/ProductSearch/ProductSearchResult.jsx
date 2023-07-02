import { useState } from 'react';

const ProductSearchResult = ({ product, onProductSelection }) => {

    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 0.5);
    };

    const handleDecrement = () => {
        if (quantity > 0.5) {
            setQuantity(quantity - 0.5);
        }
    };

    const handleDragStart = (e) => {
        const draggedProduct = {
            ...product,
            quantity: quantity
        };

        e.dataTransfer.setData('product', JSON.stringify(draggedProduct));

        // custom drag element
        const dragElem = document.createElement('div');
        dragElem.innerHTML = product.name;
        dragElem.style.backgroundColor = '#0055ff';
        dragElem.style.color = 'white';
        dragElem.style.padding = '10px';
        dragElem.style.position = 'absolute';
        dragElem.style.top = '-1000px';

        document.body.appendChild(dragElem);

        // use custom drag element as drag image
        e.dataTransfer.setDragImage(dragElem, 0, 0);
    };

    if (!product) {
        console.error("Product is undefined");
        return null;
    }

    if (
        product.name === undefined || product.name === null ||
        product.calories === undefined || product.calories === null ||
        product.proteins === undefined || product.proteins === null ||
        product.carbs === undefined || product.carbs === null ||
        product.fat === undefined || product.fat === null
    ) {
        console.error("Product missing some properties", product);
        return null;
    }

    return (

        <div
            className="cursor-move p-4 border-2 hover:border-blue-300 transition-all duration-200 rounded-xl bg-white"
            draggable="true"
            onDragStart={handleDragStart}
            style={{ minWidth: '256px' }}
        >
            {/* Product Info */}
            <div className="flex-1">

                <p className="flex justify-between">
                    <span className="text-lg font-semibold text-blue-500">{product.name.length <= 24 ? product.name : product.name.slice(0, 24) + ' ...'}</span>
                    <span className="text-lg ml-4"><span className="font-bold">{(product.calories * quantity).toFixed(0)}</span> cal.</span>
                </p>

                <ul className="mt-2 text-sm text-gray-600 divide-y divide-opacity-25">
                    <li className="flex justify-between py-1"><span>Proteins</span> <span className="font-semibold">{(product.proteins * quantity).toFixed(2)} g</span></li>
                    <li className="flex justify-between py-1"><span>Carbs</span> <span className="font-semibold">{(product.carbs * quantity).toFixed(2)} g</span></li>
                    <li className="flex justify-between py-1"><span>Fat</span> <span className="font-semibold">{(product.fat * quantity).toFixed(2)} g</span></li>
                </ul>

            </div>

            {/* Quantity Adjustment */}
            <div className="flex justify-center items-center mt-4 mb-2 font-mono">
                <button onClick={handleDecrement} className="text-blue-500 outline-dashed outline-1 rounded-full px-2">-</button>
                <span className="mx-4 text-blue-500">{(quantity * 100).toFixed(0)}g</span>
                <button onClick={handleIncrement} className="text-blue-500 outline-dashed outline-1 rounded-full px-2">+</button>
            </div>
        </div>

    );
};

export default ProductSearchResult;
