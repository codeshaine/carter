import Stripe from "stripe";
export async function createPaymentIntent(req, res) {
  const { productList } = req.body;
  let amount = productList.reduce((acc, item) => {
    return acc + item.quantity * item.price; // Use proper accumulation
  }, 0);
  amount *= 100; //converting into paise for the sake of stripe
  const stripe = new Stripe(process.env.STRIPE_SK);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    payment_method_types: ["card"],
    capture_method: "manual",
    // automatic_payment_methods: { enabled: true },
  });
  return res.status(200).json({ clientSecret: paymentIntent.client_secret });
}

export async function cancelPayment(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SK);
  const { transactionId } = req.body;
  const paymentIntent = await stripe.paymentIntents.cancel(transactionId);
  res.status(200).json({ success: true, paymentIntent });
}

export async function capturePayment(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SK);
  const { transactionId } = req.body;
  const paymentIntent = await stripe.paymentIntents.capture(transactionId);
  res.status(200).json({ success: true, paymentIntent });
}
