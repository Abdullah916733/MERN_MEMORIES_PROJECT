import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const CONNECTION_URL =
  "mongodb+srv://ABDULLAH:DjuJfPh6kGPItiXx@cluster0.3tyldfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
  })
  .catch((err) => console.log(err.message));
