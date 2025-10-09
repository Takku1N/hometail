require('dotenv').config();

const express = require("express");
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

const { uploadFile } = require('../uploadFile')
const upload = multer({ dest: 'uploads/'})

app.post('/upload', upload.single('image'), async (req, res) => {
    // https://storage.cloud.google.com/hometail/handsome-eiei.jpg
    console.log(req.file)
    // const result = await uploadFile(process.env.BUCKET_NAME, 'handsome.jpg', 'handsome-eiei.jpg')
    res.status(200).json(req.file.path)
})


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

// REST API
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", petRoutes);
app.use("/api", requestRoutes);
//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));