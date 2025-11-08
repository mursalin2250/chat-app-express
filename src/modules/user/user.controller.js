import user from "./user.model.js";

export const findUser = async (req,res) => {
    const users = await user.find();
    if(!users){
        res.send({message: "add user to view them."});
    }
    res.json(users);
}

export const createUser = async (req,res) => {
    const {name, email} = req.body;
    
    const create = await user.create({name, email});
    
    res.json(create);
}

export const deleteUser = async (req,res) => {
    const {name} = req.params;
    const deleted = await user.findOneAndDelete({name});
    if(!deleted){
        return res.json({message: "user not found"});
    }
    res.json({message: "user deleted successfully."});
}