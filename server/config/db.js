import mongoose from 'mongoose'
//mongoose provide more control to acces database of mongodb
const connectDB = async () => {
    try{
        const conn =await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDb database ${conn.connection.host}`.bgMagenta.white)
    }catch (error){
        console.log(`Error in MongoDb ${error}`.bgRed.white)
    }
};
export default connectDB;

//we are getting request 'GET / 200 5.993 ms - 38'
//this will help to identify error.
//we will get like type,status code, tell about time of execurtiion
