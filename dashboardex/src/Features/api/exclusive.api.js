import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const exclusiveApi = createApi({
  reducerPath: "exclusive",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["banner", "category", "subcategory", "product"],
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: () => "banner",
      providesTags: ["banner"],
    }),
    uploadBanner: builder.mutation({
      query: (bannerData) => ({
        url: `banner`,
        method: "post",
        body: bannerData,
      }),
      invalidatesTags: ["banner"],
    }),
    DeleteBanner: builder.mutation({
      query: (id) => ({
        url: `banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
    createCategory: builder.mutation({
      query: (fromdata) => {
        return {
          url: `category`,
          method: "POST",
          data: fromdata,
          formData: true,
        };
      },
      invalidatesTags: ["category"],
    }),

    getCategory: builder.query({
      query: () => "category",
      providesTags: ["category"],
    }),

    getsubCategory: builder.query({
      query: () => "subcategory",
      providesTags: ["subcategory"],
    }),
    getsingleCategory: builder.query({
      query: (id) => `category/${id}`,
      providesTags: ["category"],
    }),
    GetAllproduct: builder.query({
      query: () => `product`,
      providesTags: ["product"],
    }),
    GetallOrder: builder.query({
      query: () => `allorder`,
    }),

    GetSingleOrder: builder.query({
      query: (id) => `order/${id}`,
    }),
  }),
});

export const {
  useGetSingleOrderQuery,
  useGetallOrderQuery,
  useGetAllproductQuery,
  useGetsubCategoryQuery,
  useGetsingleCategoryQuery,
  useCreatesubCategoryMutation,
  useGetCategoryQuery,
  useDeleteBannerMutation,
  useGetAllBannerQuery,
  useUploadBannerMutation,
  useUpdateBannerMutation,
} = exclusiveApi;
