require("dotenv").config({ path: "../.env" });
const express = require("express");
const stripe = require("stripe")(process.env.SECRET_KEY);
const app = express();
const port = process.env.PORT;
const cors = require("cors");

app.use(express.json())
app.use(cors({
    origin:"*"
}))

const items = new Map([[1, { name: "Bottle", priceInCents: 100 }], [2, { name: "Eraser", priceInCents: 200 }]])

app.post("/session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: 'http://localhost:5500/Client/success.html',
            cancel_url: 'http://localhost:5500/Client/failure.html',
            line_items: req.body.items.map(item => {
                const itemId = items.get(item.id);
                
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: itemId.name
                        },
                        unit_amount: itemId.priceInCents,
                    },
                    quantity: item.quantity
                }
            }),
        });
        res.json({url: session.url})
    } catch (error) {
        res.status(500).send(error)
    }
})
app.listen(port, () => {
    console.log(`Listening on ${port}`)
});