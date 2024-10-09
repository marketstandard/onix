import * as Sentry from '@sentry/nextjs';
import { parse } from 'content-type';
import { NextApiRequest, NextApiResponse } from 'next';
import getRawBody from 'raw-body';
import Stripe from 'stripe';
import { HttpMethods } from 'constants/http';
import stripe from 'services/server/stripe/instance';
import { handleCheckoutSessionCompleted } from 'services/server/stripe/webhooks/handleCheckoutSessionCompleted';
import { handleInvoice } from 'services/server/stripe/webhooks/handleInvoice';
import { handleSubscription } from 'services/server/stripe/webhooks/handleSubscription';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const CHECKOUT_SESSION_COMPLETED: Stripe.WebhookEndpointCreateParams.EnabledEvent =
  'checkout.session.completed';
const SUBSCRIPTION_CREATED: Stripe.WebhookEndpointCreateParams.EnabledEvent =
  'customer.subscription.created';
const SUBSCRIPTION_DELETED: Stripe.WebhookEndpointCreateParams.EnabledEvent =
  'customer.subscription.deleted';
const SUBSCRIPTION_UPDATED: Stripe.WebhookEndpointCreateParams.EnabledEvent =
  'customer.subscription.updated';
const INVOICE_PAID: Stripe.WebhookEndpointCreateParams.EnabledEvent = 'invoice.paid';
const INVOICE_PAYMENT_FAILED: Stripe.WebhookEndpointCreateParams.EnabledEvent =
  'invoice.payment_failed';
const INVOICE_CREATED: Stripe.WebhookEndpointCreateParams.EnabledEvent = 'invoice.created';
const INVOICE_UPDATED: Stripe.WebhookEndpointCreateParams.EnabledEvent = 'invoice.updated';

// https://stripe.com/docs/billing/subscriptions/checkout
// https://stripe.com/docs/payments/checkout/fulfill-orders

const parseRawBody = async (req: NextApiRequest, limit: string | number) => {
  const contentType = parse(req.headers['content-type'] || 'text/plain');
  const { parameters } = contentType;
  const encoding = parameters.charset || 'utf-8';
  const buffer = await getRawBody(req, { encoding, limit });

  if (buffer) {
    const body = buffer.toString();
    return body;
  } else {
    throw new Error('Request did not contain a body');
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, headers } = req;

  if (method !== HttpMethods.Post) {
    res.setHeader('Allow', [HttpMethods.Post]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const sig = headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    const body = await parseRawBody(req, '1mb');
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (error) {
    Sentry.withScope((_scope) => {
      Sentry.captureException(error);
    });

    console.log('---- ERROR EVENT = \n', error);
    // @ts-ignore
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  console.log('---- EVENT = \n', event);

  try {
    // console.log('=== STRIPE WEBHOOK ===', JSON.stringify(event));
    switch (event.type) {
      case SUBSCRIPTION_CREATED:
      case SUBSCRIPTION_UPDATED:
      case SUBSCRIPTION_DELETED: {
        await handleSubscription(event);
        break;
      }
      case INVOICE_CREATED:
      case INVOICE_UPDATED:
      case INVOICE_PAID:
      case INVOICE_PAYMENT_FAILED: {
        await handleInvoice(event);
        break;
      }
      case CHECKOUT_SESSION_COMPLETED: {
        await handleCheckoutSessionCompleted(event);
        break;
      }
      default: {
        console.log(`Unhandled event type ${event.type}`);
        break;
      }
    }
  } catch (error) {
    Sentry.withScope((_scope) => {
      Sentry.captureException(error);
    });
    Sentry.withScope((_scope) => {
      Sentry.captureException(error);
    });

    console.log('---- ERROR HANDLING WEBHOOK = ', error);
    console.log('webhook payload', event);
    console.log('webhook', event.type);
    // @ts-ignore
    return res.status(500).send(`Webhook Event Handler Error: ${error.message}`);
  }

  // Return a response to acknowledge receipt of the event
  return res.status(200).json({ received: true });
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
