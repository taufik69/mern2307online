import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/CommonCoponents/BreadCrumb.jsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  useGetUserCartItemQuery,
  useRemoveCartMutation,
} from "../../Features/Api/exclusiveApi.js";
import { Link } from "react-router-dom";
import { ToastSucess } from "../../helpers/Toast.js";
const AddToCart = () => {
  const { isLoading, isError, data } = useGetUserCartItemQuery();
  const [RemoveCart, { isLoading: removeLoading }] = useRemoveCartMutation();

  useEffect(() => {
    if (data?.data) {
      const totalCartItem = data?.data?.reduce(
        (initialValue, item) => {
          const { product, qunatity } = item;
          initialValue.totalPrice += product.price * qunatity;
          initialValue.totalitem += qunatity;
          return initialValue;
        },
        {
          totalPrice: 0,
          totalitem: 0,
        }
      );

      localStorage.setItem("cartData", JSON.stringify(data?.data));
      localStorage.setItem("cartTotal", JSON.stringify(totalCartItem));
    }
  }, [data]);
  const totalPricefromLocal = localStorage.getItem("cartTotal")
    ? JSON.parse(localStorage.getItem("cartTotal"))
    : 0;

  // handleRemoveCart function
  const handleRemoveCart = async (id) => {
    try {
      const response = await RemoveCart(id);
      if (response?.data?.data) {
        ToastSucess("Item Removed Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-20">
      <div className="container">
        <BreadCrumb />

        <div className="flex justify-between shadow-lg rounded mb-10">
          <div className="flex-1 py-6  flex justify-start">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000 pl-10">
              Product
            </h1>
          </div>
          <div className=" flex-1  py-6 flex justify-center">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000">
              Price
            </h1>
          </div>
          <div className=" flex-1  py-6  flex justify-center">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000">
              Quantity
            </h1>
          </div>
          <div className=" flex-1  flex justify-end py-6">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000 pr-10">
              Subtotal
            </h1>
          </div>
        </div>

        {/* carti tem */}
        <div className="custom_scrollbar w-full h-[500px] overflow-y-scroll ">
          {data?.data?.map((item) => (
            <div className="mb-10" key={item._id}>
              <div className="flex justify-between shadow-lg rounded">
                <div className="flex-1 py-6  flex justify-start">
                  <div className="flex pl-10 items-center gap-x-5 relative ">
                    <img
                      src={item.product.image[0] || "image"}
                      alt={item.product.image[0] || "image"}
                      className="w-[54px] h-[54px] object-contain"
                    />
                    <span
                      className="w-[20px] h-[20px] rounded-full bg-redDB4444 absolute text-white_FFFFFF flex justify-center items-center top-[-2%] left-[15%] font-semibold cursor-pointer hover:opacity-70"
                      onClick={() => handleRemoveCart(item._id)}
                    >
                      X
                    </span>
                    <h1 className="text-[16px] font-popins font-normal text-text_black000000 ">
                      {item.product.name || "Product Name"}
                    </h1>
                  </div>
                </div>
                <div className=" flex-1  py-6 flex justify-center">
                  <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                    ${item.product.price || "3"}
                  </h1>
                </div>
                <div className=" flex-1  py-6 flex   justify-center">
                  <div className="flex items-center justify-center gap-x-3 w-[100px] rounded border border-gray-400">
                    <input
                      type="text"
                      value={item.qunatity || 1}
                      className=" w-[25px] text-[20px] font-popins font-normal text-text_black000000"
                    />
                    <div className="flex flex-col items-center justify-center">
                      <span className="">
                        <IoIosArrowUp className="inline-block  cursor-pointer" />
                      </span>

                      <span className="">
                        <IoIosArrowDown className="inline-block  cursor-pointer" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" flex-1 flex justify-end py-6">
                  <h1 className="text-[20px] font-popins font-normal text-text_black000000 pr-10">
                    ${item.qunatity * item.product.price || 0}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* carti tem */}
        {/* button */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <button className="px-[48px] py-[16px] bg-transparent  text-text_black000000 text-[18px] font-medium font-popins border-[2px] border-gray-300 rounded">
              Return To Shop
            </button>

            <button className="px-[40px] py-[16px] bg-transparent  text-text_black000000 text-[18px] font-medium font-popins border-[2px] border-gray-300 rounded">
              Update Cart
            </button>
          </div>
        </div>
        {/* button */}

        {/* subtotal and copun */}
        <div className="mt-[80px] flex items-start justify-between">
          <div className="flex items-center gap-x-3">
            <input
              type="text"
              className="py-3 px-10  border  border-gray-300"
              placeholder="Coupon Code"
            />

            <button className="px-[48px] py-[12px] bg-redDB4444  text-white_FFFFFF text-[18px] font-medium font-popins rounded">
              Apply Coupon
            </button>
          </div>

          <div>
            <div class="w-[470px] px-4 py-6 text-gray-900 bg-white border border-gray-200 rounded-lg">
              <h1 className="pl-3 font-popins font-normal text-text_black000000 text-[20px] mb-3">
                Cart Total
              </h1>

              <div className="justify-between   relative inline-flex items-center w-full px-4 py-2 font-popins font-normal text-text_black000000 text-[16px border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
                <button type="button">Total Item:</button>
                <span className="inline-block font-popins font-normal text-text_black000000 text-[16px]">
                  {" "}
                  {totalPricefromLocal?.totalCartItem || 9}
                </span>
              </div>

              <div className="justify-between   relative inline-flex items-center w-full px-4 py-2 font-popins font-normal text-text_black000000 text-[16px border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
                <button type="button">Shipping Charge:</button>
                <span className="inline-block font-popins font-normal text-text_black000000 text-[16px]">
                  {" "}
                  $0
                </span>
              </div>

              <div className="justify-between   relative inline-flex items-center w-full px-4 py-2 font-popins font-normal text-text_black000000 text-[16px rounded-t-lg hover:bg-gray-100">
                <button type="button"> Sub Total:</button>
                <span className="inline-block font-popins font-normal text-text_black000000 text-[16px]">
                  {" "}
                  ${totalPricefromLocal?.totalPrice || 89}
                </span>
              </div>
            </div>
            <div className="w-full  flex justify-center mt-10">
              <Link
                to="/checkout"
                className="px-[48px] py-[12px] bg-redDB4444  text-white_FFFFFF text-[18px] font-medium font-popins rounded"
              >
                Procees to checkout
              </Link>
            </div>
          </div>
        </div>
        {/* subtotal and copun */}
      </div>
    </div>
  );
};

export default AddToCart;
