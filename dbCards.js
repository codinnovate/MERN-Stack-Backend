import mongoose, { Schema } from "mongoose";


const cardSchema = Schema({
    name: String,
    imgUrl:String
})

export default mongoose.model('cards', cardSchema)