import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData, Link } from "react-router";
import { Authcontext } from "../../context/AuthContext";
import Swal from "sweetalert2";

export default function ProductDetails() {
  const product = useLoaderData();
  const [bids, setBids] = useState([])
  const {
    _id,
    title,
    price_min,
    price_max,
    category,
    created_at,
    image,
    email,
    status,
    location,
    seller_image,
    seller_name,
    condition,
    usage,
    description,
    seller_contact,
  } = product;
  const { user } = use(Authcontext);

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${product._id}`)
    .then(res => res.json())
    .then(data => {
      console.log("bids for products", data)
      setBids(data)
    })
  }, [product])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


  const priceDisplay = `$${price_min} - ${price_max}`;

  const postedDate = created_at
    ? new Date(created_at).toLocaleDateString("en-US")
    : "N/A";

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const price = e.target.price.value;

    const newBid = {
      product: product._id,
      buyer_name: name,
      buyer_email: email,
      bid_price: price,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "✅ Bid Placed!",
            text: "Your bid has been successfully submitted.",
            icon: "success",
            confirmButtonColor: "#6D28D9",
            confirmButtonText: "OK",
            background: "#f9f9ff",
            customClass: {
              popup: "rounded-xl shadow-2xl",
            },
          }).then(() => {
            handleCloseModal();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again.",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Unable to connect to server. Try again later.",
        });
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back To Products Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="text-blue-600 hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back To Products
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-gray-200 h-96 w-full rounded-lg overflow-hidden flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-lg">Product Image</span>
              )}
            </div>

            {/* Product Description Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Product Description
              </h3>

              {/* Condition and Usage Tags */}
              <div className="flex flex-wrap gap-3 mb-4">
                {condition && (
                  <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    Condition: {condition}
                  </span>
                )}
                {usage && (
                  <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    Usage Time: {usage}
                  </span>
                )}
              </div>

              {/* Description Content */}
              <p className="text-gray-700 leading-relaxed">
                {description || "No description available for this product."}
              </p>
            </div>
          </div>

          {/* Right Column - Product Info, Seller Info & Buy Button */}
          <div className="space-y-8">
            {/* Product Basic Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>

              {/* Category Tag */}
              {category && (
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4 inline-block">
                  {category}
                </span>
              )}

              {/* Price */}
              <p className="text-4xl font-extrabold text-green-700 my-4">
                {priceDisplay}
              </p>
              <p className="text-sm text-gray-500 mb-4">Price starts from</p>

              {/* Product Details Box */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Product Details
                </h4>
                <p className="text-sm text-gray-700">
                  <strong>Product ID:</strong> {_id}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Posted:</strong> {postedDate}
                </p>
              </div>
            </div>

            {/* Seller Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Seller Information
              </h3>

              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {seller_image ? (
                    <img
                      src={seller_image}
                      alt={seller_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {seller_name || "Unknown Seller"}
                  </p>
                  <p className="text-sm text-gray-600">{email || "N/A"}</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-2">
                <strong>Location:</strong> {location || "N/A"}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Contact:</strong> {seller_contact || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Status:</strong>{" "}
                {status && (
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      status === "On Sale"
                        ? "bg-green-100 text-green-800"
                        : status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {status === "pending" ? "Pending" : status}
                  </span>
                )}
                {!status && <span className="text-gray-500">N/A</span>}
              </p>
            </div>

            {/* I Want Buy This Product Button */}
            <div className="w-full">
              <button
                className="w-full bg-purple-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg"
                onClick={handleOpenModal}
              >
                I Want Buy This Product
              </button>

              <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
                <div className="modal-box w-11/12 max-w-2xl p-6 bg-white rounded-lg shadow-2xl">
                  {/* Modal Title */}
                  <h3 className="font-bold text-xl text-center text-gray-800 border-b pb-3 mb-6">
                    Give Seller Your Offered Price
                  </h3>

                  <form onSubmit={handleBidSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Buyer Name */}
                      <label className="form-control w-full">
                        <span className="label-text mb-1 font-medium">
                          Buyer Name
                        </span>
                        <input
                          type="text"
                          name="name"
                          readOnly
                          defaultValue={user?.displayName}
                          placeholder="Your Name"
                          className="input input-bordered w-full"
                          required
                        />
                      </label>
                      {/* Buyer Email */}
                      <label className="form-control w-full">
                        <span className="label-text mb-1 font-medium">
                          Buyer Email
                        </span>
                        <input
                          type="email"
                          name="email"
                          readOnly
                          defaultValue={user?.email}
                          placeholder="Your Email"
                          className="input input-bordered w-full"
                          required
                        />
                      </label>
                    </div>

                    {/* Place your Price */}
                    <label className="form-control w-full mb-4">
                      <span className="label-text mb-1 font-medium">
                        Place your Price
                      </span>
                      <input
                        type="number"
                        name="price"
                        placeholder="e.g. 50000"
                        className="input input-bordered w-full"
                        required
                      />
                    </label>

                    {/* Contact Info */}
                    {/* <label className="form-control w-full mb-6">
                      <span className="label-text mb-1 font-medium">
                        Contact Info
                      </span>
                      <input
                        type="text"
                        name="contact"
                        placeholder="e.g. +8801..."
                        className="input input-bordered w-full"
                        required
                      />
                    </label> */}

                    {/* Modal Actions/Buttons */}
                    <div className="modal-action flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="btn btn-ghost"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn bg-purple-600 hover:bg-purple-700 text-white border-0"
                      >
                        Submit Bid
                      </button>
                    </div>
                  </form>
                </div>
                {/* Modal Backdrop - বাইরে ক্লিক করলে বন্ধ করার জন্য */}
                <div
                  className="modal-backdrop"
                  onClick={handleCloseModal}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
