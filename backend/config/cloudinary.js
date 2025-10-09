import { rejects } from 'assert';
import {v2 as cloudinary} from 'cloudinary'
import { error } from 'console';
import multer from 'multer'
import {Readable} from 'stream'
import { buffer } from 'stream/consumers';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 50* 1024 *1024
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image/')){
            cb(null,true);
        }else{
            cb(new Error('Only Image and files are allowed'))
        }
    }


});

const uploadCloud = (buffer , folder = 'bondly=events')=>{
    return new Promise((resolve, reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'auto',
                transformation:[{
                  width: 1000, height: 1000, crop: 'limit'  
                }]
            },
            (error,result)=>{
                if(error){
                    reject(error)
                }
                else{
                    resolve(result);
                }
            }
        );
        const bufferStream = Readable.from(buffer);
        bufferStream.pipe(uploadStream);
    });
}

export  { cloudinary , upload , uploadCloud};
