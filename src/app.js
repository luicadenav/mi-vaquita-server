import express from "express";
import { GroupRouter } from "./routes/group.router.js";
import { UserRouter } from "./routes/user.router.js";
import { AuthRouter } from "./routes/auth.router.js";
import cors from "cors";
import passport from "passport";
import { applyJWTAuthentication } from "./middlewares/auth.middleware.js";
import "./utils/passport.config.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use(applyJWTAuthentication); // apply auth all routes except login and signup

app.use("/groups", GroupRouter().registerRoutes());
app.use("/users", UserRouter());
app.use("/auth", AuthRouter());

app.listen(PORT, () => {
  console.log(`mi vaquita server is running on  http://localhost:${PORT} `);
});
