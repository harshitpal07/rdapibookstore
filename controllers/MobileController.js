const Mobile = require('../models/Mobile')
async function addMobile(req,res){
    try{
        console.log(req.body)
        let mobile = new Mobile(req.body)
        await mobile.save();
        console.log("data has been added successfully...")
        res.status(200).send({message: 'Data has been added successfully'})
    }catch(err){
        console.log(err)
        res.status(400).send({message:'something went wrong'})
    }
}
module.exports={
    addMobile
}