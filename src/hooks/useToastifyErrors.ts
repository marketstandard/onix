import { useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * Uses toastify to propogate errors to the front end
 * @param error the error to watch. if no message is provided and this error is a string, will display error
 * @param message an alternate message to provide if there is an error
 */
export const useToastifyErrors = (error?: any, message?: string) => {
  useEffect(() => {
    if (error) {
      if (message) toast.error(message);
      else if (typeof error === 'string') toast.error(error);
      else return;
    }
  }, [error]);
};
