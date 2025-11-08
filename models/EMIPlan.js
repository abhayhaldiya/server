const mongoose = require('mongoose');

const emiPlanSchema = new mongoose.Schema({
  monthlyAmount: {
    type: Number,
    required: [true, 'Monthly amount is required'],
    min: [0, 'Monthly amount cannot be negative']
  },
  tenureMonths: {
    type: Number,
    required: [true, 'Tenure is required'],
    min: [1, 'Tenure must be at least 1 month']
  },
  interestRate: {
    type: Number,
    required: [true, 'Interest rate is required'],
    min: [0, 'Interest rate cannot be negative'],
    max: [100, 'Interest rate cannot exceed 100%']
  },
  cashback: {
    type: String,
    default: null
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EMIPlan', emiPlanSchema);
