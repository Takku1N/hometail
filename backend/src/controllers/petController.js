
// Prisma

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { uploadFile } = require('../../uploadFile')
const fs = require('fs');


exports.getAllPet = async (req, res) => {
    try {
        const pets = await prisma.petProfile.findMany({
            where: {
                adopted: false
            },
            include: {
                pet: true
            }
        });
        return res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getPetById = async (req, res) => {
    const pet_id = req.params.id
    try {
        const pet = await prisma.petProfile.findUnique({
            where: {
                pet_id: parseInt(pet_id)
        }})
        return res.status(200).json(pet);
    } catch (error){
        res.status(500).json({ message: error.message });
    }}

exports.createPet = async (req, res) => {
    try{
        const owner_id = req.user.user_id

        // อัพโหลดรูปไปที่ cloud 
        if (!req.file){
            return res.status(400).json({ message: "ไม่พบไฟล์"});
        }

        const fileName = req.file.filename
        const result = await uploadFile(process.env.BUCKET_NAME, req.file.path, fileName)
        fs.unlinkSync(req.file.path);
        image_url = process.env.BASE_BUCKET_URL + fileName

        const newPet = await prisma.$transaction(async (prisma) => {

            // สร้าง pet
            const pet = await prisma.pet.create({
                data: {
                    owner_id: owner_id,
                }
            })

            // สร้าง pet profile
            const petProfile = await prisma.petProfile.create({
                data: {
                    pet_id: pet.id,
                    name: req.body.name,
                    description: req.body.description,
                    location: req.body.location,
                    gender: req.body.gender,
                    age: Number(req.body.age),
                    vaccinated: Boolean(req.body.vaccinated),
                    breed: req.body.breed,
                    medical_note: req.body.medical_note,
                    neutered: Boolean(req.body.neutered),
                    species : req.body.species,
                    image_url: image_url
                }
            })

            return { pet, petProfile };
            
        })
        return res.status(201).json(newPet);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

exports.getPetByOwnerId = async (req, res) => {
    const owner_id = req.user.user_id
    try {
        const pets = await prisma.pet.findMany({
            where: {
                owner_id: owner_id
            },
            include: {
                profile: true
            }
        })
        return res.status(200).json(pets);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

exports.getPetByOwnerIdNonAdopted = async (req, res) => {
    const owner_id = req.user.user_id
    try{
        const pets = await prisma.pet.findMany({
            where: {
                owner_id: owner_id,
                profile:{
                    adopted: false
                }
            },
            include: {
                profile: true
            }
        })
        return res.status(200).json(pets);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

exports.getPetByOwnerIdAdopted = async (req, res) => {
    const owner_id = req.user.user_id
    try{
        const pets = await prisma.pet.findMany({
            where: {
                owner_id: owner_id,
                profile:{
                    adopted: true
                }
            },
            include: {
                profile: true
            }
        })
        return res.status(200).json(pets);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}
exports.updatePet = async (req, res) => {
    const pet_id = req.params.id
    try{
        const result = await prisma.petProfile.update({
            where: { pet_id: parseInt(pet_id) },
            data: req.body
        })
        return res.status(200).json(result);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

exports.deletePet = async (req, res) => {
    const pet_id = req.params.id
    try{
        const result = await prisma.$transaction(async (prisma) => {

            const deletePetProfile = await prisma.petProfile.delete({
                where: { pet_id: Number(pet_id) }
            })

            const deletePet = await prisma.pet.delete({
                where: { id: Number(pet_id) }
            })

            return { deletePet, deletePetProfile };
        })

        return res.status(200).json(result);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}
