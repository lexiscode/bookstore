import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

// importing and using expressJs for Api handling
const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS policy
app.use(cors());
// middleware for handling 'custom' CORS policy (optional method 2)
/*app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)*/

// homepage route, GET request
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Stack App');
});

app.use('/books', booksRoute);

// connecting to mongoDB
mongoose.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database');
    // checks for successful connection first, before allowing to access the port
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
})
.catch((e) => {
    console.log(e);
})
