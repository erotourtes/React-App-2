import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import config from "@/config";

export const api = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.HTTP_URL }),
  endpoints: () => ({}),
});
