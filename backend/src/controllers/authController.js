
// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Bcrypt for hash function
const bcrypt = require("bcrypt");


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

        // จัดการ session
        // ...

        return res.status(200).json(user.id);
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
        res.status(200).json(user.id);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

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