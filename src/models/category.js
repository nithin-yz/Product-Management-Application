const mongoose = require('mongoose');

// Define the main category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  subcategories: [
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
     
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  
});


const category = mongoose.model('category', categorySchema);

module.exports = category;
