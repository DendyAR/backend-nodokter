import Products from "../models/ProductsModel.js";
import ReviewProduct from "../models/ReviewProducts.js";
import Users from "../models/UsersModel.js";

export const getComment = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak di temukan" });
    const response = await ReviewProduct.findOne({
      include: [{
        model: Products
      }],
      where: {
        id: product.id,
      }
    });
    // console.log(response, "ress");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createComment = async (req, res) => {
  const product = await Products.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "Product tidak di temukan" });
  const { comment, rating } = req.body;
  try {
    await ReviewProduct.create({
      comment: comment,
      rating: rating,
      userId: req.userId,
      productId: product.id,
    });
    res.status(201).json({ msg: "Comment success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateComment = async (req, res) => {
  const productRivew = await ReviewProduct.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!productRivew) return res.status(404).json({ msg: "Comment tidak di temukan" });
  const { comment, rating } = req.body;
  try {
    await ReviewProduct.update({
      comment: comment,
      rating: rating,
      userId: req.userId,
      productId: req.productId,
    }, {
      where:{
        id: productRivew.id
    }
    });
    res.status(201).json({ msg: "Comment success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteComent = async (req, res) => {
  const productRivew = await ReviewProduct.findOne({
    where:{
        uuid: req.params.id
    }
});
if(!productRivew) return res.status(404).json({msg: "Comment tidak di temukan"})

try {
    await ReviewProduct.destroy({
        where:{
            id: productRivew.id
        }
    })
     res.status(200).json({msg: "Comment deleted Berhasil"})
 } catch (error) {
     res.status(400).json({msg: error.message})
 }
};
