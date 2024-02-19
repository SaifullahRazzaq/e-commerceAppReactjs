const express = require("express");
const User = require("../model/user");
const app = express();
const bcrypt = require('bcrypt');
const { emailRegexp } = require("../validate/index");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const user = require("../model/user");
const productModel = require('../model/product')
var multer = require("multer");
app.use(express.json());
//Register Api
app.post("/Register", async (req, res) => {
    try {
        const { first_name, email, password, profilePictureFileName } = req.body;
        console.log("check here", req?.body)
        if (!emailRegexp.test(email)) {
            res.status(400).send({ message: "Invalid Email Address" });
        } else if (!email) {
            res.status(400).send("Email Address is required");
        }
        let user = {};
        const oldUser = await User.find({ email: email.toLowerCase() });
        console.log("oldUJser-====>", oldUser);
        if (oldUser.length > 0) {
            res.status(400).send({ message: "Email Address already registered" });
        } else {
            encryptedPassword = await bcrypt.hash(password, 10);
            user = await User.create({
                first_name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                profilePictureFileName: null,
            });
        }
        return res.status(200).send({
            message: "User Registered Successfully",
            data: res.status(200).json({ data: user }),
        });
    } catch (err) { }
});

app.post("/Login", async (req, res) => {
    try {
        // console.log("req", req.body);
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        console.log("pass", user);
        // console.log("user--<", user, bcrypt.compare(password, user.password));
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            return res.status(200).json({ data: user });
        }
        res.status(400).json({ message: "Invalid Credentials" });
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

// getAllUser

app.get("/getAllUser", async (req, res) => {
    console.log("api hot")
    try {
        const AllUser = await User.find();
        return res.json({
            message: "Success",
            data: AllUser,
        });
    } catch (error) {
        res.status(400).send({ message: "No User Found" });
    }
});
//getUserById
app.get("/getAllUserById/:id", async (req, res) => {
    try {
        console.log("params====>", req?.params?.id);
        const user = await User.findById({ _id: req.params?.id });
        return res.status(200).json({ message: "User Found", data: user });
        // res.setHeader('')
    } catch (error) {
        return res.status(400).send({ message: "No User Found" });
    }
});
//deleteUser
app.delete("/deleteUserById/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params?.id });
        console.log("delete user===>", user);
        return res
            .status(200)
            .json({ message: "User delete successfully", data: user });
    } catch (error) {
        return res.status(400).send({ message: "No User Found" });
    }
});

//Add Products

app.post("/AddProducts", async (req, res) => {
    try {
        const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images, reviewed, slug } = req.body;
        // console.log("check here", req?.body)
        let product = {};
        // const oldProduct = await productModel.findOne({ slug: slug });
        // console.log("oldProduct-====>", oldProduct);
        // if (oldProduct.length > 0) {
        //     res.status(400).send({ message: "Product already registered" });
        // } else {
        product = await productModel.create({
            title: title,
            description: description,
            price: price,
            discountPercentage: discountPercentage,
            rating: rating,
            stock: stock,
            brand: brand,
            category: category,
            thumbnail: thumbnail,
            images: images,
            reviewed: reviewed,
            slug: slug
        });
        // }
        return res.status(200).json({
            message: "Product Registered Successfully",
            data: product,
        });
    } catch (err) {
        res.status(400).send({ message: err })
    }
});
//getAllProduct
app.get("/getAllProducts", async (req, res) => {
    try {

        const AllProduct = await productModel.find();
        return res.json({
            message: "Success",
            data: AllProduct
        });
    } catch (error) {
        res.status(400).send({ message: "No product Found" });
    }
});

//getProductById
app.get("/getProductById/:id", async (req, res) => {
    try {
        console.log("params====>", req?.params?.id);
        const productData = await product.findById({ _id: req.params?.id });
        return res.status(200).json({ message: "product Found", data: productData });
        // res.setHeader('')
    } catch (error) {
        return res.status(400).send({ message: "No product Found" });
    }
});
module.exports = app;