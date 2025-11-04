import React from "react";
import Swal from "sweetalert2";

export default function BidsProduct({ bids, setBids, productTitle }) {
  if (!bids || bids.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-center text-gray-500 text-lg">
          No bids have been placed for this product yet.
        </p>
      </div>
    );
  }

  const titleStyles = "text-4xl font-extrabold text-gray-900";

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("delete now");

        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bids has been deleted.",
                icon: "success",
              });

              const remainingBids = bids.filter((bid) => bid._id !== _id);
              // Update the state or perform any necessary actions with remainingBids
              setBids(remainingBids);
            }
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title Section: Bids For This Products: 03 */}
      <h2 className="mb-8">
        <span className={titleStyles}>Bids For This Product:</span>
        <span className={`${titleStyles} text-purple-600 ml-3`}>
          {bids.length < 10 ? `0${bids.length}` : bids.length}
        </span>
      </h2>

      {/* Bids Table - ছবির মতো ডিজাইন */}
      <div className="bg-white rounded-lg shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header (Desktop) */}
          <thead className="bg-gray-50 hidden md:table-header-group">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                SL No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-40">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-40">
                Buyer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Bid Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {bids.map((bid, index) => (
              // Desktop Row and Mobile Card for each Bid
              <tr
                key={bid._id || index}
                className="hover:bg-gray-50 md:table-row flex flex-col md:flex-row border-b md:border-none"
              >
                {/* SL No */}
                <td className="p-4 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900 md:w-16">
                  <span className="md:hidden font-semibold text-gray-500">
                    SL No:{" "}
                  </span>
                  {index + 1}
                </td>

                {/* Product Info */}
                <td className="p-4 md:px-6 md:py-4 whitespace-nowrap md:min-w-40">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-md mr-3">
                      {bid.product_image ? (
                        <img
                          className="h-full w-full object-cover rounded-md"
                          src={bid.product_image}
                          alt={productTitle}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs text-gray-500"></div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {productTitle}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${bid.product_price_min || bid.bid_price} -{" "}
                        {bid.product_price_max}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Seller/Buyer Info (এখানে Bidder-এর তথ্য দেখানো হয়েছে) */}
                <td className="p-4 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500 md:min-w-40">
                  <span className="md:hidden font-semibold text-gray-500">
                    Buyer:{" "}
                  </span>
                  <div className="flex items-center">
                    {/* Seller Image Placeholder - ছবির মতো সার্কেল */}
                    <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      {bid.buyer_image ? (
                        <img
                          className="h-full w-full object-cover"
                          src={bid.buyer_image}
                          alt={bid.buyer_name}
                        />
                      ) : (
                        <svg
                          className="h-8 w-8 text-gray-400 p-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 10v2a8 8 0 01-16 0v-2h2v2a6 6 0 0012 0v-2h2zM12 4a4 4 0 100 8 4 4 0 000-8z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {bid.buyer_name || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {bid.buyer_email || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Bid Price */}
                <td className="p-4 md:px-6 md:py-4 whitespace-nowrap text-lg font-bold text-gray-800 md:w-32">
                  <span className="md:hidden font-semibold text-gray-500">
                    Bid Price:{" "}
                  </span>
                  ${bid.bid_price}
                </td>

                {/* Actions */}
                <td className="p-4 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium space-x-2 md:w-48">
                  <span className="md:hidden font-semibold text-gray-500 block mb-2">
                    Actions:{" "}
                  </span>
                  <button
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={() => console.log("Accept Offer", bid._id)}
                  >
                    Accept Offer
                  </button>
                  <button
                    onClick={() => handleDeleteBid(bid._id)}
                    className="inline-flex items-center px-3 py-1.5 border border-red-400 text-xs font-medium rounded-md shadow-sm text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2 md:mt-0"
                  >
                    Reject Offer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
