import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://admin-dashboard-internet-soft-backend.onrender.com/',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem('token')
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: '/users',
        method: "GET",
      }),
      providesTags: ['Users'],
    }),

    getAllReports: builder.query({
      query: () => ({
        url: '/reports',
        method: "GET",
      }),
      providesTags: ['Reports'],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    signup: builder.mutation({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: ({ id, name, phone }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { name, phone }
      }),
      invalidatesTags: ['User', "Users"],
    }),

    getAnalytics: builder.query({
      query: () => ({
        url: '/reports/analytics',
        method: "GET"
      }),
      providesTags: ['Analytics'],
    }),

    generateReport: builder.mutation({
      query: () => ({
        url: `/reports/generateRandomReport`,
        method: "POST"
      }),
      invalidatesTags:['Reports','Analytics']
    }),

    updateReportStatus: builder.mutation({
      query: (id) => ({
        url: `/reports/updateStatus/${id}`,
        method: "POST"
      }),
      invalidatesTags: ['Reports', 'Analytics']
    }),
    // Add more endpoints as needed
  }),
})

// Export hooks for usage in components
export const {
  useGetAllUsersQuery,
  useGetAllReportsQuery,
  useLoginMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useSignupMutation,
  useGetAnalyticsQuery,
  useGenerateReportMutation,
  useUpdateReportStatusMutation
} = api;