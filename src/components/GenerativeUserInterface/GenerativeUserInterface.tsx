import React from 'react';
import * as Sentry from '@sentry/nextjs';
import dynamic from 'next/dynamic';
import {
  GenerativeUserInterfaceProps,
  SOURCES_GENUI_NAME,
  WEATHER_GENUI_NAME,
} from 'constants/genui';
import { genAiResponsePayload } from 'constants/genui';
import ErrorBoundary from './ErrorBoundary';

const Weather = dynamic(() => import('components/Weather'), { ssr: false });

export default function GenerativeUserInterface(
  generativeUserInterfaceProps: GenerativeUserInterfaceProps,
) {
  const { component, props } = generativeUserInterfaceProps;

  const renderComponent = () => {
    const validationResult = genAiResponsePayload.safeParse(generativeUserInterfaceProps);

    if (!validationResult.success) {
      Sentry.captureException(new Error('Failed to parse valid generative UI'), {
        contexts: {
          aiGenUiData: {
            name: component,
            props,
          },
          validationResult,
        },
      });
      return null;
    }

    switch (component) {
      case WEATHER_GENUI_NAME:
        return <Weather {...props} />;
      default:
        Sentry.captureException(new Error(`Unmatched component: ${component}`));
        return null;
    }
  };

  return <ErrorBoundary>{renderComponent()}</ErrorBoundary>;
}
