
import React, { use } from 'react';
import Product from '../my-product/Product';

export default function LatestProducts({ latestProductsPromise }) {
    const products = use(latestProductsPromise);

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500">
                Loading products... or No products found.
            </div>
        );
    }
    
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <h2 className="text-4xl font-bold text-center mb-10 pb-2 border-b-2 border-dotted border-blue-200">
        <span className="text-gray-800">Recent</span> <span className="text-purple-600">Products</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 
                      sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {
          products.map(product => (
            <Product key={product._id} product={product} />
          ))
        }
      </div>

      <div className="flex justify-center mt-12">
        <button
          className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-md 
                     hover:bg-purple-700 transition duration-150 shadow-lg"
          onClick={() => console.log("Navigating to all products page")}
        >
          Show All
        </button>
      </div>
      
    </div>
  )
}