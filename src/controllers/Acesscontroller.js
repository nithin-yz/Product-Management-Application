
const Category = require("../models/category")
const Product = require("../models/product")



exports.userhomeGet = async (req, res) => {
    try {
        // Fetch all categories and their subcategories
        const allCategories = await Category.find({}).select('name subcategories');

        // Get the selected category or subcategory from query parameters
        const selectedCategory = req.query.category || null;
        const selectedSubcategory = req.query.subcategory || null;

        // Build query object to filter products based on category or subcategory
        let query = {};
        if (selectedSubcategory) {
            query['subcategory'] = selectedSubcategory; // Filter by subcategory if provided
        } else if (selectedCategory) {
            query['category'] = selectedCategory; // Filter by category if provided
        }

        // Pagination logic
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        // Fetch filtered products with pagination
        const products = await Product.find(query).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        // Render the homepage with categories, products, and pagination
        res.status(200).render("homepage", { 
            categories: allCategories,
            products, 
            currentPage: page, 
            totalPages,
            limit,
            selectedCategory,
            selectedSubcategory
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