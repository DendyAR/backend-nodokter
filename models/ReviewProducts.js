import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";
import Products from "./ProductsModel.js";

const {DataTypes } = Sequelize;

const ReviewProduct = db.define('review_product',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    comment:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [10, 5000]
        }
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Users.hasMany(ReviewProduct)
ReviewProduct.belongsTo(Users, {foreignKey: "userId"})

Products.hasOne(ReviewProduct)
ReviewProduct.belongsTo(Products, {foreignKey: "productId"})

export default ReviewProduct;