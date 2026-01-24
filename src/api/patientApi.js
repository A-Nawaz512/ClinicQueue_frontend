import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Patients'],
  endpoints: (builder) => ({
    // 1️⃣ Check-In Patient
    checkInPatient: builder.mutation({
      query: (body) => ({
        url: '/patients/checkin',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Patients'], // refresh queue after check-in
    }),

    // 2️⃣ Get Queue (now includes completed patients)
    getQueue: builder.query({
  query: () => '/patients/queue',
  providesTags: ['Patients'],
  pollingInterval: 30000, // refetch every 30 sec for new patients
  transformResponse: (patients) =>
    patients.map((p) => ({
      ...p,
      wait_time_minutes: 0, // start at 0, frontend updates live
    })),
}),


    // 3️⃣ Call Patient to Room
    callPatient: builder.mutation({
      query: (id) => ({
        url: `/patients/${id}/call-to-room`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Patients'], // refresh queue after call
    }),

    // 4️⃣ Complete Visit
    completeVisit: builder.mutation({
      query: (id) => ({
        url: `/patients/${id}/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Patients'], // refresh queue after completion
    }),
  }),
});

export const {
  useCheckInPatientMutation,
  useGetQueueQuery,
  useCallPatientMutation,
  useCompleteVisitMutation,
} = patientApi;
