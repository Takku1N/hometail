require('dotenv').config();

const express = require("express");
const prometheus = require("./utils/metrics");
const responseTime = require("response-time");
const cors = require("cors")

const allowedOrigins = [process.env.FRONTEND_URL];
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes")
const petRoutes = require("./routes/petRoutes")
const requestRoutes = require("./routes/requestRoutes")
const cookieParser = require('cookie-parser')

const app = express();

//json
app.use(express.json());
app.use(cookieParser())
// กำหนด options ของ CORS
const corsOptions = {
  origin: 'http://localhost', // อนุญาตเฉพาะ origin นี้
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // อนุญาตเมธอดเหล่านี้
  allowedHeaders: ['Content-Type'], // อนุญาต header เหล่านี้
  credentials: true // อนุญาตการส่ง credentials (เช่น cookie)
};

// ใช้ cors middleware เป็นอันดับแรกๆ
app.use(cors(corsOptions));

// Prometheus response time
app.use(
  responseTime((req, res, time) => {
    if (req.route && req.route.path) {
      // time เป็น seconds ใน response-time รุ่นใหม่
      prometheus.restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time
      );
    }
  })
);

// REST API
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", petRoutes);
app.use("/api", requestRoutes);
//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port http://0.0.0.0:${PORT}`);
    prometheus.startMetricsServer();
});