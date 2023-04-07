import Product from "../models/ProductsModel.js";
import Users from "../models/UsersModel.js";
import ReviewProduct from "../models/ReviewProducts.js";

export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll({
            include:[{
                model: Users ,
                model: ReviewProduct
            }]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
} 
export const getProductsById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Product tidak di temukan"})
        const response = await Product.findOne({
            where:{
                id: product.id
            }, 
            include: [{
                model: ReviewProduct
            }]
        });
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
} 

export const createProducts = async (req, res) => {
    const { name , description , price  } = req.body
    
    try {
        await Product.create({
            name: name,
            description: description,
            price: price,
            userId: req.userId
        });
        res.status(201).json({msg: "Product created successfuly"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
} 
export const updateProducts = async (req, res) => {
    const product = await Product.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!product) return res.status(404).json({ msg: "Product tidak di temukan" });
      const{ name , description , price  } = req.body;
      try {
        await Product.update({
          name: name,
          description: description,
          price: price,
          userId: req.userId,
        }, {
          where:{
            id: product.id
        }
        });
        res.status(201).json({ msg: "Product updated success" });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
} 
export const deleteProducts = async (req, res) => {
    const product = await Product.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "Product tidak di temukan"})
    
    try {
        await Product.destroy({
            where:{
                id: product.id
            }
        })
         res.status(200).json({msg: "Product deleted Berhasil"})
     } catch (error) {
         res.status(400).json({msg: error.message})
     }
}