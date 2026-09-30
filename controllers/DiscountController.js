const Book = require('../models/Book')
const Discount = require('../models/Discount')
async function getBooks(req,res){
    try{
        //select _id,bookTitle
        let books = await Book.find({},{_id: 1,bookTitle: 1})//in mongodb
        // console.log(books,'books')
        res.status(200).send({data:books})
    }catch(err){
        console.log(err)
        res.status(400).send({message:'something went wrong'})
    }
}
async function addDiscount(req,res) {
    try {
        // console.log(req.body)
        let discount= new Discount(req.body)
        await discount.save()
        res.status(200).send({message: 'discount added'})
    } catch (err) {
        console.log(err)
        res.status(400).send({message:'something went wrong'})
    }
}
async function getDiscounts(req,res){
    try {
        let discounts= await Discount.find({}).populate('book');
        // console.log(discounts)
        res.status(200).send({data:discounts})
    } catch (error) {
        console.log(err)
        res.status(400).send({message:'something went wrong'})
    }
}
async function getDiscountForEdit(req,res) {
    try {
        let id = req.params.id;
        let discount = await Discount.findOne({_id:id});
        let books = await Book.find({})
        console.log(discount)
        res.status(200).send({data:discount,books: books})
    } catch (err) {
        console.log(err)
        res.status(400).send({message:'something went wrong'})
    }
}
async function editDiscount(req,res) {
    try {
        let id = req.params.id;
        await Discount.updateOne({_id:id},req.body)
        console.log("data has been updated successfully...")
        res.status(200).send({message: 'data inserted successfully'})
    } catch (err) {
        console.log(err)
        res.status(400).send({message:'something went wrong'})
    }
}
module.exports={
    getBooks,
    addDiscount,
    getDiscounts,
    getDiscountForEdit,
    editDiscount
}