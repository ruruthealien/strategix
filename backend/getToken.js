const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const login = async() => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
            email: "dustin@timetoprogram.com",
            password: "test123"
        });

        const token = response.data.token;
        console.log("✅ JWT Token received:", token);

        // Write token to .env
        const envPath = path.join(__dirname, ".env");

        // Read existing .env content
        let envContent = "";
        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, "utf-8");
        }

        // Replace or add JWT_TOKEN
        if (envContent.includes("JWT_TOKEN=")) {
            envContent = envContent.replace(/JWT_TOKEN=.*/g, `JWT_TOKEN=${token}`);
        } else {
            envContent += `\nJWT_TOKEN=${token}`;
        }

        // Save it back
        fs.writeFileSync(envPath, envContent.trim() + "\n");

        console.log("✅ Token saved to .env file");

    } catch (error) {
        console.error("❌ Error during login:", error.message);
    }
};

login();