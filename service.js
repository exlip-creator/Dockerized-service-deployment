require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, dear guest!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Сервис запущен на порту ${PORT}");
});