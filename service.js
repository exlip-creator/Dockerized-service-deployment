require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    const htmlResponse = `
        <div style="text-align: center; font-family: sans-serif; margin-top: 50px;">
            <h1>Welcome to the Cat Service!</h1>
        </div>
    `;
    
    res.send(htmlResponse);
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

    if (username === process.env.ADMIN_NAME && password === process.env.PASSWORD){
        const htmlResponse = `
            <div style="text-align: center; font-family: sans-serif; margin-top: 50px;">
                <h1>${process.env.SECRET_MESSAGE}</h1>
                <br>
                <img src="cat_milk.jpeg" 
                    alt="Секретный кот" 
                    style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
            </div>        
        `;

        res.send(htmlResponse);
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.status(401).send("Unauthorized: Invalid credentials");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Сервис запущен на порту ${PORT}`);
});