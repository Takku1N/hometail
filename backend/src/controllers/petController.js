
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
                pet_id: Number(pet_id)
            },
            include: {
                pet: true
            }
    })
        return res.status(200).json(pet);
    } catch (error){
        res.status(500).json({ message: error.message });
    }}

exports.createPet = async (req, res) => {
    let image_url;
    if (req.file){
        const fileName = req.file.filename
        const result = await uploadFile(process.env.BUCKET_NAME, req.file.path, fileName)
        fs.unlinkSync(req.file.path);
        image_url = process.env.BASE_BUCKET_URL + fileName
    } else {
        image_url = null
    }
    
    try{
        const owner_id = req.user.user_id
        console.log(req.body)
        console.log(owner_id)
        const newPet = await prisma.$transaction(async (prisma) => {

            // สร้าง pet
            const pet = await prisma.pet.create({
                data: {
                    owner_id: owner_id,
                }
            })

            // console.log("=== Creating PetProfile ===");
            // console.log("pet_id:", pet.id, "type:", typeof pet.id);
            // console.log("name:", req.body.name, "type:", typeof req.body.name);
            // console.log("description:", req.body.description, "type:", typeof req.body.description);
            // console.log("location:", req.body.location, "type:", typeof req.body.location);
            // console.log("gender:", req.body.gender, "type:", typeof req.body.gender);
            // console.log("age:", Number(req.body.age), "type:", typeof Number(req.body.age));
            // console.log("vaccinated:", req.body.vaccinated === 'true', "type:", typeof (req.body.vaccinated === 'true'));
            // console.log("breed:", req.body.breed, "type:", typeof req.body.breed);
            // console.log("medical_note:", req.body.medical_note, "type:", typeof req.body.medical_note);
            // console.log("neutered:", req.body.neutered === 'true', "type:", typeof (req.body.neutered === 'true'));
            // console.log("species:", req.body.species, "type:", typeof req.body.species);
            // console.log("image_url:", image_url, "type:", typeof image_url);
            // console.log("===========================");
        
            // สร้าง pet profile
            const petProfile = await prisma.petProfile.create({
                data: {
                    pet_id: pet.id,
                    name: req.body.name,
                    description: req.body.description,
                    location: req.body.location,
                    gender: req.body.gender,
                    age: Number(req.body.age),
                    vaccinated: req.body.vaccinated === 'true',
                    breed: req.body.breed,
                    medical_note: req.body.medical_note,
                    neutered: req.body.neutered === 'true',
                    species : req.body.species,
                    image_url: image_url
                }
            })

            console.log("=== Created PetProfile ===");

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
