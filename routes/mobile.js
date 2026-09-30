const express = require('express')
const bodyParser = require('body-parser')
const route = express.Router()
const MobileController = require('../controllers/MobileController')
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({
    extended: false
}));
route.post('/add/mobile',(req,res)=>{
    MobileController.addMobile(req,res)
})
module.exports=route