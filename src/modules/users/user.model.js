import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true,
        trim: true 
    }
    ,email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
    ,password: {
        type: String,
        required: true,
        select: false
    }
    ,role: {
        type: String,
        default: "user",
        enum: ['user', 'admin']
    }
    ,token: {
        type: String,
        select: false
    }
}, {timestamps: true});
 
const user = mongoose.model('User', userSchema);

export default user;
