const Category = require("../models/category")



exports.userhomeGet=async(req,res)=>{
try{

res.status(200).render("homepage")

}catch(error){

res.status(500).send("server error")

}
}

exports.addcategoryPost=async(req,res)=>{

try{
    const { categoryName,} = req.body;

    try {
        
        const existingCategory = await Category.findOne({ name: categoryName });
        if (existingCategory) {
            return res.status(400).json({ error: "Category already exists." });
        }

    
        const newCategory = new Category({ name: categoryName });
        await newCategory.save();

        return res.status(200).json({ success: true, category: newCategory });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while adding the category." });
    }


}catch{



}


}