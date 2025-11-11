import user from "./user.model.js";
import { createdUserService } from "./user.service.js";


export const getAllUser = async (req,res) => {
    const users = await user.find().select("+password");
    if(!users){
        res.send({message: "add user to view them."});
    }
    res.json(users);
}

export const getUser = async (req,res) => {
    const {username} = req.params;
    const users = await user.findOne({username}).select("+password");
    if(!users){
        res.send({message: "add user to view them."});
    }
    res.json(users);
}

export const createUser = async (req,res) => {
    const createdUser = createdUserService(req.body);
    res.json({message: "user created successfully!", createdUser});
}

export const deleteUser = async (req,res) => {
    const {name} = req.params;
    const deleted = await user.findOneAndDelete({name});
    if(!deleted){
        return res.json({message: "user not found"});
    }
    res.json({message: "user deleted successfully."});
}