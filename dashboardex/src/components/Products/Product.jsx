import {
  Input,
  Select,
  Option,
  Button,
  useSelect,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance } from "../../Features/api/axios";
import {
  exclusiveApi,
  useGetCategoryQuery,
  useGetsingleCategoryQuery,
} from "../../Features/api/exclusive.api";
import ProductSkeletion from "../Skeletion/ProductSkeletion";
import NotFoundPage from "../NotFound";
import { ToastSucess } from "../../Utils/Toast";
import { useDispatch } from "react-redux";

const Product = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: null,
      category: "",
      subCategory: "",
      rating: "",
      stock: "",
      reviews: "",
    },
  });
  const [loading, setloading] = useState(false);
  // Watch the value of category
  const selectedCategory = watch("category");

  const { data: singleCategory } = useGetsingleCategoryQuery(selectedCategory, {
    skip: !selectedCategory,
  });
  const { data: categoryData, isLoading, isError } = useGetCategoryQuery();

  if (isLoading) {
    return <ProductSkeletion />;
  }
  if (isError) {
    return <NotFoundPage />;
  }

  const onSubmit = async (data) => {
    setloading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price)); // Convert to number
      formData.append("rating", Number(data.rating)); // Convert to number
      formData.append("stock", Number(data.stock)); // Convert to number
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("reviews", data.reviews);
      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await axiosInstance.post("product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.statusText == "OK") {
        ToastSucess("Product create sucessfull");

        dispatch(exclusiveApi.util.invalidateTags(["product"]));
      }
    } catch (error) {
      console.log("error from product upload");
    } finally {
      setloading(false);
    }
  };

  return (
    <form className="flex flex-col gap-y-10" onSubmit={handleSubmit(onSubmit)}>
      {/* Product Name */}
      <Input
        size="md"
        label="Product Name"
        {...register("name", { required: "Name field is required" })}
      />
      {errors.name && (
        <span className="text-red-500">{errors.name.message}</span>
      )}

      {/* Description with ReactQuill */}
      <div className="mb-10">
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description field is required" }}
          render={({ field }) => (
            <ReactQuill
              {...field}
              theme="snow"
              value={field.value || ""}
              onChange={field.onChange}
              className="h-[200px]"
            />
          )}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>

      {/* Product Price */}
      <Input
        size="md"
        label="Product Price"
        type="number"
        {...register("price", { required: "Price field is required" })}
      />
      {errors.price && (
        <span className="text-red-500">{errors.price.message}</span>
      )}

      {/* File Upload Input (Fixed) */}
      <div className="w-[30%]">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-gray-500">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <Controller
              name="image"
              control={control}
              rules={{ required: "Image is required" }}
              render={({ field }) => (
                <input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files[0])}
                  className="hidden"
                />
              )}
            />
          </label>
        </div>
        {errors.image && (
          <span className="text-red-500">{errors.image.message}</span>
        )}
      </div>

      {/* Dropdowns and Additional Fields */}
      <div className="w-[65%] flex flex-col gap-y-10">
        {/* Category Dropdown (Fixed) */}
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Select
              label="Select Category"
              value={field.value}
              onChange={field.onChange}
            >
              {categoryData?.data.map((item) => (
                <Option value={item._id} key={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.category && (
          <span className="text-red-500">{errors.category.message}</span>
        )}

        {/* Product Rating */}
        <Input
          size="md"
          label="Product Rating"
          type="number"
          max={5}
          min={0}
          {...register("rating", { required: "Rating field is required" })}
        />
        {errors.rating && (
          <span className="text-red-500">{errors.rating.message}</span>
        )}

        {/* SubCategory Dropdown (Fixed) */}
        <Controller
          name="subCategory"
          control={control}
          rules={{ required: "SubCategory is required" }}
          render={({ field }) => (
            <Select
              label="Select SubCategory"
              value={field.value}
              onChange={field.onChange}
              disabled={
                !selectedCategory || !singleCategory?.data?.subcategory?.length
              }
            >
              {(singleCategory?.data?.subcategory || []).map((item) => (
                <Option value={item._id} key={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.subCategory && (
          <span className="text-red-500">{errors.subCategory.message}</span>
        )}

        {/* Product Stock */}
        <Input
          size="md"
          label="Product Stock"
          type="number"
          {...register("stock", { required: "Stock field is required" })}
        />
        {errors.stock && (
          <span className="text-red-500">{errors.stock.message}</span>
        )}

        {/* Product Reviews */}
        <Input
          size="md"
          label="Product Reviews"
          type="text"
          {...register("reviews", { required: "Reviews field is required" })}
        />
        {errors.reviews && (
          <span className="text-red-500">{errors.reviews.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <Button
        variant="filled"
        color="green"
        type="submit"
        loading={loading}
        className="w-[20%]"
      >
        Upload
      </Button>
    </form>
  );
};

export default Product;
