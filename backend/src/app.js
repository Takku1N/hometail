
const express = require("express");
const userRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes")
const app = express();


//json
app.use(express.json());

//cors ต้องแก้ตอนลง production
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// REST API
app.use("/auth", userRoutes);
app.use("/test", testRoutes)

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));