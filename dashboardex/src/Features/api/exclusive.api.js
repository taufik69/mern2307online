import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const exclusiveApi = createApi({
  reducerPath: "exclusive",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1/",
  }),
  tagTypes: ["banner"],
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
  }),
});

export const { useGetAllBannerQuery, useUploadBannerMutation } = exclusiveApi;
