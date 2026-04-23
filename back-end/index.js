import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./config/database.js";
import userRoutes from "./routes/userContactMessagesRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/my-portfolio/api/user", userRoutes);
app.use("/my-portfolio/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

const PORT = process.env.PORT || 6000;


const startServer = async () => {
    try {
        const result = await pool.query("SELECT NOW()");

        console.log("Database Connected Successfully");
        console.log("DB Time:", result.rows[0].now);

        app.listen(PORT, () => {
            console.log(`Server started running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database Connection Failed:", error.message);
        process.exit(1);
    }
};

startServer();