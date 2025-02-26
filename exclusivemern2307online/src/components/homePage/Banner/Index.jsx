import React, { useState } from "react";
import { category } from "../../../../Data/data";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { LiaAngleRightSolid } from "react-icons/lia";
import Bannerimg from "../../../assets/banner/banner.jpg";
import {
  useGetAllBannerQuery,
  useGetAllCategoryQuery,
} from "../../../Features/Api/exclusiveApi";
import { array } from "yup";
import { IoIosArrowDown } from "react-icons/io";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
const Banner = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentSlide, setcurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) =>
      i == currentSlide ? (
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#DB4444",
            border: "3px solid #ffff",
            marginRight: "12px",
            cursor: "pointer",
          }}
        ></div>
      ) : (
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#ffff",
            opacity: "0.5",
            marginRight: "12px",
            cursor: "pointer",
          }}
        ></div>
      ),
    afterChange: function (currentSlide) {
      setcurrentSlide(currentSlide);
    },
  };
  const { data, isLoading, isError } = useGetAllBannerQuery();
  const categoryData = useGetAllCategoryQuery();

  // handlesubcategory
  const handlesubcategory = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div>
      <div className="container">
        <div className="flex  justify-between">
          <div className="w-[23%]  pt-10 border-r-[1.5px] border-r-text_black7D8184">
            {categoryData?.isLoading ? (
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
                {categoryData?.data?.data?.map((item) => (
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
          <div className="w-[77%]  pl-[45px] mt-10">
            <div className="slider-container ">
              <Slider {...settings}>
                {isLoading
                  ? [...new Array(3)].map((item) => (
                      <div className="w-[77%] h-[454px] bg-red-500 animate-pulse"></div>
                    ))
                  : data?.data.map((item) => (
                      <div key={item._id} className="w-[77%] h-[454px] ">
                        <img
                          src={item.image}
                          alt={item.image}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
