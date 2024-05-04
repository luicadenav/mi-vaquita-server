import express from "express";
import { GroupRouter } from "./routes/group.router.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/groups", GroupRouter().registerRoutes());

app.listen(PORT, () => {
  console.log(`mi vaquita server is running on  http://localhost:${PORT} `);
});
