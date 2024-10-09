import stripe from 'stripe';

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }

  interface Global {
    fetch: any;
  }
}

declare global {
  interface Window {
    Stripe?: stripe.Stripe;
  }
}

declare module '*.svg';

declare module '*.worker';
declare module '*.worker.ts';
declare module 'worker-loader?name=static/[hash].worker.js!*' {
  class WebpackWorker extends Worker {
    public constructor();
  }

  export default WebpackWorker;
}
