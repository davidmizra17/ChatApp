const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.send("API is running");
});



app.listen(8000, console.log("started server on PORT 8000"));