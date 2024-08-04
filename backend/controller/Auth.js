import UserModel from "../models/AuthModel.js"
import bycript from "bcryptjs"

const Register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if(!userName || !email || !password ){
            return res.status(303).json({ sucsess: false, message: 'ALL fields are required!' })
        }
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(303).json({ sucsess: false, message: 'User already exist!, Plz Login' })
        }
        const hashPassword = bycript.hashSync(password,10)
        const newUser = new UserModel({
            userName, email, password:hashPassword
        })
        newUser.save()
        res.status(200).json({ sucsess: true, message: 'User Register Successfullty', user: newUser })
    } catch (error) {
        res.status(500).json({ sucsess: false, message: 'Internal server Error' })
    }
}


export { Register }