// import path from "path";
// import randToken from "rand-token"
import fs from "fs"
import multer from "multer";
import path from "path";

// function isArrayDefine(fileObjArray) {
//     if (typeof fileObjArray !== 'undefined' && fileObjArray.length > 0) {
//         return true;
//     }
//     return false;
// }

// function uploadImage(fileObjArray, pathFolder, fieldname) {
//     let filePath = null
//     for (let index = 0, len = fileObjArray.length; index < len; ++index) {
//         console.log(fileObjArray, 'arrt-----')
//         if (fileObjArray[index].fieldname === fieldname) {
//             if (isArrayDefine(fileObjArray)) {
//                 let uploadedFile = randToken.uid(16) + path.extname(fileObjArray[index].originalname)
//                 filePath = `/${pathFolder}/${uploadedFile}`
//                 let uploadPath = `../uploads/${pathFolder}/${uploadedFile}`;
//                 if (!fs.existsSync(`../uploads/${pathFolder}`)) {
//                     fs.existsSync(`../uploads/${pathFolder}`, {
//                         recursive: true
//                     });
//                     let outStream = fs.createWriteStream(uploadPath);
//                     outStream.write(fileObjArray[index].buffer);
//                     outStream.end()
//                 }
//             }
//         }
//     }
//     console.log(filePath, 'filepath---')
//     return filePath
// }

// // export { uploadImage }
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);


const store = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use the desired destination path for file uploads
        const uploadPath = path.join(__dirname, '../upload/product_image');

        // Create the upload directory if it doesn't exist
        fs.mkdir(uploadPath, { recursive: true }, function (err) {
            if (err) return cb(err);
            cb(null, uploadPath);
        });
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        cb(null, name);
    }
});

const upload = multer({ storage: store });

export { upload };

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// export { upload };