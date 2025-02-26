import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const ProductLeft = ({ categoryData, isLoading }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  // handlesubcategory
  const handlesubcategory = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };
  return (
    <div className="w-[23%] border-r-[1.5px] border-r-text_black7D8184">
      <h1 className="font-popins font-bold text-[20px] text-text_black000000 mb-4 cursor-pointer">
        Shop By Category
      </h1>

      <div className=" pt-10 border-r-[1.5px] border-r-text_black7D8184">
        {isLoading ? (
          <ul>
            {[...new Array(9)]?.map((_, index) => (
              <div
                className="flex items-center justify-between hover:bg-gray-200 transition-all cursor-pointer "
                key={index}
              >
                <li className="bg-text_black7D8184 w-full font-normal py-6 cursor-pointer my-2 animate-pulse mr-3 rounded"></li>
              </div>
            ))}
          </ul>
        ) : (
          <ul>
            {categoryData?.map((item) => (
              <div
                className="flex items-center justify-between hover:bg-gray-200 transition-all cursor-pointer"
                onClick={() => handlesubcategory(item._id)}
              >
                <li className="font-popins hover:px-5 transition-all text-md text-text_black000000 font-normal py-3 cursor-pointer">
                  {item.name}
                  {openDropdown === item._id &&
                    item.subcategory.map((subItem) => (
                      <div
                        key={subItem._id}
                        className="flex flex-col hover:bg-blue-200 transition-all bg-gray-300 my-2 mr-10 "
                      >
                        <li className="font-popins hover:px-5 transition-all text-md text-text_black000000 font-normal py-3 cursor-pointer">
                          {subItem.name}
                        </li>
                      </div>
                    ))}
                </li>
                {item.subcategory && (
                  <span className="pr-10 text-xl text-text_black000000">
                    {openDropdown === item._id ? (
                      <MdOutlineKeyboardArrowUp />
                    ) : (
                      <MdOutlineKeyboardArrowDown />
                    )}
                  </span>
                )}
              </div>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h1 className="font-popins font-bold text-[20px] text-text_black000000 mb-4 mt-4 cursor-pointer">
          Shop by Color
        </h1>
        <ul>
          <li className="font-popins hover:px-5 transition-all text-md text-text_black000000 font-normal py-3 cursor-pointer capitalize">
            <div className="flex items-center gap-x-2">
              <span className="inline-block w-5 h-5 rounded-full bg-red-500 "></span>
              <p>Red</p>
            </div>
          </li>

          <li className="font-popins hover:px-5 transition-all text-md text-text_black000000 font-normal py-3 cursor-pointer capitalize">
            <div className="flex items-center gap-x-2">
              <span className="inline-block w-5 h-5 rounded-full bg-blue-500 "></span>
              <p>Blue</p>
            </div>
          </li>

          <li className="font-popins hover:px-5 transition-all text-md text-text_black000000 font-normal py-3 cursor-pointer capitalize">
            <div className="flex items-center gap-x-2">
              <span className="inline-block w-5 h-5 rounded-full bg-green-500 "></span>
              <p>Green</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductLeft;
