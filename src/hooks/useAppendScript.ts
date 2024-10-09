import { useEffect } from 'react';
import { noop } from 'utils/shared/noop';

interface LoadScriptParams {
  src: string;
  onLoad?: (loadObject?: any) => void;
  onError?: () => void;
  nodeId: string;
  code?: string;
  isAsync?: boolean;
}

export const useAppendScript = ({
  src,
  onLoad = noop,
  onError = noop,
  nodeId,
  code = '',
  isAsync = false,
}: LoadScriptParams) => {
  useEffect(() => {
    const widget = document.getElementById(nodeId);
    const script = document.createElement('script');
    if (src) {
      script.src = src;
    }
    script.type = 'text/javascript';
    script.innerHTML = code;
    script.async = isAsync;

    if (widget) {
      widget.innerHTML = '';
      widget.appendChild(script);
    }

    script.onload = (loadObject) => {
      onLoad(loadObject);
    };
    script.onerror = onError;
  }, [code]);
};
