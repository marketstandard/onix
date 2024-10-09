import { useState } from 'react';
import { RequestStatus } from 'constants/requests';

export const useRequestStatus = () => {
  const [requestStatus, setRequestStatus] = useState(RequestStatus.Idle);
  const [error, setError] = useState('');

  return {
    RequestStatus,
    requestStatus,
    setRequestStatus,
    error,
    isIdle: requestStatus === RequestStatus.Idle,
    isLoading: requestStatus === RequestStatus.Loading,
    isComplete: requestStatus === RequestStatus.Success || requestStatus === RequestStatus.Error,
    isSuccess: requestStatus === RequestStatus.Success,
    isError: requestStatus === RequestStatus.Error,
    setIdle: () => setRequestStatus(RequestStatus.Idle),
    setSuccess: () => setRequestStatus(RequestStatus.Success),
    setLoading: () => setRequestStatus(RequestStatus.Loading),
    setError: (errorString: string = '') => {
      setRequestStatus(RequestStatus.Error);
      setError(errorString);
    },
    reset: () => {
      setError('');
      setRequestStatus(RequestStatus.Idle);
    },
  };
};
