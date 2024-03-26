const CartProducts = require("../../models/cartModal");
const {errorResponse, successResponse} = require("../../helper/responseHelper");
const {Types: {ObjectId}} = require('mongoose');
const {mongoose} = require('mongoose');

// ! HANDLE ADD TO CART

const handleAddToCart = async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;
        const product = await CartProducts.findOne({
            $and: [{
                productId: {
                    $eq: productId
                }
            }, {
                userId: {
                    $eq: userId
                }
            }]
        })
        if (product) {
            return errorResponse(res, {
                statusCode: 404, message: "Product already exists in cart"
            })
        }
        
        const addToCart = await CartProducts.create({
            userId, productId, quantity
        })
        
        if (!addToCart) {
            return errorResponse(res, {
                statusCode: 400, message: "Failed add to cart"
            })
        }
        
        
        return successResponse(res, {
            statusCode: 201, message: "Successfully add to cart",
        })
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500, message: "Internal Server Error"
        })
    }
}


// ! HANDLE TOTAL CART PRODUCTS
const handleTotalCartProducts = async (req, res) => {
    try {
        const {userId} = req.body;
        
        if (!userId) {
            return errorResponse(res, {
                statusCode: 400, message: "Please login first"
            })
        }
        
        const totalCartProduct = await CartProducts.countDocuments({userId: userId})
        
        
        return successResponse(res, {
            statusCode: 200, message: "Total Cart Products", payload: totalCartProduct
        })
        
    } catch (e) {
        return errorResponse(res, {
            statusCode: 500, message: "Internal Server Error"
        })
    }
}

// ! HANDLE GET CART PRODUCTS

const handleGetCartProducts = async (req, res) => {
    try {
        const {userId} = req.params;
        const engineerCommission = 5;
        
        const cartProducts = await CartProducts.aggregate([{
            $match: {
                userId: {
                    $eq: new ObjectId(userId)
                }
            },
            
        }, {
            $lookup: {
                from: "products", localField: "productId", foreignField: "_id", as: "products"
            }
        }])
        
        if (!cartProducts) {
            return errorResponse(res, {
                statusCode: 404,
                message: "No cart products found"
            })
        }
        
        let calculatePrice = 0;
        let cartProductCount = 0;
        let buyProductItem = 0;
        const outOfStockProducts = cartProducts.filter(product => product.products[0].stock < product.quantity)
        
        for (let i = 0; i < outOfStockProducts.length; i++) {
            cartProductCount = cartProductCount + outOfStockProducts[i].quantity
        }
        
        const stockProduct = cartProducts.filter(product => product.products[0].stock >= product.quantity)
        
        for (let i = 0; i < stockProduct.length; i++) {
            const {quantity} = stockProduct[i]
            cartProductCount = cartProductCount + quantity
            buyProductItem = buyProductItem + quantity
            const {price, discount} = stockProduct[i].products[0]
            
            if (discount !== 0) {
                // calculatePrice += Math.floor((price * (100 - discount)) / 100) * quantity;
                calculatePrice = calculatePrice + (price - Math.floor(price * discount / 100)) * quantity
            } else {
                // calculatePrice += price * quantity;
                calculatePrice = calculatePrice + price * quantity
            }
        }
        
        let sellerProducts = []
        let uniqueSellerId = [...new Set(stockProduct.map(product => product.products[0].sellerId.toString()))]
        
        
        for (let i = 0; i < uniqueSellerId.length; i++) {
            let price = 0;
            for (let j = 0; j < stockProduct.length; j++) {
                const tempProduct = stockProduct[j].products[0]
                if (uniqueSellerId[i] === stockProduct[j].products[0].sellerId.toString()) {
                    let tempPrice = 0;
                    if (tempProduct.discount !== 0) {
                        tempPrice = tempProduct.price - Math.floor(tempProduct.price * (100 - tempProduct.discount) / 100)
                    } else {
                        tempPrice = tempProduct.price
                    }
                    
                    //  ! Website engineer commission
                    tempPrice = tempPrice - Math.floor(tempPrice * engineerCommission / 100)
                    price = price + tempPrice * stockProduct[j].quantity
                    
                    
                    sellerProducts[i] = {
                        sellerId: uniqueSellerId[i],
                        shopName: tempProduct.shopName,
                        price,
                        products: sellerProducts[i] ? [...sellerProducts[i].products, {
                            _id: stockProduct[j]._id, quantity: stockProduct[j].quantity, productInfo: tempProduct
                        }] : [{
                            _id: stockProduct[j]._id, quantity: stockProduct[j].quantity, productInfo: tempProduct
                        }]
                        
                    }
                    
                    
                }
            }
        }
        
        
        return successResponse(res, {
            statusCode: 200, message: "Cart Products", payload: {
                cartProducts: sellerProducts,
                price: calculatePrice,
                cartProductCount,
                shippingFee: 85 * sellerProducts.length,
                outOfStockProducts,
                buyProductItem,
            }
        })
        
    } catch (e) {
        if (e instanceof mongoose.Error) {
            return errorResponse(res, {
                statusCode: 400, message: "Invalid item id"
            })
        }
        return errorResponse(res, {
            statusCode: 500, message: "Internal Server Error"
        })
        
    }
}


module.exports = {
    handleAddToCart, handleTotalCartProducts, handleGetCartProducts
}