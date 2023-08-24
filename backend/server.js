const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { chats } = require("./data/data");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");


dotenv.config()
connectDB()
const app = express();

app.use(express.json())

app.use(cors());

app.get('/', (req, res) => {
    res.send("API is running Succesfully");
});

app.use('/api/user', userRoutes)



const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`started server on PORT ${PORT}`));