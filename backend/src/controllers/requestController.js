
// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
        const updatedRequest = await prisma.request.update({
            where: {
                id: Number(request_id)
            },
            data: {
                status: 'Approved'
            }
        })

        res.status(200).json(updatedRequest);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

exports.rejectRequest = async (req, res) => {
    const request_id = req.params.id;
    try{
        const updatedRequest = await prisma.request.update({
            where: {
                id: Number(request_id)
            },
            data: {
                status: 'Rejected'
            }
        })

        res.status(200).json(updatedRequest);
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
            pet_id: Number(req.body.pet_id),
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
            }
        })
        res.status(200).json(requests);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}