import { auth } from 'auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { PostRequestPayload, PostResponsePayload } from 'constants/payloads/payments/checkout';
import { CheckoutSessionStatusesEnum } from 'types/generated/server';
import { updateUserStripeCustomerId } from 'services/server/graphql/mutations/updateUserStripeCustomerId';
import { upsertCheckoutSession } from 'services/server/graphql/mutations/upsertCheckoutSession';
import { createStripeUser } from 'services/server/stripe/createStripeUser';
import { getCustomerIdFromObject } from 'services/server/stripe/getCustomerIdFromObject';
import stripe from 'services/server/stripe/instance';
import {
  response401UnauthorizedError,
  response500ServerError,
  responseJson200Success,
} from 'utils/server/serverless/http';
import { HttpMethods, withHttpMethods } from 'utils/server/serverless/middleware/withHttpMethods';

const MONTHLY_PRICE_ID = process.env.MONTHLY_STRIPE_PRICE_ID;
const ANNUAL_PRICE_ID = process.env.ANNUAL_STRIPE_PRICE_ID;

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await auth(req, res);
    console.log('session', session);

    if (!session) {
      return response401UnauthorizedError(res, 'Not logged in');
    }

    const payload: PostRequestPayload = req.body;
    const { plan } = payload;
    const priceId = plan === 'monthly' ? MONTHLY_PRICE_ID : ANNUAL_PRICE_ID;
    let stripeCustomerId: undefined | string | null = session.user.stripeCustomerId;

    if (!stripeCustomerId) {
      const stripeUser = await createStripeUser({
        email: session.user.email,
        id: session.user.id,
      });
      stripeCustomerId = stripeUser.id;
      await updateUserStripeCustomerId({
        id: session.user.id,
        stripeCustomerId,
      });
    }

    console.log({
      payment_method_types: ['card'],
      line_items: [{ quantity: 1, price: priceId }],
      mode: 'subscription',
      success_url: process.env.APP_URL,
      cancel_url: process.env.APP_URL,
      customer: stripeCustomerId,
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ quantity: 1, price: priceId }],
      mode: 'subscription',
      success_url: process.env.APP_URL,
      cancel_url: process.env.APP_URL,
      customer: stripeCustomerId,
    });

    await upsertCheckoutSession({
      object: {
        amountTotal: checkoutSession.amount_total,
        currency: checkoutSession.currency,
        metadata: checkoutSession.metadata || {},
        mode: checkoutSession.mode,
        status: checkoutSession.payment_status as CheckoutSessionStatusesEnum,
        stripeCustomerId: getCustomerIdFromObject({ customer: checkoutSession.customer }),
        stripeSubscriptionId:
          typeof checkoutSession.subscription === 'string'
            ? checkoutSession.subscription
            : checkoutSession.subscription?.id,
        stripeCheckoutSessionId: checkoutSession.id,
      },
    });

    return responseJson200Success(res, checkoutSession);
  } catch (error) {
    console.log('error', error);
    return response500ServerError(res, error);
  }
};

export default withHttpMethods({
  [HttpMethods.Post]: POST,
});
