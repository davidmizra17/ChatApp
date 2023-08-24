const mongoose = require("mongoose");
const connectDB = () => {
    console.log(`MongoDB connected: ${conn.conection.host}`)

}

exports.module = connectDB