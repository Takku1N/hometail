require('dotenv').config();

const express = require("express");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes")
const petRoutes = require("./routes/petRoutes")
const requestRoutes = require("./routes/requestRoutes")
const cookieParser = require('cookie-parser')

const app = express();

// before upload image is here
const { uploadFile } = require('../uploadFile')

app.post('/upload', async (req, res) => {
    // https://storage.cloud.google.com/hometail/handsome-eiei.jpg
    const result = await uploadFile(process.env.BUCKET_NAME, 'handsome.jpg', 'handsome-eiei.jpg')
    res.status(200).json(result)
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