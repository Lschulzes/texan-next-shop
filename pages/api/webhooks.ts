import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { db } from '../../database';
import { OrderModel } from './../../models/OrderModel';

export default async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return await validateStripe(req, res);
  }

  res.status(404).json({ message: 'No route found!' });
}

const validateStripe = async (req: NextApiRequest, res: NextApiResponse) => {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET || false;
  const stripeSecret = process.env.STRIPE_SECRET_KEY || false;
  if (!sig || !webhookSecret || !stripeSecret) return;
  const stripe = new Stripe(stripeSecret, { typescript: true, apiVersion: '2022-08-01' });
  try {
    const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    await handleEvent(event as unknown as StripeEvent);

    return res.status(200).send('success');
  } catch (error) {
    console.error(`Webhook error: ${error}`);
    return res.status(400).send(error);
  }
};

const handleEvent = async (event: StripeEvent) => {
  if (event.data.object.object === 'charge') {
    if (event.data.object.paid !== true) return;
    await db.connect();
    await OrderModel.updateOne({ transactionId: event.data.object.payment_intent }, { $set: { isPaid: true } });
  }
};

type StripeEvent = {
  data: {
    object: {
      object: 'charge' | 'payment_intent';
      paid: boolean;
      payment_intent: string;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};
