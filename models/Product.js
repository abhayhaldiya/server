const mongoose = require('mongoose');

const variantOptionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['color', 'storage', 'finish']
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  priceModifier: {
    type: Number,
    default: 0
  },
  image: String
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  baseVariant: {
    type: String,
    required: [true, 'Base variant is required'],
    trim: true
  },
  variants: {
    colors: [variantOptionSchema],
    storage: [variantOptionSchema],
    finish: [variantOptionSchema]
  },
  mrp: {
    type: Number,
    required: [true, 'MRP is required'],
    min: [0, 'MRP cannot be negative']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  images: [String],
  emiPlans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EMIPlan'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
