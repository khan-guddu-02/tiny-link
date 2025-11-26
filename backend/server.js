import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import urlRoutes from "./src/routes/urlRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/url", urlRoutes);

app.get("/", (req, res) => {
  res.send("TinyLink URL Shortener API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
