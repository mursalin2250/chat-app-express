import { createdUserService, deleteUserService, forgetPasswordService, getAllUserService, getUserService, updateUserService, userLoginService } from "./user.service.js";

export const createUser = async (req,res) => {
    try {
        const createdUser = await createdUserService(req.body);
        res.json({message: "User created successfully!", createdUser});
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});    
    }
}

export const userLogin = async (req,res) => {
    try {
        const userAuth = await userLoginService(req.body);
        res.status(200).json({message: "User login successful!", userAuth});
    } catch (error) {
        console.log(error);
        res.status(401).json({message: error.message});
    }
}

export const getUser = async (req,res) => {
    try {
        const value = req.params.value;
        const users = await getUserService({username: value, email:value});
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getAllUser = async (req,res) => {
    try {
        const users = await getAllUserService();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}

export const updatedUser = async(req,res) => {
    try {
        const updated = await updateUserService(req.params, req.body);
        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

export const deleteUser = async (req,res) => {
    try {
        const deleted = await deleteUserService(req.params);
        res.json({message: "User deleted successfully!", deleted});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}

export const forgetPassword = async () => {
    try {
        const {email} = req.body;
        const generatedOtp = await forgetPasswordService(email);
        res.status(200).json({message: "OTP generated successfully! Enter the otp to verify and change the password!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}
