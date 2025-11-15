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
    return user;
}

export const getUserService = async (data) => {
    const {username} = data;
    const user = await userModel.findOne({username}).select("-__v");
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

export const updateUser = async (username, data) => {

    const user = await userModel.findOne({username});

    if(!user){
        throw new Error("User not found!");
    }
    
}

export const deleteUserService = async (data) => {
    const {username} = data;
    const deleted = await userModel.findOneAndDelete({username});
    if(!deleted){
        throw new Error("user not found");
    }
    return deleted;
}
