import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { RestApiTagsEnum } from './enums/api.enums';

const restApi = createApi({
  reducerPath: 'rtkq.api',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  tagTypes: Object.values(RestApiTagsEnum),
});

export default restApi;
