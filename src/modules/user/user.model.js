import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { 
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
});

const user = mongoose.model('User', userSchema);

export default user;
