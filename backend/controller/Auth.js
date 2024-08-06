import UserModel from "../models/AuthModel.js"
import bycript from "bcryptjs"
import jwt from "jsonwebtoken"

const Register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(303).json({ sucsess: false, message: 'ALL fields are required!' })
        }
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(303).json({ sucsess: false, message: 'User already exist!, Plz Login' })
        }
        const hashPassword = bycript.hashSync(password, 10)
        const newUser = new UserModel({
            userName, email, password: hashPassword
        })
        newUser.save()
        res.status(200).json({ sucsess: true, message: 'User Register Successfullty', user: newUser })
    } catch (error) {
        res.status(500).json({ sucsess: false, message: 'Internal server Error' })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await UserModel.findOne({ email });
        if (!findUser) {
            return res.status(404).json({ success: false, message: "User is not found. plz Register" })
        }
        const comparePassword = await bycript.compare(password, findUser.password)
        if (!comparePassword) {
            return res.status(303).json({ success: false, message: "Inavalid Passowrd!" })
        }
        const token = await jwt.sign(
            { userId: findUser._id, },
            process.env.SECRET_KEY,
            { expiresIn: '3d' }
        )
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3 * 24 * 3600 * 1000 })
        res.status(200).json({ success: false, message: "Login Successfully", user: findUser, token })
    } catch (error) {
        res.status(500).json({ sucsess: false, message: 'Internal server Error' })
    }
}

const Logout  = async(req,res)=>{
    try {
        res.clearCookie("token")
        res.status(200).json({ sucsess: true, message: 'Logout Successfully' })
    } catch (error) {
        console.log('LogOUT API ->',error);
        res.status(500).json({ sucsess: false, message: 'Internal server Error' })
    }
}

export { Register, Login,Logout }