import { configureStore } from '@reduxjs/toolkit';
import { patientApi } from './api/patientApi';

export const store = configureStore({
  reducer: {
    [patientApi.reducerPath]: patientApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(patientApi.middleware),
});
