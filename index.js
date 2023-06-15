import express, { json, urlencoded } from "express";
import http from "http";

import sequelize from "./database.js";
import "./associations.js";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import bookingRoute from "./routes/booking.js";
import tourRoute from "./routes/tour.js";
import reviewRoute from "./routes/review.js";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

// routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/booking", bookingRoute);
app.use("/tour", tourRoute);
app.use("/review", reviewRoute);

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
