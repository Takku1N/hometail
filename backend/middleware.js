const jwt = require('jsonwebtoken')
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')  // โฟลเดอร์นี้ต้องสร้างไว้ล่วงหน้า
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

const authenticateToken = (req, res, next) => {
    const token = req.cookies.loginToken;

    // ถ้าไม่มี token
    if (!token){
        return res.json({
            message: "กรุณาเข้าสู่ระบบ"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch(error){
        res.json({
            message: "token หมดอายุเเล้ว หรือ ไม่ถูกต้อง",
            error
        })
    }
}

const isPetOwner = async (req, res, next) => {
    const user_id = req.user.user_id
    const pet_id = req.params.id;
    try{
        const pet = await prisma.pet.findUnique({
            where: {
                id: Number(pet_id)
            }
        })

        if (!pet){
            return res.status(404).json({ message: "ไม่พบสัตว์เลี้ยงนี้" });
        }

        if (pet.owner_id !== user_id){
            return res.status(403).json({ message: "คุณไม่ใช่เจ้าของสัตว์เลี้ยง" });
        }
        
        next();
        
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

const isAdmin = async (req, res, next) => {
    const user_id = req.user.user_id;
    try{
        const profile = await prisma.user.findUnique({
            where: {
                id: Number(user_id)
            }
        })

        if (profile.role !== "Admin"){
            return res.status(403).json({ message: "คุณไม่ใช่ admin" });
        }

        next();
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    authenticateToken,
    isPetOwner,
    isAdmin,
    upload

}