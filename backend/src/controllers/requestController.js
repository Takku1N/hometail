
// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getRequests = async (req, res) => {
    try{
        const requests = await prisma.request.findMany({
            include: {
                requester: {
                    include: {
                        user_profile: true
                    }
                },
                pet: {
                    include: {
                        profile: true
                    }
                }

            }
        })

        res.status(200).json(requests);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

exports.getRequestByOwnerId = async (req, res) => {
    const owner_id = req.user.user_id;
    try{
        const requests = await prisma.request.findMany({
            where: {
                pet: {
                    owner_id: Number(owner_id)
                },
                status: 'Pending'
            },
            include: {
                requester: {
                    include: {
                        user_profile: true
                    }
                },
                pet: {
                    include: {
                        profile: true
                    }
                }

            }
        })

        res.status(200).json(requests);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

exports.approveRequest = async (req, res) => {
    const request_id = req.params.id;
    try{
       const result = await prisma.$transaction(async (prisma) => {
            const updatedRequest = await prisma.request.update({
                where: {
                    id: Number(request_id)
                },
                data: {
                    status: 'Approved'
                }
            })

            const updatePetProfile = await prisma.petProfile.update({
                where: {
                    pet_id: Number(updatedRequest.pet_id)
                },
                data: {
                    adopted: true
                }
            })

            return { updatedRequest, updatePetProfile };
       })

        res.status(200).json(result);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

exports.rejectRequest = async (req, res) => {
    const request_id = req.params.id;
    try{
       const result = await prisma.$transaction(async (prisma) => {
            const updatedRequest = await prisma.request.update({
                where: {
                    id: Number(request_id)
                },
                data: {
                    status: 'Rejected'
                }
            })

            const updatePetProfile = await prisma.petProfile.update({
                where: {
                    pet_id: Number(updatedRequest.pet_id)
                },
                data: {
                    adopted: false
                }
            })

            return { updatedRequest, updatePetProfile };
       })

        res.status(200).json(result);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}
exports.createRequest = async (req, res) => {
    const requester_id = req.user.user_id;
    try{
        const newRequest = await prisma.request.create({
        data: {
            requester_id: Number(requester_id),
            pet_id: Number(req.params.id),
            status: 'Pending'
        }
    })
    res.status(201).json(newRequest);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

exports.getMyRequest = async (req, res) => {
    const requester_id = req.user.user_id;
    try{
        const requests = await prisma.request.findMany({
            where: {
                requester_id: Number(requester_id)
            },
            include: {
                pet: {
                    include: {
                        profile: true,
                        owner: {
                            include: {
                                user_profile: true
                            }
                        }
                    }
                }
            }
        })
        res.status(200).json(requests);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}