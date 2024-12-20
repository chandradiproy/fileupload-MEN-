const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/') //Saving files in uploads folder
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage});

module.exports = upload;