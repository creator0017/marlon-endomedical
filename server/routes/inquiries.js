const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Inquiry = require('../models/Inquiry');

// Validation middleware
const validateInquiry = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('type').isIn(['product-inquiry', 'bulk-quote', 'general-contact', 'newsletter'])
    .withMessage('Invalid inquiry type')
];

// @route   POST /api/inquiries
// @desc    Create a new inquiry
router.post('/', validateInquiry, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. Our team will respond within 24 hours.',
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/inquiries/newsletter
// @desc    Newsletter signup (simplified)
router.post('/newsletter', [
  body('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const inquiry = await Inquiry.create({
      type: 'newsletter',
      name: req.body.organization || 'Newsletter Subscriber',
      email: req.body.email,
      organization: req.body.organization
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to our wholesale updates.',
      data: inquiry
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'This email is already subscribed.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
