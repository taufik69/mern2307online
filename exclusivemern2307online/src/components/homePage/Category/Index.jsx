import React from "react";

import ProductCommonLayout from "../../CommonCoponents/ProductCommonLayout";
import CategoryItem from "../../CommonCoponents/CategoryItem";
import { useGetAllCategoryQuery } from "../../../Features/Api/exclusiveApi";

const Category = () => {
  const { data, isLoading, isError } = useGetAllCategoryQuery();

  return (
    <div>
      <ProductCommonLayout
        heading={"Categories"}
        description={"Browse By Category"}
        isArrowsTrue={true}
        ProductCard={CategoryItem}
        partialItemShow={6}
        componentData={data?.data}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Category;
