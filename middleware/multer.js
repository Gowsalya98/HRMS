const multer = require('multer')
const fs = require('fs');


// var maxSize = 1 * 1000 * 1000;
var storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
    // console.log("line 9")
        var fileCreate = '/home/fbnode/Dhanalakshmi/HRMS/upload'
        if (!fs.existsSync('fileCreate')) {
            console.log("line no 11")
            fs.mkdirSync(fileCreate, {
                recursive: true
            });
        }
        cb(null, '/home/fbnode/Dhanalakshmi/HRMS/upload');
    },
    filename: function (req, files, cb) {
        // console.log("line 19",files)
        cb(null, Date.now().toString() + files.originalname);
    },
    onFileUploadStart: function (files, req, res) {
        // console.log("line 23",files)
        if (req.files.files.length > maxSize) {
            return false;
        }
    }
});
const fileFilters = (req, file, cb) => {
    // console.log(file.mimetype)
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'||file.mimetype=='text/plain'|| file.mimetype=='application/pdf'||file.mimetype=='image/gif'||file.mimetype=='docx') {
        cb(null, true)

    } else {
        cb(null, false)
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilters })

module.exports = { upload }