import express from 'express';
import userRouter from './routes/users.mjs';
import productRouter from './routes/products.mjs';
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(201).send({msg: "Hello, World!"});
});

app.use(userRouter);
app.use(productRouter);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});