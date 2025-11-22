import userModel from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_SECRET, ACCESS_TOKEN_EXPIRES_IN} from "../../config/envConfig.js";


export const createdUserService = async (data) => {
    const {username, email, password} = data;
    const usernameExists = await userModel.findOne({username});
    const emailExists = await userModel.findOne({email});
    if(usernameExists){
        throw new Error("The username is already in use!");
    }else if(emailExists){
        throw new Error("The email is already in use!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await userModel.create({username, email, password: hashedPassword});
    return createUser;
}

export const userLoginService = async (data) => {
    const user = await userModel.findOne({$or: [{username:data.username}, {email:data.email}]}).select("+password +token");
    if(!user){
        throw new Error("Invalid credentials!");
    }
    const authPassword = await bcrypt.compare(data.password, user.password);
    if(!authPassword){
        throw new Error("Invalid credentials!");
    }
    let token = user.token;
    const currentTime = Math.floor(Date.now() / 1000);
    const decodedToken = jwt.decode(token);
    if(!token || decodedToken.exp<currentTime){
        token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET,
            {expiresIn: ACCESS_TOKEN_EXPIRES_IN}
        );
        user.token = token;
        await user.save();
    }
    const readyUser = user.toObject();
    delete readyUser.password;
    return readyUser;
}

export const getUserService = async (data) => {
    const user = await userModel.findOne({$or: [{username: data.username}, {email: data.email}]}).select("-__v");
    if(!user){
        throw new Error("User not found.");
    }
    return user;
} 

export const getAllUserService = async () => {
    const users = await userModel.find().select("-__v");
    if(!users){
        throw new Error("No users available to show.");
    }
    return users;
}

export const updateUserService = async (username, data) => {

    const user = await userModel.findOne(username);

    if(!user){
        throw new Error("User not found!");
    }
    const keys = Object.keys(data);
    for(let i = 0; i < keys.length; i++){
        const key = keys[i];
        if(key == "role"){
            throw new Error("Only admins can change the role!")
        }
        if(key == "password"){
            const hashUpdatedPassword = await bcrypt.hash(data[key], 10);
            data[key] = hashUpdatedPassword
        }
        user[key] = data[key];
    }

    const updatedUser = await user.save();
    return updatedUser;
}

export const deleteUserService = async (data) => {
    const {username} = data;
    const deleted = await userModel.findOneAndDelete({username});
    if(!deleted){
        throw new Error("user not found");
    }
    return deleted;
}

export const forgetPasswordService = async (email) => {
    const user = await userModel.findOne(email);
    if(!user){
        throw new Error("User not found.");
    }
    const generateOtp = Math.random()* 1000000;
    const updateDB = userModel.findOneAndUpdate(generateOtp);
    if(!updateDB){
        throw new Error("There was a problem while generating the code.")
    }
    return user;
}