import { useEffect } from 'react';
import { noop } from 'utils/shared/noop';

interface LoadScriptParams {
  src: string;
  onLoad?: (loadObject?: any) => void;
  onError?: () => void;
}

export const useScript = ({ src, onLoad = noop, onError = noop }: LoadScriptParams) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);

    script.onload = (loadObject) => {
      onLoad(loadObject);
    };
    script.onerror = onError;
  }, []);
};
