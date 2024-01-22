const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
        },
        img: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

moudle.exports = mongoose.model('Post', PostSchema);