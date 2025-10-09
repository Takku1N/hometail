
// Prisma
const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient();


// Bcrypt for hash function
const bcrypt = require("bcrypt");


exports.getMyProfile = async (req, res) => {
    try {
        const token = req.cookies.loginToken;
        if (!token){
            return res.json({
                userData: null,
                isLogin: false
            })
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decodedToken.user_id
        const userData = await prisma.user.findUnique({
            where: {
                id: Number(user_id)
            },
            include: {
                user_profile: true
            }
        })

        return res.json({
            userData: userData,
            isLogin: true
        })
    } catch (error){
        res.json({error: error.message})
    }
}

exports.signInUser = async (req, res) => {
    const { email, password } = req.body
    try {
        // ค้นหา Email
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        // ตรวจสอบ Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });


        if (!user.status) return res.json({message: "คุณยังไม่ได้สิทธิ์ในการใช้เว็บไซต์"})
        // จัดการ cookie
        const token = jwt.sign({user_id: user.id}, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })

        res.cookie("loginToken", token, {
            httpOnly: true,
            maxAge: 24*60*60*1000,
            sameSite: "strict"
        })

        return res.status(200).json({message: "เข้าสู่ระบบสำเร็จ"})

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

exports.signUpUser = async (req, res) => {
    const { email, password, first_name, last_name, phone_number, facebook } = req.body;

    try {
        // สร้าง Salt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, salt);

        // เก็บลง DB
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                user_profile: {
                        create: {
                        first_name: first_name,
                        last_name: last_name,
                        phone_number: phone_number,
                        facebook: facebook,
                    }
                }
            },
            include: {
                user_profile: true,
            }
        });
        res.status(200).json({message: "ลงทะเบียนสำเร็จกรุณารอ admin อนุมัติ"});
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};


exports.signOutUser = async (req, res) => {
    try{
        res.clearCookie("loginToken", {
            httpOnly: true,
            sameSite: "strict",
            path: "/"
        })
        res.json({
            message: "Logout สำเร็จ"
        })
    } catch (error){
        res.json({
            message: "Logout ไม่สำเร็จ",
            error
        })
    }
}

exports.changePassword = async (req, res) => {
    const { email, password } = req.body
    try {
        // สร้าง Salt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update ลง DB
        const user = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                email: email,
                password: hashedPassword,
            }
        });

        return res.status(200).json(user.id);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}