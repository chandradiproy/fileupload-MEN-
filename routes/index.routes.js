const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const FileModel = require('../models/file.models');

const router = express.Router();

router.get('/home', authMiddleware , async (req, res) => {
    try{
        const files = await FileModel.find({uploadedBy: req.user._id});
        console.log("Fetched files:", files); // Log files
        res.render('home', { user: req.user, files }); // Render template
    }catch(error){
        console.error("Error in /files route:", error); // Log detailed error
        res.status(500).json({ message: 'Error fetching files', error: error.message });
    }
    
})

module.exports = router;