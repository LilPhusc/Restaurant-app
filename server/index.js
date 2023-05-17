/*
Description: This file is the entry point for the server. It is responsible for starting the server and listening for requests.

*/
import express from "express";
import Stripe from "stripe";

const app = express();
app.use(express.json());
const port = 8006;

const PUBLISHABLE_KEY =
  "pk_test_51JLkV2IUDIvcpDpfvaWbhf5U9Ox1ZVIYT0GDbS7ycDs7wD7i9qw9EOK6d9G7DcK1u4Y0qFu7ijiV0KWugjF4yZHv00fBmcyzUs";
const SECRET_KEY =
  "sk_test_51JLkV2IUDIvcpDpf6MLQuFDvfEmzkG7JqPhxhZDMyR62zoiOiGZOIOcaE50gC7PPK68uU1ZObfJfhp8kXSse4IZ400gBKjRb7u";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.post("/create-payment-intent", async (req, res) => {
  const amountToBeSent = parseInt(req.body.total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountToBeSent, //lowest denomination of particular currency
      currency: "hkd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://10.68.2.133:${port}`);
});


