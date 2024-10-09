import { useEffect, useState } from 'react';
import { captureException } from '@sentry/nextjs';
import { GenerativeUserInterfaceProps } from 'constants/genui';
import { markdownToHtml } from 'utils/client/markdownToHtml';
import { useApiGateway } from './useApi';

interface UseStreamParams {
  apiEndpoint: string;
  separator: string;
}

export const useAiAnalysisStream = <T>({ apiEndpoint, separator }: UseStreamParams) => {
  const [html, setHtml] = useState('');
  const [sources, setSources] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');
  const [uiComponents, setUiComponents] = useState<GenerativeUserInterfaceProps[]>([]);
  const {
    stream: analysisStream,
    error: analysisError,
    post: analysisFetch,
    status: analysisRequestStatus,
    isLoading: isLoadingAnalysis,
    resetInitialState: resetInitialStateAnalysis,
  } = useApiGateway<T>(apiEndpoint);

  useEffect(() => {
    const processStreamToHtml = async () => {
      if (analysisStream) {
        try {
          const responses = analysisStream
            .split(separator)
            .filter((item) => !!item)
            .map((s) => JSON.parse(s));
          const hasAnswer = responses.some((response) => response?.payload?.answer);

          if (hasAnswer) {
            const answerText = responses.findLast((response) => response?.payload?.answer)?.payload
              ?.answer;
            const answerSources = responses.findLast((response) => response?.payload?.answer)
              ?.payload?.sources;
            const ui = responses.findLast((response) => response?.payload?.answer)?.payload?.ui;

            setHtml(await markdownToHtml(answerText));
            setSources(answerSources || []);
            setUiComponents(ui || []);
            setAnswer(answerText || '');
          } else {
            const events = responses.map((response) => response?.payload?.event).join(', ');
            setHtml(await markdownToHtml(events));
          }
        } catch (error) {
          captureException(error, { extra: { analysisStream } });
        }
      }
    };
    processStreamToHtml();
  }, [analysisStream]);

  return {
    html,
    sources,
    answer,
    setHtml,
    setAnswer,
    setSources,
    analysisFetch,
    isLoadingAnalysis,
    uiComponents,
  };
};

export type UseAiAnalysisStreamReturn = ReturnType<typeof useAiAnalysisStream>;
