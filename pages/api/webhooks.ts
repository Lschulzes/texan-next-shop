import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

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
    stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    return res.status(200).send('success');
  } catch (error) {
    console.error(`Webhook error: ${error}`);
    return res.status(400).send(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
