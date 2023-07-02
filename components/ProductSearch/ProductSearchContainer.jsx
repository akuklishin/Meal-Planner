"use client"

import { useState } from 'react';
import ProductSearchInput from './ProductSearchInput';
import ProductSearchResult from './ProductSearchResult';

const ProductSearchContainer = ({ onProductSelected }) => {

    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (products) => {
        console.log('Received products:', products);
        if (Array.isArray(products)) {
            setSearchResults(products);
        } else {
            console.error('Expected an array but got:', products);
            setSearchResults([]); // set to empty array as a fallback
        }
    };

    const handleProductSelection = (product) => {
        // pass product to higher-level component
        if (typeof onProductSelected === 'function') {
            onProductSelected(product);
        }
    };

    return (
        <>
            <ProductSearchInput onSearch={handleSearch} />

            <div
                className={
                    "my-4 overflow-hidden transition-all duration-500 ease-in-out " +
                    (searchResults && searchResults.length > 0 ? "opacity-100" : "opacity-0")
                }
                style={{ maxHeight: searchResults && searchResults.length > 0 ? '320px' : '0' }}
            >
                <div className="custom-scrollbar flex py-4 space-x-4 whitespace-nowrap overflow-x-scroll">
                    {searchResults && searchResults.map((product, index) => (
                        <div className="inline-block" key={index}>
                            <ProductSearchResult product={product} onProductSelection={handleProductSelection} />
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};

export default ProductSearchContainer;