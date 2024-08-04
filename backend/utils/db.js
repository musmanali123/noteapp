import mongoose from "mongoose";

const  DbConn =  async()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log('mogo connect');
    } catch (error) {
        console.log('asa --->',error);
    }
}

export default DbConn