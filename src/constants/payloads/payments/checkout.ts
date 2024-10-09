import { type Stripe } from 'stripe';

export interface PostRequestPayload {
  plan: 'monthly' | 'yearly';
}

export interface PostResponsePayload extends Stripe.Response<Stripe.Checkout.Session> {}
