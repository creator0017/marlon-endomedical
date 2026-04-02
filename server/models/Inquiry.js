const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['product-inquiry', 'bulk-quote', 'general-contact', 'newsletter'],
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  organization: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved'],
    default: 'new'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inquiry', inquirySchema);
