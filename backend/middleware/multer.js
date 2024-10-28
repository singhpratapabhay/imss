
const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        cb(null, './public/image')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "-" + file.originalname)
    }
})


const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 50 * 1024, // Limit the size to 50 KB
    },
})


const fileUploadMiddleware = upload.single('image');

// Middleware to check file size  and file formate after upload
const checkFileSize = async (req, res, next) => {
    console.log('upload afile  ------ ', req.file);
    const { file } = req
    if (!file) {
        res.status(400).send('plase upload a file');
    }
    else {
        if (req.file.size >= 10 * 1024 && req.file.size <= 50 * 1024) {
        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedFormats.includes(file.mimetype)) {
            return res.status(400).send('Invalid image format. Supported formats: JPEG, JPG PNG,');
            } else {
            next()
            }
        } else {
            await fs.unlinkSync(req.file.path)
            res.status(400).send('File size must be between 10 KB and 50 KB.');
        }
    }
};

module.exports = {
    fileUploadMiddleware,
    checkFileSize,
};
