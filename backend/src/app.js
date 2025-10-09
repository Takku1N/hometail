require('dotenv').config();

const express = require("express");
const prometheus = require("./utils/metrics");
const responseTime = require("response-time");

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

// before upload image is here

// const { uploadFile } = require('../uploadFile')
// const { upload }  = require('../middleware.js')

// app.post('/upload', upload.single('image'), async (req, res) => {
//     // https://storage.cloud.google.com/hometail/handsome-eiei.jpg
//     try{
//         // ไม่มีไฟล์
//         if (!req.file){
//             return res.status(400).json({ message: "ไม่พบไฟล์"});
//         }
        
//         const fileName = req.file.filename
//         const result = await uploadFile(process.env.BUCKET_NAME, req.file.path, fileName)
//         fs.unlinkSync(req.file.path);
//         res.status(200).json(result);
//     } catch (error){
//         res.status(500).json({ message: error.message });
//     }
    
    
// })


//json
app.use(express.json());
app.use(cookieParser())
//cors ต้องแก้ตอนลง production
app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
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
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", petRoutes);
app.use("/api", requestRoutes);
//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port http://0.0.0.0:${PORT}`);
    prometheus.startMetricsServer();
});