const express = require('express');
const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

dotenv.config();

// Import Auth Route
const authRoute = require('./routes/auth');

// Import User Route
const userRoute = require('./routes/users');

// Import Post Route
const postRoute = require('./routes/posts');

// Create a connection with MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// Multer
const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, req.body.name);
    }
});
const upload = multer({ storage: imgStorage });

// Upload image to server and save to MongoDB database
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File uploaded successfully');
    } catch (error) {
        console.error(error);
    }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;