
const express = require("express");
const prometheus = require("./utils/metrics");
const responseTime = require("response-time")
const userRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes")
const app = express();

const allowedOrigins = [process.env.FRONTEND_URL];

//json
app.use(express.json());

//cors ต้องแก้ตอนลง production
app.use((req, res, next) => {
  const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    next();
});

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
app.use("/api/auth", userRoutes);
app.use("/api/test", testRoutes);

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port http://0.0.0.0:${PORT}`);
    prometheus.startMetricsServer();
});