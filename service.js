require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, dear guest!");
});

app.get("/secret", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Secret area"');
        return res.status(401).send("Unauthorized: No token provided");
    }

    const auth = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
    const username = auth[0];
    const password = auth[1];

    console.log("Введено пользователем:", { username, password }); 
    console.log("Ожидается из .env:", { 
        envUser: process.env.ADMIN_NAME, 
        envPass: process.env.PASSWORD 
    });

    if (username === process.env.ADMIN_NAME && password === process.env.PASSWORD){
        res.send(process.env.SECRET_MESSAGE);
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.status(401).send("Unauthorized: Invalid credentials");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Сервис запущен на порту ${PORT}`);
});