
// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { uploadFile } = require('../../uploadFile')
const fs = require('fs')


exports.getMyProfile = async (req, res) => {
    try {
        const user_id = req.user.user_id
        const user = await prisma.user.findUnique({
            where: {
                id: Number(user_id),
            },
            include: {
                user_profile: true
            }
        });
        res.status(200).json(user);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

exports.getUsers = async (req, res) => {
    try{
        const users = await prisma.user.findMany({
            include: {
                user_profile: true
            }
        })
        res.status(200).json(users);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // ใช้ Transaction เพื่อให้แน่ใจว่าทุกอย่างสำเร็จหรือล้มเหลวไปพร้อมกัน
        await prisma.$transaction(async (tx) => {
            // 1. ลบ "Requests" ที่ user คนนี้เป็นคนส่งก่อน
            await tx.request.deleteMany({
                where: { requester_id: userId }
            });

            // 2. หา Pet ทั้งหมดที่ user คนนี้เป็นเจ้าของ
            const petsOwnedByUser = await tx.pet.findMany({
                where: { owner_id: userId },
                select: { id: true }
            });
            const petIds = petsOwnedByUser.map(pet => pet.id);

            if (petIds.length > 0) {
                // 3. ลบ "Requests" ทั้งหมดที่ส่งมาหา Pet ของ user คนนี้
                await tx.request.deleteMany({
                    where: { pet_id: { in: petIds } }
                });

                // 4. ลบ "Pet Profiles"
                await tx.petProfile.deleteMany({
                    where: { pet_id: { in: petIds } }
                });

                // 5. ลบ "Pets"
                await tx.pet.deleteMany({
                    where: { id: { in: petIds } }
                });
            }

            // 6. ลบ "User Profile"
            await tx.userProfile.delete({
                where: { user_id: userId }
            });
            
            // 7. สุดท้าย ค่อยลบ User ตัวหลัก
            await tx.user.delete({
                where: { id: userId }
            });
        });

        res.status(200).json({ message: `ลบ User: ${userId} สำเร็จ` })
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

exports.banUser = async (req, res) => {
    try {
        const user_id = req.params.id;
        const result = await prisma.user.update({
            where: {
                id: Number(user_id)
            },
            data: {
                status: false
            }
        })

        return res.status(200).json(result);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.unbanUser = async (req, res) => {
    try {
        const user_id = req.params.id;
        const result = await prisma.user.update({
            where: {
                id: Number(user_id)
            },
            data: {
                status: true
            }
        })

        return res.status(200).json(result);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.updateMyProfile = async (req, res) => {
    const user_id = req.user.user_id
    let image_url;
    if (req.file){
        const fileName = req.file.filename
        const result = await uploadFile(process.env.BUCKET_NAME, req.file.path, fileName)
        fs.unlinkSync(req.file.path);
        image_url = process.env.BASE_BUCKET_URL + fileName
    } else{
        try{
            const currentProfile = await prisma.userProfile.findUnique({
                where: {
                    user_id: Number(user_id)
                }
            })

            image_url  = currentProfile.image_url
        } catch (error){
            res.status(500).json({ message: error.message });
        }
    }

    try{
        const result = await prisma.$transaction(async (prisma) => {
            const updateUser = await prisma.user.update({
                where: {
                    id: Number(user_id)
                },
                data: {
                    email: req.body.email
                }
            })
            console.log(req.body.email)

            const updateUserProfile = await prisma.userProfile.update({
                where: {
                    user_id: Number(user_id)
                },
                data: {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    phone_number: req.body.phone_number,
                    image_url: image_url
                }
            })
            console.log(updateUserProfile)

            return { updateUser, updateUserProfile }
        })
        
        res.status(200).json(result);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}


















// exports.getUsers = async (req, res) => {

//     try {
//         const user_id = req.user.user_id
//         const users = await prisma.user.findMany();
//         res.status(200).json({users, user_id});
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.getUserById = async (req, res) => {
//     try {
//         const user = await prisma.user.findUnique({
//             where: {
//                 id: Number(req.params.id),
//             },
//         });
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.createUser = async (req, res) => {
//     try {
//         const user = await prisma.user.create({
//             data: {
//                 name: req.body.name,
//                 email: req.body.email,
//             },
//         });
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.updateUser = async (req, res) => {
//     try {
//         const user = await prisma.user.update({
//             where: {
//                 id: Number(req.params.id),
//             },
//             data: {
//                 name: req.body.name,
//                 email: req.body.email,
//             },
//         });
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.deleteUser = async (req, res) => {
//     try {
//         const user = await prisma.user.delete({
//             where: {
//                 id: Number(req.params.id),
//             },
//         });
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };