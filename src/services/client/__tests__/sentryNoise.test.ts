import {
  CLIENT_EXTENSION_DENY_URLS,
  CLIENT_NOISE_IGNORE_ERRORS,
  clientBeforeSend,
  isExtensionScriptUrl,
  shouldDropClientSentryEvent,
} from '../sentryNoise';

describe('client sentry noise filters', () => {
  it('lists the Stripe, M_ID, and requestIdleCallback ignore patterns', () => {
    const samples = [
      'Error: Failed to load Stripe.js',
      "TypeError: Cannot read properties of undefined (reading 'M_ID')",
      'M_ID is not defined',
      'Error: requestIdleCallback callback `requestIdleCallback callback` was terminated',
      'requestIdleCallback is not defined',
      "Can't find variable: requestIdleCallback",
    ];

    for (const sample of samples) {
      expect(
        CLIENT_NOISE_IGNORE_ERRORS.some((pattern) =>
          typeof pattern === 'string' ? sample.includes(pattern) : pattern.test(sample),
        ),
      ).toBe(true);
    }
  });

  it('drops Failed to load Stripe.js from the exception value', () => {
    const event = {
      exception: { values: [{ type: 'Error', value: 'Failed to load Stripe.js' }] },
    };
    expect(shouldDropClientSentryEvent(event)).toBe(true);
    expect(clientBeforeSend(event)).toBeNull();
  });

  it('drops the browser-extension M_ID TypeError', () => {
    const event = {
      exception: {
        values: [
          {
            type: 'TypeError',
            value: "Cannot read properties of undefined (reading 'M_ID')",
            stacktrace: { frames: [{ filename: 'app:///executors/200.js' }] },
          },
        ],
      },
    };
    expect(shouldDropClientSentryEvent(event)).toBe(true);
    expect(
      clientBeforeSend(event, {
        originalException: new TypeError(event.exception.values[0].value),
      }),
    ).toBeNull();
  });

  it('treats extension executor URLs the way marketstandard-app denyUrls does', () => {
    expect(isExtensionScriptUrl('app:///executors/200.js')).toBe(true);
    expect(isExtensionScriptUrl('chrome-extension://abcdef/content.js')).toBe(true);
    expect(isExtensionScriptUrl('app:///_next/static/chunks/pages/index.js')).toBe(false);
    expect(
      CLIENT_EXTENSION_DENY_URLS.some((pattern) => pattern.test('app:///executors/200.js')),
    ).toBe(true);
  });

  it('drops requestIdleCallback terminated noise', () => {
    const event = {
      message: 'requestIdleCallback callback `requestIdleCallback callback` was terminated',
      exception: {
        values: [
          {
            type: 'Error',
            value: 'requestIdleCallback callback `requestIdleCallback callback` was terminated',
            stacktrace: { frames: [{ filename: 'app:///' }] },
          },
        ],
      },
    };
    expect(shouldDropClientSentryEvent(event)).toBe(true);
    expect(clientBeforeSend(event)).toBeNull();
  });

  it('keeps application errors', () => {
    const event = {
      message: 'Failed to debit and close hold account.',
      exception: {
        values: [
          {
            type: 'Error',
            value: 'Failed to debit and close hold account.',
            stacktrace: { frames: [{ filename: 'app:///_next/server/chunks/chat.js' }] },
          },
        ],
      },
    };
    expect(shouldDropClientSentryEvent(event)).toBe(false);
    expect(clientBeforeSend(event)).toBe(event);
  });
});
