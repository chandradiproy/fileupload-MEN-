const express = require('express');
const FileModel = require('../models/file.models'); // Use consistent naming for models
const upload = require('../config/multerConfig');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Upload file route
router.post('/upload-file', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const newFile = new FileModel({
            filename: req.file.filename,
            filepath: req.file.path,
            filetype: req.file.mimetype,
            size: req.file.size,
            uploadedBy: req.user._id // Use correct field for user ID
        });

        await newFile.save();
        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error uploading file' });
    }
});

// Fetch uploaded files route
router.get('/files', authMiddleware, async (req, res) => {
    console.log('User in session:', req.user);
    try {
        if(!req.user){
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const files = await FileModel.find({ uploadedBy: req.user._id });
        console.log("Fetched files:", files); // Log files
        res.render('home', { user: req.user, files }); // Render template
    } catch (error) {
        console.error("Error in /files route:", error); // Log detailed error
        res.status(500).json({ message: 'Error fetching files', error: error.message });
    }
});


module.exports = router;
