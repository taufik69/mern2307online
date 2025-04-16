const ProductSkeletion = () => {
  return (
    <div className="flex flex-col gap-y-10 p-5">
      {/* Product Name */}
      <div className="h-10 bg-gray-300 rounded animate-pulse"></div>

      {/* Description */}
      <div className="h-52 bg-gray-300 rounded animate-pulse"></div>

      {/* Product Price */}
      <div className="h-10 bg-gray-300 rounded animate-pulse"></div>

      {/* File Upload */}
      <div className="w-[30%] h-64 bg-gray-300 rounded animate-pulse"></div>

      {/* Dropdowns and Additional Fields */}
      <div className="w-[65%] flex flex-col gap-y-10">
        {/* Category Dropdown */}
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>

        {/* Product Rating */}
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>

        {/* SubCategory Dropdown */}
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>

        {/* Product Stock */}
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>

        {/* Product Reviews */}
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Submit Button */}
      <div className="w-[20%] h-12 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
};

export default ProductSkeletion;
