import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "./clients/redisCleint.js";
import passport from "passport";
import { ApiError, ApiResponse } from "./services/index.js";
import { googleStrategy } from "./services/index.js";
import cors from "cors";
import { unifySessionUser } from "./middlewares/unifySessionUser.js";
import { userRouter } from "./routes/user.routes.js";
import { sellerRoutes } from "./routes/seller.routes.js";
import { productRoutes } from "./routes/product.routes.js";

const app = express();

//middleware configs
const sessionConfig = {
  store: new RedisStore({ client: redisClient, prefix: "session:" }),
  secret: process.env.SESSION_SECRET
    ? process.env.SESSION_SECRET
    : "super+secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    //TODO turn this on in production
    // secure: true,  for production
    sameSite: "None", 
    // httpOnly: true,
    maxAge: 30 * 60 * 1000, //30 minutes in miliseconds for cookies
  },
  name: "session-cookie",
  rolling: true, // this refreshes the maxage and ttl on every request causing only user login after 30 min non interaction
  ttl: 30 * 60, // 30 minutes in seconds for redis
};

// sessionConfig.cookie.secure = process.env.NODE_ENV === "production";

// middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(
  morgan(" :method :url :status :res[content-length] - :response-time ms")
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(googleStrategy);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser(async (user, cb) => {
  cb(null, user);
});

//middleware to unify the session user with passport and express-session
app.use(unifySessionUser);

//*****************user route******************\
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);

//**************global error handler*******************/
app.use((err, req, res, next) => {
  console.error("Error occured:", err);
  if (err instanceof ApiError) {
    return res
      .status(err.statuscode)
      .json(new ApiResponse(err.statuscode, err.message, err.stack));
  }
  return res
    .status(500)
    .json(
      new ApiResponse(500, err.message || "Internal Server Error", err.stack)
    );
});
export default app;
