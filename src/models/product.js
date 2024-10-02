const mongoose = require('mongoose');

// Define the Variant Schema
const variantSchema = new mongoose.Schema({
    ram: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        default: 1 // Minimum quantity can be 0 or more
    }
});

// Define the Product Schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: {
        type: String,
        required: true,
        trim: true
    },
    variants: [variantSchema], // Array of variants
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [String], // Array of image paths or URLs
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Product model
const product = mongoose.model('product', productSchema);

module.exports = product;
