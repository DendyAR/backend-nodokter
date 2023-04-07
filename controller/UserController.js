import Users from "../models/UsersModel.js";
import argon from "argon2"

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes:['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
} 
export const getUsersById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes:['uuid', 'name', 'email', 'role'],
            where:{
                uuid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
} 
export const createUsers = async (req, res) => {
    const { name , email , password, confirmPassword, role } = req.body
    if(password !== confirmPassword) return res.status(400).json({msg: "Password & Confrim Password tidak cocok"})
    const hashPassword = await argon.hash(password) 

    try {
       await Users.create({
        name: name,
        email: email,
        password: hashPassword,
        role: role
       })
        res.status(201).json({msg: "Register Berhasil"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
} 
export const updateUsers = async (req, res) => {
    const user = await Users.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak di temukan"})
    const { name , email , password, confirmPassword, role } = req.body
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    } else {
        hashPassword = await argon.hash(password)
    }
    if(password !== confirmPassword) return res.status(400).json({msg: "Password & Confrim Password tidak cocok"})
    try {
        await Users.update({
         name: name,
         email: email,
         password: hashPassword,
         role: role
        }, {
            where:{
                id: user.id
            }
        })
         res.status(200).json({msg: "User Updated Berhasil"})
     } catch (error) {
         res.status(400).json({msg: error.message})
     }
} 
export const deleteUsers = async (req, res) => {
    const user = await Users.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak di temukan"})
    
    try {
        await Users.destroy({
            where:{
                id: user.id
            }
        })
         res.status(200).json({msg: "User deleted Berhasil"})
     } catch (error) {
         res.status(400).json({msg: error.message})
     }
}