const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mobileSchema = new Schema ({
    modelName: {type: String },
    brandName: {type: String} ,
    price: {type: Number },
    RAM: {type: Number },
    ROM: {type: Number }
    
})
module.exports=mongoose.model('Mobile',mobileSchema)