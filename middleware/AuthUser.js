import ReviewProduct from "../models/ReviewProducts.js";
import Users from "../models/UsersModel.js";

export const verifyUser = async (req, res , next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun anda"})
    }
    const user = await Users.findOne({
        where:{
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak di temukan"});
    req.userId = user.id,
    req.role = user.role,
    req.productId = user.id,
    next()
}

export const adminOnly = async (req, res , next) => {
    const user = await Users.findOne({
        where:{
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak di temukan"});
    if(user.role !== "admin") return res.status(403).json({msg: "Access denied"})
    req.userId = user.id,
    req.productId = user.id
    next()
}
