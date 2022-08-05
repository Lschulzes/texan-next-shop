import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { db } from '../../database';
import OrderModel from '../../models/OrderModel';

const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET || false;
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(stripeSecret, { typescript: true, apiVersion: '2022-08-01' });

export default async function paymentIntents(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return await validateStripe(req, res);
  }

  res.status(404).json({ message: 'No route found!' });
}

const validateStripe = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { orderId } = req.body;
    await db.connect();
    const order = await OrderModel.findById(orderId);
    await db.disconnect();

    if (!webhookSecret || !stripeSecret || !order) throw new Error('Secret or Order ID is wrong!');

    const amount = order.total * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    await db.connect();
    order.transactionId = paymentIntent.id;
    await order.save();
    return res.status(200).send(paymentIntent.client_secret);
  } catch (error) {
    console.error(`Payment intent error: ${error}`);
    return res.status(400).send(error);
  }
};
