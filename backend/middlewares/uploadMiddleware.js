const multer = require('multer');

//configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // specify the directory to save uploaded files   
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // create a unique filename using timestamp and original name
    },
});

// file filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // accept the file
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'), false); // reject the file
    }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;