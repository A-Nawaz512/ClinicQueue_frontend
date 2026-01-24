import { useEffect } from 'react';
import { useGetQueueQuery } from '../api/patientApi';

// Custom hook for auto-refreshing queue with wait time updates
export const useQueue = (refreshInterval = 30000) => {
  const { data: patients = [], isLoading, error, refetch } = useGetQueueQuery();

  // Auto-refresh queue every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refetch, refreshInterval]);

  // Calculate wait times on the client side for real-time updates
  const patientsWithWaitTime = patients.map(patient => ({
    ...patient,
    wait_time_minutes: Math.floor((Date.now() - new Date(patient.checked_in_at)) / 60000)
  }));

  return {
    patients: patientsWithWaitTime,
    isLoading,
    error,
    refetch
  };
};