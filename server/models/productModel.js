import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true,
    }, //we are making slug for making seo friendly
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    photo:{
        data:Buffer,
        contentType: String
        //NOTE: There is limitation of storing image in mongodb data base
    },

}, {timestamps: true})  // timestamps is beacause at what time data has been added

export default mongoose.model('Products', productSchema)