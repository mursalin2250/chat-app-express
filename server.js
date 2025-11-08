import express from "express";
import {PORT} from "./src/config/envConfig.js";
import connectDB from "./src/config/db.js";
import appRoutes from "./app.js";

const app = express();
app.use(express.json());
connectDB();

app.get("/", (req,res) => {
    res.send("Welcome! Chat App Running...");    
})

app.use("/api", appRoutes);

app.listen(PORT, ()=> {
    console.log(`Server running at https://localhost:${PORT}`);
})