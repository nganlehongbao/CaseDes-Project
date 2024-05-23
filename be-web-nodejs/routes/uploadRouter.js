const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const fs = require('fs');
const path = require("path");
var User = require("../models/users");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        // Lấy phần mở rộng của file gốc
        const ext = path.extname(file.originalname);
        // Tạo một tên file mới dựa trên thời gian và thêm phần mở rộng file gốc
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        cb(null, uniqueSuffix);
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};


const upload = multer({ storage: storage, fileFilter: imageFileFilter });


const uploadRouter = express.Router();


uploadRouter.use(bodyParser.json());


uploadRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /imageUpload');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, upload.single('imageFile'), (req, res,next) => {
        User.findById(req.user._id)
            .then(user => {
                if (user) {
                    if (user.imgAvt) {
                        const oldImagePath = path.join(__dirname, '../public/images', user.imgAvt);
                        fs.unlink(oldImagePath, (err) => {
                            if (err) {
                                console.error('Failed to delete old image:', err);
                            } else {
                                console.log('Old image deleted successfully');
                            }
                        });
                    }
                    user.imgAvt = req.file.filename;
                    user.save()
                        .then(user => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({ success: true, image: user.imgAvt });
                        })
                        .catch(err => next(err));
                } else {
                    const err = new Error(`User ${req.user._id} not found`);
                    err.status = 404;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /imageUpload');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /imageUpload');
    });

uploadRouter.route('/:filename')
    .get(cors.cors, (req, res) => {

        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../public/images', filename);

        console.log("Requested file path:", filePath);

        // Kiểm tra xem tệp có tồn tại không
        if (fs.existsSync(filePath)) {
            console.log("File found. Streaming to client...");
            // Đọc ảnh từ thư mục và trả về cho client
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } else {
            console.log("File not found. Sending 404 response.");
            res.status(404).send("File not found");
        }
    });
module.exports = uploadRouter;
