// src/services/baseApi.ts
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from '@reduxjs/toolkit/query/react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Use environment variable for API URL, default to localhost:3000 for json-server
const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  // credentials: 'include',
  // prepareHeaders: (headers) => {
  //   // If you later add auth, CSRF, etc., do it here.
  //   // Example:
  //   // const token = localStorage.getItem('accessToken');
  //   // if (token) headers.set('authorization', `Bearer ${token}`);
  //   return headers;
  // },
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  // Central place to debug / transform responses / handle errors
  console.debug('[RTKQ]', args, result);

  // Example: if (result.error?.status === 401) { ... }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Overview', 'Dashboard', 'ParkingMap', 'Bookings', 'Analytics'],
  endpoints: () => ({}),
});
