import {comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel  from "../models/userModel.js";
import JWT from "jsonwebtoken";
export  const registerController = async(req,res) => {
    try{
        const {name, email, password, phone, address, answer} = req.body  //we are destructuring here
        //validations
        if(!name){
            return res.send({"message": 'Name is Required'})
        }
        if(!email){
            return res.send({"message": 'Email is Required'})
        }
        if(!password){
            return res.send({"message": 'Password is Required'})
        }
        if(!phone){
            return res.send({"message": 'Phone is Required'})
        }
        if(!address){
            return res.send({"message": 'Address is Required'})
        }
        if(!answer){
            return res.send({"message": 'Answer is Required'})
        }
        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: 'Already Register please login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)  // import { comparePassword, hashPassword } from "../helpers/authHelper.js"; //this file will be created automatically
        //
        //save
        const user = await userModel({name, email, phone, address, password: hashedPassword,answer}).save()

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error,
        });
    }
};
 
//POST LOGIN
export const loginController = async(req, res) => {
    try{
        const {email,password} =req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Email is not registered',
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message:'login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role: user.role
            },
            token,
        });
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in login',
            error,
        });
    }
};

//forgotPasswordController

export const forgotPasswordController = async(req, res) =>{
    try{
        const {email, answer, newPassword} =req.body;
        if(!email){
            res.status(400).send({message: 'Email is required'})
        }
        if(!answer){
            res.status(400).send({message: 'answer is required'})
        }
        if(!newPassword){
            res.status(400).send({message: 'newPassword is required'})
        }
        //check
        const user =  await userModel.findOne({email, answer})
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer',
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {password: hashed})  //please explain this line in deep
        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully',
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

//test controller
export const testController = (req, res) =>{
    try{
        res.send("protected Route");
    } catch (error){
        console.log(error);
        res.send({error});
    }
};

/*
line 1
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
This imports two functions, comparePassword and hashPassword, from the authHelper.js file in the helpers directory. These functions are used to hash passwords and compare hashed passwords, respectively.
*/
/*
line 2
This imports the userModel from the userModel.js file in the models directory. userModel represents the User schema/model in the database, which is used to interact with the user data.
*/
/*
import JWT from "jsonwebtoken";

This imports the jsonwebtoken library, which is used to create and verify JSON Web Tokens (JWT). JWTs are used for authentication purposes.
*/
/*
line 33
const hashedPassword = await hashPassword(password);
This hashes the user's password using the hashPassword function before storing it in the database for security reasons.
*/
/*
line 36
const user = await userModel({ name, email, phone, address, password: hashedPassword }).save();
This creates a new user document with the provided details and the hashed password, and saves it to the database.
*/