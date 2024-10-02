
const Category = require("../models/category")
const Product = require("../models/product")



exports.userhomeGet = async (req, res) => {
    try {
        const allCategories = await Category.find({}).select('name subcategories');

        // Pagination logic
        const page = parseInt(req.query.page) || 1; // Current page number
        const limit = parseInt(req.query.limit) || 10; // Number of products per page
        const skip = (page - 1) * limit; // Calculate documents to skip

        // Fetch products with pagination
        const products = await Product.find().skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments(); // Total number of products
        const totalPages = Math.ceil(totalProducts / limit); // Total number of pages

        // Render the homepage with categories, products, and pagination
        res.status(200).render("homepage", { 
            categories: allCategories,
            products, 
            currentPage: page, 
            totalPages,
            limit // Add this line to pass the limit to the EJS template
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};


exports.addcategoryPost=async(req,res)=>{

try{
    const { categoryName,} = req.body;

 
        
        const existingCategory = await Category.findOne({ name: categoryName });
        if (existingCategory) {
            return res.status(400).json({ error: "Category already exists." });
        }

    
        const newCategory = new Category({ name: categoryName });
        await newCategory.save();

        return res.status(200).json({ success: true, category: newCategory });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "An error occurred while adding the category." });
    }








}

exports.addsubcategoryPost=async (req, res) => {
    console.log("worked")
    const { subcategoryName, parentCategory } = req.body;

    try {
        // Find the parent category by name
        const category = await Category.findOne({ name: parentCategory });
        if (!category) {
            return res.status(404).json({ error: "Parent category not found." });
        }

        // Check if the subcategory already exists in the parent category
        const existingSubcategory = category.subcategories.find(
            (sub) => sub.name === subcategoryName
        );
        if (existingSubcategory) {
            return res.status(400).json({ error: "Subcategory already exists." });
        }

        // Add the new subcategory
        category.subcategories.push({ name: subcategoryName });
        await category.save();

        return res.status(200).json({ success: true, category });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while adding the subcategory." });
    }
}


exports.addproductPost= async(req,res)=>{
    try {
        const { title, category: categoryId, subcategory: subcategoryId, variants, description } = req.body;
        const images = req.files.map(file => file.path); // Save the paths or URLs of uploaded images

        // Fetch category and subcategory names from the database
        const category = await Category.findById(categoryId);
        const subcategory = await Category.findOne({ 'subcategories._id': subcategoryId }, { 'subcategories.$': 1 });

        const newProduct = new Product({
            title,
            category: category.name, // Using category name
            subcategory: subcategory.subcategories[0].name, // Using subcategory name
            variants: JSON.parse(variants),
            description,
            images
        });

        await newProduct.save();
        res.status(201).json({ success: true, message: 'Product added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to add product.' });
    }


}

exports.productdescribGet =async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('variants');
        const categories = await Category.find();
     
        res.render('productdescribtion', {
            product: product,
            categories: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}