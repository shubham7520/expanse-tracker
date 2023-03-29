import express from "express";
import { config } from "dotenv";
import dbConnect from "./config/connectdb.js";
import userRoute from "./routes/userRoute.js"

const app = express();
config();
dbConnect();

app.use(express.json());
app.use('/api/v1', userRoute);

app.get('/', (req, res) => {
    res.status(200).json("Api is working..");
})

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server Start on port ${PORT}`));