const Violations = require('../Models').ViolationsModel;
const JSONStream = require('JSONStream');
const SocketService = require('../SocketIOControllers/SocketIO.violations.controller');
const filePaths = '/Server/uploads';
const fs = require('fs');
exports.test = (req, res) => {
    res.send('greetings from the violation controller')
}

exports.allViolations = (req, res) => {
    Violations.find({})
    .cursor()
    .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
}

exports.newViolation = (req, res) => {
    let newViolation = new Violations();
    let time = Date.now();
    newViolation.timestamp = time;
    console.log(newViolation.timestamp)
    newViolation.lane = req.body.lane;
    newViolation.direction = req.body.direction;
    if(req.files['video']){
        let video = fs.readFileSync(req.files['video'][0].path);
        let videoFileName = req.files['video'][0].originalname;
        videoFileName = videoFileName.split("/").join("_");
        videoFileName = videoFileName.split(" ").join("_");
        let videoMimeType = req.files['video'][0].mimetype.split("/").join("_");
        newViolation.videoMimeType = videoMimeType;
        //Ip address to be added pre colon
        let videoUrl= `video_${newViolation.timestamp*10}_${videoFileName}`
        newViolation.videoUrl = `:3000/violations/violationFile/${videoUrl}/${videoMimeType}`;
        fs.writeFile(`/Server/uploads/${videoUrl}` ,video, (err) => {
            if(err){
                console.log("err")
                return console.log(err)
            }
            console.log("video file saved");
        })
    }
    if(req.files['image']){
        let image = fs.readFileSync(req.files['image'][0].path);
        let imageFileName = req.files['image'][0].originalname;
        imageFileName = imageFileName.split("/").join("_");
        imageFileName = imageFileName.split(" ").join("_");
        let imageUrl= `image_${newViolation.timestamp*10}_${imageFileName}`;
        let imageMimeType = req.files['image'][0].mimetype.split("/").join("_");
        newViolation.imageUrl = `:3000/violations/violationFile/image_${newViolation.timestamp*10}_${imageFileName}/${imageMimeType}`;
        newViolation.imageMimeType = imageMimeType;
        fs.writeFile(`/Server/uploads/${imageUrl}` ,image, (err) => {
            if(err){
                console.log("err")
                return console.log(err)
            }
            console.log("image file saved");
        })
    }
    else {
        res.send("image missing bad request");
        return;
    }
    time = time/1000;
    newViolation.timestamp = time;
    newViolation.vehicleClass = req.body.vehicleClass;
    newViolation.plateNumber = req.body.plateNumber;
    newViolation.speed = req.body.speed;
    newViolation.type = req.body.type;
    newViolation.save();
    SocketService.newViolation(newViolation);
    res.sendStatus(200);
}

exports.getViolationFile = (req, res) => {
    let file = fs.readFileSync(`${filePaths}/${req.params.url}`)
    res.writeHead(200, {
        // we split and join here as did that to the mimetypes to avoid bugs with foreslashes.
        'Content-Type': req.params.contentType.split("_").join("/"),
        'Content-disposition': 'attachment;filename=' + "file",
        'Content-Length': file.length
    });
    res.end(Buffer.from(file, 'binary'));
}

exports.getViolationById = (req, res) => {
    let violation = Violations.findById(req.params.id, (err, violation) => {
        if(err)
        {
            res.sendStatus(500);
        }
        if(violation){
            res.status(200).send({
                violation
            })
        }
    })
}