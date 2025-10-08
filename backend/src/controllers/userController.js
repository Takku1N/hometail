
// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


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
        const user_id = req.params.id;
        const result = await prisma.$transaction(async (prisma) =>{

            const deleteUserProfile = await prisma.userProfile.delete({
                where: {
                    user_id: Number(user_id)
                }
            })

            const deleteUser = await prisma.user.delete({
                where: {
                    id: Number(user_id)
                }
            })

            
            return { deleteUser, deleteUserProfile }
        })

        // const result = await prisma.user.delete({
        //     where: {
        //         id: Number(user_id)
        //     },
        //     include: {
        //         user_profile: true
        //     }
        // })

        return res.status(200).json(result);
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