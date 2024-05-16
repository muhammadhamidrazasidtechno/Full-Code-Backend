import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadResult = async (file) => {
    try {

        if (!file) return null
        const response = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        })
        fs.unlinkSync(file)

        // console.log(response);

        return response
    } catch (e) {
        fs.unlinkSync(file)
    }
}


export default uploadResult;