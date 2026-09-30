const Book = require('../models/Book')
const cloudinary = require('cloudinary').v2
async function addBook(req,res){
    try{
        cloudinary.config({
            cloud_name : "kozsjivf",
            api_key: "871578195939862",
            api_secret: "VlFIPfgzx0YkbEiPHvNwVTCXbio"
        })
        const upload = await cloudinary.uploader.upload(req.file.path)
        // console.log(upload)
        req.body.bookImage = upload.secure_url;
       
        let book = new Book(req.body)
        await book.save();
        // console.log("data has been added successfully...")
        res.status(200).send({message: 'Data has been added successfully'})
    }catch(err){
        console.log(err)
        res.status(400).send({message:'something went wrong'})
    }
}
 async function getBooks(req,res){
    try{
        // let books = await Book.find({});
        // console.log(books)
        let totalBooks = await Book.countDocuments({})
        // console.log(totalBooks,'totalBooks')
        let books = await Book.find({bookTitle: new RegExp(req.query.searchBook,"i")}).skip((req.query.pageNo-1)*req.query.booksPerPage).limit(req.query.booksPerPage);
        res.status(200).send({data: books,totalBooks: totalBooks})
    }catch(err){
        console.log(err)
        res.status(400).send({message: err })
    }
}
async function deleteBook(req,res){
    try {
        id=req.params.id;
        await Book.deleteOne({_id:id});
        res.status(200).send({success:true})
    } catch (err) {
        res.status(400).send({success:false})
        console.log(err)
    }
}
async function getBookForEdit(req,res){
    try{
        // console.log("here..")
        let id= req.params.id;
        // console.log(id);
        let book = await Book.findOne({_id:id},req.body);
        // console.log(book)
        res.status(200).send({data: book})
    }catch{
        console.log(book)
        res.status(400).send({data:err})
    }
}
async function editBook(req,res) {
    try {
        let id = req.params.id;
        let book = await req.body;
        // console.log(book)
        await Book.updateOne({_id:id},req.body);
        // console.log("book updated successfully...")
        res.status(200).send({success: true})
    } catch (err) {
        res.status(400).send({success:false})
        console.log(err)
    }
}
module.exports={
    addBook,
    getBooks,
    deleteBook,
    getBookForEdit,
    editBook
}