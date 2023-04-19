import express from "express";
import authRoutes from './routes/auth.js';
import userRoutes from "./routes/users.js";
import orderRoutes from "./routes/orders.js";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req,res)=> {
  res.json("its work")
})

app.listen(3001, () => {
  console.log("Server side is Uppppp");
});