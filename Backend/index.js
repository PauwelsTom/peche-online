// index.js
import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { getRandom } from "../Utils/Functions.js";
import { PoissonDict } from "./Data/FishInfo.js";
import jwt from "jsonwebtoken";

// TODO: Faire un .env pour definir ca
const SECRET_KEY = "mon_super_token_secret_123"; // À mettre dans .env en prod



const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const USERS_PATH = "./Backend/Data/users.json";

// Load users from file
function loadUsers() {
    try {
        if (!fs.existsSync(USERS_PATH)) return [];
        const raw = fs.readFileSync(USERS_PATH, 'utf8');
        return raw.trim() === "" ? [] : JSON.parse(raw);
    } catch (e) {
        console.error("Erreur de lecture du fichier users.json:", e.message);
        return [];
    }
}

// Save users to file
function saveUsers(users) {
    fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token." });
        req.user = user;
        next();
    });
}


//! === POST /register ===
app.post('/register', async (req, res) => {
    console.log("Requete de register");
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required." });
    }

    const users = loadUsers();

    if (users.find(u => u.username === username)) {
        return res.status(409).json({ success: false, message: "Username already exists." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        saveUsers(users);
        return res.status(201).json({ success: true, message: "User registered successfully." });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});

//! === POST /login ===
app.post("/login", (req, res) => {
    console.log("Requete de login");
    const { username, password } = req.body;
    const users = loadUsers();

    const user = users.find((u) => u.username === username && bcrypt.compareSync(password, u.password));
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // On génère un token valable 1h
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ success: true, token });
});


//! === POST /newPoisson ===
app.post("/newPoisson", authenticateToken, (req, res) => {
    console.log("Requete de nouveau poisson");
    let max = 0;
    for (const f in PoissonDict) {
        max += PoissonDict[f].rarity;
    }
    let fish = getRandom(0, max - 1);
    for (const f in PoissonDict) {
        fish -= PoissonDict[f].rarity;
        if (fish <= 0) {
            return res.json(PoissonDict[f].get_fish());
        }
    }
});


//! === POST /checkToken ===
app.post("/checkToken", (req, res) => {
    console.log("Requete check token");
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({
            success: true,
            message: "Token is valid",
            user: decoded,
        });
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
});


//! === GET /test ===
app.get("/test", (req, res) => {
    console.log("Requete de test");
    return res.json("test");
});

// === Middleware pour erreurs internes (format JSON) ===
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
