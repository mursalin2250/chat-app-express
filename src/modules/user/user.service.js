import userModel from "./user.model.js";
import bcrypt from "bcrypt";


export const createdUserService = async (data) => {
    const {username, email, password} = data;
    const hashedPassword = bcrypt.hash(password, 10);
    const createUser = await userModel.create({username, email, password: hashedPassword});

    const userWithoutPassword = createUser.toObject();
    // delete userWithoutPassword.password;

    return userWithoutPassword;
}