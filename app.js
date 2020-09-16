const express = require('express');
const multer = require('multer');
const upload = multer();
const path = require('path');
const fs = require('fs');

const app = express();
const logFile = path.resolve(__dirname, 'log.txt');
const uploadPath = path.resolve(__dirname, 'files/');
app.post('/form', upload.single('cv'), (req, res) => {
    let errors = [];
    if (!req.file) errors.push('cv');
    if (errors.length) {
        return res.json({
            errors,
            result: false
        })
    }
    uploadFile(req);

    return res.json({
        result: true
    });
});

function uploadFile(req) {
    fs.writeFile(`${uploadPath}/${req.file.originalname}`, Buffer.from(req.file.buffer), (error) => {
        if (error) {
            throw error;
        }

        fs.appendFile(logFile, req.file.originalname, (error) => {
            if (error) {
                throw error;
            }
        });
    });
}

module.exports = app;