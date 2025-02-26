import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exlusiveApi = createApi({
  reducerPath: "exlusive",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
    withCredentials: true,
    credentials: "include",
  }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    GetAllBanner: builder.query({
      query: () => `/banner`,
    }),
    GetAllCategory: builder.query({
      query: () => "/category",
    }),
    GetAllProduct: builder.query({
      query: () => "/product",
    }),
    GetSingleProduct: builder.query({
      query: (id) => `/singleproduct/${id}`,
    }),
    AddToCart: builder.mutation({
      query: (bodyObject) => ({
        url: `/addtocart`,
        method: "post",
        body: bodyObject,
      }),
    }),
    RemoveCart: builder.mutation({
      query: (id) => ({
        url: `/addtocart/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["cart"],
    }),

    getUserCartItem: builder.query({
      query: () => `/useritem`,
      providesTags: ["cart"],
    }),

    placeOrder: builder.mutation({
      query: (customerinformation) => ({
        url: `/placeorder`,
        method: "post",
        body: customerinformation,
      }),
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useRemoveCartMutation,
  useGetAllBannerQuery,
  useGetAllCategoryQuery,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useAddToCartMutation,
  useGetUserCartItemQuery,
} = exlusiveApi;
