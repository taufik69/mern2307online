import React, { useState } from "react";
import { usePlaceOrderMutation } from "../../Features/Api/exclusiveApi";
import { use } from "react";

const Checkout = () => {
  const cartTotal = JSON.parse(localStorage.getItem("cartTotal"));
  const cartData = JSON.parse(localStorage.getItem("cartData"));
  const [placeOrder, { isLoading, isError }] = usePlaceOrderMutation();
  const [userinfo, setuserinfo] = useState({
    firstName: cartData[0].user.firstName,
    lastName: "",
    email: cartData[0].user.email,
    phoneNumber: cartData[0].user.phoneNumber,
    adress1: "",
    adress2: "",
    city: "",
    district: "",
    postcode: 0,
    payementmethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserinfo({
      ...userinfo,
      [name]: value,
    });
  };

  const handleplaceOrder = async () => {
    try {
      const userBillingInfo = {
        customerInfo: {
          firstName: userinfo.firstName,
          lastName: userinfo.lastName,
          email: userinfo.email,
          phoneNumber: parseInt(userinfo.phoneNumber),
          adress1: userinfo.adress1,
          adress2: userinfo.adress2,
          city: userinfo.city,
          district: userinfo.district || "Dhaka",
          postcode: userinfo.postcode || 10001,
        },
        payemntinfo: {
          payementmethod: userinfo.payementmethod,
        },
      };
      const response = await placeOrder(userBillingInfo);
      if (response.data) {
        window.location.href = response.data.sslUrl;
      }
    } catch (error) {
      console.error("Error in placing order", error);
    }
  };

  return (
    <div className="container py-4">
      <div class="font-[sans-serif] text-xl w-full bg-white">
        <div class="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div class="bg-gray-100 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
            <div class="relative h-full">
              <div class="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                <div class="space-y-4">
                  {cartData?.map((item) => (
                    <div class="flex items-start gap-4">
                      <div class="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                        <img
                          src={
                            item.product.image[0] ||
                            "https://readymadeui.com/images/product10.webp"
                          }
                          class="w-full object-contain"
                        />
                      </div>
                      <div class="w-full">
                        <h3 class="text-sm lg:text-base text-gray-800">
                          {item.product.name || "Split Sneakers"}
                        </h3>
                        <ul class="text-xs text-gray-800 space-y-1 mt-3">
                          <li class="flex flex-wrap gap-4">
                            Quantity{" "}
                            <span class="ml-auto"> {item.qunatity}</span>
                          </li>
                          <li class="flex flex-wrap gap-4">
                            Total Price{" "}
                            <span class="ml-auto">
                              ${item.qunatity * item.product.price}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div class="md:absolute md:left-0 md:bottom-0 bg-gray-200 w-full p-4">
                <h4 class="flex flex-wrap gap-4 text-sm lg:text-base text-gray-800">
                  Total <span class="ml-auto">${cartTotal.totalPrice}</span>
                </h4>
              </div>
            </div>
          </div>

          <div class="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
            <h2 class="text-2xl font-bold text-gray-800">
              Complete your order
            </h2>
            <form class="mt-8" onSubmit={(e) => e.preventDefault()}>
              <div>
                <h3 class="text-sm lg:text-base text-gray-800 mb-4">
                  Personal Details
                </h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={userinfo.firstName}
                      onChange={handleChange}
                      name="firstName"
                      class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={userinfo.lastName}
                      name="lastName"
                      onChange={handleChange}
                      class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={userinfo.email}
                      placeholder="Email"
                      onChange={handleChange}
                      class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      name="phoneNumber"
                      value={userinfo.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone No."
                      class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-8">
                <h3 class="text-sm lg:text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="adress1"
                      value={userinfo.adress1}
                      onChange={handleChange}
                      placeholder="Address Line"
                      class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={userinfo.adress2}
                      name="adress2"
                      onChange={handleChange}
                      placeholder="Address Line 2"
                      class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={userinfo.city}
                      onChange={handleChange}
                      placeholder="City"
                      class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={userinfo.district}
                      onChange={handleChange}
                      name="district"
                      placeholder="District"
                      class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={handleChange}
                      value={userinfo.postcode}
                      name="postcode"
                      placeholder="postal Code"
                      class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                </div>

                <div class="flex gap-4 max-md:flex-col mt-8">
                  <button
                    type="button"
                    onClick={() =>
                      setuserinfo({ ...userinfo, payementmethod: "cash" })
                    }
                    class="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                  >
                    Cash On Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setuserinfo({ ...userinfo, payementmethod: "online" })
                    }
                    class="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-green-500 hover:bg-blue-700 text-white"
                  >
                    Pay Now Online
                  </button>
                </div>
                <div className=" mt-5">
                  <button
                    onClick={handleplaceOrder}
                    type="button"
                    class="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    place Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
