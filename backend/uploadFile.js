const {Storage} = require('@google-cloud/storage')

const projectId = process.env.PROJECT_ID
const keyFilename = process.env.KEYFILENAME
const storage = new Storage({projectId, keyFilename})

const uploadFile = async (bucketName, file, fileOutputName) => {
    try{

        const bucket = storage.bucket(bucketName)
        const result = await bucket.upload(file, {
            destination: fileOutputName
        })
        return result
    } catch (error){
        console.error('Error:', error.message);
    }
}

module.exports = {uploadFile}