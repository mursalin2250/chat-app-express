import jwt from "jsonwebtoken";
import express from "express";
import { JWT_SECRET } from "../config/envConfig.js";

export const tokenAuthentication = async (req,res,next) => {
    const header = req.headers['authorization'] || req.headers['Authorization'] || req.headers['AUTHORIZATION'];

    const token = header.split(' ')[1];
    if(!token){
        res.status(401).json({message: "Access deined. Token not found!"});
    }
    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        res.status(403).json({message: "Invalid User Token"});
    }
}

