/**
 * Client-side Sentry filters mirrored from marketstandard-app
 * (sentry client config on main @ e68d29e, "Reduce Sentry noise...").
 * That app ignores Stripe.js load failures, the browser-extension M_ID
 * TypeError, and requestIdleCallback termination, and deny-lists extension
 * script URLs including `app:///executors/*.js`.
 */

export const STRIPE_JS_LOAD_ERROR = 'Failed to load Stripe.js';

export const CLIENT_NOISE_IGNORE_ERRORS: Array<string | RegExp> = [
  STRIPE_JS_LOAD_ERROR,
  /M_ID/i,
  'M_ID is not defined',
  /requestIdleCallback/i,
  'requestIdleCallback is not defined',
  "Can't find variable: requestIdleCallback",
];

/** Top-of-stack URLs that are browser extensions, not app code. */
export const CLIENT_EXTENSION_DENY_URLS: RegExp[] = [
  /^chrome-extension:\/\//i,
  /^moz-extension:\/\//i,
  /^safari-extension:\/\//i,
  /^safari-web-extension:\/\//i,
  /^app:\/\/\/executors\//i,
  /executors\/.*\.js/i,
];

type SentryFrame = { filename?: string };
type SentryExceptionValue = {
  type?: string;
  value?: string;
  stacktrace?: { frames?: SentryFrame[] };
};
type SentryEventLike = {
  message?: string;
  exception?: { values?: SentryExceptionValue[] };
};
type SentryHintLike = {
  originalException?: unknown;
};

function matchesNoise(message: string): boolean {
  return CLIENT_NOISE_IGNORE_ERRORS.some((pattern) =>
    typeof pattern === 'string' ? message.includes(pattern) : pattern.test(message),
  );
}

function collectMessages(event: SentryEventLike, hint?: SentryHintLike): string[] {
  const messages: string[] = [];
  if (event.message) messages.push(event.message);

  const original = hint?.originalException;
  if (typeof original === 'string') {
    messages.push(original);
  } else if (original instanceof Error) {
    messages.push(original.message);
    if (original.name) messages.push(`${original.name}: ${original.message}`);
  } else if (original && typeof original === 'object' && 'message' in original) {
    const message = (original as { message?: unknown }).message;
    if (typeof message === 'string') messages.push(message);
  }

  for (const value of event.exception?.values || []) {
    if (value.value) messages.push(value.value);
    if (value.type && value.value) messages.push(`${value.type}: ${value.value}`);
  }
  return messages;
}

function topFrameFilename(event: SentryEventLike): string | undefined {
  const values = event.exception?.values || [];
  for (let index = values.length - 1; index >= 0; index -= 1) {
    const frames = values[index].stacktrace?.frames;
    if (frames?.length) return frames[frames.length - 1].filename;
  }
  return undefined;
}

export function isExtensionScriptUrl(filename: string | undefined): boolean {
  if (!filename) return false;
  return CLIENT_EXTENSION_DENY_URLS.some((pattern) => pattern.test(filename));
}

/**
 * Return true when the event is Stripe.js, extension M_ID, or
 * requestIdleCallback noise. Sentry `ignoreErrors` misses some
 * onunhandledrejection / onerror shapes, so `beforeSend` checks the
 * exception value and the top stack frame as well.
 */
export function shouldDropClientSentryEvent(
  event: SentryEventLike,
  hint?: SentryHintLike,
): boolean {
  if (collectMessages(event, hint).some(matchesNoise)) return true;
  return isExtensionScriptUrl(topFrameFilename(event));
}

export function clientBeforeSend<T extends SentryEventLike>(
  event: T,
  hint?: SentryHintLike,
): T | null {
  if (shouldDropClientSentryEvent(event, hint)) return null;
  return event;
}
