import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useQueryStringState = (key: string) => {
  const [initialValue, setInitialValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setInitialValue(router.query[key] as string);
    }
  }, [router.isReady]);

  const updateValue = (newValue) => {
    const newQuery = { ...router.query, [key]: newValue };
    router.replace({ pathname: router.pathname, query: newQuery });
  };

  return { initialValue, value: router.query[key], updateValue };
};

export const useQueryStringStateEmail = () => {
  return useQueryStringState('email');
};
