const User = require("../model/UserModel");
const jwt = require("jsonwebtoken"); // generate a token
const bcrypt = require("bcryptjs"); // for password hashing

// Register API
const registerAPI = async (req, res) => {
    const {username, email, password, role} = req.body;

    try{
        // Email check
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "User account already exist"});
        }
        // Password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Receive the processed data and save it our collection
        const newUser = new User({username, email, password: hashedPassword, role});
        await newUser.save();
        res.status(201).json({message: "Registration successfull"});
    }catch(err){
        console.error(err);        
    }
}

// Login API
const loginAPI = async (req, res) => {
    const {email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message: "User account not found, please register first"});
        }

        const passwordMatch  = await bcrypt.compare(password, existingUser.password);
        if(!passwordMatch){
            return res.status(400).json({message: "Password mismatch"});
        }

        // Token Generation
        const token = jwt.sign(
            {userId: existingUser._id, username: existingUser.username, email: existingUser.email, role: existingUser.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '24h'}
        );
        res.status(200).json({message: "Login Successful", token});
    }catch(err){
        console.error(err);        
    }
}

module.exports = {registerAPI, loginAPI};